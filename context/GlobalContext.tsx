import * as storage from '@/utils/storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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
  const [langState, setLangState] = useState<Lang>('es');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await storage.getItem('lang');
        if (saved === 'en' || saved === 'es') setLangState(saved as Lang);
      } catch (e) {
        // ignore
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  async function setLang(l: Lang) {
    setLangState(l);
    try {
      await storage.setItem('lang', l);
    } catch (e) {
      // ignore
    }
  }

  if (!loaded) return null;

  return (
    <GlobalContext.Provider value={{ theme, setTheme, lang: langState, setLang }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error('useGlobalContext must be used within GlobalProvider');
  return ctx;
}

