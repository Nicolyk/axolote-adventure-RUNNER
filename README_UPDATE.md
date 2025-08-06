# Axolote Adventure - Atualização de Semestre

Este documento detalha as modificações e melhorias implementadas no jogo Axolote Adventure para refletir o aprendizado do semestre, além de fornecer instruções claras para a integração no VS Code.

## 💡 Novas Funcionalidades

### 1. Mensagens de Aprendizado por Obstáculo

Ao ultrapassar cada obstáculo, uma pequena mensagem pop-up será exibida, revelando um conceito ou habilidade aprendida durante o semestre. As associações são:

- **Algas Tóxicas**: "Aprendi sobre **Tipos e Gêneros de Jogos**!"
- **Pedras Contaminadas**: "Entendi melhor **Conhecendo o Computador**!"
- **Detritos Plásticos**: "Explorei a **Teoria da Diversão**!"
- **Corais Mortos**: "Dominei o uso das **Cores**!"
- **Bolhas de Gás Tóxico**: "Criei minha própria **Pixel Art**!"
- **Obstáculo 6 (novo)**: "Desenvolvi **Algoritmos e Fluxogramas**!"
- **Obstáculo 7 (novo)**: "Construí com **HTML e CSS**!"
- **Obstáculo 8 (novo)**: "Programo com **Loops, Arrays e Objects**!"

*Nota: Para os obstáculos 6, 7 e 8, será necessário adicionar novos sprites ou reutilizar os existentes com mensagens diferentes, dependendo da frequência de aparecimento dos obstáculos.*

### 2. Mensagem de Vitória Aprimorada

A mensagem final de vitória foi expandida para incluir uma reflexão sobre a jornada do aluno no semestre. Será solicitado ao jogador que insira uma palavra ou frase que resuma sua experiência (ex: "Superação", "Evolução", "Resiliência").

### 3. Animação e Orientação do Axolote

O sprite do axolote será aprimorado para ter mais quadros de animação, tornando seu movimento mais fluido. Além disso, o axolote será visualmente orientado para a direita, indicando a direção do progresso no jogo.

## 💻 Instruções para Integração no VS Code

Siga os passos abaixo para aplicar as atualizações no seu projeto Axolote Adventure no VS Code:

### Passo 1: Baixar e Substituir Assets (se houver novos)

Se novos sprites de axolote ou obstáculos forem gerados, eles estarão disponíveis na pasta `assets/` do projeto. Você precisará baixá-los e substituir os arquivos existentes ou adicioná-los, se forem novos.

1.  **Baixe os novos arquivos de imagem** (ex: `axolote_sprite_animado.png`, `novo_obstaculo_6.png`, etc.) que serão fornecidos.
2.  No seu projeto `axolote-game` no VS Code, navegue até a pasta `assets/`.
3.  **Substitua** os arquivos de imagem antigos pelos novos, ou **adicione** os novos arquivos, mantendo os nomes originais se forem substituições.

### Passo 2: Atualizar `script.js`

Este é o arquivo principal onde a lógica do jogo será modificada. Você precisará copiar e colar os blocos de código nas seções indicadas.

1.  Abra o arquivo `script.js` no VS Code.
2.  **Localize a seção de carregamento de imagens (`loadImages`):**
    *   **Código a ser adicionado/modificado:**

    ```javascript
    // Dentro da função loadImages, adicione mais quadros de animação para o axolote se houver novos sprites
    // Exemplo: Se você tiver axolote_frame1.png, axolote_frame2.png, etc.
    // images.axoloteFrames = [
    //     new Image().src = 'assets/axolote_frame1.png',
    //     new Image().src = 'assets/axolote_frame2.png'
    // ];
    // Por enquanto, vamos manter um único sprite e focar na rotação.
    
    // Certifique-se de que o sprite do axolote esteja carregado corretamente
    const axoloteImg = new Image();
    axoloteImg.src = imageFiles.axolote; // Assumindo que imageFiles.axolote já aponta para o sprite principal
    images.axolote = axoloteImg;
    imagePromises.push(new Promise(resolve => axoloteImg.onload = resolve));
    ```

