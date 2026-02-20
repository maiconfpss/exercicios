
/*
  Agora, o código está dentro de uma função.
  Ele só será executado quando a função 'pegarValor()' for chamada,
  garantindo que pegamos o valor SÓ DEPOIS que o usuário digitou algo e clicou no botão.
*/
function pegarValor() {
    // A lógica de pegar o valor agora acontece aqui dentro
    const valorDigitado = document.getElementById("ex").value; 
    
    console.log("O valor capturado foi:", valorDigitado);
}

const group = document.getElementsByClassName("wasd")

console.log(group);

/* Pegando os elementos pela classe "wasd" (retorna uma coleção de elementos no HTML) */