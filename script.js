"use strict";

// Selecting all our project elements so we can manipulate the DOM and change the UI.
const searchBtn = document.getElementById("search-btn");
const bandName = document.getElementById("band-name");
const cityName = document.getElementById("city");
const priceValue = document.getElementById("price");
const feedback = document.querySelector(".feedback");
const loading = document.querySelector(".loading");
const ticketList = document.querySelector(".tickets-list");
const ticketForm = document.getElementById("tickets-form");

// Setting some bands in order to later put thier pictures to the user.
const bands = [
  "metallica",
  "slipknot",
  "opeth",
  "slayer",
  "jinjer",
  "death",
  "megadeth",
  "ghost",
  "nirvana",
  "anthrax",
  "foo fighters",
  "slaughter to prevail",
  "Amon Amarth",
  "rammstein",
  "ac-dc",
  "black sabbath",
  "children of bodom",
  "disturbed",
  "dream theater",
  "evanescence",
  "iron maiden",
  "lamb of god",
  "linkin park",
  "marilyn manson",
  "pantera",
  "gojira",
];

// Our main class app initialization.
class App {
  constructor() {
    // Calling some of the functions inside of our constructor function of the class in order so that they be called whenever we have children class creation.
    searchBtn.disabled = true;

    // Our main function call when the user hit get to serach for a ticket, we bind the this keyword in order so that it refer to the same class that we are calling it on.
    searchBtn.addEventListener("click", this._loadingResult.bind(this));

    // Calling our inital input fields function.
    this._editInputFields();
  }

  // This function is responsible for checking our input fields, and then it dose some UI changes on it, in case they are empty or filled.
  _cheakInputFields() {
    const allInputs = [bandName, cityName, priceValue];
    allInputs.map((currentFiled) => {
      if (currentFiled.value.trim() === "") {
        currentFiled.classList.remove("complete");
        currentFiled.classList.add("fail");
      }

      if (currentFiled.value.trim() !== "") {
        currentFiled.classList.add("complete");
        currentFiled.classList.remove("fail");
      }
    });

    if (/\d/.test(priceValue.value) === false) {
      priceValue.classList.remove("complete");
      priceValue.classList.add("fail");
    }

    const completeFields = document.querySelectorAll(".complete");
    // If all our inputs are filled and complete we enable the get button
    if (completeFields.length === 3) searchBtn.disabled = false;
    // If not all of them are filled we then disabled.
    if (completeFields.length !== 3) searchBtn.disabled = true;
  }

  // This function will call our checkInputFields function for us on the blur event, but this function editInputFields will be called in the constructor function.
  _editInputFields() {
    const allInputs = [bandName, cityName, priceValue];
    allInputs.map((currentFiled) =>
      currentFiled.addEventListener("blur", this._cheakInputFields)
    );
  }

  // This function is very simple, it gonna show some loading phrase for us as well as s loading spinner for 4 seconds, then it will call the add newTicket function for us, This function the loadingResult will also be called for us inside the constructor function.
  _loadingResult(e) {
    e.preventDefault();

    feedback.classList.add("showItem", "alert", "alert-success");

    loading.classList.add("showItem");

    const theApp = this;

    setTimeout(function () {
      feedback.classList.remove("showItem", "alert", "alert-success");

      loading.classList.remove("showItem");

      // Calling the addNewTicket function.
      theApp._addNewTicket();
    }, 4000);
  }

  // Our main addNewTicket function that will add a new ticket for us on the UI after the user decied to get a new ticket.
  _addNewTicket() {
    // Making the name of the image flexible and dynamic in order to show different pictures.
    const testImg = bands.includes(bandName.value) ? bandName.value : "metal";

    const div = document.createElement("div");

    div.classList.add("col-11", "mx-auto", "col-md-6", "my-3", "col-lg-4");

    div.innerHTML = `<div class="card text-left">
       <img src="./img/${testImg}.jpg" class="card-img-top" alt="">
       <div class="card-body">
        <!-- customer name -->
        <h6 class="text-capitalize "><span class="badge badge-warning mr-2">Band Name :</span><span class="customer-name">${bandName.value}</span></h6>
        <!-- end of customer name -->
        <!-- customer name -->
        <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">City :</span><span class="customer-course">
          ${cityName.value}
         </span></h6>
        <!-- end of customer name -->
        <!-- customer name -->
        <h6 class="text-capitalize"><span class="badge badge-danger mr-2">Price :</span><span class="course-author">${priceValue.value}$</span></h6>
        <!-- end of customer name -->
       </div>
      </div>`;

    ticketList.appendChild(div);

    this._clearInputs();
  }

  // This function is responsible of cleaning all the inputs, remove the complete class and disable the button again after the user gets an new ticket, it will be called for us inside of addNewTicket function.
  _clearInputs() {
    const allInputs = [bandName, cityName, priceValue];
    allInputs.map((currentFiled) => {
      currentFiled.value = "";

      currentFiled.classList.remove("complete");

      searchBtn.disabled = true;
    });
  }
}

// Our main class creation to make the whole thing work and called out!
const createApp = new App();
