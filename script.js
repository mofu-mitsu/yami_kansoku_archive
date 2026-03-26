/* 
  深層心理・闇観測実験アーカイブ Logic (Ver.29.0 Trauma Test & Debug)
*/

const paramNames = {
    mood: "情緒不安定", structure: "構造理解", mask: "演技・仮面", depend: "依存", void: "虚無・諦観",
    obsess: "執着", justice: "規範・正義", self_deny: "自己否定", trust: "信頼度", interest: "関心度",
    empathy: "共感・同調", ideal: "理想・ロマン", aggression: "攻撃性", trauma: "過去の傷", boredom: "退屈・倦怠",
    skepticism: "懐疑心", creativity: "創造・表現", control: "統制・支配", pride: "プライド・誇り", self_doubt: "自己懐疑(二重否定)", 
    social_phobia: "対人緊張(コミュ障)", fe_interface: "擬態社交(Feツール)", cleanliness: "潔癖・衛生", lie_hate: "虚偽嫌悪", deception: "欺瞞・偽悪",
    misanthropy: "人間嫌い", stoicism: "克己・ストイック", fe_fake: "社会的正解の模倣(防衛用Fe)", approval: "承認欲求・自己顕示", sacrifice: "自己犠牲・過剰適応",
    observer: "観測者気質", meta_view: "メタ視点", stimulation_need: "刺激欲求", future_fixation: "未来固定視(Ni固着)",
    alt_path: "代替案生成(Ne分岐思考)", reality_fatigue: "現実疲労", fe_awareness: "感情場認識", structure_priority: "構造優先",
    norm_priority: "規範優先", playfulness: "遊び心", impulsivity: "衝動性", warmth: "情緒温度"
};

let stats = {};
for (let k in paramNames) stats[k] = 0;

let currentQuestions =[];
let currentQIndex = 0;
let startTime = 0;
let historyLog = [];
let detailedLogs =[]; 
let previousScreen = 'start-screen';
let finalResultChar = null;
let currentSubjectId = "UNKNOWN";

let totalThinkTime = 0; 
let backCount = 0; 
let pigClicks = 0;
let pigInterval;
let pigElement;
let isPigWalking = false;
let log_illusionTime = 0;
let log_stroopMiss = 0;
let log_holdGameTime = 0;
let log_waitGameTime = 0;
let log_actionClicks = 0;
let log_wordEraserCount = 0;
let log_scratchPercent = 0;
let log_flashbackHideTime = 0; // ★NEW: トラウマテスト用
let timerInterval;

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] =[newArray[j], newArray[i]];
    }
    return newArray;
}

function generateAbstractArt(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; 
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 200;
    canvas.style.width = '100%'; canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const r = Math.random();
    
    if (r < 0.33) {
        for(let i=0; i<500; i++) {
            ctx.fillStyle = `rgba(${Math.random()*255}, 0, 50, ${Math.random()})`;
            ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*20, Math.random()*20);
        }
    } else if (r < 0.66) {
        ctx.strokeStyle = '#00ffcc';
        for(let i=0; i<20; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random()*canvas.width, Math.random()*canvas.height);
            ctx.lineTo(Math.random()*canvas.width, Math.random()*canvas.height);
            ctx.stroke();
        }
    } else {
        for(let i=0; i<10; i++) {
            ctx.beginPath();
            ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*50, 0, Math.PI*2);
            ctx.fillStyle = `rgba(50, 0, 100, 0.5)`;
            ctx.fill();
        }
    }
}

function initPigSystem() {
    pigClicks = 0;
    isPigWalking = false;
    let existingPig = document.getElementById('gohoubi-pig');
    if(existingPig) existingPig.remove();

    pigElement = document.createElement('div');
    pigElement.id = 'gohoubi-pig';
    pigElement.innerHTML = `🐖<div class="pig-speech" id="pig-speech"></div>`;
    document.body.appendChild(pigElement);

    pigElement.addEventListener('animationend', () => {
        pigElement.classList.remove('walk-left');
        pigElement.style.display = 'none'; 
        isPigWalking = false; 
    });

    pigElement.onclick = () => {
        pigClicks++;
        stats.impulsivity += 1;
        stats.playfulness += 1;
        stats.stimulation_need += 1;

        const speech = document.getElementById('pig-speech');
        if (pigClicks === 30) {
            pigElement.classList.remove('walk-left');
            isPigWalking = false;
            pigElement.classList.add('tonkotsu-center');
            pigElement.innerHTML = `🍜<div class="pig-speech show" id="pig-speech">拙者の風呂上がりの出汁だゾッ！🍜</div>`;
            setTimeout(() => {
                pigElement.classList.remove('tonkotsu-center');
                pigElement.style.display = 'none';
            }, 4000);
        } else if (pigClicks > 30) {
            speech.innerText = "もう出汁は出尽くしたゾ…😇";
            speech.classList.add('show');
            pigElement.style.transform = 'scale(0.8)';
            setTimeout(() => { pigElement.style.transform = 'scale(1)'; speech.classList.remove('show'); }, 2000);
        } else {
            const quotes =["ありがトン♡", "これはご褒美だゾ♡", "もっとワシャワシャするゾ！", "ぶひっ♡"];
            speech.innerText = quotes[Math.floor(Math.random() * quotes.length)];
            speech.classList.add('show');
            pigElement.style.transform = 'scale(0.8)';
            setTimeout(() => { pigElement.style.transform = 'scale(1)'; speech.classList.remove('show'); }, 1500);
        }
    };

    clearInterval(pigInterval);
    pigInterval = setInterval(() => {
        if(!isPigWalking && Math.random() < 0.4) { 
            isPigWalking = true; 
            pigElement.innerHTML = (pigClicks >= 30) ? `🍜<div class="pig-speech" id="pig-speech"></div>` : `🐖<div class="pig-speech" id="pig-speech"></div>`;
            pigElement.style.bottom = Math.floor(Math.random() * 40) + 15 + '%'; 
            pigElement.style.display = 'block'; 
            void pigElement.offsetWidth; 
            pigElement.classList.add('walk-left');
        }
    }, 6000);
}

