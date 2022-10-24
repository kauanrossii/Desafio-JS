import { clientes } from "./clientes.js";
import { produtos } from "./produtos.js";


const inputNameClient = document.querySelector('.clients-name-order');
const inputDescriptionProduct = document.querySelector('.description');
const inputPriceProduct = document.querySelector('.price');
const inputQtyProduct = document.querySelector('.quantity');
const inputCodeProduct = document.querySelector('.code');
const totalOrderResult = document.querySelector('.total-order-result');
let totalOrder = 0;
let ordersActive = [];

const fields = document.querySelectorAll('.field');

function searchClient(code) {
    clientes.forEach((cliente) => {
        if (cliente.codCliente == code) {
            inputNameClient.value = cliente.nomeCliente;
        }
    })
}

let quantityProductsEstoque = 0;

function searchProduct(code) {


    produtos.forEach((produto) => {
        if (produto.codProduto == code) {
            inputDescriptionProduct.value = produto.descProduto;
            inputPriceProduct.value = produto.precoProduto;
            quantityProductsEstoque = produto.qtdEstoqueProd;
        }
    })
}

function enterProduct() {
    if (Number(inputQtyProduct.value) > quantityProductsEstoque) alert("Não há esta quantidade de produto no estoque!");

    else {

        createInfo();

        resetFields();
    }
}

function changeTotalOrder(value) {
    totalOrder += value;
    let valueFormated = formatPrices(totalOrder);
    totalOrderResult.textContent = valueFormated;
}

function createSpan(value, label, code) {
    const span = document.createElement('span');
    span.textContent = value;

    label.appendChild(span);

    span.classList.add(`code-${code}`);


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
let controller = 1;

function createInfo() {
    const code = inputCodeProduct.value;

    produtos.forEach((product) => {

        if (product.codProduto == code) {

            const price = formatPrices(product.precoProduto);
            const item = product.codProduto;
            const description = product.descProduto;
            const quantity = inputQtyProduct.value;
            const subTotal = Number(quantity) * product.precoProduto;
            const subTotalFormatado = formatPrices(subTotal);

            product.qtdEstoqueProd -= quantity;

            if (ordersActive.indexOf(item) !== -1) {
                alert("O item já foi adicionado ao pedido!");
            } else {
                ordersActive.push(item);

                createSpan(price, prices, item);
                createSpan(item, items, item);
                createSpan(description, descriptions, item);
                createSpan(quantity, quantities, item);
                createDiv(subTotalFormatado, subTotalBoard, item);

                changeTotalOrder(subTotal);

                const deleteBtnProduct = document.querySelectorAll('.material-symbols-outlined-delete');

                controller++;

                deleteBtnProduct.forEach((e) => {
                    e.addEventListener('click', function() {
                        deleteProduct(e);
                    });
                })

            }

        }
    })
}

function createDiv(value, label, code) {
    const div = document.createElement('div');
    div.classList.add('subtotal-order');
    const span = document.createElement('span');
    span.textContent = value;
    
    const icon = document.createElement('span');
    icon.textContent = 'delete';
    icon.classList.add('material-symbols-outlined-delete');
    
    div.appendChild(span);
    
    icon.classList.add(`code-${code}`);
    div.classList.add(`code-${code}`);
    div.appendChild(icon);
    label.appendChild(div);

}

function formatPrices(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
};

function Order(item) {
    this.item = item;
}

function deleteProduct(e) {
    const elemento = e;
    const classes = elemento.classList;
    classes.forEach((classe) => {
        
        const elementos = document.querySelectorAll(`.${classe}`);
        console.log(elementos);

        elementos.forEach((e) => {
            e.remove();
        })
        
        if(ordersActive.indexOf(classe) !== -1) {
            ordersActive.splice(ordersActive.indexOf(classe), 1);
        }
    })

    
}

export { searchClient, searchProduct, enterProduct, deleteProduct };