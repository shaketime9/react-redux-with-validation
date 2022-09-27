import React from "react";
import { Input as InputRsuite } from "rsuite";
import { block } from "bem-cn";
import "./input.scss";

const b = block("input");

function Input({ text, id, onChange, type = "text", name }) {
  console.log();
  return (
    <InputRsuite className={b()} onChange={onChange} type={type} name={name}>
      {text}
    </InputRsuite>
  );
}

export default Input;
