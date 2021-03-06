import React, { Component } from "react";
import { notify } from "react-notify-toast";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from '../actions/user';
import store from "../store";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { email, password } = this.state;
    const { setUser } = this.props;

    let { errors } = this.state;
    const data = {
      name: email,
      password: password
    };

    if (email && password) {
      this.setState({ errors: [] });

      this.setState( () => {
        setUser(data).then(res => {
          this.setState({ isLogged: true });
        }).catch(err => {
          notify.show("invalid password or email", "error");
        });
      })
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const { email, password, isLogged } = this.state;

    if (isLogged) {
      console.log(store.getState().user.token);
      return <Redirect to="/boards" />;
    }
    return (
      <div className="login-main">
        <div className="login-body">
          <form
            className="uk-panel uk-panel-box uk-form"
            onSubmit={this.onSubmit}
          >
            <h1 name="mytrello">Log in to MyTrello</h1>
            <div>
              or <Link to="/register">create an account</Link>
            </div>
            <br />
            <div>
              <div>
                <label htmlFor="email">Name</label>
                <input
                  className="login-input-text"
                  name="email"
                  type="text"
                  value={email}
                  required={true}
                  onChange={e => this.onChange(e)}
                  placeholder="Name"
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
                <button className="login-button" type="submit">
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user:state.user.current
  }
}


export default connect(mapStateToProps, { setUser })(Login)