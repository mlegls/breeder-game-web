import type { ICreature } from "~/logic/creature.server";

export type ICreatureDiv = ICreature & {
  select: () => void;
  selected: boolean;
  fertilityLeft?: number;
};

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
      <div>{`hp: ${creature.hp}`}</div>
      <div>{`atk: ${creature.atk}`}</div>
      <div>{`fertility: ${creature.fertility}`}</div>
      {creature.fertilityLeft && (
        <div>{`can breed: ${creature.fertilityLeft}`}</div>
      )}
    </div>
  );
}
