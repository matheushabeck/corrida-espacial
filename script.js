// Variáveis Globais
let currentScore = 0
const currentAchievements = []
let currentQuiz = 0
let selectedAnswer = null
let showExplanation = false
let gameInterval = null;
let gamePhase = "ready";
let shipPosition = 50;
let obstacles = [];
let gameScore = 0;

// Variáveis de Estado da Jornada
let quizCompleted = false;
let gameCompleted = false;
let currentTimelineQuestionIndex = 0;

const timelineEvents = [
  {
    date: "4 de Outubro, 1957",
    title: "Sputnik 1 - Primeiro Satélite Artificial",
    country: "URSS",
    image: "img/sputnik.jpg",
    description: "A União Soviética lança o primeiro satélite artificial da história, marcando o início da Era Espacial.",
    details: "O Sputnik 1 pesava 83,6 kg e orbitou a Terra a cada 96,2 minutos. Seu lançamento causou o 'Susto do Sputnik' nos Estados Unidos, levando à criação da NASA em 1958.",
    quiz: {
      question: "Quanto pesava o Sputnik 1?",
      options: ["102,4 kg", "83,6 kg", "55,1 kg"],
      correctAnswer: 1
    }
  },
  {
    date: "3 de Novembro, 1957",
    title: "Sputnik 2 - Laika, a Primeira Vida no Espaço",
    country: "URSS",
    image: "img/Laika.webp",
    description: "A cadela Laika se torna o primeiro ser vivo a orbitar a Terra, provando que organismos vivos podem sobreviver no espaço.",
    details: "Laika foi uma cadela vira-lata de Moscou. Infelizmente, não havia planos para seu retorno, e ela morreu algumas horas após o lançamento devido ao superaquecimento da cápsula.",
    quiz: {
      question: "Qual foi a causa da morte de Laika?",
      options: ["Falta de oxigênio", "Impacto na reentrada", "Superaquecimento"],
      correctAnswer: 2
    }
  },
  {
    date: "31 de Janeiro, 1958",
    title: "Explorer 1 - Primeira Resposta Americana",
    country: "EUA",
    image: "img/explorer1.jpg",
    description: "Os Estados Unidos lançam seu primeiro satélite, descobrindo os cinturões de radiação de Van Allen.",
    details: "O Explorer 1 foi desenvolvido pela equipe de Wernher von Braun. Sua descoberta dos cinturões de radiação foi uma importante contribuição científica para futuras missões.",
    quiz: {
      question: "Qual foi a principal descoberta científica do Explorer 1?",
      options: ["Água na Lua", "Cinturões de radiação de Van Allen", "Um novo planeta"],
      correctAnswer: 1
    }
  },
  {
    date: "12 de Abril, 1961",
    title: "Yuri Gagarin - Primeiro Homem no Espaço",
    country: "URSS",
    image: "img/yuri.jpg",
    description: "Yuri Gagarin completa uma órbita ao redor da Terra na nave Vostok 1, tornando-se o primeiro ser humano no espaço.",
    details: "O voo durou 108 minutos. Gagarin disse a famosa frase 'A Terra é azul!' e se tornou um herói mundial, provando que humanos podiam funcionar no espaço.",
    quiz: {
      question: "Quanto tempo durou o voo espacial de Yuri Gagarin?",
      options: ["108 minutos", "90 minutos", "12 horas"],
      correctAnswer: 0
    }
  },
  {
    date: "5 de Maio, 1961",
    title: "Alan Shepard - Primeiro Americano no Espaço",
    country: "EUA",
    image: "img/alan.webp",
    description: "Alan Shepard realiza um voo suborbital de 15 minutos, tornando-se o primeiro americano no espaço.",
    details: "O voo da Freedom 7 atingiu uma altitude de 187 km. Embora mais curto que o voo de Gagarin, foi um marco importante para o programa espacial americano.",
    quiz: {
      question: "Qual foi a altitude atingida pelo voo de Alan Shepard?",
      options: ["300 km", "187 km", "120 km"],
      correctAnswer: 1
    }
  },
  {
    date: "16 de Junho, 1963",
    title: "Valentina Tereshkova - Primeira Mulher no Espaço",
    country: "URSS",
    image: "img/valentinaa.webp",
    description: "Valentina Tereshkova se torna a primeira mulher a viajar para o espaço, completando 48 órbitas.",
    details: "Tereshkova era uma operária têxtil e paraquedista amadora. Sua missão durou 71 horas e ela permaneceu como a única mulher a ir ao espaço até 1982.",
    quiz: {
      question: "Até que ano Valentina Tereshkova foi a única mulher a ter ido ao espaço?",
      options: ["1975", "1990", "1982"],
      correctAnswer: 2
    }
  },
  {
    date: "18 de Março, 1965",
    title: "Alexei Leonov - Primeira Caminhada Espacial",
    country: "URSS",
    image: "img/alexei.webp",
    description: "Alexei Leonov realiza a primeira atividade extraveicular (EVA) da história, flutuando fora da nave por 12 minutos.",
    details: "A caminhada quase terminou em tragédia. O traje de Leonov inflou no vácuo, e ele teve que reduzir a pressão do traje, arriscando sua vida, para conseguir entrar de volta na escotilha.",
    quiz: {
      question: "Qual foi a principal dificuldade de Alexei Leonov durante sua caminhada espacial?",
      options: ["Perdeu a comunicação", "Seu traje inflou demais", "Ficou sem oxigênio"],
      correctAnswer: 1
    }
  },
  {
    date: "21 de Dezembro, 1968",
    title: "Apollo 8 - Primeira Órbita Lunar Tripulada",
    country: "EUA",
    image: "img/apollo8.jpg",
    description: "A Apollo 8 se torna a primeira missão tripulada a deixar a órbita terrestre e orbitar a Lua, capturando a foto 'Earthrise'.",
    details: "A tripulação leu trechos do Gênesis na véspera de Natal, em uma transmissão assistida por milhões, um momento icônico da exploração espacial.",
    quiz: {
      question: "Que texto a tripulação da Apollo 8 leu em sua famosa transmissão de Natal?",
      options: ["Um poema", "Trechos do Gênesis", "Uma carta do presidente"],
      correctAnswer: 1
    }
  },
  {
    date: "20 de Julho, 1969",
    title: "Apollo 11 - Primeiro Homem na Lua",
    country: "EUA",
    image: "img/apollo11.webp",
    description: "Neil Armstrong e Buzz Aldrin se tornam os primeiros humanos a pisar na Lua.",
    details: "'Um pequeno passo para o homem, um salto gigante para a humanidade.' A missão foi assistida por cerca de 650 milhões de pessoas na TV, marcando a vitória americana na corrida.",
    quiz: {
      question: "Quantas pessoas aproximadamente assistiram ao pouso na Lua pela TV?",
      options: ["650 milhões", "1 bilhão", "200 milhões"],
      correctAnswer: 0
    }
  },
  {
    date: "19 de Abril, 1971",
    title: "Salyut 1 - Primeira Estação Espacial",
    country: "URSS",
    image: "img/52.jpg",
    description: "A URSS lança a primeira estação espacial da história, a Salyut 1, iniciando a era da presença humana contínua no espaço.",
    details: "A primeira tripulação da Salyut 1 morreu tragicamente durante o retorno à Terra devido a uma despressurização da cápsula, um dos acidentes mais graves da exploração espacial.",
    quiz: {
      question: "O que causou a morte da primeira tripulação da Salyut 1?",
      options: ["Explosão no lançamento", "Falha nos paraquedas", "Despressurização da cápsula"],
      correctAnswer: 2
    }
  },
  {
    date: "17 de Julho, 1975",
    title: "Projeto Apollo-Soyuz - Fim da Corrida Espacial",
    country: "EUA & URSS",
    image: "img/a.jpg",
    description: "Astronautas americanos e cosmonautas soviéticos se encontram no espaço, simbolizando o fim da corrida espacial.",
    details: "O aperto de mãos entre o comandante americano Thomas Stafford e o comandante soviético Alexei Leonov marcou uma nova era de cooperação, abrindo caminho para projetos como a Estação Espacial Internacional.",
    quiz: {
      question: "O aperto de mãos entre Stafford e quem marcou o fim simbólico da corrida?",
      options: ["Yuri Gagarin", "Alexei Leonov", "Vladimir Komarov"],
      correctAnswer: 1
    }
  }
];