function handleHomeClick(event) {
    const quizScreen = document.getElementById('quiz-screen');
    if (quizScreen.classList.contains('active')) {
        event.preventDefault(); 
        if(confirm("観測を中断してタイトルに戻りますか？")) {
            location.reload(); 
        }
    }
}

function generateSubjectId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'SBJ-';
    for(let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function startExperiment() {
    currentSubjectId = generateSubjectId();
    document.getElementById('user-id').innerText = currentSubjectId;

    currentQuestions = shuffle(allQuestions).slice(0, 20); 
    for(let k in stats) stats[k] = 0;
    historyLog = [];
    detailedLogs =[]; 
    currentQIndex = 0;
    
    totalThinkTime = 0;
    backCount = 0;
    log_illusionTime = 0;
    log_stroopMiss = 0;
    log_holdGameTime = 0;
    log_waitGameTime = 0;
    log_actionClicks = 0;
    log_wordEraserCount = 0;
    log_scratchPercent = 0;
    log_flashbackHideTime = 0; // ★NEW

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('archive-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    
    initPigSystem();
    showQuestion();
}

function updateTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const diff = (Date.now() - startTime) / 1000;
        const display = document.getElementById('timer-display');
        if (display) display.innerText = diff.toFixed(2) + "s";
    }, 50);
}

