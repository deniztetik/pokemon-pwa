import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue = localStorage.getItem(key)) => {
  const [item, setItem] = useState();

  useEffect(() => {
    if (key && window.localStorage[key]) {
      const itemFromLocalStorage = JSON.parse(window.localStorage[key]);
      setItem(itemFromLocalStorage);
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
