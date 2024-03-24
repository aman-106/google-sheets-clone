type NumericInput = number | string;

// Function type for arithmetic operations (sum, subtract, multiply, divide)
type ArithmeticFunction = (numbers: NumericInput[]) => number | string;

function sum(numbers: NumericInput[]): number | string {
  const parsedNumbers = parseNumbers(numbers);
  if (typeof parsedNumbers === 'string') {
    return parsedNumbers;
  }

  return parsedNumbers.reduce((acc, num) => acc + num, 0);
}

function subtract(numbers: NumericInput[]): number | string {
  const parsedNumbers = parseNumbers(numbers);
  if (typeof parsedNumbers === 'string') {
    return parsedNumbers;
  }

  return parsedNumbers.reduce((acc, num, index) => (index === 0 ? num : acc - num), parsedNumbers[0]);
}

function multiply(numbers: NumericInput[]): number | string {
  const parsedNumbers = parseNumbers(numbers);
  if (typeof parsedNumbers === 'string') {
    return parsedNumbers;
  }

  return parsedNumbers.reduce((acc, num) => acc * num, 1);
}

function divide(numbers: NumericInput[]): number | string {
  const parsedNumbers = parseNumbers(numbers);
  if (typeof parsedNumbers === 'string') {
    return parsedNumbers;
  }

  return parsedNumbers.reduce((acc, num, index) => (index === 0 ? num : acc / num), parsedNumbers[0]);
}

// Helper function to parse input and handle errors
function parseNumbers(numbers: NumericInput[]): number[] | string {
  const parsed = numbers.map((num) => {
    if (typeof num === 'string') {
      const parsedNum = parseFloat(num.replace(/,/g, '')); // Replace commas and parse
      if (isNaN(parsedNum)) {
        return 'Invalid input: ' + num;
      }
      return parsedNum;
    }
    return num;
  });

  // Check for non-numeric values
  if (parsed.some((num) => typeof num === 'string')) {
    return parsed.find((num) => typeof num === 'string') as string;
  }

  return parsed as number[];
}

// Function map for easy access to operations
const arithmeticFunctions: { [key: string]: ArithmeticFunction } = {
  sum,
  subtract,
  multiply,
  divide,
};

function calculate(operation: string, numbers: NumericInput[]): number | string {
  const func = arithmeticFunctions[operation.toLowerCase()];
  if (!func) {
    return 'Invalid operation: ' + operation;
  }

  return func(numbers);
}

const formulasNames = Object.keys(arithmeticFunctions);


export { formulasNames};

