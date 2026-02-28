// ======================================================
//  JS QUIZ — ARQUIVO DE EXERCÍCIO
//  O HTML e CSS já estão prontos.
//  Sua missão: completar as funções marcadas com TODO 🎯
//
//  Comece pelo TODO 1 e vá descendo.
//  Trava? Pergunta pro professor! 👨‍🏫
// ======================================================


// ========================
//  BANCO DE PERGUNTAS (já pronto)
// ========================
// Um array de objetos. Cada objeto tem:
//   question → o texto da pergunta
//   options  → array com as 4 opções
//   answer   → a opção CERTA (tem que ser IGUAL a uma das options)

const questions = [
    {
        question: 'Qual palavra-chave usamos para declarar uma variável que NÃO pode ser reatribuída?',
        options: ['var', 'let', 'const', 'define'],
        answer: 'const'
    },
    {
        question: 'Qual método de array usamos para criar um NOVO array transformando cada elemento?',
        options: ['forEach()', 'filter()', 'reduce()', 'map()'],
        answer: 'map()'
    },
    {
        question: 'O que o seguinte código retorna?  typeof null',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        answer: '"object"'
    },
    {
        question: 'Qual operador verifica igualdade de VALOR e de TIPO ao mesmo tempo?',
        options: ['==', '===', '=', '!=='],
        answer: '==='
    },
    {
        question: 'O que é uma "Arrow Function" (função seta)?',
        options: [
            'Uma função que aponta para um objeto',
            'Uma sintaxe mais curta para escrever funções',
            'Uma função que só executa uma vez',
            'Um método de array'
        ],
        answer: 'Uma sintaxe mais curta para escrever funções'
    }
];


// ========================
//  ELEMENTOS DO DOM (já pronto)
// ========================
// Essas variáveis "seguram" cada parte da tela.
// Use elas no seu código — não precisa usar getElementById de novo.

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const progressBar = document.getElementById('progress-bar');
const questionCounter = document.getElementById('question-counter');
const correctCount = document.getElementById('correct-count');
const resultEmoji = document.getElementById('result-emoji');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');


// ========================
//  VARIÁVEIS DE ESTADO (já pronto)
// ========================
// Guardam a situação atual do jogo. Você vai alterar elas nas funções.

let currentQuestionIndex = 0;  // Qual pergunta estamos? Começa em 0
let score = 0;                 // Quantas respostas certas?


// ========================
//  FUNÇÕES AUXILIARES (já prontas)
// ========================
// showScreen() → troca qual tela está visível
// createOptionButton() → cria um botão de opção na tela
// Você NÃO precisa mexer nessas. Só precisa CHAMÁ-LAS nas suas funções.

function showScreen(screenToShow) {
    [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add('hidden'));
    screenToShow.classList.remove('hidden');
}

function createOptionButton(optionText) {
    const button = document.createElement('button');
    button.classList.add('option-btn');
    button.textContent = optionText;
    button.addEventListener('click', () => checkAnswer(optionText, button));
    optionsGrid.appendChild(button);
}


// ========================
//  EVENT LISTENERS (já prontos)
// ========================
// Eles chamam startGame() quando os botões são clicados.

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);


// ==============================================================
//  ↓↓↓  AQUI COMEÇA O SEU TRABALHO  ↓↓↓
// ==============================================================


// ========================
//  TODO 1 — startGame()
// ========================
// Chamada quando clica em "Iniciar Quiz".
//
// O que fazer:
//   1. Zere as variáveis:  currentQuestionIndex = 0   e   score = 0
//   2. Mude para a tela do quiz:  showScreen(quizScreen)
//   3. Chame loadQuestion() para carregar a 1ª pergunta

function startGame() {

    currentQuestionIndex = 0;
    score = 0;
    showScreen(quizScreen);
    loadQuestion();

}


// ========================
//  TODO 2 — loadQuestion()
// ========================
// Pega a pergunta atual e coloca tudo na tela.
//
// O que fazer:
//   1. Pegue a pergunta:  const q = questions[currentQuestionIndex]
//   2. Atualize o contador:
//        questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} / ${questions.length}`
//   3. Atualize a barra de progresso (em %):
//        progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`
//   4. Mostre o texto da pergunta:
//        questionText.textContent = q.question
//   5. Limpe as opções antigas:  optionsGrid.innerHTML = ''
//   6. Para cada opção em q.options, chame:  createOptionButton(opção)
//      (use  q.options.forEach(...)  para percorrer)

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} / ${questions.length}`;
    questionText.textContent = q.question;
    optionsGrid.innerHTML = '';
    q.options.forEach(opcao => createOptionButton(opcao))


}


// ========================
//  TODO 3 — checkAnswer()
// ========================
// Chamada quando o usuário clica numa opção.
// Recebe: selectedOption (texto clicado) e clickedButton (o botão clicado)
//
// O que fazer:
//   1. Pegue a pergunta atual:  const q = questions[currentQuestionIndex]
//   2. Se selectedOption === q.answer:
//        - Adicione a classe 'correct' no clickedButton
//        - Some 1 ao score  (score++)
//      Senão:
//        - Adicione a classe 'wrong' no clickedButton
//   3. Desabilite TODOS os botões .option-btn:
//        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true)
//   4. Após 1.5 segundos, chame nextQuestion():
//        setTimeout(() => { nextQuestion() }, 1500)

function checkAnswer(selectedOption, clickedButton) {

    const q = questions[currentQuestionIndex];

    if (selectedOption === q.answer) {
        clickedButton.classList.add('correct');
        score++;
    }
    else {
        clickedButton.classList.add('wrong');
    }

    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    setTimeout(() => { nextQuestion() }, 1500)

}


// ========================
//  TODO 4 — nextQuestion()
// ========================
// Avança para a próxima pergunta ou termina o jogo.
//
// O que fazer:
//   1. Incremente:  currentQuestionIndex++
//   2. Se ainda tiver perguntas (currentQuestionIndex < questions.length):
//        chame loadQuestion()
//      Senão:
//        chame showResult()

function nextQuestion() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    }
    else {
        showResult();
    }

}


// ========================
//  TODO 5 — showResult()
// ========================
// Mostra a tela final com o resultado.
//
// O que fazer:
//   1. Mostre a tela:  showScreen(resultScreen)
//   2. Coloque a pontuação:  correctCount.textContent = score
//   3. Use if / else if / else para ajustar emoji, título e mensagem:
//
//      Score >= 4  →  emoji '🏆'   título 'Incrível!'          mensagem 'Você domina JavaScript!'
//      Score >= 2  →  emoji '💪'   título 'Bom trabalho!'      mensagem 'Está no caminho certo!'
//      Senão       →  emoji '📚'   título 'Continue tentando!' mensagem 'Revise e tente de novo!'
//
//      Ex:  resultEmoji.textContent = '🏆'
//           resultTitle.textContent = 'Incrível!'
//           resultMessage.textContent = 'Você domina JavaScript!'

function showResult() {

    showScreen(resultScreen);
    correctCount.textContent = score;

    if (score >= 4) {
        resultEmoji.textContent = '🏆';
        resultTitle.textContent = 'Incrível!';
        resultMessage.textContent = 'Você domina JavaScript!';
    }
    else if (score >= 2) {
        resultEmoji.textContent = '💪';
        resultTitle.textContent = 'Bom trabalho!';
        resultMessage.textContent = 'Está no caminho certo!';
    }
    else {
        resultEmoji.textContent = '📚';
        resultTitle.textContent = 'Continue tentando!';
        resultMessage.textContent = 'Revise e tente de novo!';
    }

}
