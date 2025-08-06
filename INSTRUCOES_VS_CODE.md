# 📝 Instruções para Integração no VS Code - Axolote Adventure

Este guia fornece instruções passo a passo para integrar as atualizações do jogo Axolote Adventure no seu projeto do VS Code.

## 📋 Pré-requisitos

- VS Code instalado
- Projeto `axolote-game` já existente no VS Code
- Conhecimento básico de HTML, CSS e JavaScript

## 📁 Estrutura de Arquivos Atualizada

Após as modificações, sua pasta `axolote-game` deve ter esta estrutura:

```
axolote-game/
├── index.html                    # ← SUBSTITUIR
├── style.css                     # ← SUBSTITUIR  
├── script.js                     # ← SUBSTITUIR
├── assets/
│   ├── axolote_sprite.png         # Manter
│   ├── axolote_sprite_animated.png # ← ADICIONAR (novo)
│   ├── algas_toxicas.png          # Manter
│   ├── pedra_contaminada.png      # Manter
│   ├── detrito_plastico.png       # Manter
│   ├── coral_morto.png            # Manter
│   ├── bolha_gas_toxico.png       # ← ADICIONAR (novo)
│   └── background_marinho.png     # Manter
└── README.md                      # Opcional - atualizar
```

## 🔄 Passo 1: Backup dos Arquivos Originais

**IMPORTANTE:** Antes de fazer qualquer alteração, faça backup dos seus arquivos originais!

1. No VS Code, clique com o botão direito na pasta `axolote-game`
2. Selecione "Revelar no Explorador de Arquivos" (Windows) ou "Revelar no Finder" (Mac)
3. Crie uma pasta chamada `backup-original`
4. Copie os arquivos `index.html`, `style.css` e `script.js` para a pasta backup

## 🖼️ Passo 2: Adicionar Novos Assets

1. **Baixe os novos arquivos de imagem** fornecidos:
   - `axolote_sprite_animated.png`
   - `bolha_gas_toxico.png`

2. **No VS Code:**
   - Abra a pasta `assets/` no explorador de arquivos
   - Arraste e solte os novos arquivos de imagem na pasta `assets/`
   - Confirme que os arquivos foram copiados corretamente

## 📄 Passo 3: Substituir o arquivo HTML

