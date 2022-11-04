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
    let clientFound = false;
    clientes.forEach(cliente => {
        if(cliente.codCliente == code) {
            inputNameCliente.value = cliente.nomeCliente;
            clientFound = true;
        }
    })

    if(clientFound == false) { 
        alert("Cliente não encontrado!");
        resetFields();
    }
}

function searchProduct(code) {
    let productFound = false;
    produtos.forEach(produto => {
        if(produto.codProduto == code) {
            currentProductPrice       = produto.precoProduto;
            currentProductQtty        = produto.qtdEstoqueProd;
            currentProductDescription = produto.descProduto;
            currentProductItem        = produto.codProduto;
            document.querySelector('.description').value = produto.descProduto;
            document.querySelector('.price').value       = `R$ ${produto.precoProduto.toFixed(2)}`;
            productFound = true;
        }
    })

    if(productFound == false) {
        alert("Produto não encontrado!");
        resetFields();
    }
}

function enterProduct() { // Check all the validations and 
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
    }
    
}

function createRowProduct() {  // Create a new row of product on order board
    const row            = document.createElement('tr');
    infosCurrentProduct  = [];
    createCellProduct(currentProductItem);
    createCellProduct(currentProductDescription);
    createCellProduct(currentProductPrice, 'monetary-value');
    createCellProduct(currentProductQttyTyped);
    createCellProduct(calcSubTotal(), 'monetary-value');

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

const calcSubTotal = () => currentProductPrice * currentProductQttyTyped;

export { searchClient, searchProduct, enterProduct };
