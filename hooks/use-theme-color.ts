/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { GlobalContext } from '@/context/GlobalContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useContext } from 'react';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Prefer app-level theme from GlobalContext when available, otherwise fall back to system color scheme.
  const ctx = useContext(GlobalContext);
  const theme = ctx?.theme ?? useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
