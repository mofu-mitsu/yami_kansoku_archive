/* 
  深層心理・闇観測実験アーカイブ Logic (Ver.10.0 Ultimate Final)
*/

// パラメーター（全16種）
const paramNames = {
    mood: "情緒不安定",
    structure: "構造理解",
    mask: "演技・仮面",
    depend: "依存",
    void: "虚無・諦観",
    obsess: "執着",
    justice: "規範・正義",
    self_deny: "自己否定",
    trust: "信頼度",
    interest: "関心度",
    empathy: "共感・同調",
    ideal: "理想・ロマン",
    aggression: "攻撃性",
    trauma: "過去の傷",
    boredom: "退屈・倦怠",
    skepticism: "懐疑心",
    creativity: "創造・表現",
    control: "統制・支配",
    pride: "プライド・誇り",
    self_doubt: "自己懐疑(二重否定)", // ★NEW!
    social_phobia: "対人緊張(コミュ障)", // ★NEW! (みづき、あめり等)
    fe_interface: "擬態社交(Feツール)" ,  // ★NEW! (あい、きよみ、ありす等)
    cleanliness: "潔癖・衛生",      // ★NEW! (じゅん、なお)
    lie_hate: "虚偽嫌悪",           // ★NEW! (こふく、かるめ)
    deception: "欺瞞・偽悪",        // ★NEW! (まい、すおう)
    misanthropy: "人間嫌い",         // ★NEW! (みたろう、れお、まり)
    stoicism: "克己・ストイック",
    fe_fake: "社会的正解の模倣(防衛用Fe)",
    approval: "承認欲求・自己顕示", // ★NEW! (ももい、みりん等)
    sacrifice: "自己犠牲・過剰適応" ,
    observer: "観測者気質",
    meta_view: "メタ視点",
    stimulation_need: "刺激欲求",
    future_fixation: "未来固定視(Ni固着)", // ILI判定用
    alt_path: "代替案生成(Ne分岐思考)",   // LII判定用
    reality_fatigue: "現実疲労",
    fe_awareness: "感情場認識",
    structure_priority: "構造優先",
    norm_priority: "規範優先",
    playfulness: "遊び心",
    impulsivity: "衝動性",
    warmth: "情緒温度"
};

let stats = {};
for(let k in paramNames) stats[k] = 0;

let currentQuestions = [];
let currentQIndex = 0;
let startTime = 0;
let historyLog = [];
let previousScreen = 'start-screen'; // 画面遷移管理用

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function generateAbstractArt(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; 
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 200;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // 背景
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const r = Math.random();
    
    if (r < 0.33) {
        // ノイズ系
        for(let i=0; i<500; i++) {
            ctx.fillStyle = `rgba(${Math.random()*255}, 0, 50, ${Math.random()})`;
            ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*20, Math.random()*20);
        }
    } else if (r < 0.66) {
        // 幾何学系
        ctx.strokeStyle = '#00ffcc';
        for(let i=0; i<20; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random()*canvas.width, Math.random()*canvas.height);
            ctx.lineTo(Math.random()*canvas.width, Math.random()*canvas.height);
            ctx.stroke();
        }
    } else {
        // 深淵系
        for(let i=0; i<10; i++) {
            ctx.beginPath();
            ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*50, 0, Math.PI*2);
            ctx.fillStyle = `rgba(50, 0, 100, 0.5)`;
            ctx.fill();
        }
    }
}

