# Checkout Inline Payment Gateway Integration Guide

# Introduction 

This guide provides a step-by-step approach to integrating a payment gateway using an inline JavaScript popup modal. The code samples include both the HTML structure and JavaScript logic to facilitate a seamless checkout experience on your web application.

# Getting Started

To integrate the payment gateway with your web application, follow the steps outlined below. These steps will guide you through adding the required scripts, triggering a checkout modal, and handling the payment process.

1.	Integration steps

    1.  Include the Required Scripts

        ```html
        <script src="https://js.hydrogenpay.com/inline.js" module></script>

        ```

    2. Create a Checkout Button

        Add a button to your HTML page to trigger the checkout modal. In this example, the button has an ID of myBtn and calls the openDialogModal() function when clicked.

        ```html
        <button id="myBtn" onclick="openDialogModal()">Checkout</button>

        ```

    3. Include Payment Information

        Set up a JavaScript object that contains the necessary parameters for the payment transaction, such as amount, email, currency, and callback URL. This object will be used to initialize the payment request.

        ```javascript

        let obj = {
            amount: 100,                       // Payment amount
            email: "bwitlawalyusuf@gmail.com", // Customer's email address
            currency: "NGN",                   // Currency code (e.g., NGN for Nigerian Naira)
            description: "test desc",          // Payment description (what the payment is for)
            meta: "Lawal Yusuf",                 // Meta information (extra info to be passed with the payment)
            callback: window.location.href,    // Callback URL for redirect after payment (can be replaced with your actual URL)
            isAPI: true,                       // Flag to indicate if the transaction is via API (set to true)
        };

        ```

    4. APIs Keys (Sandbox Apis Keys / Live Apis Keys)

        Obtain an Apis Keys from the HydrogenPay dashboard. This token is necessary for both Sanbox and production environments.
        
        ```javascript

        let token = "PK_TEST_cca53e0b3bc7847aff94502b8a585f84"; // Replace with actual Apis key
        ```

    5. Implement the Payment Gateway Function

        Implement the openDialogModal() function, which will call the payment gateway with the provided payment information and authorization token. Handle the success, failure, and close events accordingly.

        ```javascript

        async function openDialogModal() {
            let transactionRef = await handlePgData(obj, token, onClose);
            // Handle transaction status and update UI accordingly

        }

        ```

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

