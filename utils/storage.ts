import { Platform } from 'react-native';

let native: any | null = null;

function getNative() {
  if (native) return native;
  if (Platform.OS === 'web') return null;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  native = require('@react-native-async-storage/async-storage/lib/commonjs/index.js').default;
  return native;
}

export async function getItem(key: string) {
  const n = getNative();
  if (n) return n.getItem(key);
  return Promise.resolve(window.localStorage.getItem(key));
}

export async function setItem(key: string, value: string) {
  const n = getNative();
  if (n) return n.setItem(key, value);
  return Promise.resolve(window.localStorage.setItem(key, value));
}

export default { getItem, setItem };
