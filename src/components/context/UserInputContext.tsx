"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { useGridDataContext } from "./GridDataContext";
import { useSelectedCellContext } from "./SelectedCellProvider";
import {   gridManager } from "@/utils/GridManager";

// Regular expression to match strings starting with letters followed by numbers
function isValidArray(arr: Array<String>) {
  const regex = /^[a-zA-Z]+\d+$/;
  for (let str of arr) {
    if (typeof str !== "string" || (!/^\d+$/.test(str) && !regex.test(str))) {
      return false; // Return false if any element doesn't meet the criteria
    }
  }
  return true; // Return true if all elements meet the criteria
}

type ValidateResultType =
  | {
      isValid: boolean;
      error: string;
      values?: undefined;
      match?: undefined;
      inputAsFormula: boolean;
    }
  | {
      isValid: string;
      values: string[];
      match: RegExpExecArray;
      error?: undefined;
      inputAsFormula: boolean;
    };

interface UserInputContextType {
  userInput: string;
  isFormula: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsFormula: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  inputContainerStyle: React.CSSProperties;
  setInputContainerStyle: React.Dispatch<
    React.SetStateAction<React.CSSProperties>
  >;
  handleSaveValue: (
    event: React.KeyboardEvent<HTMLInputElement>,
    validationResult: ValidateResultType,
    inputAsFormula: boolean
  ) => void;
  handleOnBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInputContext = createContext<UserInputContextType | undefined>(
  undefined
);

export const useUserInputContext = () => {
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error(
      "useUserInputContext must be used within a UserInputProvider"
    );
  }
  return context;
};

export const UserInputProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userInput, setUserInput] = useState<string>("");
  const [isFormula, setIsFormula] = useState<boolean>(false);
  const { data: currenGridData, setData } = useGridDataContext();
  const { cellInfo } = useSelectedCellContext();

  const [inputContainerStyle, setInputContainerStyle] =
    useState<React.CSSProperties>({
      display: "none",
    });

    function handleSaveValue(
      event: React.KeyboardEvent<HTMLInputElement>,
      validateFormulaString: ValidateResultType,
      inputAsFormula: boolean
    ) {
      if (event.key === "Enter" && userInput) {
        const clickedCell = cellInfo;
        const { match, values } = validateFormulaString;
    
        if (inputAsFormula && match && match[1] && isValidArray(values)) {
          // Handle formula input
          const [, isFormula, formulaName] = match;
    
          // Create a new cell node based on the input formula
          const newCell = gridManager.getCellNode(
            { r: clickedCell.y, c: clickedCell.x },
            null,
            false,
            true,
            userInput,
            []
          );
    
          // Update state immutably by creating a new copy of the gridData
          setData((data) => {
            const updatedData = data.map((row) => [...row]); // Create a shallow copy of rows
            updatedData[clickedCell.y][clickedCell.x] = newCell; // Update the specific cell
    
            // Trigger the cell change manager if needed
            if (gridManager.handleCellChangeManager(updatedData, newCell)) {
              return updatedData; // Return the updated data
            }
    
            return data; // Return the original data if no change manager trigger
          });
    
          // Hide the input container
          setInputContainerStyle({ ...inputContainerStyle, display: "none" });
        } else if (!inputAsFormula && clickedCell) {
          // Handle non-formula input (number)
          const inputValue = Number(userInput);
    
          if (!isNaN(inputValue)) {
            // Create a new cell node with the input number
            const newCell = gridManager.getCellNode(
              { r: clickedCell.y, c: clickedCell.x },
              inputValue,
              true,
              true,
              null,
              []
            );
    
            console.log("new value",Date.now().toString());
            // Update state immutably by creating a new copy of the gridData
            setData((data) => {
              const updatedData = data.map((row) => [...row]); // Create a shallow copy of rows
              updatedData[clickedCell.y][clickedCell.x] = newCell; // Update the specific cell
    
              // Trigger the cell change manager if needed
              if (gridManager.handleCellChangeManager(updatedData, newCell, false)) {
                return updatedData; // Return the updated data
              }
    
              return data; // Return the original data if no change manager trigger
            });
    
            // Hide the input container
            setInputContainerStyle({ ...inputContainerStyle, display: "none" });
          } else {
            console.error("Invalid input - must be a number");
          }
        } else {
          console.error("Invalid formula entered");
        }
      } else {
        alert("Please enter a valid value.");
      }
    }
    

  // handleSetData = useDebounce(handleSetData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const isFormula = text.startsWith("=");

    setUserInput(text);
    setIsFormula(isFormula);

    // console.log("Computed Value:", computedValue()); // Expected output: 15
  };

  const handleOnBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput("");
    setIsFormula(false);
  };

  const value: UserInputContextType = {
    userInput,
    isFormula,
    handleInputChange,
    setIsFormula,
    setUserInput,
    inputContainerStyle,
    setInputContainerStyle,
    handleSaveValue,
    handleOnBlur,
  };

  //
  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
};
