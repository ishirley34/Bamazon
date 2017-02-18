'use strict'

// Require node packages to be able to run app
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    
    // Enter your Username here
    user: "root",

    // Enter your password here
    password: "",
    // Database name
    database: "Bamazon_db"
});
// This creates the connection and throws an error if it fails
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

function storeAdmin() {

}