import { clientes } from "./clientes.js";
import { produtos } from "./produtos.js";

const inputNameCliente  = document.querySelector('.clients-name-order');
const fieldsOrderScreen = document.querySelectorAll('.field');
let currentProductQttyTyped   = 0;
let currentProductPrice       = 0;
let currentProductQtty        = 0;
let currentProductItem        = 0;
let currentProductDescription = "";
let totalOrderResult          = 0;
let infosCurrentProduct       = [];
let currentProductsEntered    = [];

function searchClient(code) {
    clientes.forEach(cliente => {
        if(cliente.codCliente == code) inputNameCliente.value = cliente.nomeCliente;
    })
}

function searchProduct(code) {
    produtos.forEach(produto => {
        if(produto.codProduto == code) {
            currentProductPrice       = produto.precoProduto;
            currentProductQtty        = produto.qtdEstoqueProd;
            currentProductDescription = produto.descProduto;
            currentProductItem        = produto.codProduto;
            document.querySelector('.description').value = produto.descProduto;
            document.querySelector('.price').value       = `R$ ${produto.precoProduto.toFixed(2)}`;
        }
    })
}

function enterProduct() {
    currentProductQttyTyped = document.querySelector('.quantity').value;

    let fieldsTyped = 1;

    fieldsOrderScreen.forEach(field => {
        if(field.value == '') fieldsTyped = 0;
    })

    if(fieldsTyped === 0) alert("Todos os campos precisam ser preenchidos!");
    else if(currentProductQttyTyped > currentProductQtty) alert("Não há esta quantidade do produto em estoque!");
    else if(currentProductsEntered.indexOf(currentProductItem) !== -1) {
        alert("Produto já adicionado ao pedido!");
        resetFields();
    }
    else {
        document.querySelector('.table-body').appendChild(createRowProduct());
        resetFields();
        const deleteBtnProduct = document.querySelectorAll('.material-symbols-outlined-delete');

        deleteBtnProduct.forEach((e) => {
            e.addEventListener('click', function() {
                deleteProduct(e);
            });
        })
    }
    
}

function createRowProduct() {
    const row            = document.createElement('tr');
    infosCurrentProduct  = [];
    createCellProduct(currentProductItem);
    createCellProduct(currentProductDescription);
    createCellProduct(currentProductPrice, 'monetary-value');
    createCellProduct(currentProductQttyTyped);
    createCellProduct(calcSubTotal(), 'monetary-value');

    createDeleteButton(infosCurrentProduct);

    calcTotalOrder(calcSubTotal());
    infosCurrentProduct.forEach(info => row.appendChild(info));
    currentProductsEntered.push(currentProductItem);

    return row;
}

function createCellProduct(value, className) {
    const cell = document.createElement('td');
    cell.textContent = value;

    if(className !== undefined) {
        cell.classList.add(className);
        cell.textContent = parseFloat(value).toFixed(2);
    }

    infosCurrentProduct.push(cell);
    return cell;
}

function resetFields() {
    fieldsOrderScreen.forEach(field => field.value = '');
}

function calcTotalOrder(value) {
    totalOrderResult += value;
    document.querySelector('.total-order-result').textContent = totalOrderResult.toFixed(2);
}

function createDeleteButton(array) { // Create delete button
    const btn = document.createElement('span');
    btn.textContent = 'delete';
    btn.classList.add('material-symbols-outlined-delete');

    array.push(btn);
}

function deleteProduct(e) { // Remove a product from the order
    const row = e.parentNode;

    row.remove(); // Remove the product from the screen

}

const calcSubTotal = () => currentProductPrice * currentProductQttyTyped;

export { searchClient, searchProduct, enterProduct };
