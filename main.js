
// Object with payment details
let obj = {

    amount: 100,
    email: "devtest@randomuser.com",
    currency: "NGN",
    description: "test desc",
    meta: "test meta",
    callback: "https://hydrogenpay.com/", // Your callback redirect
    isAPI: true,
};

// Replace with your actual token
let token = "5030219925952571987360C340A592712A3F582D8625"; // For qa or prod

// Define the openDialogModal function
async function openDialogModal() {

    // Call the function from the external module
    let res = handlePgData(obj, token);
    console.log("return transaction ref", await res);

}
