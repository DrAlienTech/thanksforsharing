firebase.initializeApp({
    apiKey: "AIzaSyCxRTkWjoToUoNsM8Rm6zPwiJBG_JCB4fo",
    authDomain: "verycoolthanksforsharing.firebaseapp.com",
    databaseURL: "https://verycoolthanksforsharing.firebaseio.com",
    projectId: "verycoolthanksforsharing",
    storageBucket: "verycoolthanksforsharing.appspot.com",
    messagingSenderId: "78626384450",
    appId: "1:78626384450:web:5c1a5470485502ab"
});

var user = firebase.auth().currentUser;
var db = firebase.firestore();
db.enablePersistence();

var Products = db.collection("products");

function redirect(pagePath) {
    if (pagePath === "signout") {
        firebase.auth().signOut();
        window.location.replace("https://verycoolmathgames.github.io");
    } else {
        var urlParams = new URLSearchParams(window.location.search);
        var mode = urlParams.get('mode').toString();

        window.location = "../" + pagePath + "?mode=" + mode;
    };
};

window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var mode = urlParams.get("darkmode");
    if (mode == "dark") {
        document.getElementByTagName("html").id = "dark";
    }
};

function view(memeid) {
    var Memes = db.collection("memes");
    var memeReference = Memes.doc(memeid);

    memeReference.onSnapshot(function (doc) {
        var views = doc.data().views;
        var memeRef = doc.data().id.toString();
        console.log(views);
    });

    var newViews = {
        views: firebase.firestore.FieldValue.increment(1)
    };
    return memeReference.update(newViews).then(function () {
        console.log("Document successfully updated!");
        memeReference.onSnapshot(function (doc) {
            var views = doc.data().views;
            var memeRef = doc.data().id.toString();
            console.log(views);
            memeRedirect(memeRef);
        });
    }).catch(function (error) {
        console.error("Error updating document: ", error);
    });
};

Memes.orderBy("upvotes", "desc").get().then((querySnapshot) => {
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

Memes.orderBy("releaseDate", "desc").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var title = doc.data().title.toString();
        var memeDesc = doc.data().description.toString();
        var memeRef = doc.data().id.toString();
        var upvotes = doc.data().upvotes.toString();
        var releaseDate = doc.data().releaseDate.toString();
        var memeid = doc.data().id.toString();

        var outerDiv = document.createElement("div");
        document.getElementById("newest").appendChild(outerDiv);
        outerDiv.id = "outer" + title + "new";

        var meme = document.createElement("p");
        meme.innerHTML = title;
        meme.className = "meme";
        meme.onclick = function () {
            view(memeid);
        };
        document.getElementById(outerDiv.id).appendChild(meme);
    });
});

Memes.orderBy("views", "desc").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var title = doc.data().title.toString();
        var memeDesc = doc.data().description.toString();
        var memeRef = doc.data().id.toString();
        var upvotes = doc.data().upvotes.toString();
        var releaseDate = doc.data().releaseDate.toString();
        var memeid = doc.data().id.toString();

        var outerDiv = document.createElement("div");
        document.getElementById("mostViewed").appendChild(outerDiv);
        outerDiv.id = "outer" + title + "views";

        var meme = document.createElement("p");
        meme.innerHTML = title;
        meme.className = "meme";
        meme.onclick = function () {
            view(memeid);
        };
        document.getElementById(outerDiv.id).appendChild(meme);
    });
});

function memeRedirect(ref) {
    var urlParams = new URLSearchParams(window.location.search);
    var mode = urlParams.get('mode').toString();

    window.location = "viewmeme.html?mode=" + mode + "&meme_ref=" + ref;
};