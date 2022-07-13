// api key movie

let API_KEY = "?api_key=698c26f192e68da611452c5592599ea2";
let image_path = "https://image.tmdb.org/t/p/w500";

// DOM //
let trending_container = document.querySelector(".trending-container");
let kids_container = document.querySelector(".kids-container");
let popular_container = document.querySelector(".popular-container");
let popup_container = document.querySelector(".popup-container");
let favorite_container = document.querySelector(".favorite-container");
let screened_today_container = document.querySelector(
  ".screened-today-container"
);
let input = document.querySelector("input");

// scroll event //
let nav = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  nav.classList.toggle("shadow", window.scrollY > 0);
});


// event click to show the movie info
function add_click_effect_to_box(boxs) {
  boxs.forEach((box) => {
    box.addEventListener("click", () => show_popup(box));
  });
}

// api for trending movie
async function get_trending_movie() {
  const resp = await fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=698c26f192e68da611452c5592599ea2"
  );
  const respData = await resp.json();
  let data = respData.results;

  // add trending api to DOM
  function add_trening_to_dom(obj) {
    trending_container.innerHTML = "";

    obj.forEach((e) => {
      trending_container.innerHTML += ` 
<div class="box" data-id=${e.id}>
    <div class="img">
        <img src="${image_path + e.poster_path}" alt="">
        

    </div>
    

`;
    });
  }

  add_trening_to_dom(data);

  // filter input //
  function filter(input) {
    let filterData = data.filter(function (obj) {
      return obj.title.toLowerCase().includes(input);
    });

    add_trening_to_dom(filterData);
  }

  input.addEventListener("input", function () {
    let inputValue;
    filter(input.value);
  });

  let boxs = document.querySelectorAll(".box");
  add_click_effect_to_box(boxs);
}
// call to function //
get_trending_movie();


// api for kids movie
async function get_kids_movie() {
  const resp = await fetch(
    "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=698c26f192e68da611452c5592599ea2"
  );
  const respData = await resp.json();
  let data = respData.results;

    // add kids api to DOM

  function add_kids_to_dom(obj) {
    kids_container.innerHTML = "";

    obj.forEach((e) => {
      kids_container.innerHTML += ` 
<div class="box" data-id=${e.id}>
    <div class="img">
        <img src="${image_path + e.poster_path}" alt="">
       

    </div>
    

`;
    });
  }

  add_kids_to_dom(data);

  // input filter

  function filter(input) {
    let filterData = data.filter(function (obj) {
      return obj.title.toLowerCase().includes(input);
    });

    add_kids_to_dom(filterData);
  }

  input.addEventListener("input", function () {
    let inputValue;
    let boxs = document.querySelectorAll(".box");
    add_click_effect_to_box(boxs);
    filter(input.value);
  });

  let boxs = document.querySelectorAll(".box");
  add_click_effect_to_box(boxs);
}
// call to function
get_kids_movie();


// api top rate movie
async function get_drama_movie() {
  const resp = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=698c26f192e68da611452c5592599ea2&language=en-US&page=1"
  );
  const respData = await resp.json();
  let data = respData.results;

  // add to dom api top rate movie
  function add_drama_to_dom(obj) {
    popular_container.innerHTML = "";

    obj.forEach((e) => {
      popular_container.innerHTML += ` 
<div class="box" data-id=${e.id}>
    <div class="img">
        <img src="${image_path + e.poster_path}" alt="">

    </div>
    

`;
    });
  }

  add_drama_to_dom(data);

  // filter input
  function filter(input) {
    let filterData = data.filter(function (obj) {
      return obj.title.toLowerCase().includes(input);
    });

    add_drama_to_dom(filterData);
  }

  input.addEventListener("input", function () {
    let inputValue;
    add_click_effect_to_box(boxs);
    filter(input.value);
  });

  let boxs = document.querySelectorAll(".box");
  add_click_effect_to_box(boxs);
}
//  call function
get_drama_movie();


// get api for home page
get_screened_movie();
async function get_screened_movie() {
  const resp = await fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=698c26f192e68da611452c5592599ea2"
  );
  const respData = await resp.json();
  return respData.results;
}

// add to dom api for home page
add_screened_to_dom();
async function add_screened_to_dom() {
  const data = await get_screened_movie();
  console.log(data);

  data.splice(5, 5).forEach((e) => {
    screened_today_container.innerHTML += ` 
<div class="box" data-id=${e.id}>
    <div class="img">
        <img src="${image_path + e.poster_path}" alt="">
    </div>
    

`;
  });
  let boxs = document.querySelectorAll(".box");
  add_click_effect_to_box(boxs);
}


