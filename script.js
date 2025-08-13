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

const timelineEvents = [
  {
    date: "4 de Outubro, 1957",
    title: "Sputnik 1 - Primeiro Satélite Artificial",
    country: "URSS",
    image: "img/sputnik.jpg",
    description:
      "A União Soviética lança o primeiro satélite artificial da história, marcando o início da Era Espacial e surpreendendo o mundo.",
    details:
      "O Sputnik 1 pesava 83,6 kg e orbitou a Terra a cada 96,2 minutos. Seu lançamento causou o 'Susto do Sputnik' nos Estados Unidos, levando à criação da NASA em 1958.",
  },
  {
    date: "3 de Novembro, 1957",
    title: "Sputnik 2 - Laika, a Primeira Vida no Espaço",
    country: "URSS",
    image: "img/Laika.webp",
    description:
      "A cadela Laika se torna o primeiro ser vivo a orbitar a Terra, provando que organismos vivos podem sobreviver no espaço.",
    details:
      "Laika foi uma cadela vira-lata encontrada nas ruas de Moscou. Infelizmente, não havia planos para seu retorno, e ela morreu algumas horas após o lançamento devido ao superaquecimento.",
  },
  {
    date: "31 de Janeiro, 1958",
    title: "Explorer 1 - Primeira Resposta Americana",
    country: "EUA",
    image: "img/explorer1.jpg",
    description:
      "Os Estados Unidos lançam seu primeiro satélite, descobrindo os cinturões de radiação de Van Allen ao redor da Terra.",
    details:
      "O Explorer 1 foi desenvolvido pela equipe de Wernher von Braun. Sua descoberta dos cinturões de radiação foi uma importante contribuição científica que ajudou no planejamento de futuras missões espaciais.",
  },
  {
    date: "12 de Abril, 1961",
    title: "Yuri Gagarin - Primeiro Homem no Espaço",
    country: "URSS",
    image: "img/yuri.jpg",
    description:
      "Yuri Gagarin completa uma órbita completa ao redor da Terra na nave Vostok 1, tornando-se o primeiro ser humano no espaço.",
    details:
      "O voo durou 108 minutos. Gagarin disse a famosa frase 'A Terra é azul!' e se tornou um herói mundial. Sua missão provou que humanos podiam sobreviver e funcionar no espaço.",
  },
  {
    date: "5 de Maio, 1961",
    title: "Alan Shepard - Primeiro Americano no Espaço",
    country: "EUA",
    image: "img/alan.webp",
    description: "Alan Shepard realiza um voo suborbital de 15 minutos, tornando-se o primeiro americano no espaço.",
    details:
      "O voo da Freedom 7 atingiu uma altitude de 187 km. Embora mais curto que o voo de Gagarin, foi um marco importante para o programa espacial americano e aumentou a confiança dos EUA.",
  },
  {
    date: "16 de Junho, 1963",
    title: "Valentina Tereshkova - Primeira Mulher no Espaço",
    country: "URSS",
    image: "img/valentinaa.webp",
    description:
      "Valentina Tereshkova se torna a primeira mulher a viajar para o espaço, completando 48 órbitas em 71 horas.",
    details:
      "Tereshkova era uma operária têxtil e paraquedista amadora. Sua seleção foi parte da propaganda soviética para mostrar igualdade de gênero. Ela permaneceu como a única mulher no espaço até 1982.",
  },
  {
    date: "18 de Março, 1965",
    title: "Alexei Leonov - Primeira Caminhada Espacial",
    country: "URSS",
    image: "img/alexei.webp",
    description:
      "Alexei Leonov realiza a primeira atividade extraveicular da história, permanecendo fora da nave por 12 minutos.",
    details:
      "A caminhada quase terminou em tragédia quando o traje de Leonov inflou no vácuo, dificultando seu retorno à nave. Ele teve que reduzir a pressão do traje para conseguir entrar pela escotilha.",
  },
  {
    date: "21 de Dezembro, 1968",
    title: "Apollo 8 - Primeira Órbita Lunar Tripulada",
    country: "EUA",
    image: "img/apollo8.jpg",
    description:
      "A Apollo 8 se torna a primeira missão tripulada a deixar a órbita terrestre e orbitar a Lua, capturando a icônica foto 'Earthrise'.",
    details:
      "A missão foi uma resposta ousada aos sucessos soviéticos. Os astronautas Frank Borman, James Lovell e William Anders leram trechos do Gênesis na véspera de Natal, em uma transmissão assistida por milhões.",
  },
  {
    date: "20 de Julho, 1969",
    title: "Apollo 11 - Primeiro Homem na Lua",
    country: "EUA",
    image: "img/apollo11.webp",
    description:
      "Neil Armstrong e Buzz Aldrin se tornam os primeiros humanos a pisar na Lua, cumprindo a promessa de Kennedy.",
    details:
      "'Um pequeno passo para o homem, um salto gigante para a humanidade.' As palavras de Armstrong ecoaram pelo mundo. A missão foi assistida por cerca de 650 milhões de pessoas na TV, marcando a vitória americana na corrida espacial.",
  },
  {
    date: "19 de Abril, 1971",
    title: "Salyut 1 - Primeira Estação Espacial",
    country: "URSS",
    image: "img/52.jpg",
    description:
      "A URSS lança a primeira estação espacial da história, iniciando a era da presença humana permanente no espaço.",
    details:
      "Embora a primeira tripulação tenha morrido durante o retorno devido a uma despressurização, a Salyut 1 estabeleceu o conceito de laboratório orbital que seria desenvolvido nas décadas seguintes.",
  },
  {
    date: "17 de Julho, 1975",
    title: "Projeto Apollo-Soyuz - Fim da Corrida Espacial",
    country: "EUA & URSS",
    image: "img/a.jpg",
    description:
      "Astronautas americanos e cosmonautas soviéticos se encontram no espaço, simbolizando o fim da corrida espacial e o início da cooperação.",
    details:
      "O aperto de mãos entre Thomas Stafford e Alexei Leonov no espaço marcou uma nova era de cooperação internacional. Este projeto pavimentou o caminho para futuras colaborações como a Estação Espacial Internacional.",
  },
]

