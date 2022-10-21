const produtos = [
  {
    "codProduto": 1,
    "descProduto": "Caneta esferográfica",
    "precoProduto": 0.80,
    "qtdEstoqueProd": 10,
  },

  {
    "codProduto": 2,
    "descProduto": "Cola Print",
    "precoProduto": 3.65,
    "qtdEstoqueProd": 50,
  },

]

const inputCodeProduct = document.querySelector('.products-code');
const inputDescriptionProduct = document.querySelector('.products-description');
const inputPriceProduct = document.querySelector('.products-price');
const inputQtyProduct = document.querySelector('.products-quantity');
let codeProduct = 1;


function changeProduct(value) {
  codeProduct = codeProduct + value;

  if (codeProduct < 1) {
    alert("Início do registro de produtos");
    codeProduct = 1;
  } else if (codeProduct > produtos.length) {
    alert("Fim do registro de produtos");
    codeProduct = produtos.length;
  }

  printDataProduct(codeProduct);
}

function printDataProduct(code) {
  produtos.forEach((product) => {

    if (product.codProduto == code) {
      inputCodeProduct.value = product.codProduto;
      inputDescriptionProduct.value = product.descProduto;
      inputPriceProduct.value = product.precoProduto;
      inputQtyProduct.value = product.qtdEstoqueProd;
    }

  })
}

function resetProduct() {
  codeProduct = 1;
  printDataProduct(codeProduct);
}

function newProduct() {
  inputDescriptionProduct.value = '';
  inputPriceProduct.value = '';
  inputQtyProduct.value = '';
  codeProduct = produtos.length + 1;
  inputCodeProduct.value = codeProduct;
}

function saveProduct() {

  if (inputCodeProduct.value !== '' && inputPriceProduct !== '' && inputQtyProduct.value !== '') {

    if(isNaN(Number(inputPriceProduct.value)) || isNaN(Number(inputQtyProduct.value))) {
      alert("Os campos de preço e quantidade ser numéricos");
      inputPriceProduct.value = '';
      inputQtyProduct.value = '';
    } else {
      const product = new Product(Number(inputCodeProduct.value), inputDescriptionProduct.value,
      Number(inputPriceProduct.value), Number(inputQtyProduct.value));
      produtos.push(product);
      resetProduct();
    }

  } else {
    alert("Todos os campos precisam ser preenchidos")
  }

}

function Product(code, description, price, qty) {
  this.codProduto = code;
  this.descProduto = description;
  this.precoProduto = price;
  this.qtdEstoqueProd = qty;
}

export { resetProduct, changeProduct, newProduct, saveProduct, produtos }