"use client";

import React, { useCallback, useMemo, useState } from "react";
import { formulasNames } from "@/data/BasicFunctions";

import styles from "./styles.module.css";
import { log } from "console";

// TODO : needs to refrcator

const FormattedStr = React.memo(
  ({ text, isItFormula }: { text: string; isItFormula: boolean }) => {
    if (!isItFormula) {
      return <span className={styles["formula_input"]}>{text}</span>;
    }

    const regex = /^(=)?(\w+)(\[|\()([^\])]+)(\]|\))$/;
    const match = regex.exec(text);

    if (!match) {
      return (
        <span className={`${styles["formula_input"]} ${styles['tooltip']}`} data-tooltip="Invalid format">
          {text}
        </span>
      );
    }

    const [
      ,
      isFormula,
      formulaName,
      openingBracket,
      formulaValues,
      closingBracket,
    ] = match;

    if (!formulasNames.includes(formulaName.toLowerCase())) {
      return (
        <span
          className={`${styles["formula_input"]} ${styles['tooltip']}`}
          data-tooltip="Invalid formula name"
        >
          {text}
        </span>
      );
    }

    if (!openingBracket || !closingBracket) {
      return (
        <span
          className={`${styles["formula_input"]} ${styles['tooltip']}`}
          data-tooltip="Mismatched brackets"
        >
          {text}
        </span>
      );
    }

    const formattedValues = formulaValues.split(",").map((value, index) => (
      <span key={index}>
        {value.trim()}
        {index !== formulaValues.length - 1 && ","}{" "}
        {/* Add comma for non-final values */}
      </span>
    ));

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

export function FormulaBuilder() {
  const [userInput, setUserInput] = useState("");
  const [isFormula, setIsformula] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const isFormula = text.startsWith("=");

    setUserInput(text);
    setIsformula(isFormula);
  };

  const handleFocus = () => {
    const input = document.querySelector(
      `.${styles["formula_input_box"]}`
    ) as HTMLInputElement;
    input.focus();
    input.select();
  };

  return (
    <div
      dir="ltr"
      className={styles.formula_input_container}
      role="combobox"
      onClick={handleFocus} // Focus on input when container is clicked
    >
      <FormattedStr text={userInput} isItFormula={isFormula} />{" "}
      {/* Always display formatted text */}
      <input
        type="text" // Specify input type for clarity
        tabIndex={0}
        className={`${styles["formula_input_box"]} ${styles["blinking-border"]}`}
        value={userInput} // Bind input value to userInput state
        onChange={handleInputChange}
        onFocus={handleFocus} // Ensure focus stays within input
        onBlur={() => setIsformula(false)} // Clear formula state when input loses focus
      />
    </div>
  );
}
