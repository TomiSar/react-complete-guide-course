import { useState } from 'react';

export const useInput = (defaultValue, validationFunc) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [isEdited, setIsEdited] = useState(false);
  const valueIsValid = validationFunc(enteredValue);

  const handleInputChange = (event) => {
    setEnteredValue(event.target.value);
    setIsEdited(false);
  };

  const handleInputBlur = () => {
    setIsEdited(true);
  };

  const handleReset = () => {
    setEnteredValue(defaultValue);
    setIsEdited(false);
  };

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: isEdited && !valueIsValid,
    handleReset,
  };
};
