import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { redis } from "~/clients/redis.server";
import invariant from "~/utils/invariant";
import { breed, type ICreature } from "~/logic/creature.server";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import _ from "lodash";
import Creature, { ICreatureDiv } from "~/components/Creature";
import { IGameData } from "./_index";

function Column({ creatures }: { creatures: ICreatureDiv[] }) {
  return (
    <div className="flex flex-col gap-2">
      {creatures.map(($, i) => (
        <Creature key={i} creature={$} />
      ))}
    </div>
  );
}

export default function Breed() {
  const submit = useSubmit();

  const { ms, fs } = useLoaderData<typeof loader>();

  const [fertsM, setFertsM] = useState(ms.map(($) => $.fertility));
  const [fertsF, setFertsF] = useState(fs.map(($) => $.fertility));

  const [selM, setSelM] = useState(0);
  const [selF, setSelF] = useState(0);
  const [pairs, setPairs] = useState<[number, number][]>([]);

  function breed() {
    if (fertsM[selM] <= 0 || fertsF[selF] <= 0) return;
    setPairs([...pairs, [selM, selF]]);
    setFertsM(_.set(fertsM, selM, fertsM[selM] - 1));
    setFertsF(_.set(fertsF, selF, fertsF[selF] - 1));
  }

  return (
    <div className="font-sans">
      <h1>Breed</h1>
      <p>
        Select pairs to breed. Each trait has a 50% chance to be inherited from
        each parent, with ±20% variance.
      </p>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-1">
          <button onClick={breed}>Breed Selected</button>
          <button
            onClick={() =>
              submit({ pairs }, { method: "post", encType: "application/json" })
            }
          >
            Finalize
          </button>
        </div>
        <Column
          creatures={ms.map(($, i) => ({
            ...$,
            fertilityLeft: fertsM[i],
            select: () => setSelM(i),
            selected: i === selM,
          }))}
        />
        <Column
          creatures={fs.map(($, i) => ({
            ...$,
            fertilityLeft: fertsF[i],
            select: () => setSelF(i),
            selected: i === selF,
          }))}
        />
        <div className="flex flex-col gap-2">
          {pairs.map(([$m, $f], i) => (
            <div key={i} className="flex flex-row gap-1">
              <Creature
                creature={{
                  ...ms[$m],
                  select: () => undefined,
                  selected: false,
                }}
              />
              <Creature
                creature={{
                  ...fs[$f],
                  select: () => undefined,
                  selected: false,
                }}
              />
              <button
                onClick={() => {
                  setFertsM(_.set(fertsM, $m, fertsM[$m] + 1));
                  setFertsF(_.set(fertsF, $f, fertsF[$f] + 1));
                  setPairs(pairs.filter((_, j) => j !== i));
                }}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { room, team } = params;
  invariant(typeof room == "string", "room is required");
  invariant(typeof team == "string", "team is required");
  const [creatures, bred] = await Promise.all([
    redis.hget<ICreature[]>(room, `t${team}`),
    redis.hget<boolean>(room, `p${team}Bred`),
  ]);
  invariant(creatures, "game not found");
  if (bred) return redirect(`../arrange`);

  return json({
    ms: creatures.filter(($) => $.sex),
    fs: creatures.filter(($) => !$.sex),
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { pairs }: { pairs?: [number, number][] } = await request.json();
  const { room, team } = params;
  invariant(pairs, "bad request; no pairs");
  invariant(typeof room == "string", "room is required");
  invariant(typeof team == "string", "team is required");

  const data = (await redis.hgetall(room)) as IGameData | null;
  invariant(data, "game not found");

  const { log, t0, t1, p0Bred, p1Bred } = data;
  if ((team === "0" && p0Bred) || (team === "1" && p1Bred))
    return new Response("already bred", { status: 400 });

  const creatures = team === "0" ? t0 : t1;
  const ms = creatures.filter(($) => $.sex);
  const fs = creatures.filter(($) => !$.sex);

  const children = pairs.map(([$m, $f]) => breed(ms[$m], fs[$f]));
  await redis.hset(room, {
    [`t${team}`]: [...creatures, ...children],
    [`p${team}Bred`]: true,
    [`p${team}Ready`]: false,
    log: [...log, { data: { pairs, children }, tag: `p${team}breed` }],
  });
  return redirect(`../arrange`);
}
