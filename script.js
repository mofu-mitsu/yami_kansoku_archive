/* 
  深層心理・闇観測実験アーカイブ Logic (Ver.22.0)
*/

const paramNames = {
    mood: "情緒不安定", structure: "構造理解", mask: "演技・仮面", depend: "依存",
    void: "虚無・諦観", obsess: "執着", justice: "規範・正義", self_deny: "自己否定",
    trust: "信頼度", interest: "関心度", empathy: "共感・同調", ideal: "理想・ロマン",
    aggression: "攻撃性", trauma: "過去の傷", boredom: "退屈・倦怠", skepticism: "懐疑心",
    creativity: "創造・表現", control: "統制・支配", pride: "プライド・誇り", self_doubt: "自己懐疑(二重否定)", 
    social_phobia: "対人緊張(コミュ障)", fe_interface: "擬態社交(Feツール)", cleanliness: "潔癖・衛生",
    lie_hate: "虚偽嫌悪", deception: "欺瞞・偽悪", misanthropy: "人間嫌い", stoicism: "克己・ストイック",
    fe_fake: "社会的正解の模倣(防衛用Fe)", approval: "承認欲求・自己顕示", sacrifice: "自己犠牲・過剰適応",
    observer: "観測者気質", meta_view: "メタ視点", stimulation_need: "刺激欲求", future_fixation: "未来固定視(Ni固着)",
    alt_path: "代替案生成(Ne分岐思考)", reality_fatigue: "現実疲労", fe_awareness: "感情場認識",
    structure_priority: "構造優先", norm_priority: "規範優先", playfulness: "遊び心", impulsivity: "衝動性", warmth: "情緒温度"
};

let stats = {};
for(let k in paramNames) stats[k] = 0;

let currentQuestions =[];
let currentQIndex = 0;
let startTime = 0;
let historyLog =[];
let previousScreen = 'start-screen';

// ★観測ログ用変数
let totalThinkTime = 0; // 総思考時間
let backCount = 0; // 戻るボタンを押した回数
let pigClicks = 0;
let pigInterval;
let pigElement;
let isPigWalking = false;

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 動的アート生成
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

