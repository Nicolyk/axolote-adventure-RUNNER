// Variáveis globais do jogo
let canvas, ctx;
let gameState = 'start'; // 'start', 'playing', 'victory', 'gameover'
let gameSpeed = 2;
let score = 0;
let bestScore = localStorage.getItem('axoloteBestScore') || 0;
let startTime;
let gameTime = 0;
let animationFrame = 0;

// Configurações do jogo (estilo runner)
const GAME_CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 400,
    GROUND_HEIGHT: 80, // Altura do chão a partir da base
    GRAVITY: 0.7,
    JUMP_FORCE: -16,
    DUCK_SPEED: 1.7 ,
    MAX_FALL_SPEED: 12,
    INITIAL_SPEED: 3,
    MAX_SPEED: 8,
    SPEED_INCREMENT: 0.002,
    TARGET_DISTANCE: 1000
};

// Objeto do jogador (Axolote) - Estilo Runner
const player = {
    x: 100, // Posição fixa horizontal
    y: GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - 60, // Posição inicial no chão
    width: 60,
    height: 40,
    velocityY: 0,
    isJumping: false,
    isDucking: false,
    onGround: true,
    sprite: null,
    currentFrame: 0,
    frameTimer: 0,
    animationState: 'running' // 'running', 'jumping', 'ducking'
};

// Arrays para obstáculos e partículas
let obstacles = [];
let particles = [];
let backgroundElements = [];

// Imagens do jogo
const images = {
    axolote: null,
    axoloteRunner: null,
    algasToxicas: null,
    pedraContaminada: null,
    detritoPlastico: null,
    coralMorto: null,
    bolhaGasToxico: null,
    backgroundRunner: null
};

// Mensagens de aprendizado para cada tipo de obstáculo
const learningMessages = {
    algasToxicas: "Aprendi sobre Tipos e Gêneros de Jogos! 🎮",
    pedraContaminada: "Entendi melhor Conhecendo o Computador! 💻",
    detritoPlastico: "Explorei a Teoria da Diversão! 🎯",
    coralMorto: "Dominei o uso das Cores! 🎨",
    bolhaGasToxico: "Criei minha própria Pixel Art! 🖼️",
    algasToxicas2: "Desenvolvi Algoritmos e Fluxogramas! 📊",
    pedraContaminada2: "Construí com HTML e CSS! 🌐",
    detritoPlastico2: "Programo com Loops, Arrays e Objects! 💾"
};

// Carregamento de imagens
function loadImages() {
    const imagePromises = [];
    
    const imageFiles = {
        axolote: 'assets/axolote_runner_animated.png',
        axoloteRunner: 'assets/axolote_runner_animated.png',
        algasToxicas: 'assets/algas_toxicas.png',
        pedraContaminada: 'assets/pedra_contaminada.png',
        detritoPlastico: 'assets/detrito_plastico.png',
        coralMorto: 'assets/coral_morto.png',
        bolhaGasToxico: 'assets/bolha_gas_toxico.png',
        backgroundRunner: 'assets/background_runner.png'
    };
    
    for (let key in imageFiles) {
        const img = new Image();
        img.src = imageFiles[key];
        images[key] = img;
        
        const promise = new Promise((resolve) => {
            img.onload = () => {
                console.log(`Imagem ${key} carregada com sucesso: ${img.src}`);
                resolve();
            };
            img.onerror = () => {
                console.error(`Erro ao carregar imagem ${key}: ${img.src}`);
                resolve(); // Continue mesmo se uma imagem falhar
            };
        });
    }
    
    return Promise.all(imagePromises);
}

