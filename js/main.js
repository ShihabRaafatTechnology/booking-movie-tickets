// Query Selector
const show = document.querySelector(".show");
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
    // To Store Data In Local Storage
    const selectedSeatArr = [...selectedSeat];
    const seatIndex = selectedSeatArr.map(seat=> [...seats].indexOf(seat));
    localStorage.setItem("SeatsSelected", JSON.stringify(seatIndex));
}
// Set Data Movie Selected(index,price)
function setMovieData(indexMovie,priceMovie){
    localStorage.setItem("indexMovieSelected", JSON.parse(indexMovie));
    localStorage.setItem("priceMovieSelected", JSON.parse(priceMovie));
}

// Get Data From Movie Selected
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("SeatsSelected"));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1) return seat.classList.add("selected");
        });
    }
    // Initial Movie Selected
    const indexMovieSelected = JSON.parse(localStorage.getItem("indexMovieSelected"));
    movieSelected.options.selectedIndex = indexMovieSelected;
    // Initial Screen Movie
    const movieShow = JSON.parse(localStorage.getItem("show"));
    screen.style.backgroundImage = `url("${movieArr[movieShow]}")`;

}
populateUI();

// Initial Count And Total Set
updateSelectedSeat();

// Set Data Screen Movie
function screenShow(indexScreen){
    localStorage.setItem("show",JSON.parse(indexScreen));
}

// When Select Movie Change Screen Show
movieSelected.addEventListener("change", e =>{
    const options = movieSelected.options;
    screen.style.backgroundImage = `url("${movieArr[options.selectedIndex]}")`;
    screenShow(options.selectedIndex);
    updateSelectedSeat();
});

// Event Change Select Movie
movieSelected.addEventListener("change", e =>{
    const priceMovieSelected = e.target.value;
    const indexMovieSelected = e.target.selectedIndex;
    console.log(indexMovieSelected,priceMovieSelected);
    totalPrice = JSON.parse(priceMovieSelected);
    setMovieData(indexMovieSelected,priceMovieSelected)
    updateSelectedSeat();
});

// Event Select Seats
show.addEventListener("click", e =>{
   const classList = e.target.classList;
   if(classList.contains("seat") && !classList.contains("occupied")){
        classList.toggle("selected");
        updateSelectedSeat();
   }
});
