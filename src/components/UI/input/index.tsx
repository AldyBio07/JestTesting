import React from "react";
import { InputProps } from "./input.interface";

const Input = (props: InputProps) => {
    const { type } = props;
    return(
        <div>
            {type === "textarea" ? <textarea {...props} /> : <input {...props} />}
        </div>
     )
};

export default Input;