# Introduction 

This is a simple guide on how to integrate a payment gateway using an inline JavaScript popup. The provided code sample includes an HTML document with an embedded script that triggers a checkout modal.

The payment gateway integration is facilitated through the use of the "HydrogenPGIntegration.js" script hosted on Azure Blob Storage.

# Getting Started

The below steps can help you to easily integrate the provided code sample into your web application to enable a seamless payment gateway experience with an inline JavaScript popup.

1.	Integration steps

    1.  Include the Required Scripts either QA or PROD.

    2.  Create a Checkout Button. Add a button to your HTML page that will trigger the checkout modal. In this example, the button has an ID of "myBtn" and calls the openDialogModal() function when clicked.
    
    3.  Include Payment Information. Set up a JavaScript object (obj) with the necessary parameters for the payment transaction. This object will be used to initiate the payment link through an API.

    4.  Authorization Token. Obtain an authorization token (token) from Hydrogenpay dashboard based on your testing or production requirements.

    5.  Payment Gateway Function. Implement the openDialogModal function, which calls the handlePgData function from the external script with the defined payment information and token.

# Request Parameters

| Mandatory | Name        | Comment                                               |
|-----------|-------------|-------------------------------------------------------|
| Yes       | amount      | The amount to be charged for the transaction.         |
| Yes       | email       | The customer's email address.                         |
| Yes       | currency    | The currency in which the transaction is processed.   |
| Yes       | description | A brief description of the transaction.               |
| Yes       | meta        | Additional metadata or information related to the transaction. |
| Yes       | callback    | Callback redirection
| Yes       | isAPI       | A boolean indicating whether the transaction is initiated via API (true/false). |

## Status Codes

### Initiate Payment

| Status Code | Type   | Description                               |
|-------------|--------|-------------------------------------------|
| 90000       | Custom | Initiate payment Saved successfully       |
| 10001       | Custom | An error occurred                         |
| 10002       | Custom | Callback is required                      |
| 10002       | Custom | Email is required                          |
| 10002       | Custom | Invalid currency                          |
| 10005       | Custom | This client transaction ref already exists|

### Confirm Payment

| Status Code | Type   | Description                           |
|-------------|--------|---------------------------------------|
| 10001       | Custom | An error occurred                     |
| 10002       | Custom | Invalid transactionId                 |
| 9000        | Custom | Successful transaction                |

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you discover a bug or have a solution to improve the Payment Gateway for Hydrogen,
we welcome your contributions to enhance the code.

 * Visit our GitHub repository: [https://github.com/HydrogenAfrica/popup-checkout]

 * Create a detailed bug report or feature request in the "Issues" section.

 * If you have a code improvement or bug fix, feel free to submit a pull request.

        * Fork the repository on GitHub

        * Clone the repository into your local system and create a branch that describes what you are working on by pre-fixing with feature-name.

        * Make the changes to your forked repository's branch. Ensure you are using PHP Coding Standards (PHPCS).

        * Make commits that are descriptive and breaks down the process for better understanding.

        * Push your fix to the remote version of your branch and create a PR that aims to merge that branch into master.
        
        * After you follow the step above, the next stage will be waiting on us to merge your Pull Request.

 Your contributions help us make the PG plugin even better for the community. Thank you!

