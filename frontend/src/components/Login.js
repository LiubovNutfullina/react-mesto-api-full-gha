import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import Input from "./Input";
import Header from "./Header";

const Login = (props) => {
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

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      auth.checkToken(localStorage.getItem("jwt")).then((res) => {
        if (res.status === 200) {
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLoginSubmit(formValue, setFormValue);
  }

  return (
    <div className="form">
      <Header buttonText="Регистрация" linkPath="/sign-up" />
      <h2 className="form__title">Вход</h2>
      <form className="form__content" onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          className="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          min={"2"}
          max={"40"}
        />
        <Input
          type="password"
          id="password"
          className="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          min={"2"}
          max={"40"}
        />
        <button type="submit" className="form__button-submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