const quizQuestions = [
  { question: "Qual foi o primeiro satélite artificial lançado ao espaço?", options: ["Explorer 1", "Sputnik 1", "Vanguard 1", "Luna 1"], correct: 1, explanation: "O Sputnik 1 foi lançado pela URSS em 4 de outubro de 1957, dando início à Corrida Espacial." },
  { question: "Qual animal foi o primeiro ser vivo a orbitar a Terra?", options: ["Laika (cadela)", "Ham (chimpanzé)", "Albert II (macaco)", "Félicette (gata)"], correct: 0, explanation: "Laika, uma cadela, foi o primeiro ser vivo a orbitar a Terra a bordo do Sputnik 2 em 1957." },
  { question: "Qual foi o primeiro satélite americano lançado com sucesso?", options: ["Vanguard 1", "Explorer 1", "Pioneer 1", "Telstar 1"], correct: 1, explanation: "O Explorer 1, lançado em 1958, foi a resposta dos EUA ao Sputnik e descobriu os cinturões de radiação de Van Allen." },
  { question: "Quem foi o primeiro ser humano no espaço?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"], correct: 2, explanation: "O cosmonauta soviético Yuri Gagarin se tornou o primeiro humano no espaço em 12 de abril de 1961." },
  { question: "Quem foi o primeiro americano no espaço?", options: ["John Glenn", "Alan Shepard", "Gus Grissom", "Scott Carpenter"], correct: 1, explanation: "Alan Shepard foi o primeiro americano no espaço com um voo suborbital em 5 de maio de 1961." },
  { question: "Quem foi a primeira mulher no espaço?", options: ["Sally Ride", "Valentina Tereshkova", "Mae Jemison", "Svetlana Savitskaya"], correct: 1, explanation: "A cosmonauta soviética Valentina Tereshkova se tornou a primeira mulher no espaço em 1963." },
  { question: "Quem realizou a primeira caminhada espacial?", options: ["Ed White", "Alexei Leonov", "Neil Armstrong", "John Glenn"], correct: 1, explanation: "O cosmonauta Alexei Leonov realizou a primeira caminhada espacial (atividade extraveicular) em 1965." },
  { question: "Qual missão foi a primeira a orbitar a Lua com tripulação?", options: ["Apollo 7", "Apollo 8", "Apollo 9", "Apollo 10"], correct: 1, explanation: "A missão Apollo 8, em 1968, foi a primeira a levar humanos para orbitar a Lua." },
  { question: "Em que ano o homem pisou na Lua pela primeira vez?", options: ["1967", "1968", "1969", "1970"], correct: 2, explanation: "Neil Armstrong e Buzz Aldrin, da missão Apollo 11, pisaram na Lua em 20 de julho de 1969." },
  { question: "Qual missão marcou o fim oficial da corrida espacial?", options: ["Apollo 17", "Skylab", "Apollo-Soyuz", "Salyut 1"], correct: 2, explanation: "O Projeto Apollo-Soyuz em 1975, onde uma nave americana e uma soviética acoplaram no espaço, marcou o fim simbólico da Corrida Espacial." },
];

