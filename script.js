/* 
  深層心理・闇観測実験アーカイブ Logic (Ver.7.0 Ultimate)
*/

// パラメーター
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
    trauma: "過去の傷",   // New: のりおみ・かるめ判定用
    boredom: "退屈・倦怠", // New: ありす・かいこく判定用
    skepticism: "懐疑心"   // New: 健全な疑い（みづき用）
};


let stats = {};
for(let k in paramNames) stats[k] = 0;

let currentQuestions = [];
let currentQIndex = 0;
let startTime = 0;
// 履歴管理用（戻るボタンのため）
let historyLog = [];

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ■ 動的アート生成 (Canvas版)
// CSSではなくJSでピクセルを描画するから絶対に出る！
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
        // 深淵系（円）
        for(let i=0; i<10; i++) {
            ctx.beginPath();
            ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*50, 0, Math.PI*2);
            ctx.fillStyle = `rgba(50, 0, 100, 0.5)`;
            ctx.fill();
        }
    }
}

function startExperiment() {
    currentQuestions = shuffle(allQuestions).slice(0, 15);
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
    
    // 画像生成
    if (q.type === 'image') {
        imgArea.classList.remove('hidden');
        setTimeout(() => generateAbstractArt('image-area'), 10);
    } else {
        imgArea.classList.add('hidden');
        imgArea.innerHTML = '';
    }

    // プログレスバー & 戻るボタン制御
    document.getElementById('progress-fill').style.width = `${(currentQIndex / currentQuestions.length) * 100}%`;
    document.getElementById('back-btn').disabled = (currentQIndex === 0);

    // 選択肢表示
    let options = q.options ? shuffle(q.options) : [];

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

    // 時間分析加算
    let timeScores = {};
    if (timeTaken > 6.0) {
        if (scores.structure > 0) timeScores.structure = 1;
        if (scores.mood > 0) timeScores.mood = 1;
    } else if (timeTaken < 1.5) {
        if (scores.mood > 0) timeScores.mood = 2;
        if (scores.void > 0) timeScores.interest = -2;
    }

    // 履歴に保存（戻るボタン用）
    // 今回加算するスコア（選択肢分 + 時間分）を記録しておく
    let addedScores = {...scores};
    for(let k in timeScores) addedScores[k] = (addedScores[k] || 0) + timeScores[k];
    
    historyLog.push(addedScores);

    // スコア加算実行
    for (let key in addedScores) {
        if (stats.hasOwnProperty(key)) stats[key] += addedScores[key];
    }

    currentQIndex++;
    showQuestion();
}

// ■ 戻るボタン処理
function goBack() {
    if (currentQIndex <= 0 || historyLog.length === 0) return;

    // 前回のスコアを減算（取り消し）
    const lastScores = historyLog.pop();
    for (let key in lastScores) {
        if (stats.hasOwnProperty(key)) stats[key] -= lastScores[key];
    }

    // 戻った回数を「迷い」として少しカウントしても面白いかも？
    // stats.mask += 0.5; // 修正行動＝仮面？

    currentQIndex--;
    showQuestion();
}

function finishExperiment() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('loading-screen').classList.add('active');
    setTimeout(() => showResult(), 2000);
}

let finalResultChar = null; // シェア用に保持

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
    
    // 詳細プロフ
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

    // 画像
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

    // パラメータ
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

/* 
  深層心理・闇観測実験アーカイブ Logic (Ver.8.0 Ultimate)
*/

// パラメーター初期化などは前回と同じ

// ■ シェア機能 (Web Share API対応)
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
        // PCなどはクリップボードコピーにする？ またはTwitter
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
    }
}


// ■ アーカイブ詳細モーダル表示
function showArchiveDetail(char) {
    // 既存のモーダルがあれば削除
    const existing = document.getElementById('archive-detail-modal');
    if(existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'archive-detail-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">×</span>
            <div class="chara-img-box" style="margin:0 auto 15px;">
                <img src="${char.image}" onerror="this.style.display='none'">
            </div>
            <h3>${char.type_title}</h3>
            <h2>${char.name}</h2>
            <div class="quote-box">${char.quote}</div>
            <div class="profile-box">
                <div class="profile-row"><span class="label">Name:</span> ${char.fullname}</div>
                <div class="profile-row"><span class="label">Gender:</span> ${char.gender}</div>
                <div class="profile-row"><span class="label">Group:</span> ${char.group}</div>
                <div class="profile-row">
                    ${char.tags.map(t => `<span class="tag" style="background:#333; padding:2px 5px; margin:2px; font-size:0.8em; display:inline-block;">${t}</span>`).join(' ')}
                </div>
            </div>
            <p style="text-align:left; font-size:0.9rem;">${char.desc}</p>
        </div>
    `;
    
    // 背景クリックで閉じる
    modal.onclick = (e) => {
        if(e.target === modal) modal.remove();
    };
    
    document.body.appendChild(modal);
}
// ■ アーカイブ一覧表示
function showArchive() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('archive-screen').classList.add('active');
    
    const list = document.getElementById('archive-list');
    list.innerHTML = '';
    
    // グループごとに表示してもいいかも？今回は単純リスト
    characters.forEach(char => {
        const item = document.createElement('div');
        item.className = 'archive-item';
        item.innerHTML = `
            <div class="archive-icon" style="background-image: url('${char.image}'); background-size: cover;"></div>
            <div class="archive-info">
                <h4>${char.name}</h4>
                <p>${char.type_title}</p>
            </div>
        `;
        // クリックで詳細ポップアップとか出せると良いけど、今回は簡易的に
        list.appendChild(item);
    });
}

let previousScreen = 'start-screen';

function showArchive(fromScreen) {
    // どっちの画面から来たか記録
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
            <div class="archive-icon" style="background-image: url('${char.image}'); background-size: cover;"></div>
            <div class="archive-info">
                <h4>${char.name}</h4>
                <p>${char.type_title}</p>
            </div>
        `;
        // クリックで詳細表示
        item.onclick = () => showArchiveDetail(char);
        list.appendChild(item);
    });
}

function backFromArchive() {
    document.getElementById('archive-screen').classList.remove('active');
    // 元の画面に戻る
    document.getElementById(previousScreen).classList.add('active');
}

// ■ アーカイブ詳細モーダル (JSでDOM生成して表示)
function showArchiveDetail(char) {
    const container = document.getElementById('modal-container');
    container.innerHTML = ''; // クリア

    const modal = document.createElement('div');
    modal.id = 'archive-detail-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">×</span>
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
    closeBtn.onclick = () => container.innerHTML = '';
    modal.onclick = (e) => {
        if(e.target === modal) container.innerHTML = '';
    };

    container.appendChild(modal);
}