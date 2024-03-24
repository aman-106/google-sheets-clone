'use client';

import { useState } from "react";


export function SheetsNameField(){
    const [name, setName] = useState('Untitled Sheet');



    return (
        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="!ml-4  bg-transparent text-center border-2 border border-transparent hover:rounded-sm hover:border-2 hover:border-gray-50 focus:rounded-sm focus:border-2 focus:border-inherit"
      ></input>
    )

}