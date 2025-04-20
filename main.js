
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

window.openForm = (ranga) => {
  document.getElementById("formPopup").classList.add("active");
  document.getElementById("formRanga").textContent = ranga;
};

window.closeForm = () => {
  document.getElementById("formPopup").classList.remove("active");
};

window.handleZamow = async () => {
  const nick = document.getElementById("nick").value;
  const email = document.getElementById("email").value;
  const metoda = document.getElementById("metoda").value;
  const ranga = document.getElementById("formRanga").textContent;

  if (!nick || !email || !metoda) return alert("Wypełnij wszystkie pola!");

  await addDoc(collection(db, "zamowienia"), {
    nick, email, metoda, ranga, data: new Date().toISOString()
  });
  alert("Zamówienie zapisane!");
  closeForm();
};

window.handleOpinie = async () => {
  const nick = document.getElementById("opNick").value;
  const tekst = document.getElementById("opTekst").value;
  if (!nick || !tekst) return alert("Wypełnij oba pola!");
  await addDoc(collection(db, "opinie"), { nick, tekst, data: new Date().toISOString() });
  document.getElementById("opNick").value = "";
  document.getElementById("opTekst").value = "";
  loadOpinie();
};

async function loadOpinie() {
  const list = document.getElementById("opinieList");
  list.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "opinie"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "opinia";
    div.innerHTML = `<strong>${data.nick}</strong><br>${data.tekst}`;
    list.appendChild(div);
  });
}

loadOpinie();
