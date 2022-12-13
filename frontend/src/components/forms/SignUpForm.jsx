import React, { useState } from "react";
import FormInput from "./FormInput";

export default function SignUpForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDay: "",
  });

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Enter first Name",
      errorMessage: "It should be more than 3 characters",
      label: "First Name:",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      className: "my-3 form-input form-control p-3",
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Enter last Name",
      errorMessage: "It should be more than 3 characters!",
      label: "Last Name:",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      className: "text-danger",
    },
    {
      id: 3,
      name: "city",
      type: "text",
      placeholder: "Enter your city",
      errorMessage: "It should not be a Empty!",
      label: "City:",
      required: true,
    },
    {
      id: 4,
      name: "country",
      type: "text",
      placeholder: "Enter your Country",
      errorMessage: "It should not be a Empty!",
      label: "Country:",
      required: true,
    },
    {
      id: 5,
      name: "email",
      type: "email",
      placeholder: "abc@def.net",
      errorMessage: "It should be a valid email address!",
      label: "E-Mail:",
      className: "text-danger my-3 form-input form-control p-3",
      required: true,
    },
    {
      id: 6,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },

    {
      id: 7,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 8,
      name: "birthDay",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
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
        <button className=" btn btn-outline-dark px-5 my-3">Sign Up</button>
      </form>
    </>
  );
}
