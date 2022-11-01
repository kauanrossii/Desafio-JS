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

function searchClient(code) { // Search the client code typed and show result on display
    clientes.forEach((cliente) => {
        if (cliente.codCliente == code) {
            inputNameClient.value = cliente.nomeCliente;
        }
    })
}

let quantityProductsEstoque = 0;

function searchProduct(code) { // Search the product code typed and show result on display


    produtos.forEach((produto) => {
        if (produto.codProduto == code) {
            inputDescriptionProduct.value = produto.descProduto;
            inputPriceProduct.value = produto.precoProduto;
            quantityProductsEstoque = produto.qtdEstoqueProd;
        }
    })
}

function enterProduct() { // Checks all validations

    let fieldsTyped = 1;
    let pedidoXEstoque = Number(inputQtyProduct.value) > quantityProductsEstoque;

    fields.forEach((e) => { // Checks that all fields have been entered
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

function changeTotalOrder(value) { // Update the total order result 
    totalOrder += value;
    if(totalOrder < 0) totalOrder = 0;
    let valueFormated = totalOrder;
    totalOrderResult.textContent = valueFormated;
}

function createTableRow() { // Create table row
    const tr = document.createElement('tr');
    return tr;
}

function createTableData(value, nameClass) { // Create table datas and insert on current table row
    const td = document.createElement('td');
    td.textContent = value;

    // if(nameClass !== undefined) { // For these table data that would have a class, it adds
        td.classList.add(`${nameClass}`);
    // }
    currentTableRow.appendChild(td);
}

function resetFields() {
    fields.forEach((e) => {
        e.value = '';
    })
}

const tbody = document.querySelector('.table-body');
let currentTableRow;

function createInfo() { // Add in oder board the product launched 
    const code = inputCodeProduct.value;

    produtos.forEach((product) => {

        if (product.codProduto == code) { // Search the object product that have the same code typed

            const price = product.precoProduto;
            const item = product.codProduto;
            const description = product.descProduto;
            const quantity = inputQtyProduct.value;                       // Cactch all infos
            const subTotal = Number(quantity) * product.precoProduto;

            product.qtdEstoqueProd -= quantity;

            if (ordersActive.indexOf(item) !== -1) {
                alert("O item já foi adicionado ao pedido!");
            } else {
                ordersActive.push(item);

                currentTableRow = createTableRow();
                createTableData(item, 'item-code-product');
                createTableData(description);                      // Create table row and table datas
                createTableData(price, );
                createTableData(quantity, 'quantity-product');
                createTableData(subTotal, 'subtotal-result');
                currentTableRow.appendChild(createDeleteButton());
                
                tbody.appendChild(currentTableRow);

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

function createDeleteButton() { // Create delete button
    const btn = document.createElement('span');
    btn.textContent = 'delete';
    btn.classList.add('material-symbols-outlined-delete');
    return btn
}

function deleteProduct(e) { // Remove a product from the order
    const row = e.parentNode;
    let priceToRemove = row.querySelector('.subtotal-result').textContent;
    const quantityToRemove = row.querySelector('.quantity-product').textContent;
    const itemCodeToRemove = row.querySelector('.item-code-product').textContent;

    changeTotalOrder(-priceToRemove);
    restoreStock(itemCodeToRemove, quantityToRemove);

    const index = ordersActive.indexOf(Number(itemCodeToRemove));
    ordersActive.splice(index, 1); // Remove the product from the intern list of products

    row.remove(); // Remove the product from the screen

}

function restoreStock(code, quantity) { // Restore the stock after remove a product
    produtos.forEach((produto) => {
        if(produto.codProduto == code) {
            produto.qtdEstoqueProd += Number(quantity);
        }
    })
}

export { searchClient, searchProduct, enterProduct, deleteProduct };