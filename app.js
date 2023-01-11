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
myStatus.innerText = "Przesyłanie...";
uploadBytes(myImageRef, file).then (() =>{
myStatus.innerText = "Przesłano"
})

.then(result => {location.reload(true);
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
    const myDiv = document.getElementById("firstDiv");
    const myImg = document.createElement("img");
    const myButton = document.createElement("button");
    myButton.innerText = "usuń";
    myImg.src = url;

    myButton.setAttribute("id", "btn")

    myDiv.appendChild(myImg);
    myDiv.appendChild(myButton);


    myButton.addEventListener("click", () => {
      
   deleteObject(item).then(() => {
   document.body.removeChild(myDiv);
  })
  })
  })
})
})

// Aplikacja do wprowadzania danych użytkowników do firestore

const button = document.getElementById("myButton");
const myName = document.getElementById("myName");
const mySurname = document.getElementById("mySurname");
const myAge = document.getElementById("myAge");
const myDepartment = document.getElementById("department");

myName.placeholder = "podaj imię użytkownika";
mySurname.placeholder = "podaj nazwisko użytkownika";
myAge.placeholder = "podaj wiek użytkownika";

button.addEventListener("click", () =>{
const thisDoc = doc(db, "users", `${myName.value}_${mySurname.value}`)
setDoc(thisDoc, {
name: myName.value,
surname: mySurname.value,
age: myAge.value,
department: myDepartment.value
}).then((res) => {
  myName.value = "";
mySurname.value = "";
myAge.value = "";

});
})
//document.body.appendChild(button);

//wyszukiwanie użytkownika

const findBtn = document.getElementById("findBtn");
const findName = document.getElementById("name");
const findSurname = document.getElementById("surname");
const usersList = document.getElementById("usersList");
const users = collection(db, "users");
findName.placeholder = "podaj imię";
findSurname.placeholder = "podaj nazwisko";


findBtn.addEventListener("click", () => {
  const queryUserName = query(users, where("name","==", findName.value));
  const queryUserSurname = query(users, where("surname","==", findSurname.value));
  
  // getDocs(queryUserSurname).then((docs) => {
  //   docs.forEach(userDoc => {
  //                 const user = userDoc.data();
  //                 const userListItem = document.createElement("li");
  //                 userListItem.innerText = `${user.name} ${user.surname}`;
  //                usersList.appendChild(userListItem);
  //   });
  // })
  getDocs(queryUserName).then((docs) => {
    docs.forEach(userDoc => {
                  const user = userDoc.data();
                  const userListItem = document.createElement("li");
                  userListItem.innerText = `${user.name} ${user.surname}`;
                 usersList.appendChild(userListItem);
                  
    })
  })
})

//Albumy

const imgInput = document.getElementById("imgInput");
const uploadButton = document.getElementById("albumButton");
let selectAlbum = document.getElementById("albums");


const albums = ["Album1", "Album2"];
const Album1 = document.getElementById("1");
const Album2 = document.getElementById("2");
Album1.value = albums[0];
Album2.value = albums[1];
Album1.textContent = albums[0];
Album2.textContent = albums[1];


const storageAlbum1Ref = ref(storage, 'Album1');
const storageAlbum2Ref = ref(storage, 'Album2');
let filename ="";

if (selectAlbum.value === "Album1") {
  uploadButton.addEventListener("click", () => {
    const file = imgInput.files[0];
   filename = file.name;
  const myImageRef = ref(storageAlbum1Ref, filename);
uploadBytes(myImageRef, file);
});
}
if (selectAlbum.value === "Album2") {
  uploadButton.addEventListener("click", () => {
    const file = imgInput.files[0];
  filename = file.name;
  const myImageRef = ref(storageAlbum2Ref, filename);
uploadBytes(myImageRef, file);
});
}
