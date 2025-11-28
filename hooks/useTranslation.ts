import { useGlobalContext } from '@/context/GlobalContext';
import en from '@/i18n/locales/en.json';
import es from '@/i18n/locales/es.json';

const locales: Record<string, any> = { en, es };

export default function useTranslation() {
  const { lang } = useGlobalContext();
  const dict = (locales as any)[lang] || es;

  function t(key: string) {
    if (!key) return '';
    const parts = key.split('.');
    let cur: any = dict;
    for (const p of parts) {
      if (cur && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p];
      else return key;
    }
    return typeof cur === 'string' ? cur : key;
  }

  return { t };
}
