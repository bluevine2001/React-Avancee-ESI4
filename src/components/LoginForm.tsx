import React, { useState } from "react";

function LoginForm() {
  const [Name, setName] = useState("");
  const [Fname, setFname] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [ok, setOk] = useState("");
  const subForm = () => {
    if (Email == confirmEmail && password == confirmPassword) {
      setOk("Votre inscription a été validé !");
      setErrors("");
    } else {
      setErrors("Votre email/mot de passe ne correspondent pas.");
    }
  };
  return (
    <div className="mx-auto p-8 bg-grey rounded-xl space-y-2 shadow-lg w-2/6 grid mt-6">
      {errors != "" && <p>{errors}</p>}
      {errors == "" && ok != "" && <p>{ok}</p>}
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="text"
        required
        placeholder="Nom"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="text"
        required
        placeholder="Prenom"
        onChange={(e) => {
          setFname(e.target.value);
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="text"
        required
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="text"
        required
        placeholder="Confirmer votre email"
        onChange={(e) => {
          setConfirmEmail(e.target.value);
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="password"
        required
        placeholder="Mot de passe"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <input
        className="border-solid border-2 border-indigo-600 p-2"
        type="password"
        required
        placeholder="Confirmer votre mot de passe"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
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