const quizQuestions = [
  {
    question: "Qual foi o primeiro satélite artificial lançado ao espaço?",
    options: ["Explorer 1", "Sputnik 1", "Vanguard 1", "Luna 1"],
    correct: 1,
    explanation:
      "O Sputnik 1 foi lançado pela URSS em 4 de outubro de 1957, pesava 83,6 kg e orbitou a Terra a cada 96,2 minutos, causando o 'Susto do Sputnik' nos EUA!",
  },
  {
    question: "Qual animal foi o primeiro ser vivo a orbitar a Terra?",
    options: ["Laika (cadela)", "Ham (chimpanzé)", "Albert II (macaco)", "Félicette (gata)"],
    correct: 0,
    explanation:
      "Laika, uma cadela vira-lata de Moscou, foi lançada no Sputnik 2 em 3 de novembro de 1957. Infelizmente, não havia planos para seu retorno.",
  },
  {
    question: "Qual foi o primeiro satélite americano lançado com sucesso?",
    options: ["Vanguard 1", "Explorer 1", "Pioneer 1", "Telstar 1"],
    correct: 1,
    explanation:
      "O Explorer 1 foi lançado em 31 de janeiro de 1958, desenvolvido pela equipe de Wernher von Braun, e descobriu os cinturões de radiação de Van Allen.",
  },
  {
    question: "Quem foi o primeiro ser humano no espaço?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
    correct: 2,
    explanation:
      "Yuri Gagarin completou uma órbita ao redor da Terra em 12 de abril de 1961 na nave Vostok 1, dizendo a famosa frase 'A Terra é azul!'",
  },
  {
    question: "Quem foi o primeiro americano no espaço?",
    options: ["John Glenn", "Alan Shepard", "Gus Grissom", "Scott Carpenter"],
    correct: 1,
    explanation:
      "Alan Shepard realizou um voo suborbital de 15 minutos em 5 de maio de 1961 na Freedom 7, atingindo uma altitude de 187 km.",
  },
  {
    question: "Quem foi a primeira mulher no espaço?",
    options: ["Sally Ride", "Valentina Tereshkova", "Mae Jemison", "Svetlana Savitskaya"],
    correct: 1,
    explanation:
      "Valentina Tereshkova, operária têxtil e paraquedista, completou 48 órbitas em 71 horas em 16 de junho de 1963, permanecendo como única mulher no espaço até 1982.",
  },
  {
    question: "Quem realizou a primeira caminhada espacial?",
    options: ["Ed White", "Alexei Leonov", "Neil Armstrong", "John Glenn"],
    correct: 1,
    explanation:
      "Alexei Leonov permaneceu fora da nave por 12 minutos em 18 de março de 1965. Seu traje inflou no vácuo, quase impedindo seu retorno à nave!",
  },
  {
    question: "Qual missão foi a primeira a orbitar a Lua com tripulação?",
    options: ["Apollo 7", "Apollo 8", "Apollo 9", "Apollo 10"],
    correct: 1,
    explanation:
      "A Apollo 8 em 21 de dezembro de 1968 foi a primeira missão tripulada a deixar a órbita terrestre e orbitar a Lua, capturando a icônica foto 'Earthrise'.",
  },
  {
    question: "Em que ano o homem pisou na Lua pela primeira vez?",
    options: ["1967", "1968", "1969", "1970"],
    correct: 2,
    explanation:
      "Neil Armstrong e Buzz Aldrin pisaram na Lua em 20 de julho de 1969 durante a Apollo 11. 'Um pequeno passo para o homem, um salto gigante para a humanidade!'",
  },
  {
    question: "Qual missão marcou o fim oficial da corrida espacial?",
    options: ["Apollo 17", "Skylab", "Apollo-Soyuz", "Salyut 1"],
    correct: 2,
    explanation:
      "O Projeto Apollo-Soyuz em 17 de julho de 1975 simbolizou o fim da corrida espacial com o aperto de mãos entre Thomas Stafford e Alexei Leonov no espaço.",
  },
]

