function* RowsGen():Generator<number>{
    let index =0;
    while(true){
        yield index;
        index++;
    }
}

export const rowsGen = RowsGen();