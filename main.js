import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Dodanie opinii
export async function handleOpinie() {
  const nick = document.getElementById("opNick").value.trim();
  const tekst = document.getElementById("opTekst").value.trim();

  if (!nick || !tekst) {
    alert("Uzupełnij nick i treść opinii!");
    return;
  }

  await addDoc(collection(db, "opinie"), {
    nick,
    tekst,
    createdAt: serverTimestamp()
  });

  document.getElementById("opNick").value = "";
  document.getElementById("opTekst").value = "";

  loadOpinie(); // odświeżenie listy opinii
}

// Załaduj opinie
export async function loadOpinie() {
  const opinieDiv = document.getElementById("opinieList");
  opinieDiv.innerHTML = "";

  const q = query(collection(db, "opinie"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const opiniaEl = document.createElement("div");
    opiniaEl.className = "opinia-box";
    opiniaEl.innerHTML = `<strong>${data.nick}</strong><br>${data.tekst}`;
    opinieDiv.appendChild(opiniaEl);
  });
}

// Od razu po załadowaniu strony
window.addEventListener("DOMContentLoaded", loadOpinie);