// Inicialização do jogo
function initGame() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // Configurar canvas
    canvas.width = GAME_CONFIG.CANVAS_WIDTH;
    canvas.height = GAME_CONFIG.CANVAS_HEIGHT;
    
    // Carregar imagens e iniciar
    loadImages().then(() => {
        setupEventListeners();
        createBackgroundElements();
        gameLoop();
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Botões da interface
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('play-again-button').addEventListener('click', startGame);
    document.getElementById('retry-button').addEventListener('click', startGame);
    document.getElementById('menu-button').addEventListener('click', showStartScreen);
    document.getElementById('share-button').addEventListener('click', shareScore);
    
    // Controles do jogo
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Controles touch para mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('click', handleClick);
}

// Manipulação de teclas
function handleKeyDown(e) {
    if (gameState !== 'playing') return;
    
    switch(e.code) {
        case 'Space':
        case 'ArrowUp':
            e.preventDefault();
            jump();
            break;
        case 'ArrowDown':
            e.preventDefault();
            duck();
            break;
    }
}

function handleKeyUp(e) {
    if (gameState !== 'playing') return;
    
    switch(e.code) {
        case 'ArrowDown':
            e.preventDefault();
            stopDucking();
            break;
    }
}

// Controles touch e click
function handleTouch(e) {
    e.preventDefault();
    if (gameState === 'playing') {
        jump();
    }
}

function handleClick(e) {
    if (gameState === 'playing') {
        jump();
    }
}

// Ações do jogador (estilo runner)
function jump() {
    if (player.onGround && !player.isDucking) {
        player.velocityY = -18; // AUMENTA o salto aqui
        player.isJumping = true;
        player.onGround = false;
        player.animationState = 'jumping';
        createParticles(player.x, player.y + player.height, '#4ecdc4', 5);
    }
}



function duck() {
    if (player.onGround) {
        player.isDucking = true;
        player.animationState = 'ducking';
        player.height = 25; // Reduz altura para agachar
    } else {
        // Se estiver no ar, acelera a queda
        player.velocityY += GAME_CONFIG.DUCK_SPEED;
    }
}

function stopDucking() {
    if (player.isDucking) {
        player.isDucking = false;
        player.height = 40; // Volta altura normal
        player.animationState = 'running';
    }
}

// Função para exibir mensagens temporárias
function showLearningMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = text;
    messageDiv.classList.add('game-message', 'learning-message');
    document.body.appendChild(messageDiv);
    
    // Posicionar a mensagem no centro superior
    messageDiv.style.position = 'fixed';
    messageDiv.style.left = '50%';
    messageDiv.style.top = '20%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.zIndex = '1000';

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 2500); // Mensagem desaparece após 2.5 segundos
}

// Iniciar jogo
function startGame() {
    gameState = 'playing';
    score = 0;
    gameSpeed = GAME_CONFIG.INITIAL_SPEED;
    startTime = Date.now();
    
    // Reset do jogador
    player.x = 100;
    player.y = GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - 60;
    player.width = 60;
    player.height = 40;
    player.velocityY = 0;
    player.isJumping = false;
    player.isDucking = false;
    player.onGround = true;
    player.currentFrame = 0;
    player.frameTimer = 0;
    player.animationState = 'running';
    
    // Limpar arrays
    obstacles = [];
    particles = [];
    
    // Mostrar tela do jogo
    showGameScreen();
    
    // Gerar primeiro obstáculo
    setTimeout(() => generateObstacle(), 2000);
}

// Mostrar telas
function showStartScreen() {
    gameState = 'start';
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('start-screen').classList.add('active');
}

function showGameScreen() {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('game-screen').classList.add('active');
}

function showVictoryScreen() {
    gameState = 'victory';
    document.getElementById('final-score').textContent = `Distância percorrida: ${Math.floor(score)}m`;
    document.getElementById('final-time').textContent = `Tempo: ${formatTime(gameTime)}`;
    
    // Solicitar a palavra/frase que resume a jornada
    setTimeout(() => {
        const journeySummary = prompt("Parabéns! Qual palavra ou frase resume sua jornada neste semestre?\n(Ex: Superação, Evolução, Resiliência)");
        if (journeySummary && journeySummary.trim()) {
            document.getElementById('journey-summary').textContent = `Minha jornada: "${journeySummary.trim()}"`;
            document.getElementById('journey-summary').style.display = 'block';
        } else {
            document.getElementById('journey-summary').style.display = 'none';
        }
    }, 500);
    
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('victory-screen').classList.add('active');
}

function showGameOverScreen() {
    gameState = 'gameover';
    
    // Atualizar melhor pontuação
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('axoloteBestScore', bestScore);
    }
    
    document.getElementById('gameover-score').textContent = `Distância percorrida: ${Math.floor(score)}m`;
    document.getElementById('gameover-best').textContent = `Melhor tentativa: ${Math.floor(bestScore)}m`;
    
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('gameover-screen').classList.add('active');
}

// Criar elementos de fundo
function createBackgroundElements() {
    backgroundElements = [];
    for (let i = 0; i < 15; i++) {
        backgroundElements.push({
            x: Math.random() * GAME_CONFIG.CANVAS_WIDTH * 2,
            y: Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT),
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.3 + 0.1,
            opacity: Math.random() * 0.3 + 0.1
        });
    }
}

