# FastFoodDB

## Downloading The Program
Follow the directions below to clone the repository onto your local device. 
1. Copy the link to the repository.
2. Open a terminal window on your device.
3. In the terminal enter: **git clone {link}.**

## Setting Up The Program
Before starting the program, the node_modules folder must be deleted to and reinstalled.
The node_modules folder can be deleted either through your preferred IDE or file system GUI.
After successfuly deleting the node_modules folder, reinstall them by following the steps below.
1. Open up a terminal window.
2. Enter the root folder for the program using the terminal window.
3. Once in the root folder, enter the command: **npm i**
Ensure you have sufficient storage on your device to allow the modules to install properly.

## Using the Application
Once you have properly set up the program on your local device, you can start the program by running **npm start** in the terminal.
The program should display a message saying that it is listening on on http://localhost:300 which signifies that the program is active and ready to process
http requests. Use Postman, and the appropriate api paths to test various requests.

## Schema
Listed below are the schema for the objects in the Fast Food Database. 
The first three objects represent etities that users interact with. 
The final three objects represent different roles users can have in the Fast Food Database.

### Product Schema
Represents items on a menu that can be sold at our fast food resturaunt. 
Contains the following attributes.

* productName (STRING)
* productPrice (NUMBER)
* productId (NUMBER)
* calorieAmount (NUMBER)

### Hours Schema
A Numerical representation that stores the hours an employee worked.
Keeps track of the date, and the type of hours worked.
Contains the following attributes below.

* date (DATE)
* hours (NUMBER)
* overtime (NUMBER)

### Review Schema
Represents a written review of the resturaunt that is posted by a customer.
Contains the following attributes.
* rating (NUMBER)
* title (STRING)
* description (STRING)
* userID (NUMBER)

### Customer Schema
Represents a majority of end users for the database. Mimicks real life customers, who can
order items from a restuaraunt menu and make purchases. Contains the following attributes.
Contains the following attributes.
* userName (STRING)
* email (STRING)
* password (STRING)
* money (NUMBER)

### Employee Schema
Represents end users who work at the fast food establishment. Similar to an employee portal.
Contains the following attributes.
* name (STRING)
* email (STRING)
* password (STRING)
* hours (HOURS)
* deletionStatus (STRING)

### Admin Schema
Represents end users who work at the fast food establishment. More specifically, Admin represents
workers who have a higher position in the establishment, like a manager, or a supervisor.
Contains the following attributes. 
* name (STRING)
* email (STRING)
* password (STRING)

## Features 
This section is dedicated to explaining what each of the user roles is capable of doing. Note, 
Admin, Employee, and Customers are the only 3 schema that represent user end points. The Product, Hours, and Review
schemas are not user roles. Rather they are entities which are accessed and modified by the Admin, Customers, and Employees.

### Universal Features
Admin, Employee, and Customer roles are share the ability to register accounts with the database. They also share similar login functionality. Register and Login functionality is authenticated using Javacript Webtokens. This ensures users login to the schema with the proper roles and functionalities. 

### Customer Features
Despite making up a majority of users Customer roles have limited functionality in the database in order to maintain the 
integrity of the database. THe customers role has been limited so that they are not able to modify the admin, products, employees, or employee hours. They are limited to read functionality, and minor post functionality. Customers can request to view, but not modify the list of products so they can decide what they would like to purchase. In terms of post functionality, the customer can pay for a product from the database, or post a new wallet balance. Addtionally, they can post reviews about the fast food establishment. Customers will be able to use routes that begin with: http://localhost:3000/api/customer and http://localhost:3000/api/review/

### Employee Features
Users who have the Employee role are able to use the database as an employee portal. They can read their hours worked. They can also post and schedule their hours for a date on a specific date. Some employees, may wish to no longer work for the establishment like in a real world situation. In that scenario they have the option of posting a notice to the database, to request the termination of their account, and employement at the establishment. Employees will use routes that begin with: http://localhost:3000/api/employee/

### Admin Features
Users who have the Admin role have the greatest amount of control and permissions in the database. The Admin simulates a manager at the fast food restaurant. The admin can view a list of all employees who are registered with the restaurant. They can also view a list of all products that are currently being offered for sale. In addtion, admins can choose to update products that are listed on the database. They can modify the price, or modify the name, or any information corresponding with the products they wish to change. They can also choose to remove a product from the database entirely if the wish. Similarly, the manager also has the power to terminate employees and remove their login credentials from the database if needed. Admins will use routes that begin with: http://localhost:3000/api/admin/

### Contributors
**Group Name**: The Backend Kittens. 

**Group Members**: Randy Do, Alan Cortez, Esteban Zapata, Raxel Ortiz, Alejandro Ramos, & Ricardo Granados Macias/



