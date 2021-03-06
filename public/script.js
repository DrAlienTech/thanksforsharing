firebase.initializeApp({
    apiKey: "AIzaSyBVT22t-x2H76119AHG8SgPU0_A0U-N1uA",
    authDomain: "my-scrap-project.firebaseapp.com",
    databaseURL: "https://my-scrap-project.firebaseio.com",
    projectId: "my-scrap-project",
    storageBucket: "my-scrap-project.appspot.com",
    messagingSenderId: "334998588870",
    appId: "1:334998588870:web:6b218e9655ade3a6c536c7",
    measurementId: "G-66W8QQ9W35"
});

var db = firebase.firestore();
db.enablePersistence();

var users = db.collection("users");
var emails = db.collection("emails");
var Products = db.collection("products");
var ShoppingCart = db.collection("cart");
var Orders = db.collection("orders");

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key == "Enter") {
        if (document.getElementById('search').value.toString().toLowerCase() != "") {
            search();
        } else if (document.getElementById('popupsignin').style.display != "none") {
            signIn();
        } else if (document.getElementById('signup').style.display != "none") {
            handleSignUp();
        } else if (document.getElementById('pwreset').style.display != "none") {
            sendPasswordReset();
        }
    }
})

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        pageLoad(true);
    } else {
        pageLoad(false);
    }
})

function pageLoad(u) {
    xhttp("navbar", "navbarHeader");
    xhttp("auth", "authDiv");
    xhttp("footer", "footerFooter");

    if (u == true) {
        window.onload = function () {
            document.getElementById("signin").innerHTML = "Sign Out";
        };

        window.user = firebase.auth().currentUser;

        if (!user) {
            return console.error("Auth error occurred, pageLoad(true) called even though firebase.auth().currentUser is " + user);
        }

        window.usersUser = users.doc(user.uid);
        window.emailsUser = emails.doc(user.displayName);
        window.userCart = ShoppingCart.doc(user.displayName).collection(user.displayName);

        if (window.location.href.includes("products.html")) {
            var urlParams = new URLSearchParams(decodeURIComponent(window.location.search));
            var query = urlParams.get('query');

            var filters = [];

            urlParams.forEach((value, key) => {
                if (key != "query" && !filters.includes(value)) {
                    filters.push(value);
                }
            });

            results(query.toLowerCase(), filters);
        } else if (window.location.href.includes("cart.html")) {
            showCart();
        } else if (window.location.href.includes("s2s.html")) {
            s2sStart();
        } else {
            console.log("info page?");
        }
    } else {
        window.user = null;

        if (window.location.href.includes("products.html")) {
            var urlParams = new URLSearchParams(decodeURIComponent(window.location.search));
            var query = urlParams.get('query');

            var filters = [];

            urlParams.forEach((value, key) => {
                if (key != "query" && !filters.includes(value)) {
                    filters.push(value);
                }
            });

            results(query.toLowerCase(), filters);
        } else if (window.location.href.includes("cart.html")) {
            document.getElementById("cartItems").innerHTML = "<h1 style='text-align: center'>Not signed in! Sign in to use cart.<h1>";
            document.getElementById("totalPrice").innerHTML = "Total Price: $0.00";
        } else if (window.location.href.includes("s2s.html")) {
            s2sStart();
        }
    }
}

function xhttp(source, tag) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(tag).innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", `${source}.html`, true);
    xhttp.send();
}

function search() {
    var search = _("search");

    if (search != "") {
        var text = search;
        window.location = "products.html?query=" + text.toString();
    } else {
        display('search');
    }
}

function redirect(pagePath) {
    window.location.replace(pagePath);
}

function display(elem) {
    $('#' + elem).toggle();
}

function togglepsi() {
    if (document.getElementById('popupsignin').style.display == "none") {
        $('#popupsignin').show();
        $("#popupsignin").animate({
            top: '0.015%',
        });
        $('#popupsignin').css({
            'background-color': 'rgba(0,0,0,0.5)'
        });
    } else {
        $("#popupsignin").animate({
            top: '-150%',
        });
        $('#popupsignin').css({
            'background-color': 'rgba(0,0,0,0)'
        });
        setTimeout(function () {
            $('#popupsignin').hide();
        }, 360);
    }
}

function toggleSlideMenu() {
    if (document.getElementById('slideinmenu').style.display == "none") {
        $('#slideinmenu').show();
        $("#slideinmenu").animate({
            left: '97%',
        });
    } else {
        $("#slideinmenu").animate({
            left: '100%',
        });

        setTimeout(function () {
            $('#slideinmenu').hide();
        }, 360);
    }
}

function _(id) {
    var el = document.getElementById(id);
    var elType = el.type;

    switch (elType) {
        case "checkbox":
            var value = el.checked;
            break;
        default:
            var value = el.value;
    }

    return value;
}