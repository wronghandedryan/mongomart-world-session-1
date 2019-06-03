// workaround for buffer bug in Stackblitz
global.Buffer = require('safer-buffer').Buffer;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

import Cart from './src/Cart/Cart';
import Home from './src/Home';
import ProductItemDetail from './src/ProductDetail/ProductItemDetail';

import { stitchAppId, stitchClusterNames } from './config';

import './style.css';

export default class Routing extends Component {
  constructor(props) {
    super(props);

    const client = Stitch.initializeDefaultAppClient(stitchAppId);

    this.state = {
      stitchClusterNames: stitchClusterNames,
      client: client,
      clientAuthenticated: client.auth.loginWithCredential(
        new AnonymousCredential()
      )
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <React.Fragment>
          <nav
            className="navbar navbar-inverse navbar-fixed-top"
            role="navigation"
          >
            <div className="container">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <Link
                  className="navbar-brand"
                  to="/"
                >
                  MongoMart
                </Link>
              </div>
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav navbar-right" id="main-nav-right">
                  <li>
                    <Link to="/cart">
                      <button type="button" className="cart-button btn btn-success">
                        <span
                          className="glyphicon glyphicon-shopping-cart"
                          aria-hidden="true"
                        />
                        Cart
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container">
            <Route
              exact
              path="/"
              render={props => <Home {...props} {...this.state} />}
            />
            <Route
              path="/category/:category"
              render={props => <Home {...props} {...this.state} />}
            />
            <Route
              path="/cart"
              render={props => <Cart {...props} {...this.state} />}
            />
            <Route
              path="/item/:id"
              render={props => <ProductItemDetail {...props} {...this.state} />}
            />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<Routing />, document.getElementById('root'));
