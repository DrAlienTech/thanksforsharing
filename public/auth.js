// Email Login
function displayName() {
    var uid = user.uid;
    var users = db.collection("users");
    users.doc(uid).get().then(function (doc) {
        var displayName = doc.data().displayName;
        return displayName;
    });
};

function eToggleSignIn() {
    document.getElementById("popupsignin").style.display = "none";
    document.getElementById("email").style.display = "block";
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    if (username.length < 3) {
        alert('Please enter a longer username.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a longer password.');
        return;
    }

    var emails = db.collection("emails"); // firebase.firestore().collection("emails")
    var users = db.collection("users"); // firebase.firestore().collection("users")
    var userData = emails.doc(username); // firebase.firestore().collection("emails").doc(username)

    userData.get().then(function (doc) {
        if (doc.exists) {
            log("Document data:", doc.data());
            var email = doc.data().email;
            var uid = doc.data().uid;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function () {
                    firebase.auth().onAuthStateChanged(function (user) {
                        window.location = "home.html?mode=light";
                    });
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    log(error);
                });
        } else {
            log("Document does not exist!");
            alert("User not found!");
        }
    }).catch(function (error) {
        log("Error getting document:", error);
    });
};
// Email Login End

// document.addEventListener('keydown', function (event) {
//     var password = document.getElementById('password').value;
//     var username = document.getElementById('username').value;
//     const key = event.key;
//     if (key == "Enter" && password != null && username != null) {
//         eToggleSignIn();
//     }
// });

// Google Login Begin
function gToggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            var uid = user.uid.toString();
            var db = firebase.firestore();
            var emails = db.collection("emails");
            var users = db.collection("users");

            firebase.auth().onAuthStateChanged(function (user) {
                if (user != null) {
                    var user = firebase.auth().currentUser;

                    user.providerData.forEach(function (profile) {
                        var username = profile.displayName.toString();
                        var email = profile.email.toString();
                        var userDataEmails = emails.doc(username);
                        var userDataUsers = users.doc(uid);

                        userDataEmails.get().then(function (doc) {
                            if (!doc.exists) {
                                userDataEmails.set({
                                    email: email,
                                    uid: uid,
                                }).then(function () {
                                    log("Document successfully written!");
                                }).catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                            } else {
                                log("Emails doc already exists, skipped writing.");
                            }
                        });

                        userDataUsers.get().then(function (doc) {
                            if (!doc.exists) {
                                userDataUsers.set({
                                    displayName: username,
                                    email: email,
                                }).then(function () {
                                    log("Document successfully written!");
                                }).catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                            } else {
                                log("Users doc already exists, skipped writing.");
                            }
                        });
                        window.location = "index.html?mode=light";
                    });
                }
            })
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different method for that email. If you want to merge your Google account with an Email/Password account, go to the Account page.');
            } else {
                console.error(error);
            }
        });
    } else {
        firebase.auth().signOut();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            var uid = user.uid.toString();
            var db = firebase.firestore();
            var emails = db.collection("emails");
            var users = db.collection("users");

            firebase.auth().onAuthStateChanged(function (user) {
                if (user != null) {
                    var user = firebase.auth().currentUser;

                    user.providerData.forEach(function (profile) {
                        var username = profile.displayName.toString();
                        var email = profile.email.toString();
                        var userDataEmails = emails.doc(username);
                        var userDataUsers = users.doc(uid);

                        userDataEmails.get().then(function (doc) {
                            if (!doc.exists) {
                                userDataEmails.set({
                                    email: email,
                                    uid: uid,
                                }).then(function () {
                                    log("Document successfully written!");
                                }).catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                            } else {
                                log("Emails doc already exists, skipped writing.");
                            }
                        });

                        userDataUsers.get().then(function (doc) {
                            if (!doc.exists) {
                                userDataUsers.set({
                                    displayName: username,
                                    email: email,
                                }).then(function () {
                                    log("Document successfully written!");
                                }).catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                            } else {
                                log("Users doc already exists, skipped writing.");
                            }
                        });
                        window.location = "index.html?mode=light";
                    });
                }
            })
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different method for that email. If you want to merge your Google account with an Email/Password account, go to the Account page.');
            } else {
                console.error(error);
            }
        });
    }
};
// Google Login End