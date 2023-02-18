import React from "react";

import { validate, VALIDATOR_REQUIRE } from "../../utils/validate/validators";

import { Label, InputCont, ErrorMessage } from "./Input-styles";

const Input = ({
  text,
  value,
  onChange,
  type,
  name,
  validators = [VALIDATOR_REQUIRE()],
  errorText,
  isTouched,
  disabled,
  styles
}) => {
  return type === "file" ? (
    <Label isImage style={styles}>
      {text}
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onChange}
        name={name}
        disabled={disabled}
        isValid={isTouched && !validate(value.name || "", validators)}
        accept="image/png, image/jpeg"
      />
    </Label>
  ) : (
    <Label className="form-label">
      {text}
      <InputCont
        type={type}
        onChange={onChange}
        name={name}
        disabled={disabled}
        isValid={isTouched && !validate(value, validators)}
        isButton={!type.localeCompare("submit")}
      />
      {isTouched && !validate(value, validators) && (
        <ErrorMessage>
          {errorText ? errorText : "This field is required"}
        </ErrorMessage>
      )}
    </Label>
  );
};

export default Input;
