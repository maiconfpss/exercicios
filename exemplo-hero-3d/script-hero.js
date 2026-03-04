// ==========================================================
//  HERO CARROSSEL — JavaScript Didático
//  EccoFlix | Exemplo de Estudo
//
//  O QUE ESSE SCRIPT FAZ:
//  1. Seleciona os cards do HTML
//  2. Gira as "posições" CSS entre eles (coverflow)
//  3. Toca automaticamente a cada 5 segundos
//  4. Pausa quando o mouse está em cima
//  5. Gira ao clicar nos cards laterais
// ==========================================================


// ----------------------------------------------------------
// SELECIONANDO ELEMENTOS DO HTML
//
// document.querySelectorAll('.card') → pega TODOS os elementos
// com a classe "card" e retorna uma NodeList (tipo um array).
//
// Array.from(...) → converte a NodeList em um Array de verdade,
// pra poder usar métodos como .forEach, .pop, .shift etc.
//
// document.getElementById('carrossel') → pega UM elemento
// pelo atributo id="carrossel". Retorna o elemento diretamente.
// ----------------------------------------------------------
const cards = Array.from(document.querySelectorAll('.card'));
const carrossel = document.getElementById('carrossel');


// ----------------------------------------------------------
// O ARRAY DE POSIÇÕES — O CORAÇÃO DO COVERFLOW
//
// Cada string aqui é uma classe CSS.
// A POSIÇÃO da string no array define QUAL card recebe ela.
//
// Exemplo de como o array se mapeia aos cards:
//   Index 0 → card[0] (Amor Pode Ser Traduzido) → 'escondido-esquerda'
//   Index 1 → card[1] (Alquimia das Almas 2)   → 'item-anterior'
//   Index 2 → card[2] (Quando Telefone Toca)    → 'item-ativo'   ← CENTRO
//   Index 3 → card[3] (Hierarchy)               → 'item-proximo'
//   Index 4 → card[4] (Alquimia das Almas)      → 'escondido-direita'
//
// POR QUE let e não const?
// let → pode ser reatribuído. Usamos para variáveis que MUDAM.
// const → não pode ser reatribuído. Para valores fixos.
// O array em si muda (fazemos pop/shift), então usamos let.
// ----------------------------------------------------------
let posicoes = [
    'escondido-esquerda',
    'item-anterior',
    'item-ativo',       // ← o card do centro começa aqui (index 2)
    'item-proximo',
    'escondido-direita'
];


// ----------------------------------------------------------
// FUNÇÃO: aplicarPosicoes
//
// Percorre cada card e atribui a classe CSS correspondente.
//
// .forEach((card, index) => { ... })
//   → Para cada elemento do array 'cards':
//      card  = o elemento HTML atual
//      index = a posição dele no array (0, 1, 2, 3, 4)
//
// card.className = "card " + posicoes[index]
//   → Redefine TODAS as classes do card.
//   → "card" é a classe base (tem o estilo base do .card no CSS)
//   → posicoes[index] é a posição atual (item-ativo, item-anterior...)
// ----------------------------------------------------------
function aplicarPosicoes() {
    cards.forEach((card, index) => {
        card.className = 'card ' + posicoes[index];
    });
}


// ----------------------------------------------------------
// FUNÇÃO: girarDireita
//
// Move o array uma posição para a DIREITA.
// O card do CENTRO (item-ativo) passa para o card da ESQUERDA (item-anterior).
// O card da DIREITA (item-proximo) passa para o CENTRO.
//
// Como:
//   .pop()    → remove e retorna o ÚLTIMO elemento do array
//   .unshift()→ adiciona um elemento no COMEÇO do array
//
// Exemplo visual:
//   Antes:  [esq-escondida, anterior, ATIVO, proximo, dir-escondida]
//   Depois: [dir-escondida, esq-escondida, anterior, ATIVO, proximo]
//            ↑ o último foi pro começo, tudo se deslocou pra direita
// ----------------------------------------------------------
function girarDireita() {
    const ultimo = posicoes.pop();    // Remove 'escondido-direita' do final
    posicoes.unshift(ultimo);         // Coloca 'escondido-direita' no começo
    aplicarPosicoes();                // Atualiza o HTML com as novas posições
}


