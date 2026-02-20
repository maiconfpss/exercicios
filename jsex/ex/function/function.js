/*
    Functions (Funções)

    Uma função é um trecho de código que você guarda para usar depois.
    Em vez de repetir o mesmo código várias vezes, você cria uma função
    e a "chama" quando precisar.
*/

// 1. Criando uma função simples (A Receita)
function dizerOla() {
    console.log("Olá! Eu sou uma função rodando.");
}

// 2. Chamando a função (Fazendo o bolo)
dizerOla(); // O código lá de cima só roda quando chega aqui.
dizerOla(); // Posso chamar quantas vezes quiser.


// 3. Função com Parâmetros (O Liquidificador)
// "nome" é como se fosse a fruta que colocamos no liquidificador.
function darBoasVindas(nome) {
    console.log("Seja bem-vindo(a), " + nome);
}

darBoasVindas("Maicon"); // O liquidificador processa "Maicon"
darBoasVindas("Madu");   // O liquidificador processa "Madu"

/*
    Resumo da Vida Real:
    
    - Controle Remoto: O botão "Ligar" é uma função. Você aperta (chama a função), 
      ele faz um monte de cálculo eletrônico dentro (código) e a TV liga (resultado).
      Você não precisa saber como ele funciona por dentro, só precisa saber usar!
*/