3.  **Localize a seção de geração de obstáculos (`generateObstacle`):**
    *   **Código a ser adicionado/modificado:**

    ```javascript
    // Dentro da função generateObstacle, adicione os novos tipos de obstáculos e suas mensagens
    const obstacleTypes = [
        { image: 'algasToxicas', width: 40, height: 80, message: 'Aprendi sobre Tipos e Gêneros de Jogos!' },
        { image: 'pedraContaminada', width: 60, height: 40, message: 'Entendi melhor Conhecendo o Computador!' },
        { image: 'detritoPlastico', width: 30, height: 50, message: 'Explorei a Teoria da Diversão!' },
        { image: 'coralMorto', width: 50, height: 50, message: 'Dominei o uso das Cores!' },
        { image: 'bolhaGasToxico', width: 45, height: 45, message: 'Criei minha própria Pixel Art!' }, // Novo obstáculo
        { image: 'algasToxicas', width: 40, height: 80, message: 'Desenvolvi Algoritmos e Fluxogramas!' }, // Reutilizando sprite
        { image: 'pedraContaminada', width: 60, height: 40, message: 'Construí com HTML e CSS!' }, // Reutilizando sprite
        { image: 'detritoPlastico', width: 30, height: 50, message: 'Programo com Loops, Arrays e Objects!' } // Reutilizando sprite
    ];
    
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const obstacle = {
        x: GAME_CONFIG.CANVAS_WIDTH,
        y: Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - type.height - 100) + 50,
        width: type.width,
        height: type.height,
        image: type.image,
        message: type.message, // Adicionar a mensagem ao obstáculo
        passed: false
    };
    
    obstacles.push(obstacle);
    
    // Adicione a lógica para exibir a mensagem de aprendizado quando o obstáculo for ultrapassado
    // Isso será feito na função updateObstacles ou em uma nova função de UI.
    ```

4.  **Localize a função `updateObstacles`:**
    *   **Código a ser adicionado/modificado:**

    ```javascript
    // Dentro da função updateObstacles, adicione a exibição da mensagem de aprendizado
    if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
        obstacle.passed = true;
        createParticles(obstacle.x, obstacle.y, '#4ecdc4', 3);
        
        // Exibir mensagem de aprendizado
        showMessage(obstacle.message, 'learning-message');
    }
    ```

5.  **Adicione uma nova função para exibir mensagens (`showMessage`):**
    *   **Código a ser adicionado:**

    ```javascript
    // Nova função para exibir mensagens temporárias
    function showMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        messageDiv.classList.add('game-message', className);
        document.body.appendChild(messageDiv);
        
        // Posicionar a mensagem (exemplo, pode ser ajustado no CSS)
        messageDiv.style.left = `${GAME_CONFIG.CANVAS_WIDTH / 2 - messageDiv.offsetWidth / 2}px`;
        messageDiv.style.top = `${GAME_CONFIG.CANVAS_HEIGHT / 4}px`;

        setTimeout(() => {
            messageDiv.remove();
        }, 2000); // Mensagem desaparece após 2 segundos
    }
    ```

6.  **Localize a função `drawPlayer`:**
    *   **Código a ser adicionado/modificado para animação e orientação:**

    ```javascript
    // Dentro da função drawPlayer, ajuste para animação e orientação
    ctx.save();
    
    // Efeito de rotação baseado na velocidade vertical para simular nado
    const rotation = player.velocityY * 0.05; // Ajuste este valor para mais ou menos rotação
    ctx.translate(player.x + player.width/2, player.y + player.height/2);
    ctx.rotate(rotation);
    
    // Orientar o axolote para a direita (se o sprite estiver virado para a direita)
    // Se o sprite estiver virado para a esquerda, você pode usar ctx.scale(-1, 1); antes do drawImage
    
    if (images.axolote && images.axolote.complete) {
        // Se tiver múltiplos frames para animação, você pode alternar aqui
        // Ex: const currentFrame = Math.floor(gameTime * 10) % images.axoloteFrames.length;
        // ctx.drawImage(images.axoloteFrames[currentFrame], -player.width/2, -player.height/2, player.width, player.height);
        ctx.drawImage(images.axolote, -player.width/2, -player.height/2, player.width, player.height);
    } else {
        // Fallback: desenhar retângulo rosa
        ctx.fillStyle = '#ff69b4';
        ctx.fillRect(-player.width/2, -player.height/2, player.width, player.height);
    }
    
    ctx.restore();
    ```

