// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvleYpOWoEkKcahk_1TdioA8sKkFDN15k",
  authDomain: "housem8s-26e0d.firebaseapp.com",
  projectId: "housem8s-26e0d",
  storageBucket: "housem8s-26e0d.appspot.com",
  messagingSenderId: "798530392412",
  appId: "1:798530392412:web:b62cbf310692abde867199",
  measurementId: "G-VKY04H5YTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseApp