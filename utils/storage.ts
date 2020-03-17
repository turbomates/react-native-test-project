import { AsyncStorage } from "react-native";

export async function setItem(key: string, value: any) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getItem(key: string, defaultValue: any) {
  return AsyncStorage.getItem(key).then(data => {
    return data === null ? defaultValue : JSON.parse(data);
  });
}
