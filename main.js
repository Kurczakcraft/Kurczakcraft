import { db } from './firebase.js';
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Obsługa zamówienia
window.handleZamow = async () => {
  const nick = document.getElementById("nick").value.trim();
  const email = document.getElementById("email").value.trim();
  const metoda = document.getElementById("metoda").value;
  const ranga = document.getElementById("formRanga").textContent;

  if (!nick || !email || !metoda || metoda === "Wybierz metodę płatności") {
    return alert("Uzupełnij wszystkie pola.");
  }

  try {
    await addDoc(collection(db, "zamowienia"), {
      nick,
      email,
      metoda,
      ranga,
      timestamp: new Date()
    });
    alert("Zamówienie zapisane!");
    document.getElementById("nick").value = "";
    document.getElementById("email").value = "";
    document.getElementById("metoda").selectedIndex = 0;
    closeForm();
  } catch (error) {
    console.error("Błąd przy zapisie zamówienia:", error);
    alert("Wystąpił błąd.");
  }
};

// Obsługa dodawania opinii
window.handleOpinie = async () => {
  const nick = document.getElementById("opNick").value.trim();
  const tekst = document.getElementById("opTekst").value.trim();

  if (!nick || !tekst) {
    return alert("Wpisz nick i opinię.");
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
  } catch (err) {
    console.error("Błąd przy zapisie opinii:", err);
    alert("Nie udało się dodać opinii.");
  }
};

// Ładowanie opinii z Firestore
async function loadOpinie() {
  const opinieList = document.getElementById("opinieList");
  opinieList.innerHTML = "";
  const q = query(collection(db, "opinie"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "opinia-box";
    div.innerHTML = `<strong>${data.nick}</strong><p>${data.tekst}</p>`;
    opinieList.appendChild(div);
  });
}

window.openForm = (ranga) => {
  document.getElementById("formRanga").textContent = ranga;
  document.getElementById("formPopup").style.display = "flex";
};

window.closeForm = () => {
  document.getElementById("formPopup").style.display = "none";
};

window.addEventListener("DOMContentLoaded", () => {
  loadOpinie();
});
