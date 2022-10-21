import { clientes } from "./clientes.js";
import { produtos } from "./produtos.js";


const inputNameClient = document.querySelector('.clients-name-order');
const inputDescriptionProduct = document.querySelector('.description');
const inputPriceProduct = document.querySelector('.price');
const inputQtyProduct = document.querySelector('.quantity');
const inputCodeProduct = document.querySelector('.code');

const fields = document.querySelectorAll('.field');

function searchClient(code) {
    clientes.forEach((cliente) => {
        if(cliente.codCliente == code) {
            inputNameClient.value = cliente.nomeCliente;
        }
    })
}

let quantityProductsEstoque = 0;

function searchProduct(code) {
    
    
    produtos.forEach((produto) => {
        if(produto.codProduto == code) {
            inputDescriptionProduct.value = produto.descProduto;
            inputPriceProduct.value = produto.precoProduto;
            quantityProductsEstoque = produto.qtdEstoqueProd;
        }
    })
}

function enterProduct() {
    if(Number(inputQtyProduct.value) > quantityProductsEstoque) alert("Não há esta quantidade de produto no estoque!");
    else {
        createItem(inputCodeProduct.value);
        createDescription(inputDescriptionProduct.value);
        createPrice(inputPriceProduct.value);
        createQuantity(inputQtyProduct.value);
        createSubTotal(Number(inputQtyProduct.value) * Number(inputPriceProduct.value));
        resetFields();
    }
}

function createSpan() {
    const span = document.createElement('span');
    return span
}

function resetFields() {
    fields.forEach((e) => {
        e.value = '';
    })
}

const items = document.querySelector('.items');
const descriptions = document.querySelector('.descriptions');
const prices = document.querySelector('.prices');
const quantities = document.querySelector('.quantities');
const subTotalBoard = document.querySelector('.subtotal');

function createItem(value) {
    const item = createSpan();
    item.textContent = value;
    items.appendChild(item);
}


function createDescription(value) {
    const description = createSpan();
    description.textContent = value;
    descriptions.appendChild(description);
}

function createPrice(value) {
    const price = createSpan();
    price.textContent = value;
    prices.appendChild(price);
}

function createQuantity(value) {
    const quantity = createSpan();
    quantity.textContent = value;
    quantities.appendChild(quantity);
}

function createSubTotal(value) {
    const subtotal = createSpan();
    subtotal.textContent = value;
    subTotalBoard.appendChild(subtotal);
}
export {searchClient, searchProduct, enterProduct };