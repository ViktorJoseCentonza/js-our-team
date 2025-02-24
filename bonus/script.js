const teamMembers = [
  {
    name: "Marco Bianchi",
    role: "Designer",
    email: "marcobianchi@team.com",
    img: "./img/male1.png"
  },
  {
    name: "Laura Rossi",
    role: "Front-end Developer",
    email: "laurarossi@team.com",
    img: "./img/female1.png"
  },
  {
    name: "Giorgio Verdi",
    role: "Back-end Developer",
    email: "giorgioverdi@team.com",
    img: "./img/male2.png"
  },
  {
    name: "Marta Ipsum",
    role: "SEO Specialist",
    email: "martarossi@team.com",
    img: "./img/female2.png"
  },
  {
    name: "Roberto Lorem",
    role: "SEO Specialist",
    email: "robertolorem@team.com",
    img: "./img/male3.png"
  },
  {
    name: "Daniela Amet",
    role: "Analyst",
    email: "danielaamet@team.com",
    img: "./img/female3.png"
  }
];


const cardsEl = document.querySelector(`#cards .row`)
const formEl = document.querySelector('form')

window.onload = loadTeamMembers; // Load data when the page loads
renderTeamMembers()

formEl.addEventListener("submit", async function (e) {
  e.preventDefault();

  const img = document.querySelector('input[id="img"]').value;
  const name = document.querySelector('input[id="name"]').value;
  const role = document.querySelector('input[id="role"]').value;
  const email = document.querySelector('input[id="email"]').value;

  const newMember = { name, role, email, img };

  teamMembers.push(newMember); // Add to memory
  await addTeamMember(newMember); // Add to IndexedDB
  renderTeamMembers()
});

//functions

function renderTeamMembers() {
  cardsEl.innerHTML = ''
  for (let i = 0; i < teamMembers.length; i++) {

    cardsEl.innerHTML += `<div class="card d-flex">
                      <div class="img-container">
                          <img src="${teamMembers[i].img}" alt="">
                      </div>
                      <div class="card-content d-flex">
                          <h3>${teamMembers[i].name}</h3>
                          <p>${teamMembers[i].role}</p>
                          <a href="#">${teamMembers[i].email}</a>
                      </div>
                  </div>`
  }
}

function removeMember(email) {
  deleteTeamMember(email); // Delete from IndexedDB
  teamMembers = teamMembers.filter(member => member.email !== email); // Remove from memory
  console.log("Member removed:", email);
}



//#region db section
const dbName = "TeamDB";
const storeName = "teamMembers";

function openDB() {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "email" }); // Use email as a unique key
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject("Error opening database:", event.target.error);
    };
  });
}


async function addTeamMember(member) {
  let db = await openDB();
  let transaction = db.transaction(storeName, "readwrite");
  let store = transaction.objectStore(storeName);

  let request = store.add(member);

  request.onsuccess = function () {
    console.log("Team member added to DB:", member);
  };

  request.onerror = function (event) {
    console.log("Error adding member:", event.target.error);
  };
}

async function loadTeamMembers() {
  let db = await openDB();
  let transaction = db.transaction(storeName, "readonly");
  let store = transaction.objectStore(storeName);
  let request = store.getAll();

  request.onsuccess = function () {
    if (request.result.length > 0) {
      teamMembers.push(...request.result);
      console.log("Team members loaded from DB:", teamMembers);
      renderTeamMembers()
    }
  };
}



async function deleteTeamMember(email) {
  let db = await openDB();
  let transaction = db.transaction(storeName, "readwrite");
  let store = transaction.objectStore(storeName);

  let request = store.delete(email);

  request.onsuccess = function () {
    console.log("Team member deleted:", email);
    teamMembers = teamMembers.filter(member => member.email !== email);
  };
}


//#endregion db section
