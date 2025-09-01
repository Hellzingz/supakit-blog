import { useState } from "react";

export function useToggle(initialState){
  const [toggle, settoggle] = useState(initialState);

  const changeToggle = () => {
    settoggle(prev => !prev);
  };

  return {toggle,changeToggle};
}