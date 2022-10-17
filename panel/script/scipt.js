const items = document.querySelectorAll('.item');
const main = document.querySelector('main');
const childsMain = main.children;

const secoes = [
    {
        secao: 'Clientes',
        Código: '',
        Nome: '',
        DataCadastro: '', 
    },
    {
        secao: 'Produtos',
        Descrição: '',
        Preço: '',
        Quantidade: ''
    }
]


items.forEach(function (e) {
    e.addEventListener('click', function () {
        
        removeChilds();

        if (e.classList.contains('clients')) {
            createSection('Clientes');
        }

        if (e.classList.contains('products')) {
            createSection('Produtos');
        }

    })

})

function removeChilds() {
    for(let i of childsMain) {
        i.style.display = 'none';
    }
}

function createSection(data) {
    let section = document.createElement('section');
    let title = document.createElement('h1')
    title.textContent = data;

    section.appendChild(title);

    secoes.forEach(function(obj) {
        if(obj.secao == data) {
            const chavesObj = Object.keys(obj);
            
            // for(let chave of chavesObj) {
            //     const label = document.createElement('label');
            //     label.innerText = chave;
            //     section.appendChild(label);
            // }

            for(let chave = 1; chave < chavesObj.length; chave++) {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                label.innerText = chavesObj[chave];
                section.appendChild(label);
                section.appendChild(input);
            }

        }
    })

    main.appendChild(section); 
}