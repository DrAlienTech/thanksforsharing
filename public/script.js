var user = firebase.auth().currentUser;
var db = firebase.firestore();
db.enablePersistence();

var Products = db.collection("products");

function redirect(pagePath) {
    if (pagePath === "signout") {
        firebase.auth().signOut();
        window.location.replace("https://www.thx4sharing.web.app");
    } else {
        // var urlParams = new URLSearchParams(window.location.search);
        // var mode = urlParams.get('mode').toString();

        window.location = "../" + pagePath;
    };
};

window.onload = function () {
    // var urlParams = new URLSearchParams(window.location.search);
    // var mode = urlParams.get("darkmode");
    // if (mode == "dark") {
    //     document.getElementByTagName("html").id = "dark";
    // }
};

function view(memeid) {
    var productReference = Products.doc(productid);

    productReference.onSnapshot(function (doc) {
        var views = doc.data().views;
        var rating = doc.data().rating;
        var price = doc.data().price;
        var productRef = doc.data().id.toString();
        console.log("Views: ", views, " Rating: ", rating, " Price: ", price);
    });

    var newViews = {
        views: firebase.firestore.FieldValue.increment(1)
    };

    return productReference.update(newViews).then(function () {
        console.log("Document successfully updated!");
        productReference.onSnapshot(function (doc) {
            var views = doc.data().views;
            var productRef = doc.data().id.toString();
            console.log(views);
            memeRedirect(productRef);
        });
    }).catch(function (error) {
        console.error("Error updating document: ", error);
    });
};

function filter() {

};
Products.orderBy(field, "desc").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var title = doc.data().title.toString();
        var memeDesc = doc.data().description.toString();
        var memeRef = doc.data().id.toString();
        var upvotes = doc.data().upvotes.toString();
        var releaseDate = doc.data().releaseDate.toString();
        var memeid = doc.data().id.toString();

        var outerDiv = document.createElement("div");
        document.getElementById("mostUpvotes").appendChild(outerDiv);
        outerDiv.id = "outer" + title + "upvotes";

        var meme = document.createElement("p");
        meme.innerHTML = title;
        meme.className = "meme";
        meme.onclick = function () {
            view(memeid);
        };
        document.getElementById(outerDiv.id).appendChild(meme);
    });
});

function productRedirect(ref) {
    // var urlParams = new URLSearchParams(window.location.search);
    // var mode = urlParams.get('mode').toString();

    window.location = .html"
};