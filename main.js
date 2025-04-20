import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

window.openForm = function (ranga) {
  document.getElementById("formRanga").innerText = ranga;
  document.getElementById("formPopup").style.display = "flex";
};

window.closeForm = function () {
  document.getElementById("formPopup").style.display = "none";
};

window.handleZamow = function () {
  alert("Dziękujemy za zamówienie! (płatność symulowana)");
  closeForm();
};

window.handleOpinie = async function () {
  const nick = document.getElementById("opNick").value.trim();
  const tekst = document.getElementById("opTekst").value.trim();
  if (!nick || !tekst) return alert("Wypełnij wszystkie pola!");

  await addDoc(collection(db, "opinie"), {
    nick,
    tekst,
    data: new Date()
  });

  document.getElementById("opNick").value = "";
  document.getElementById("opTekst").value = "";
};

const opinieList = document.getElementById("opinieList");
onSnapshot(collection(db, "opinie"), (snapshot) => {
  opinieList.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "opinia";
    div.innerHTML = `<strong>${data.nick}</strong><p>${data.tekst}</p>`;
    opinieList.appendChild(div);
  });
});
