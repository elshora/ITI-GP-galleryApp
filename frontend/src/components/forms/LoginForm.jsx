import React, { useState } from "react";
import FormInput from "./FormInput";

export default function LoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "abc@def.net",
      errorMessage: "It should be a valid email address!",
      label: "E-Mail:",
      className: "text-danger",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Enter your Password",
      label: "Password:",
      required: true,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-3 mb-md-5">
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className=" btn btn-outline-dark px-5 my-3">Login</button>
      </form>
    </>
  );
}
