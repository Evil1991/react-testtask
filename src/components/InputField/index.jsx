import React from "react";
// styles
import styles from "./InputField.module.css";

function InputField(props) {
  const { type, value, label, placeholder, onChange, min, max } = props;
  return (
    <div className={styles.inputField}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        required
      />
    </div>
  );
}

export default InputField;
