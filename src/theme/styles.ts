import { Theme } from "@chakra-ui/react";

export const styles: Theme["styles"] = {
  global: {
    html: {
      direction: "rtl",
    },
    ".chakra-switch": {
      direction: "ltr",
    },
  },
};
