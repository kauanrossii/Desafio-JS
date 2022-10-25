import { changeClient, resetClient, newClient, saveClient } from "./clientes.js";
import { changeProduct, resetProduct, newProduct, saveProduct} from "./produtos.js"
import { searchClient, searchProduct, enterProduct, deleteProduct } from "./pedidos.js";

const items = document.querySelectorAll('.item');
const closeBtns = document.querySelectorAll('.close-btn');
const navBtns = document.querySelectorAll('.nav-btn');
const codeInput = document.querySelectorAll('.code-input');
const changeBtns = document.querySelectorAll('.change-btn');

let clientCode = 1;
let productCode = 1;
let pressedNewClient = 0;
let pressedNewProduct = 0;

export { clientCode, productCode };

items.forEach(function (e) {
    e.addEventListener('click', () => {

        closeSection();

        if (e.classList.contains('clients')) {
            openSection('clients');
            // resetFieldsClients();
        }
        if (e.classList.contains('products')) {
            openSection('products');
            // resetFieldsProducts();
        }

        if (e.classList.contains('orders')) {
            openSection('orders');
            // resetAllFields();
        }

    })
})

function openSection(nameContainer) {
    const section = document.querySelector(`.${nameContainer}-container`);

    resetClient();
    resetProduct();

    for (let i of codeInput) {
        i.value = 1;
    }

    section.classList.add('active');
}

function closeSection() {
    const section = document.querySelector('.active');
    if (section !== null) section.classList.remove('active');
}

closeBtns.forEach(function (e) {
    e.addEventListener('click', () => {
        closeSection();
    })
})

// console.log(navBtns);

navBtns.forEach(function (e) {
    e.addEventListener('click', () => {
        
        if (e.classList.contains('next-client')) changeClient(1);

        if(e.classList.contains('prev-client')) changeClient(-1);

        if(e.classList.contains('next-product')) changeProduct(1);

        if(e.classList.contains('prev-product')) changeProduct(-1);
    })
})

changeBtns.forEach(function(e) {
    e.addEventListener('click', () => {
        if(e.classList.contains('new-client')) {
            newClient();
            pressedNewClient = 1;
        }

        if(e.classList.contains('save-client') && pressedNewClient == 1) {
            saveClient();
            pressedNewClient = 0;
        }

        if(e.classList.contains('new-product')) {
            newProduct();
            pressedNewProduct = 1;
        }

        if(e.classList.contains('save-product')) {
            saveProduct();
            pressedNewProduct = 0;
        }
    })
})

const inputCodeClient = document.querySelector('.clients-code-order');
const inputCodeProduct = document.querySelector('.code');
const btnEnterProduct = document.querySelector('.enter-product');

inputCodeClient.addEventListener('focusout', function() {
    searchClient(inputCodeClient.value);
})

inputCodeProduct.addEventListener('focusout', function () {
    searchProduct(inputCodeProduct.value);
})

btnEnterProduct.addEventListener('click', () => {
    enterProduct()

})


const deleteBtnProduct = document.querySelectorAll('.material-symbols-outlined-delete');

deleteBtnProduct.forEach((e) => {
    e.addEventListener('click', function(e) {
        console.log('oi');
    });
})