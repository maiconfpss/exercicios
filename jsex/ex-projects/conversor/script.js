const convertBtn = document.querySelector('.convert-btn');
const reverseBtn = document.querySelector('.reverse-btn');
const inputCurrency = document.querySelector('.input-currency');

let dolarToday = 0

function convertValues() {

    const inputCurrency = document.querySelector('.input-currency').value;
    const origem = document.getElementById('moedaOrigem').value;
    const destino = document.getElementById('moedaDestino').value;




    if (origem == 'real' && destino == 'dolar') {

        document.getElementById('resultado').innerText = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(inputCurrency / dolarToday)

    }

    if (origem == 'dolar' && destino == 'real') {

        document.getElementById('resultado').innerText = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(inputCurrency * dolarToday)

    }
}

convertBtn.addEventListener('click', convertValues);

inputCurrency.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        convertValues();
    }
})



function reverseCurrency() {

    const temp = document.getElementById('moedaOrigem').value;
    document.getElementById('moedaOrigem').value =
        document.getElementById('moedaDestino').value;
    document.getElementById('moedaDestino').value = temp;
}

reverseBtn.addEventListener('click', reverseCurrency);

fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
    .then(r => r.json())
    .then(data => dolarToday = parseFloat(data.USDBRL.bid))
