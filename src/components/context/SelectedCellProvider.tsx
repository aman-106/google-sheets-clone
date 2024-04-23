'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CellIndex {
    x: number;
    y: number;
  }

interface SelectedCellContextType {
    cellInfo:CellIndex;
    setCellInfo: React.Dispatch<React.SetStateAction<CellIndex>>;
}

const SelectedCellContext = createContext<SelectedCellContextType | undefined>(undefined);

export const useSelectedCellContext = () => {
    const context = useContext(SelectedCellContext);
    if (!context) {
        throw new Error('useSelectedCellContext must be used within a SelectedCellContext');
    }
    return context;
};

export const SelectedCellProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cellInfo, setCellInfo] = useState<CellIndex>({x:-1,y:-1});


    const value: SelectedCellContextType = {
        cellInfo,
        setCellInfo
    };

    return (
        <SelectedCellContext.Provider  value={value}>
            {children}
        </SelectedCellContext.Provider>
    );
};
