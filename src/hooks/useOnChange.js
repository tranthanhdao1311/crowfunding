import debounce from "lodash.debounce";
import React, { useState } from "react";

const useOnChange = (time = 0) => {
  const [value, setValue] = useState(null);
  const handleOnChange = debounce((e) => {
    setValue(e.target.value);
  }, time);
  return [value, handleOnChange];
};

export default useOnChange;
