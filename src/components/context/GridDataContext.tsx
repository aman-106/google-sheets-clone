'use client';

import { IGrid } from '@/utils/CellProps';
import { initialData } from '@/utils/GridUtils';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GridDataContextType {
    data: IGrid;
    setData: React.Dispatch<React.SetStateAction<IGrid>>;
}

const GridDataContext = createContext<GridDataContextType | undefined>(undefined);

export const useGridDataContext = () => {
    const context = useContext(GridDataContext);
    if (!context) {
        throw new Error('useGridDataContext must be used within a GridDataContext');
    }
    return context;
};

export const GridDataContextProvider: React.FC<{ children: ReactNode}> = ({ children }) => {

    // IMPORTant - passing a state as function 
    // otherwise called on re render 
  const [data, setData] = useState<IGrid>(() => initialData(50, 30));


    const value: GridDataContextType = {
        data,
        setData
    };

    // 
    return (
        <GridDataContext.Provider value={value}>
            {children}
        </GridDataContext.Provider>
    );
};
