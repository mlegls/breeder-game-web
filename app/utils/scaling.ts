const baseFormationLength = 5;
export const formationLength = (round: number) =>
  baseFormationLength + Math.round(Math.pow(round, 1.5));
