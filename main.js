import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

// Opinie
const opinieList = document.getElementById("opinieList");

async function loadOpinie() {
  const querySnapshot = await getDocs(collection(db, "opinie"));
  opinieList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "opinie-box";
    div.innerHTML = `<div class="nick">${data.nick}</div><div>${data.tekst}</div>`;
    opinieList.appendChild(div);
  });
}

window.handleOpinie = async function () {
  const nick = document.getElementById("opNick").value.trim();
  const tekst = document.getElementById("opTekst").value.trim();

  if (!nick || !tekst) return alert("Uzupełnij dane!");

  await addDoc(collection(db, "opinie"), { nick, tekst });
  document.getElementById("opNick").value = "";
  document.getElementById("opTekst").value = "";
  loadOpinie();
};

window.openForm = function (ranga) {
  document.getElementById("formPopup").style.display = "flex";
  document.getElementById("formRanga").innerText = ranga;
};

window.closeForm = function () {
  document.getElementById("formPopup").style.display = "none";
};

window.handleZamow = function () {
  alert("Płatność zainicjowana – system płatności będzie zintegrowany.");
};

loadOpinie();
