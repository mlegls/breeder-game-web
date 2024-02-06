import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import _ from "lodash";
import { useState } from "react";
import { redis } from "~/clients/redis.server";
import Creature from "~/components/Creature";
import { battle } from "~/logic/creature.server";
import invariant from "~/utils/invariant";
import { formationLength } from "~/utils/scaling";
import { padSlice } from "~/utils/seq";
import { IBattleLog, IGameData } from "./_index";

export default function Battle() {
  const navigate = useNavigate();
  const { waiting, log, winner, round } = useLoaderData<typeof loader>();
  const [turn, setTurn] = useState(0);

  return (
    <div className="font-sans">
      <h1>Battle</h1>
      <p>View the battle, and breed again when you're ready.</p>
      <p>
        {winner && turn == log.length - 1
          ? winner < 0
            ? "Tie"
            : `Team ${winner} wins`
          : `Turn ${turn}`}
      </p>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <button onClick={() => setTurn(turn - 1)} disabled={turn == 0}>
            Prev
          </button>
          <button
            onClick={() => setTurn(turn + 1)}
            disabled={turn == log.length - 1}
          >
            Next
          </button>
          <button disabled={waiting} onClick={() => navigate("../breed")}>
            Go Breed
          </button>
        </div>
        {log[turn].map(($, i) =>
          $ ? (
            <div key={i} className="flex flex-row gap-1">
              {(i
                ? padSlice($, formationLength(round))
                : padSlice($, formationLength(round)).toReversed()
              ).map(($1, j) =>
                $1 == null ? (
                  <div className="border-solid w-20" />
                ) : (
                  <Creature
                    key={j}
                    creature={{
                      ...$1,
                      select: () => undefined,
                      selected: false,
                    }}
                  />
                )
              )}
            </div>
          ) : (
            <div>Waiting to breed and arrange</div>
          )
        )}
      </div>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { room, team } = params;
  invariant(typeof room == "string", "room is required");
  invariant(typeof team == "string", "team is required");

  const data: IGameData | null = (await redis.hgetall(
    room
  )) as IGameData | null;
  invariant(data, "room not found");
  const { p0Ready, p1Ready, t0, t1, log, round, p0Bred, p1Bred } = data;
  const roundN = parseInt(round);

  const f0 = p0Ready && p0Ready.map(($) => t0[$]);
  const f1 = p1Ready && p1Ready.map(($) => t1[$]);

  if (f0 && f1) {
    // if battle has already been calculated
    // !(p0Bred && p1Bred) indicates we're on the next round,
    // since the battle calculation resets them to false
    if (log.length >= 1 + 3 * (roundN + 1 - +!(p0Bred && p1Bred))) {
      console.log("calculated");
      const b_log = _.last(log.filter(($) => $.tag == "battle")) as IBattleLog;
      return json({
        waiting: false,
        log: b_log.log,
        winner: b_log.winner,
        round: roundN,
      });
    }

    // calculate battle
    const [b_log, winner] = battle(f0, f1);
    const dead = ($: number) =>
      _.difference(
        b_log[0][$].map(($1) => $1.id),
        b_log[b_log.length - 1][$].map(($1) => $1.id)
      );
    const [dead0, dead1] = [dead(0), dead(1)];
    const t0_new = t0.filter(($) => !dead0.includes($.id));
    const t1_new = t1.filter(($) => !dead1.includes($.id));
    await redis.hset(room, {
      round: roundN + 1,
      log: [...log, { log: b_log, winner, tag: "battle" }],
      t0: t0_new,
      t1: t1_new,
      p0Bred: false,
      p1Bred: false,
    });
    return json({ waiting: false, log: b_log, winner, round: roundN });
  } else
    return json({
      waiting: true,
      log: [[f0, f1]],
      winner: null,
      round: roundN,
    });
}
