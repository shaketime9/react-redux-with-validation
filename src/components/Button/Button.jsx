import React from "react";
import { Button as ButtonRsuite } from "rsuite";
import { block } from "bem-cn";
import "./button.scss";

const b = block("button");

function Button({ text, onClick, type, ...props }) {
  console.log();
  return (
    <div className={b()}>
      <ButtonRsuite type={type} onClick={onClick} {...props}>
        {text}
      </ButtonRsuite>
    </div>
  );
}

export default Button;
