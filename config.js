// replace with your Stitch app ID
const stitchAppId = 'mongomartsession1-udutn';

// replace with Stitch server names of the linked cluster(s)
// can use the same name for all three if products, reviews and users are stored on the same cluster
const stitchClusterNames = {
    products: 'mongodb-atlas',
    reviews: 'mongodb-atlas',
    users: 'mongodb-atlas'
};

// database and collection names if different from defaults used in instructions
const dbName = 'mongomart';
const collNames = {
  item: 'item',
  users: 'users',
  reviews: 'reviews'
}

// image URL
const baseImgUrl = 'https://raw.githubusercontent.com/robbertkauffman/mongomart/master/public';

export { stitchAppId, stitchClusterNames, dbName, collNames, baseImgUrl };