// ----------------------------------------------------------
// FUNÇÃO: girarEsquerda
//
// Move o array uma posição para a ESQUERDA.
// O card do CENTRO passa para a DIREITA.
// O card da ESQUERDA passa para o CENTRO.
//
// Como:
//   .shift() → remove e retorna o PRIMEIRO elemento do array
//   .push()  → adiciona um elemento no FINAL do array
//
// Exemplo visual:
//   Antes:  [esq-escondida, anterior, ATIVO, proximo, dir-escondida]
//   Depois: [anterior, ATIVO, proximo, dir-escondida, esq-escondida]
//            o primeiro foi pro final, tudo se deslocou pra esquerda
// ----------------------------------------------------------
function girarEsquerda() {
    const primeiro = posicoes.shift(); // Remove 'escondido-esquerda' do começo
    posicoes.push(primeiro);           // Coloca 'escondido-esquerda' no final
    aplicarPosicoes();                 // Atualiza o HTML
}


// ----------------------------------------------------------
// AUTO-PLAY — Gira sozinho a cada 5 segundos
//
// setInterval(função, tempo)
//   → Executa a função repetidamente a cada X milissegundos.
//   → Retorna um ID numérico que usamos para parar depois.
//
// clearInterval(id)
//   → Para o setInterval usando o ID que ele retornou.
//
// 5000 milissegundos = 5 segundos (tempo padrão de streaming)
// ----------------------------------------------------------
const TEMPO_MS = 5000;
let intervaloAutoPlay; // Variável que guarda o ID do setInterval

function iniciarAutoPlay() {
    intervaloAutoPlay = setInterval(girarDireita, TEMPO_MS);
}

function pararAutoPlay() {
    clearInterval(intervaloAutoPlay);
}

// Inicia o autoplay quando a página carrega
iniciarAutoPlay();


// ----------------------------------------------------------
// PAUSA NO HOVER — Boa prática de UX
//
// addEventListener(evento, função)
//   → "Escuta" um evento no elemento e executa a função quando ele acontece.
//
// 'mouseenter' → dispara quando o mouse ENTRA no elemento
// 'mouseleave' → dispara quando o mouse SAI do elemento
//
// Isso evita que o carrossel gire enquanto o usuário está
// tentando interagir com ele (ler as informações, clicar, etc.)
// ----------------------------------------------------------
carrossel.addEventListener('mouseenter', pararAutoPlay);
carrossel.addEventListener('mouseleave', iniciarAutoPlay);


// ----------------------------------------------------------
// CLIQUE NOS CARDS LATERAIS — Navegação Manual
//
// Usamos um único addEventListener no PAI (carrossel)
// em vez de um em cada card. Isso se chama "Event Delegation"
// (Delegação de Evento) — muito mais eficiente.
//
// evento.target → o elemento EXATO onde o clique aconteceu
//                 (pode ser a imagem dentro do card, por exemplo)
//
// .closest('.card') → sobe na árvore HTML a partir do target
//                     até encontrar um elemento com classe 'card'.
//                     Retorna null se não encontrar.
//
// if (!cardClicado) return;
//   → Se o clique não foi em nenhum card, sai da função.
//   → O ! inverte: se cardClicado for null (falso), !null = true → entra no if
//
// .classList.contains('nome-da-classe')
//   → Verifica se o elemento TEM aquela classe. Retorna true ou false.
// ----------------------------------------------------------
carrossel.addEventListener('click', (evento) => {

    // Descobre qual card foi clicado (ou o pai mais próximo com classe .card)
    const cardClicado = evento.target.closest('.card');

    // Se não clicou em nenhum card, ignora
    if (!cardClicado) return;

    // Clicou no card da DIREITA → avança pra direita
    if (cardClicado.classList.contains('item-proximo')) {
        girarDireita();
    }

    // Clicou no card da ESQUERDA → volta pra esquerda
    else if (cardClicado.classList.contains('item-anterior')) {
        girarEsquerda();
    }

    // Se clicou no card do CENTRO (item-ativo), não faz nada aqui.
    // O CSS já cuida do hover com as infos e o play.
});
