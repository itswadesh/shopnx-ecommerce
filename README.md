# ShopNX - Shopping Cart with AngularJS (eCommerce web application)
A single page Shopping Cart web applications with many necessary features of an ecommerce application.

 # Installation Instructions
## Requirements
 We need Node https://nodejs.org/en/ (To create web server) + Git https://git-scm.com/ (Version Control System) + MongoDB https://www.mongodb.com/ (Database) + Python 2.7 https://www.python.org/downloads/release/python-2710/ 
Go ahead download and install them
 Install Visual C++ Build Tools using the Default Install option. 
Run the following commands (Required Once) [Note: Second command is required only for Windows]
 `npm config set python python2.7`
`npm config set msvs_version 2015`
 We need to start an instance of MongoDB. In my case it was sitting @
`C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe`
 # Install
Run the following commands and the application will start automatically
 1.    npm i -g grunt-cli (This creates and runs javascript repetative tasks )
2.    npm i -g bower ( A frontend package manager for web applications)
3.    npm i -g --production windows-build-tools (Only for Windows)
4.    npm i (Install all nodejs dependencies)
5.    bower i (Installs bower components)
6.    grunt serve
 # Features
### Store Front features
*  Single page web app (SPA) created using AngularJS, NodeJS, Express, MongoDB (MEAN)
*  Fastest shop experience
*  Fast Product Search, Filter with AJAX
*  Price slider and multiple brand selector
*  Faster Add to Cart and Product Details
*  Checkout with Paypal Integration
*  Minimal User Registration process
*  Order history and Password Management
*  Facility for Multi level Category
*  Mobile optimized with Bootstrap
*  Instant updates for any changes made across all clients with SocketIO implementation
*  Loads more products on scroll (No paging required)
 ### Store Back Office
*  Products, Categories, Brand, Order Management from admin panel with easy directives
*  Manage Order and Change Status from admin panel
*  Facility for Multiple product variants (size, color, price, image)
*  User roles - Administrator, User, Guest
*  SEO friendly URLs for each page
*  Secure and quality code - Takes care all single page web app standards
