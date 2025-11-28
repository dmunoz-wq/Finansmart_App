import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Theme = 'light' | 'dark';
export type Lang = 'es' | 'en';

type GlobalState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
};

export const GlobalContext = createContext<GlobalState | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Lang>('es');

  return (
    <GlobalContext.Provider value={{ theme, setTheme, lang, setLang }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error('useGlobalContext must be used within GlobalProvider');
  return ctx;
}

