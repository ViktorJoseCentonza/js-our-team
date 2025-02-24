const teamMembers = [
  {
    name: "Marco Bianchi",
    role: "Designer",
    email: "marcobianchi@team.com",
    img: "./assets/img/male1.png"
  },
  {
    name: "Laura Rossi",
    role: "Front-end Developer",
    email: "laurarossi@team.com",
    img: "./assets/img/female1.png"
  },
  {
    name: "Giorgio Verdi",
    role: "Back-end Developer",
    email: "giorgioverdi@team.com",
    img: "./assets/img/male2.png"
  },
  {
    name: "Marta Ipsum",
    role: "SEO Specialist",
    email: "martarossi@team.com",
    img: "./assets/img/female2.png"
  },
  {
    name: "Roberto Lorem",
    role: "SEO Specialist",
    email: "robertolorem@team.com",
    img: "./assets/img/male3.png"
  },
  {
    name: "Daniela Amet",
    role: "Analyst",
    email: "danielaamet@team.com",
    img: "./assets/img/female3.png"
  }
];


const cardsEl = document.querySelector(`#cards .row`)

console.log(cardsEl);


for (let i = 0; i < teamMembers.length; i++) {

  cardsEl.innerHTML += `<div class="card d-flex">
                    <div class="img-container">
                        <img src="${teamMembers[i].img}" alt="">
                    </div>
                    <div class="card-content d-flex">
                        <h2>${teamMembers[i].name}</h2>
                        <p>${teamMembers[i].role}</p>
                        <a href="#">${teamMembers[i].email}</a>
                    </div>

                </div>`

}
