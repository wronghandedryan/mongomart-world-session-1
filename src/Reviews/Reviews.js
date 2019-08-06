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
    this.handleAddReview = this.handleAddReview.bind(this);
  }

  componentDidMount() {
    this.fetchReviews();
  }

  fetchReviews() {
    // Get database handle
    

    // Query databasee
    

    // Process response
    

    // Error handling
    
  }

  handleAddReview(review) {
    let updatedReviews = this.state.reviews;
    updatedReviews.push(review);
    this.setState({ reviews: updatedReviews });
    // this.props.onAddReview(review);
  }

  render() {
    if (!this.state.reviewsError) {
      return (
        <div className="row reviews">
          { this.state.reviews.length > 0 &&
          <React.Fragment>
            <div className="col-lg-12">
              <h3 className="page-header">Recent Reviews</h3>
            </div>
            <ListReviews {...this.props} reviews={this.state.reviews} />
          </React.Fragment>
          }
          <AddReview
              {...this.props}
              productId={this.props.itemId}
              onAddReview={this.handleAddReview}
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
