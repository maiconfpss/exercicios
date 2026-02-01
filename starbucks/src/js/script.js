const mobileBtn = document.querySelector('.btn-mobile');

mobileBtn.addEventListener('click', () => {

    const navLinks = document.querySelector('#nav-links');
    navLinks.classList.toggle('show');

    const icon = document.querySelector('.btn-mobile i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');

})

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');

    if (window.scrollY > 0) {
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

})