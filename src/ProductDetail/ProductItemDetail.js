import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BSON, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { stitchClusterNames, dbName, collNames, baseImgUrl } from '../../config';
import Error from '../Error';
import AddToCart from './AddToCart';
import LatestReviews from '../LatestReviews/LatestReviews';
import ProductRating from '../ProductRating/ProductRating';

export default class ProductItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      productError: undefined
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct() {
    const itemId = new BSON.ObjectId(this.props.match.params.id);
    console.log(itemId);

    const db = this.props.client
      .getServiceClient(
        RemoteMongoClient.factory,
        stitchClusterNames.products
      )
      .db(dbName);

    this.props.clientAuthenticated
      .then(() =>
        db
          .collection(collNames.item)
          .find({ _id: itemId }, { limit: 1 })
          .asArray()
      )
      .then(response => {
        if (response && response[0]) {
          this.setState({
            item: response[0],
            productError: null
          });
        }
      })
      .catch(err => {
        this.setState({
          productError: err
        });
        console.error(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.renderProduct()}
        {this.renderReviews()}
      </React.Fragment>
    );
  }

  renderProduct() {
    const item = this.state.item;

    if (!item) {
      return null;
    }

    let stars = 0;
    let numReviews = 0;
    const reviews = this.state.reviews;

    if (reviews) {
      numReviews = reviews.length;

      for (let i = 0; i < numReviews; i++) {
        const review = reviews[i];
        stars += review.stars;
      }

      if (numReviews > 0) {
        stars = stars / numReviews;
      }
    }

    const categoryLink = '/category/' + item.category;
    
    const imgUrl = item.img_url ? baseImgUrl + item.img_url : undefined;

    if (!this.state.productError) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="active">
                  <Link to={categoryLink}>{item.category}</Link>
                </li>
                <li className="active">{item.title}</li>
              </ol>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">
                {item.title}
                <small> {item.slogan}</small>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {imgUrl &&
                <img className="img-responsive product" src={imgUrl} alt="" />
              }
            </div>

            <div className="col-md-4">
              <h3>Product Description</h3>

              <div className="ratings">
                <p className="pull-right">{numReviews} review(s)</p>
                <p>
                  <ProductRating stars={stars} />
                </p>
              </div>

              <p>{item.description}</p>
              <AddToCart {...this.props} item={item} />
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <Error
          message={'Error while retrieving product!'}
          error={this.state.productError}
        />
      );
    }
  }

  renderReviews() {
    const itemId = parseInt(this.props.match.params.id);

    return (
      <LatestReviews {...this.props} itemId={itemId} />
    );
  }
}
