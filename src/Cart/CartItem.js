import React from 'react';
import { Link } from 'react-router-dom';

import { baseImgUrl } from '../../config';
import SelectQuantity from './SelectQuantity';

const CartItem = props => {
  const item = props.item;

  if (!item) {
    return null;
  }

  const itemLink = '/item/' + item._id;
  const imgUrl = baseImgUrl + item.img_url;

  return (
    <tr>
      <td>
        <Link to={itemLink}>{item.title && item.title}</Link>
      </td>
      <td className="muted center_text">
        <Link to={itemLink}>
          <img width="300" src={imgUrl} alt={item.title} />
        </Link>
      </td>
      <td>
        <SelectQuantity
          selectedQuantity={item.quantity}
          updateQuantity={props.updateQuantity}
          itemId={props.itemId}
        />
      </td>
      <td>{item.price}</td>
      <td>{(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  );
};

export default CartItem;
