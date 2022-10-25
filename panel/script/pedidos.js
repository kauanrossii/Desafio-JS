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

    let fieldsTyped = 1;
    let pedidoXEstoque = Number(inputQtyProduct.value) > quantityProductsEstoque;

    fields.forEach((e) => {
        if(e.value == '') {
            fieldsTyped = 0;
        }
    })

    if(fieldsTyped === 0) alert("Todos os campos precisam ser digitados!");
    else if (pedidoXEstoque) alert("Não há esta quantidade de produto no estoque!");
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

function createTableRow() {
    const tr = document.createElement('tr');
    return tr;
}

function createTableData(value, parent, nameClass, secondClass) {
    const td = document.createElement('td');
    td.textContent = value;

    if(nameClass !== undefined) {
        td.classList.add(`${nameClass}`)
    } else if(nameClass !== undefined && secondClass !== undefined) {
        td.classList.add(`${nameClass}`);
        td.classList.add(`${secondClass}`);
    }

    parent.appendChild(td);
}

function resetFields() {
    fields.forEach((e) => {
        e.value = '';
    })
}

const tbody = document.querySelector('.table-body');

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

                const tableRow = createTableRow();
                createTableData(item, tableRow, 'item-code-product');
                createTableData(description, tableRow);
                createTableData(price, tableRow, 'value');
                createTableData(quantity, tableRow, 'quantity-product');
                createTableData(subTotalFormatado, tableRow, 'subtotal-result');
                tableRow.appendChild(createDeleteButton());
                
                tbody.appendChild(tableRow);

                changeTotalOrder(subTotal);

                const deleteBtnProduct = document.querySelectorAll('.material-symbols-outlined-delete');

                deleteBtnProduct.forEach((e) => {
                    e.addEventListener('click', function() {
                        deleteProduct(e);
                    });
                })

            }

        }
    })
}

function createDeleteButton() {
    const btn = document.createElement('span');
    btn.textContent = 'delete';
    btn.classList.add('material-symbols-outlined-delete');
    return btn
}

function formatPrices(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
};

function deleteProduct(e) {
    const row = e.parentNode;
    let priceToRemove = row.querySelector('.subtotal-result').textContent;
    const quantityToRemove = row.querySelector('.quantity-product').textContent;
    const itemCodeToRemove = row.querySelector('.item-code-product').textContent;

    priceToRemove = priceToRemove.replace(/[^0-9]/g,'');
    const priceToRemoveFormated = priceToRemove.substr(0, priceToRemove.length -2) + '.' + priceToRemove.substr(priceToRemove.length -2, 2);
    
    changeTotalOrder(- Number(priceToRemoveFormated));
    restoreStock(itemCodeToRemove, quantityToRemove);

    const index = ordersActive.indexOf(Number(itemCodeToRemove));
    ordersActive.splice(index, 1);

    row.remove();

}

function restoreStock(code, quantity) {
    produtos.forEach((produto) => {
        if(produto.codProduto == code) {
            produto.qtdEstoqueProd += Number(quantity);
        }
    })
}

export { searchClient, searchProduct, enterProduct, deleteProduct };