// Gerar obstáculos com mensagens de aprendizado (estilo runner)
function generateObstacle() {
    if (gameState !== 'playing') return;
    
    const obstacleTypes = [
        // Obstáculos no chão (exigem pulo)
        { image: 'algasToxicas', width: 40, height: 60, type: 'ground', messageKey: 'algasToxicas' },
        { image: 'pedraContaminada', width: 50, height: 40, type: 'ground', messageKey: 'pedraContaminada' },
        { image: 'coralMorto', width: 45, height: 50, type: 'ground', messageKey: 'coralMorto' },
        { image: 'algasToxicas', width: 40, height: 60, type: 'ground', messageKey: 'algasToxicas2' },
        { image: 'pedraContaminada', width: 50, height: 40, type: 'ground', messageKey: 'pedraContaminada2' },
        
        // Obstáculos no ar (exigem agachar)
        { image: 'detritoPlastico', width: 35, height: 30, type: 'air', messageKey: 'detritoPlastico' },
        { image: 'bolhaGasToxico', width: 40, height: 40, type: 'air', messageKey: 'bolhaGasToxico' },
        { image: 'detritoPlastico', width: 35, height: 30, type: 'air', messageKey: 'detritoPlastico2' }
    ];
    
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    
    let obstacleY;
    if (type.type === 'ground') {
        // Obstáculos no chão
        obstacleY = GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - type.height;
    } else {
        // Obstáculos no ar (altura para agachar)
        obstacleY = GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - 120;
    }
    
    const obstacle = {
        x: GAME_CONFIG.CANVAS_WIDTH,
        y: obstacleY,
        width: type.width,
        height: type.height,
        image: type.image,
        type: type.type,
        messageKey: type.messageKey,
        passed: false
    };
    
    obstacles.push(obstacle);
    
    // Programar próximo obstáculo
    const nextObstacleDelay = Math.random() * 1200 + 1000 - (gameSpeed * 80);
    setTimeout(() => generateObstacle(), Math.max(nextObstacleDelay, 600));
}

// Criar partículas
function createParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            velocityX: (Math.random() - 0.5) * 4,
            velocityY: (Math.random() - 0.5) * 4,
            life: 30,
            maxLife: 30,
            color: color,
            size: Math.random() * 3 + 1
        });
    }
}

// Atualizar física do jogo
function updateGame() {
    if (gameState !== 'playing') return;
    
    // Atualizar tempo
    gameTime = (Date.now() - startTime) / 1000;
    
    // Atualizar velocidade do jogo
    gameSpeed = Math.min(GAME_CONFIG.MAX_SPEED, GAME_CONFIG.INITIAL_SPEED + score * GAME_CONFIG.SPEED_INCREMENT);
    
    // Atualizar jogador
    updatePlayer();
    
    // Atualizar obstáculos
    updateObstacles();
    
    // Atualizar partículas
    updateParticles();
    
    // Atualizar elementos de fundo
    updateBackground();
    
    // Atualizar pontuação
    score += gameSpeed * 0.1;
    
    // Verificar vitória
    if (score >= GAME_CONFIG.TARGET_DISTANCE) {
        showVictoryScreen();
        return;
    }
    
    // Atualizar UI
    updateUI();
}

// Atualizar jogador (estilo runner)
function updatePlayer() {
    // Aplicar gravidade se não estiver no chão
    if (!player.onGround) {
        player.velocityY += GAME_CONFIG.GRAVITY;
        player.velocityY = Math.min(player.velocityY, GAME_CONFIG.MAX_FALL_SPEED);
    }
    
    // Atualizar posição Y
    player.y += player.velocityY;
    
    // Verificar se tocou o chão
    const groundY = GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - player.height;
    if (player.y >= groundY) {
        player.y = groundY;
        player.velocityY = 0;
        player.onGround = true;
        player.isJumping = false;
        if (!player.isDucking) {
            player.animationState = 'running';
        }
    }
    
    // Atualizar animação
    player.frameTimer++;
    if (player.frameTimer >= 8) { // Muda frame a cada 8 frames
        if (player.animationState === 'running') {
            player.currentFrame = (player.currentFrame + 1) % 3; // 3 frames de corrida
        }
        player.frameTimer = 0;
    }
}

// Atualizar obstáculos
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        
        // Mover obstáculo
        obstacle.x -= gameSpeed;
        
        // Verificar se passou pelo jogador
        if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
            obstacle.passed = true;
            createParticles(obstacle.x, obstacle.y, '#4ecdc4', 3);
            
            // Exibir mensagem de aprendizado
            if (learningMessages[obstacle.messageKey]) {
                showLearningMessage(learningMessages[obstacle.messageKey]);
            }
        }
        
        // Verificar colisão
        if (checkCollision(player, obstacle)) {
            createParticles(player.x + player.width/2, player.y + player.height/2, '#ff6b6b', 10);
            showGameOverScreen();
            return;
        }
        
        // Remover obstáculos que saíram da tela
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
        }
    }
}

