// General C2C
function c2cStart() {
    if (firebase.auth().currentUser != null) {
        usersUser.get().then(function (doc) {
            if (doc.data().totalPrice >= 500) {
                console.log("c2c-verified");
                document.getElementById("c2c-verified").style.display = "block";
            } else {
                console.log("c2c-verified");
                document.getElementById("c2c-unverified").style.display = "block";
            }
        });
    } else {
        console.log("no user");
        document.getElementById("c2c-nouser").style.display = "block";
    }
}

function viewC2CPeople() {

};

function viewC2CProducts() {

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

function addProduct() {

};

function removeProduct() {

};

function viewOrder() {

};

function confirmSale() {

};

function confirmShipment() {

};