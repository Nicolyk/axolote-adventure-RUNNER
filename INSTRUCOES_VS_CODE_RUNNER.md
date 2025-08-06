# 📝 Instruções para Integração no VS Code - Axolote Adventure Runner

Este guia fornece instruções passo a passo para integrar a versão **RUNNER** do jogo Axolote Adventure no seu projeto do VS Code, similar ao jogo do dinossauro do Google.

## 🎮 O que mudou - Estilo Runner

O jogo agora funciona como o famoso jogo do dinossauro do Google:
- **Axolote corre automaticamente** para a direita em uma linha de base
- **Obstáculos no chão**: Pule com ESPAÇO ou ↑
- **Obstáculos no ar**: Agache com ↓
- **Física de gravidade**: O axolote pula e cai naturalmente
- **Linha de base visual**: Clara demarcação do chão

## 📋 Pré-requisitos

- VS Code instalado
- Projeto `axolote-game` já existente no VS Code
- Conhecimento básico de HTML, CSS e JavaScript

## 📁 Estrutura de Arquivos Atualizada (Runner)

Após as modificações, sua pasta `axolote-game` deve ter esta estrutura:

```
axolote-game/
├── index.html                        # ← SUBSTITUIR por index_runner.html
├── style.css                         # ← SUBSTITUIR por style_runner.css  
├── script.js                         # ← SUBSTITUIR por script_runner.js
├── assets/
│   ├── axolote_sprite.png             # Manter (fallback)
│   ├── axolote_runner_animated.png    # ← ADICIONAR (novo - principal)
│   ├── algas_toxicas.png              # Manter (obstáculo chão)
│   ├── pedra_contaminada.png          # Manter (obstáculo chão)
│   ├── detrito_plastico.png           # Manter (obstáculo ar)
│   ├── coral_morto.png                # Manter (obstáculo chão)
│   ├── bolha_gas_toxico.png           # Manter (obstáculo ar)
│   ├── background_marinho.png         # Manter (fallback)
│   └── background_runner.png          # ← ADICIONAR (novo - principal)
└── README.md                          # Opcional - atualizar
```

## 🔄 Passo 1: Backup dos Arquivos Originais

**IMPORTANTE:** Antes de fazer qualquer alteração, faça backup dos seus arquivos originais!

1. No VS Code, clique com o botão direito na pasta `axolote-game`
2. Selecione "Revelar no Explorador de Arquivos" (Windows) ou "Revelar no Finder" (Mac)
3. Crie uma pasta chamada `backup-original-runner`
4. Copie os arquivos `index.html`, `style.css` e `script.js` para a pasta backup

## 🖼️ Passo 2: Adicionar Novos Assets

1. **Baixe os novos arquivos de imagem** fornecidos:
   - `axolote_runner_animated.png` (sprite com animações de corrida, pulo e agachar)
   - `background_runner.png` (background com perspectiva lateral)

2. **No VS Code:**
   - Abra a pasta `assets/` no explorador de arquivos
   - Arraste e solte os novos arquivos de imagem na pasta `assets/`
   - Confirme que os arquivos foram copiados corretamente

## 📄 Passo 3: Substituir o arquivo HTML

