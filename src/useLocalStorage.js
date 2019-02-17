import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [item, setItem] = useState();

  useEffect(() => {
    if (key && window.localStorage[key]) {
      const itemFromLocalStorage = JSON.parse(window.localStorage[key]);
      setItem(itemFromLocalStorage);
    } else if (key && initialValue) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, []);

  useEffect(() => {
    if (item) {
      window.localStorage.setItem(key, JSON.stringify(item));
    }
  });

  const finalItem = item ? item : initialValue;

  return [finalItem, setItem];
};

export default useLocalStorage;
