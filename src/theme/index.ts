import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { components } from "./components";
import { foundations } from "./foundations";

export const theme = extendTheme(
  {
    direction: "rtl",
    ...foundations,
    styles,
    components,
  },
  withDefaultColorScheme({ colorScheme: "teal" })
);
