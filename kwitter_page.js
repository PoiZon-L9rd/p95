const firebaseConfig = {
    apiKey: "AIzaSyB9JzKEEL538LWiiK7r2hlYfiKp5NEmVqs",
    authDomain: "kwitter-app-110ab.firebaseapp.com",
    databaseURL: "https://kwitter-app-110ab-default-rtdb.firebaseio.com",
    projectId: "kwitter-app-110ab",
    storageBucket: "kwitter-app-110ab.appspot.com",
    messagingSenderId: "602837606058",
    appId: "1:602837606058:web:13fbb30659447dfe5cbad3"
};
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}