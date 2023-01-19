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


//Funkcja do dodawania zdjęć do Storage i wyświetlania tych zdjęć
const displayGallery = () => {

const myImg = document.createElement("img");
document.body.appendChild(myImg);
const myInput = document.getElementById("my-input");


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

const myBtn = document.getElementById("my-btn");
myBtn.addEventListener("click", () => {
  const myStatus = document.getElementById("my-status");
  const myFileNameInput = document.getElementById("my-file-name");
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

// Wyświetlenie wszystkich obrazków dostępne w Storage wraz z ich nazwami. Do każdego obrazka dodaj przycisk, który będzie odpowiedzialny za usunięcie obrazka. Po usunięciu obrazka odśwież listę obrazków tak aby usunięty obrazek nie był już więcej wyświetlany. [Nie odświeżaj całej strony]

const storageRef = ref(storage);
listAll(storageRef).then((res) => {
  res.items.forEach(item => {
    getDownloadURL(item).then(url => {
    const myDiv = document.getElementById("first-div");
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
}

// Aplikacja do wprowadzania danych użytkowników do firestore
const usersDataBase = () => {
const button = document.getElementById("my-button");
const myName = document.getElementById("my-name");
const mySurname = document.getElementById("my-surname");
const myAge = document.getElementById("my-age");
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

//wyszukiwanie użytkownika

const findBtn = document.getElementById("find-btn");
const findName = document.getElementById("name");
const findSurname = document.getElementById("surname");
const usersList = document.getElementById("users-list");
const users = collection(db, "users");
findName.placeholder = "podaj imię";
findSurname.placeholder = "podaj nazwisko";


findBtn.addEventListener("click", () => {
  const queryUserName = query(users, where("name","==", findName.value), where("surname","==", findSurname.value));
  const queryUserSurname = query(users, where("surname","==", findSurname.value));
  
  usersList.innerText ="";
  getDocs(queryUserName).then((docs) => {
    docs.forEach(userDoc => {
                  const user = userDoc.data();
                  const userListItem = document.createElement("li");
                  userListItem.innerText = `${user.name} ${user.surname} ${user.department}`;
                 usersList.appendChild(userListItem);
                  
    })
  })
})
}
//funkcja - dodawanie zdjęć do poszczególnych albumów

 const renderAlbums = () => {

const imgInput = document.getElementById("img-input");
const uploadButton = document.getElementById("album-button");
let selectAlbum = document.getElementById("albums");

const storageAlbum1Ref = ref(storage, 'Szkolenia');
const storageAlbum2Ref = ref(storage, 'Konferencje');
const albums = ["Szkolenia", "Konferencje"];
const Album1 = document.getElementById("1");
const Album2 = document.getElementById("2");
let filename ="";

Album1.value = albums[0];
Album2.value = albums[1];
Album1.textContent = albums[0];
Album2.textContent = albums[1];

  uploadButton.addEventListener("click", () => {
  if (selectAlbum.value === "Szkolenia") {
  const file = imgInput.files[0];
  filename = file.name;
  const myImageRef = ref(storageAlbum1Ref, filename);
uploadBytes(myImageRef, file)
.then((result) => {location.reload(true);
})
}

else if(selectAlbum.value === "Konferencje") {
  const file = imgInput.files[0];
  filename = file.name;
  const myImageRef = ref(storageAlbum2Ref, filename);
uploadBytes(myImageRef, file)
.then((result) => {location.reload(true);
})
};
})

listAll(storageAlbum1Ref).then((res) => {
  res.items.forEach(item => {
    getDownloadURL(item).then(url => {
    const myDiv = document.getElementById("album1-div");
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
  }).then((result) => {location.reload(true);
  });
  });
  });
});
});


listAll(storageAlbum2Ref).then((res) => {
  res.items.forEach(item => {
    getDownloadURL(item).then(url => {
    const myDiv = document.getElementById("album2-div");
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
  }).then((result) => {location.reload(true);
  });
  });
  });
});
})
 }

 //KONTENERY 

const firstBox = document.getElementById("first-box");
const secondBox = document.getElementById("second-box");
const thirdBox = document.getElementById("third-box");
const fourthBox = document.getElementById("fourth-box");
const fifthBox = document.getElementById("fifth-box");

const spans = document.getElementsByTagName("span");
const divContent = document.getElementById("page-content");

spans[0].addEventListener("click", () => { 
//  divContent.innerHTML = "";
thirdBox.style.display="none";
secondBox.style.display="none";
firstBox.style.display="block";
  fourthBox.style.display="block";
  fifthBox.style.display="block";

  renderAlbums();
  displayGallery();
});


spans[1].addEventListener("click", () => {
  //  divContent.innerHTML = "";
  firstBox.style.display="none";
  fourthBox.style.display="none";
  fifthBox.style.display="none";
  thirdBox.style.display="block";
secondBox.style.display="block";
   usersDataBase();
 });




 //CZAT

 //inputs
 const chatUserName = document.getElementById("user-name");
 const chatUserSurname = document.getElementById("user-surname");
 const chatUserColor = document.getElementById("user-color");

 //selects

 const chatUserSelect = document.getElementById("choose-user");



