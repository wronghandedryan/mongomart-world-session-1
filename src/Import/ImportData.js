import React, { Component } from 'react';
import { BSON, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { stitchClusterNames, dbName, collNames } from '../../config';
import Error from '../Error';

export default class ImportData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importSuccess: undefined,
      importError: undefined
    };
  }

  componentDidMount() {
  }

  importData() {
    const db = this.props.client
     .getServiceClient(
       RemoteMongoClient.factory,
       stitchClusterNames.reviews
     )
     .db(dbName);
    this.props.clientAuthenticated
     .then(() =>
       db
         .collection(collNames.item)
         .deleteMany({})
     )
     .then(() =>
       db
         .collection(collNames.item)
         .insertMany(this.getItems())
    )
    .then(response => {
       if (response) {
         this.setState({
           importSuccess: response,
           importError: null
         });
       }
     })
    .catch(err => {
       this.setState({
         importError: err,
         importSuccess: null
       });
       console.error(err);
     });

  }

  render() {
    // return null;
    return (<button onClick={() => this.importData()} className={'covert-button ' + (this.state.importError ? 'error' : '') + (this.state.importSuccess ? 'success' : '')}>Import Items</button>);
  }

  getItems() {
    return [{"title":"Gray Hooded Sweatshirt","slogan":"The top hooded sweatshirt we offer","description":"Unless you live in a nudist colony, there are moments when the chill you feel demands that you put on something warm, and for those times, there's nothing better than this sharp MongoDB hoodie. Made of 100% cotton, this machine washable, mid-weight hoodie is all you need to stay comfortable when the temperature drops. And, since being able to keep your vital stuff with you is important, the hoodie features two roomy kangaroo pockets to ensure nothing you need ever gets lost.","stars":0,"category":"Apparel","img_url":"/img/products/hoodie.jpg","price":{"$numberDouble":"29.99"},"stock":15},
      {"title":"Coffee Mug","slogan":"Keep your coffee hot!","description":"A mug is a type of cup used for drinking hot beverages, such as coffee, tea, hot chocolate or soup. Mugs usually have handles, and hold a larger amount of fluid than other types of cup. Usually a mug holds approximately 12 US fluid ounces (350 ml) of liquid; double a tea cup. A mug is a less formal style of drink container and is not usually used in formal place settings, where a teacup or coffee cup is preferred.","stars":0,"category":"Kitchen","img_url":"/img/products/mug.jpg","price":12.5,"stock":0},
      {"title":"Stress Ball","slogan":"Squeeze your stress away","description":"The moment life piles more onto your already heaping plate and you start feeling hopelessly overwhelmed, take a stress ball in hand and squeeze as hard as you can. Take a deep breath and just let that tension go. Repeat as needed. It will all be OK! Having something small, portable and close at hand is a must for stress management.","stars":0,"category":"Swag","img_url":"/img/products/stress-ball.jpg","price":5,"stock":22},
      {"title":"Track Jacket","slogan":"Go to the track in style!","description":"Crafted from ultra-soft combed cotton, this essential jacket features sporty contrast tipping and MongoDB's signature embroidered leaf.","stars":0,"category":"Apparel","img_url":"/img/products/track-jacket.jpg","price":45,"stock":4},
      {"title":"Women's T-shirt","slogan":"MongoDB shirt in-style","description":"Crafted from ultra-soft combed cotton, this essential t-shirt features sporty contrast tipping and MongoDB's signature leaf.","stars":0,"category":"Apparel","img_url":"/img/products/white-mongo.jpg","price":45,"stock":14},
      {"title":"Brown Carry-all Bag","slogan":"Keep extra items here","description":"Let your style speak for itself with this chic brown carry-all bag. Featuring a nylon exterior with solid contrast trim, brown in color, and MongoDB logo","stars":0,"category":"Swag","img_url":"/img/products/brown-bag.jpg","price":5,"stock":4},
      {"title":"Brown Tumbler","slogan":"Bring your coffee to go","description":"The MongoDB Insulated Travel Tumbler is smartly designed to maintain temperatures and go anywhere. Dual wall construction will keep your beverages hot or cold for hours and a slide lock lid helps minimize spills.","stars":0,"category":"Kitchen","img_url":"/img/products/brown-tumbler.jpg","price":9,"stock":42},
      {"title":"Pen (Green)","slogan":"The only pen you'll ever need","description":"Erase and rewrite repeatedly without damaging documents. The needlepoint tip creates clear precise lines and the thermo-sensitive gel ink formula disappears with erasing friction.","stars":0,"category":"Office","img_url":"/img/products/green-pen.jpg","price":2,"stock":48},
      {"title":"Pen (Black)","slogan":"The only pen you'll ever need","description":"Erase and rewrite repeatedly without damaging documents. The needlepoint tip creates clear precise lines and the thermo-sensitive gel ink formula disappears with erasing friction.","stars":0,"category":"Office","img_url":"/img/products/pen.jpg","price":2,"stock":56},
      {"title":"Green T-shirt","slogan":"MongoDB community shirt","description":"Crafted from ultra-soft combed cotton, this essential t-shirt features sporty contrast tipping and MongoDB's signature leaf.","stars":0,"category":"Apparel","img_url":"/img/products/green-tshirt.jpg","price":20,"stock":3},
      {"title":"MongoDB The Definitive Guide","slogan":"2nd Edition","description":"Manage the huMONGOus amount of data collected through your web application with MongoDB. This authoritative introduction—written by a core contributor to the project—shows you the many advantages of using document-oriented databases, and demonstrates how this reliable, high-performance system allows for almost infinite horizontal scalability.","stars":0,"category":"Books","img_url":"/img/products/guide-book.jpg","price":20,"stock":7},
      {"title":"Leaf Sticker","slogan":"Add to your sticker collection","description":"Waterproof vinyl, will last 18 months outdoors.  Ideal for smooth flat surfaces like laptops, journals, windows etc.  Easy to remove.  50% discounts on all orders of any 6+","stars":0,"category":"Stickers","img_url":"/img/products/leaf-sticker.jpg","price":1,"stock":69},
      {"title":"USB Stick (Green)","slogan":"1GB of space","description":"MongoDB's Turbo USB 3.0 features lightning fast transfer speeds of up to 10X faster than standard MongoDB USB 2.0 drives. This ultra-fast USB allows for fast transfer of larger files such as movies and videos.","stars":0,"category":"Electronics","img_url":"/img/products/greenusb.jpg","price":20,"stock":35},
      {"title":"USB Stick (Leaf)","slogan":"1GB of space","description":"MongoDB's Turbo USB 3.0 features lightning fast transfer speeds of up to 10X faster than standard MongoDB USB 2.0 drives. This ultra-fast USB allows for fast transfer of larger files such as movies and videos.","stars":0,"category":"Electronics","img_url":"/img/products/leaf-usb.jpg","price":20,"stock":38},
      {"title":"Scaling MongoDB","slogan":"2nd Edition","description":"Create a MongoDB cluster that will grow to meet the needs of your application. With this short and concise book, you'll get guidelines for setting up and using clusters to store a large volume of data, and learn how to access the data efficiently. In the process, you'll understand how to make your application work with a distributed database system.","stars":0,"category":"Books","img_url":"/img/products/scaling-book.jpg","price":29,"stock":16},
      {"title":"Powered by MongoDB Sticker","slogan":"Add to your sticker collection","description":"Waterproof vinyl, will last 18 months outdoors.  Ideal for smooth flat surfaces like laptops, journals, windows etc.  Easy to remove.  50% discounts on all orders of any 6+","stars":0,"category":"Stickers","img_url":"/img/products/sticker.jpg","price":1,"stock":185},
      {"title":"MongoDB Umbrella (Brown)","slogan":"Premium Umbrella","description":"Our crook handle stick umbrella opens automatically with the push of a button. A traditional umbrella with classic appeal.","stars":0,"category":"Umbrellas","img_url":"/img/products/umbrella-brown.jpg","price":21,"stock":5},
      {"title":"MongoDB Umbrella (Gray)","slogan":"Premium Umbrella","description":"Our crook handle stick umbrella opens automatically with the push of a button. A traditional umbrella with classic appeal.","stars":0,"category":"Umbrellas","img_url":"/img/products/umbrella.jpg","price":21,"stock":14},
      {"title":"MongoDB University Book","slogan":"A concise summary of MongoDB commands","description":"Keep the MongoDB commands you'll need at your fingertips with this concise book.","stars":0,"category":"Books","img_url":"/img/products/univ-book.jpg","price":4,"stock":11},
      {"title":"MongoDB University T-shirt","slogan":"Show Your MDBU Alumni Status","description":"Crafted from ultra-soft combed cotton, this essential t-shirt features sporty contrast tipping and MongoDB's signature leaf.","stars":0,"category":"Apparel","img_url":"/img/products/univ-tshirt.jpg","price":45,"stock":6},
      {"title":"USB Stick","slogan":"5GB of space","description":"MongoDB's Turbo USB 3.0 features lightning fast transfer speeds of up to 10X faster than standard MongoDB USB 2.0 drives. This ultra-fast USB allows for fast transfer of larger files such as movies and videos.","stars":0,"category":"Electronics","img_url":"/img/products/leaf-usb.jpg","price":40,"stock":21},
      {"title":"Water Bottle","slogan":"Glass water bottle","description":"High quality glass bottle provides a healthier way to drink.  Silicone sleeve provides a good grip, a see-through window, and protects the glass vessel.  Eliminates toxic leaching that plastic can cause.  Innovative design holds 22-1/2 ounces.  Dishwasher safe","stars":0,"category":"Kitchen","img_url":"/img/products/water-bottle.jpg","price":23,"stock":2},
      {"title":"WiredTiger T-shirt","slogan":"Unleash the tiger","description":"Crafted from ultra-soft combed cotton, this essential t-shirt features sporty contrast tipping and MongoDB's signature leaf.","stars":0,"category":"Apparel","img_url":"/img/products/wt-shirt.jpg","price":22,"stock":26}];
  }
}
