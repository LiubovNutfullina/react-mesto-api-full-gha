import React from "react";

function Input(props) {
  return (
    <div className="input">
      <input
        type={props.type}
        id={props.id}
        className={`input__text  input__text_type_${props.className}`}
        required
        minLength={props.min}
        maxLength={props.max}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <span className={`${props.id}-error input__text-error`}></span>
    </div>
  );
}

export default Input;
