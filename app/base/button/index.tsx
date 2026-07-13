import { FC, JSX } from "react";

type ButtonProps={
    variant:"Approve"|"Reject";
}
const ButtonFactory={
Approve:()=>(
    <button className="bg-green-500 p-3 rounded-xl hover:opacity-75">Approve</button>
),
Reject:()=>(
<button className="bg-red-500 p-3 rounded-xl hover:opacity-75">Reject</button>
)
}
export const Button:FC<ButtonProps>=({variant}):JSX.Element=>{
return ButtonFactory[variant]()
}