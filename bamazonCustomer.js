'use strict'


// Require node packages to be able to run app
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// Creates connection to the table.
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

// This variable will be updated later
var userChoice;

// This runs the displayStore function while passing through the startApp function
displayStore(startApp);
// This function displays the store
function displayStore(callback) {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // creates a cli table with rows and columns to display the database
        var table = new Table({
            head: ["ID", "Product", "Department", "Price", "Quantity"],
            colWidths: [10,40,40,10,20]
        }); // closes table

        for (var i = 0; i < res.length; i++) {
            var row = [];
            row.push(res[i].item_id,
            res[i].product_name,
            res[i].department_name,
            res[i].price,
            res[i].stock_quantity);

            table.push(row);
        } // closes for loop
        console.log();
		console.log(table.toString());
		console.log();

        // if there was a callback function passed in, the run the callback
		if (callback) {
			callback();
		}
		// otherwise, prompt the user if they would like to continue
		else {
			startOver();
		}
    }); // closes query select
} // closes displayStore

function startApp() {
    // Prompts the user for the product they want to buy then the quantity
    inquirer.prompt([
    {
        name:"whatBuy",
        type: "input",
        message: "Which please enter the id of the item you would like to purchase.",

    }
    ]).then(function(response) {
        userChoice = response.whatBuy;
        promptQuant(userChoice);
    });
} //closes startApp

function promptQuant() {
    inquirer.prompt([
    {
        type: "input",
        name: "quant",
        message: "How many units would you like to purchase?"
    }
    ]).then(function(response) {
        // This grabs the quantity from the table that matches the id
        connection.query('SELECT stock_quantity, product_name, price FROM products WHERE item_id = ' + userChoice, function(err, res) {
            if (err) throw err;
            // If the amount is less than the stock then it subtracts the amount form the stock and updates the total
            if (res[0].stock_quantity >= response.quant) {
                var new_quant = res[0].stock_quantity - response.quant;
                connection.query('UPDATE products SET ? WHERE ?', [ {stock_quantity: new_quant}, {item_id: userChoice} ], function(err, result) {
                    if (err) throw err;
                }); // End of update query
                // Shows the cost of the purchase
                var cost = res[0].price * response.quant;
                console.log("\nTotal: $" + cost);
                startOver();
            } // end of if
            else if (res[0].stock_quantity === 0) {
                console.log("\nI'm sorry it appears" + res[0].product_name + "is no longer in stock. Check back again later.\n");
                startOver();
            } // end of else if
            // Iff the user wants to buy more than the stock it runs the function again to modify their purchase
            else {
                console.log("\nIt looks like we don't have enough to complete your order. Please modify your purchase");
                promptQuant();
            }
        }); // end of select query
    }); // end of response function
}; // end of promptQuant

// This function asks the user if they want to start over
function startOver() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "startAgain",
            message: "Would you like to make another purchase?"
        }
    ]).then(function(response) {
        if (response.startAgain === true) {
            startApp();
        }
        else
        {
            console.log("Thank you for your business!");
            connection.end();
        }
    }); // end inquirer
} // end startOver
