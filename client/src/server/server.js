import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCE3831pqMLFfukTieQ4XcPeeWDeQoSE70",
    authDomain: "hacksc23-d3bd4.firebaseapp.com",
    projectId: "hacksc23-d3bd4",
    storageBucket: "gs://hacksc23-d3bd4.appspot.com/",
    messagingSenderId: "36890356908",
    appId: "1:36890356908:web:6a1c76d9bec4feefae4309",
    measurementId: "G-1LMCXRCE00"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var storage = getStorage(app);

const auth = getAuth();

const provider = new GoogleAuthProvider();

export { app, storage, auth, provider, ref }