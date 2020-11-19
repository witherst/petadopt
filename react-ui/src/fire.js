import firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAoVjB9_QVpdxjh2hGXB-zPu-o6ezuhV6M",
  authDomain: "petlinked-fdff5.firebaseapp.com",
  // databaseURL: "https://petlinked-fdff5.firebaseio.com",
  projectId: "petlinked-fdff5",
  storageBucket: "petlinked-fdff5.appspot.com",
  messagingSenderId: "151936514692",
  appId: "1:151936514692:web:f7e2555dec4608138aa0d1",
  measurementId: "G-9L6CP98WDT",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// export default fire;
export { storage, fire as default };
