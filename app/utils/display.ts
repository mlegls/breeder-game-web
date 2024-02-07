import _ from "lodash";
import emojis from "./data-ordered-emoji.json";
import {
  uniqueNamesGenerator,
  adjectives,
  names,
} from "unique-names-generator";

export const uniqueName = () =>
  uniqueNamesGenerator({
    dictionaries: [emojis, adjectives, names],
    separator: " ",
    style: "capital",
  });

// color
export const hsl_to_rgb = (h: number, s: number, l: number) => {
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    [r, g, b] = [h + 1 / 3, h, h - 1 / 3].map((c) => hue_to_rgb(p, q, c));
  }
  return [r, g, b].map((c) => Math.round(c * 255));
};

export const rgb_to_hsl = (r: number, g: number, b: number) => {
  const [r_, g_, b_] = [r, g, b].map((c) => c / 255);
  const [max, min] = [Math.max, Math.min].map((f) => f(r_, g_, b_));
  let h, s;
  const l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h =
      max === r_
        ? (g_ - b_) / d + (g_ < b_ ? 6 : 0)
        : max === g_
        ? (b_ - r_) / d + 2
        : (r_ - g_) / d + 4;
    h /= 6;
  }
  return [h, s, l];
};

export const hex_to_rgb = (hex: string): [number, number, number] =>
  [0, 2, 4].map((i) =>
    parseInt((hex[0] === "#" ? hex.slice(1) : hex).slice(i, i + 2), 16)
  ) as [number, number, number];

export const hue_to_rgb = (p: number, q: number, t: number) => {
  t += t < 0 ? 1 : t > 1 ? -1 : 0;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

export const interpolate_color = (c1: string, c2: string, factor: number) => {
  const factor_ = _.clamp(factor, 0, 1);
  const [hsl1, hsl2] = [c1, c2].map((c) => rgb_to_hsl(...hex_to_rgb(c)));
  const hsl = hsl1.map((c, i) => c + (hsl2[i] - c) * factor_) as [
    number,
    number,
    number
  ];
  return `#${hsl_to_rgb(...hsl)
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;
};
