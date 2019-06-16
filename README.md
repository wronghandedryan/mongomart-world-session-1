# Build Web Apps Faster Using Stitch Rules & React
_Author_: [Robbert Kauffman](mailto:robbert.kauffman@mongodb.com)

## Introduction

Modern web applications are often built using API-based front-ends such as React, Angular, VueJs. In this session, we will dive into how Stitch can be used to provide APIs for your front-end, removing the need for writing and maintaining boilerplate back-end services, and having to manage and scale back-end servers. All to make developer’s lives easier.

## Step 1 — Creating a Stitch App

In [Atlas](https://cloud.mongodb.com):
1. Navigate to _Stitch_ using the left hand navigation
2. Click _Create New Application_
3. In the dialog window, name the app, select one of your Atlas clusters to link it, and hit _Create_.

![Stitch Application](images/step1.png "Atlas interface — Stitch")

## Step 2 — Setting up Stitch App

- Open your app by selecting it from the Stitch Applications list
- On the Getting Started screen: Turn on Anonymous Authentication 
![Stitch Application](images/step2.png "Atlas interface — Stitch")
- Copy your Stitch App ID in top-left corner



## Import data

Create a MongoDB cluster and import the data:
```bash
mongoimport --uri="mongodb+srv://USERNAME:PASSWORD@ATLAS_CLUSTER_NAME.mongodb.net/mongomart" -c reviews --file=data/reviews.json
mongoimport --uri="mongodb+srv://USERNAME:PASSWORD@ATLAS_CLUSTER_NAME.mongodb.net/mongomart" -c item --file=data/item.json
```

After importing the data, create a Stitch app and link it to the cluster that you have just imported 
the data to. For more information on how to create a Stitch app, see: 
https://docs.mongodb.com/stitch/procedures/create-stitch-app/

Once you have created the Stitch app, do the following:
- Turn on *Anonymous authentication* using the toggle of Step 2 on the *Getting Started* page.
- Using the navigation on the left, go to *Rules* and create the following rules:
  - On the *Rules* page, click on the ellipsis next to the name of your linked cluster, click *Add 
    Database/Collection*:
    - As database name use *mongomart*, as collection name use *item*, and as template select *Users 
      can only read all data*. Click *Add Collection*.
  - Add another rule:
    - As database name use *mongomart*, as collection name use *reviews*, and as template select 
      *Users can read all data, but only write their own data*. Enter *userid* as Field Name For User 
      ID. Click *Add Collection*.
  - Add one final rule:
    - As database name use *mongomart* and as collection name use *users*. Please note that the 
      *users* collection doesn't exist yet, so you will have to create it by typing its name and 
      clicking on Create "users" or hitting Return. As template select *Users can only read and 
      write their own data*. Enter *_id* as Field Name For User ID. Click *Add Collection*.
      - For more fine-grained access controls, you can set write access on the *cart* field so that
        users cannot update their username but can only update their cart. You can do this by 
        clicking *Add Field* and enter *cart* as the fieldname. Then uncheck the box *All additional
        fields* under the column *Write*.

Finally, copy the App ID that is displayed on the top left of the screen. This app ID needs to be 
used by the front-end application in the next step.

## Install and run app

The application is built using React. To install and run the application NPM or Yarn is required.

First, update the Stitch App ID in the application by editing `src/config.js` and replacing 
*YOUR_STITCH_APP_ID* on line 2 with your Stitch App ID.

Then update the Stitch Service Names by editing the `stitchClusterNames` variable in the same file 
on line 6-10. The service names are the names you have given to any linked clusters when creating 
the Stitch app or when linking an Atlas Cluster to the app. Each of the three collections can be 
hosted on a separate cluster or all on the same. In case of the latter you can use the same name 
for each cluster.

To install and run the application:

```bash
$ npm install
$ npm start
```

You should now be able to view the application by opening [http://localhost:3000](http://localhost:3000) 
in the browser.

## Build and upload to Stitch Hosting

You can use Stitch Hosting to host the React app. First build the application:

```bash
$ npm run build
```

Now go to Stitch Hosting and enable Stitch Hosting if you haven't done so yet. Then click on *Upload 
Files* and upload all of the files of the *build* directory. You have to create all of the subfolders
manually. Once you've finished uploading, go to the tab *Settings* and configure a *Custom 404 Page* 
by clicking *Choose File*. Browse to the file *404.html* and click on *Select a File* and hit *Save*. 
Any 404 pages will now use the 404.html file which contains a workaround to enable React Routing.