// Atualizar partículas
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.life--;
        
        if (particle.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// Atualizar fundo
function updateBackground() {
    backgroundElements.forEach(element => {
        element.x -= element.speed * gameSpeed;
        if (element.x < -10) {
            element.x = GAME_CONFIG.CANVAS_WIDTH + 10;
        }
    });
}

// Verificar colisão
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Renderizar jogo
function renderGame() {
    if (gameState !== 'playing') return;
    
    // Limpar canvas
    ctx.clearRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
    
    // Desenhar fundo
    drawBackground();
    
    // Desenhar linha do chão
    drawGround();
    
    // Desenhar elementos de fundo
    drawBackgroundElements();
    
    // Desenhar obstáculos
    drawObstacles();
    
    // Desenhar jogador
    drawPlayer();
    
    // Desenhar partículas
    drawParticles();
}

// Desenhar fundo
function drawBackground() {
    // Gradiente de fundo
    const gradient = ctx.createLinearGradient(0, 0, 0, GAME_CONFIG.CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1e3c72');
    gradient.addColorStop(0.7, '#2a5298');
    gradient.addColorStop(1, '#0f4c75');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
}

// Desenhar linha do chão
function drawGround() {
    const groundY = GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT;
    
    // Linha do chão
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(GAME_CONFIG.CANVAS_WIDTH, groundY);
    ctx.stroke();
    
    // Área do chão
    ctx.fillStyle = 'rgba(78, 205, 196, 0.1)';
    ctx.fillRect(0, groundY, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.GROUND_HEIGHT);
}

// Desenhar elementos de fundo
function drawBackgroundElements() {
    ctx.save();
    backgroundElements.forEach(element => {
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = '#4ecdc4';
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();
}

// Desenhar jogador
function drawPlayer() {
    ctx.save();
    
    // Se a imagem axoloteRunner estiver carregada, usa-a
    if (images.axoloteRunner && images.axoloteRunner.complete) {
        let frameWidth = images.axoloteRunner.width / 5; // 5 frames na sprite sheet
        let frameHeight = images.axoloteRunner.height;
        let sourceX = 0;
        let sourceY = 0;
        
        if (player.animationState === 'running') {
            sourceX = player.currentFrame * frameWidth; // Frames 0, 1, 2 para corrida
            sourceY = 0;
        } else if (player.animationState === 'jumping') {
            sourceX = 3 * frameWidth; // Frame 3 para pulo
            sourceY = 0;
        } else if (player.animationState === 'ducking') {
            sourceX = 4 * frameWidth; // Frame 4 para agachar
            sourceY = 0;
        }
        
        ctx.drawImage(
            images.axoloteRunner,
            sourceX, sourceY, frameWidth, frameHeight,
            player.x, player.y, player.width, player.height
        );
    } else {
        // Fallback: desenhar retângulo rosa
        ctx.fillStyle = '#ff69b4';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }
    
    ctx.restore();
}

// Desenhar obstáculos
function drawObstacles() {
    obstacles.forEach(obstacle => {
        if (images[obstacle.image] && images[obstacle.image].complete) {
            ctx.drawImage(images[obstacle.image], obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        } else {
            // Fallback: desenhar retângulo colorido
            ctx.fillStyle = obstacle.type === 'ground' ? '#ff6b6b' : '#ffa500';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
    });
}

// Desenhar partículas
function drawParticles() {
    particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.life / particle.maxLife;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
}

// Atualizar UI
function updateUI() {
    document.getElementById('score').textContent = `Distância: ${Math.floor(score)}m`;
    
    const progress = (score / GAME_CONFIG.TARGET_DISTANCE) * 100;
    document.getElementById('progress-fill').style.width = `${Math.min(progress, 100)}%`;
    
    let levelText = 'Águas Rasas';
    if (score > 800) levelText = 'Nascente Próxima!';
    else if (score > 500) levelText = 'Águas Profundas';
    else if (score > 200) levelText = 'Águas Turbulentas';
    
    document.getElementById('level-indicator').textContent = `Nível: ${levelText}`;
}

// Compartilhar pontuação
function shareScore() {
    const text = `Acabei de salvar o ecossistema aquático no Axolote Adventure Runner! Percorri ${Math.floor(score)}m em ${formatTime(gameTime)}. Você consegue fazer melhor? 🌊🎮`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Axolote Adventure Runner',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback: copiar para clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert('Pontuação copiada para a área de transferência!');
        });
    }
}

// Formatar tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Loop principal do jogo
function gameLoop() {
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', initGame);



// Iniciar o jogo quando a página carregar
document.addEventListener("DOMContentLoaded", initGame);



// Iniciar o jogo quando a página carregar
document.addEventListener("DOMContentLoaded", initGame);



// Iniciar o jogo quando a página carregar
document.addEventListener("DOMContentLoaded", initGame);



// Iniciar o jogo quando a página carregar
document.addEventListener("DOMContentLoaded", initGame);

