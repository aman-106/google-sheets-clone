function* RowsGen(){
    let index =1;
    while(true){
        yield index;
        index++;
    }
}

export const rowsGen = RowsGen();