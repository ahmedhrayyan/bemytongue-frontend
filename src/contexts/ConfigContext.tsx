import { createContext, ReactNode, useCallback, useState } from "react";

interface State {
  language: "ar" | "en";
}

const initialState: State = {
  language: "ar",
};

interface Context extends State {
  onLangToggle: () => void;
}

export const ConfigContext = createContext<Context>({
  ...initialState,
  // default value for functions
  onLangToggle: () => {
    // do nothing
  },
});

export default function ConfigProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState(initialState.language);
  const onLangToggle = useCallback(() => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  }, [setLang]);

  return (
    <ConfigContext.Provider
      value={{
        language: lang,
        onLangToggle: onLangToggle,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
