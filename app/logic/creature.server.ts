import _ from "lodash";

export interface ICreature {
  id: string;
  hp: number;
  atk: number;

  fertility: number;
  sex: boolean;
}

export const genCreature = (stats?: Partial<ICreature>): ICreature => ({
  id: _.uniqueId(),
  hp: _.random(1, 10),
  atk: _.random(1, 10),

  fertility: _.random(1, 3),
  sex: !!_.random(0, 1),
  ...stats,
});

export const initTeam = (size: number): ICreature[] => [
  ..._.times(size, () => genCreature({ sex: true })),
  ..._.times(size, () => genCreature({ sex: false })),
];

const variation = 0.2;
export const crossGene = (a: number, b: number): number =>
  Math.max(
    0,
    Math.round(_.sample([a, b]) * (1 + _.random(-variation, variation)))
  );

export const breed = (a: ICreature, b: ICreature): ICreature => ({
  id: _.uniqueId(),
  hp: crossGene(a.hp, b.hp),
  atk: crossGene(a.atk, b.atk),

  fertility: crossGene(a.fertility, b.fertility),
  sex: !!_.random(0, 1),
});

export const battle = (a: ICreature[], b: ICreature[]) => {
  let an = _.cloneDeep(a);
  let bn = _.cloneDeep(b);
  const states: [ICreature[], ICreature[]][] = [
    [_.cloneDeep(an), _.cloneDeep(bn)],
  ];
  while (an.length && bn.length) {
    const [a1, ...a2] = an;
    const [b1, ...b2] = bn;
    a1.hp -= b1.atk;
    b1.hp -= a1.atk;
    if (a1.hp <= 0) an = a2;
    if (b1.hp <= 0) bn = b2;
    states.push([_.cloneDeep(an), _.cloneDeep(bn)]);
  }
  return [states, an.length > 0 ? 0 : bn.length > 0 ? 1 : -1] as const;
};
