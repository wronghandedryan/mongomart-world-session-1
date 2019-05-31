import React, { Component } from 'react';

import AddToCartHOC from '../AddToCartHOC';
import AddToCartButton from './AddToCartButton';
import Error from '../Error';
import NotifyMeButton from './NotifyMeButton';

export default class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotificationCreated: false,
      setNotificationError: undefined
    };
    this.handleSetNotification = this.handleSetNotification.bind(this);
  }

  componentDidMount() {}

  handleSetNotification() {
    const args = [this.props.item._id, this.props.client.auth.currentUser.id];
    this.props.client
      .callFunction('setNotification', args)
      .then(result => {
        if (result) {
          this.onSetNotificationSuccess();
        } else {
          this.onSetNotificationError();
        }
      })
      .catch(err => {
        this.onSetNotificationError(err);
      });
  }

  onSetNotificationSuccess() {
    this.setState({ setNotificationError: null, isNotificationCreated: true });
  }

  onSetNotificationError(err) {
    console.log(err);
    this.setState({ setNotificationError: err });
  }

  render() {
    const item = this.props.item;
    if (item.stock > 0) {
      return (
        <AddToCartHOC addToCartComponent={<AddToCartButton/>} errorComponent={<Error/>} {...this.props}/>
      );
    } else {
      return (
        <React.Fragment>
          <p className="red-text">Sorry, this product is out of stock</p>
          <NotifyMeButton
            onSetNotification={this.handleSetNotification}
            isNotificationCreated={this.state.isNotificationCreated}
            client={this.props.client}
          />
          <Error
            message={'Error while setting notification!'}
            error={this.state.setNotificationError}
            display={'small'}
          />
        </React.Fragment>
      );
    }
  }
}