document.addEventListener("DOMContentLoaded", () => {
  createStars();
  generateTimeline();
  updateScore();
  setupKeyboardControls();
});

function createStars() {
  const starsContainer = document.getElementById("stars");
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 2 + "s";
    starsContainer.appendChild(star);
  }
}

function generateTimeline() {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = '';
  timelineEvents.forEach((event, index) => {
    const eventElement = document.createElement("div");
    eventElement.className = index === 0 ? "timeline-event visible" : "timeline-event hidden";
    eventElement.id = `event-${index}`;
    const countryClass = event.country === "URSS" ? "country-ussr" : event.country === "EUA" ? "country-usa" : "country-both";
    let advanceButton = '';
    if (index < timelineEvents.length - 1) {
      advanceButton = `<button class="btn-primary" style="margin-top: 16px;" onclick="showTimelineQuestion(${index})">Desbloquear Próximo Arquivo →</button>`;
    } else {
      advanceButton = `<button class="btn-primary" style="margin-top: 16px;" onclick="completeTimelinePhase()">Análise Concluída. Liberar Testes →</button>`;
    }
    eventElement.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content">
            <div class="timeline-card">
                <div class="timeline-card-content" onclick="toggleEventDetails(${index})">
                    <div class="timeline-meta"><span class="country-badge ${countryClass}">${event.country}</span><span class="timeline-date">${event.date}</span></div>
                    <h3 class="timeline-title">${event.title}</h3>
                    <img src="${event.image}" alt="${event.title}" class="timeline-image">
                    <p class="timeline-description">${event.description}</p>
                    <button class="details-btn">Analisar Arquivo</button>
                </div>
                <div class="timeline-details" id="details-${index}" style="display: none; padding: 24px; padding-top: 0;">
                    <p>${event.details}</p>
                    ${advanceButton}
                </div>
            </div>
        </div>
    `;
    timeline.appendChild(eventElement);
  });
}

function toggleEventDetails(index) {
  const details = document.getElementById(`details-${index}`);
  details.style.display = details.style.display === "none" ? "block" : "none";
}

function showTimelineQuestion(index) {
  currentTimelineQuestionIndex = index;
  const eventData = timelineEvents[index];
  const modal = document.getElementById('timeline-quiz-modal');
  const questionText = document.getElementById('timeline-question-text');
  const optionsContainer = document.getElementById('timeline-options-container');
  questionText.textContent = eventData.quiz.question;
  optionsContainer.innerHTML = '';
  eventData.quiz.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.textContent = option;
    button.onclick = () => checkTimelineAnswer(i);
    optionsContainer.appendChild(button);
  });
  modal.classList.add('active');
}

function checkTimelineAnswer(selectedIndex) {
  const eventData = timelineEvents[currentTimelineQuestionIndex];
  if (selectedIndex === eventData.quiz.correctAnswer) {
    currentScore += 10;
    updateScore();
    closeTimelineQuiz();
    unlockNextEvent(currentTimelineQuestionIndex + 1);
  } else {
    const modalContent = document.getElementById('timeline-quiz-content');
    modalContent.classList.add('shake');
    setTimeout(() => modalContent.classList.remove('shake'), 500);
  }
}

function closeTimelineQuiz() {
  document.getElementById('timeline-quiz-modal').classList.remove('active');
}

function unlockNextEvent(indexToShow) {
  const nextEvent = document.getElementById(`event-${indexToShow}`);
  if (nextEvent) {
    nextEvent.classList.remove('hidden');
    nextEvent.classList.add('visible');
    nextEvent.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function completeTimelinePhase() {
  const challengesSection = document.getElementById('challenges-section');
  challengesSection.classList.remove('locked-section');
  challengesSection.classList.add('unlocked');
  challengesSection.querySelector('.challenges-title').innerHTML = "🎮 Testes de Aptidão Desbloqueados!";
  challengesSection.scrollIntoView({ behavior: 'smooth' });
}

function scrollToVideo() {
  document.getElementById("video-section").scrollIntoView({ behavior: "smooth" });
}

function unlockTimeline() {
  const timelineSection = document.getElementById('timeline-section');
  timelineSection.classList.remove('locked-section');
  timelineSection.classList.add('unlocked');
  timelineSection.scrollIntoView({ behavior: 'smooth' });
}

function updateScore() {
  document.getElementById("score").textContent = `${currentScore} pontos`;
  document.getElementById("achievements").textContent = `${currentAchievements.length} conquistas`;
  if (currentAchievements.length > 0) showAchievements();
}

function showAchievements() {
  const achievementsSection = document.getElementById("achievements-section");
  const achievementsList = document.getElementById("achievements-list");
  achievementsSection.style.display = "block";
  achievementsList.innerHTML = "";
  currentAchievements.forEach(ach => {
    const badge = document.createElement("div");
    badge.className = "achievement-badge";
    badge.textContent = ach;
    achievementsList.appendChild(badge);
  });
}

function startQuiz() {
  currentQuiz = 0;
  selectedAnswer = null;
  showExplanation = false;
  document.getElementById("quiz-modal").classList.add("active");
  showQuizQuestion();
}

function closeQuiz() {
  document.getElementById("quiz-modal").classList.remove("active");
}

function showQuizQuestion() {
  const quizBody = document.getElementById("quiz-body");
  const progress = document.getElementById("quiz-progress");
  const questionData = quizQuestions[currentQuiz];
  progress.textContent = `${currentQuiz + 1} de ${quizQuestions.length}`;
  if (!showExplanation) {
    quizBody.innerHTML = `<div class="quiz-question">${questionData.question}</div><div class="quiz-options">${questionData.options.map((option, index) => `<button class="quiz-option" onclick="handleQuizAnswer(${index})">${option}</button>`).join("")}</div>`;
  } else {
    const isCorrect = selectedAnswer === questionData.correct;
    quizBody.innerHTML = `<div class="quiz-explanation"><div class="quiz-result">${isCorrect ? "🎉" : "❌"}</div><h4 class="quiz-result-title">${isCorrect ? "Correto!" : "Incorreto!"}</h4><div class="quiz-explanation-text">${questionData.explanation}</div><button class="btn-primary" onclick="nextQuestion()">${currentQuiz < quizQuestions.length - 1 ? "Próxima Pergunta" : "Finalizar Teste"}</button></div>`;
  }
}

function handleQuizAnswer(answerIndex) {
  selectedAnswer = answerIndex;
  showExplanation = true;
  if (answerIndex === quizQuestions[currentQuiz].correct) {
    currentScore += 100;
    updateScore();
  }
  showQuizQuestion();
}

function nextQuestion() {
  if (currentQuiz < quizQuestions.length - 1) {
    currentQuiz++;
    selectedAnswer = null;
    showExplanation = false;
    showQuizQuestion();
  } else {
    closeQuiz();
    if (currentScore >= 700 && !currentAchievements.includes("Mestre do Conhecimento")) {
      currentAchievements.push("Mestre do Conhecimento");
      updateScore();
    }
    quizCompleted = true;
    checkGraduation();
  }
}

// --- SEÇÃO DO JOGO TOTALMENTE REESCRITA E CORRIGIDA ---

const GAME_DURATION_MS = 20000;
const TICK_MS = 16;
const SPAWN_INTERVAL_MS = 600;
const OBSTACLE_SPEED = 0.8;
const SHIP_STEP = 2.5;
const SHIP_MIN = 10;
const SHIP_MAX = 90;

let pressedKeys = { up: false, down: false };
let gameStartTime = 0;
let lastSpawnAt = 0;

function startGame() {
  gamePhase = "ready";
  shipPosition = 50;
  gameScore = 0;
  document.getElementById("game-modal").classList.add("active");
  showGameScreen();
}

function closeGame() {
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = null;
  document.getElementById("game-modal").classList.remove("active");
}

function showGameScreen() {
    const gameBody = document.getElementById("game-body");
    if (gamePhase === "ready") {
        gameBody.innerHTML = `
            <div class="game-ready">
                <div class="game-icon">🚀</div>
                <h4 class="game-title">Desvie dos Satélites!</h4>
                <p class="game-description">Use as teclas ↑ e ↓ (ou W/S) ou os botões para mover a nave. Sobreviva por 20 segundos para completar a missão!</p>
                <button class="btn-primary" onclick="playGame()">🚀 Iniciar Teste</button>
            </div>`;
    } else if (gamePhase === "playing") {
        gameBody.innerHTML = `
            <div class="game-stats"><span>Pontuação: 0</span><span id="game-timer">Tempo: 20s</span></div>
            <div class="game-area" id="game-area"><div class="game-ship" id="game-ship" style="top: ${shipPosition}%">🚀</div></div>
            <div class="game-controls">
                <button class="game-control-btn" data-control="up">↑ Subir</button>
                <button class="game-control-btn" data-control="down">↓ Descer</button>
            </div>
            <p class="game-instructions">Use as setas ↑↓ ou teclas W/S para controlar a nave</p>`;
        
        const upButton = gameBody.querySelector('[data-control="up"]');
        const downButton = gameBody.querySelector('[data-control="down"]');
        const startPress = (dir) => { if (gamePhase === 'playing') pressedKeys[dir] = true; };
        const endPress = (dir) => { pressedKeys[dir] = false; };
        upButton.addEventListener('mousedown', () => startPress('up'));
        upButton.addEventListener('mouseup', () => endPress('up'));
        upButton.addEventListener('mouseleave', () => endPress('up'));
        upButton.addEventListener('touchstart', (e) => { e.preventDefault(); startPress('up'); });
        upButton.addEventListener('touchend', () => endPress('up'));
        downButton.addEventListener('mousedown', () => startPress('down'));
        downButton.addEventListener('mouseup', () => endPress('down'));
        downButton.addEventListener('mouseleave', () => endPress('down'));
        downButton.addEventListener('touchstart', (e) => { e.preventDefault(); startPress('down'); });
        downButton.addEventListener('touchend', () => endPress('down'));

    } else if (gamePhase === "finished") {
        const isWin = (performance.now() - gameStartTime) >= GAME_DURATION_MS;
        gameBody.innerHTML = `
            <div class="game-finished">
                <div class="game-icon">${isWin ? "🏆" : "💥"}</div><h4 class="game-title">${isWin ? "Teste Concluído!" : "Nave Destruída!"}</h4>
                <p class="game-description">${isWin ? "Parabéns, piloto! Você provou suas habilidades!" : "Sua nave colidiu. A prática leva à perfeição!"}</p>
                <div class="game-result-box ${isWin ? "game-result-win" : "game-result-lose"}">
                    <p class="game-result-score">${isWin ? "+200 pontos conquistados!" : "Teste falhou"}</p>
                    <p class="game-result-final">Pontuação final: ${gameScore}</p>
                </div>
                <div class="game-buttons">
                    <button class="btn-game" onclick="startGame()">Tentar Novamente</button>
                    <button class="btn-secondary" onclick="closeGame()">Fechar</button>
                </div>
            </div>`;
    }
}

function playGame() {
  gamePhase = "playing";
  showGameScreen();
  obstacles = [];
  gameStartTime = performance.now();
  lastSpawnAt = gameStartTime;
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, TICK_MS);
}

function gameLoop() {
    if (gamePhase !== 'playing') return;
    const now = performance.now();
    if (now - gameStartTime >= GAME_DURATION_MS) {
        endGame(true);
        return;
    }
    if (pressedKeys.up) shipPosition = Math.max(SHIP_MIN, shipPosition - SHIP_STEP);
    if (pressedKeys.down) shipPosition = Math.min(SHIP_MAX, shipPosition + SHIP_STEP);
    if (now - lastSpawnAt >= SPAWN_INTERVAL_MS) {
        const newObstacle = { id: now, x: 100, y: Math.random() * 80 + 10, element: null };
        const el = document.createElement("div");
        el.id = `obs-${newObstacle.id}`;
        el.className = "game-obstacle";
        el.style.top = `${newObstacle.y}%`;
        el.style.left = `${newObstacle.x}%`;
        el.textContent = "🛰️";
        newObstacle.element = el;
        obstacles.push(newObstacle);
        document.getElementById("game-area").appendChild(el);
        lastSpawnAt = now;
    }
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= OBSTACLE_SPEED;
        if (obs.x < -10) {
            obs.element.remove();
            obstacles.splice(i, 1);
        } else {
            obs.element.style.left = `${obs.x}%`;
        }
    }
    const collided = obstacles.some(obs => obs.x < 12 && obs.x > 2 && Math.abs(obs.y - shipPosition) < 6);
    if (collided) {
        endGame(false);
        return;
    }
    gameScore++;
    updateGameVisuals();
}

function updateGameVisuals() {
    document.getElementById("game-ship").style.top = `${shipPosition}%`;
    const remaining = Math.max(0, GAME_DURATION_MS - (performance.now() - gameStartTime));
    document.getElementById("game-timer").textContent = `Tempo: ${Math.ceil(remaining / 1000)}s`;
    document.querySelector(".game-stats span:first-child").textContent = `Pontuação: ${gameScore}`;
}

function endGame(won) {
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = null;
    gamePhase = "finished";
    if (won) {
        currentScore += 200;
        if (!currentAchievements.includes("Piloto Espacial")) {
            currentAchievements.push("Piloto Espacial");
        }
        updateScore();
    }
    gameCompleted = true;
    checkGraduation();
    showGameScreen();
}

function setupKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      if (gamePhase !== "playing") return;
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") { e.preventDefault(); pressedKeys.up = true; } 
      else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") { e.preventDefault(); pressedKeys.down = true; }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") { pressedKeys.up = false; } 
      else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") { pressedKeys.down = false; }
    });
}

function checkGraduation() {
  if (quizCompleted && gameCompleted) {
    const achievementsSection = document.getElementById('achievements-section');
    achievementsSection.style.display = 'block';
    achievementsSection.classList.remove('locked-section');
    achievementsSection.classList.add('unlocked');
    const achievementsList = document.getElementById('achievements-list');
    showAchievements();
    achievementsList.innerHTML += `
      <div class="achievement-badge" style="background: linear-gradient(90deg, #10b981, #059669); width: 80%; text-align: center; border-radius: 16px; padding: 24px; cursor: default;">
        <p style="font-size: 1.5rem; margin-bottom: 10px; font-weight: bold;">CERTIFICADO DE CONCLUSÃO</p>
        <p style="margin-bottom: 16px;">Você completou a Jornada Espacial, provando seu valor e conhecimento. A fronteira final te aguarda!</p>
        <p style="font-size: 1.2rem; font-weight: bold;">Pontuação Final: ${currentScore}</p>
      </div>
    `;
    achievementsSection.scrollIntoView({ behavior: 'smooth' });
  }
}