import { useState } from "react";
                                               
const useValidate = (validateFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateFn(enteredValue);
  const hasError = !isValid && isTouched;
  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const valueBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    isValid,
    hasError,
    valueBlurHandler,
    valueChangeHandler,
    reset,
    isTouched,
  };
};
export default useValidate;