1. **Abra o arquivo `index.html` no VS Code**
2. **Selecione todo o conteúdo** (Ctrl+A ou Cmd+A)
3. **Delete todo o conteúdo**
4. **Cole o novo código HTML:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Axolote Adventure - Salve o Ecossistema Aquático</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Tela de Início -->
    <div id="start-screen" class="screen active">
        <div class="container">
            <h1 class="title">🌊 Axolote Adventure 🌊</h1>
            <div class="story-section">
                <h2>A História de Aqua</h2>
                <p>Você é Aqua, um jovem axolote corajoso que vive nas profundezas de um lago cristalino no México. Recentemente, poluentes e detritos começaram a contaminar seu lar, ameaçando toda a vida aquática.</p>
                <p>Sua missão é nadar através das águas turbulentas, evitando os obstáculos perigosos, para alcançar a nascente pura no topo do lago e restaurar a pureza das águas.</p>
            </div>
            
            <div class="objective-section">
                <h2>🎯 Objetivo</h2>
                <p>Percorra <strong>1000 metros</strong> de águas contaminadas evitando obstáculos como algas tóxicas, pedras contaminadas e detritos plásticos. Cada metro percorrido representa um passo em direção à salvação do ecossistema aquático!</p>
                <p><strong>🎓 Novidade:</strong> Ao ultrapassar cada obstáculo, você descobrirá o que aprendeu durante o semestre!</p>
            </div>
            
            <div class="controls-section">
                <h2>🎮 Controles</h2>
                <div class="controls-grid">
                    <div class="control-item">
                        <span class="key">ESPAÇO</span>
                        <span class="action">Nadar para cima</span>
                    </div>
                    <div class="control-item">
                        <span class="key">↑</span>
                        <span class="action">Nadar para cima</span>
                    </div>
                    <div class="control-item">
                        <span class="key">↓</span>
                        <span class="action">Nadar para baixo</span>
                    </div>
                </div>
            </div>
            
            <button id="start-button" class="game-button">🚀 Começar Aventura</button>
        </div>
    </div>

    <!-- Tela do Jogo -->
    <div id="game-screen" class="screen">
        <div id="game-container">
            <div id="game-ui">
                <div id="score">Distância: 0m</div>
                <div id="progress-bar">
                    <div id="progress-fill"></div>
                </div>
                <div id="level-indicator">Nível: Águas Rasas</div>
            </div>
            <canvas id="game-canvas" width="800" height="400"></canvas>
        </div>
    </div>

    <!-- Tela de Vitória -->
    <div id="victory-screen" class="screen">
        <div class="container">
            <h1 class="victory-title">🎉 MISSÃO CUMPRIDA! 🎉</h1>
            <div class="victory-message">
                <p><strong>Parabéns, herói aquático!</strong></p>
                <p>Aqua conseguiu alcançar a nascente pura e restaurar a vida ao lago! Graças à sua determinação e habilidade, o ecossistema aquático está salvo.</p>
                <p>Você provou que mesmo os menores seres podem fazer a maior diferença. Continue protegendo nossos recursos naturais - cada ação conta para um futuro mais sustentável!</p>
                <p><strong>🎓 Durante esta jornada, você relembrou tudo o que aprendeu neste semestre sobre desenvolvimento de jogos, programação e tecnologia!</strong></p>
            </div>
            
            <div class="final-stats">
                <h3>📊 Estatísticas Finais</h3>
                <div id="final-score">Distância percorrida: 1000m</div>
                <div id="final-time">Tempo: --:--</div>
                <div id="journey-summary" class="journey-summary"></div>
            </div>
            
            <div class="victory-buttons">
                <button id="play-again-button" class="game-button">🔄 Jogar Novamente</button>
                <button id="share-button" class="game-button secondary">📱 Compartilhar</button>
            </div>
        </div>
    </div>

    <!-- Tela de Game Over -->
    <div id="gameover-screen" class="screen">
        <div class="container">
            <h1 class="gameover-title">💔 Aqua Precisa de Ajuda!</h1>
            <div class="gameover-message">
                <p>Aqua encontrou um obstáculo muito perigoso e não conseguiu continuar sua jornada...</p>
                <p>Mas não desista! Cada tentativa nos aproxima da salvação do lago. Tente novamente e ajude Aqua a alcançar a nascente pura!</p>
                <p><strong>💡 Lembre-se:</strong> Cada obstáculo ultrapassado revela algo que você aprendeu neste semestre!</p>
            </div>
            
            <div class="final-stats">
                <h3>📊 Sua Jornada</h3>
                <div id="gameover-score">Distância percorrida: 0m</div>
                <div id="gameover-best">Melhor tentativa: 0m</div>
            </div>
            
            <div class="gameover-buttons">
                <button id="retry-button" class="game-button">🔄 Tentar Novamente</button>
                <button id="menu-button" class="game-button secondary">🏠 Menu Principal</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

5. **Salve o arquivo** (Ctrl+S ou Cmd+S)

## 🎨 Passo 4: Substituir o arquivo CSS

1. **Abra o arquivo `style.css` no VS Code**
2. **Selecione todo o conteúdo** (Ctrl+A ou Cmd+A)
3. **Delete todo o conteúdo**
4. **Cole o novo código CSS:**

