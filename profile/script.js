const circle = document.querySelector('.header .navbar .navlist .circle');
const mobile_menu=document.querySelector('.header .navbar .navlist ul');
const header=document.querySelector('.header.container');

circle.addEventListener('click', () => {
    circle.classList.toggle('active');
    mobile_menu.classList.toggle('active');
})
document.addEventListener('scroll',() => {
    var position=window.scrollY;
    if (position >150){
        header.style.backgroundColor='#29323c';
    }
    else{
        header.style.backgroundColor='transparent';
    }
})