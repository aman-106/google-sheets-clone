import React, { useState, useEffect } from 'react';

interface DebounceOptions<T extends (...args: any[]) => any> {
    func: T;
    delay: number;
}

function useDebounce<T extends (...args: any[]) => any>({ func, delay }: DebounceOptions<T>): T {
    const [debouncedFunc, setDebouncedFunc] = useState<T>(func);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFunc(func);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [func, delay]);

    return debouncedFunc;
}

export default useDebounce;
