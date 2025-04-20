import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjkWkuC43qRrYrYimohrWSF5r-ZR2-EhQ",
  authDomain: "kurczakcraft-34cf6.firebaseapp.com",
  projectId: "kurczakcraft-34cf6",
  storageBucket: "kurczakcraft-34cf6.appspot.com",
  messagingSenderId: "523073421401",
  appId: "1:523073421401:web:14640c7431dd9e8cb27148",
  measurementId: "G-H2G0L57J1Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.handleOpinie = async () => {
  const nick = document.getElementById("opNick").value;
  const tekst = document.getElementById("opTekst").value;
  if (nick && tekst) {
    await addDoc(collection(db, "opinie"), { nick, tekst });
    loadOpinie();
    document.getElementById("opNick").value = "";
    document.getElementById("opTekst").value = "";
  }
};

window.loadOpinie = async () => {
  const opinieList = document.getElementById("opinieList");
  opinieList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "opinie"));
  querySnapshot.forEach((doc) => {
    const div = document.createElement("div");
    div.className = "opinia";
    div.innerHTML = `<strong>${doc.data().nick}</strong>: ${doc.data().tekst}`;
    opinieList.appendChild(div);
  });
};

window.openForm = (ranga) => {
  document.getElementById("formRanga").innerText = ranga;
  document.getElementById("formPopup").style.display = "flex";
};

window.closeForm = () => {
  document.getElementById("formPopup").style.display = "none";
};

window.handleZamow = () => {
  alert("Płatność jeszcze nie została podłączona.");
};

loadOpinie();