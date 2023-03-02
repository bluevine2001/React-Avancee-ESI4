import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import auth from "../firebase";
import { UserContext } from "../context/user";

/* setPersistence(auth, browserSessionPersistence).then(() => {
  return signInWithEmailAndPassword(auth, email, password);
}); */

function LoginForm() {
  const { setUser } = useContext(UserContext);
  const [mode, setMode] = useState("signin");
  const navigate = useNavigate();

  function changeMode(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    if (mode == "signin") {
      setMode("signup");
    } else {
      setMode("signin");
    }
  }

  interface Formulaire {
    lName: string;
    fName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    errors: string;
    ok: string;
  }
  /*  interface Action {
    type: string;
    lName?: string;
    fName?: string;
    email?: string;
    confirmEmail?: string;
    password?: string;
    confirmPassword?: string;
    errors?: string;
    ok?: string;
  } */
  const formulaire: Formulaire = {
    lName: "",
    fName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    errors: "",
    ok: "",
  };
  function reducer(state: Formulaire, action: any) {
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
    let isEmpty = false;
    if (mode == "signup") {
      isEmpty = Object.values(stateFormulaire)
        .slice(0, 6)
        .some((field) => field.length == 0);
    } else {
      if (stateFormulaire.email == "" && stateFormulaire.password == "") {
        isEmpty = true;
      }
    }

    if (isEmpty == true) {
      setFormulaire({
        type: "UPDATE_ERRORS",
        errors: "Veuillez complétez le formulaire.",
      });
    } else {
      setFormulaire({
        type: "UPDATE_ERRORS",
        errors: "",
      });
      //console.log("formulaire pas vide.");
      if (mode == "signup") {
        if (
          stateFormulaire.email == stateFormulaire.confirmEmail &&
          stateFormulaire.password == stateFormulaire.confirmPassword
        ) {
          createUserWithEmailAndPassword(
            auth,
            stateFormulaire.email,
            stateFormulaire.password
          )
            .then((userCredential) => {
              const user = userCredential.user;
              setUser(user);
              console.log(user);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage + errorCode);
            });
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
      } else {
        // connexion
        signInWithEmailAndPassword(
          auth,
          stateFormulaire.email,
          stateFormulaire.password
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setUser(user);
            console.log(user);
            navigate("/");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage + errorCode);
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
      {mode == "signin" ? <h1>Connexion</h1> : <h1>Inscription</h1>}
      {mode == "signup" && (
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
      )}
      {mode == "signup" && (
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
      )}
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
      {mode == "signup" && (
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
      )}
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
      {mode == "signup" && (
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
      )}
      <button
        onClick={subForm}
        className="bg-indigo-600 text-white p-2 border-2 border-solid border-transparent hover:bg-white hover:text-indigo-600 hover:border-indigo-600"
      >
        {mode == "signin" ? "Se connecter" : "S'inscrire"}
      </button>
      <a
        href=""
        onClick={(e) => {
          changeMode(e);
        }}
      >
        {mode == "signin" ? "S'inscrire" : "Se connecter"}
      </a>
    </div>
  );
}

export default LoginForm;
