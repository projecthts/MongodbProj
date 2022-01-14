
![Alt Text](https://media.giphy.com/media/E7t7ieRqsgHRRNlbBm/giphy.gif)
# Krishi Bazaar
### Overview of Our Submission
[Note]: # (Please make sure the project links to the appropriate GitHub repository and includes the [Apache-2 permissive license](https://www.apache.org/licenses/LICENSE-2.0)  and README.)
 
Hey everyone!
So, we have made an online e commerce store for farmers to directly connect with consumers.

There is no available product in the market that proposes a business logic for the farmer to directly sell to the consumer. We have always felt that technology could help small and big farmers to reach remote corners so that they could grow a product instead of a crop and make their own brand.

{% youtube ZoMiFhKjop8 %}

### Submission Category: 
- E-Commerce Creation 
-  Action Star

[Note]: # (E-Commerce Creation, Prime Time, Action Star, Automation Innovation, or Choose Your Own Adventure)


### Link to Code

[GitHub Repository](https://github.com/projecthts/MongodbProj) {% github https://github.com/projecthts/MongodbProj %}

### Live link
[Live Link](https://temp-name-1.herokuapp.com/) `https://temp-name-1.herokuapp.com/`
<br/>
- Kindly note : In case registration gives a problem, try loggin in with these credentials: email: vaishnavisdesai@gmail.com password: 123456

[Note]: # (Our markdown editor supports pretty embeds. Try this syntax: `{% github link_to_your_repo %}` to share a GitHub repository)



## Our Goal
KrishiBazaar with its main motto of “Fresh from Farm to Plate” achieves the goal of providing farmers with better opportunities to showcase their produce and pocket a higher remuneration. Its main aim is to do away with the several layers of middlemen between the farmer and the consumer. The project allows farmers to upload details, view product statistics, track various shipments and pickups of orders and receive payment online.

## What it does
- There is an absence of an application that connects consumers with farmers in a transparent and direct manner. 
- Krishi Bazaar with its main motto of “Fresh from Farm to Plate” achieves the goal of providing farmers with better opportunities to showcase their produce and pocket a higher remuneration. This reduces the cost to end consumer.
-  Krishi Bazaar provides farmers with a safe space to educate themselves and receive the appropriate assistance they require. This project aims to help farmers achieve their true potential without the need to be dependent on intermediaries.

## Tech Stack
Let's come to the technology.
For building this application, we have used:

- [Angular](https://github.com/projecthts/MongodbProj)- For building the frontend of the application
- [NodeJs](https://nodejs.org/) - Express - For building backend services and maintaing persistent sessions
- [MongoDb Atlas](https://www.mongodb.com/) - Used as the application database (Have always been a fan of Json based databases. And its cloud!)
- [Atlas Search](https://docs.atlas.mongodb.com/atlas-search/) - For features like autocomplete
- [Realm Function](https://docs.mongodb.com/realm/functions/) and [Triggers](https://docs.mongodb.com/realm/triggers/trigger-types/) - For generating a timely (daily) report on the market for analysis
- [TimeSeries Collection](https://docs.mongodb.com/manual/core/timeseries-collections/) - For storing the daily reports
- [RazorPay API](https://razorpay.com/) - Because we can't make payment gateways yet
- [FontAwesome](https://fontawesome.com/) - Who doesn't want their website to look cool
- [Particle JS](https://particles.js.org/) - Again who doesn't want a bit of confetti.
- [PassportJs](https://www.passportjs.org/docs/authenticate/) - For authentication.
- [Heroku](https://www.heroku.com/) -For Hosting the application

Okay lets dive a bit deeper into it.

### Key Features 
&nbsp;
##### - Authentication

We have used the Passport JS library that provides various strategies for authentication. Here we have introduced a local strategy that authenticates with email and password. We are also using the express session, passport session and mongo store to maintain persistent sessions. In simpler terms, the backend sets a cookie in the browser on loging in. The backend also stores this cookie in the database along with the associated user. With every request, the browser sends this cookie back to the backend to validate. The backend validates it with the cookie present in the database and hence persists in the session.
A user can sign up as either of the two roles: Farmer (Farmer + Consumer) or Consumer.
![Alt Text](https://media.giphy.com/media/7roWZ7wXAZdLlNHdmU/giphy.gif)
&nbsp;
##### - Setting up a store - Register as a farmer<br/>

A farmer can set up their own store. This can be
achieved by setting up an identity on the website by registering as a farmer. The farmer can provide details like email address, phone number, name, farmer verification proof and address and create an identity on the website which can now be identified by any other user of the website.
![Alt Text](https://media.giphy.com/media/kOgcO0yCjkFb5qzZnR/giphy.gif)
&nbsp;
##### - Adding products to the market -

As a farmer the user can add a product to the market. The details include:
Product image, Name, Description, Categories, Discounts and pricing, pickup address. We have used Firebase Storage to store product image and MongoDB Atlas to store other product related information. Once the product is in the database, it is officially on the market!
These products are visible to a consumer user along with the farmer brand. The consumer can also search and filter through all the products in the market. They can also get suggestions for various products based on their purchases and market analysis.
![Alt Text](https://media.giphy.com/media/4JX1WmgVJUubJ8uPSI/giphy.gif)
&nbsp;
##### - Shipments and Orders -

A farmer can view his shipments on the portal. Shipments are the products that consumers have ordered from the farmer. A farmer can track the shipments till they reach the consumer. After an order is delivered, it gets deleted from the farmer's shipments.
The consumer also stays updated with ongoing orders as well as
has a log of all past orders. All the details of each order including the delivery date, are visible.
![Alt Text](https://media.giphy.com/media/aflwe41WvZEIERn6qg/giphy.gif)
&nbsp;
##### - The pickup module -

A farmer is also able to view his pickups. Pickups on the portal is nothing but a table showing the schedule of product pickups. It contains details like who is going to pickup from the farmer, what product are they picking up, date, etc.
&nbsp;
##### - The logistics -

But who is exactly delivering the products, picking up the product you might wonder. Right now we don't have a solid logistics in place, but what we do have is a logistics interface.
Logistics interface is a table where all the ongoing orders are listed. Ideally an authorized personal like an employee will be able to access this portal. But for now, we can play around by updating the status of a particular order to 'delivered' or 'picking up' and the status of that order would change accordingly.
![Alt Text](https://media.giphy.com/media/DrrpGflcMF037HPPYa/giphy.gif)
&nbsp;
##### - Consumer Role Overview-

As a consumer, the user will be able to browse through products, search a product, etc. Atlas Search has made autocomplete and other searches much more simpler and convinient! After landing on a particular product, the user can select the quantity and add the product to the cart. The user can then proceed to checkout by selecting an appropriate delivery address and make payment. After the payment is complete (In the test mode in razorPay API for now), the order now becomes an ongoing order.
&nbsp;
##### - Purchasing a product -

The consumer can add a particular product to their cart as well as edit quantities.The consumer  pick the delivery address and make payment(RazorPay API) through the system.
![Alt Text](https://media.giphy.com/media/W7wTbKcNH290Frtjoy/giphy.gif)
&nbsp;
##### -  Review and rating -

A user will be able to comment and rate only after purchasing a product. There are no restrictions on viewing the review and ratings.
All ratings and reviews will be visible on each item’s page along with the average of all ratings as the item’s average rating.
&nbsp;
##### - The bidding system -

Another feature that we have implemented is the bidding system. A user can bid on  a product. A farmer can see all bids on their product. A farmer can accept bids on their product. After a farmer accepts a bid, an email is sent by the system to the user to directly contact the farmer for acting further on the bid. This feature is developed targetting bulk buyers.
This will help them get products at a cheaper price than the current market price. The farmer can view bids as well as accept a bid. This will help the farmer sell excess produce or gain a good profit owning to bulk consumers.
![Alt Text](https://media.giphy.com/media/ZhT3gDqR3oBNl6jYdD/giphy.gif)
&nbsp;
##### - Market Analysis-

Finally, we have performed some basic analysis of the market. We have implemented some basic Realm triggers and functions to support us with the same. We plan to further improve on report generation of the analysis and statistics of the market to gain an insight into the business strategies that can be used to target a larger audience while maintaining a loyal customer base. This feature will help the company in making informed decisions with the data right in front of them.
&nbsp;
##### - Aid-Farmer’s Aid 

It's a place where farmers can educate themselves on various current ongoings in the agricultural sector. They can see a variety of information which would help them in making future decisions regarding agriculture.
&nbsp;
##### - Search Bar-Search products on the go!

![Alt Text](https://media.giphy.com/media/R3wnyEBjZeovBUdgwT/giphy.gif)
&nbsp;
Technically speaking, we have developed a bunch of APIs in the backend that perform simple CRUD operations on the database and are consumed by the frontend to send and retrieve data. 
&nbsp;
## Wrapping it up, here's everything in a nutshell!
{% youtube HSvFHdqBFck %}

## What's next for KrishiBazaar
A lot of features are on our to-do list now! Scaling the applications, testing and adding more features while also recieving constant feedback is one of my major goals!
 
### Let's KrishiBazaar!🍀
<br>
![Alt Text](https://media.giphy.com/media/B28qBZUxeCtEp6fv1R/giphy.gif)
<br>
### Additional Resources / Info

- [PassportJs](https://www.passportjs.org/docs/authenticate/)
- [PassportJs Authentication](https://heynode.com/tutorial/authenticate-users-node-expressjs-and-passportjs/)
- [Razorpay Resource](https://medium.com/@yaseen_nadaf/integrate-razorpay-with-angular-1a7080cf8e79)
- [MongoDB Scheduled Triggers](https://docs.mongodb.com/realm/triggers/scheduled-triggers/)
- [Atlas Search](https://docs.atlas.mongodb.com/reference/atlas-search/tutorial/)
- [Make a API call in angulare](https://angular.io/guide/http)
- [Get started with Angular](https://angular.io/start)
- [Setup an express server](https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm)
- [Setup session](https://www.npmjs.com/package/express-session)
- [Perform some CRUD operations ](https://www.geeksforgeeks.org/node-js-crud-operations-using-mongoose-and-mongodb-atlas/)
- [Deploy app on heroku](https://betterprogramming.pub/how-to-deploy-your-angular-9-app-to-heroku-in-minutes-51d171c2f0d)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/projecthts/MongodbProj.git
   ```
2. Frontend:
```sh
   cd .\FrontEnd\Krishi-Bazaar\
   npm i
   ```
3. Backend
   ```sh
   cd .\Backend\NodeJs\
   npm i
   npm run build
   npm run dev
   ```

## Made with ❤️ by
- [VAISHNAVI DESAI](https://dev.to/vaishnavi06desai)
- ISHA GHIRIA
- [ANIKA TIBREWALA](https://dev.to/anika001)
- TWINKLE BAGDI


##### Hope you liked our project. Feel free to reach out in case of any queries - projecthts.16.4@gmail.com
