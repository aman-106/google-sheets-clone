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
  let index = 0;

  while (true) {
    yield generateColumnName(index);
    index++;
  }
}


const columnGen = columnNamesGenerator();

export {columnGen}
