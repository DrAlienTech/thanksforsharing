var Products = db.collection("products");
var ShoppingCart = db.collection("cart");

var txtElements = ["name", "description", "price", "rating"];
var actionElements = ["addtocart", "checkout"];
var actionNames = ["Add to Cart", "Fast Checkout"];

function filter(field) {
    document.getElementById("products").innerHTML = "";
    Products.orderBy(field).get().then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            showProducts(doc);
        });
    });
};

function results(keystring) {
    document.getElementById("products").innerHTML = "";
    Products.where("keywords", "array-contains-any", keystring.split(" ")).orderBy("keywords").get().then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            showProducts(doc);
        });
    });
};

function showProducts(doc) {
    var name = doc.data().name.toString();
    var imageRef = doc.data().imageRef.toString();
    var desc = doc.data().description.toString();
    var price = doc.data().price;
    var deliveryTime = doc.data().deliveryTime.toString();

    var ratings = doc.data().ratings;
    var sum = 0;
    for (var i = 0; i < ratings.length; i++) {
        sum += ratings[i];  
    };
    var rating = (sum / ratings.length).toFixed(1);
    
    var txtContent = [name, desc, price, rating];

    var outerDiv = document.createElement("v-product");
    document.getElementById("products").appendChild(outerDiv);
    outerDiv.id = "outer" + name;

    var image = document.createElement("img");
    image.src = imageRef;
    document.getElementById(outerDiv.id).appendChild(image);

    var text = document.createElement("v-text");
    text.className = "vtext";
    text.id = "productText" + name;
    document.getElementById(outerDiv.id).appendChild(text);

    for (i = 0; i < txtElements.length; i++) {
        var txt = txtElements[i];
        var elem = document.createElement("v-" + txt);
        if (txt == "price") {
            elem.innerHTML = "$" + txtContent[i] + "/month";
        } else if (txt == "rating") {
            elem.innerHTML = "<i class='fas fa-star'></i> " + txtContent[i];
        } else {
            elem.innerHTML = txtContent[i];
        }
        elem.className = "v" + txt;
        document.getElementById(text.id).appendChild(elem);
    };

    var actions = document.createElement("v-actions");
    actions.className = "vactions";
    actions.id = "productActions" + name;
    document.getElementById(outerDiv.id).appendChild(actions);

    for (i = 0; i < actionElements.length; i++) {
        var action = actionElements[i];
        var elem = document.createElement("v-" + action);
        elem.innerHTML = actionNames[i];
        if (action == "addtocart"){
            elem.addEventListener('click', function () {
                if (firebase.auth().currentUser != null) {
                    ShoppingCart.doc(firebase.auth().currentUser.displayName).set({
                        items: firebase.firestore.FieldValue.arrayUnion(name)
                    }, {merge: true});
                } else {
                    alert('You are currently not signed in. Sign in or use fast checkout to purchase without an account.');
                }
            });
        } else {
            elem.addEventListener('click', function () {
                console.log(action);
                var ccn = prompt("Enter Credit Card Number: ");
                var addr = prompt("Enter Shipping Address");
                alert("Product ordered! Should arrive in around ", deliveryTime);
            });
        }
        elem.classList.add("v-" + action, "mdl-button", "mdl-js-button", "mdl-button--raised", "mdl-js-ripple-effect");
        document.getElementById(actions.id).appendChild(elem);
    };
};

function addToCart(productid) {
    ShoppingCart.doc(firebase.auth().currentUser.displayName).update({
        items: firebase.firestore.FieldValue.arrayUnion(productid)
    });
};

function removeFromCart(productid) {
    ShoppingCart.doc(firebase.auth().currentUser.displayName).update({
        items: firebase.firestore.FieldValue.arrayRemove(productid)
    });
};

function showCart() {
    var totalPrice = 
    ShoppingCart.doc(firebase.auth().currentUser.displayName).collection(firebase.auth().currentUser.displayName).get().then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            var name = doc.data().name.toString();
            var imageRef = doc.data().imageRef.toString();

            var outerDiv = document.createElement("c-product");
            document.getElementById("cartItems").appendChild(outerDiv);
            outerDiv.id = "couter" + name;

            var image = document.createElement("img");
            image.src = imageRef;
            document.getElementById(outerDiv.id).appendChild(image);

            var nameEl = document.createElement("c-name");
            nameEl.className = "cname";
            nameEl.id = "cartName" + name;
            nameEl.innerHTML = name;
            document.getElementById(outerDiv.id).appendChild(nameEl);

            Products.doc(name).get().then(function (doc) {
                var price = doc.data().price;
            });

            var priceEl = document.createElement("c-price");
            priceEl.className = "cprice";
            priceEl.id = "cartPrice" + price;
            priceEl.innerHTML = price;
            document.getElementById(outerDiv.id).appendChild(priceEl);

            var remove = document.createElement("c-remove");
            remove.classList.add("remove", "mdl - button", "mdl - js - button", "mdl - button--icon", "mdl - button--colored");
            remove.id = "remove" + name;
            remove.innerHTML = " <i class='remove material - icons'>cancel</i>";
            document.getElementById(outerDiv.id).appendChild(remove);
            remove.addEventListener('click', removeFromCart(name));
        });
    });
};

function rate(productid, val) {
    Products.doc(productid).update({
        ratings: firebase.firestore.FieldValue.arrayUnion(val)
    }).then(function (doc){
        var ratings = doc.data().ratings;
        var sum = 0;

        for (var i = 0; i < ratings.length; i++) {
            sum += ratings[i];
        };
        var rating = sum / ratings.length;  
        console.log(rating);
    });
};

function checkOut() {
    ShoppingCart.doc(firebase.auth().currentUser.displayName).set({
        price: 0,
        items: []
    });
};

// function fastCheckOut() {
//     var ccn = prompt("Enter Credit Card Number: ");
// };