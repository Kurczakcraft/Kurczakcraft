// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

// Obsługa popupów
let selectedRanga = "";

window.openForm = function (ranga) {
  selectedRanga = ranga;
  document.getElementById("formRanga").innerText = ranga;
  document.getElementById("formPopup").style.display = "flex";
};

window.closeForm = function () {
  document.getElementById("formPopup").style.display = "none";
};

// Obsługa zamówień
window.handleZamow = async function () {
  const nick = document.getElementById("nick").value.trim();
  const email = document.getElementById("email").value.trim();
  const metoda = document.getElementById("metoda").value;

  if (!nick || !email || !metoda || !selectedRanga) {
    alert("Uzupełnij wszystkie pola!");
    return;
  }

  try {
    await addDoc(collection(db, "zamowienia"), {
      nick,
      email,
      metoda,
      ranga: selectedRanga,
      timestamp: serverTimestamp()
    });

    alert("Płatność zainicjowana – system płatności będzie zintegrowany.");
    closeForm();
  } catch (error) {
    console.error("Błąd przy zamówieniu:", error);
    alert("Wystąpił błąd. Spróbuj ponownie.");
  }
};

// Dodawanie opinii
window.handleOpinie = async function () {
  const nick = document.getElementById("opNick").value.trim();
  const tekst = document.getElementById("opTekst").value.trim();

  if (!nick || !tekst) {
    alert("Uzupełnij wszystkie pola!");
    return;
  }

  try {
    await addDoc(collection(db, "opinie"), {
      nick,
      tekst,
      timestamp: serverTimestamp()
    });

    document.getElementById("opNick").value = "";
    document.getElementById("opTekst").value = "";
    loadOpinie(); // przeładuj opinie
  } catch (error) {
    console.error("Błąd przy dodawaniu opinii:", error);
    alert("Wystąpił błąd. Spróbuj ponownie.");
  }
};

// Wczytywanie opinii
async function loadOpinie() {
  const opinieList = document.getElementById("opinieList");
  opinieList.innerHTML = "";

  const q = query(collection(db, "opinie"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "opinia-box";
    div.innerHTML = `<strong>${data.nick}</strong><p>${data.tekst}</p>`;
    opinieList.appendChild(div);
  });
}

// Załaduj opinie przy starcie
loadOpinie();