document.addEventListener("DOMContentLoaded", () => {
  createStars()
  generateTimeline()
  updateScore()
  setupKeyboardControls()
})

function createStars() {
  const starsContainer = document.getElementById("stars")
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div")
    star.className = "star"
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.animationDelay = Math.random() * 2 + "s"
    starsContainer.appendChild(star)
  }
}

function generateTimeline() {
  const timeline = document.getElementById("timeline")

  timelineEvents.forEach((event, index) => {
    const eventElement = document.createElement("div")
    eventElement.className = "timeline-event"

    const countryClass =
      event.country === "URSS" ? "country-ussr" : event.country === "EUA" ? "country-usa" : "country-both"

    eventElement.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-card" onclick="toggleEventDetails(${index})">
                    <div class="timeline-card-content">
                        <div class="timeline-meta">
                            <span class="country-badge ${countryClass}">${event.country}</span>
                            <span class="timeline-date">${event.date}</span>
                        </div>
                        <h3 class="timeline-title">${event.title}</h3>
                        <img src="${event.image}" alt="${event.title}" class="timeline-image">
                        <p class="timeline-description">${event.description}</p>
                        <button class="details-btn">Ver mais detalhes</button>
                        <div class="timeline-details" id="details-${index}" style="display: none;">
                            <p>${event.details}</p>
                        </div>
                    </div>
                </div>
            </div>
        `

    timeline.appendChild(eventElement)
  })
}

function toggleEventDetails(index) {
  const details = document.getElementById(`details-${index}`)
  if (details.style.display === "none") {
    details.style.display = "block"
  } else {
    details.style.display = "none"
  }
}

function scrollToVideo() {
  document.getElementById("video-section").scrollIntoView({ behavior: "smooth" })
}

function scrollToTimeline() {
  document.getElementById("timeline-section").scrollIntoView({ behavior: "smooth" })
}

function updateScore() {
  document.getElementById("score").textContent = currentScore + " pontos"
  document.getElementById("achievements").textContent = currentAchievements.length + " conquistas"

  if (currentAchievements.length > 0) {
    showAchievements()
  }
}

function showAchievements() {
  const achievementsSection = document.getElementById("achievements-section")
  const achievementsList = document.getElementById("achievements-list")

  achievementsSection.style.display = "block"
  achievementsList.innerHTML = ""

  currentAchievements.forEach((achievement) => {
    const badge = document.createElement("div")
    badge.className = "achievement-badge"
    badge.textContent = achievement
    achievementsList.appendChild(badge)
  })
}

function startQuiz() {
  currentQuiz = 0
  selectedAnswer = null
  showExplanation = false
  document.getElementById("quiz-modal").classList.add("active")
  showQuizQuestion()
}

function closeQuiz() {
  document.getElementById("quiz-modal").classList.remove("active")
}

function showQuizQuestion() {
  const quizBody = document.getElementById("quiz-body")
  const progress = document.getElementById("quiz-progress")

  progress.textContent = `${currentQuiz + 1} de ${quizQuestions.length}`

  if (!showExplanation) {
    quizBody.innerHTML = `
            <div class="quiz-question">${quizQuestions[currentQuiz].question}</div>
            <div class="quiz-options">
                ${quizQuestions[currentQuiz].options
                  .map(
                    (option, index) =>
                      `<button class="quiz-option" onclick="handleQuizAnswer(${index})">${option}</button>`,
                  )
                  .join("")}
            </div>
        `
  } else {
    const isCorrect = selectedAnswer === quizQuestions[currentQuiz].correct
    quizBody.innerHTML = `
            <div class="quiz-explanation">
                <div class="quiz-result">${isCorrect ? "🎉" : "❌"}</div>
                <h4 class="quiz-result-title">${isCorrect ? "Correto!" : "Incorreto!"}</h4>
                <div class="quiz-explanation-text">${quizQuestions[currentQuiz].explanation}</div>
                <button class="btn-primary" onclick="nextQuestion()">
                    ${currentQuiz < quizQuestions.length - 1 ? "Próxima Pergunta" : "Finalizar Quiz"}
                </button>
            </div>
        `
  }
}

function handleQuizAnswer(answerIndex) {
  selectedAnswer = answerIndex
  showExplanation = true

  if (answerIndex === quizQuestions[currentQuiz].correct) {
    currentScore += 100
    updateScore()
  }

  showQuizQuestion()
}

function nextQuestion() {
  if (currentQuiz < quizQuestions.length - 1) {
    currentQuiz++
    selectedAnswer = null
    showExplanation = false
    showQuizQuestion()
  } else {
    closeQuiz()
    if (currentScore >= 700 && !currentAchievements.includes("Mestre do Conhecimento")) {
      currentAchievements.push("Mestre do Conhecimento")
      updateScore()
    }
    currentQuiz = 0
    selectedAnswer = null
    showExplanation = false
  }
}

const GAME_DURATION_MS = 20000; 
const TICK_MS = 16;             
const SPAWN_INTERVAL_MS = 600;  
const OBSTACLE_SPEED = 1.0;     
const SHIP_STEP = 2.5;          
const SHIP_MIN = 10;            
const SHIP_MAX = 90;

let pressedKeys = { up: false, down: false };
let gameStartTime = 0;
let lastSpawnAt = 0;

function startGame() {
  gamePhase = "ready";
  shipPosition = 50;
  obstacles = [];
  gameScore = 0;

  document.getElementById("game-modal").classList.add("active");
  showGameScreen();
}

function closeGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
  document.getElementById("game-modal").classList.remove("active");
}

function showGameScreen() {
  const gameBody = document.getElementById("game-body");

  if (gamePhase === "ready") {
    gameBody.innerHTML = `
      <div class="game-ready">
        <div class="game-icon">🚀</div>
        <h4 class="game-title">Desvie dos Satélites!</h4>
        <p class="game-description">
          Use as teclas ↑ e ↓ (ou W/S) ou os botões para mover a nave. 
          Sobreviva por 20 segundos para completar a missão!
        </p>
        <button class="btn-primary" onclick="playGame()">🚀 Iniciar Missão</button>
      </div>
    `;
  } else if (gamePhase === "playing") {
    gameBody.innerHTML = `
      <div class="game-stats">
        <span>Pontuação: ${gameScore}</span>
        <span id="game-timer">Tempo: 20s</span>
      </div>
      <div class="game-area" id="game-area">
        <div class="game-ship" id="game-ship" style="top: ${shipPosition}%">🚀</div>
      </div>
      <div class="game-controls">
        <button class="game-control-btn" onclick="moveShip('up')">↑ Subir</button>
        <button class="game-control-btn" onclick="moveShip('down')">↓ Descer</button>
      </div>
      <p class="game-instructions">Use as setas ↑↓ ou teclas W/S para controlar a nave</p>
    `;


    const gameArea = document.getElementById("game-area");
    for (let i = 0; i < 10; i++) {
      const star = document.createElement("div");
      star.className = "game-star moving-star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      gameArea.appendChild(star);
    }
  } else if (gamePhase === "finished") {
    const isWin = (performance.now() - gameStartTime) >= GAME_DURATION_MS;
    gameBody.innerHTML = `
      <div class="game-finished">
        <div class="game-icon">${isWin ? "🏆" : "💥"}</div>
        <h4 class="game-title">${isWin ? "Missão Concluída!" : "Foguete Destruído!"}</h4>
        <p class="game-description">
          ${isWin
            ? "Parabéns, piloto! Você desviou de satélites por 20 segundos!"
            : "Seu foguete colidiu com um satélite. Tente novamente!"}
        </p>
        <div class="game-result-box ${isWin ? "game-result-win" : "game-result-lose"}">
          <p class="game-result-score">${isWin ? "+200 pontos conquistados!" : "Missão falhada"}</p>
          <p class="game-result-final">Pontuação final: ${gameScore}</p>
        </div>
        <div class="game-buttons">
          <button class="btn-game" onclick="startGame()">Nova Missão</button>
          <button class="btn-secondary" onclick="closeGame()">Fechar</button>
        </div>
      </div>
    `;
  }
}

function playGame() {
  gamePhase = "playing";
  showGameScreen();

  obstacles = [];
  gameScore = 0;
  gameStartTime = performance.now();
  lastSpawnAt = gameStartTime - SPAWN_INTERVAL_MS;

  obstacles.push({ id: Date.now(), x: 100, y: Math.random() * 70 + 15 });

  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, TICK_MS);
}

function gameLoop() {
  const now = performance.now();
  const elapsed = now - gameStartTime;

  if (pressedKeys.up) shipPosition = Math.max(SHIP_MIN, shipPosition - SHIP_STEP);
  if (pressedKeys.down) shipPosition = Math.min(SHIP_MAX, shipPosition + SHIP_STEP);

  if (now - lastSpawnAt >= SPAWN_INTERVAL_MS) {
    obstacles.push({ id: now, x: 100, y: Math.random() * 70 + 15 });
    lastSpawnAt = now;
  }

  obstacles = obstacles
    .map(obs => ({ ...obs, x: obs.x - OBSTACLE_SPEED }))
    .filter(obs => obs.x > -10);

  const collided = obstacles.some(obs => obs.x < 10 && obs.x > 2 && Math.abs(obs.y - shipPosition) < 6);
  if (collided) {
    endGame(false);
    return;
  }

  gameScore += 1;

  updateGameDisplay(now);

  if (elapsed >= GAME_DURATION_MS) {
    endGame(true);
  }
}

function endGame(won) {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
  gamePhase = "finished";
  if (won) {
    currentScore += 200;
    if (!currentAchievements.includes("Piloto Espacial")) {
      currentAchievements.push("Piloto Espacial");
    }
    updateScore();
  }
  showGameScreen();
}

function updateGameDisplay(now = performance.now()) {
  const gameArea = document.getElementById("game-area");
  if (!gameArea) return;

  const ship = document.getElementById("game-ship");
  if (ship) ship.style.top = shipPosition + "%";

  const timer = document.getElementById("game-timer");
  if (timer && gamePhase === "playing") {
    const remaining = Math.max(0, GAME_DURATION_MS - (now - gameStartTime));
    const secs = Math.ceil(remaining / 1000);
    timer.textContent = `Tempo: ${secs}s`;
  }

  const stats = document.querySelectorAll(".game-stats span");
  if (stats.length >= 1) stats[0].textContent = `Pontuação: ${gameScore}`;

  gameArea.querySelectorAll(".game-obstacle").forEach(n => n.remove());
  obstacles.forEach(obstacle => {
    const el = document.createElement("div");
    el.className = "game-obstacle";
    el.style.left = obstacle.x + "%";
    el.style.top = obstacle.y + "%";
    el.textContent = "🛰️";
    gameArea.appendChild(el);
  });
}

function moveShip(direction) {
  if (gamePhase !== "playing") return;
  if (direction === "up") {
    shipPosition = Math.max(SHIP_MIN, shipPosition - SHIP_STEP * 2);
  } else if (direction === "down") {
    shipPosition = Math.min(SHIP_MAX, shipPosition + SHIP_STEP * 2);
  }
}

function setupKeyboardControls() {
  document.onkeydown = null;
  document.onkeyup = null;

  document.addEventListener("keydown", (e) => {
    if (gamePhase !== "playing") return;

    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
      e.preventDefault();
      pressedKeys.up = true;
    } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
      e.preventDefault();
      pressedKeys.down = true;
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
      pressedKeys.up = false;
    } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
      pressedKeys.down = false;
    }
  });
}
