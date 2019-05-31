import React from 'react';
import _ from 'underscore';

const SelectQuantity = props => {
  const options = _.range(26).map(i => (
    <QuantityOption quantity={i} key={i} />
  ));

  return (
    <select
      name="quantity"
      defaultValue={props.selectedQuantity}
      onChange={props.updateQuantity}
    >
      {options}
    </select>
  );
};

const QuantityOption = props => {
  const quantity = props.quantity;
  if (quantity === 0) {
    return <option value={quantity}>0 (Remove)</option>;
  } else {
    return <option value={quantity}>{quantity}</option>;
  }
};

export default SelectQuantity;