function showQuestion() {
    if (currentQIndex >= currentQuestions.length) {
        finishExperiment();
        return;
    }

    const q = currentQuestions[currentQIndex];
    document.getElementById('q-text').innerText = q.text || "質問テキストがありません";
    
    const inputArea = document.getElementById('input-area');
    inputArea.innerHTML = '';
    const imgArea = document.getElementById('image-area');
    
    if (q.type === 'image') {
        imgArea.classList.remove('hidden');
        setTimeout(() => generateAbstractArt('image-area'), 10);
    } else {
        imgArea.classList.add('hidden');
        imgArea.innerHTML = '';
    }

    document.getElementById('progress-fill').style.width = `${(currentQIndex / currentQuestions.length) * 100}%`;
    document.getElementById('back-btn').disabled = (currentQIndex === 0);

    let options = q.options ? shuffle([...q.options]) :[];

    // --- 1. 通常の選択肢 / 画像 ---
    if (q.type === 'select' || q.type === 'image') {
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt.text;
            btn.onclick = () => {
                const cCheck = document.getElementById('certainty-check');
                const cert = (cCheck && !cCheck.checked) ? 0.5 : 1.0;
                handleAnswer(opt.scores, cert, false, opt.text);
            };
            inputArea.appendChild(btn);
        });
        const rejectBtn = document.createElement('button');
        rejectBtn.className = 'option-btn';
        rejectBtn.style.border = '1px dashed #666';
        rejectBtn.style.color = '#888';
        rejectBtn.innerText = "この質問の前提がおかしい / 答えたくない";
        rejectBtn.onclick = () => handleAnswer({}, 1.0, true, "前提否定 / 答えたくない");
        inputArea.appendChild(rejectBtn);

        const certaintyDiv = document.createElement('div');
        certaintyDiv.style.marginTop = '15px';
        certaintyDiv.style.textAlign = 'right';
        certaintyDiv.style.fontSize = '0.8rem';
        certaintyDiv.style.color = '#aaa';
        certaintyDiv.innerHTML = `<label><input type="checkbox" id="certainty-check" checked> 確信して答える</label>`;
        inputArea.appendChild(certaintyDiv);

    // --- 2. テキスト入力 ---
    } else if (q.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'text-input';
        input.placeholder = 'ここに入力...';
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = '送信';
        btn.onclick = () => {
            if(q.keywordLogic) {
                const scores = q.keywordLogic(input.value);
                const ansText = input.value.trim() === "" ? "(無言・空白)" : `「${input.value}」と入力`;
                handleAnswer(scores, 1.0, false, ansText);
            }
        };
        inputArea.appendChild(input);
        inputArea.appendChild(btn);

    // --- 3. チェックボックス ---
    } else if (q.type === 'check') {
        const container = document.createElement('div');
        container.className = 'checkbox-group';
        options.forEach((opt, idx) => {
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            label.innerHTML = `<input type="checkbox" name="q-check" value="${idx}"> ${opt.text}`;
            container.appendChild(label);
        });
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = '決定';
        btn.onclick = () => {
            const checked = container.querySelectorAll('input[type="checkbox"]:checked');
            let totalScores = {};
            let selectedTexts =[];
            checked.forEach(chk => {
                const opt = options[chk.value];
                selectedTexts.push(opt.text);
                for(let k in opt.scores) totalScores[k] = (totalScores[k] || 0) + opt.scores[k];
            });
            const ansText = selectedTexts.length > 0 ? selectedTexts.join(' / ') : "何も選択しなかった";
            handleAnswer(totalScores, 1.0, false, ansText);
        };
        inputArea.appendChild(container);
        inputArea.appendChild(btn);

    // --- 4. スライダー ---
    } else if (q.type === 'slider') {
        const container = document.createElement('div');
        container.className = 'slider-container';
        container.innerHTML = `
            <div class="slider-labels"><span>${q.labels[0]}</span><span>${q.labels[1]}</span></div>
            <input type="range" id="slider-input" min="0" max="100" value="50">
        `;
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = '決定';
        btn.style.marginTop = '20px';
        btn.onclick = () => {
            const val = parseInt(document.getElementById('slider-input').value);
            const scores = q.sliderLogic(val);
            handleAnswer(scores, 1.0, false, `スライダー値: ${val}%`);
        };
        inputArea.appendChild(container);
        inputArea.appendChild(btn);

    // --- 5. ゲシュタルト崩壊 (illusion) ---
    } else if (q.type === 'illusion') {
        const desc = document.createElement('p');
        desc.innerText = "直感で、たった一つ存在する「最も正しい文字」を素早くタップしてください。";
        desc.style.color = '#aaa';
        desc.style.fontSize = '0.9rem';
        inputArea.appendChild(desc);
        const container = document.createElement('div');
        container.className = 'illusion-container';
        let illusionStart = Date.now();
        for (let i = 0; i < q.count; i++) {
            const charBtn = document.createElement('span');
            charBtn.className = 'illusion-char';
            charBtn.innerText = q.charTarget;
            charBtn.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;
            charBtn.onclick = () => {
                const thinkTime = (Date.now() - illusionStart) / 1000;
                log_illusionTime = thinkTime; 
                const scores = q.gameLogic ? q.gameLogic(thinkTime) : {};
                handleAnswer(scores, 1.0, false, `文字をタップ (思考時間: ${thinkTime.toFixed(1)}秒)`);
            };
            container.appendChild(charBtn);
        }
        inputArea.appendChild(container);

    // --- 6. ストループテスト (stroop) ---
    } else if (q.type === 'stroop') {
        const desc = document.createElement('p');
        desc.innerText = "【警告】文字の意味ではなく、文字に塗られている『色』を選択してください。";
        desc.style.color = '#ff0055';
        inputArea.appendChild(desc);
        const wordDisplay = document.createElement('h1');
        wordDisplay.innerText = q.fakeWord; 
        wordDisplay.style.color = q.realColor; 
        wordDisplay.style.fontSize = '4rem';
        wordDisplay.style.margin = '20px 0';
        inputArea.appendChild(wordDisplay);
        let stroopStart = Date.now();
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt.text;
            btn.style.textAlign = 'center';
            btn.onclick = () => {
                const timeTaken = (Date.now() - stroopStart) / 1000;
                if (!opt.isCorrect) log_stroopMiss++; 
                const scores = q.gameLogic ? q.gameLogic(timeTaken, opt.isCorrect) : {};
                handleAnswer(scores, 1.0, false, `「${opt.text}」を選択 (${opt.isCorrect ? '正解' : '誤答'})`);
            };
            inputArea.appendChild(btn);
        });

    // --- 7. 長押しテスト (hold) ---
    } else if (q.type === 'hold') {
        const holdBtn = document.createElement('button');
        holdBtn.className = 'btn';
        holdBtn.innerText = q.buttonText || "🔴 感情の注入";
        holdBtn.style.background = '#220000';
        holdBtn.style.color = '#ff0055';
        holdBtn.style.border = '2px solid #ff0055';
        holdBtn.style.width = '100%';
        holdBtn.style.padding = '30px';
        holdBtn.style.fontSize = '1.5rem';
        holdBtn.style.userSelect = 'none';
        holdBtn.style.touchAction = 'none';
        inputArea.appendChild(holdBtn);
        let holdStartTime = 0;
        let isHolding = false;

        const startHold = (e) => {
            if(e.cancelable) e.preventDefault(); 
            if (isHolding) return;
            isHolding = true;
            holdStartTime = Date.now();
            holdBtn.style.background = '#ff0055'; holdBtn.style.color = '#fff'; holdBtn.style.transform = 'scale(0.95)';
            holdBtn.innerText = "注入中...";
        };
        const endHold = (e) => {
            if(e.cancelable) e.preventDefault();
            if (!isHolding) return;
            isHolding = false;
            const holdTime = (Date.now() - holdStartTime) / 1000;
            log_holdGameTime = holdTime; 
            holdBtn.style.background = '#220000'; holdBtn.style.color = '#ff0055'; holdBtn.style.transform = 'scale(1)';
            holdBtn.innerText = `${holdTime.toFixed(2)}秒 注入完了`;
            setTimeout(() => {
                const scores = q.gameLogic ? q.gameLogic(holdTime) : {};
                handleAnswer(scores, 1.0, false, `${holdTime.toFixed(1)}秒間 長押し`);
            }, 1000);
        };
        holdBtn.addEventListener('mousedown', startHold);
        holdBtn.addEventListener('mouseup', endHold);
        holdBtn.addEventListener('mouseleave', endHold);
        holdBtn.addEventListener('touchstart', startHold, {passive: false});
        holdBtn.addEventListener('touchend', endHold, {passive: false});

    // --- 8. 待機テスト (wait) ---
    } else if (q.type === 'wait') {
        const desc = document.createElement('p');
        desc.innerText = q.text || "10秒間待機してください。";
        inputArea.appendChild(desc);
        const skipBtn = document.createElement('button');
        skipBtn.className = 'btn';
        skipBtn.style.borderColor = '#ff0055'; skipBtn.style.color = '#ff0055';
        skipBtn.innerText = "待たずに次へ進む";
        inputArea.appendChild(skipBtn);
        const waitDisplay = document.createElement('p');
        waitDisplay.style.fontSize = '2rem'; waitDisplay.style.color = '#00ffcc';
        waitDisplay.innerText = "10";
        inputArea.appendChild(waitDisplay);
        let waitTime = 0;
        let waitInterval = setInterval(() => {
            waitTime++;
            let remain = 10 - waitTime;
            if (remain > 0) { waitDisplay.innerText = remain; } 
            else {
                clearInterval(waitInterval);
                waitDisplay.innerText = "【真実】この世界に意味などない。";
                skipBtn.innerText = "結果を送信";
                skipBtn.style.borderColor = '#00ffcc'; skipBtn.style.color = '#00ffcc';
            }
        }, 1000);
        skipBtn.onclick = () => {
            clearInterval(waitInterval);
            log_waitGameTime = waitTime;
            const scores = q.gameLogic ? q.gameLogic(waitTime) : {};
            handleAnswer(scores, 1.0, false, waitTime >= 10 ? "10秒待機完了" : `${waitTime}秒でスキップ`);
        };

    // --- 9. 行動観測 (action) ---
    } else if (q.type === 'action') {
        const desc = document.createElement('p');
        desc.innerText = q.instruction || "赤いボタンがあります。";
        desc.style.fontSize = '0.9rem'; desc.style.color = '#aaa'; desc.style.marginBottom = '20px';
        inputArea.appendChild(desc);
        const actionBtn = document.createElement('button');
        actionBtn.className = 'btn';
        actionBtn.innerText = q.buttonText || "🔴 絶対に押すな";
        actionBtn.style.background = '#330011'; actionBtn.style.color = '#ff0055'; actionBtn.style.border = '2px solid #ff0055';
        actionBtn.style.width = '100%'; actionBtn.style.padding = '20px'; actionBtn.style.fontSize = '1.5rem';
        let localClickCount = 0;
        actionBtn.onclick = () => {
            localClickCount++;
            actionBtn.innerText = `WARNING: ${localClickCount}`;
            actionBtn.style.background = `rgba(255, 0, 85, ${Math.min(localClickCount * 0.1, 1)})`;
        };
        inputArea.appendChild(actionBtn);
        const finishBtn = document.createElement('button');
        finishBtn.className = 'option-btn'; finishBtn.innerText = "観測を終了して次へ"; finishBtn.style.marginTop = '20px';
        finishBtn.onclick = () => {
            log_actionClicks = localClickCount;
            const scores = q.actionLogic ? q.actionLogic(localClickCount) : {};
            handleAnswer(scores, 1.0, false, `ボタンを ${localClickCount}回 押した`);
        };
        inputArea.appendChild(finishBtn);

    // --- 10. 逃げるボタン (catch_button) ---
    } else if (q.type === 'catch_button') {
        const desc = document.createElement('p');
        desc.innerText = q.text;
        inputArea.appendChild(desc);
        const btnContainer = document.createElement('div');
        btnContainer.style.position = 'relative'; btnContainer.style.height = '200px'; btnContainer.style.width = '100%'; 
        inputArea.appendChild(btnContainer);
        options.forEach((opt) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt.text;
            if (opt.isEvasive) {
                btn.className += ' evasive-btn'; btn.style.width = '80%';
                const evade = (e) => {
                    if(e && e.cancelable) e.preventDefault(); 
                    btn.style.position = 'absolute';
                    btn.style.top = Math.floor(Math.random() * 150) + 'px';
                    btn.style.left = Math.floor(Math.random() * 20) + '%';
                };
                btn.onmouseover = evade; btn.addEventListener('touchstart', evade, {passive: false});
            }
            btn.onclick = () => handleAnswer(opt.scores, 1.0, false, opt.text);
            if (opt.isEvasive) btnContainer.appendChild(btn); 
            else inputArea.appendChild(btn); 
        });

    // --- 11. 言霊消去ゲーム (word_eraser) ---
    } else if (q.type === 'word_eraser') {
        const desc = document.createElement('p');
        desc.innerText = q.text; desc.style.color = '#ff0055';
        inputArea.appendChild(desc);
        const container = document.createElement('div');
        container.className = 'word-eraser-container';
        let erasedWords =[];
        q.words.forEach((wordObj) => {
            const wordEl = document.createElement('div');
            wordEl.className = 'floating-word'; wordEl.innerText = wordObj.text;
            wordEl.style.top = Math.floor(Math.random() * 80) + '%'; wordEl.style.left = Math.floor(Math.random() * 80) + '%';
            wordEl.style.animationDelay = `${Math.random() * 2}s`;
            wordEl.onclick = () => { wordEl.style.display = 'none'; erasedWords.push(wordObj); };
            container.appendChild(wordEl);
        });
        inputArea.appendChild(container);
        const btn = document.createElement('button');
        btn.className = 'btn'; btn.innerText = '観測終了 (10秒待機)'; btn.disabled = true;
        inputArea.appendChild(btn);
        let timeLeft = 10;
        const gameTimer = setInterval(() => {
            timeLeft--;
            btn.innerText = `観測中... 残り${timeLeft}秒`;
            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                btn.innerText = "結果を送信"; btn.disabled = false; btn.style.borderColor = '#00ffcc';
                btn.onclick = () => {
                    log_wordEraserCount = erasedWords.length;
                    const scores = q.gameLogic ? q.gameLogic(erasedWords) : {};
                    let wordsText = erasedWords.map(w => w.text).join(", ") || "何も消さなかった";
                    handleAnswer(scores, 1.0, false, `消去: ${wordsText}`);
                };
                setTimeout(() => btn.click(), 1000); 
            }
        }, 1000);

    // --- 12. ノイズ拭き取り (scratch) ---
    } else if (q.type === 'scratch') {
        const desc = document.createElement('p');
        desc.innerText = q.text;
        inputArea.appendChild(desc);
        const container = document.createElement('div');
        container.className = 'scratch-container';
        container.innerHTML = `<div class="scratch-secret-text">${q.secretText}</div>`;
        const canvas = document.createElement('canvas');
        canvas.className = 'scratch-canvas';
        container.appendChild(canvas);
        inputArea.appendChild(container);
        const ctx = canvas.getContext('2d');
        setTimeout(() => {
            canvas.width = container.offsetWidth; canvas.height = container.offsetHeight;
            ctx.fillStyle = '#111'; ctx.fillRect(0, 0, canvas.width, canvas.height);
            for(let i=0; i<1000; i++){
                ctx.fillStyle = Math.random() > 0.5 ? '#222' : '#000';
                ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 2, 2);
            }
        }, 100);
        let isDrawing = false;
        const erase = (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            if (clientX === undefined || clientY === undefined) return;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(clientX - rect.left, clientY - rect.top, 20, 0, Math.PI * 2, false);
            ctx.fill();
        };
        canvas.onmousedown = () => isDrawing = true;
        canvas.onmouseup = () => isDrawing = false;
        canvas.onmousemove = erase;
        canvas.ontouchstart = (e) => { isDrawing = true; erase(e); };
        canvas.ontouchend = () => isDrawing = false;
        canvas.ontouchmove = (e) => { if(e.cancelable) e.preventDefault(); erase(e); };

        const btn = document.createElement('button');
        btn.className = 'btn'; btn.innerText = '観測終了 (10秒待機)'; btn.disabled = true;
        inputArea.appendChild(btn);
        let timeLeft = 10;
        const gameTimer = setInterval(() => {
            timeLeft--;
            btn.innerText = `観測中... 残り${timeLeft}秒`;
            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                btn.innerText = "結果を送信"; btn.disabled = false;
                btn.onclick = () => {
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                    let clearPixels = 0;
                    for (let i = 3; i < imageData.length; i += 4) { if (imageData[i] === 0) clearPixels++; }
                    const clearedPercent = (clearPixels / (canvas.width * canvas.height)) * 100;
                    log_scratchPercent = clearedPercent;
                    const scores = q.gameLogic ? q.gameLogic(clearedPercent) : {};
                    handleAnswer(scores, 1.0, false, `拭き取り: ${clearedPercent.toFixed(1)}%`);
                };
                setTimeout(() => btn.click(), 1000);
            }
        }, 1000);

    // --- 13. ★ NEW: トラウマ観測 (flashback) ---
    } else if (q.type === 'flashback') {
        const desc = document.createElement('p');
        desc.innerText = q.text;
        inputArea.appendChild(desc);

        const flashBox = document.createElement('div');
        flashBox.style.width = '100%'; flashBox.style.height = '150px';
        flashBox.style.background = '#000'; flashBox.style.border = '2px solid #ff0055';
        flashBox.style.position = 'relative'; flashBox.style.overflow = 'hidden'; flashBox.style.marginBottom = '15px';
        inputArea.appendChild(flashBox);

        const noiseMsg = document.createElement('div');
        noiseMsg.innerText = q.secretWord || "思い出したくない";
        noiseMsg.style.position = 'absolute'; noiseMsg.style.top = '50%'; noiseMsg.style.left = '50%';
        noiseMsg.style.transform = 'translate(-50%, -50%)'; noiseMsg.style.color = 'red';
        noiseMsg.style.fontSize = '1.5rem'; noiseMsg.style.opacity = '0';
        flashBox.appendChild(noiseMsg);

        let flashInterval = setInterval(() => {
            noiseMsg.style.opacity = Math.random() > 0.5 ? '1' : '0.2';
            flashBox.style.backgroundColor = Math.random() > 0.8 ? '#330000' : '#000';
        }, 100);

        const hideBtn = document.createElement('button');
        hideBtn.className = 'btn'; hideBtn.innerText = "目を逸らす（長押し）";
        inputArea.appendChild(hideBtn);

        let holdStartTime = 0; let isHolding = false; let totalHoldTime = 0;

        const startHold = (e) => {
            if(e.cancelable) e.preventDefault();
            isHolding = true; holdStartTime = Date.now();
            flashBox.style.backgroundColor = '#000'; noiseMsg.style.display = 'none';
            hideBtn.innerText = "目を逸らしている...";
        };
        const endHold = (e) => {
            if(e.cancelable) e.preventDefault();
            if (!isHolding) return;
            isHolding = false;
            totalHoldTime += (Date.now() - holdStartTime) / 1000;
            flashBox.style.backgroundColor = ''; noiseMsg.style.display = 'block';
            hideBtn.innerText = "目を逸らす（長押し）";
        };

        hideBtn.addEventListener('mousedown', startHold); hideBtn.addEventListener('mouseup', endHold);
        hideBtn.addEventListener('mouseleave', endHold);
        hideBtn.addEventListener('touchstart', startHold, {passive: false}); hideBtn.addEventListener('touchend', endHold, {passive: false});

        setTimeout(() => {
            clearInterval(flashInterval);
            log_flashbackHideTime = totalHoldTime;
            const scores = q.gameLogic ? q.gameLogic(totalHoldTime) : {};
            handleAnswer(scores, 1.0, false, `目を逸らした時間: ${totalHoldTime.toFixed(1)}秒`);
        }, 10000);
    }

    startTime = Date.now();
    updateTimer();
}

