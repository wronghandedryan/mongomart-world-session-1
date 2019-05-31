import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Stitch, CustomCredential } from 'mongodb-stitch-browser-sdk';
import jwt from 'jsonwebtoken';

import Cart from './src/Cart/Cart';
import Home from './src/Home';
import ProductItemDetail from './src/ProductDetail/ProductItemDetail';

import { stitchAppId, stitchClusterNames, jwtUser } from './src/config';

export default class Routing extends Component {
  constructor(props) {
    super(props);

    const client = Stitch.initializeDefaultAppClient(stitchAppId);
    const jwtString = jwt.sign(
      { sub: '1234567890', aud: 'mongomart', ...jwtUser },
      'mongomartmongomartmongomartmongomart',
      { expiresIn: '1y' }
    );

    this.state = {
      stitchClusterNames: stitchClusterNames,
      client: client,
      clientAuthenticated: client.auth.loginWithCredential(
        new CustomCredential(jwtString)
      ),
      homeUrl: '/'
    };

    this.generateHomeUrl = this.generateHomeUrl.bind(this);
  }

  componentDidMount() {}

  generateHomeUrl(node) {
    // define home URL which is used by login redirect
    if (node) {
      this.setState({ homeUrl: node.getAttribute('href') });
    }
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
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
                  innerRef={this.generateHomeUrl}
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
                        />{' '}
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