```css
/* Reset e configurações básicas */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%);
    color: white;
    overflow: hidden;
    height: 100vh;
}

/* Configurações de tela */
.screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0f4c75 0%, #3282b8 50%, #0f4c75 100%);
    animation: fadeIn 0.5s ease-in-out;
}

.screen.active {
    display: flex;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Container principal */
.container {
    max-width: 800px;
    padding: 2rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Títulos */
.title {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.victory-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #4ecdc4;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.gameover-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #ff6b6b;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Seções de conteúdo */
.story-section, .objective-section, .controls-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.story-section h2, .objective-section h2, .controls-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #4ecdc4;
}

.story-section p, .objective-section p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
}

/* Grade de controles */
.controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.control-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.key {
    background: #4ecdc4;
    color: #0f4c75;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: bold;
    font-size: 0.9rem;
    min-width: 60px;
    text-align: center;
}

.action {
    font-size: 1rem;
    color: white;
}

/* Botões */
.game-button {
    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem;
    box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
}

.game-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
    background: linear-gradient(45deg, #45b7d1, #4ecdc4);
}

.game-button.secondary {
    background: linear-gradient(45deg, #6c5ce7, #a29bfe);
    box-shadow: 0 4px 15px rgba(108, 92, 231, 0.3);
}

.game-button.secondary:hover {
    background: linear-gradient(45deg, #a29bfe, #6c5ce7);
    box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
}

/* Tela do jogo */
#game-screen {
    background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
}

#game-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#game-ui {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 800px;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-bottom: 1rem;
}

#score, #level-indicator {
    font-size: 1.2rem;
    font-weight: bold;
    color: #4ecdc4;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

#progress-bar {
    flex: 1;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    margin: 0 2rem;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

#progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4ecdc4, #45b7d1);
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 8px;
}

/* Canvas do jogo */
#game-canvas {
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    background: linear-gradient(180deg, #1e3c72, #0f4c75);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Mensagens de vitória e game over */
.victory-message, .gameover-message {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.victory-message p, .gameover-message p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
}

.final-stats {
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
}

.final-stats h3 {
    color: #4ecdc4;
    margin-bottom: 1rem;
}

.final-stats div {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

/* Estilo para a frase de resumo da jornada */
.journey-summary {
    font-size: 1.3rem !important;
    font-weight: bold;
    color: #4ecdc4;
    background: rgba(78, 205, 196, 0.1);
    padding: 1rem;
    border-radius: 10px;
    border: 2px solid rgba(78, 205, 196, 0.3);
    margin-top: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    display: none; /* Inicialmente oculto */
}

.victory-buttons, .gameover-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

/* Estilos para mensagens temporárias no jogo */
.game-message {
    position: fixed;
    background: linear-gradient(45deg, rgba(78, 205, 196, 0.95), rgba(69, 183, 209, 0.95));
    color: white;
    padding: 15px 25px;
    border-radius: 15px;
    font-size: 1.3em;
    font-weight: bold;
    z-index: 1000;
    text-align: center;
    animation: messageAnimation 2.5s forwards;
    white-space: nowrap;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.learning-message {
    background: linear-gradient(45deg, rgba(78, 205, 196, 0.95), rgba(69, 183, 209, 0.95));
    border: 2px solid #4ecdc4;
    box-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
}

@keyframes messageAnimation {
    0% { 
        opacity: 0; 
        transform: translateX(-50%) translateY(-20px) scale(0.8);
    }
    15% { 
        opacity: 1; 
        transform: translateX(-50%) translateY(0px) scale(1);
    }
    85% { 
        opacity: 1; 
        transform: translateX(-50%) translateY(0px) scale(1);
    }
    100% { 
        opacity: 0; 
        transform: translateX(-50%) translateY(-10px) scale(0.9);
    }
}

/* Responsividade */
@media (max-width: 768px) {
    .container {
        margin: 1rem;
        padding: 1.5rem;
    }
    
    .title {
        font-size: 2rem;
    }
    
    .victory-title, .gameover-title {
        font-size: 1.8rem;
    }
    
    #game-ui {
        width: 95%;
        flex-direction: column;
        gap: 1rem;
    }
    
    #progress-bar {
        margin: 0;
        width: 100%;
    }
    
    #game-canvas {
        width: 95%;
        height: auto;
    }
    
    .controls-grid {
        grid-template-columns: 1fr;
    }
    
    .victory-buttons, .gameover-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .game-message {
        font-size: 1.1em;
        padding: 12px 20px;
        max-width: 90%;
        white-space: normal;
        text-align: center;
    }
    
    .journey-summary {
        font-size: 1.1rem !important;
    }
}

/* Animações de partículas */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(78, 205, 196, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: float 6s ease-in-out infinite;
    pointer-events: none;
}
```

5. **Salve o arquivo** (Ctrl+S ou Cmd+S)

## ⚙️ Passo 5: Substituir o arquivo JavaScript

**⚠️ ATENÇÃO:** Este é o arquivo mais importante e complexo. Copie com cuidado!

