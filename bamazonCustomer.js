'use strict'


// Require node packages to be able to run app
var mysql = require("mysql");
var inquirer = require("inquirer");

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
// This function displays the store
var displayStore = function(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        var table = new table({
            head: ["ID", "Product", "Department", "Price", "Quantity"],
            colWidths
        })

        var tableRow = [];
          
    })
};

var startApp = function() {
    inqurer.prompt({
        name:"whatBuy",
        type: "input",
        message: "Which please enter the id of the item you would like to purchase.",

    })
}