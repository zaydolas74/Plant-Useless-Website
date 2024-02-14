let fruits = document.querySelectorAll('button');
let seed = document.querySelector('#seed');
let bloemPot = document.querySelector('#bloemPot');

fruits.forEach(fruit => {
    fruit.addEventListener('click', (e) => {
        if(e.target.innerText != '') {
            seed.innerText = e.target.innerText;
        }
    });
});

const onMouseMove = (e) => {
    seed.style.left = e.pageX-22 + 'px';
    seed.style.top = e.pageY-20 + 'px';
    seed.style.cursor = 'pointer';
}

document.addEventListener('mousemove', onMouseMove);


function seedAnimation() {
    //breng de seed naar het midden
    seed.style.left = '50%';
    seed.style.top = '50%';
    seed.style.transform = 'translate(-50%, -50%)';
}

bloemPot.addEventListener('click', () => {
    
});