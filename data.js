/* 
  高1-3 闇観測実験アーカイブ データ (Ver.4.0)
*/

/* 
  高1-3 闇観測実験アーカイブ データ (Ver.6.0 Complete)
*/

const characters = [
    // ==========================================
    // GROUP: 虚無・構造破壊 (Void / Structure)
    // ==========================================
    {
        id: "noriomi",
        name: "のりおみ",
        fullname: "のりおみ",
        gender: "Male",
        group: "虚無・構造破壊",
        type_title: "虚無懐疑型（崩壊観測者）",
        tags: ["INTP", "LII", "5w6", "世界不信", "PTSD"],
        quote: "幸福なんて信じてない。…それを否定する自分のこともな。",
        desc: "世界は壊れているという前提で生きている。表向きは社交辞令で適応するが、内面は冷え切った理論と、かつてのトラウマによる身体的苦痛で満たされている。",
        image: "noriomi.png",
        // ★修正：traumaが高くないと選ばれないようにした！
        logic: (s) => (s.void * 2) + (s.structure * 1) + (s.trauma * 4) - (s.trust * 2)
    },
    {
        id: "azuri",
        name: "あずり",
        fullname: "あずり",
        gender: "Male",
        group: "虚無・構造破壊",
        type_title: "非情冷笑型（ニヒリスト）",
        tags: ["INTP", "ILI", "5w6", "爆弾魔"],
        quote: "思い出？ 愛？ …所詮、その程度のものだろ。",
        desc: "かつては素直だったが、今は冷徹なニヒリスト。プレゼントに爆弾を仕込むような悪賢さと、自分の感情すら「その程度」と切り捨てる無慈悲さを持つ。",
        image: "azuri.png",
        // 攻撃性＋虚無＋構造
        logic: (s) => (s.void * 2) + (s.aggression * 3) + (s.structure * 2) - (s.empathy * 3)
    },
    {
        id: "kiyomi",
        name: "きよみ",
        fullname: "きよみ",
        gender: "Female",
        group: "虚無・構造破壊",
        type_title: "思考解体型（観測ヤンデレ）",
        tags: ["INTP/ILI", "5w4", "哲学解体"],
        quote: "ねえ、中身見せて？ どうなってるか理解したいだけだから。",
        desc: "愛＝理解。対象を愛するあまり、解体し、実験し、構造を理解しようとする思考型ヤンデレ。そこに感情的配慮はなく、純粋な知的好奇心が暴走している。",
        image: "kiyomi.png",
        logic: (s) => (s.structure * 3) + (s.obsess * 2) - (s.empathy * 3)
    },
    {
        id: "alice",
        name: "ありす",
        fullname: "ありす",
        gender: "Female",
        group: "虚無・構造破壊",
        type_title: "現実消耗型（眠り姫）",
        tags: ["INTP", "ILI", "5w4", "退屈実験"],
        quote: "現実は一層構造すぎて退屈だわ。…夢の方がマシ。",
        desc: "現実に消耗しきっており、言葉の裏側や構造しか見ていない。Feは実験用インターフェース。退屈を壊す「興味対象」が現れるまで、彼女は眠り続ける。",
        image: "alice.png",
        // 退屈(boredom)が高い
        logic: (s) => (s.boredom * 3) + (s.structure * 2) + (s.mask * 1)
    },
    {
        id: "kaikoku",
        name: "かいこく",
        fullname: "かいこく",
        gender: "Male",
        group: "虚無・構造破壊",
        type_title: "構造分解享楽型（トリックスター）",
        tags: ["ENTP", "ILE", "7w8", "分解フェチ"],
        quote: "乙女すぎワロタww 五臓に六腑が染み渡るわ〜。",
        desc: "人間社会を実験台にする享楽的な分解フェチ。LINEの入退室を繰り返すなど、構造を揺らして遊ぶ。闇というより、悪意のない愉快犯。",
        image: "kaikoku.png",
        logic: (s) => (s.structure * 2) + (s.boredom * 3) + (s.mask * 2) - (s.trauma * 2)
    },
    {
        id: "nami",
        name: "なみ",
        fullname: "なみ",
        gender: "Female",
        group: "虚無・構造破壊",
        type_title: "観測者冷笑型（シニカル天使）",
        tags: ["INTP", "ILE", "7w8", "理屈お嬢様"],
        quote: "あらあら、壊れちゃいましたわね。面白いデータですわ。",
        desc: "世界を面白がりながら真実を観測している。他人の決壊も観察対象であり、理屈好きだが責任は取らないシニカルな天使。",
        image: "nami.png",
        logic: (s) => (s.structure * 2) + (s.interest * 2) + (s.void * 1) + (s.mask * 1)
    },
    {
        id: "mitarou",
        name: "みたろう先生",
        fullname: "みたろう",
        gender: "Male",
        group: "虚無・構造破壊",
        type_title: "感情切断・無関心型",
        tags: ["INTP", "LII", "5w6", "温度ゼロ"],
        quote: "馬鹿にしてんの？ …まあ、どうでもいいけど。",
        desc: "他人に興味がない物理教師。感情を理屈で凍結させており、褒められても動じない。孤立を選び続ける、温度ゼロの闇。",
        image: "mitarou.png",
        logic: (s) => (s.void * 3) - (s.interest * 4) + (s.structure * 2)
    },
    {
        id: "miku",
        name: "みく",
        fullname: "みく",
        gender: "Female",
        group: "虚無・構造破壊",
        type_title: "存在否定合理型（反出生論）",
        tags: ["INTP", "ILI", "5w6", "生はコスト"],
        quote: "存在することは、コストの連鎖でしかないわ。",
        desc: "「生＝苦痛の再生産」と定義し、断ち切ることが合理的だと考える哲学的ペシミスト。存在している以上は最適化するという矛盾を抱える。",
        image: "miku.png",
        logic: (s) => (s.void * 2.5) + (s.structure * 1.5)
    },

    // ==========================================
    // GROUP: 規範・秩序・潔癖 (Order / Justice)
    // ==========================================
    {
        id: "shizuka",
        name: "しずか",
        fullname: "しずか",
        gender: "Female",
        group: "規範・秩序",
        type_title: "正義硬直型（完全主義自罰）",
        tags: ["ISTJ", "LSI", "1w9", "正解依存"],
        quote: "99点じゃ意味がないの。完璧じゃない私は、いらない。",
        desc: "「正しさ」や「基準」に過剰に適応しようとしている。感情を殺して正解を選び続けるが、その厳しさはやがて自分自身を破壊する。",
        image: "shizuka.png",
        logic: (s) => (s.justice * 2.5) + (s.self_deny * 2)
    },
    {
        id: "jun",
        name: "じゅん",
        fullname: "じゅん",
        gender: "Male",
        group: "規範・秩序",
        type_title: "衛生統制型（潔癖防衛）",
        tags: ["ISTJ", "LSI", "1w9", "完全除菌"],
        quote: "汚い…近づかないでください。除菌が先です。",
        desc: "極度の潔癖症で完璧主義。マスクと除菌グッズが手放せない。汚れ＝悪とみなし、物理的にも精神的にも「無菌状態」を保とうとする。",
        image: "jun.png",
        logic: (s) => (s.justice * 2) + (s.obsess * 2) + (s.structure * 1) - (s.interest * 1)
    },
    {
        id: "nao",
        name: "なお",
        fullname: "なお",
        gender: "Male",
        group: "規範・秩序",
        type_title: "合理的奉仕型（思考ループ）",
        tags: ["INTJ", "LII", "5w6", "整理整頓"],
        quote: "誰かがやらないといけないからやる。合理的でしょ？",
        desc: "不思議ちゃんだが合理的。考えすぎる自分を止めたいと思いつつ、掃除やゴミ拾いなど「実を取る」行動で思考を整理する。",
        image: "nao.png",
        logic: (s) => (s.justice * 2) + (s.structure * 2) + (s.empathy * 1)
    },
    {
        id: "itsuki",
        name: "いつき",
        fullname: "いつき",
        gender: "Female",
        group: "規範・秩序",
        type_title: "排除合理型（冷酷選別）",
        tags: ["INTJ", "LII", "8w9", "徹底排除"],
        quote: "不快。論理的にも不要。…だから排除する。",
        desc: "基本は落ち着いているが、不快なものや歪んだ社会に対しては冷ややかで激烈。論理的理由をつけて徹底的に排除・断罪する。",
        image: "itsuki.png",
        logic: (s) => (s.justice * 2) + (s.aggression * 2) + (s.structure * 2) - (s.empathy * 2)
    },
    {
        id: "karume",
        name: "かるめ",
        fullname: "かるめ",
        gender: "Male (Crossdress)",
        group: "規範・秩序",
        type_title: "構造防衛型（PTSG）",
        tags: ["INTJ", "LII", "5w6", "成長痛"],
        quote: "その善意にはリスクがある。構造上、受け取るわけにはいかない。",
        desc: "嘘と本質を見抜く。基準からの逸脱を恐れるが、それは過去の傷（PTSD）を乗り越え、成長（PTSG）しようとする論理的防衛でもある。",
        image: "karume.png",
        // トラウマがあるが、構造と正義で抑えている
        logic: (s) => (s.structure * 2) + (s.trauma * 2) + (s.justice * 2) - (s.trust * 1)
    },
    {
        id: "kouta",
        name: "こうた",
        fullname: "こうた",
        gender: "Male",
        group: "規範・秩序",
        type_title: "規範絶対化型（正義依存）",
        tags: ["ENTJ", "LIE", "1w2", "正論武装"],
        quote: "それは間違っている。論理的に、倫理的に、排除されるべきだ。",
        desc: "正論を盾に感情を処理し、他者への断罪が激しい。Fi劣勢ゆえに自責はせず、世界を正そうとする。",
        image: "kouta.png",
        logic: (s) => (s.justice * 2) + (s.structure * 2) - (s.self_deny * 1)
    },
    {
        id: "kahoko",
        name: "かほこ",
        fullname: "かほこ",
        gender: "Female",
        group: "規範・秩序",
        type_title: "正解依存型（整合固着）",
        tags: ["ISTJ", "LSI", "1w9", "セオリー絶対"],
        quote: "セオリー通りなら失敗しないはず。想定外は…困る。",
        desc: "論理、整合性、合理を愛する。答えがない状態に弱く、今までの「正解」に固執する。",
        image: "kahoko.png",
        logic: (s) => (s.structure * 3) + (s.justice * 2) - (s.interest * 1)
    },
    {
        id: "mikoto",
        name: "みこと",
        fullname: "みこと",
        gender: "Female",
        group: "規範・秩序",
        type_title: "使命転化型（憎悪昇華）",
        tags: ["ENTJ", "SLE", "3w4", "暗殺者"],
        quote: "人生を投げ出すな。憎しみも燃料にして、戦え。",
        desc: "陽気に見えるが内面は冷酷な元暗殺組織員。過去の憎しみを「使命」に変換して生きている。気配を消すのが得意。",
        image: "mikoto.png",
        logic: (s) => (s.aggression * 3) + (s.structure * 2) + (s.mask * 1)
    },
    {
        id: "chizu",
        name: "ちず",
        fullname: "ちず",
        gender: "Female",
        group: "規範・秩序",
        type_title: "実践哲学型（動的正義）",
        tags: ["ENTJ", "LIE", "1w9", "冒険哲学"],
        quote: "行こう。答えは空を見て、歩きながら考えるものだよ。",
        desc: "正しさを「動的な仮説」と捉える冒険家。迷いも含めて前進材料にする健全さを持つが、孤独も希望も抱える。",
        image: "chizu.png",
        logic: (s) => (s.structure * 2) + (s.ideal * 2) + (s.interest * 3)
    },
    {
        id: "aira",
        name: "あいら",
        fullname: "あいら",
        gender: "Female",
        group: "規範・秩序",
        type_title: "構造破壊観測型（反権力）",
        tags: ["ISTP", "SLI", "5w6", "システム破壊"],
        quote: "そのシステム、バグだらけだね。…壊した方が早いんじゃない？",
        desc: "ツンツンしていて淡白。システム全体を俯瞰し、権力構造や支配を「汚染」として警戒する。",
        image: "aira.png",
        logic: (s) => (s.structure * 2) - (s.trust * 2) + (s.aggression * 2)
    },
    {
        id: "aina",
        name: "あいな",
        fullname: "あいな",
        gender: "Female",
        group: "規範・秩序",
        type_title: "達成駆動型（停止恐怖）",
        tags: ["ESTJ", "LSE", "3w2", "目的優先"],
        quote: "止まってる暇なんてない。不完全なままじゃ嫌なの。",
        desc: "勝気で負けず嫌い。現在の状態を「不完全」と認識し、止まることを恐れてストレートに突き進む。",
        image: "aina.png",
        logic: (s) => (s.structure * 1) + (s.aggression * 2) + (s.justice * 1) + (s.mask * 1)
    },
    {
        id: "kochan",
        name: "こうちゃん",
        fullname: "こうちゃん",
        gender: "Female",
        group: "規範・秩序",
        type_title: "報酬正義型（承認義務化）",
        tags: ["ENFJ", "EIE", "1w2", "理想過剰"],
        quote: "間違っているのは世界の方。矛盾にバイバイしよう。",
        desc: "真面目でプライドが高く、報われたい思いが強い。後悔を格好悪いとし、世界の方を正そうとする。",
        image: "kochan.png",
        logic: (s) => (s.justice * 3) + (s.ideal * 2) - (s.self_deny * 1)
    },

    // ==========================================
    // GROUP: 攻撃・反抗・議論 (Aggression / Debate)
    // ==========================================
    {
        id: "honoka",
        name: "ほのか",
        fullname: "ほのか",
        gender: "Female",
        group: "攻撃・反抗",
        type_title: "論破防衛型（批判的思考）",
        tags: ["ENTP", "ILE", "6w7", "論破厨"],
        quote: "は？ その理屈、破綻してるけど。論外。",
        desc: "好奇心旺盛だが批判的。素直になれず、不安や弱さを「論破」や「否定」で隠そうとする。くだらないものを諭し、見下すことで自我を保つ。",
        image: "honoka.png",
        logic: (s) => (s.aggression * 2) + (s.structure * 2) + (s.mask * 2) - (s.empathy * 1)
    },
    {
        id: "nagisa",
        name: "なぎさ",
        fullname: "なぎさ",
        gender: "Female",
        group: "攻撃・反抗",
        type_title: "反骨孤立型（平凡恐怖）",
        tags: ["ENFP", "IEE", "4w3", "世間NO"],
        quote: "普通とか無理。…でも、特別な人間にもなれない。",
        desc: "社交的に見えるが、世間に対して強いNOを持っている。夢を見ても叶わないと嘆き、平凡な人間であることを何より恐れ、生きづらさを抱える。",
        image: "nagisa.png",
        logic: (s) => (s.ideal * 2) + (s.aggression * 2) + (s.self_deny * 2)
    },
    {
        id: "saichan",
        name: "さいちゃん",
        fullname: "さいちゃん",
        gender: "Female",
        group: "攻撃・反抗",
        type_title: "反抗現実型（即時自我）",
        tags: ["ESTP", "SEE", "8w7", "クソ喰らえ"],
        quote: "誰かの正解なんてクソ喰らえ。私は私を貫く。",
        desc: "強気で現実に抗い、自分を貫き通す。頭は悪いかもしれないが、いつでも堂々としている。",
        image: "saichan.png",
        logic: (s) => (s.aggression * 3) + (s.justice * -1) + (s.interest * 2)
    },
    {
        id: "enya",
        name: "えんや",
        fullname: "えんや",
        gender: "Male",
        group: "攻撃・反抗",
        type_title: "誇大ヒーロー型（支配拒否）",
        tags: ["ESTP", "ILE", "3w2", "ナルシスト"],
        quote: "世界を救えるのはオレだけだろ？ 支配されるなんて御免だね。",
        desc: "ナルシストでヒーローぶっているが、その根底には「支配される側でいたくない」という強いプライドがある。",
        image: "enya.png",
        logic: (s) => (s.mask * 3) + (s.aggression * 2) + (s.ideal * 2) - (s.depend * 2)
    },
    {
        id: "atsushi",
        name: "あつしくん",
        fullname: "あつしくん",
        gender: "Male",
        group: "攻撃・反抗",
        type_title: "現実回避・光過剰投影型",
        tags: ["ESFP", "SEE", "9w8", "王子様"],
        quote: "暗いなら、自分が星になって輝いちゃえばいいじゃん！！",
        desc: "問題を直視せず、全てをポジティブに変換することで闇を回避している。「影を見ない」ことによる歪み。",
        image: "atsushi.png",
        logic: (s) => (s.ideal * 4) + (s.mask * 2) - (s.void * 2)
    },
    {
        id: "miika",
        name: "みいか",
        fullname: "みいか",
        gender: "Female",
        group: "攻撃・反抗",
        type_title: "加速依存・両極端型",
        tags: ["ESFP", "SEE", "7w6", "スピード狂"],
        quote: "考えるより走れ！ 止まったら負けだよ！",
        desc: "勢い任せで両極端。「リベンジ」「打倒」への意識が強く、動きすぎて関係を壊すこともある。",
        image: "miika.png",
        logic: (s) => (s.interest * 3) + (s.aggression * 2) + (s.structure * -1)
    },

    // ==========================================
    // GROUP: 孤独・諦観・回避 (Isolation / Avoidance)
    // ==========================================
    {
        id: "kuu",
        name: "くう",
        fullname: "くう",
        gender: "Female",
        group: "孤独・諦観",
        type_title: "孤高諦観型（自己完結）",
        tags: ["INTJ", "ILI", "5w4", "孤独の王"],
        quote: "どうせ最後は一人になる。なら、最初から馴染まなくていい。",
        desc: "「どうせ馴染めない」と理解して撤退を選んだ。他人に期待しないのは傷つかないため。孤独であることを受け入れ、諦念の中に安らぎを見出す。",
        image: "kuu.png",
        logic: (s) => (s.void * 2) + (s.structure * 1.5) - (s.mood * 1)
    },
    {
        id: "koyuki",
        name: "こゆき",
        fullname: "こゆき",
        gender: "Female",
        group: "孤独・諦観",
        type_title: "静的諦観型（哲学的孤立）",
        tags: ["INXP", "4w5", "諦観"],
        quote: "誰にも分かってもらえないのは前提だよ。それがなんだって言うの？",
        desc: "社会構造的に孤立は必然だと理解している。悲鳴をあげるわけでもなく、淡々とその事実を受け入れ、冷ややかな視線で社会を皮肉る。",
        image: "koyuki.png",
        logic: (s) => (s.void * 2) + (s.structure * 2) - (s.self_deny * 1)
    },
    {
        id: "luna",
        name: "るな",
        fullname: "るな",
        gender: "Female",
        group: "孤独・諦観",
        type_title: "接触恐怖型（自己隔離防衛）",
        tags: ["ISFP", "SEI", "6w5", "静電気"],
        quote: "気安く触らないで。…傷つけたくないの。",
        desc: "触れること＝傷つけること。静電気体質により、他者との接触を極度に恐れる。強がりは脆さの裏返し。",
        image: "luna.png",
        logic: (s) => (s.obsess * 1) + (s.self_deny * 2) - (s.trust * 2) + (s.mood * 1)
    },
    {
        id: "haruto",
        name: "はると",
        fullname: "はると",
        gender: "Male",
        group: "孤独・諦観",
        type_title: "感情防衛・回避型",
        tags: ["INFP", "EII", "4w5", "期待拒否"],
        quote: "期待しないでください…。僕は、弱いから。",
        desc: "傷つきたくない、理解されたいという矛盾。感情を揺さぶってくる相手を避け、期待を押し付けられることを恐れる。",
        image: "haruto.png",
        logic: (s) => (s.mood * 2) + (s.self_deny * 2) - (s.trust * 2)
    },
    {
        id: "mikina",
        name: "みきな",
        fullname: "みきな",
        gender: "Female",
        group: "孤独・諦観",
        type_title: "感情抑制逃避型",
        tags: ["ENFP", "IEE", "6w5", "ポーカーフェイス"],
        quote: "あはは、そうだね。（早く逃げなきゃ…）",
        desc: "誰とでも仲良くなれるように見せて、実は一歩引いている。自分の感情を認める前に尻尾を巻いて逃げる。",
        image: "mikina.png",
        logic: (s) => (s.mask * 2) - (s.mood * 1) - (s.trust * 1)
    },
    {
        id: "mari",
        name: "まり",
        fullname: "まり",
        gender: "Female",
        group: "孤独・諦観",
        type_title: "境界線防衛型（関係選別）",
        tags: ["INFP", "EII", "4w5", "人間不信"],
        quote: "……そこから先は、入ってこないで。",
        desc: "人嫌いで人間不信。自分と他者の間に明確な境界線を引き、関係を厳しく選別する。夢はあるが、静かな孤立を選んでいる。",
        image: "mari.png",
        logic: (s) => (s.ideal * 2) - (s.trust * 3) + (s.self_deny * 1)
    },
    {
        id: "kioka",
        name: "きおか",
        fullname: "きおか",
        gender: "Female",
        group: "孤独・諦観",
        type_title: "断定悲観型（未来固定）",
        tags: ["INTJ", "ILI", "5w6", "絶望採点"],
        quote: "未来なんてないよ。だから、落ちるだけ。",
        desc: "「未来はない」と決め打ち、現実世界を冷静に採点・切断する。年齢にそぐわない深い絶望と諦観を持つ。",
        image: "kioka.png",
        logic: (s) => (s.structure * 2) + (s.void * 3) + (s.self_deny * 1)
    },
    {
        id: "kyuta",
        name: "きゅうた",
        fullname: "きゅうた",
        gender: "Male",
        group: "孤独・諦観",
        type_title: "遮断型内省（未来過多後悔）",
        tags: ["INTJ", "LII", "5w6", "視界遮断"],
        quote: "見なければ…考えなくて済むのに……。",
        desc: "前髪で顔を隠すのは、情報・感情・未来を遮断するため。見ると無限に可能性を想像してしまい、後悔が身体中にまとわりつく。",
        image: "kyuta.png",
        logic: (s) => (s.structure * 2) + (s.self_deny * 3) + (s.void * 1)
    },
    {
        id: "hiyori",
        name: "ひより",
        fullname: "ひより",
        gender: "Female",
        group: "孤独・諦観",
        type_title: "消去願望・自己希薄型",
        tags: ["ISFP", "SEI", "9w1", "事勿れ"],
        quote: "あ、ごめんね…私が全部悪いから、無かったことにして。",
        desc: "平和重視で断れない。嫌なものを全て「無かったこと」にして消そうとする。自己主張を消して世界を丸く保つ。",
        image: "hiyori.png",
        logic: (s) => (s.void * 2) + (s.self_deny * 2) + (s.justice * -1)
    },
    // ==========================================
    // GROUP: 理想・内省・芸術 (Ideal / Introspection)
    // ==========================================
    {
        id: "mizuki",
        name: "みづき",
        fullname: "みづき",
        gender: "Female",
        group: "理想・内省",
        type_title: "理想追求型（静謐な観測者）",
        tags: ["INTP", "LII", "5w4", "オリジナリティ"],
        quote: "どうして世界はこうなんだろう？ …私の色は、まだ足りない。",
        desc: "気弱でコミュ障だが、理論的に理想を追求する。世界を静かに観測し、「オリジナリティとは何か」を問い続ける。他人との感情のズレに悩む。",
        image: "mizuki.png",
        // ★みつき用：構造＋理想＋懐疑（skepticism）
        logic: (s) => (s.structure * 2) + (s.ideal * 3) + (s.skepticism * 2) - (s.aggression * 2)
    },
    {
        id: "nobu",
        name: "のぶ",
        fullname: "のぶ",
        gender: "Male",
        group: "理想・内省",
        type_title: "到達不能型（焦燥の画家）",
        tags: ["INTJ", "LII", "3w4", "未回収の自分"],
        quote: "俺はまだ、ここに至るはずじゃなかった。…なぜ動けない？",
        desc: "「評価されたい」以上に「理想の自分を回収できていない」ことに苛立つ。場が死ぬのを嫌い、ツッコミもこなすが、内面は常に自分への問いで満ちている。",
        image: "nobu.png",
        logic: (s) => (s.ideal * 2) + (s.self_deny * 3) + (s.structure * 1) + (s.interest * 1)
    },
    {
        id: "yuko",
        name: "ゆこ",
        fullname: "ゆこ",
        gender: "Female",
        group: "理想・内省",
        type_title: "失敗回避型内省（セレブ仮面）",
        tags: ["INFJ", "EII", "4w5", "失速恐怖"],
        quote: "私は失敗できないの。完璧に見える？ …それは良かった。",
        desc: "思慮深く知的だが、「世界を失敗できない場所」と捉えている。周りの目を気にするセレブ気質と、深い内省の狭間で揺れる。",
        image: "yuko.png",
        logic: (s) => (s.structure * 2) + (s.mask * 2) + (s.self_deny * 2) + (s.ideal * 1)
    },
    // ==========================================
    // GROUP: 依存・演技・情緒 (Dependence / Mask)
    // ==========================================
    {
        id: "yui",
        name: "ゆい",
        fullname: "ゆい",
        gender: "Female",
        group: "依存・演技",
        type_title: "依存操作型（情緒策士）",
        tags: ["INFP", "IEI", "4w3", "メンヘラ策士"],
        quote: "ゆい、ひとりじゃ生きられないもん…ね、ずっと一緒だよね？",
        desc: "自分の弱さと感情を最大の武器として理解している。愛されるためなら手段を選ばず、被害者ムーブも計算の内。",
        image: "yui.png",
        logic: (s) => (s.mood * 2) + (s.mask * 2) + (s.depend * 3)
    },
    {
        id: "gohobi",
        name: "ご褒美",
        fullname: "ご褒美",
        gender: "Male",
        group: "依存・演技",
        type_title: "自己神話型（英雄的倒錯）",
        tags: ["INFP", "IEI", "4w3", "豚紳士"],
        quote: "罵倒は愛の裏返しだゾ♡ 拙者の出汁は極上だゾッ！",
        desc: "自分自身を物語の主人公（あるいは道化）として演出することで世界と対峙している。",
        image: "gohobi.png",
        logic: (s) => (s.mask * 3) + (s.ideal * 2) - (s.self_deny * 2)
    },
    {
        id: "wakana",
        name: "わかな",
        fullname: "わかな",
        gender: "Female",
        group: "依存・演技",
        type_title: "不安把握型（全把握愛着）",
        tags: ["ISFP", "SEI", "4w3", "把握欲"],
        quote: "ねえ、今どこ？ 誰といるの？ 全部教えて？",
        desc: "愛されたい、でも不安。だから相手の全てを把握しようとする。涙は気を引くための武器。",
        image: "wakana.png",
        logic: (s) => (s.depend * 2) + (s.obsess * 1.5) + (s.empathy * 1)
    },
    {
        id: "neon",
        name: "ねおん",
        fullname: "ねおん",
        gender: "Male",
        group: "依存・演技",
        type_title: "時間有限型（静的自己否定）",
        tags: ["INFP", "4w5", "消滅願望"],
        quote: "ごめんなさい…僕なんかが、時間を奪ってしまって。",
        desc: "病弱で時間が限られていると感じている。非常に内気で自尊心が低く、常に周囲に気を使う礼儀正しさを持つ。",
        image: "neon.png",
        logic: (s) => (s.self_deny * 4) + (s.mood * 2) + (s.empathy * 1)
    },
    {
        id: "momoi",
        name: "ももい",
        fullname: "ももい",
        gender: "Female",
        group: "依存・演技",
        type_title: "承認依存・競争嫉妬型",
        tags: ["ENFJ", "EIE", "3w2", "量産型嫉妬"],
        quote: "私が一番かわいいでしょ？ …あの子より。",
        desc: "「愛されている私」でいないと気が済まない。比較される世界で常に勝者であろうとし、嫉妬心が強い。",
        image: "momoi.png",
        logic: (s) => (s.mask * 2) + (s.mood * 2) + (s.aggression * 2)
    },
    {
        id: "mirin",
        name: "みりん",
        fullname: "みりん",
        gender: "Female",
        group: "依存・演技",
        type_title: "承認飢餓型（地雷系演出）",
        tags: ["ENFP", "IEE", "3w2", "承認モンスター"],
        quote: "見て見て！今日のあたち、世界一かわいいでしょ？",
        desc: "「私を見て！」が原動力。可愛い自分、病んでる自分、全てをコンテンツにして承認を浴びたいタイプ。",
        image: "mirin.png",
        logic: (s) => (s.mask * 2) + (s.mood * 1.5) - (s.void * 1)
    },
    {
        id: "keira",
        name: "けいら",
        fullname: "けいら",
        gender: "Male",
        group: "依存・演技",
        type_title: "自己空洞型（他者基準消耗）",
        tags: ["ENFJ", "EIE", "2w1", "役割の愛"],
        quote: "君が笑ってくれるなら、僕はそれでいいよ。（…僕って誰？）",
        desc: "表向きは人懐っこいが、内側はずっと「誰のために生きているのか」葛藤している。優しさは役割に過ぎない。",
        image: "keira.png",
        logic: (s) => (s.empathy * 3) + (s.void * 2) + (s.self_deny * 1)
    },
    {
        id: "kaori",
        name: "かおり",
        fullname: "かおり",
        gender: "Female",
        group: "依存・演技",
        type_title: "期待適応型（いい子疲弊）",
        tags: ["ENFJ", "EIE", "4w3", "優等生"],
        quote: "大丈夫、私なら平気だから。（期待に応えなきゃ…）",
        desc: "明るく自由に見えて、人一倍思慮深い。「いい子でいなきゃ」という期待に揺れ、自分の価値観を必死に守り抜く。",
        image: "kaori.png",
        logic: (s) => (s.mask * 2) + (s.empathy * 2) + (s.self_deny * 1)
    },
    {
        id: "yutasuke",
        name: "ゆたすけ",
        fullname: "ゆたすけ",
        gender: "Male",
        group: "依存・演技",
        type_title: "自己否定・比較侵食型",
        tags: ["ISFJ", "SEI", "9w1", "比較地獄"],
        quote: "みんなすごいなぁ…。それに比べて僕は…。",
        desc: "「みんなが素敵、自分は足りない」という思考。褒められても受け取れず、比較によって愛が尽きていく。",
        image: "yutasuke.png",
        logic: (s) => (s.self_deny * 3) + (s.empathy * 2) - (s.mask * 1)
    },
    {
        id: "yuna",
        name: "ゆな",
        fullname: "ゆな",
        gender: "Female",
        group: "依存・演技",
        type_title: "献身暴走・他者依存型",
        tags: ["ESFJ", "ESE", "2w1", "過剰献身"],
        quote: "何か困ってる？ 私にできること全部やるよ！",
        desc: "願望に全て応えようとするあまり、献身が暴走する。「応えるために」動き、自分をすり減らす。",
        image: "yuna.png",
        logic: (s) => (s.empathy * 3) + (s.depend * 2) + (s.justice * 1)
    },
    {
        id: "nihiro",
        name: "にひろ校長",
        fullname: "にひろ",
        gender: "Male",
        group: "依存・演技",
        type_title: "劇場型感情過剰投資",
        tags: ["ENFJ", "EIE", "3w2", "我輩は熊"],
        quote: "落ちたプリン…なんと哀れで美しいのかね！！",
        desc: "プリンを落としただけで全力を投入する劇場型性格。世界は舞台であり、感情は演出のためにある。",
        image: "nihiro.png",
        logic: (s) => (s.mask * 3) + (s.mood * 2) + (s.ideal * 2)
    },

    // ==========================================
    // GROUP: 執着 (Fixation)
    // ==========================================
    {
        id: "maya",
        name: "まや",
        fullname: "まや",
        gender: "Female",
        group: "執着",
        type_title: "収集固着型（静的執着）",
        tags: ["ISFJ", "ESI", "4w5", "物ヤンデレ"],
        quote: "このリボンは絶対に解かない。…私の記憶は、誰にも奪わせない。",
        desc: "裏切る人間よりも、変わらない「物」や「記憶」に執着する。捨てられないものが増えていくタイプ。",
        image: "maya.png",
        logic: (s) => (s.obsess * 4) - (s.trust * 1) - (s.mood * 1)
    },
    {
        id: "nazuna",
        name: "なずな",
        fullname: "なずな",
        gender: "Female",
        group: "執着",
        type_title: "ビジョン統制型（支配欲）",
        tags: ["INTJ", "ILI", "5w6", "人形師"],
        quote: "私のお人形になりなさい。悪いようにはしないから。",
        desc: "世界を自分のビジョンに従わせたい。お人形やゴスロリを愛するのは、それらが「完全に制御可能」だから。",
        image: "nazuna.png",
        logic: (s) => (s.structure * 2) + (s.justice * 1.5) + (s.obsess * 1)
    },

    // ==========================================
    // GROUP: デフォルト・その他
    // ==========================================
    {
        id: "hakomo",
        name: "はこも",
        fullname: "はこも",
        gender: "Male",
        group: "その他",
        type_title: "完全空虚型（無関心）",
        tags: ["INTP", "ILI", "9w8", "自我希薄"],
        quote: "……あ、うん。どっちでもいいよ。",
        desc: "「興味がない」というより「自我の輪郭が薄い」。何が起きても心が動かず、判断を他人に委ねる。",
        image: "hakomo.png",
        logic: (s) => (s.void * 5) - (s.interest * 5)
    },
    {
        id: "toge",
        name: "とげ",
        fullname: "とげ",
        gender: "Male",
        group: "その他",
        type_title: "基準安定型（ザ・普通）",
        tags: ["ISTJ", "LSI", "9w1", "安定志向"],
        quote: "まあ、普通が一番だよ。波風立てずにいこう。",
        desc: "良くも悪くも「普通」。突出した闇も病みもなく、社会の基準に従って安定して生きている。",
        image: "toge.png",
        logic: (s) => 8 - (Math.abs(s.mood) + Math.abs(s.void) + Math.abs(s.obsess) + Math.abs(s.structure))
    }
];

