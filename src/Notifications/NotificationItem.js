import React from 'react';

import AddToCartHOC from '../AddToCartHOC';

const NotificationItem = props => {
    if (props.notificationGroup.startsWith('backInStock')) {
        const addToCartComponent = <NotificationAddToCartButton productName={props.notification.object} />;
        const errorComponent = <NotificationAddToCartError/>
        return (
            <AddToCartHOC addToCartComponent={addToCartComponent} errorComponent={errorComponent} 
                            productId={props.notification.productId} {...props}></AddToCartHOC>
            );
    } else {
        return <li className="notification-item"><span>{props.notification.object}</span></li>;
    }
};

const NotificationAddToCartButton = props => {
  if (!props.isAddedToCart) {
    return (
    <li className="notification-item">
      <button
        className="unstyled-button"
        type="submit"
        onClick={props.onAddToCart}
      >
        {props.productName} is back in stock! Click to add to cart
      </button>
      </li>
    );
  } else {
    return (
        <li className="notification-item">
        <span className="success">
            Added item to cart
        </span>
        </li>
    );
  }
};

const NotificationAddToCartError = props => {
    if (props.error) {
        return (
            <li className="notification-item red">Error while adding product!</li>
        );
    } else {
      return null;
    }
  };

export default NotificationItem;