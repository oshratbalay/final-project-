
// add all the inputs to dom

let card_number_input = document.querySelector('.card-number-input');
let card_number_box = document.querySelector('.card-number-box');
card_number_input.addEventListener('input',function () {
    card_number_box.innerHTML = card_number_input.value;
})

let card_holder_input = document.querySelector('.card-holder-input');
let card_holder_name = document.querySelector('.card-holder-name');
card_holder_input.addEventListener('input',function () {
    card_holder_name.innerHTML = card_holder_input.value;
})

let month_input = document.querySelector('.month-input');
let exp_month = document.querySelector('.exp-month');
month_input.addEventListener('input',function () {
    exp_month.innerHTML = month_input.value;
})

let year_input = document.querySelector('.year-input');
let exp_year = document.querySelector('.exp-year');
year_input.addEventListener('input',function () {
    exp_year.innerHTML = year_input.value;
})

let front = document.querySelector('.front')
let back = document.querySelector('.back')
let cvv_input = document.querySelector('.cvv-input');
let cvv_box = document.querySelector('.cvv-box');

cvv_input.addEventListener('mouseenter',function () {
    front.style.transform = 'perspective(1000px) rotateY(-180deg);'
    back.style.transform = 'perspective(1000px) rotateY(0deg)';

})

cvv_input.addEventListener('mouseleave',function () {
    front.style.transform = 'perspective(1000px) rotateY(0deg);'
    back.style.transform = 'perspective(1000px) rotateY(180deg)';

})

cvv_input.addEventListener('input',function () {
  

    cvv_box.innerHTML = cvv_input.value;
})

let nav = document.querySelector('.navbar');
window.addEventListener('scroll',function(){
nav.classList.toggle('shadow' , window.scrollY > 0 )
})