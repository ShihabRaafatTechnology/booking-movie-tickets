// Query Selector
const cinema = document.querySelector(".cinema");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelected = document.getElementById("movies");

// Show Movie in Screen Cinema
const screen = document.querySelector(".screen");
const movieArr = ["../img/forrest-gump-running.gif","../img/EarlyWindingAmbushbug-size_restricted.gif","../img/source.gif","../img/bb86ebca0cad25cf298da526fb2f2814.gif"];

// Total Price To Selected Seats
let totalPrice = JSON.parse(movieSelected.value);

// Update Selected Seats Function
function updateSelectedSeat(){
    const selectedSeat = document.querySelectorAll(".row .seat.selected");
    const selectedCountSeat = selectedSeat.length;
    count.innerText = selectedCountSeat;
    total.innerText = selectedCountSeat * totalPrice;
}

// When Select Movie Change Screen Show
movieSelected.addEventListener("change", e =>{
    const options = movieSelected.options;
    screen.style.backgroundImage = `url("${movieArr[options.selectedIndex]}")`;
    updateSelectedSeat();
})

// Event Change Select Movie
movieSelected.addEventListener("change", e =>{
    totalPrice = JSON.parse(e.target.value);
    updateSelectedSeat();
});

// Event Select Seats
cinema.addEventListener("click", e =>{
   const classList = e.target.classList;
   if(classList.contains("seat") && !classList.contains("occupied")){
        classList.toggle("selected");
        updateSelectedSeat();
   }
});