import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandeler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "invalid input",
        message: "Please enter a valid name and age (non empty values).",
      });
      return;
    }

    if (+enteredAge < 1) {
      // parse to Int
      setError({
        title: "invalid age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }

    console.log(enteredUsername, enteredAge);
    props.onAddUser(enteredUsername, enteredAge);

    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandeler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandeler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandeler = () => {
    setError(null);
  }; 

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandeler}
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={addUserHandeler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandeler}
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandeler}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