1. **Abra o arquivo `index.html` no VS Code**
2. **Selecione todo o conteúdo** (Ctrl+A ou Cmd+A)
3. **Delete todo o conteúdo**
4. **Cole o novo código HTML (Runner):**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Axolote Adventure Runner - Salve o Ecossistema Aquático</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Tela de Início -->
    <div id="start-screen" class="screen active">
        <div class="container">
            <h1 class="title">🌊 Axolote Adventure Runner 🌊</h1>
            <div class="story-section">
                <h2>A História de Aqua</h2>
                <p>Você é Aqua, um jovem axolote corajoso que vive em uma floresta de algas marinhas, um ecossistema vibrante que está sendo ameaçado por poluentes e detritos.</p>
                <p>Sua missão é correr e saltar através das águas rasas e profundas, evitando os obstáculos perigosos, para alcançar a nascente pura no final do oceano e restaurar a saúde do seu lar.</p>
            </div>
            
            <div class="objective-section">
                <h2>🎯 Objetivo</h2>
                <p>Percorra <strong>1000 metros</strong> correndo e saltando, evitando obstáculos no chão e no ar. Cada metro percorrido representa um passo em direção à salvação do ecossistema aquático!</p>
                <p><strong>🎓 Novidade:</strong> Ao ultrapassar cada obstáculo, você descobrirá o que aprendeu durante o semestre!</p>
            </div>
            
            <div class="controls-section">
                <h2>🎮 Controles (Estilo Runner)</h2>
                <div class="controls-grid">
                    <div class="control-item">
                        <span class="key">ESPAÇO</span>
                        <span class="action">Pular</span>
                    </div>
                    <div class="control-item">
                        <span class="key">↑</span>
                        <span class="action">Pular</span>
                    </div>
                    <div class="control-item">
                        <span class="key">↓</span>
                        <span class="action">Agachar/Mergulhar</span>
                    </div>
                </div>
                <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
                    <strong>Como no jogo do dinossauro:</strong> Pule sobre obstáculos no chão e agache para evitar obstáculos no ar!
                </p>
            </div>
            
            <button id="start-button" class="game-button">🚀 Começar Aventura Runner</button>
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
                <p>Aqua conseguiu correr e saltar através de todos os obstáculos para alcançar a nascente pura e restaurar a vida ao oceano! Graças à sua determinação e habilidade, o ecossistema aquático está salvo.</p>
                <p>Você provou que mesmo os menores seres podem fazer a maior diferença. Continue protegendo nossos recursos naturais - cada ação conta para um futuro mais sustentável!</p>
                <p><strong>🎓 Durante esta jornada runner, você relembrou tudo o que aprendeu neste semestre sobre desenvolvimento de jogos, programação e tecnologia!</strong></p>
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
            <h1 class="gameover-title">💔 Aqua Tropeçou!</h1>
            <div class="gameover-message">
                <p>Aqua encontrou um obstáculo muito perigoso durante sua corrida e não conseguiu continuar sua jornada...</p>
                <p>Mas não desista! Cada tentativa nos aproxima da salvação do oceano. Tente novamente e ajude Aqua a correr até a nascente pura!</p>
                <p><strong>💡 Lembre-se:</strong> Pule sobre obstáculos no chão e agache para evitar obstáculos no ar. Cada obstáculo ultrapassado revela algo que você aprendeu neste semestre!</p>
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
4. **Cole o novo código CSS (Runner):**

[O código CSS completo está disponível no arquivo `style_runner.css` fornecido]

5. **Salve o arquivo** (Ctrl+S ou Cmd+S)

## ⚙️ Passo 5: Substituir o arquivo JavaScript

**⚠️ ATENÇÃO:** Este é o arquivo mais importante e complexo. Copie com cuidado!

1. **Abra o arquivo `script.js` no VS Code**
2. **Selecione todo o conteúdo** (Ctrl+A ou Cmd+A)
3. **Delete todo o conteúdo**
4. **Cole o novo código JavaScript (Runner):**

[O código JavaScript completo está disponível no arquivo `script_runner.js` fornecido]

5. **Salve o arquivo** (Ctrl+S ou Cmd+S)

## 🧪 Passo 6: Testar o Jogo Runner

1. **Abra o arquivo `index.html` no navegador:**
   - Clique com o botão direito no arquivo `index.html` no VS Code
   - Selecione "Open with Live Server" (se tiver a extensão) ou "Revelar no Explorador"
   - Abra o arquivo no seu navegador

2. **Teste as novas funcionalidades runner:**
   - ✅ Observe o axolote correndo automaticamente na linha de base
   - ✅ Use ESPAÇO ou ↑ para pular sobre obstáculos no chão
   - ✅ Use ↓ para agachar e evitar obstáculos no ar
   - ✅ Verifique se as mensagens de aprendizado aparecem ao ultrapassar obstáculos
   - ✅ Complete o jogo para testar a nova mensagem de vitória
   - ✅ Insira uma palavra/frase que resuma sua jornada

## 🎯 Mecânica Runner - Como Funciona

### 🏃‍♂️ **Movimento Automático**
- O axolote corre automaticamente para a direita
- Você não controla a velocidade horizontal
- A velocidade aumenta gradualmente conforme o progresso

### 🦘 **Sistema de Pulo**
- **ESPAÇO** ou **↑**: Faz o axolote pular
- **Gravidade**: O axolote cai naturalmente após o pulo
- **Linha de base**: Posição fixa onde o axolote corre

