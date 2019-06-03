import React from 'react';

const NotifyMeButton = props => {
  if (!props.isNotificationCreated) {
    return (
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => props.onSetNotification()}
      >
        Notify me <br />
        when in stock&nbsp;
        <span className="glyphicon glyphicon-bell" />
      </button>
    );
  } else {
    return (
      <button className="btn btn-primary success" type="submit" disabled>
        Added notification&nbsp;
      </button>
    );
  }
};

export default NotifyMeButton;
