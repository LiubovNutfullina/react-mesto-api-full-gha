import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import Input from "./Input";
import Header from "./Header";

const Register = (props) => {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormValue({
      ...formValue,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(formValue.email, formValue.password)
      .then((res) => {
        props.onSubmit(res.status === 201);

        navigate("/sign-in", { replace: true });
        // auth.authorize(formValue.email, formValue.password)
        // .then((res) => {
        //   console.log(res)
        //   navigate('/', {replace: true});
        // })
        // .catch(err => console.log(err));
      })
      .catch((err) => {
        props.onSubmit(false);
        console.log(err);
      });
  };

  return (
    <div className="form">
      <Header buttonText="Войти" linkPath="/sign-in" />
      <h2 className="form__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="form__content">
        <Input
          type="email"
          id="email"
          className="email"
          placeholder="Email"
          onChange={handleChange}
          min={"2"}
          max={"40"}
        />
        <Input
          type="password"
          id="password"
          className="password"
          placeholder="Пароль"
          onChange={handleChange}
          min={"2"}
          max={"40"}
        />
        <button type="submit" className="form__button-submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="form__signin">
        <p className="form__text">Уже зарегистрированы?</p> 
        <Link to="/sign-in" className="form__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
