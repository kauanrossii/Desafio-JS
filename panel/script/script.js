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

let section = document.querySelector('.options-container');

function removeChilds() {
    for(let i of childsMain) {
        i.style.display = 'none';
    }
}

function openSection(containerName) {
    section = document.querySelector(`.${containerName}-container`);
    section.style.display = 'flex';
}



import { clientes } from "./clientes.js";

const clientsCodeInput = document.querySelector('#clients-code');
let clientsCodeValue = 0;
const btnsNav = section.querySelectorAll('.nav-btn');

clientsCodeInput.addEventListener('focusout', (e) => {
    clientsCodeValue = Number(clientsCodeInput.value);

    printDataClients(clientsCodeValue);
    
})

btnsNav.forEach(function(e) {
    e.addEventListener('click', () => {
        if(e.classList.contains('prev-btn') && clientsCodeValue > 1) {
            clientsCodeValue--;
        } else if(e.classList.contains('next-btn') && clientsCodeValue < clientes.length){
            clientsCodeValue++;
        }
        clientsCodeInput.value = clientsCodeValue;
        printDataClients(clientsCodeValue);
    })
})

console.log(btnsNav);

function printDataClients(codeTyped) {
    for(let code of clientes) {
        if(code.codCliente === codeTyped) {
            document.querySelector('#clients-name').value = code.nomeCliente;
            document.querySelector('#date-signup').value = code.dataCadCli;
        }
    }
}
