import React, { useReducer, useState } from "react";

function LoginForm() {
  const formulaire = {
    lName: "",
    fName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    errors: "",
    ok: "",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "UPDATE_LNAME": {
        return {
          ...state,
          lName: action.lName,
        };
      }
      case "UPDATE_FNAME": {
        return {
          ...state,
          fName: action.fName,
        };
      }
      case "UPDATE_EMAIL": {
        return {
          ...state,
          email: action.email,
        };
      }
      case "UPDATE_CONFIRM_EMAIL": {
        return {
          ...state,
          confirmEmail: action.confirmEmail,
        };
      }
      case "UPDATE_PASSWORD": {
        return {
          ...state,
          password: action.password,
        };
      }
      case "UPDATE_CONFIRM_PASSWORD": {
        return {
          ...state,
          confirmPassword: action.confirmPassword,
        };
      }
      case "UPDATE_ERRORS": {
        return {
          ...state,
          errors: action.errors,
        };
      }
      case "UPDATE_OK": {
        return {
          ...state,
          ok: action.ok,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  }
  const [stateFormulaire, setFormulaire] = useReducer(reducer, formulaire);
  const subForm = () => {
    const isEmpty = Object.values(stateFormulaire)
      .slice(0, 6)
      .some((field) => field.length == 0);
    console.log(isEmpty);
    //const isEmpty = true;
    if (isEmpty == true) {
      console.log("formulaire est vide.");
      setFormulaire({
        type: "UPDATE_ERRORS",
        errors: "Veuillez complétez le formulaire.",
      });
    } else {
      setFormulaire({
        type: "UPDATE_ERRORS",
        errors: "",
      });
      console.log("formulaire pas vide.");
      if (
        stateFormulaire.email == stateFormulaire.confirmEmail &&
        stateFormulaire.password == stateFormulaire.confirmPassword
      ) {
        setFormulaire({
          type: "UPDATE_OK",
          ok: "Votre inscription a été validé !",
        });
        setFormulaire({ type: "UPDATE_ERRORS", errors: "" });
      } else {
        setFormulaire({
          type: "UPDATE_ERRORS",
          errors: "Votre email/mot de passe ne correspondent pas.",
        });
      }
    }
  };
  return (
    <div className="mx-auto p-8 bg-grey rounded-xl space-y-2 shadow-lg w-2/6 grid mt-6">
      {stateFormulaire.errors != "" && <p>{stateFormulaire.errors}</p>}
      {stateFormulaire.errors == "" && stateFormulaire.ok != "" && (
        <p>{stateFormulaire.ok}</p>
      )}
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="text"
        required
        placeholder="Nom"
        onChange={(e) => {
          setFormulaire({
            type: "UPDATE_LNAME",
            lName: e.target.value,
          });
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="text"
        required
        placeholder="Prenom"
        onChange={(e) => {
          setFormulaire({
            type: "UPDATE_FNAME",
            fName: e.target.value,
          });
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="text"
        required
        placeholder="Email"
        onChange={(e) => {
          setFormulaire({
            type: "UPDATE_EMAIL",
            email: e.target.value,
          });
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="text"
        required
        placeholder="Confirmer votre email"
        onChange={(e) => {
          setFormulaire({
            type: "UPDATE_CONFIRM_EMAIL",
            confirmEmail: e.target.value,
          });
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="password"
        required
        placeholder="Mot de passe"
        onChange={(e) => {
          setFormulaire({
            type: "UPDATE_PASSWORD",
            password: e.target.value,
          });
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="password"
        required
        placeholder="Confirmer votre mot de passe"
        onChange={(e) => {
          setFormulaire({
            type: "UPDATE_CONFIRM_PASSWORD",
            confirmPassword: e.target.value,
          });
        }}
      ></input>
      <button
        onClick={subForm}
        className="bg-indigo-600 text-white p-2 border-2 border-solid border-transparent hover:bg-white hover:text-indigo-600 hover:border-indigo-600"
      >
        s'incrire
      </button>
    </div>
  );
}

export default LoginForm;
