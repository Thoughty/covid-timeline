import firebase from "firebase/compat/app"
import "firebase/compat/firestore"


const config = {
    apiKey: "AIzaSyA5KxXkRazuQauq1MJrMqzESBjDPSVY8yg",
    authDomain: "covid-timeline-5d039.firebaseapp.com",
    projectId: "covid-timeline-5d039",
    storageBucket: "covid-timeline-5d039.appspot.com",
    messagingSenderId: "2952229916",
    appId: "1:2952229916:web:30074c9f16c033040adbd9"
};

if(!firebase.apps.length)
{
    firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export { firestore };