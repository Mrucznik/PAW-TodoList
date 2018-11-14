import React, { Component } from "react";
import { notify } from "react-notify-toast";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setToken } from "../actions/user";
import store from "../store";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      errors: [],
      isLogged: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onRegisterClick = () => {
    this.setState({ redirect: true });
  };

  onSubmit(e) {
    e.preventDefault();
    const { userName, email, password } = this.state;
    const { setToken } = this.props;
    let { errors } = this.state;
    const data = {
      name: userName,
      password: password
    };

    if (email && password && userName) {
      if (!this.validateEmail(email)) {
        notify.show("Invalid email", "error");
        errors.push("invalid email");
      } else if (this.password < 8) {
        notify.show("Password to short!", "error");
        errors.push("invalid password");
      } else {
        this.setState({ errors: [] });
        axios
          .post("http://localhost:8080/users/register", data)
          .then(res => {
            setToken(res.data.token);
            this.setState({ isLogged: true });
          })
          .catch(err => {
            notify.show("invalid password or email", "error");
          });
      }
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const { userName, email, password, isLogged } = this.state;

    if (isLogged) {
      return <Redirect to="/boards" />;
    }
    return (
      <div className="login-main">
        <div className="login-body">
          <form
            className="uk-panel uk-panel-box uk-form"
            onSubmit={this.onSubmit}
          >
            <h1 name="mytrello">Create a MyTrello Account</h1>
            <div>
              or <Link to="/">sign in to your account</Link>
            </div>
            <br />
            <div>
              <div>
                <label htmlFor="userName">Name</label>
                <input
                  className="login-input-text"
                  name="userName"
                  type="text"
                  value={userName}
                  required={true}
                  onChange={e => this.onChange(e)}
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  className="login-input-text"
                  name="email"
                  type="text"
                  value={email}
                  required={true}
                  onChange={e => this.onChange(e)}
                  placeholder="E-mail"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  className="login-input-text"
                  name="password"
                  type="password"
                  value={password}
                  required={true}
                  onChange={e => this.onChange(e)}
                  placeholder="Password"
                />
              </div>
              <br />
              <div className="login-div">
                <button className="register-button" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { setToken }
)(Register);
