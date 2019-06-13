import React, { Component } from 'react';
import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { stitchClusterNames, dbName, collNames } from '../../config';
import Error from '../Error';
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
    // this.fetchReviews();
  }

  fetchReviews() {
    // Get database handle
    

    // Query databasee
    

    // Process response
    

    // Error handling
    
  }

  render() {
    if (this.state.reviews.length > 0 && !this.state.reviewsError) {
      return (
        <div className="row reviews">
          <div className="col-lg-12">
            <h3 className="page-header">Recent Reviews</h3>
          </div>
          <ListReviews {...this.props} reviews={this.state.reviews} />
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
