import React, { Component } from 'react';
import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { stitchClusterNames, dbName, collNames } from '../../config';
import Error from '../Error';
import AddReview from './AddReview';
import ListReviews from './ListReviews';

export default class LatestReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewsError: undefined
    };
  }

  componentDidMount() {
    this.fetchReviews();
  }

  fetchReviews() {
    // Get database handle
    const db = this.props.client.getServiceClient(
        RemoteMongoClient.factory, 
        stitchClusterNames.reviews)
    .db(dbName);

    // Query databasee
    this.props.clientAuthenticated.then(() => db
        .collection(collNames.reviews)
        .find({ productId: this.props.itemId })
        .asArray())

    // Process response
    .then(response => {
      if (response) {
        this.setState({
          reviews: response,
          reviewsError: null
        });
      }
    })

    // Error handling
    .catch(err => {
      this.setState({
        reviewsError: err
      });
      console.error(err);
    });
  }

  render() {
    if (this.state.reviews.length > 0 && !this.state.reviewsError) {
      return (
        <div className="row reviews">
          <div className="col-lg-12">
            <h3 className="page-header">Recent Reviews</h3>
          </div>
          <ListReviews {...this.props} reviews={this.state.reviews} />
          <AddReview
              {...this.props}
              productId={this.itemId}
              onAddReview={this.props.onAddReview}
            />
        </div>
      );
    } else {
      return (
        <Error
          message={'Error while fetching reviews!'}
          error={this.state.reviewsError}
        />
      );
    }
  }
}