1. **Abra o arquivo `script.js` no VS Code**
2. **Selecione todo o conteúdo** (Ctrl+A ou Cmd+A)
3. **Delete todo o conteúdo**
4. **Cole o novo código JavaScript:**

[O código JavaScript completo está muito longo para incluir aqui. Você receberá o arquivo `script_updated.js` separadamente]

5. **Salve o arquivo** (Ctrl+S ou Cmd+S)

## 🧪 Passo 6: Testar o Jogo

1. **Abra o arquivo `index.html` no navegador:**
   - Clique com o botão direito no arquivo `index.html` no VS Code
   - Selecione "Open with Live Server" (se tiver a extensão) ou "Revelar no Explorador"
   - Abra o arquivo no seu navegador

2. **Teste as novas funcionalidades:**
   - ✅ Jogue e verifique se as mensagens de aprendizado aparecem ao ultrapassar obstáculos
   - ✅ Complete o jogo para testar a nova mensagem de vitória
   - ✅ Insira uma palavra/frase que resuma sua jornada
   - ✅ Observe a animação melhorada do axolote

## 🎯 Mensagens de Aprendizado

As seguintes mensagens aparecerão quando você ultrapassar os obstáculos:

1. **Algas Tóxicas**: "Aprendi sobre Tipos e Gêneros de Jogos! 🎮"
2. **Pedras Contaminadas**: "Entendi melhor Conhecendo o Computador! 💻"
3. **Detritos Plásticos**: "Explorei a Teoria da Diversão! 🎯"
4. **Corais Mortos**: "Dominei o uso das Cores! 🎨"
5. **Bolhas de Gás Tóxico**: "Criei minha própria Pixel Art! 🖼️"
6. **Algas Tóxicas (variação)**: "Desenvolvi Algoritmos e Fluxogramas! 📊"
7. **Pedras Contaminadas (variação)**: "Construí com HTML e CSS! 🌐"
8. **Detritos Plásticos (variação)**: "Programo com Loops, Arrays e Objects! 💾"

## 🎉 Mensagem de Vitória Aprimorada

Ao completar o jogo (1000m), você verá:

1. A mensagem de vitória original sobre salvar o ecossistema
2. Uma nova seção sobre o aprendizado do semestre
3. Um prompt solicitando uma palavra/frase que resuma sua jornada
4. Sua resposta será exibida destacada na tela de vitória

## 🔧 Solução de Problemas

### ❌ Mensagens não aparecem
- Verifique se copiou o código JavaScript corretamente
- Abra o Console do navegador (F12) e veja se há erros

### ❌ Imagens não carregam
- Verifique se os novos arquivos de imagem estão na pasta `assets/`
- Confirme os nomes dos arquivos: `axolote_sprite_animated.png` e `bolha_gas_toxico.png`

### ❌ Jogo não inicia
- Verifique se todos os três arquivos (HTML, CSS, JS) foram substituídos
- Recarregue a página completamente (Ctrl+F5 ou Cmd+Shift+R)

### ❌ Layout quebrado
- Confirme se copiou todo o código CSS
- Verifique se não há caracteres especiais ou quebras de linha incorretas

## 📞 Suporte

Se encontrar problemas:

1. **Verifique o Console do navegador** (F12 → Console) para erros
2. **Compare com os arquivos de backup** para identificar diferenças
3. **Recarregue a página completamente** após fazer alterações
4. **Teste em um navegador diferente** se necessário

## ✅ Checklist Final

- [ ] Backup dos arquivos originais criado
- [ ] Novos assets adicionados à pasta `assets/`
- [ ] Arquivo `index.html` substituído
- [ ] Arquivo `style.css` substituído  
- [ ] Arquivo `script.js` substituído
- [ ] Jogo testado no navegador
- [ ] Mensagens de aprendizado funcionando
- [ ] Mensagem de vitória aprimorada funcionando
- [ ] Animação do axolote melhorada

---

**🎊 Parabéns! Seu jogo Axolote Adventure agora reflete toda sua jornada de aprendizado do semestre!** 

Divirta-se jogando e relembrando tudo o que você aprendeu! 🌊🎮

