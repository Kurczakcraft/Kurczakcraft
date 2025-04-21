// === Firebase init ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
const opinieRef = collection(db, "opinie");
const zamowieniaRef = collection(db, "zamowienia");

// === Obsługa popupów ===
window.openForm = function (ranga) {
  document.getElementById("formRanga").textContent = ranga;
  document.getElementById("formPopup").style.display = "block";
};

window.closeForm = function () {
  document.getElementById("formPopup").style.display = "none";
};

// === Opinie ===
async function handleOpinie() {
  const nick = document.getElementById("opNick").value.trim();
  const tekst = document.getElementById("opTekst").value.trim();

  if (!nick || !tekst) return alert("Uzupełnij nick i opinię!");

  await addDoc(opinieRef, { nick, tekst, created: new Date() });

  document.getElementById("opNick").value = "";
  document.getElementById("opTekst").value = "";

  loadOpinie();
}

async function loadOpinie() {
  const container = document.getElementById("opinieList");
  container.innerHTML = "";

  const snapshot = await getDocs(opinieRef);
  const opinie = [];

  snapshot.forEach(doc => opinie.push(doc.data()));

  opinie
    .sort((a, b) => b.created?.seconds - a.created?.seconds)
    .forEach(opinia => {
      const div = document.createElement("div");
      div.className = "opinia";
      div.innerHTML = `<div class="nick">${opinia.nick}</div><div>${opinia.tekst}</div>`;
      container.appendChild(div);
    });
}

window.handleOpinie = handleOpinie;
loadOpinie();

// === Zamówienia ===
window.handleZamow = async function () {
  const nick = document.getElementById("nick").value.trim();
  const email = document.getElementById("email").value.trim();
  const metoda = document.getElementById("metoda").value;
  const ranga = document.getElementById("formRanga").textContent;

  if (!nick || !email || !metoda || metoda === "Wybierz metodę płatności") {
    alert("Uzupełnij wszystkie pola!");
    return;
  }

  await addDoc(zamowieniaRef, {
    nick,
    email,
    metoda,
    ranga,
    created: new Date()
  });

  alert("Zamówienie zapisane! System płatności będzie wkrótce zintegrowany.");
  closeForm();
};
