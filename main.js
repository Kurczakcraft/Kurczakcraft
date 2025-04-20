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
  const nickInput = document.getElementById("nick");
  const emailInput = document.getElementById("email");
  const metodaInput = document.getElementById("metoda");

  const nick = nickInput.value.trim();
  const email = emailInput.value.trim();
  const metoda = metodaInput.value;
  const ranga = document.getElementById("formRanga").textContent;

  // Proste sprawdzenie e-maila
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nick) {
    alert("Podaj swój nick Minecraft.");
    nickInput.focus();
    return;
  }
  if (!email || !emailRegex.test(email)) {
    alert("Podaj poprawny adres e-mail.");
    emailInput.focus();
    return;
  }
  if (!metoda || metoda === "Wybierz metodę płatności") {
    alert("Wybierz metodę płatności.");
    metodaInput.focus();
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

    // Reset formularza
    nickInput.value = "";
    emailInput.value = "";
    metodaInput.selectedIndex = 0;
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
