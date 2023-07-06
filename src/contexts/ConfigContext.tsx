import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface State {
  language: "ar" | "en";
}

let defaultLang = localStorage.getItem("language");
if (defaultLang !== "ar" && defaultLang !== "en") defaultLang = "en";

const initialState: State = {
  language: defaultLang as "en" | "ar",
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
    setLang((prev) => {
      return prev === "ar" ? "en" : "ar";
    });
  }, [setLang]);

  useEffect(() => {
    localStorage.setItem("language", lang);
  }, [lang]);

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
