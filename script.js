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
let quizDifficulty = 'medio';
let gameDifficulty = 'medio';
let correctQuizAnswers = 0;

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

const quizQuestionsFacil = [
    { question: "Qual país lançou o primeiro satélite, o Sputnik 1?", options: ["EUA", "China", "URSS", "Reino Unido"], correct: 2, explanation: "A União Soviética (URSS) lançou o Sputnik 1 em 1957, dando início à Corrida Espacial." },
    { question: "Quem foi o primeiro ser humano a pisar na Lua?", options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Michael Collins"], correct: 1, explanation: "Neil Armstrong, comandante da Apollo 11, foi o primeiro humano a pisar na Lua em 1969." },
    { question: "Qual era o nome da missão que levou o primeiro homem à Lua?", options: ["Apollo 10", "Apollo 11", "Gemini 7", "Mercury 5"], correct: 1, explanation: "A missão Apollo 11 da NASA foi a responsável pelo feito histórico em 20 de julho de 1969." },
    { question: "Qual animal foi o primeiro ser vivo a orbitar a Terra?", options: ["Macaco", "Gato", "Cachorro", "Rato"], correct: 2, explanation: "A cadela Laika foi o primeiro ser vivo a orbitar o planeta a bordo da nave soviética Sputnik 2." },
    { question: "Quem foi a primeira mulher no espaço?", options: ["Sally Ride", "Valentina Tereshkova", "Mae Jemison", "Judith Resnik"], correct: 1, explanation: "A cosmonauta soviética Valentina Tereshkova se tornou a primeira mulher no espaço em 1963." }
];

const quizQuestionsMedio = [
    { question: "Qual foi a principal descoberta científica do primeiro satélite americano, o Explorer 1?", options: ["Água em Marte", "Anéis de Saturno", "Cinturões de Van Allen", "Ventos solares"], correct: 2, explanation: "O Explorer 1 descobriu os cinturões de radiação que rodeiam a Terra, nomeados em homenagem a James Van Allen." },
    { question: "Qual cosmonauta realizou a primeira caminhada espacial (EVA)?", options: ["Yuri Gagarin", "Gherman Titov", "Alexei Leonov", "Pavel Belyayev"], correct: 2, explanation: "Alexei Leonov realizou a primeira atividade extraveicular em 1965, flutuando fora da nave Voskhod 2 por 12 minutos." },
    { question: "Qual missão da Apollo foi a primeira a orbitar a Lua com tripulação?", options: ["Apollo 7", "Apollo 8", "Apollo 9", "Apollo 10"], correct: 1, explanation: "A missão Apollo 8, em dezembro de 1968, foi a primeira a levar humanos para a órbita lunar." },
    { question: "Qual foi a primeira estação espacial lançada com sucesso?", options: ["Skylab", "Mir", "Salyut 1", "Estação Espacial Internacional"], correct: 2, explanation: "A Salyut 1, lançada pela União Soviética em 1971, foi a primeira estação espacial da história." },
    { question: "O Projeto de Teste Apollo-Soyuz, em 1975, marcou um momento de colaboração entre quais duas nações?", options: ["EUA e China", "EUA e URSS", "URSS e Japão", "EUA e Reino Unido"], correct: 1, explanation: "A missão conjunta Apollo-Soyuz foi um símbolo do fim da Corrida Espacial, unindo astronautas americanos e cosmonautas soviéticos." }
];

const quizQuestionsDificil = [
    { question: "Qual foi o nome do programa que precedeu o Projeto Apollo e que foi crucial para o desenvolvimento de técnicas de encontro e acoplagem espacial?", options: ["Programa Mercury", "Programa Gemini", "Programa Skylab", "Programa Vanguard"], correct: 1, explanation: "O Programa Gemini foi fundamental para testar manobras e tecnologias essenciais para o sucesso das missões Apollo." },
    { question: "A tragédia da Apollo 1, que vitimou três astronautas, ocorreu durante qual tipo de evento?", options: ["Lançamento", "Reentrada na atmosfera", "Um teste de lançamento na plataforma", "Caminhada espacial"], correct: 2, explanation: "Um incêndio na cabine durante um ensaio de lançamento em 27 de janeiro de 1967 causou a morte dos astronautas Gus Grissom, Ed White e Roger Chaffee." },
    { question: "Qual era o nome do módulo lunar que pousou na Lua durante a missão Apollo 11?", options: ["Columbia", "Challenger", "Eagle", "Odyssey"], correct: 2, explanation: "O Módulo Lunar 'Eagle' (Águia) transportou Armstrong e Aldrin para a superfície lunar, enquanto Michael Collins orbitava no Módulo de Comando 'Columbia'." },
    { question: "A primeira tripulação da estação espacial Salyut 1 teve um fim trágico. Qual foi a causa do acidente?", options: ["Explosão no retorno", "Colisão com um satélite", "Despressurização da cápsula Soyuz", "Falta de suprimentos"], correct: 2, explanation: "A tripulação da Soyuz 11 morreu devido à despressurização da cápsula durante os preparativos para a reentrada, após uma estadia bem-sucedida na Salyut 1." },
    { question: "Qual engenheiro-chefe, ex-cientista alemão, foi uma figura central no desenvolvimento do foguete Saturn V da NASA?", options: ["Robert Goddard", "Hermann Oberth", "Wernher von Braun", "Sergei Korolev"], correct: 2, explanation: "Wernher von Braun e sua equipe foram fundamentais para o programa espacial americano, desenvolvendo o poderoso foguete Saturn V que levou as missões Apollo à Lua." }
];

let currentQuestions = [];

const archiveItems = [
    {
        id: 1,
        title: "Sergei Korolev, o 'Designer-Chefe'",
        cost: 250,
        image: "https://static.mk.ru/upload/entities/2021/01/13/17/articles/detailPicture/4c/42/86/af/fb3b895cde9c03be97afe6dd2c0ffeb4.jpg",
        content: "O sucesso inicial da URSS deve-se a Sergei Korolev. Sua identidade foi mantida em segredo, sendo conhecido apenas como 'Designer-Chefe'. Sua morte prematura em 1966 foi um golpe duro para o programa lunar soviético.",
        unlocked: false
    },
    {
        id: 2,
        title: "O Foguete Saturn V",
        cost: 300,
        image: "https://ogimg.infoglobo.com.br/brasil/homem-na-lua-50-anos/23810377-092-be2/FT1086A/760/imagem-lancamento-saturno-v.jpg",
        content: "A peça central do programa Apollo, o Saturn V, continua sendo o foguete mais potente já construído. Com 111 metros de altura, foi projetado pela equipe de Wernher von Braun e teve um histórico de 13 voos sem falhas.",
        unlocked: false
    },
    {
        id: 3,
        title: "O Programa Buran",
        cost: 400,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Buran_on_An-225_%28Le_Bourget_1989%29_1.JPEG/330px-Buran_on_An-225_%28Le_Bourget_1989%29_1.JPEG",
        content: "A resposta soviética ao Ônibus Espacial foi o Buran. Capaz de voar de forma totalmente automática, ele realizou um voo orbital não tripulado bem-sucedido em 1988, mas o programa foi cancelado por falta de fundos.",
        unlocked: false
    },
    {
        id: 4,
        title: "O 'Quase Desastre' da Apollo 11",
        cost: 350,
        image: "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/17DAB/production/_90470779_apollo11montagem.jpg.webp",
        content: "Durante a descida final na Lua, o computador do Módulo Lunar disparou alarmes de sobrecarga. Neil Armstrong assumiu o controle manual, desviando de uma cratera e pousando com menos de 30 segundos de combustível restante.",
        unlocked: false
    },
    {
        id: 5,
        title: "O Foguete N1: O Sonho Lunar Soviético",
        cost: 450,
        image: "https://i.redd.it/bf3fo96d8as21.jpg",
        content: "O N1 era a contraparte soviética do Saturn V. Infelizmente, o projeto foi atormentado por falhas de motor. Todos os quatro lançamentos de teste terminaram em explosões catastróficas, sendo um dos maiores reveses do programa espacial da URSS.",
        unlocked: false
    },
    {
        id: 6,
        title: "Apollo 13: O 'Fracasso Bem-Sucedido'",
        cost: 325,
        image: "https://media.licdn.com/dms/image/v2/D4D12AQG_n8urgm1qlA/article-cover_image-shrink_600_2000/B4DZYp8qUJHwAQ-/0/1744460490504?e=2147483647&v=beta&t=HgRBevL9hL3Fie0Q_qse69qBJJ_VINOjmgMvVF5Hjnk",
        content: "Após a explosão de um tanque de oxigênio a caminho da Lua, a missão se tornou uma luta pela sobrevivência. Usando o Módulo Lunar como 'bote salva-vidas', a equipe em terra e os astronautas improvisaram soluções para trazer a tripulação de volta em segurança.",
        unlocked: false
    },
    {
        id: 7,
        title: "O Veículo Lunar Roving (LRV)",
        cost: 275,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Apollo15LunarRover.jpg/960px-Apollo15LunarRover.jpg",
        content: "Usado nas últimas três missões Apollo, o 'jipe lunar' permitiu que os astronautas explorassem áreas muito maiores da superfície lunar. Este veículo elétrico dobrável foi um feito de engenharia, expandindo enormemente o alcance científico das missões.",
        unlocked: false
    },
    {
        id: 8,
        title: "As Primeiras Fotos de Vênus",
        cost: 425,
        image: "https://spacetoday.com.br/wp-content/uploads/2014/02/724700main_venus_full_full.jpg",
        content: "Enquanto a corrida para a Lua estava no auge, a URSS focou em outro alvo: Vênus. O programa Venera conseguiu o feito incrível de pousar várias sondas na superfície infernal do planeta, transmitindo as primeiras e únicas imagens já feitas de lá.",
        unlocked: false
    },
    {
        id: 9,
        title: "A Seleção de Valentina Tereshkova",
        cost: 375,
        image: "https://s4.static.brasilescola.uol.com.br/be/2021/06/valentina-tereshkova-be.jpg",
        content: "Para ser a primeira mulher no espaço, Tereshkova não era uma piloto de testes, mas sim uma operária têxtil e paraquedista amadora. Sua habilidade com paraquedas foi crucial, já que os primeiros cosmonautas ejetavam da cápsula e pousavam separadamente.",
        unlocked: false
    }
];

const mysteriousFragments = [
    {
        id: 1,
        title: "Fragmento Alfa",
        icon: "📚",
        hint: "Desbloqueie todos os 9 arquivos da Corrida Espacial para encontrar esta peça.",
        unlocked: false
    },
    {
        id: 2,
        title: "Fragmento Beta",
        icon: "🧠",
        hint: "Domine o conhecimento. Obtenha uma pontuação perfeita no Teste de Conhecimento na dificuldade Difícil.",
        unlocked: false
    },
    {
        id: 3,
        title: "Fragmento Gama",
        icon: "🚀",
        hint: "Prove sua perícia de piloto. Conclua com sucesso o Teste de Pilotagem na dificuldade Difícil.",
        unlocked: false
    }
];

document.addEventListener("DOMContentLoaded", () => {
  createStars();
  generateTimeline();
  generateArchive();
  generateMysteriousFragmentSection();
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
  
  const archiveSection = document.getElementById('archive-section');
  archiveSection.classList.remove('locked-section');
  archiveSection.classList.add('unlocked');

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

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function generateMysteriousFragmentSection() {
    const fragmentGrid = document.getElementById('fragment-grid');
    fragmentGrid.innerHTML = '';
    mysteriousFragments.forEach(fragment => {
        const card = document.createElement('div');
        card.className = `fragment-card ${fragment.unlocked ? 'unlocked' : ''}`;
        
        let content = `
            <div class="fragment-icon">${fragment.unlocked ? '✅' : fragment.icon}</div>
            <h4 class="fragment-title">${fragment.title} ${fragment.unlocked ? '(Encontrado)' : ''}</h4>
        `;
        
        if (!fragment.unlocked) {
            content += `<p class="fragment-hint">${fragment.hint}</p>`;
        }

        card.innerHTML = content;
        fragmentGrid.appendChild(card);
    });
}

function unlockFragment(id) {
    const fragment = mysteriousFragments.find(f => f.id === id);
    if (fragment && !fragment.unlocked) {
        fragment.unlocked = true;
        showToast(`Fragmento Misterioso "${fragment.title}" Encontrado!`);
        generateMysteriousFragmentSection();
        
        const allUnlocked = mysteriousFragments.every(f => f.unlocked);
        if (allUnlocked) {
            setTimeout(() => {
                showFinalReveal();
            }, 1000);
        }
    }
}

function showFinalReveal() {
    document.getElementById('final-reveal-modal').classList.add('active');
}

function closeFinalReveal() {
    document.getElementById('final-reveal-modal').classList.remove('active');
}

function generateArchive() {
    const archiveGrid = document.getElementById('archive-grid');
    archiveGrid.innerHTML = ''; 

    archiveItems.forEach(item => {
        const card = document.createElement('div');
        card.className = `archive-card ${item.unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="locked-overlay">
                <h3 class="archive-title-locked">${item.title}</h3>
                <p class="archive-cost">⭐ ${item.cost} Pontos</p>
                <button class="btn-unlock" onclick="unlockArchiveItem(${item.id})">Desbloquear</button>
            </div>
            <div class="unlocked-content">
                <img src="${item.image}" alt="${item.title}">
                <div class="unlocked-content-text">
                    <h3 class="archive-title-unlocked">${item.title}</h3>
                    <p class="archive-content-text">${item.content}</p>
                </div>
            </div>
        `;
        archiveGrid.appendChild(card);
    });
}

function unlockArchiveItem(itemId) {
    const item = archiveItems.find(i => i.id === itemId);
    if (!item) return;

    if (currentScore >= item.cost) {
        currentScore -= item.cost;
        item.unlocked = true;
        
        if (!currentAchievements.includes("Historiador Espacial")) {
            currentAchievements.push("Historiador Espacial");
        }

        updateScore();
        generateArchive();

        const allArchivesUnlocked = archiveItems.every(i => i.unlocked);
        if (allArchivesUnlocked) {
            document.getElementById('mysterious-fragment-section').style.display = 'block';
            unlockFragment(1);
        }

    } else {
        const scoreElement = document.getElementById('score-item');
        scoreElement.classList.add('shake-score');
        setTimeout(() => scoreElement.classList.remove('shake-score'), 500);
    }
}

function startQuiz(difficulty) {
  quizDifficulty = difficulty;
  correctQuizAnswers = 0;
  switch (difficulty) {
    case 'facil': currentQuestions = quizQuestionsFacil; break;
    case 'medio': currentQuestions = quizQuestionsMedio; break;
    case 'dificil': currentQuestions = quizQuestionsDificil; break;
  }
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
  const questionData = currentQuestions[currentQuiz];
  progress.textContent = `${currentQuiz + 1} de ${currentQuestions.length}`;
  if (!showExplanation) {
    quizBody.innerHTML = `<div class="quiz-question">${questionData.question}</div><div class="quiz-options">${questionData.options.map((option, index) => `<button class="quiz-option" onclick="handleQuizAnswer(${index})">${option}</button>`).join("")}</div>`;
  } else {
    const isCorrect = selectedAnswer === questionData.correct;
    quizBody.innerHTML = `<div class="quiz-explanation"><div class="quiz-result">${isCorrect ? "🎉" : "❌"}</div><h4 class="quiz-result-title">${isCorrect ? "Correto!" : "Incorreto!"}</h4><div class="quiz-explanation-text">${questionData.explanation}</div><button class="btn-primary" onclick="nextQuestion()">${currentQuiz < currentQuestions.length - 1 ? "Próxima Pergunta" : "Finalizar Teste"}</button></div>`;
  }
}

function handleQuizAnswer(answerIndex) {
  selectedAnswer = answerIndex;
  showExplanation = true;
  if (answerIndex === currentQuestions[currentQuiz].correct) {
    correctQuizAnswers++;
    let points = 0;
    if (quizDifficulty === 'facil') points = 50;
    if (quizDifficulty === 'medio') points = 100;
    if (quizDifficulty === 'dificil') points = 150;
    currentScore += points;
    updateScore();
  }
  showQuizQuestion();
}

function nextQuestion() {
  if (currentQuiz < currentQuestions.length - 1) {
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

    if (quizDifficulty === 'dificil' && correctQuizAnswers === currentQuestions.length) {
        unlockFragment(2);
    }

    checkGraduation();
  }
}


const GAME_DURATION_MS = 20000;
const TICK_MS = 16;
const SHIP_MIN = 10;
const SHIP_MAX = 90;

const gameDifficulties = {
    facil: { speed: 1.0, spawnInterval: 750, points: 200, shipStep: 2.5 },
    medio: { speed: 1.5, spawnInterval: 600, points: 300, shipStep: 2.8 },
    dificil: { speed: 2.0, spawnInterval: 450, points: 400, shipStep: 3.2 }
};

let pressedKeys = { up: false, down: false };
let gameStartTime = 0;
let lastSpawnAt = 0;

function startGame(difficulty) {
  gameDifficulty = difficulty;
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
    const modalTitle = document.getElementById("game-modal-title");
    modalTitle.textContent = `🚀 Teste de Pilotagem (${gameDifficulty.charAt(0).toUpperCase() + gameDifficulty.slice(1)})`;

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
        const settings = gameDifficulties[gameDifficulty];
        let resultText = '';

        if (isWin) {
            resultText = `+${gameScore} de sobrevivência + ${settings.points} de bônus!`;
        } else {
            resultText = `+${gameScore} pontos de sobrevivência`;
        }
        
        gameBody.innerHTML = `
            <div class="game-finished">
                <div class="game-icon">${isWin ? "🏆" : "💥"}</div><h4 class="game-title">${isWin ? "Teste Concluído!" : "Nave Destruída!"}</h4>
                <p class="game-description">${isWin ? "Parabéns, piloto! Você provou suas habilidades!" : "Sua nave colidiu. A prática leva à perfeição!"}</p>
                <div class="game-result-box ${isWin ? "game-result-win" : "game-result-lose"}">
                    <p class="game-result-score">${resultText}</p>
                    <p class="game-result-final">Pontuação desta tentativa: ${gameScore}</p>
                </div>
                <div class="game-buttons">
                    <button class="btn-game" onclick="startGame('${gameDifficulty}')">Tentar Novamente</button>
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
    const settings = gameDifficulties[gameDifficulty];
    if (now - gameStartTime >= GAME_DURATION_MS) {
        endGame(true);
        return;
    }
    if (pressedKeys.up) shipPosition = Math.max(SHIP_MIN, shipPosition - settings.shipStep);
    if (pressedKeys.down) shipPosition = Math.min(SHIP_MAX, shipPosition + settings.shipStep);
    if (now - lastSpawnAt >= settings.spawnInterval) {
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
        obs.x -= settings.speed;
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

    currentScore += gameScore;

    if (won) {
        const settings = gameDifficulties[gameDifficulty];
        currentScore += settings.points;
        if (!currentAchievements.includes("Piloto Espacial")) {
            currentAchievements.push("Piloto Espacial");
        }
        
        if (gameDifficulty === 'dificil') {
            unlockFragment(3);
        }
    }
    
    updateScore();
    
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