import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
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

window.openForm = (ranga) => {
  document.getElementById("formPopup").classList.add("active");
  document.getElementById("formRanga").textContent = ranga;
};

window.closeForm = () => {
  document.getElementById("formPopup").classList.remove("active");
};

window.toggleOpiniePopup = () => {
  document.getElementById("opiniePopup").classList.toggle("active");
};

window.handleZamow = async () => {
  const nick = document.getElementById("nick").value;
  const email = document.getElementById("email").value;
  const metoda = document.getElementById("metoda").value;
  const ranga = document.getElementById("formRanga").textContent;

  if (nick && email && metoda && ranga) {
    await addDoc(collection(db, "zamowienia"), {
      nick, email, metoda, ranga, created: serverTimestamp()
    });
    alert("Zamówienie złożone!");
    closeForm();
  } else {
    alert("Uzupełnij wszystkie pola!");
  }
};

window.handleOpinie = async () => {
  const nick = document.getElementById("opNick").value;
  const tekst = document.getElementById("opTekst").value;

  if (nick && tekst) {
    await addDoc(collection(db, "opinie"), {
      nick, tekst, created: serverTimestamp()
    });
    toggleOpiniePopup();
    document.getElementById("opNick").value = "";
    document.getElementById("opTekst").value = "";
    loadOpinie();
  } else {
    alert("Uzupełnij wszystkie pola!");
  }
};

async function loadOpinie() {
  const opinieRef = collection(db, "opinie");
  const opinieSnap = await getDocs(opinieRef);
  const container = document.getElementById("opinieList");
  container.innerHTML = "";
  opinieSnap.forEach(doc => {
    const { nick, tekst } = doc.data();
    const litera = nick[0].toUpperCase();
    container.innerHTML += `
      <div class="opinia">
        <div class="opinia-avatar">${litera}</div>
        <div class="opinia-text">
          <strong>${nick}</strong><br>
          ${tekst}
        </div>
      </div>
    `;
  });
}

loadOpinie();
