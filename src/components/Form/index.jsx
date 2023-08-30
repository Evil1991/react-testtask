import React, { useReducer, useState } from "react";
// styles
import styles from "./Form.module.css";
// utils
import { formInputs } from "../../utils/formInputs";
// components
import InputField from "../InputField";

function reducer(prevState, action) {
  const { value, input } = action;
  const currentElement = { ...prevState[input] };
  currentElement.value = value;
  return { ...prevState, [input]: currentElement };
}

const Form = () => {
  const [isLoading, setLoading] = useState(false);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [errors, setErrors] = useState([]);
  const [state, dispatch] = useReducer(reducer, formInputs);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://testtask.alto.codes/front-feedback.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    }).then((response) => {
      if(response.result === "0") {
        setErrors(response.errors);
      } else {
        if(errors.length) setErrors([]);
        setSuccessSubmit(true);
      }
      setLoading(false);
    });
  };

  return (
    <>
      <h1>Your review</h1>
      {isLoading ? (
        <h1>Processing...</h1>
      ) : (
        !successSubmit ? <form onSubmit={handleSubmitForm}>
          {Object.keys(state).map((input) => (
            <InputField
              value={state[input].value}
              onChange={({ target: { value } }) => dispatch({ value, input })}
              type={state[input].type}
              label={state[input].label}
              placeholder={state[input].placeholder}
              min={state[input]?.min}
              max={state[input]?.max}
              key={input}
            />
          ))}
          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form> : <h1 className={styles.successHeading}>Thanks for your review!</h1>
      )}
      {errors.length ? errors.map((error, key) => (
        <li key={error + key}>{error}</li>
      )) : ""}
    </>
  );
};

export default Form;
