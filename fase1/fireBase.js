// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKnIGcbgPPep9UnZV4SkOA4JFKjGNs8PY",

  authDomain: "prueba-e1d35.firebaseapp.com",

  projectId: "prueba-e1d35",

  storageBucket: "prueba-e1d35.appspot.com",

  messagingSenderId: "579520118163",

  appId: "1:579520118163:web:2a2123256887e36915bc66",
};

//Conectamos con la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore();

//CRUD

export const dameDocs = (ref) => getDocs(collection(db, ref));
export const onDameDocs = (ref, callback) =>
  onSnapshot(collection(db, ref), callback);
export const anadeReserva = (ref, reserva) =>
  addDoc(collection(db, ref), reserva);
export const borraDoc = (ref, id) => deleteDoc(doc(db, ref, id));
export const editarDoc = (ref, id, objeto) =>
  updateDoc(doc(db, ref, id), objeto);
export const cogerDoc = (ref, id) => getDoc(doc(db, ref, id));