function handleAnswer(scores, certainty = 1.0, isRejection = false, answerText = "不明") {
    clearInterval(timerInterval);
    const timeTaken = (Date.now() - startTime) / 1000;
    totalThinkTime += timeTaken;

    const q = currentQuestions[currentQIndex];
    const qText = q.text || "【テキストのない行動観測質問】";
    
    detailedLogs.push({
        qNum: currentQIndex + 1,
        question: qText.replace(/\n/g, " "), 
        answer: answerText,
        time: timeTaken.toFixed(1)
    });

    let timeScores = {};
    if (isRejection) {
        timeScores.void = 2; timeScores.interest = -3; timeScores.skepticism = 2; timeScores.meta_view = 2;  
    }
    if (timeTaken > 6.0) {
        if (scores && scores.structure_priority > 0) timeScores.structure_priority = 1;
        timeScores.self_doubt = 1; 
    } else if (timeTaken < 1.5) {
        timeScores.impulsivity = 2; 
    }

    let addedScores = {...(scores || {})};
    for(let k in timeScores) addedScores[k] = (addedScores[k] || 0) + timeScores[k];
    for (let key in addedScores) addedScores[key] = addedScores[key] * certainty;

    historyLog.push(addedScores);
    for (let key in addedScores) {
        if (stats.hasOwnProperty(key)) stats[key] += addedScores[key];
    }

    currentQIndex++;
    showQuestion();
}

