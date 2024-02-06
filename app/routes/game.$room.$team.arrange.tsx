import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import _ from "lodash";
import { useState } from "react";
import { redis } from "~/clients/redis.server";
import Creature from "~/components/Creature";
import { ICreature } from "~/logic/creature.server";
import invariant from "~/utils/invariant";
import { formationLength } from "~/utils/scaling";
import { padSlice } from "~/utils/seq";

export default function Arrange() {
  const submit = useSubmit();
  const { creatures, round } = useLoaderData<typeof loader>();
  const [formation, setFormation] = useState<number[]>([]);

  return (
    <div className="font-sans">
      <h1>Arrange</h1>
      <p>
        Click to add or remove to your battle formation. Death is permanent.
      </p>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-1">
          <button
            onClick={() =>
              submit(
                { formation },
                { method: "post", encType: "application/json" }
              )
            }
          >
            Finalize
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 w-fit">
          {creatures.map(
            ($, i) =>
              !formation.includes(i) && (
                <Creature
                  key={i}
                  creature={{
                    ...$,
                    select: () =>
                      formation.length < formationLength(round) &&
                      setFormation([...formation, i]),
                    selected: false,
                  }}
                />
              )
          )}
        </div>
        <div className="flex flex-row gap-2 h-20">
          {padSlice(formation, formationLength(round)).map(($i, i) =>
            $i == null ? (
              <div key={i} className="border-solid w-20" />
            ) : (
              <Creature
                key={i}
                creature={{
                  ...creatures[$i],
                  select: () => setFormation(_.without(formation, $i)),
                  selected: false,
                }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { room, team } = params;
  invariant(typeof room == "string", "room is required");
  invariant(typeof team == "string", "team is required");
  const [creatures, bred, round] = await Promise.all([
    redis.hget<ICreature[]>(room, `t${team}`),
    redis.hget<boolean>(room, `p${team}Bred`),
    redis.hget<string>(room, "round"),
  ]);
  invariant(creatures && bred != null && round != null, "game not found");
  if (!bred) return redirect(`../breed`);
  return json({
    creatures,
    round: parseInt(round),
  });
}

export async function action({ request, params }: LoaderFunctionArgs) {
  const { room, team } = params;
  invariant(typeof room == "string", "room is required");
  invariant(typeof team == "string", "team is required");
  const { formation } = await request.json();
  const [allCreatures, round] = await Promise.all([
    redis.hget<ICreature[]>(room, `t${team}`),
    redis.hget<string>(room, `round`),
  ]);
  invariant(Array.isArray(formation), "selected is required");
  invariant(allCreatures && round !== null, "game not found");
  const roundN = parseInt(round);

  if (
    formation.length !== formationLength(roundN) &&
    formation.length !== allCreatures.length
  )
    return new Response(`${formationLength(roundN)} creatures are required`, {
      status: 400,
    });

  await redis.hset(room, { [`p${team}Ready`]: formation });
  return redirect("../battle");
}
