import React from 'react';
import _ from 'underscore';

import ProductRatingStar from './ProductRatingStar';

const ProductRating = props => {
  return _.range(5).map(i => (
    <ProductRatingStar num={i + 1} stars={props.stars} key={i} />
  ));
};

export default ProductRating;