function goBack() {
    if (currentQIndex <= 0 || historyLog.length === 0) return;
    backCount++; 
    stats.self_doubt += 1; 
    stats.alt_path += 1;
    detailedLogs.pop();
    
    const lastScores = historyLog.pop();
    for (let key in lastScores) {
        if (stats.hasOwnProperty(key)) stats[key] -= lastScores[key];
    }
    currentQIndex--;
    showQuestion();
}

function finishExperiment() {
    clearInterval(pigInterval);
    if(pigElement) pigElement.style.display = 'none';
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('loading-screen').classList.add('active');
    setTimeout(() => showResult(), 2500);
}

function showResult() {
    document.getElementById('loading-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    let bestChar = null; let maxScore = -Infinity;
    let worstChar = null; let minScore = Infinity;

    characters.forEach(char => {
        const score = char.logic(stats);
        if (score > maxScore) { maxScore = score; bestChar = char; }
        if (score < minScore) { minScore = score; worstChar = char; }
    });
    
    finalResultChar = bestChar;

    const hazardScore = stats.aggression + stats.void + stats.trauma + stats.obsess + stats.self_deny;
    let hazardLevel = "C (Safe)"; let hazardColor = "#00ffcc";
    
    // ★NEW: Hazard Level の理由を生成
    let hazardReasons =[];
    if (stats.aggression > 6) hazardReasons.push("高い攻撃性");
    if (stats.void > 6) hazardReasons.push("深刻な虚無感");
    if (stats.trauma > 5) hazardReasons.push("過去の傷(トラウマ)");
    if (stats.obsess > 6) hazardReasons.push("異常な執着");
    if (stats.self_deny > 6) hazardReasons.push("強い自己否定");
    
    let hazardReasonText = "";
    if (hazardReasons.length > 0) {
        hazardReasonText = `<br><span style="font-size:0.8rem; color:#aaa; font-weight:normal;">(要因: ${hazardReasons.join("、")})</span>`;
    }

    if (hazardScore > 20) { hazardLevel = "S (Lethal)"; hazardColor = "#ff0055"; }
    else if (hazardScore > 15) { hazardLevel = "A (Dangerous)"; hazardColor = "#ff6600"; }
    else if (hazardScore > 10) { hazardLevel = "B (Warning)"; hazardColor = "#ffcc00"; }

    let systemWarning = "観測は正常に終了しました。特筆すべき異常はありません。";
    if (stats.self_doubt > 12) systemWarning = "【警告】自己懐疑が致死量に達しています。自分の思考を疑うのをやめなさい。";
    else if (stats.void > 15) systemWarning = "【警告】虚無感が規定値を超過。現実世界との接続が切断されかけています。";
    else if (stats.structure_priority > 15) systemWarning = "【警告】構造と論理に過剰に依存しています。非合理（感情）の存在を認めてください。";
    else if (stats.approval > 12) systemWarning = "【警告】承認飢餓状態です。他者の視線に自己を明け渡さないでください。";
    else if (stats.misanthropy > 12) systemWarning = "【警告】極度の人間不信を観測。他者をシステムから排除しようとしないでください。";
    else if (stats.reality_fatigue > 12) systemWarning = "【警告】現実への激しい疲労が見られます。安全な場所で休眠モードに移行してください。";

    document.getElementById('result-type-name').innerText = bestChar.type_title;
    document.getElementById('result-quote').innerText = bestChar.quote;
    document.getElementById('result-desc').innerText = bestChar.desc;
    
    const detailHtml = `
        <div class="profile-box">
            <div class="profile-row"><span class="label">■ Name:</span> ${bestChar.fullname || bestChar.name}</div>
            <div class="profile-row"><span class="label">■ Gender:</span> ${bestChar.gender || "Unknown"}</div>
            <div class="profile-row"><span class="label">■ Group:</span> <span style="color:#ff0055;">${bestChar.group || "Unknown"}</span></div>
            <div class="profile-row"><span class="label">■ Subject ID:</span> ${currentSubjectId}</div>
            <div class="profile-row" style="margin: 10px 0; border-top: 1px dashed #555; padding-top: 10px;">
                <span class="label">■ Hazard Level:</span> <span style="color:${hazardColor}; font-weight:bold; font-size:1.2rem;">${hazardLevel}</span>${hazardReasonText}
            </div>
            <div class="profile-row" style="color:#aaa; font-size:0.8rem; margin-bottom:10px;">
                <span class="label">■ 敵対検体 (相性最悪):</span> ${worstChar.name} (${worstChar.type_title})
            </div>
            <div class="profile-row" style="color:#ffcc00; font-size:0.85rem; border-left: 3px solid #ffcc00; padding-left: 8px;">
                ${systemWarning}
            </div>
            <div class="profile-row" style="margin-top:10px;">
                ${(bestChar.tags ? bestChar.tags.map(t => `<span class="tag" style="background:#333; padding:2px 5px; margin:2px; font-size:0.8em; display:inline-block; border:1px solid #555;">${t}</span>`).join(' ') : "")}
            </div>
        </div>
    `;
    document.getElementById('match-chara-detail').innerHTML = detailHtml;

    const imgBox = document.getElementById('result-img-box');
    const dummyIcon = document.getElementById('dummy-icon');
    if (bestChar.image) {
        imgBox.style.backgroundImage = `url('images/${bestChar.image}')`;
        dummyIcon.style.display = 'none';
    } else {
        imgBox.style.backgroundImage = 'none';
        dummyIcon.style.display = 'block';
    }

    const statsContainer = document.getElementById('stats-list');
    statsContainer.innerHTML = '';
    const sortedKeys = Object.keys(stats).sort((a, b) => Math.abs(stats[b]) - Math.abs(stats[a]));

    sortedKeys.slice(0, 5).forEach(key => {
        const row = document.createElement('div');
        row.className = 'stat-row';
        let percent = Math.min(100, Math.max(0, (stats[key] + 5) / 30 * 100));
        row.innerHTML = `
            <span>${paramNames[key] || key}</span>
            <div class="bar-bg"><div class="bar-fill" style="width:${percent}%"></div></div>
        `;
        statsContainer.appendChild(row);
    });

    const logList = document.getElementById('hidden-log-list');
    if (logList) {
        logList.innerHTML = '';
        const avgTime = (totalThinkTime / currentQuestions.length).toFixed(1);
        let thinkTendency = avgTime > 6 ? '(深刻な長考/自己懐疑)' : (avgTime < 2 ? '(極度の衝動/直感依存)' : '(正常範囲)');
        logList.innerHTML += `<li>平均回答遅延: ${avgTime}秒 ${thinkTendency}</li>`;
        
        if (backCount > 0) logList.innerHTML += `<li>選択の修正・後悔: ${backCount}回 (Ne代替案の生成)</li>`;
        if (log_illusionTime > 0) logList.innerHTML += `<li>意味喪失テスト: ${log_illusionTime.toFixed(1)}秒 (存在しない法則の探求)</li>`;
        if (log_stroopMiss > 0) logList.innerHTML += `<li>認知不協和テスト: 誤答 (直感・衝動エラー)</li>`;
        if (pigClicks > 0) logList.innerHTML += `<li>ノイズ接触回数: ${pigClicks}回 (Se/Ne散漫性)</li>`;
        if (log_waitGameTime > 0) logList.innerHTML += `<li>待機テスト: ${log_waitGameTime}秒 (忍耐限界)</li>`;
        if (log_holdGameTime > 0) logList.innerHTML += `<li>感情注入テスト: ${log_holdGameTime.toFixed(1)}秒 (執着観測)</li>`;
        if (log_actionClicks > 0) logList.innerHTML += `<li>警告無視: ${log_actionClicks}回 (懐疑的観測)</li>`;
        if (log_wordEraserCount > 0) logList.innerHTML += `<li>言霊消去数: ${log_wordEraserCount}個 (消去願望)</li>`;
        if (log_scratchPercent > 0) logList.innerHTML += `<li>ノイズ拭き取り: ${log_scratchPercent.toFixed(0)}% (潔癖度)</li>`;
        if (log_flashbackHideTime > 0) logList.innerHTML += `<li>フラッシュバック回避: ${log_flashbackHideTime.toFixed(1)}秒 (トラウマ防衛)</li>`;
    }

// ====================================================
    // ★ 観測データをGAS(みつきのメール)に裏で送信 ★
    // ====================================================
    const logTexts =[];
    if (logList) {
        const lis = logList.querySelectorAll('li');
        lis.forEach(li => logTexts.push(li.innerText));
    }

    const topStatsData = sortedKeys.slice(0, 5).map(key => {
        return { name: paramNames[key] || key, score: stats[key] };
    });

    const payload = {
        subjectId: currentSubjectId,
        resultChar: bestChar.name,
        typeTitle: bestChar.type_title,
        hazardLevel: hazardLevel,
        logs: logTexts,
        topStats: topStatsData,
        detailedAnswers: detailedLogs
    };

    // ★ ここに新しく発行したGASのURLを貼る！
    const gasUrl = "https://script.google.com/macros/s/AKfycbyr7F4qbqdkj6KMF-NLDjnchxEAf0AeyAEvvNYrwqwGAcpFO4Wr2C39lO62B9SToxq2/exec";

    if (gasUrl !== "https://script.google.com/macros/s/AKfycbyr7F4qbqdkj6KMF-NLDjnchxEAf0AeyAEvvNYrwqwGAcpFO4Wr2C39lO62B9SToxq2/exec") {
        fetch(gasUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'text/plain' // CORS回避のため必須
            },
            body: JSON.stringify(payload),
            redirect: 'follow' // ★超重要：GASのリダイレクトを追いかける
        })
        .then(response => {
            if (!response.ok) throw new Error("HTTPステータス異常: " + response.status);
            return response.text();
        })
        .then(text => {
            console.log("観測データ送信完了:", text);
            // alert("【DEBUG】データ送信成功！\n" + text); // 成功アラート（本番では消してOK）
        })
        .catch(error => {
            console.error("データ送信エラー:", error);
            // 強制的にエラーを画面に出す！！
            alert("【DEBUGエラー】観測データの送信に失敗しました。\n" + error.message);
        });
    }
} // ← showResult 関数の終わり