function startExperiment() {
    currentQuestions = shuffle(allQuestions).slice(0, 20);
    for(let k in stats) stats[k] = 0;
    historyLog = [];
    currentQIndex = 0;

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('archive-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    showQuestion();
}

function showQuestion() {
    if (currentQIndex >= currentQuestions.length) {
        finishExperiment();
        return;
    }

    const q = currentQuestions[currentQIndex];
    document.getElementById('q-text').innerText = q.text;
    
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

    let options = q.options ? shuffle(q.options) :[];

    if (q.type === 'select' || q.type === 'image') {
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt.text;
            // 確信度チェックボックスがUIにある前提の処理（後述）
            btn.onclick = () => {
                // UIから確信度を取得（チェックされていれば1.0、されていなければ0.5）
                const certaintyCheckbox = document.getElementById('certainty-check');
                const certainty = (certaintyCheckbox && !certaintyCheckbox.checked) ? 0.5 : 1.0;
                handleAnswer(opt.scores, certainty);
            };
            inputArea.appendChild(btn);
        });
        // ★質問拒否ボタン（メタ回答）を追加
        const rejectBtn = document.createElement('button');
        rejectBtn.className = 'option-btn';
        rejectBtn.style.border = '1px dashed #666';
        rejectBtn.style.color = '#888';
        rejectBtn.innerText = "この質問の前提がおかしい / 答えたくない";
        rejectBtn.onclick = () => handleAnswer({}, 1.0, true);
        inputArea.appendChild(rejectBtn);

        // ★確信度チェックボックス
        const certaintyDiv = document.createElement('div');
        certaintyDiv.style.marginTop = '15px';
        certaintyDiv.style.textAlign = 'right';
        certaintyDiv.style.fontSize = '0.8rem';
        certaintyDiv.style.color = '#aaa';
        certaintyDiv.innerHTML = `<label><input type="checkbox" id="certainty-check" checked> 確信を持って答える</label>`;
        inputArea.appendChild(certaintyDiv);
    } else if (q.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'text-input';
        input.placeholder = 'ここに入力...';
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = '送信';
        btn.onclick = () => {
            const scores = q.keywordLogic(input.value);
            handleAnswer(scores);
        };
        inputArea.appendChild(input);
        inputArea.appendChild(btn);
    } else if (q.type === 'check') {
        const container = document.createElement('div');
        container.className = 'checkbox-group';
        options.forEach((opt, idx) => {
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            label.innerHTML = `<input type="checkbox" value="${idx}"> ${opt.text}`;
            container.appendChild(label);
        });
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = '決定';
        btn.onclick = () => {
            const checked = container.querySelectorAll('input:checked');
            let totalScores = {};
            checked.forEach(chk => {
                const opt = options[chk.value];
                for(let k in opt.scores) totalScores[k] = (totalScores[k] || 0) + opt.scores[k];
            });
            handleAnswer(totalScores);
        };
        inputArea.appendChild(container);
        inputArea.appendChild(btn);
    } 
    // ★新規：スライダー形式のUI生成
    else if (q.type === 'slider') {
        const container = document.createElement('div');
        container.className = 'slider-container';
        
        container.innerHTML = `
            <div class="slider-labels">
                <span>${q.labels[0]}</span>
                <span>${q.labels[1]}</span>
            </div>
            <input type="range" id="slider-input" min="0" max="100" value="50">
        `;
        
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = '決定';
        btn.style.marginTop = '20px';
        btn.onclick = () => {
            const val = parseInt(document.getElementById('slider-input').value);
            const scores = q.sliderLogic(val);
            handleAnswer(scores);
        };
        
        inputArea.appendChild(container);
        inputArea.appendChild(btn);
    } else if (q.type === 'action') {
        // ★NEW: 行動観測テスト（ボタン連打トラップ）
        const desc = document.createElement('p');
        desc.innerText = q.instruction;
        desc.style.fontSize = '0.9rem';
        desc.style.color = '#aaa';
        desc.style.marginBottom = '20px';
        inputArea.appendChild(desc);

        // 誘惑のボタン
        const actionBtn = document.createElement('button');
        actionBtn.className = 'btn';
        actionBtn.innerText = q.buttonText;
        actionBtn.style.background = '#330011'; // 不穏な色
        actionBtn.style.color = '#ff0055';
        actionBtn.style.border = '2px solid #ff0055';
        actionBtn.style.width = '100%';
        actionBtn.style.padding = '20px';
        actionBtn.style.fontSize = '1.5rem';
        
        let clickCount = 0;
        actionBtn.onclick = () => {
            clickCount++;
            actionBtn.innerText = `WARNING: ${clickCount}`;
            actionBtn.style.background = `rgba(255, 0, 85, ${Math.min(clickCount * 0.1, 1)})`; // 押すほど赤くなる
        };
        inputArea.appendChild(actionBtn);

        // 終了して進むボタン
        const finishBtn = document.createElement('button');
        finishBtn.className = 'option-btn';
        finishBtn.innerText = "観測を終了して次へ";
        finishBtn.style.marginTop = '20px';
        finishBtn.onclick = () => {
            const scores = q.actionLogic(clickCount);
            handleAnswer(scores);
        };
        inputArea.appendChild(finishBtn);
    }

    startTime = Date.now();
    updateTimer();
}

let timerInterval;
function updateTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const diff = (Date.now() - startTime) / 1000;
        document.getElementById('timer-display').innerText = diff.toFixed(2) + "s";
    }, 50);
}

