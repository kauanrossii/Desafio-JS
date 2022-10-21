const clientes = [
  {
    "codCliente": 1,
    "nomeCliente": "Donald Blake",
    "dataCadCli": "12/10/2010",
  },
  
  {
    "codCliente": 2,
    "nomeCliente": "Bruce Wayne",
    "dataCadCli": "01/08/2017",
  },
  {
    "codCliente": 3,
    "nomeCliente": "Diana",
    "dataCadCli": "02/05/2020",
  },
  
]

const inputNameClient = document.querySelector('.clients-name');
const inputDateSignUp = document.querySelector('.date-signup');
const inputCodeClient = document.querySelector('.clients-code');
const data = new Date();
const dataFormated = data.toLocaleDateString('pt-BR');
let codeClient = 1;

function printDataClient(code) {

  clientes.forEach(function (cliente) {

    if (cliente.codCliente == code) {
      inputCodeClient.value = cliente.codCliente;
      inputNameClient.value = cliente.nomeCliente;
      inputDateSignUp.value = cliente.dataCadCli;
    }
  })
}

function resetClient() {
  codeClient = 1;
  printDataClient(codeClient);
}

function saveClient() {
  if(inputNameClient.value !== '') {
    const cliente = new Cliente(Number(inputCodeClient.value), inputNameClient.value, dataFormated);
    clientes.push(cliente);
    resetClient();
  } else {
    alert("Todos os campos precisam ser preenchidos");
  }
}

function Cliente(code, name, date) {
  this.codCliente = code;
  this.nomeCliente = name;
  this.dataCadCli = date;
}

function newClient() {
  inputNameClient.value = '';  
  codeClient = clientes.length + 1;
  inputCodeClient.value = codeClient;
  inputDateSignUp.value = dataFormated;
}

function changeClient(value) {
  codeClient = codeClient + value;

  if(codeClient < 1) {
    alert("Início do registro de clientes");
    codeClient = 1;
  } else if(codeClient > clientes.length) {
    alert("Fim do registro de clientes");
    codeClient = clientes.length;
  }

  printDataClient(codeClient);
}

export { changeClient, resetClient, saveClient, newClient, clientes };