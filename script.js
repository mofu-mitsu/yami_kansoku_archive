/* 
  深層心理・闇観測実験アーカイブ Logic (Ver.20.0 Gohoubi & Save)
*/

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

let currentQuestions =[];
let currentQIndex = 0;
let startTime = 0;
let historyLog =[];
let previousScreen = 'start-screen';

// ★ご褒美（豚）システム用変数
let pigClicks = 0;
let pigInterval;
let pigElement;
let isPigWalking = false; // ★追加：歩行中フラグ

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 動的アート生成(Canvas)
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

    // 豚のクリックイベント
    pigElement.onclick = () => {
        pigClicks++;
        stats.impulsivity += 1;
        stats.playfulness += 1;
        stats.stimulation_need += 1;
        stats.alt_path += 0.5; 

        const speech = document.getElementById('pig-speech');
        
        if (pigClicks === 30) {
            // ★ 30回目：歩行を強制停止して画面中央にドーン！
            pigElement.classList.remove('walk-left');
            isPigWalking = false;
            pigElement.classList.add('tonkotsu-center');
            pigElement.innerHTML = `🍜<div class="pig-speech show" id="pig-speech">${gohoubiData.secretQuote}</div>`;
            
            // ★ 4秒後にスッと消える
            setTimeout(() => {
                pigElement.classList.remove('tonkotsu-center');
                pigElement.style.display = 'none';
                const s = document.getElementById('pig-speech');
                if(s) s.classList.remove('show');
            }, 4000);

        } else if (pigClicks > 30) {
            // 30回超え（ラーメン状態で歩いてる時）
            speech.innerText = gohoubiData.exhaustedQuote;
            speech.classList.add('show');
            pigElement.style.transform = 'scale(0.8)';
            setTimeout(() => { 
                pigElement.style.transform = 'scale(1)'; 
                speech.classList.remove('show');
            }, 2000);

        } else {
            // 通常の豚状態
            const quotes = gohoubiData.normalQuotes;
            speech.innerText = quotes[Math.floor(Math.random() * quotes.length)];
            speech.classList.add('show');
            
            pigElement.style.transform = 'scale(0.8)';
            setTimeout(() => { 
                pigElement.style.transform = 'scale(1)'; 
                speech.classList.remove('show');
            }, 1500);
        }
    };

    // ランダム出現タイマー
    clearInterval(pigInterval);
    pigInterval = setInterval(() => {
        if(!isPigWalking && Math.random() < 0.4) { 
            isPigWalking = true; 
            
            // ★ 30回を超えていたら、次からはラーメン(🍜)として歩いてくる
            if (pigClicks >= 30) {
                pigElement.innerHTML = `🍜<div class="pig-speech" id="pig-speech"></div>`;
            } else {
                pigElement.innerHTML = `🐖<div class="pig-speech" id="pig-speech"></div>`;
            }
            
            pigElement.style.bottom = Math.floor(Math.random() * 40) + 15 + '%'; 
            pigElement.style.display = 'block'; 
            void pigElement.offsetWidth; 
            pigElement.classList.add('walk-left');
        }
    }, 6000);
}