### 🦆 **Sistema de Agachar**
- **↓**: Faz o axolote agachar (reduz altura)
- **No ar**: Acelera a queda se pressionado durante o pulo
- **Altura reduzida**: Permite passar por baixo de obstáculos aéreos

### 🚧 **Tipos de Obstáculos**

#### **Obstáculos no Chão** (Exigem Pulo):
- **Algas Tóxicas**: Obstáculos verdes no chão
- **Pedras Contaminadas**: Rochas no caminho
- **Corais Mortos**: Estruturas pontiagudas

#### **Obstáculos no Ar** (Exigem Agachar):
- **Detritos Plásticos**: Lixo flutuando
- **Bolhas de Gás Tóxico**: Gases perigosos

## 🎓 Mensagens de Aprendizado (Mantidas)

As seguintes mensagens aparecerão quando você ultrapassar os obstáculos:

1. **Algas Tóxicas**: "Aprendi sobre Tipos e Gêneros de Jogos! 🎮"
2. **Pedras Contaminadas**: "Entendi melhor Conhecendo o Computador! 💻"
3. **Detritos Plásticos**: "Explorei a Teoria da Diversão! 🎯"
4. **Corais Mortos**: "Dominei o uso das Cores! 🎨"
5. **Bolhas de Gás Tóxico**: "Criei minha própria Pixel Art! 🖼️"
6. **Algas Tóxicas (variação)**: "Desenvolvi Algoritmos e Fluxogramas! 📊"
7. **Pedras Contaminadas (variação)**: "Construí com HTML e CSS! 🌐"
8. **Detritos Plásticos (variação)**: "Programo com Loops, Arrays e Objects! 💾"

## 🎉 Mensagem de Vitória Aprimorada (Mantida)

Ao completar o jogo (1000m), você verá:

1. A mensagem de vitória adaptada para o estilo runner
2. Uma nova seção sobre o aprendizado do semestre
3. Um prompt solicitando uma palavra/frase que resuma sua jornada
4. Sua resposta será exibida destacada na tela de vitória

## 🔧 Solução de Problemas

### ❌ Axolote não se move
- Verifique se copiou o código JavaScript corretamente
- Confirme que a função `startGame()` está sendo chamada
- Abra o Console do navegador (F12) e veja se há erros

### ❌ Controles não funcionam
- Verifique se os event listeners estão configurados
- Teste tanto ESPAÇO quanto as setas ↑ e ↓
- Confirme que o jogo está no estado 'playing'

### ❌ Obstáculos não aparecem
- Verifique se a função `generateObstacle()` está sendo chamada
- Confirme que as imagens dos obstáculos estão carregando
- Verifique se os obstáculos estão sendo posicionados corretamente

### ❌ Linha de base não aparece
- Verifique se a função `drawGround()` está sendo chamada
- Confirme que `GAME_CONFIG.GROUND_HEIGHT` está definido
- Verifique se o CSS tem a linha de base visual

### ❌ Animações não funcionam
- Confirme que `axolote_runner_animated.png` está na pasta `assets/`
- Verifique se o sprite sheet tem o formato correto
- Confirme que os frames estão sendo calculados corretamente

## 📞 Suporte

Se encontrar problemas:

1. **Verifique o Console do navegador** (F12 → Console) para erros
2. **Compare com os arquivos de backup** para identificar diferenças
3. **Recarregue a página completamente** após fazer alterações
4. **Teste em um navegador diferente** se necessário

## ✅ Checklist Final

- [ ] Backup dos arquivos originais criado
- [ ] Novos assets runner adicionados à pasta `assets/`
- [ ] Arquivo `index.html` substituído com versão runner
- [ ] Arquivo `style.css` substituído com versão runner
- [ ] Arquivo `script.js` substituído com versão runner
- [ ] Jogo testado no navegador
- [ ] Axolote corre automaticamente na linha de base
- [ ] Controles de pulo (ESPAÇO/↑) funcionando
- [ ] Controles de agachar (↓) funcionando
- [ ] Obstáculos no chão e no ar aparecendo
- [ ] Mensagens de aprendizado funcionando
- [ ] Mensagem de vitória aprimorada funcionando
- [ ] Física de gravidade funcionando corretamente

---

**🎊 Parabéns! Seu jogo Axolote Adventure agora é um verdadeiro runner como o jogo do dinossauro do Google!** 

Divirta-se correndo, pulando e agachando enquanto relembra tudo o que você aprendeu! 🌊🎮🦘

