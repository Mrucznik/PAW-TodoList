import React, { Component } from "react";
import { notify } from "react-notify-toast";
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: [],
      isLogged: false,
      redirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onRegisterClick = () => {
    this.setState({ redirect: true })
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { setToken } = this.props;
    let { errors } = this.state;
    const data = {
      "auth": {
        "email": email,
        "password": password
      }
    };


    if (email && password) {
      if (!this.validateEmail(email)) {
        notify.show("Invalid email", "error")
        errors.push("invalid email")
      } else {
        this.setState({ errors: [] })
        this.setState({ isLogged: true })
        // api.setToken(data)
        //   .then(res => {
        //     setToken(res.data["auth_token"])
        //     this.setState({ isLogged: true })
        //   }).catch(err => {
        //     notify.show("invalid password or email", "error");
        //   });
      }
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const { email, password, isLogged } = this.state;
    const { redirect } = this.state;

    if (isLogged) {
      return (
        <Redirect to="/" />
      )
    }
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="login-main">
        <form
          className="uk-panel uk-panel-box uk-form"
          onSubmit={this.onSubmit}
        >
          <h1 className>
            Log in to MyTrello
          </h1>
          <hr />
          <div className="">
            <div className="">
              <div className="">
                <input
                  className=""
                  name="email"
                  type="text"
                  value={email}
                  required={true}
                  onChange={e => this.onChange(e)}
                  placeholder="E-mail"
                />
              </div>
              <div className="">
                <input
                  className=""
                  name="password"
                  type="password"
                  value={password}
                  required={true}
                  onChange={e => this.onChange(e)}
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <hr />
          <br />
          <div className="">
            <div className="">
              <div className="">
                <button className="" type="submit">
                  LOGIN
                </button>
              </div>
              <br /><br />
              <hr />
              <div className="">
                <button className="" onClick={this.onRegisterClick}>
                  REGISTER
                </button><br />
                Are you new here?
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}



export default Login