function startExperiment() {
    currentQuestions = shuffle(allQuestions).slice(0, 20); // 20問出題
    for(let k in stats) stats[k] = 0;
    historyLog =[];
    currentQIndex = 0;

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('archive-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    
    // ご褒美観測システム起動
    initPigSystem();
    
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
            btn.onclick = () => handleAnswer(opt.scores);
            inputArea.appendChild(btn);
        });
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
    } else if (q.type === 'slider') {
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

function handleAnswer(scores) {
    clearInterval(timerInterval);
    const timeTaken = (Date.now() - startTime) / 1000;

    let timeScores = {};
    if (timeTaken > 6.0) {
        if (scores.structure > 0) timeScores.structure = 1;
        if (scores.mood > 0) timeScores.mood = 1;
        timeScores.self_doubt = 1; 
    } else if (timeTaken < 1.5) {
        if (scores.mood > 0) timeScores.mood = 2;
        if (scores.void > 0) timeScores.interest = -2;
        timeScores.impulsivity = 2; 
    }

    let addedScores = {...(scores || {})};
    for(let k in timeScores) addedScores[k] = (addedScores[k] || 0) + timeScores[k];
    
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
    // 豚の観測終了
    clearInterval(pigInterval);
    if(pigElement) pigElement.style.display = 'none';

    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('loading-screen').classList.add('active');
    setTimeout(() => showResult(), 2500);
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
        imgElem.src = "images/" + bestChar.image;
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

// --------------------------------------------------
// ★ 画像保存機能（スマホ対応・ローディング表示追加版） ★
// --------------------------------------------------
function saveResultImage() {
    const target = document.getElementById('capture-area');
    const btn = document.querySelector('.save-btn');
    
    if (!target) {
        alert("キャプチャ対象が見つかりません。");
        return;
    }

    // スマホは処理に時間がかかるので、ボタンのテキストを変えて無効化する
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 画像生成中...';
    btn.disabled = true;

    // html2canvasで画像を生成 (CORSエラー回避の設定を追加)
    html2canvas(target, { 
        backgroundColor: '#050505',
        scale: 2, // 高画質化
        useCORS: true, // 外部アイコンやフォントの読み込みを許可
        allowTaint: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        // スマホ用に長押し保存を促すモーダル画面を作成
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        
        modal.innerHTML = `
            <p style="color: #00ffcc; margin-bottom: 15px; font-family: 'Mochiy Pop P One', sans-serif; text-align:center;">
                画像を長押し（PCは右クリック）して<br>「写真に追加」または「保存」してね！📱
            </p>
            <img src="${imgData}" style="max-width: 90%; max-height: 70vh; border: 2px solid #ff0055; border-radius: 10px; box-shadow: 0 0 20px #ff0055; object-fit: contain;">
            <button class="btn" style="margin-top: 20px; border-color: #00ffcc; color: #00ffcc;" onclick="this.parentElement.remove()">閉じる</button>
        `;
        document.body.appendChild(modal);

        // ボタンを元に戻す
        btn.innerHTML = originalText;
        btn.disabled = false;

    }).catch(err => {
        console.error("画像保存エラー:", err);
        alert("画像の生成に失敗しました…。\n" + err.message);
        
        // エラー時もボタンを元に戻す
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}
// シェア機能
function shareResult() {
    if (!finalResultChar) return;
    const title = "深層心理・闇観測実験アーカイブ";
    const text = `【観測結果】\nタイプ：『${finalResultChar.type_title}』\n類似検体：${finalResultChar.name}\n\n#闇観測実験 #オリジナル診断`;
    const url = "https://mofu-mitsu.github.io/yami_kansoku_archive/";

    if (navigator.share) {
        navigator.share({ title: title, text: text, url: url }).catch(console.error);
    } else {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
    }
}

// アーカイブ機能
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
            <div class="archive-icon" style="background-image: url('images/${char.image}'); background-size: cover; background-position: center;"></div>
            <div class="archive-info">
                <h4>${char.name}</h4>
                <p>${char.type_title}</p>
            </div>
        `;
        item.onclick = () => showArchiveDetail(char);
        list.appendChild(item);
    });
}

function backFromArchive() {
    document.getElementById('archive-screen').classList.remove('active');
    document.getElementById(previousScreen).classList.add('active');
}

function showArchiveDetail(char) {
    const existing = document.getElementById('archive-detail-modal');
    if(existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'archive-detail-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" style="position:absolute; top:10px; right:15px; font-size:2rem; cursor:pointer; color:#fff;">×</span>
            <div class="chara-img-box" style="margin:0 auto 15px; width:100px; height:100px; border-radius:50%; overflow:hidden; border:2px solid #ff0055;">
                <img src="images/${char.image}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'">
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
