import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import _ from "lodash";
import { redis } from "~/clients/redis.server";
import { ICreature, initTeam } from "~/logic/creature.server";
import invariant from "~/utils/invariant";

export default function Index() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="">Join Game</h1>
      <Form method="post" className="flex flex-row gap-2">
        <label htmlFor="room">Room</label>
        <input name="room" />
        <label htmlFor="team">Team</label>
        <label htmlFor="team0">
          0
          <input name="team" id="team0" type="radio" value="0" />
        </label>
        <label htmlFor="team1">
          1
          <input name="team" id="team1" type="radio" value="1" />
        </label>
        <button>Join</button>
      </Form>
    </main>
  );
}

export type IBattleLog = {
  tag: "battle";
  log: [ICreature[], ICreature[]][];
  winner: number;
};
type IBreedData = { pairs: [number, number][]; children: ICreature[] };
export type IBreedLog = { tag: "p0breed" | "p1breed"; data: IBreedData };
export type IInitLog = { tag: "init"; t0: ICreature[]; t1: ICreature[] };
export type ILog = IBattleLog | IBreedLog | IInitLog;

export interface IGameData {
  round: string;
  log: ILog[];
  t0: ICreature[];
  t1: ICreature[];
  p0Bred: boolean;
  p1Bred: boolean;
  p0Ready: false | number[];
  p1Ready: false | number[];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const room = formData.get("room");
  const team = formData.get("team");
  invariant(typeof room == "string", "room is required");
  invariant(typeof team == "string", "team is required");

  const data = await redis.exists(room);
  if (!data) {
    const [t0, t1] = _.times(2, () => initTeam(3));
    await redis.hset(room, {
      round: 0,
      log: [{ t0, t1, tag: "init" }],
      t0,
      t1,
      p0Bred: false,
      p1Bred: false,
      p0Ready: false,
      p1Ready: false,
    });
  }
  return redirect(`/game/${room}/${team}/breed`);
}
