import { useEffect, useState } from "react";

const PREFIX = "whatsapp-clone-";

export default function useLocalStorage(key, initialValue) {
  //initialvalue is initial value of the the state
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    //getting values from localstorage and parsing it is slow so we use a function in useState
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null && jsonValue != "undefined")
      return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);
  return [value, setValue];
}
