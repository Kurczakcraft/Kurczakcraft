// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// obsługa zamówień
window.handleZamow = async () => {
  const nick = document.getElementById("nick").value;
  const email = document.getElementById("email").value;
  const metoda = document.getElementById("metoda").value;
  const ranga = document.getElementById("formRanga").textContent;

  if (!nick || !email || !metoda || !ranga) {
    alert("Uzupełnij wszystkie pola!");
    return;
  }

  try {
    await addDoc(collection(db, "zamowienia"), {
      nick,
      email,
      metoda,
      ranga,
      timestamp: new Date()
    });

    alert("Płatność zainicjowana – system płatności będzie zintegrowany.");
    closeForm();
  } catch (e) {
    console.error("Błąd przy zapisie zamówienia:", e);
    alert("Wystąpił błąd podczas składania zamówienia.");
  }
};

// popup
window.openForm = (ranga) => {
  document.getElementById("formPopup").style.display = "flex";
  document.getElementById("formRanga").textContent = ranga;
};

window.closeForm = () => {
  document.getElementById("formPopup").style.display = "none";
};

// opinie
window.handleOpinie = async () => {
  const nick = document.getElementById("opNick").value;
  const tekst = document.getElementById("opTekst").value;

  if (!nick || !tekst) {
    alert("Uzupełnij wszystkie pola!");
    return;
  }

  try {
    await addDoc(collection(db, "opinie"), {
      nick,
      tekst,
      timestamp: new Date()
    });

    document.getElementById("opNick").value = "";
    document.getElementById("opTekst").value = "";
    loadOpinie();
  } catch (e) {
    console.error("Błąd przy dodawaniu opinii:", e);
  }
};

async function loadOpinie() {
  const opinieList = document.getElementById("opinieList");
  opinieList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "opinie"));
  querySnapshot.forEach((doc) => {
    const opinia = doc.data();
    const opiniaDiv = document.createElement("div");
    opiniaDiv.className = "opinia";
    opiniaDiv.innerHTML = `<strong>${opinia.nick}</strong><p>${opinia.tekst}</p>`;
    opinieList.appendChild(opiniaDiv);
  });
}

loadOpinie();
