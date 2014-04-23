thedraftmaser
=============

THE DRAFTMASTER - an automated retrofit ventilation system for New York's overheated apartments.

Setup: 
* Node server calculating ventilation settings based on user input of temperature preferences and weather API
* Window ventilation unit running on an Arduino Yun connected to the node server
* Wireless temperature sensor communicating with the Yun via XBee radio modules as indoor control unit
* Mobile interface for accessing the unit remotely

To run this app simply download the zip, run # npm install in the main project folder to download all the node modules and then start the server by running # node app.js in the command line.

This project was created by Natasha Dzurny and Alexandra Coym as a final for Connected Devices and Networked Interfaces, taught by Tom Igoe at ITP, Spring 2014. 
