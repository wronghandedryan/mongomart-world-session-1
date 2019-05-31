import React, { Component } from 'react';

import NotificationItem from './NotificationItem';

class Notifications extends Component {
    constructor(props) {
      super(props);
      this.state = {
        feed: props.streamClient.feed('notification', 'scott', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2NvdHQifQ.Wz7h0B-LAOSRAWVFT5urvKImRcdabmegzmxy15kVCDc'),
        notifications: []
      };
    }
  
    componentDidMount() {
        this.getNotifications();
        this.subscribeToNotifications();
    }

    getNotifications() {
        const _this = this;
        this.state.feed.get({mark_seen:true})
            .then(function(data) {
                if (data && data.results && data.results.length > 0) {
                    _this.setState({
                        notifications: data.results
                    })
                }
                console.log("Retrieved feed!", data);
            }).catch(function(err) {
                console.log('Error while getting notifications');
                console.log(err);
            });
    }

    subscribeToNotifications() {
        const _this = this;
        this.state.feed.subscribe(function(data) {
            if (data && data.new && data.new.length > 0) {
                const newNotifications = _this.state.notifications.push(data.new);
                _this.setState({
                    notifications: newNotifications
                });
            }
            // console.log("Feed was updated!", data);
        });
    }

    renderNotifications(notifications) {
        if (notifications && notifications.length > 0) {
            return notifications.map((notificationGroup) => {
                return (
                    <React.Fragment key={notificationGroup.id}>
                        <li role="separator" className="divider">
                            <span className="group-label">{this.renderGroupName(notificationGroup.group)}</span>
                        </li>
                        {this.renderNotificationGroup(notificationGroup)}
                    </React.Fragment>
                );
            });
        } else {
            return <li><span>No notifications</span></li>
        }
    }

    renderGroupName(name) {
        return name.replace(/[^_]*_[0-9]{4}-/, '');
    }

    renderNotificationGroup(notificationGroup) {
        if (notificationGroup && notificationGroup.activities) {
            return notificationGroup.activities.map((notification) => {
                return <NotificationItem key={notification.id} notificationGroup={notificationGroup.group} notification={notification} {...this.props} />
            });
        }
    }

    addToCart(notification) {
        this.removeNotification(notification);
    }

    removeNotification(notification) {
        let updatedNotifications = this.state.notifications;
        updatedNotifications.forEach((notificationGroup, idx) => {
            const updatedActivities = notificationGroup.activities.filter(_notification => {
                return _notification.id !== notification.id;
            });
            if (updatedActivities.length === 0) {
                updatedNotifications.splice(idx, 1);
            } else {
                updatedNotifications[idx].activities = updatedActivities;
            }
        });
        this.setState({
            notifications: updatedNotifications
        })
    }

    countNotifications() {
        let counter = 0;
        this.state.notifications.forEach(notificationGroup =>
            counter += notificationGroup.activities.length
        );
        return counter.toString();
    }

    render() {
        const active = this.state.notifications.length > 0 ? true : false;

        return (
            <li className={'dropdown' + (active ? ' active' : '')} id="notifications">
                <a href="#" className="dropdown-toggle glyphicon glyphicon-bell icon" data-toggle="dropdown" role="button" 
                              aria-haspopup="true" aria-expanded="false" aria-hidden="true"></a>
                <div className="counter">
                    <span className="counter-number">{this.countNotifications()}</span>
                    <div className="counter-border"></div>
                </div>
                <ul className="dropdown-menu body">
                    {this.renderNotifications(this.state.notifications)}
                </ul>
            </li>
        );
    }
};

export default Notifications;