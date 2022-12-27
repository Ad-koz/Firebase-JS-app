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

//Listowanie plików ze Storage
const storageRef = ref(storage);
listAll(storageRef).then((res) => {
  const myOl = document.createElement("ol");
  res.items.forEach(item => {
  const myLi = document.createElement("li");
  myLi.innerText = item.fullPath;
  myOl.appendChild(myLi);
  
  })

  document.body.appendChild(myOl);
  })