// ご褒美（豚）システム
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
            pigElement.innerHTML = `🍜<div class="pig-speech show" id="pig-speech">${gohoubiData.secretQuote}</div>`;
            
            setTimeout(() => {
                pigElement.classList.remove('tonkotsu-center');
                pigElement.style.display = 'none';
            }, 4000);
        } else if (pigClicks > 30) {
            speech.innerText = gohoubiData.exhaustedQuote;
            speech.classList.add('show');
            pigElement.style.transform = 'scale(0.8)';
            setTimeout(() => { pigElement.style.transform = 'scale(1)'; speech.classList.remove('show'); }, 2000);
        } else {
            speech.innerText = gohoubiData.normalQuotes[Math.floor(Math.random() * gohoubiData.normalQuotes.length)];
            speech.classList.add('show');
            pigElement.style.transform = 'scale(0.8)';
            setTimeout(() => { pigElement.style.transform = 'scale(1)'; speech.classList.remove('show'); }, 1500);
        }
    };

    clearInterval(pigInterval);
    pigInterval = setInterval(() => {
        if(!isPigWalking && Math.random() < 0.4) { 
            isPigWalking = true; 
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

// ★ ホームボタンの制御
function handleHomeClick(event) {
    const quizScreen = document.getElementById('quiz-screen');
    // 診断中にホームボタンが押されたら、外部サイトに飛ばさず「スタート画面」に戻す
    if (quizScreen.classList.contains('active')) {
        event.preventDefault(); // デフォルトのリンク移動をキャンセル
        if(confirm("診断を中断してタイトルに戻りますか？")) {
            location.reload(); // リロードして初期化するのが一番安全
        }
    }
    // スタート画面や結果画面の場合は普通にリンク先に飛ぶ（event.preventDefault()しない）
}

function startExperiment() {
    currentQuestions = shuffle(allQuestions).slice(0, 15); // 質問数（安定化のため15〜20推奨）
    for(let k in stats) stats[k] = 0;
    historyLog =[];
    currentQIndex = 0;
    totalThinkTime = 0;
    backCount = 0;

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('archive-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    
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
    } else if (q.type === 'check') {
        const container = document.createElement('div');
        container.className = 'checkbox-group';
        options.forEach((opt, idx) => {
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            // ★修正：チェックボックスが機能するようにname属性を付与
            label.innerHTML = `<input type="checkbox" name="q-check" value="${idx}"> ${opt.text}`;
            container.appendChild(label);
        });
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = '決定';
        btn.onclick = () => {
            // ★修正：セレクタを正確に指定
            const checked = container.querySelectorAll('input[type="checkbox"]:checked');
            let totalScores = {};
            checked.forEach(chk => {
                const opt = options[chk.value];
                for(let k in opt.scores) totalScores[k] = (totalScores[k] || 0) + opt.scores[k];
            });
            handleAnswer(totalScores);
        };
        inputArea.appendChild(container);
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
    } else if (q.type === 'action') {
        // 行動観測ボタン
        const desc = document.createElement('p');
        desc.innerText = q.instruction;
        desc.style.fontSize = '0.9rem';
        desc.style.color = '#aaa';
        desc.style.marginBottom = '20px';
        inputArea.appendChild(desc);

        const actionBtn = document.createElement('button');
        actionBtn.className = 'btn';
        actionBtn.innerText = q.buttonText;
        actionBtn.style.background = '#330011';
        actionBtn.style.color = '#ff0055';
        actionBtn.style.border = '2px solid #ff0055';
        actionBtn.style.width = '100%';
        actionBtn.style.padding = '20px';
        actionBtn.style.fontSize = '1.5rem';
        
        let localClickCount = 0;
        actionBtn.onclick = () => {
            localClickCount++;
            actionBtn.innerText = `WARNING: ${localClickCount}`;
            actionBtn.style.background = `rgba(255, 0, 85, ${Math.min(localClickCount * 0.1, 1)})`;
        };
        inputArea.appendChild(actionBtn);

        const finishBtn = document.createElement('button');
        finishBtn.className = 'option-btn';
        finishBtn.innerText = "観測を終了して次へ";
        finishBtn.style.marginTop = '20px';
        finishBtn.onclick = () => {
            const scores = q.actionLogic(localClickCount);
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

function handleAnswer(scores) {
    clearInterval(timerInterval);
    const timeTaken = (Date.now() - startTime) / 1000;
    
    // ログ記録用
    totalThinkTime += timeTaken;

    let timeScores = {};
    if (timeTaken > 6.0) {
        if (scores && scores.structure_priority > 0) timeScores.structure_priority = 1;
        timeScores.self_doubt = 1; 
    } else if (timeTaken < 1.5) {
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
    
    backCount++; // 戻った回数を記録
    stats.self_doubt += 1; // 戻る＝自己懐疑アップ
    
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

    // ★ アイコンの表示修正（背景画像にする）
    const imgBox = document.getElementById('result-img-box');
    const dummyIcon = document.getElementById('dummy-icon');
    if (bestChar.image) {
        imgBox.style.backgroundImage = `url('images/${bestChar.image}')`;
        dummyIcon.style.display = 'none';
    } else {
        imgBox.style.backgroundImage = 'none';
        dummyIcon.style.display = 'block';
    }

    // パラメータグラフ
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

    // ★ NEW: 観測ログの出力
    const logList = document.getElementById('hidden-log-list');
    logList.innerHTML = '';
    
    // 思考時間
    const avgTime = (totalThinkTime / currentQuestions.length).toFixed(1);
    logList.innerHTML += `<li>平均思考時間: ${avgTime}秒 ${avgTime > 5 ? '(長考/自己懐疑傾向)' : '(即決/直感傾向)'}</li>`;
    
    // 修正行動（戻るボタン）
    logList.innerHTML += `<li>選択の修正回数: ${backCount}回 ${backCount > 2 ? '(強い自己懐疑/Ne代替案)' : ''}</li>`;
    
    // ご褒美（豚）タッチ回数
    logList.innerHTML += `<li>異常対象の接触: ${pigClicks}回 ${pigClicks > 10 ? '(深刻なSe/Ne散漫性)' : ''} ${pigClicks >= 30 ? '🍜 豚骨スープ生成確認' : ''}</li>`;
}

// ★ 画像保存機能
function saveResultImage() {
    const target = document.getElementById('capture-area');
    const btn = document.querySelector('.save-btn');
    
    if (!target) return;

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 画像生成中...';
    btn.disabled = true;

    html2canvas(target, { 
        backgroundColor: '#050505',
        scale: 2, 
        useCORS: true, 
        allowTaint: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0'; modal.style.left = '0';
        modal.style.width = '100%'; modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex'; modal.style.flexDirection = 'column';
        modal.style.alignItems = 'center'; modal.style.justifyContent = 'center';
        
        modal.innerHTML = `
            <p style="color: #00ffcc; margin-bottom: 15px; font-family: 'Mochiy Pop P One', sans-serif; text-align:center;">
                画像を長押し（PCは右クリック）して<br>「写真に追加」または「保存」してね！📱
            </p>
            <img src="${imgData}" style="max-width: 90%; max-height: 70vh; border: 2px solid #ff0055; border-radius: 10px; box-shadow: 0 0 20px #ff0055; object-fit: contain;">
            <button class="btn" style="margin-top: 20px; border-color: #00ffcc; color: #00ffcc;" onclick="this.parentElement.remove()">閉じる</button>
        `;
        document.body.appendChild(modal);

        btn.innerHTML = originalText;
        btn.disabled = false;
    }).catch(err => {
        console.error("画像保存エラー:", err);
        alert("画像の生成に失敗しました…。");
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
        // ★ アーカイブ画像もダミーにならないように修正
        item.innerHTML = `
            <div class="archive-icon" style="${char.image ? `background-image: url('images/${char.image}');` : `background-color: #333;`} background-size: cover; background-position: center;">
                ${!char.image ? '<i class="fa-solid fa-user-secret" style="color:#aaa; font-size:1.5rem; display:block; text-align:center; line-height:50px;"></i>' : ''}
            </div>
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
    // ★ 修正：確実に前の画面に戻る
    if(document.getElementById(previousScreen)) {
        document.getElementById(previousScreen).classList.add('active');
    } else {
        document.getElementById('start-screen').classList.add('active');
    }
}

function showArchiveDetail(char) {
    const existing = document.getElementById('archive-detail-modal');
    if(existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'archive-detail-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" style="position:absolute; top:10px; right:15px; font-size:2rem; cursor:pointer; color:#fff;">×</span>
            <div class="chara-img-box" style="margin:0 auto 15px; width:100px; height:100px; border-radius:50%; overflow:hidden; border:2px solid #ff0055; background-image: url('${char.image ? `images/${char.image}` : ''}'); background-size:cover; background-color:#333;">
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
