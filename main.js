// Step 1: Define the payment details object.
let obj = {
  amount: 100,
  email: "bwitlawalyusuf@gmail.com",
  currency: "NGN",
  description: "test desc",
  meta: "Lawal Yusuf",
  callback: window.location.href,
  isAPI: true,
};

// Step 2: Replace with your actual APIS Keys for authentication.
let token = "PK_TEST_cca53e0b3bc7847aff94502b8a585f84";

// Step 3: Define the success callback function.
// This function is triggered when the payment is successful.
// It removes the payment modal and redirects the user to the callback URL with the transaction reference.
function onSuccessCallback(transactionRef) {
  const modalContainer = document.getElementById("hydrogenPay_myModal");
  if (modalContainer) {
    modalContainer.remove();
    console.log("Payment Successful: ", transactionRef);

    // Implement your custom logic here when payment successful

    // Append the transaction reference (transactionRef) to the current URL as a query parameter.
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("transactionRef", transactionRef); // Add transactionRef to the URL
    window.location.href = currentUrl.toString(); // Redirect to the updated URL
  }
}

// Step 4: Define the failure callback function.
// This function is triggered if the payment fails.
function onFailedCallback(transactionRef) {
  const modalContainer = document.getElementById("hydrogenPay_myModal");
  if (modalContainer) {
    modalContainer.remove(); // Remove the payment modal from the DOM
    console.log("Payment Failed: ", transactionRef);

    // Implement your custom logic here when payment fails (e.g., show a failure message)
  }
}

// Step 5: Handle the close event.
// This function is triggered when the payment modal is closed by the user.
function onClose(transactionRef) {
  var response = { event: "close", transactionRef: transactionRef };
  window.parent.postMessage(JSON.stringify(response), "*"); // Send the close event message to the parent window
}

// Step 6: Define the function to open the Hydrogen payment modal and initiate the payment process.
async function openDialogModal() {
  // Call the payment gateway and pass the payment details (obj) and token.
  let res = await handlePgData(obj, token, onClose);
  let transactionRef = res;
  console.log("transactionRef: ", transactionRef);

  // Step 7: Poll the payment status every 3 seconds until payment is completed (Paid) or failed.
  let checkStatus = setInterval(async function () {
    try {
      // Check the current payment status by calling a status checking function (handlePaymentStatus).
      const checkPaymentStatus = await handlePaymentStatus(
        transactionRef,
        token
      );

      // If the payment status is "Paid", trigger the success callback and stop checking.
      if (checkPaymentStatus.status === "Paid") {
        let responseEvent = {
          event: "success",
          transactionRef: checkPaymentStatus.transactionRef,
        };
        window.parent.postMessage(JSON.stringify(responseEvent), "*"); // Send success message to the parent window
        clearInterval(checkStatus);
      }

      // If the payment status is "Failed", trigger the failure callback and stop checking.
      else if (checkPaymentStatus.status === "Failed") {
        let responseEvent = {
          event: "failed",
          transactionRef: checkPaymentStatus.transactionRef,
        };
        window.parent.postMessage(JSON.stringify(responseEvent), "*");
        clearInterval(checkStatus);
      }
    } catch (error) {
      // Log any error that occurs during status checking.
      console.error("Error while checking payment status:", error);
      clearInterval(checkStatus); // Stop checking if an error occurs
    }
  }, 3000); // Poll the status every 3 seconds
}

// Step 8: Listen for messages from the parent window.
// This event listener handles messages for different payment events (success, failure, close) sent from the parent window.
window.addEventListener(
  "message",
  function (event) {
    var messageResponse = JSON.parse(event.data); // Parse the message received from the parent window
    switch (messageResponse.event) {
      case "success":
        // Trigger the success callback with the received transaction reference.
        onSuccessCallback(messageResponse.transactionRef);
        console.log("successful:", messageResponse);
        break;

      case "failed":
        // Trigger the failure callback with the received transaction reference.
        onFailedCallback(messageResponse.transactionRef);
        console.log("Failed:", messageResponse);
        break;

      case "close":
        // Handle the close event when the modal is closed.
        console.log("Transaction Close: ", messageResponse.transactionRef);
        break;

      default:
        console.log("Unknown event:", messageResponse); // Handle any unknown events
        break;
    }
  },
  false
);
