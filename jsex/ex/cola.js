/*
=================================================================
 COLA RÁPIDA DE JAVASCRIPT - Guia Super Simples
=================================================================
*/

/*
---------------------------------
 1. VARIÁVEIS (Caixas para guardar coisas)
---------------------------------
 Pense em uma variável como uma caixa com uma etiqueta. Você dá um nome (etiqueta)
 e guarda algo dentro dela.
*/

// let -> Uma caixa que você PODE trocar o conteúdo depois.
let idade = 30;
idade = 31; // OK, troquei o que estava na caixa.

// const -> Uma caixa lacrada. Depois de guardar algo, você NÃO PODE mais trocar.
const nome = "Maicon";
// nome = "Madu"; // ERRO! A caixa está lacrada.

/*
---------------------------------
 2. TIPOS DE DADOS (O que você pode guardar nas caixas)
---------------------------------
*/

// String (Texto): Qualquer coisa que seja texto. Use aspas.
const texto = "Olá, mundo!";
const outroTexto = 'Qualquer texto aqui.';
const nomeUsuario = `Madu`; // A crase é especial, permite colocar variáveis dentro: `Olá, ${nomeUsuario}`

// Number (Número): Números para fazer contas. Não use aspas.
const numeroInteiro = 100;
const preco = 29.99; // Use ponto para decimais.

// Boolean (Booleano): Pense num interruptor de luz. Só pode ser LIGADO ou DESLIGADO.
// É a resposta para uma pergunta de "sim" ou "não".
// Verdadeiro (true) ou Falso (false).
const lampadaAcesa = true;   // Sim, está acesa.
const diaChuvoso = false;  // Não, não está chovendo.

// Array (Lista): Uma prateleira para guardar vários itens em ordem.
const listaDeCompras = ["Arroz", "Feijão", "Batata"];
// Para pegar um item, use a posição (começando do 0):
console.log(listaDeCompras[0]); // Pega o "Arroz"

// Object (Objeto): Uma ficha de cadastro para agrupar informações sobre UMA coisa.
const pessoa = {
    nome: "Madu", // chave: valor
    idade: 7,
    cidade: "São Paulo"
};
// Para pegar uma informação, use o ponto:
console.log(pessoa.nome); // Pega "Madu"

/*
---------------------------------
 3. OPERADORES (Ferramentas para trabalhar com os dados)
---------------------------------
*/

// Aritméticos (Matemática): +, -, *, /
let soma = 10 + 5;

// Comparação (Fazem perguntas de "sim" ou "não" e retornam um Boolean)
// Use SEMPRE '===' e '!==' para evitar confusão.
10 === 10; // Pergunta: "10 é EXATAMENTE IGUAL a 10?" -> Resposta: true
10 === "10"; // Pergunta: "10 é EXATAMENTE IGUAL ao texto '10'?" -> Resposta: false
10 !== 5;  // Pergunta: "10 é DIFERENTE de 5?" -> Resposta: true
10 > 5;    // Pergunta: "10 é MAIOR que 5?" -> Resposta: true

// Lógicos (Juntam perguntas de "sim" ou "não")
// && (E): As DUAS perguntas precisam ser 'true'.
// Ex: Para entrar na festa, precisa ser maior de 18 E ter convite.
const maiorDeIdade = true;
const temConvite = false;
console.log(maiorDeIdade && temConvite); // false (porque não tem convite)

// || (OU): PELO MENOS UMA pergunta precisa ser 'true'.
// Ex: Para o frete ser grátis, a compra precisa ser > R$100 OU ter cupom.
const compraGrande = false;
const temCupom = true;
console.log(compraGrande || temCupom); // true (porque tem cupom)

/*
---------------------------------
 4. CONDICIONAIS (Tomando decisões)
---------------------------------
 O 'if' usa a resposta de uma pergunta (um boolean) para decidir qual caminho seguir.
*/

const notaDoAluno = 8;

if (notaDoAluno >= 7) { // A pergunta: "A nota é maior ou igual a 7?" -> true
    console.log("Aprovado!"); // Então, o código entra aqui.
} else {
    console.log("Reprovado."); // Se a resposta fosse 'false', entraria aqui.
}

/*
---------------------------------
 5. FUNÇÕES (Receitas de bolo)
---------------------------------
 Uma função é um bloco de código que você guarda com um nome para usar depois,
 quantas vezes quiser.
*/

// Criando a receita
function somar(numero1, numero2) {
    const resultado = numero1 + numero2;
    console.log(`O resultado da soma é: ${resultado}`);
}

// Usando a receita
somar(5, 3);  // Saída: O resultado da soma é: 8
somar(100, 50); // Saída: O resultado da soma é: 150

/*
---------------------------------
 6. INTERAGINDO COM O HTML (A ponte entre JS e a página)
---------------------------------
*/

// --- COMO "PESCAR" ELEMENTOS DA PÁGINA ---

// Pega UM elemento pelo seu ID (crachá único). O mais comum e rápido.
const meuInput = document.getElementById('ex');

// Pega TODOS os elementos que têm a mesma classe (mesmo time). Retorna uma lista.
const todosOsParagrafos = document.getElementsByClassName('wasd');

// Pega o PRIMEIRO elemento que encontrar com base no seletor CSS. Super versátil.
const primeiroH1 = document.querySelector('h1');

// --- O QUE FAZER DEPOIS DE "PESCAR" ---

// .value -> Pega o que está ESCRITO DENTRO de um <input>.
// const textoDigitado = meuInput.value;

// .innerText -> Pega ou coloca um TEXTO dentro de um elemento (h1, p, etc).
// primeiroH1.innerText = "Novo Título via JS!";

// .innerHTML -> Igual ao innerText, mas também entende tags HTML.
// primeiroH1.innerHTML = "<strong>Título em Negrito</strong>";

// --- COMO OUVIR O QUE O USUÁRIO FAZ (Eventos) ---

// A forma mais moderna é usar 'addEventListener'.
// 1. Pescamos o botão
const botao = document.querySelector('button');

// 2. Dizemos para o JS: "Fique de ouvido nesse botão. Quando alguém 'clicar', execute esta função".
/*
botao.addEventListener('click', function() {
    const textoDigitado = document.getElementById('ex').value;
    alert(`Você digitou: ${textoDigitado}`);
});
*/


getElementsByClassName Pega todas as classes com o mesmo nome.

getElementById Pega um elemento com o mesmo id.

getElementsByTagName Pega todos os elementos com o mesmo tag. Ex de tag: <p>, <h1>, etc. pega todos
paragrafos com P e titulos com H1

querySelectorAll Pega todos os elementos com o mesmo seletor CSS.

getElementsByName Pega todos os elementos com o mesmo name.

querySelector Pega o primeiro elemento com o mesmo seletor CSS.