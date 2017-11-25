function logoAnimate() {
    const logo = document.querySelector('[data-js="logo"]');
    logo.addEventListener('mouseenter', function (e) {
        e.target.classList.add('animate');
    });
}

window.onload = function () {
    logoAnimate();
};