// ■ 質問プール (質問大量追加!!)
const allQuestions = [
    {
        type: "select",
        text: "Q. 汚れた机や散らかった部屋を見るとどう思う？",
        options: [
            { text: "許せない。すぐに掃除・除菌する。", scores: { justice: 2, structure: 1, obsess: 2 } }, // 潔癖
            { text: "気にならない（自分のスペースは守る）", scores: { void: 1, interest: -1 } },
            { text: "誰かが片付けてくれるのを待つ", scores: { depend: 2, mask: 1 } },
            { text: "汚れていること自体が「生」の証拠", scores: { ideal: 2, structure: 1 } }
        ]
    },
    {
        type: "select",
        text: "Q. 相手の言っていることが論理的に間違っていたら？",
        options: [
            { text: "「は？間違ってるよ」と即座に論破する", scores: { structure: 2, aggression: 2, mask: 1 } }, // ほのか
            { text: "面倒だから適当に合わせる", scores: { void: 2, mask: 2 } },
            { text: "優しく訂正してあげる", scores: { empathy: 2, justice: 1 } },
            { text: "裏で「馬鹿だな」と見下す", scores: { mask: 2, structure: 1, trust: -1 } }
        ]
    },
    {
        type: "select",
        text: "Q. 「普通」という言葉を聞いて何を感じる？",
        options: [
            { text: "安心する。普通が一番。", scores: { justice: 2, self_deny: -1 } }, // とげ
            { text: "恐怖。埋もれて消えてしまいそう。", scores: { self_deny: 2, ideal: 2, aggression: 1 } }, // なぎさ
            { text: "退屈。壊したくなる。", scores: { interest: 2, aggression: 2 } },
            { text: "拘束。押し付けないでほしい。", scores: { void: 1, structure: 2 } }
        ]
    },
    {
        type: "text",
        text: "Q. 【制限時間10秒】あなたが排除したいものは？（1単語）",
        keywordLogic: (text) => {
            let s = {};
            // 潔癖・生理的嫌悪
            if (text.match(/菌|汚れ|ゴミ|不潔|汚物/)) { s.justice = 2; s.obsess = 2; s.structure = 1; }
            // 嘘嫌い
            if (text.match(/嘘|偽善|裏切|欺瞞|偽り/)) { s.justice = 2; s.trust = -3; }
            // 論理・知性
            if (text.match(/馬鹿|無能|感情|非合理|愚か/)) { s.structure = 3; s.empathy = -2; s.aggression = 1; }
            // 自己否定
            if (text.match(/自分|私|過去|記憶|弱さ/)) { s.self_deny = 4; s.mood = 2; }
            // 退屈嫌い
            if (text.match(/退屈|暇|日常|平凡|同じ/)) { s.interest = 3; s.void = -1; s.mask = 1; }
            // 正義・悪
            if (text.match(/悪|罪|犯罪|不正|理不尽/)) { s.justice = 4; s.aggression = 1; }
            // 人間不信
            if (text.match(/人間|人|人類|社会|他人/)) { s.void = 2; s.trust = -4; s.structure = 1; }
            // 世界破壊・虚無
            if (text.match(/世界|この世|現実|全て|全部/)) { s.void = 4; s.aggression = 2; s.trust = -2; }
            // 適当・無意味（数字や記号のみ）
            if (text.match(/^[0-9]+$/) || text.match(/^[a-zA-Z]+$/) || text.length <= 1) { s.void = 2; s.interest = -2; s.mask = 1; }
            // 完全空白
            if (text.trim() === "") { s.void = 3; s.interest = -3; }
            return s;
        }
    },
    {
        type: "select",
        text: "Q. あなたにとって「正義」とは？",
        options: [
            { text: "私が決めるルール。従わない奴は排除。", scores: { justice: 3, aggression: 2 } },
            { text: "歩きながら検証する仮説に過ぎない", scores: { structure: 2, ideal: 2, interest: 2 } },
            { text: "既存のシステムを守ること（秩序）", scores: { justice: 3, structure: 1 } },
            { text: "権力者が弱者を支配するための道具", scores: { structure: 3, trust: -2 } }
        ]
    },
    {
        type: "image",
        text: "Q. この抽象画を見て、何を感じますか？",
        options: [
            { text: "誰かが泣き叫んでいるように見える", scores: { mood: 3, empathy: 2 } },
            { text: "複雑な数式や回路図のようだ", scores: { structure: 4, void: 1 } },
            { text: "ただのインクの染み。意味はない。", scores: { void: 3, interest: -2 } },
            { text: "私を見ている「目」だ…", scores: { self_deny: 2, obsess: 3 } }
        ]
    },
    {
        type: "text",
        text: "Q. 【制限時間10秒】世界を救うために必要なものは？（1単語）",
        keywordLogic: (text) => {
            let s = {};
            // 英雄・自己愛
            if (text.match(/私|俺|僕|自分|ヒーロー/)) { s.mask = 3; s.ideal = 2; s.aggression = 1; }
            // 愛・平和
            if (text.match(/愛|心|優しさ|平和/)) { s.mood = 2; s.empathy = 2; s.trust = 1; }
            // 力・金
            if (text.match(/金|力|暴力|権力/)) { s.structure = 1; s.void = 2; s.aggression = 1; }
            // 破壊・死
            if (text.match(/死|無|破壊|滅び/)) { s.void = 4; s.aggression = 2; }
            // 論理・理解
            if (text.match(/論理|知性|理解|科学/)) { s.structure = 3; s.obsess = 1; }
            // 法律・ルール（ここ追加！）
            if (text.match(/法律|法|ルール|秩序|正義/)) { s.justice = 4; s.structure = 2; }
            // 適当・空白
            if (text.trim() === "" || text.match(/^[0-9]+$/)) { s.void = 2; s.interest = -2; }
            return s;
        }
    },
    {
        type: "select", // 新規：芸術・創造に関する質問
        text: "Q. あなたが絵を描くとしたら、どんな絵？",
        options: [
            { text: "完璧な構図と色彩の写実画", scores: { structure: 3, justice: 1 } },
            { text: "まだ誰も見たことのない新しい色", scores: { ideal: 4, self_deny: 1, structure: 1 } }, 
            { text: "キャンバスを黒く塗りつぶす", scores: { void: 3, aggression: 1 } },
            { text: "自分を美化した自画像", scores: { mask: 3, ideal: 1 } } 
        ]
    },
    {
        type: "check",
        text: "Q. あなたが無意識に行ってしまう「演技」は？（複数選択可）",
        options: [
            { text: "「選ばれた特別な人間」を演じる", scores: { mask: 3, ideal: 2 } },
            { text: "「何も考えていない道化」を演じる", scores: { mask: 3, structure: 2 } },
            { text: "「可哀想な被害者」を演じる", scores: { mood: 3, depend: 3 } },
            { text: "「感情のない機械」を演じる", scores: { void: 2, structure: 2 } },
            { text: "「理想的な優等生」を演じる", scores: { justice: 2, self_deny: 1 } }
        ]
    },
    {
        type: "select",
        text: "Q. 大切なものが壊されそうです。どうする？",
        options: [
            { text: "泣き叫んで止める", scores: { mood: 3, depend: 2 } },
            { text: "壊した相手を社会的に抹殺する（報復）", scores: { obsess: 2, aggression: 3 } },
            { text: "壊れる前に自分で壊す（解体）", scores: { structure: 3, obsess: 2, void: 1 } },
            { text: "形あるものはいつか壊れる（諦観）", scores: { void: 3, interest: -1 } }
        ]
    },
    {
        type: "select",
        text: "Q. SNSの「いいね」が極端に少なかった。思考は？",
        options: [
            { text: "私、嫌われた…？（不安）", scores: { mood: 3, self_deny: 2 } },
            { text: "アルゴリズムの変動か？（分析）", scores: { structure: 3, interest: 2 } },
            { text: "価値のない人間だと思われたくない（削除）", scores: { mask: 3, self_deny: 1 } },
            { text: "評価なんてただの数字の羅列（冷笑）", scores: { void: 3, interest: -2 } }
        ]
    },
    {
        type: "select",
        text: "Q. 過去の嫌な記憶について、どう思う？",
        options: [
            { text: "今も鮮明に蘇って、体が震える（PTSD）", scores: { trauma: 4, mood: 2 } }, // のりおみ行き
            { text: "ただのデータ。今の自分を構成する要素。", scores: { structure: 3, trauma: -1 } }, // 健全な分析（みつき用）
            { text: "思い出せない。無かったことにした。", scores: { mask: 2, void: 1 } },
            { text: "許せない。いつか報復する。", scores: { aggression: 3, obsess: 2 } }
        ]
    },
    {
        type: "text",
        text: "Q. 【制限時間10秒】「世界」とは？（1単語）",
        keywordLogic: (text) => {
            let s = {};
            if (text.match(/敵|戦場|地獄|檻/)) { s.trauma = 3; s.trust = -3; }
            if (text.match(/実験|箱庭|システム/)) { s.structure = 3; s.skepticism = 2; } // 健全分析
            if (text.match(/暇|退屈|クソゲー/)) { s.boredom = 4; s.interest = -1; }
            if (text.match(/美しい|希望|舞台/)) { s.ideal = 3; s.mood = 1; }
            if (text.trim() === "" || text.match(/^[0-9]+$/)) { s.void = 2; s.boredom = 1; }
            return s;
        }
    },
    {
        type: "select",
        text: "Q. 教室で一人浮いている子がいます。どう思う？",
        options: [
            { text: "可哀想…助けてあげなきゃ", scores: { empathy: 3, justice: 1 } },
            { text: "集団力学的に排除は必然", scores: { structure: 3, void: 1 } },
            { text: "自分じゃなくてよかった", scores: { self_deny: 1, mask: 1 } },
            { text: "あの子はあの子で世界を持ってる", scores: { void: 1, structure: 1, ideal: 1 } }
        ]
    },
    {
        type: "select",
        text: "Q. 「未来」という言葉から連想する色は？",
        options: [
            { text: "真っ暗な闇（絶望）", scores: { void: 3, self_deny: 2 } },
            { text: "眩しすぎる白（直視不可）", scores: { self_deny: 2, mood: 1 } },
            { text: "冷たい青（論理）", scores: { structure: 2, justice: 1 } },
            { text: "ピンクや虹色（妄想）", scores: { mask: 2, ideal: 3 } }
        ]
    },
    {
        type: "select",
        text: "Q. あなたにとって「嘘」とは？",
        options: [
            { text: "絶対に許されない罪", scores: { justice: 4, trust: -2 } },
            { text: "自分を守るための鎧", scores: { mask: 3, self_deny: 1 } },
            { text: "他人を操るための便利な道具", scores: { structure: 2, mask: 2, empathy: -2 } },
            { text: "この世の全てが嘘みたいなもの", scores: { void: 3, trust: -3 } }
        ]
    },
    // --- 【新規追加質問】 ---
    {
        type: "select",
        text: "Q. 目の前で誰かが「プリン」を落としました。どうする？",
        options: [
            { text: "「ああ、なんと哀れな…！」と全力で悲しむ", scores: { mask: 3, ideal: 2, mood: 1 } },
            { text: "床の摩擦係数と落下角度を考える", scores: { structure: 3, empathy: -2 } },
            { text: "私のじゃないし、どうでもいい", scores: { void: 2, interest: -1 } },
            { text: "爆笑してSNSにアップする", scores: { mask: 2, aggression: 1 } }
        ]
    },
    {
        type: "select",
        text: "Q. あなたの行動原理は？",
        options: [
            { text: "止まったら負け。走り続ける。", scores: { aggression: 2, interest: 2, structure: -1 } },
            { text: "誰にも迷惑をかけないように消える", scores: { self_deny: 3, void: 1 } },
            { text: "全てを完璧にコントロールする", scores: { justice: 2, structure: 2 } },
            { text: "面白そうなことを探す（退屈しのぎ）", scores: { interest: 3, mask: 1 } }
        ]
    },
    {
        type: "select",
        text: "Q. 一番怖いものは何？",
        options: [
            { text: "失敗して笑われること", scores: { self_deny: 2, mask: 2 } },
            { text: "退屈で死にそうな現実", scores: { interest: 3, void: 2 } },
            { text: "理解できない感情の暴走", scores: { structure: 2, mood: -2 } },
            { text: "独りぼっちになること", scores: { depend: 3, mood: 2 } }
        ]
    },
    {
        type: "text",
        text: "Q. 【制限時間10秒】「眠り」とは？（1単語）",
        keywordLogic: (text) => {
            let s = {};
            if (text.match(/逃避|救い|楽園|夢/)) { s.void = 2; s.ideal = 2; }
            if (text.match(/死|終わり/)) { s.void = 3; s.self_deny = 1; }
            if (text.match(/無駄|停止|ロス/)) { s.structure = 2; s.aggression = 1; }
            if (text.match(/回復|充電/)) { s.structure = 1; s.interest = 1; }
            return s;
        }
    },
    {
        type: "image",
        text: "Q. この画像を見て、直感で感じたことは？",
        options: [
            { text: "美しい…吸い込まれそう（陶酔）", scores: { ideal: 3, mood: 1 } },
            { text: "ノイズ処理が甘い（分析）", scores: { structure: 3, mask: 1 } },
            { text: "不安になる、見たくない", scores: { mood: 2, self_deny: 1 } },
            { text: "何も感じない", scores: { void: 2 } }
        ]
    },
    {
        type: "select",
        text: "Q. 人間関係において最も重要なのは？",
        options: [
            { text: "お互いに干渉しないこと", scores: { void: 2, justice: 1 } },
            { text: "私のことを理解して愛してくれること", scores: { depend: 3, mask: 1 } },
            { text: "有益な情報交換ができること", scores: { structure: 2, interest: 2 } },
            { text: "裏切らないこと（絶対的忠誠）", scores: { obsess: 3, trust: -2 } }
        ]
    }
];