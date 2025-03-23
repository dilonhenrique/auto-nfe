import { InputProps } from "@abstrato/hero-ui";

export const MASKS = {
  cnpj: { mask: "00.000.000/0000-00" },
  tribNac: { mask: "00.00.00" },
  nbs: { mask: "000000000" },
  decimal: {
    mask: Number,
    radix: ",",
    thousandsSeparator: ".",
    mapToRadix: ["."],
    normalizeZeros: true,
    padFractionalZeros: true,
    scale: 2,
  },
} satisfies Record<string, InputProps["mask"]>;
