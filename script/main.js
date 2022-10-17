
document.querySelector('#btn').addEventListener('click', function (e) {
    e.preventDefault();

    (async function dadosArquivo() {

        let jsonData = await fetch('./script/usuario.json');
     
        let data = await jsonData.json();
    
        validateUser(data);
    
    })();

    function validateUser(data) {

        const pswdDigitada = document.querySelector('#password').value;
        const userDigitado = document.querySelector('#name').value;
    
        for(let i of data.users) {
            if(i.user == userDigitado && i.pws == pswdDigitada) {
                document.querySelector('#form').submit();
                return
            }
        }
        alert("Usuário ou senha incorretos");
    }
})




