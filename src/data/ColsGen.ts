const cache: { [key: number]: string } = {};

function generateColumnName(index: number): string {
  if (index in cache) {
    return cache[index];
  }

  let columnName = '';

  while (index > 0) {
    const remainder = (index - 1) % 26;
    columnName = String.fromCharCode(65 + remainder) + columnName;
    index = Math.floor((index - remainder) / 26);
  }

  cache[index] = columnName;
  return columnName;
}

function* columnNamesGenerator(): Generator<string> {
  let index = 1;

  while (true) {
    yield generateColumnName(index);
    index++;
  }
}


const columnGen = columnNamesGenerator();

export {columnGen}
// console.log(columnGen.next().value); // Output: A
// console.log(columnGen.next().value); // Output: B
// console.log(columnGen.next().value); // Output: C
// // You can continue calling columnGen.next() to get the next column name
