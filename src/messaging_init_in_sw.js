import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useState } from "react";
import axios from 'axios';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyB_4v3M32avnercYzytIz0e_BjfjqBznKg",
    authDomain: "fcm-hello-c9454.firebaseapp.com",
    projectId: "fcm-hello-c9454",
    storageBucket: "fcm-hello-c9454.appspot.com",
    messagingSenderId: "514569944142",
    appId: "1:514569944142:web:0486eaa2377e3f38fe971f",
    measurementId: "G-10MPSWTMBW"
};

const Firebase = () => {
    const [token, setToken] = useState("");
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Cloud Messaging and get a reference to the service
    const messaging = getMessaging(app);

    function requestPermission() {
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                getToken(messaging, { vapidKey: 'BLaUX1zoYGDKLKgrWYzBodgbZry88Nh32Vc2u03iKtzS35yyQjSq08WbTijSy0d5XWo0fF8-0WveVsfB4mxund8' }).then((currentToken) => {
                    if (currentToken) {
                        setToken(currentToken);
                    } else {
                        // Show permission request UI
                        console.log('No registration token available. Request permission to generate one.');
                        // ...
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                });
            } else {
                console.log('Do not have permission!');
            }
        })
    };

    const sendMessage = () => {
        console.log(token);
        var bodyFormData = new FormData();
        bodyFormData.append('token', token);
        bodyFormData.append('title', 'title');
        bodyFormData.append('text', 'text');
        axios.post("http://localhost:8080/notification/sendMessage", bodyFormData, { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, PUT", 'Access-Control-Allow-Credentials': true })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        // axios({
        //     method: "POST",
        //     url: "http://localhost:8080/notification/sendMessage",
        //     data: bodyFormData,
        //     headers: ,
        // })
        //     .then(function (response) {
        //         //handle success
        //         console.log(response);
        //     })
        //     .catch(function (response) {
        //         //handle error
        //         console.log(response);
        //     });
    }
    return (
        <div>
            <button onClick={requestPermission}>Gen token</button>
            <button onClick={sendMessage}>Subscribe topic News</button>
        </div>
    )
}

export default Firebase;