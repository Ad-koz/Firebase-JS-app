import './../styles/styles.css'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { addDoc, doc, getDoc, getFirestore, setDoc, collection, getDocs, updateDoc, query, where } from "firebase/firestore"


    const firebaseConfig = {
        apiKey: "AIzaSyC6-W2cpY7JhgrILY9LIT9rttX3ezmJQIQ",
        authDomain: "project-sda-be047.firebaseapp.com",
        projectId: "project-sda-be047",
        storageBucket: "project-sda-be047.appspot.com",
        messagingSenderId: "136329560677",
        appId: "1:136329560677:web:b0ed2300e412dcb39f7c8c"
      };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);



const myImg = document.createElement("img");
document.body.appendChild(myImg);
const myInput = document.getElementById("myInput");

myInput.addEventListener("change", () => {
  const thumbnail = document.getElementById("thumbnail");
  const file = myInput.files[0];
  console.log(file.name);
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onloadend = function() {
      thumbnail.src = fileReader.result;
  }
  console.log(file.name);
})

const myBtn = document.getElementById("myBtn");
myBtn.addEventListener("click", () => {
  const myStatus = document.getElementById("myStatus");
  const myFileNameInput = document.getElementById("myFileName");
  const file = myInput.files[0];
  let filename = "";
  if(myFileNameInput.value){
    filename = myFileNameInput.value;
}
else {
    filename = file.name;
}
const myImageRef = ref(storage, filename);
myStatus.innerText = "Przesyłanie";
uploadBytes(myImageRef, file).then (() =>{
myStatus.innerText = "Przesłano"
})
});

//Wyświetlenie konkretnego pliku, podając jego nazwę przy użyciu getDownloadURL
// const imageRef = ref(storage, "tatry.JPG");
// getDownloadURL(imageRef).then(url => {
//   const img = document.createElement("img");
//   img.src = url;
//   document.body.appendChild(img);
//   })

// Wyświetlenie wszystkich obrazków dostępne w Storage wraz z ich nazwami. Do każdego obrazka dodaj przycisk, który będzie odpowiedzialny za usunięcie obrazka. Po usunięciu obrazka odśwież listę obrazków tak aby usunięty obrazek nie był już więcej wyświetlany. [Nie odświeżaj całej strony]

const storageRef = ref(storage);
listAll(storageRef).then((res) => {
  res.items.forEach(item => {
    getDownloadURL(item).then(url => {
    const myDiv = document.createElement("div");
    const myImg = document.createElement("img");
    const myHeader = document.createElement("h3");
    const myButton = document.createElement("button");
    myButton.innerText = "usuń";
    myImg.src = url;


    myDiv.appendChild(myHeader);
    myDiv.appendChild(myImg);
    myDiv.appendChild(myButton);
    document.body.appendChild(myDiv);


    myButton.addEventListener("click", () => {
      
   deleteObject(item).then(() => {
   document.body.removeChild(myDiv);
  })
  })
  })
})
})

// Napisz aplikację, która pobiera wybranego użytkownika z bazy danych, a następnie wszystkie jego dane wprowadza do istniejących pól typu input. Użytkownik ma możliwość edycji danych, a następnie zapisania zmian.

const button = document.getElementById("myButton");
const myName = document.getElementById("myName");
const mySurname = document.getElementById("mySurname");
const myAge = document.getElementById("myAge");

myName.placeholder = "podaj imię użytkownika";
mySurname.placeholder = "podaj nazwisko użytkownika";
myAge.placeholder = "podaj wiek użytkownika";

button.addEventListener("click", () =>{
const thisDoc = doc(db, "users", `${myName.value}_${mySurname.value}`)
setDoc(thisDoc, {
name: myName.value,
surname: mySurname.value,
age: myAge.value
}).then((res) => {
  myName.placeholder = "podaj imię użytkownika";
mySurname.placeholder = "podaj nazwisko użytkownika";
myAge.placeholder = "podaj wiek użytkownika";

});
})
document.body.appendChild(button);
