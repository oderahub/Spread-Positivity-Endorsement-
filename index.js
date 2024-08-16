// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";


import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-a4496-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);

const database = getDatabase(app);

const endorsementInDb = ref(database, "endorsementList");

const inputEl = document.getElementById("input-field");
const publishEl = document.getElementById("publish-btn");
const displayEl = document.getElementById("endorsement-list");

publishEl.addEventListener("click", function () {
  let list = inputEl.value.trim();

  if (list !== "") {
    push(endorsementInDb, list);
    clearEl();
  }
})
onValue(endorsementInDb, function (snapshot) {
  displayEl.innerHTML = "";
  if (snapshot.exists()) {
    let endorsementArray = Object.values(snapshot.val()).reverse();

    clearEl();

    for (let i = 0; i < endorsementArray.length; i++) {
      let currentEndorsement = endorsementArray[i];

      appendNewEndorsement(currentEndorsement);
    }
  } else {
    displayEl.innerHTML = `<p>No Endorsement Yet</p>`;
  }
});

function clearEl() {
  inputEl.value = "";
}

function appendNewEndorsement(item) {
  let newEndorsement = document.createElement("p");
  newEndorsement.textContent = item;

  let loveEmoji = document.createElement("span");

  loveEmoji.innerHTML = "❤";

  loveEmoji.classList.add("love-emoji");

  newEndorsement.append(loveEmoji);

  loveEmoji.addEventListener("click", function () {
    if (loveEmoji.style.color === "red") {
      loveEmoji.style.color = "black";
    } else {
      loveEmoji.style.color = "red";
    }
  });
  displayEl.append(newEndorsement);
}