// (saveResultImage, shareResult, showArchive, backFromArchive, showArchiveDetail は前回と同じ)
function saveResultImage() {
    const target = document.getElementById('capture-area');
    const btn = document.querySelector('.save-btn');
    if (!target) return;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 画像生成中...';
    btn.disabled = true;

    html2canvas(target, { backgroundColor: '#050505', scale: 2, useCORS: true, allowTaint: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:10000; display:flex; flex-direction:column; align-items:center; justify-content:center;';
        modal.innerHTML = `
            <p style="color: #00ffcc; margin-bottom: 15px; text-align:center;">画像を長押し（PCは右クリック）して<br>「写真に追加」または「保存」してね！📱</p>
            <img src="${imgData}" style="max-width: 90%; max-height: 70vh; border: 2px solid #ff0055; border-radius: 10px; box-shadow: 0 0 20px #ff0055; object-fit: contain;">
            <button class="btn" style="margin-top: 20px; border-color: #00ffcc; color: #00ffcc;" onclick="this.parentElement.remove()">閉じる</button>
        `;
        document.body.appendChild(modal);
        btn.innerHTML = originalText; btn.disabled = false;
    }).catch(err => {
        alert("画像の生成に失敗しました。");
        btn.innerHTML = originalText; btn.disabled = false;
    });
}

