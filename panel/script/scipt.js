const items = document.querySelectorAll('.item');
const main = document.querySelector('main');
const closeBtn = document.querySelectorAll('.close-btn');
const childsMain = main.children;

items.forEach(function (e) {
    e.addEventListener('click', function () {
        
        removeChilds();

        if (e.classList.contains('clients')) {
            openSection('clients');
        }

        if (e.classList.contains('products')) {
            openSection('products');
        }

        if (e.classList.contains('orders')) {
            openSection('orders')
        }

    })

})

closeBtn.forEach(function(e) {
    e.addEventListener('click', removeChilds);
})

function removeChilds() {
    for(let i of childsMain) {
        i.style.display = 'none';
    }
}

function openSection(containerName) {
    const section = document.querySelector(`.${containerName}-container`);
    section.style.display = 'flex';
}