// get movie by id
async function get_movie_by_id(id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=698c26f192e68da611452c5592599ea2`
  );
  const respData = await resp.json();
  return respData;
}

// get trailer by id
async function get_trailer_by_id(id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=698c26f192e68da611452c5592599ea2`
  );
  const respData = await resp.json();
  return respData.results[0].key;
}


// show movie info on click
async function show_popup(box) {
  popup_container.classList.add("show-popup");

  const movie_id = box.getAttribute("data-id");
  const movie = await get_movie_by_id(movie_id);
  const movie_trailer = await get_trailer_by_id(movie_id);

  popup_container.style.background = `transparent`;
  console.log(movie.title);
  popup_container.innerHTML = `
  <span class="x-icon">&#10006;</span>
  <div class="content">
      <div class="right">
          
          <div class="single-info-container">
              <div class="single-info">
                  <span>Language:</span>
                  <span class='bottom'>${movie.spoken_languages[0].name}</span>
              </div>
              <div class="single-info">
                  <span>Length:</span>
                  <span class='bottom'>${movie.runtime} minutes</span>
              </div>
              <div class="single-info">
                  <span>Rate:</span>
                  <span class='bottom'>${movie.vote_average} / 10</span>
              </div>
              <div class="single-info">
                  <span>Budget:</span>
                  <span class='bottom'>$ ${movie.budget}</span>
              </div>
              <div class="single-info">
                  <span >Release Date:</span>
                  <span class='bottom'>${movie.release_date}</span>
              </div>
          </div>
          <div class="genres">
              <ul>
                  ${movie.genres.map(e => `<li>${e.name}</li>`).join('')}
              </ul>
          </div>
          <div class="overview">
              <h2>Overview</h2>
              <p>${movie.overview}</p>
          </div>
          <div class="trailer">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${movie_trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          
      </div><div class="left">
          <div class="poster-img">
              <img src="${image_path + movie.poster_path}" alt="">
          </div>
          <div class="single-info">
          <h1>${movie.title}</h1>
              <span>Add to favorites</span>
              <span class="heart-icon">&#9829;</span>
          </div>
      </div>
      
  </div>
    `;

    // event for get out from the show movie info
  const x_icon = document.querySelector(".x-icon");
  x_icon.addEventListener("click", () =>
    popup_container.classList.remove("show-popup")
  );

  // favorite event
  const heart_icon = popup_container.querySelector(".heart-icon");

  const movie_ids = get_LS();
  for (let i = 0; i <= movie_ids.length; i++) {
    if (movie_ids[i] == movie_id) heart_icon.classList.add("change-color");
  }

  heart_icon.addEventListener("click", () => {
    if (heart_icon.classList.contains("change-color")) {
      remove_LS(movie_id);
      heart_icon.classList.remove("change-color");
    } else {
      add_to_LS(movie_id);
      heart_icon.classList.add("change-color");
    }
    fetch_favorite_movies();
  });
}

// Local Storage for favorite movie
function get_LS() {
  const movie_ids = JSON.parse(localStorage.getItem("movie-id"));
  return movie_ids === null ? [] : movie_ids;
}
// add to localStorage
function add_to_LS(id) {
  const movie_ids = get_LS();
  localStorage.setItem("movie-id", JSON.stringify([...movie_ids, id]));
}
// remove to localStorage

function remove_LS(id) {
  const movie_ids = get_LS();
  localStorage.setItem(
    "movie-id",
    JSON.stringify(movie_ids.filter((e) => e !== id))
  );
}

// Favorite Movies
fetch_favorite_movies();
async function fetch_favorite_movies() {
  favorite_container.innerHTML = "";
  const movies_LS = await get_LS();
  const movies = [];
  for (let i = 0; i <= movies_LS.length - 1; i++) {
    const movie_id = movies_LS[i];
    let movie = await get_movie_by_id(movie_id);
    add_favorites_to_dom_from_LS(movie);
    movies.push(movie);
  }
}

// add favorite movie to favorite page
function add_favorites_to_dom_from_LS(movie_data) {
  favorite_container.innerHTML += `
      <div class="box" data-id="${movie_data.id}">
          <div class="img">
              <img src="${image_path + movie_data.poster_path}">
          </div>
         
      </div>
  `;

  const boxs = document.querySelectorAll(".box");
  add_click_effect_to_box(boxs);
}


