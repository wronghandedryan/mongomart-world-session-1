export default function _addToCart(productId, currentUser, clientAuthenticated, db, onSuccess, onError) {
    incrementProductQuantity(productId, currentUser, clientAuthenticated, db, onSuccess, onError);
}

function incrementProductQuantity(productId, currentUser, clientAuthenticated, db, onSuccess, onError) {
    // first try to increment quantity of item in cart,
    // if fails, add item to cart or create cart (upsert)
    let incQuery = {
      _id: currentUser.id,
      'cart._id': productId
    };
    const incUpdate = { $inc: { 'cart.$.quantity': 1 } };

    clientAuthenticated
      .then(() =>
        // increment quantity by one
        db.collection('users').updateOne(incQuery, incUpdate)
      )
      .then(response => {
        if (response && response.modifiedCount !== 1) {
          // if not incremented,
          // either add item to cart or create new cart (upsert)
          createCartOrCartItem(productId, currentUser, clientAuthenticated, db);
        } else {
          onSuccess();
        }
      })
      .catch(err => {
        onError(err);
      });
}

function createCartOrCartItem(productId, currentUser, clientAuthenticated, db, onSuccess, onError) {
    let addQuery = { _id: currentUser };
    // add flag for anonymous users so they can be cleaned up easily if needed
    if (
        currentUser.loggedInProviderName === 'anon-user'
    ) {
      addQuery.anonymousUser = true;
    }

    let addItem = this.props.item;
    addItem.quantity = 1;
    const addUpdate = { $addToSet: { cart: addItem } };

    const options = { upsert: true };

    clientAuthenticated
      .then(() =>
        db
          .collection('users')
          .updateOne(addQuery, addUpdate, options)
      )
      .then(() => {
        onSuccess();
      })
      .catch(err => {
        onError(err);
      });
}