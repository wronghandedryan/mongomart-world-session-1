// replace with your Stitch app ID
const stitchAppId = 'sbfp_session1-yjssh';

// replace with Stitch server names of the linked cluster(s)
// can use the same name for all three if products, reviews and users are stored on the same cluster
const stitchClusterNames = {
    products: 'mongodb-atlas',
    reviews: 'mongodb-atlas',
    users: 'mongodb-atlas'
};

// replace with your name, email address and phone number
// is used by notification functions
const jwtUser = {
    name: 'John Doe',
    email: 'john.doe@bladieblaz.com',
    phone: '+1987654321'
};

export { stitchAppId, stitchClusterNames, jwtUser };