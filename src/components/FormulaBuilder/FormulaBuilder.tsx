"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { formulasNames } from "@/utils/BasicFunctions";

import styles from "./styles.module.css";
import { useUserInputContext } from "../context/UserInputContext";


// TODO : needs to refrcator
export function validateFormulaString(text:string,inputAsFormula:boolean) {
  const regex = /^(=)?(\w+)(\[|\()([^\])]+)(\]|\))$/;
  const match = regex.exec(text);

  if (!match) {
    return { isValid: false, error: 'Invalid format' ,inputAsFormula};
  }

  const [, isFormula, formulaName, openingBracket, formulaValues, closingBracket] = match;

  if (!formulasNames.includes(formulaName.toLowerCase())) {
    return { isValid: false, error: 'Invalid formula name' ,inputAsFormula};
  }

  if (!openingBracket || !closingBracket) {
    return { isValid: false, error: 'Mismatched brackets' ,inputAsFormula};
  }

  const splitValues = formulaValues.split(",").map(value => value.trim());
  // You can add further validation for individual values here (optional)

  return { isValid: isFormula, values: splitValues ,inputAsFormula, match};
}


const FormattedStr = React.memo(
  ({ text, isItFormula }: { text: string; isItFormula: boolean }) => {
    if (!isItFormula) {
      return <span className={styles["formula_input"]}>{text}</span>;
    }


    const validationResult = validateFormulaString(text,isItFormula);
    const {match} = validationResult;

    if (!validationResult.isValid || !match) {
      return (
        <span
          className={`${styles["formula_input"]} ${styles['tooltip']}`}
          data-tooltip={validationResult.error}
        >
          {text}
        </span>
      );
    }

    const formattedValues = validationResult.values && validationResult?.values.map((value, index) => (
      <span key={index}>
        {value}
        {index !== validationResult.values.length - 1 && ","}{" "}
      </span>
    ));

    const [, isFormula, formulaName, openingBracket, formulaValues, closingBracket] = match;

    return (
      <span className={styles["formula_input"]}>
        {isFormula && <span className={styles["formula_input-eq"]}>=</span>}
        <span className={styles["formula_input-name"]}>{formulaName}</span>
        <span className={styles["formula_input-opening-bracket"]}>
          {openingBracket}
        </span>
        {formattedValues}
        <span className={styles["formula_input-opening-bracket"]}>
          {closingBracket}
        </span>
      </span>
    );
  }
);

export function FormulaBuilder({cls}:{cls: string}) {

  const inputRef = useRef<HTMLInputElement>(null);
  const { isFormula ,handleOnBlur,userInput,handleInputChange ,handleSaveValue } = useUserInputContext();

  const handleFocus = () => {
    if(inputRef.current){
      (inputRef.current).focus();
      inputRef.current.select();
    }

  };

  const handlebb = (ve)=>{
    handleOnBlur(ve);
  }

  const handleValidateAndSaveValue = (event:React.KeyboardEvent<HTMLInputElement>)=>{
    if (event.key === "Enter") {
      const validateResult = validateFormulaString(userInput,isFormula);
      handleSaveValue(event,validateResult,isFormula);
    }
  }




  return (
    <div
      dir="ltr"
      className={`${styles.formula_input_container } ${cls}`}
      role="combobox"
      // onClick={handleFocus} // Focus on input when container is clicked
    >
      {/* <FormattedStr text={userInput} isItFormula={isFormula} />{" "} */}
      {/* Always display formatted text */}
      <input
        ref={inputRef}
        type="text" // Specify input type for clarity
        tabIndex={0}
        className={`${styles["formula_input_box"]} ${styles["blinking-border"]}`}
        value={userInput} // Bind input value to userInput state
        onChange={handleInputChange}
        onKeyDown={handleValidateAndSaveValue}
        onFocus={handleFocus} // Ensure focus stays within input
        onBlur={handlebb} // Clear formula state when input loses focus
      />
    </div>
  );
}
