import React, { useState } from "react";
import "./form.css";
export default function FormInput({
  label,
  errorMessage,
  onChange,
  id,
  className,
  ...inputProps
}) {
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div>
      <label htmlFor="fs-5">{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
        className={className || "my-3 form-input form-control p-3"}
      />
      <span className="error-span">{errorMessage}</span>
    </div>
  );
}
