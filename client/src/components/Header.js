import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a
              className="btn btn-outline-light my-2 my-sm-0"
              href="/auth/google"
            >
              Login With Google
            </a>
          </li>
        );
      default:
        return (
          <li>
            <a
              className="btn btn-outline-light my-2 my-sm-0"
              href="/api/logout"
            >
              Logout
            </a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            className="navbar-brand"
          >
            iightBet
          </Link>
          <ul className="navbar-nav">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
