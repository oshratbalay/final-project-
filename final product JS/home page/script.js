// DOM // 
let theater = document.querySelector('.our-theater');
let book_now_btn = document.querySelectorAll('.book-now-btn');
let screened_today_container = document.querySelector('.screened-today-container')


// scroll event //
let nav = document.querySelector('.navbar');
window.addEventListener('scroll',function(){
nav.classList.toggle('shadow' , window.scrollY > 0 )
})
 

// Links to the payment page //
book_now_btn.forEach(btn => {
btn.addEventListener('click',function(){
    window.open("/book now/index.html");
 
})    
});


