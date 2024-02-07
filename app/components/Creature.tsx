import _ from "lodash";
import type { ICreature } from "~/logic/creature.server";
import { interpolate_color } from "~/utils/display";

export type ICreatureDiv = ICreature & {
  select: () => void;
  selected: boolean;
  fertilityLeft?: number;
};

function StatRow({
  name,
  value,
  min,
  max,
}: {
  name: string;
  value: number;
  min: number;
  max: number;
}) {
  return (
    <div className="flex flex-row justify-between">
      <div>{name}</div>
      <div
        style={{
          color: interpolate_color(
            "#d50000",
            "#00c853",
            _.clamp(value / (max - min), 0, 1)
          ),
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function Creature({ creature }: { creature: ICreatureDiv }) {
  return (
    <div
      className={`flex flex-col p-2 hover:border-dashed active:border-solid ${
        creature.selected ? "border-dashed" : "border-solid"
      } ${
        creature.sex
          ? "text-blue-500 hover:text-blue-700"
          : "text-pink-500 hover:text-pink-700"
      }`}
      onClick={creature.select}
    >
      <div className="pb-2">
        <strong>{creature.name}</strong>
      </div>
      <StatRow name="hp: " value={creature.hp} min={0} max={10} />
      <StatRow name="atk: " value={creature.atk} min={0} max={10} />
      <StatRow name="fertility: " value={creature.fertility} min={0} max={10} />
      {typeof creature.fertilityLeft == "number" && (
        <div>{`can breed: ${creature.fertilityLeft}`}</div>
      )}
    </div>
  );
}