7.  **Localize a função `showVictoryScreen`:**
    *   **Código a ser adicionado/modificado para a mensagem de vitória aprimorada:**

    ```javascript
    // Dentro da função showVictoryScreen
    function showVictoryScreen() {
        gameState = 'victory';
        document.getElementById('final-score').textContent = `Distância percorrida: ${score}m`;
        document.getElementById('final-time').textContent = `Tempo: ${formatTime(gameTime)}`;
        
        // Solicitar a palavra/frase que resume a jornada
        const journeySummary = prompt("Parabéns! Qual palavra ou frase resume sua jornada neste semestre? (Ex: Superação, Evolução, Resiliência)");
        if (journeySummary) {
            document.getElementById('journey-summary').textContent = `Minha jornada: "${journeySummary}"`;
        } else {
            document.getElementById('journey-summary').textContent = ''; // Limpa se nada for digitado
        }

        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById('victory-screen').classList.add('active');
    }
    ```

### Passo 3: Atualizar `index.html`

Você precisará adicionar um novo elemento `div` para exibir as mensagens de aprendizado e um `span` para a frase de resumo da jornada na tela de vitória.

1.  Abra o arquivo `index.html` no VS Code.
2.  **Adicione o elemento para as mensagens de aprendizado:**
    *   **Local:** Logo abaixo do `<body>` ou antes do `<!-- Tela de Início -->`.
    *   **Código a ser adicionado:**

    ```html
    <!-- Elemento para mensagens de aprendizado -->
    <div id="game-messages"></div>
    ```

3.  **Adicione o elemento para a frase de resumo da jornada na `victory-screen`:**
    *   **Local:** Dentro da `div` com a classe `final-stats` na `victory-screen`.
    *   **Código a ser adicionado:**

    ```html
    <!-- Dentro da div com class="final-stats" na victory-screen -->
    <div id="journey-summary"></div>
    ```

### Passo 4: Atualizar `style.css`

Adicione estilos para as novas mensagens pop-up e ajuste o estilo do axolote se necessário.

1.  Abra o arquivo `style.css` no VS Code.
2.  **Adicione os estilos para as mensagens do jogo:**
    *   **Local:** Em qualquer lugar no arquivo, preferencialmente no final.
    *   **Código a ser adicionado:**

    ```css
    /* Estilos para mensagens temporárias no jogo */
    .game-message {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1.2em;
        z-index: 1000;
        text-align: center;
        animation: fadeOut 2s forwards;
        white-space: nowrap; /* Garante que a mensagem não quebre linha */
    }

    .learning-message {
        border: 2px solid #4ecdc4;
        color: #4ecdc4;
    }

    @keyframes fadeOut {
        0% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; }
    }
    ```

## 🧪 Testando as Mudanças

Após aplicar todas as modificações:

1.  Abra o arquivo `index.html` no seu navegador.
2.  Jogue para verificar se as mensagens de aprendizado aparecem ao ultrapassar os obstáculos.
3.  Complete o jogo para ver a nova mensagem de vitória e insira sua frase de resumo.
4.  Observe a animação e orientação do axolote durante o jogo.

## 📦 Arquivos do Projeto

Os arquivos atualizados (`script.js`, `index.html`, `style.css`) e quaisquer novos assets de imagem serão fornecidos em um arquivo ZIP. Certifique-se de extraí-los e substituir os arquivos correspondentes em seu projeto `axolote-game/`.

---

**Parabéns pela sua jornada de aprendizado!** 🚀

