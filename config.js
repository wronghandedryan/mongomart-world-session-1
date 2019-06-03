// replace with your Stitch app ID
const stitchAppId = 'sbfp_session1-yjssh';

// replace with Stitch server names of the linked cluster(s)
// can use the same name for all three if products, reviews and users are stored on the same cluster
const stitchClusterNames = {
    products: 'mongodb-atlas',
    reviews: 'mongodb-atlas',
    users: 'mongodb-atlas'
};

// image URL
const baseImgUrl = 'https://raw.githubusercontent.com/robbertkauffman/mongomart/master/public';

export { stitchAppId, stitchClusterNames, baseImgUrl };