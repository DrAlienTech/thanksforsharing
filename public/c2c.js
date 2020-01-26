import { messaging } from "firebase";

// General C2C
function c2cStart(u, usersUser) {
    usersUser = arguments[1] || false;
    if (u) {
        usersUser.get().then(function (doc) {
            if (doc.data().totalPrice >= 500) {
                console.log("c2c-verified");
                document.getElementById("c2c-verified").style.display = "block";

                viewProducts();
            } else {
                console.log("c2c-unverified");
                document.getElementById("c2c-unverified").style.display = "block";
            }
            console.log(doc.data().totalPrice);
        });
    } else {
        console.log("no user");
        document.getElementById("c2c-nouser").style.display = "block";
    }
};

function viewC2CProducts() {
    redirect('products.html?query=c2c');
};

// C2C Unverified
function verifyForm() {

};

function verifyInfo() {

};

function checkVerificationStatus() {

};

// C2C Verified
function viewProducts() {

};

function viewProductInPage(id) {

}

function addProduct() {

};

function removeProduct(id) {

};

function viewOrder() {

};

function confirmSale(id) {

};

function confirmShipment(id) {

};

// Messaging
messaging.usePublicVapidKey('BONZTuA0A2YLkuZGw_CejH2IaRLl6DSfr3ziXT1ARqT3jnmZcBfHfnBFllN5NshehA8wSYk2MRJWTTpyASfhtz8');