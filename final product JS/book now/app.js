// DOM
let container = document.querySelector(".container");
let seats = document.querySelectorAll(".row .seat:not(.occupied)");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let movieSelect = document.querySelector("#movie");

populateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function upDateSelecteCunt() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  let seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerHTML = selectedSeatsCount;
  total.innerHTML = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach( (item, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        item.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex != null){
    movieSelect.selectedIndex = selectedMovieIndex
  }
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  upDateSelecteCunt();
});

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  upDateSelecteCunt();
});
upDateSelecteCunt();
