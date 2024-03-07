import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDdiPVK5xPoiwyLWEG6ZK1fI1Ejrb2ykjQ",
  authDomain: "bio-binimoy.firebaseapp.com",
  projectId: "bio-binimoy",
  storageBucket: "bio-binimoy.appspot.com",
  messagingSenderId: "444125990518",
  appId: "1:444125990518:web:c6807f3fed08573a781957"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);