function handleAnswer(scores, certainty = 1.0, isRejection = false) {
    clearInterval(timerInterval);
    const timeTaken = (Date.now() - startTime) / 1000;

    let timeScores = {};
    
    // 質問拒否（「答えたくない」）を選んだ場合
    if (isRejection) {
        timeScores.void = 2;
        timeScores.interest = -3;
        timeScores.skepticism = 2; // 質問の前提を疑う
        timeScores.meta_view = 2;  // メタな視点に立つ
    }

    // 時間分析
    if (timeTaken > 6.0) {
        if (scores && scores.structure > 0) timeScores.structure = 1;
        if (scores && scores.mood > 0) timeScores.mood = 1;
        timeScores.self_doubt = 1; // 長考＝自己懐疑
    } else if (timeTaken < 1.5) {
        if (scores && scores.mood > 0) timeScores.mood = 2;
        if (scores && scores.void > 0) timeScores.interest = -2;
        timeScores.impulsivity = 2; // 即決＝衝動性
    }

    let addedScores = {...(scores || {})};
    for(let k in timeScores) addedScores[k] = (addedScores[k] || 0) + timeScores[k];
    
    // 確信度（certainty）の掛け算。確信がない（迷った）場合はスコアが減る
    for (let key in addedScores) {
        addedScores[key] = addedScores[key] * certainty;
    }

    historyLog.push(addedScores);

    for (let key in addedScores) {
        if (stats.hasOwnProperty(key)) stats[key] += addedScores[key];
    }

    currentQIndex++;
    showQuestion();
}

function goBack() {
    if (currentQIndex <= 0 || historyLog.length === 0) return;
    const lastScores = historyLog.pop();
    for (let key in lastScores) {
        if (stats.hasOwnProperty(key)) stats[key] -= lastScores[key];
    }
    currentQIndex--;
    showQuestion();
}

function finishExperiment() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('loading-screen').classList.add('active');
    setTimeout(() => showResult(), 2000);
}

let finalResultChar = null;

function showResult() {
    document.getElementById('loading-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    let bestChar = null;
    let maxScore = -Infinity;

    characters.forEach(char => {
        const score = char.logic(stats);
        if (score > maxScore) {
            maxScore = score;
            bestChar = char;
        }
    });
    
    finalResultChar = bestChar;

    document.getElementById('result-type-name').innerText = bestChar.type_title;
    document.getElementById('result-quote').innerText = bestChar.quote;
    document.getElementById('result-desc').innerText = bestChar.desc;
    
    const detailHtml = `
        <div class="profile-box">
            <div class="profile-row"><span class="label">■ Name:</span> ${bestChar.fullname || bestChar.name}</div>
            <div class="profile-row"><span class="label">■ Gender:</span> ${bestChar.gender || "Unknown"}</div>
            <div class="profile-row"><span class="label">■ Group:</span> <span style="color:#ff0055;">${bestChar.group || "Unknown"}</span></div>
            <div class="profile-row">
                ${(bestChar.tags ? bestChar.tags.map(t => `<span class="tag" style="background:#333; padding:2px 5px; margin:2px; font-size:0.8em; display:inline-block; border:1px solid #555;">${t}</span>`).join(' ') : "")}
            </div>
        </div>
    `;
    document.getElementById('match-chara-detail').innerHTML = detailHtml;

    const imgElem = document.getElementById('result-img');
    const placeholder = document.querySelector('.chara-img-placeholder');
    
    if (bestChar.image) {
        imgElem.src = bestChar.image;
        imgElem.style.display = 'block';
        if(placeholder) placeholder.style.display = 'none';
    } else {
        imgElem.style.display = 'none';
        if(placeholder) placeholder.style.display = 'flex';
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
}

// ■ シェア機能 (汎用)
function shareResult() {
    if (!finalResultChar) return;
    
    const title = "深層心理・闇観測実験アーカイブ";
    const text = `【観測結果】\nタイプ：『${finalResultChar.type_title}』\n類似検体：${finalResultChar.name}\n\n#闇観測実験 #オリジナル診断`;
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).catch(console.error);
    } else {
        // PCなどで対応していない場合、クリップボードにコピー
        navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
            alert('結果をクリップボードにコピーしました！');
        }).catch(err => {
            console.error('コピー失敗', err);
        });
    }
}

// ■ アーカイブ一覧表示
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
            <div class="archive-icon" style="background-image: url('${char.image}'); background-size: cover; background-position: center;"></div>
            <div class="archive-info">
                <h4>${char.name}</h4>
                <p>${char.type_title}</p>
            </div>
        `;
        // クリックイベントをここで確実にバインド
        item.onclick = () => showArchiveDetail(char);
        list.appendChild(item);
    });
}

function backFromArchive() {
    document.getElementById('archive-screen').classList.remove('active');
    document.getElementById(previousScreen).classList.add('active');
}

// ■ アーカイブ詳細モーダル (JS生成)
function showArchiveDetail(char) {
    // 既存のモーダル削除
    const existing = document.getElementById('archive-detail-modal');
    if(existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'archive-detail-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" style="position:absolute; top:10px; right:15px; font-size:2rem; cursor:pointer;">×</span>
            <div class="chara-img-box" style="margin:0 auto 15px; width:100px; height:100px; border-radius:50%; overflow:hidden; border:2px solid #ff0055;">
                <img src="${char.image}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'">
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

    // 閉じる処理
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if(e.target === modal) modal.remove();
    };

    document.body.appendChild(modal);
}