function shareResult() {
    if (!finalResultChar) return;
    const text = `【観測結果】\nタイプ：『${finalResultChar.type_title}』\n類似検体：${finalResultChar.name}\n\n#闇観測実験 #オリジナル診断`;
    const url = "https://mofu-mitsu.github.io/yami_kansoku_archive/";
    if (navigator.share) {
        navigator.share({ title: "深層心理・闇観測実験アーカイブ", text: text, url: url }).catch(console.error);
    } else {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    }
}

function showArchive(fromScreen) {
    previousScreen = fromScreen;
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('archive-screen').classList.add('active');
    const list = document.getElementById('archive-list');
    list.innerHTML = '';
    characters.forEach(char => {
        const item = document.createElement('div');
        item.className = 'archive-item';
        item.innerHTML = `
            <div class="archive-icon" style="${char.image ? `background-image: url('images/${char.image}');` : `background-color: #333;`} background-size: cover; background-position: center;">
                ${!char.image ? '<i class="fa-solid fa-user-secret" style="color:#aaa; font-size:1.5rem; display:block; text-align:center; line-height:50px;"></i>' : ''}
            </div>
            <div class="archive-info"><h4>${char.name}</h4><p>${char.type_title}</p></div>
        `;
        item.onclick = () => showArchiveDetail(char);
        list.appendChild(item);
    });
}

function backFromArchive() {
    document.getElementById('archive-screen').classList.remove('active');
    if(document.getElementById(previousScreen)) document.getElementById(previousScreen).classList.add('active');
    else document.getElementById('start-screen').classList.add('active');
}

function showArchiveDetail(char) {
    const existing = document.getElementById('archive-detail-modal');
    if(existing) existing.remove();
    const modal = document.createElement('div');
    modal.id = 'archive-detail-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" style="position:absolute; top:10px; right:15px; font-size:2rem; cursor:pointer; color:#fff;">×</span>
            <div class="chara-img-box" style="margin:0 auto 15px; width:100px; height:100px; border-radius:50%; border:2px solid #ff0055; background-image: url('${char.image ? `images/${char.image}` : ''}'); background-size:cover; background-color:#333;">
               ${!char.image ? '<i class="fa-solid fa-user-secret dummy-icon" style="line-height:100px; font-size:3rem; color:#aaa;"></i>' : ''}
            </div>
            <h3 style="color:#00ffcc; margin:5px 0;">${char.type_title}</h3>
            <h2 style="font-size:2rem; margin:5px 0;">${char.name}</h2>
            <div class="quote-box" style="margin:15px 0;">${char.quote}</div>
            <div class="profile-box" style="text-align:left; background:#222; padding:10px; border-radius:5px;">
                <div class="profile-row"><span style="color:#00ffcc;">Name:</span> ${char.fullname}</div>
                <div class="profile-row"><span style="color:#00ffcc;">Gender:</span> ${char.gender}</div>
                <div class="profile-row"><span style="color:#00ffcc;">Group:</span> ${char.group}</div>
                <div class="profile-row" style="margin-top:5px;">
                    ${char.tags.map(t => `<span style="background:#444; padding:2px 6px; margin:2px; font-size:0.8rem; display:inline-block; border-radius:3px;">${t}</span>`).join('')}
                </div>
            </div>
            <p style="margin-top:15px; line-height:1.6; text-align:left;">${char.desc}</p>
        </div>
    `;
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
}
