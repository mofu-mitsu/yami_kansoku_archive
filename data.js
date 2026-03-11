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
        id: "noriomi", name: "のりおみ", fullname: "永丘 紀臣（ながおか のりおみ）", gender: "Male", group: "虚無・構造破壊",
        type_title: "虚無懐疑型（崩壊観測者）", tags:["INTP", "LII", "5w6", "PTSD"],
        quote: "幸福なんて信じてない。…それを否定する自分のこともな。",
        desc: "世界は壊れているという前提で生きる。幸福を信じないが、それを否定する自分の思考すら信用しない究極の二重否定。",
        image: "noriomi.png", 
        // 虚無、トラウマ、自己懐疑、観測者、代替案(少し)
        logic: (s) => (s.void * 2) + (s.trauma * 3) + (s.self_doubt * 3) + (s.observer * 2) + (s.alt_path * 1) - (s.trust * 3)
    },
    {
        id: "azuri", name: "あずり", fullname: "あずり", gender: "Male", group: "虚無・構造破壊",
        type_title: "非情冷笑型（爆弾魔）", tags:["INTP", "ILI", "5w6", "ニヒリスト"],
        quote: "思い出？ 愛？ …所詮、その程度のものだろ。",
        desc: "かつては素直だったが、今は冷徹なニヒリスト。プレゼントに爆弾を仕込むような悪賢さと、無慈悲な冷笑を持つ。",
        image: "azuri.png", 
        // 攻撃性、虚無、Ni未来固定、メタ視点
        logic: (s) => (s.void * 2) + (s.aggression * 3) + (s.future_fixation * 2) + (s.meta_view * 2) - (s.empathy * 3)
    },
    {
        id: "kiyomi", name: "きよみ", fullname: "きよみ", gender: "Female", group: "虚無・構造破壊",
        type_title: "思考解体型（観測ヤンデレ）", tags:["INTP", "ILI", "5w4", "哲学解体"],
        quote: "ねえ、中身見せて？ どうなってるか理解したいだけだから。",
        desc: "愛＝理解。対象を愛するあまり、解体し、実験し、構造を理解しようとする思考型ヤンデレ。",
        image: "kiyomi.png", 
        // 構造、Fe擬態、メタ視点、執着、観測者
        logic: (s) => (s.structure_priority * 3) + (s.fe_interface * 3) + (s.observer * 2) + (s.meta_view * 2) + (s.obsess * 2) - (s.empathy * 3)
    },
    {
        id: "alice", name: "ありす", fullname: "ありす", gender: "Female", group: "虚無・構造破壊",
        type_title: "現実消耗型（眠り姫）", tags:["INTP", "ILI", "5w4", "退屈実験"],
        quote: "現実は一層構造すぎて退屈だわ。…夢の方がマシ。",
        desc: "現実に消耗しきっており、言葉の裏側しか見ない。退屈を壊す興味対象が現れるまで眠り続ける。",
        image: "alice.png", 
        // 退屈、現実疲労、刺激欲求、Fe擬態
        logic: (s) => (s.boredom * 3) + (s.reality_fatigue * 3) + (s.stimulation_need * 2) + (s.fe_interface * 2) + (s.observer * 1)
    },
    {
        id: "kaikoku", name: "かいこく", fullname: "かいこく", gender: "Male", group: "虚無・構造破壊",
        type_title: "構造分解享楽型", tags:["ENTP", "ILE", "7w8", "分解フェチ"],
        quote: "乙女すぎワロタww 五臓に六腑が染み渡るわ〜。",
        desc: "人間社会を実験台にする享楽的な愉快犯。構造を揺らして遊ぶ。",
        image: "kaikoku.png", 
        // 構造、遊び心、衝動性、刺激欲求
        logic: (s) => (s.structure_priority * 2) + (s.playfulness * 3) + (s.stimulation_need * 2) + (s.impulsivity * 2) - (s.norm_priority * 2)
    },
    {
        id: "ryogo", name: "りょうご", fullname: "りょうご", gender: "Male", group: "虚無・構造破壊",
        type_title: "統計共感型", tags:["INTJ", "LSI", "5w6", "知識人"],
        quote: "ミスの確率を分解するとさ、環境要因と内部要因があって――",
        desc: "相手を慰めようとして、なぜか「失敗の統計的確率と環境要因の分解」を語り出してしまう構造重視の知識人。",
        image: "ryogo.png", 
        // 超構造優先、メタ視点、共感とトラウマの欠如
        logic: (s) => (s.structure_priority * 4) + (s.skepticism * 2) + (s.meta_view * 2) - (s.empathy * 3) - (s.trauma * 2)
    },
    {
        id: "ai", name: "あい", fullname: "あい", gender: "Female", group: "虚無・構造破壊",
        type_title: "腹黒威圧型（ドS観測）", tags:["INTP", "ILI", "6w5", "毒舌"],
        quote: "あらあら〜、そんなことも分からないんですか？",
        desc: "笑顔でのんびりした敬語口調だが、内面は腹黒く威圧的。論理で相手を罵倒しがち。",
        image: "ai.png", 
        // メタ視点、攻撃性、Fe擬態、遊び心
        logic: (s) => (s.meta_view * 3) + (s.aggression * 2) + (s.fe_interface * 3) + (s.playfulness * 2)
    },
    {
        id: "mitarou", name: "みたろう先生", fullname: "みたろう", gender: "Male", group: "虚無・構造破壊",
        type_title: "感情切断・無関心型", tags:["INTP", "LII", "5w6", "温度ゼロ"],
        quote: "馬鹿にしてんの？ …まあ、どうでもいいけど。",
        desc: "他人に全く興味がない物理教師。感情を理屈で凍結させている。",
        image: "mitarou.png", 
        // 人間嫌い、情緒温度マイナス、虚無
        logic: (s) => (s.void * 3) + (s.misanthropy * 4) + (s.structure_priority * 2) - (s.warmth * 4) - (s.interest * 3)
    },
    {
        id: "miku", name: "みく", fullname: "みく", gender: "Female", group: "虚無・構造破壊",
        type_title: "存在否定合理型（反出生論）", tags:["INTP", "ILI", "5w6", "ASD"],
        quote: "存在することは、コストの連鎖でしかないわ。",
        desc: "「生＝苦痛の再生産」と定義し、断ち切ることが合理的だと考える哲学的ペシミスト。",
        image: "miku.png", 
        // 虚無、未来固定(Ni)、対人緊張、構造優先
        logic: (s) => (s.void * 3) + (s.future_fixation * 2) + (s.structure_priority * 2) + (s.social_phobia * 2) - (s.ideal * 2)
    },
    {
        id: "nami", name: "なみ", fullname: "なみ", gender: "Female", group: "虚無・構造破壊",
        type_title: "観測者冷笑型（シニカル天使）", tags:["INTP", "ILE", "7w8", "理屈お嬢様"],
        quote: "あらあら、壊れちゃいましたわね。面白いデータですわ。",
        desc: "世界を面白がりながら真実を観測している。他人の決壊も観察対象であり、理屈好きだが責任は取らないシニカルな天使。",
        image: "nami.png",
        // 観測者、Fe擬態、遊び心
        logic: (s) => (s.observer * 3) + (s.playfulness * 2) + (s.fe_interface * 2) + (s.structure_priority * 2)
    },
    {
        id: "yae", name: "やえ", fullname: "やえ", gender: "Female", group: "理想・内省",
        type_title: "構成要素分解型（朴念仁）", tags:["INTP", "LII", "5w6", "自己迷子"],
        quote: "私って、何で構成されてるんだろう…？",
        desc: "感じる前に考えてしまうタイプ。「自分」という存在が何で出来ているのか分からず、他者の視線を理解しつつも迎合しない。",
        image: "yae.png",
        // 自己懐疑MAX、メタ視点、観測者
        logic: (s) => (s.self_doubt * 4) + (s.meta_view * 2) + (s.observer * 2) + (s.structure_priority * 2)
    },
    {
        id: "mihi", name: "みひ", fullname: "みひ", gender: "Female (X-gender)", group: "攻撃・反抗",
        type_title: "社会構造敵対型", tags:["INTP", "ILI", "5w4", "社会不信"],
        quote: "なんで男女で差が生まれるんか、考えたことある？",
        desc: "大人しいが人を寄せ付けない。「なぜ男女で差が生まれるのか」という構造思考を持ち、不平等な社会そのものを敵に回す。",
        image: "mihi.png",
        // 構造、懐疑心、社会への攻撃性、未来固定視
        logic: (s) => (s.structure_priority * 3) + (s.skepticism * 3) + (s.aggression * 2) + (s.future_fixation * 1) - (s.trust * 3)
    },
    {
        id: "tamotsu", name: "たもつ", fullname: "たもつ", gender: "Male", group: "虚無・構造破壊",
        type_title: "才能生存戦略型（腹黒）", tags:["INTJ", "LII", "5w6", "評価主義"],
        quote: "観測されない価値なんて、存在せぇへんのと同じやろ？",
        desc: "綺麗事が嫌いな腹黒策士。「才能が評価される＝生存に有利」という冷徹な構造思考を持ち、はんなりとした態度で相手を測る。",
        image: "tamotsu.png",
        // 構造、Fe擬態、プライド、代替案(LII)
        logic: (s) => (s.structure_priority * 3) + (s.fe_interface * 3) + (s.pride * 2) + (s.alt_path * 2)
    },
    // ==========================================
    // GROUP: 規範・秩序・潔癖 (Order / Justice)
    // ==========================================
      {
        id: "jun", name: "じゅん", fullname: "じゅん", gender: "Male", group: "規範・秩序",
        type_title: "衛生統制型（潔癖防衛）", tags:["ISTJ", "LSI", "1w9", "完全除菌"],
        quote: "汚い…近づかないでください。除菌が先です。",
        desc: "極度の潔癖症で完璧主義。汚れ＝悪とみなし、物理的にも精神的にも「無菌状態」を保とうとする。",
        image: "jun.png", 
        logic: (s) => (s.norm_priority * 3) + (s.cleanliness * 4) + (s.obsess * 2) - (s.playfulness * 2)
    },
    {
        id: "nao", name: "なお", fullname: "なお", gender: "Male", group: "規範・秩序",
        type_title: "合理的奉仕型", tags:["INTJ", "LII", "5w6", "整理整頓"],
        quote: "誰かがやらなあかんからやる。合理的やろ？",
        desc: "不思議ちゃんだが合理的。考えすぎる自分を止めたいと思いつつ、掃除など「実を取る」行動で思考を整理する。",
        image: "nao.png", 
        logic: (s) => (s.justice * 2) + (s.cleanliness * 3) + (s.alt_path * 2) + (s.self_doubt * 1)
    },
    {
        id: "itsuki", name: "いつき", fullname: "いつき", gender: "Female", group: "規範・秩序",
        type_title: "排除合理型", tags:["INTJ", "LII", "8w9", "徹底排除"],
        quote: "不快。論理的にも不要。…だから排除する。",
        desc: "歪んだ社会に対して冷ややか。論理的理由をつけて徹底的に不快なものを排除・断罪する。",
        image: "itsuki.png", 
        logic: (s) => (s.norm_priority * 2) + (s.aggression * 2) + (s.structure_priority * 2) + (s.misanthropy * 2)
    },
    {
        id: "karume", name: "かるめ", fullname: "かるめ", gender: "Male (Crossdress)", group: "規範・秩序",
        type_title: "構造防衛型（PTSG）", tags:["INTJ", "LII", "5w6", "成長痛"],
        quote: "逸脱は波紋だよ。石そのものより、広がり方の方が問題なんだ。",
        desc: "嘘と本質を見抜く。基準からの逸脱を恐れるが、過去の傷を乗り越え成長しようとする論理的防衛。",
        image: "karume.png", 
        // 嘘嫌悪、代替案(LII)、トラウマ、構造防衛
        logic: (s) => (s.structure_priority * 3) + (s.alt_path * 2) + (s.lie_hate * 3) + (s.trauma * 2) - (s.trust * 2)
    },
    {
        id: "kouta", name: "こうた", fullname: "こうた", gender: "Male", group: "規範・秩序",
        type_title: "規範絶対化型", tags:["ENTJ", "LIE", "1w2", "正論武装"],
        quote: "それは間違っている。論理的に、倫理的に、排除されるべきだ。",
        desc: "正論を盾に感情を処理し、他者への断罪が激しい。Fi劣勢ゆえに自責はせず世界を正そうとする。",
        image: "kouta.png", 
        logic: (s) => (s.norm_priority * 3) + (s.control * 2) + (s.structure_priority * 2) - (s.self_deny * 3)
    },
    {
        id: "shizuka", name: "しずか", fullname: "しずか", gender: "Female", group: "規範・秩序",
        type_title: "正義硬直型", tags:["ISTJ", "LSI", "1w9", "正解依存"],
        quote: "99点じゃ意味がないの。完璧じゃない私は、いらない。",
        desc: "感情を殺して正解を選び続けるが、その厳しさはやがて自分自身を破壊する。",
        image: "shizuka.png", 
        logic: (s) => (s.norm_priority * 3) + (s.future_fixation * 2) + (s.self_deny * 3)
    },
    {
        id: "kofuku", name: "こふく", fullname: "こふく", gender: "Male", group: "規範・秩序",
        type_title: "秩序原理型（偽り拒絶）", tags:["ISTJ", "LSI", "5w6", "山の神"],
        quote: "本音を出さない人間を、俺は軽蔑する。",
        desc: "偽りが嫌いで嘘を許さない。感情表現を「演技」だと思っており、感情そのものを信用していない。",
        image: "kofuku.png", 
        logic: (s) => (s.lie_hate * 4) + (s.norm_priority * 2) - (s.fe_fake * 3) - (s.trust * 2)
    },
    {
        id: "hana", name: "はな", fullname: "はな", gender: "Female", group: "規範・秩序",
        type_title: "価値条件型", tags:["INTJ", "LII", "5w6", "存在証明"],
        quote: "努力して、資格を取って…そうじゃないと、ここにいる意味がない。",
        desc: "存在意義を「定義」しようとする。努力や成果が基準に届かないと、存在価値ごと揺らぐ。",
        image: "hana.png", 
        logic: (s) => (s.norm_priority * 2) + (s.self_deny * 3) + (s.social_phobia * 2) + (s.self_doubt * 2)
    },
    {
        id: "suzu", name: "すず", fullname: "すず", gender: "Female", group: "規範・秩序",
        type_title: "忍耐防衛型", tags:["INTJ", "LII", "1w9", "しつけ"],
        quote: "私は、ええ子にしてるよ。…そうしないと、入れてもらえないから。",
        desc: "親の厳しすぎるしつけ（締め出し）により、ルールを守ることに固執する。理不尽への静かな疑問を抱える。",
        image: "suzu.png", 
        logic: (s) => (s.norm_priority * 3) + (s.trauma * 2) + (s.self_doubt * 2)
    },
    {
        id: "rinon", name: "りのん", fullname: "りのん", gender: "Female", group: "規範・秩序",
        type_title: "結果至上型", tags: ["ENTJ", "LIE", "3w4", "成果依存"],
        quote: "結果が全てよ。歌で証明してみせるわ。",
        desc: "芯が強く負けず嫌い。自己価値を成果でしか測れない。キノコ（制御不能なもの）が弱点。",
        image: "rinon.png", 
        logic: (s) => (s.pride * 3) + (s.stoicism * 2) + (s.approval * 2) + (s.ideal * 2)
    },
    {
        id: "kahoko", name: "かほこ", fullname: "かほこ", gender: "Female", group: "規範・秩序",
        type_title: "正解依存型（整合固着）", tags:["ISTJ", "LSI", "1w9", "セオリー絶対"],
        quote: "セオリー通りなら失敗しないはず。想定外は…困る。",
        desc: "論理、整合性、合理を愛する。答えがない状態に弱く、今までの「正解」に固執する。",
        image: "kahoko.png",
        logic: (s) => (s.norm_priority * 3) + (s.structure_priority * 2) - (s.alt_path * 2) // 代替案が苦手
    },
    {
        id: "mikoto", name: "みこと", fullname: "みこと", gender: "Female", group: "規範・秩序",
        type_title: "使命転化型（憎悪昇華）", tags: ["ENTJ", "SLE", "3w4", "暗殺者"],
        quote: "人生を投げ出すな。憎しみも燃料にして、戦え。",
        desc: "陽気に見えるが内面は冷酷な元暗殺組織員。過去の憎しみを「使命」に変換して生きている。気配を消すのが得意。",
        image: "mikoto.png",
        logic: (s) => (s.aggression * 3) + (s.stoicism * 2) + (s.mask * 2) + (s.trauma * 2)
    },
    {
        id: "chizu", name: "ちず", fullname: "ちず", gender: "Female", group: "規範・秩序",
        type_title: "実践哲学型（動的正義）", tags:["ENTJ", "LIE", "1w9", "冒険哲学"],
        quote: "行こう。答えは空を見て、歩きながら考えるものだよ。",
        desc: "正しさを「動的な仮説」と捉える冒険家。迷いも含めて前進材料にする健全さを持つが、孤独も希望も抱える。",
        image: "chizu.png",
        logic: (s) => (s.structure_priority * 2) + (s.ideal * 2) + (s.alt_path * 3) + (s.interest * 2) // 代替案で進む
    },
    {
        id: "aira", name: "あいら", fullname: "あいら", gender: "Female", group: "規範・秩序",
        type_title: "構造破壊観測型（反権力）", tags: ["ISTP", "SLI", "5w6", "システム破壊"],
        quote: "そのシステム、バグだらけだね。…壊した方が早いんじゃない？",
        desc: "ツンツンしていて淡白。システム全体を俯瞰し、権力構造や支配を「汚染」として警戒する。",
        image: "aira.png",
        logic: (s) => (s.structure_priority * 3) + (s.skepticism * 3) + (s.aggression * 2) - (s.trust * 3)
    },
    {
        id: "aina", name: "あいな", fullname: "あいな", gender: "Female", group: "規範・秩序",
        type_title: "達成駆動型（停止恐怖）", tags:["ESTJ", "LSE", "3w2", "文画部"],
        quote: "止まってる暇なんてない。不完全なままじゃ嫌なの。",
        desc: "勝気で負けず嫌い、非常にストイック。現在の状態を「不完全」と認識し、止まることを恐れてストレートに突き進む。",
        image: "aina.png", 
        logic: (s) => (s.stoicism * 4) + (s.aggression * 2) + (s.norm_priority * 2)
    },
    {
        id: "kochan", name: "こう", fullname: "こうちゃん", gender: "Female", group: "規範・秩序",
        type_title: "報酬正義型（承認義務化）", tags:["ENFJ", "EIE", "1w2", "理想過剰"],
        quote: "私が正しいと信じた道を行く。だから、信じて欲しい。",
        desc: "真面目でプライドが高く、報われたい思いが強い。後悔を格好悪いとし、世界の方を正そうとする。",
        image: "kochan.png",
        logic: (s) => (s.norm_priority * 3) + (s.ideal * 3) + (s.pride * 2) - (s.self_deny * 2)
    },

    // ==========================================
    // GROUP: 攻撃・反抗・議論 (Aggression / Debate)
    // ==========================================
    {
        id: "honoka", name: "ほのか", fullname: "ほのか", gender: "Female", group: "攻撃・反抗",
        type_title: "論破防衛型", tags:["ENTP", "ILE", "6w7", "論破厨"],
        quote: "は？ その理屈、破綻してるけど。論外。",
        desc: "不安や弱さを「論破」や「否定」で隠そうとする。くだらないものを諭し、見下すことで自我を保つ。",
        image: "honoka.png", 
        logic: (s) => (s.aggression * 3) + (s.pride * 3) + (s.skepticism * 2) - (s.empathy * 3)
    },
    {
        id: "suo", name: "すおう", fullname: "すおう", gender: "Male", group: "攻撃・反抗",
        type_title: "神話離脱型（皮肉不信）", tags:["ENTP", "ILE", "7w8", "人間不信"],
        quote: "神様にお願い？ 笑わせるな。人間の都合なんて知ったことか。",
        desc: "元々祀られていたが、人間の身勝手さに嫌気が差した。演技が上手く狡猾で、人間への憤怒を皮肉で包む。",
        image: "suo.png", 
        logic: (s) => (s.deception * 4) + (s.mask * 3) + (s.misanthropy * 2) + (s.void * 2) - (s.trust * 3)
    },
    {
        id: "mikari", name: "みかり", fullname: "みかり", gender: "Female", group: "攻撃・反抗",
        type_title: "外罰防衛型", tags:["ENTP", "ILE", "6w7", "他責"],
        quote: "全部あいつのせいだもん！ 私は悪くない！",
        desc: "暗闇に閉じ込められた過去を持つ。強気だが根暗で、自己保存のためにすぐ人のせいにする。",
        image: "mikari.png", 
        logic: (s) => (s.aggression * 3) + (s.trauma * 3) + (s.impulsivity * 2) + (s.self_deny * 1)
    },
    {
        id: "nagisa", name: "なぎさ", fullname: "なぎさ", gender: "Female", group: "攻撃・反抗",
        type_title: "反骨孤立型", tags:["ENFP", "IEE", "4w3", "平凡恐怖"],
        quote: "普通とか無理。…でも、特別な人間にもなれない。",
        desc: "世間に対して強いNOを持つ。夢を見ても叶わないと嘆き、平凡であることを何より恐れる。",
        image: "nagisa.png", 
        logic: (s) => (s.ideal * 3) + (s.pride * 2) + (s.self_deny * 3) - (s.future_fixation * 2)
    },
    {
        id: "enya", name: "えんや", fullname: "えんや", gender: "Male", group: "攻撃・反抗",
        type_title: "誇大ヒーロー型", tags:["ESTP", "ILE", "3w2", "支配拒否"],
        quote: "世界を救えるのはオレだけだろ？ 支配されるなんて御免だね。",
        desc: "ナルシストでヒーローぶっているが、根底には「支配される側でいたくない」という強いプライドがある。",
        image: "enya.png", 
        logic: (s) => (s.mask * 3) + (s.approval * 3) + (s.pride * 3) - (s.depend * 3)
    },
    {
        id: "saichan", name: "さいちゃん", fullname: "さいちゃん", gender: "Female", group: "攻撃・反抗",
        type_title: "反抗現実型（即時自我）", tags:["ESTP", "SEE", "8w7", "クソ喰らえ"],
        quote: "誰かの正解なんてクソ喰らえ。私は私を貫く。",
        desc: "強気で現実に抗い、自分を貫き通す。頭は悪いかもしれないが、いつでも堂々としている。",
        image: "saichan.png",
        logic: (s) => (s.aggression * 3) + (s.impulsivity * 3) + (s.interest * 2) - (s.norm_priority * 3)
    },
    {
        id: "atsushi", name: "あつしくん", fullname: "あつしくん", gender: "Male", group: "攻撃・反抗",
        type_title: "現実回避・光過剰投影型", tags:["ESFP", "SEE", "9w8", "王子様"],
        quote: "暗いなら、自分が星になって輝いちゃえばいいじゃん！！",
        desc: "問題を直視せず、全てをポジティブに変換することで闇を回避している。「影を見ない」ことによる歪み。",
        image: "atsushi.png",
        logic: (s) => (s.ideal * 4) + (s.warmth * 3) + (s.playfulness * 2) - (s.void * 2)
    },
    {
        id: "miika", name: "みいか", fullname: "みいか", gender: "Female", group: "攻撃・反抗",
        type_title: "加速依存・両極端型", tags: ["ESFP", "SEE", "7w6", "スピード狂"],
        quote: "考えるより走れ！ 止まったら負けだよ！",
        desc: "勢い任せで両極端。「リベンジ」「打倒」への意識が強く、動きすぎて関係を壊すこともある。",
        image: "miika.png",
        logic: (s) => (s.impulsivity * 4) + (s.aggression * 2) + (s.interest * 2) - (s.structure_priority * 3)
    },

    // ==========================================
    // GROUP: 孤独・諦観・回避 (Isolation / Avoidance)
    // ==========================================
    {
        id: "kuu", name: "くう", fullname: "くう", gender: "Female", group: "孤独・諦観",
        type_title: "孤高諦観型", tags:["INTJ", "ILI", "5w4", "孤独の王"],
        quote: "どうせ最後は一人になる。なら、最初から馴染まなくていい。",
        desc: "「どうせ馴染めない」と理解して撤退を選んだ。孤独を受け入れ、諦念の中に安らぎを見出す。",
        image: "kuu.png", 
        // Ni未来固着、現実疲労、虚無
        logic: (s) => (s.future_fixation * 3) + (s.void * 3) + (s.reality_fatigue * 2) - (s.mood * 2)
    },
    {
        id: "reo", name: "れお", fullname: "れお", gender: "Male", group: "孤独・諦観",
        type_title: "感情不信型", tags:["INTJ", "LII", "5w6", "弱さ嫌悪"],
        quote: "上辺だけの友情なんて不要だ。他人の感情なんて読めないし、怖い。",
        desc: "冷静沈着だが人嫌い。感情を信用できず、弱い自分が何よりも嫌い。",
        image: "reo.png", 
        logic: (s) => (s.misanthropy * 4) + (s.self_doubt * 2) + (s.self_deny * 2) - (s.trust * 4)
    },
    {
        id: "ruruka", name: "るるか", fullname: "るるか", gender: "Female", group: "孤独・諦観",
        type_title: "不安思考型", tags:["INTP", "LII", "6w5", "白黒不能恐怖"],
        quote: "どうすればいいか分からない…。白黒つけられないのが一番苦痛なの。",
        desc: "どう処理すればいいか分からず、自分の判断に自信が持てない。白黒つけられないこと自体が苦痛。",
        image: "ruruka.png", 
        logic: (s) => (s.self_doubt * 4) + (s.social_phobia * 3) + (s.alt_path * 2) + (s.mood * 2)
    },
    {
        id: "ameri", name: "あめり", fullname: "あめり", gender: "Female", group: "孤独・諦観",
        type_title: "離脱観測型", tags:["INTP", "ILI", "5w4", "社会拒否"],
        quote: "挨拶すらスムーズにできない…。もう、遠くから見てるだけでいいや。",
        desc: "自己肯定感が低く、社会を拒否して行動しない。ゆめかわ好きだが、静かに離脱を選ぶ。",
        image: "ameri.png", 
        logic: (s) => (s.reality_fatigue * 4) + (s.social_phobia * 3) + (s.void * 2) + (s.future_fixation * 1)
    },
    {
        id: "kotori", name: "ことり", fullname: "ことり", gender: "Male", group: "孤独・諦観",
        type_title: "享楽逃避型", tags:["INTP", "ILI", "7w8", "諦め"],
        quote: "今更やったって追いつけんやろ。楽しくやろうぜー。",
        desc: "享楽的で楽な方に逃げる。成績最下位だが、追いつけないと理解して諦めきっている。",
        image: "kotori.png", 
        logic: (s) => (s.boredom * 3) + (s.reality_fatigue * 2) + (s.impulsivity * 2) - (s.structure_priority * 2)
    },
    {
        id: "yuzu", name: "ゆず", fullname: "ゆず", gender: "Female", group: "孤独・諦観",
        type_title: "忘却ポーカーフェイス型", tags:["INTJ", "ILI", "5w6", "招き猫"],
        quote: "……（無言でじっと見つめる）",
        desc: "幸運体質を利用された過去から、無口でポーカーフェイスを貫く。苦い経験は夢の中にしまい込む。",
        image: "yuzu.png", 
        logic: (s) => (s.mask * 4) + (s.trauma * 3) + (s.future_fixation * 2) + (s.observer * 2)
    },
    {
        id: "shinon", name: "しのん", fullname: "しのん", gender: "Male", group: "孤独・諦観",
        type_title: "抑うつ型（内向自責）", tags: ["INFP", "4w5", "自責ループ"],
        quote: "ごめんなさい…全部僕の責任です。逃げたい……。",
        desc: "真面目で責任感が強いがゆえに、他人の気持ちを優先しすぎて心が折れた。憂鬱で現実逃避しがち。",
        image: "shinon.png", 
        logic: (s) => (s.sacrifice * 3) + (s.self_deny * 4) + (s.social_phobia * 2) + (s.mood * 3)
    },
    {
        id: "koyuki", name: "こゆき", fullname: "こゆき", gender: "Female", group: "孤独・諦観",
        type_title: "静的諦観型（哲学的孤立）", tags: ["INXP", "4w5", "諦観"],
        quote: "誰にも分かってもらえないのは前提だよ。それがなんだって言うの？",
        desc: "社会構造的に孤立は必然だと理解している。悲鳴をあげるわけでもなく、淡々とその事実を受け入れ、冷ややかな視線で社会を皮肉る。",
        image: "koyuki.png",
        logic: (s) => (s.void * 3) + (s.observer * 3) + (s.future_fixation * 2) - (s.self_deny * 2)
    },
    {
        id: "luna", name: "るな", fullname: "るな", gender: "Female", group: "孤独・諦観",
        type_title: "接触恐怖型（自己隔離防衛）", tags: ["ISFP", "SEI", "6w5", "静電気"],
        quote: "気安く触らないで。…傷つけたくないの。",
        desc: "触れること＝傷つけること。静電気体質により、他者との接触を極度に恐れる。強がりは脆さの裏返し。",
        image: "luna.png",
        logic: (s) => (s.social_phobia * 3) + (s.self_deny * 2) + (s.mood * 2) - (s.trust * 2)
    },
    {
        id: "haruto", name: "はると", fullname: "はると", gender: "Male", group: "孤独・諦観",
        type_title: "感情防衛・回避型", tags:["INFP", "EII", "4w5", "期待拒否"],
        quote: "期待しないでください…。僕は、弱いから。",
        desc: "傷つきたくない、理解されたいという矛盾。感情を揺さぶってくる相手を避け、期待を押し付けられることを恐れる。",
        image: "haruto.png",
        logic: (s) => (s.social_phobia * 3) + (s.mood * 3) + (s.self_deny * 2) - (s.trust * 2)
    },
    {
        id: "mikina", name: "みきな", fullname: "みきな", gender: "Female", group: "孤独・諦観",
        type_title: "感情抑制逃避型", tags:["ENFP", "IEE", "6w5", "ポーカーフェイス"],
        quote: "あはは、そうだね。（早く逃げなきゃ…）",
        desc: "誰とでも仲良くなれるように見せて、実は一歩引いている。自分の感情を認める前に尻尾を巻いて逃げる。",
        image: "mikina.png",
        logic: (s) => (s.fe_interface * 3) + (s.mask * 3) - (s.mood * 2) - (s.trust * 2)
    },
    {
        id: "mari", name: "まり", fullname: "まり", gender: "Female", group: "孤独・諦観",
        type_title: "境界線防衛型（関係選別）", tags:["INFP", "EII", "4w5", "人間不信"],
        quote: "……そこから先は、入ってこないで。",
        desc: "人嫌いで人間不信。自分と他者の間に明確な境界線を引き、関係を厳しく選別する。",
        image: "mari.png", 
        logic: (s) => (s.misanthropy * 3) + (s.ideal * 2) + (s.social_phobia * 2) - (s.trust * 3)
    },
    {
        id: "kioka", name: "きおか", fullname: "きおか", gender: "Female", group: "孤独・諦観",
        type_title: "断定悲観型（未来固定）", tags:["INTJ", "ILI", "5w6", "絶望採点"],
        quote: "未来なんてないよ。だから、落ちるだけ。",
        desc: "「未来はない」と決め打ち、現実世界を冷静に採点・切断する。年齢にそぐわない深い絶望と諦観を持つ。",
        image: "kioka.png",
        logic: (s) => (s.future_fixation * 4) + (s.reality_fatigue * 3) + (s.void * 2) + (s.observer * 2)
    },
    {
        id: "kyuta", name: "きゅうた", fullname: "きゅうた", gender: "Male", group: "孤独・諦観",
        type_title: "遮断型内省（未来過多後悔）", tags:["INTJ", "LII", "5w6", "視界遮断"],
        quote: "見なければ…考えなくて済むのに……。",
        desc: "前髪で顔を隠すのは情報と感情を遮断するため。無限に可能性を想像してしまい、後悔がまとわりつく。",
        image: "kyuta.png", 
        logic: (s) => (s.alt_path * 3) + (s.self_doubt * 4) + (s.self_deny * 3) + (s.social_phobia * 2)
    },
    {
        id: "hiyori", name: "ひより", fullname: "ひより", gender: "Female", group: "孤独・諦観",
        type_title: "消去願望・自己希薄型", tags:["ISFP", "SEI", "9w1", "事勿れ"],
        quote: "あ、ごめんね…私が全部悪いから、無かったことにして。",
        desc: "平和重視で断れない。嫌なものを全て「無かったこと」にして消そうとする。自己主張を消して世界を丸く保つ。",
        image: "hiyori.png",
        logic: (s) => (s.void * 2) + (s.self_deny * 2) + (s.depend * 2) - (s.justice * 2)
    },

    // ==========================================
    // GROUP: 理想・内省・芸術 (Ideal / Introspection)
    // ==========================================
    {
        id: "kanata", name: "かなた先生", fullname: "かなた", gender: "Male", group: "理想・内省",
        type_title: "文化財保全型（社会的正解Fe）", tags:["INTJ", "LII", "5w4", "左脳派"],
        quote: "君のその感情は、尊いものだね。（…ということに、しておくのが正解だな）",
        desc: "表向きは共感的で優しそうに見えるが、中身は超理論派。共感は「社会的正解」として選択しているだけで、自分が感情に支配されることはない。",
        image: "kanata.png",
        logic: (s) => (s.fe_fake * 4) + (s.structure_priority * 3) + (s.observer * 2) + (s.ideal * 1) - (s.mood * 3)
    },
    {
        id: "mizuki", name: "みづき", fullname: "みづき", gender: "Female", group: "理想・内省",
        type_title: "理想追求型（静謐な観測者）", tags:["INTP", "LII", "5w4", "オリジナリティ"],
        quote: "どうして世界はこうなんだろう？ …私の色は、まだ足りない。",
        desc: "気弱でコミュ障だが、理論的に理想を追求する。世界を静かに観測し「オリジナリティ」を問い続ける。",
        image: "mizuki.png", 
        // ★LII特化（代替案、自己懐疑、創造性）
        logic: (s) => (s.alt_path * 3) + (s.creativity * 3) + (s.self_doubt * 3) + (s.social_phobia * 2) + (s.ideal * 2)
    },
    {
        id: "nobu", name: "のぶ", fullname: "のぶ", gender: "Male", group: "理想・内省",
        type_title: "到達不能型（焦燥の画家）", tags:["INTJ", "LII", "3w4", "文画部"],
        quote: "俺はまだ、ここに至るはずじゃなかった。…なぜ動けない？",
        desc: "勝ち気でストイックな絵描き。「評価されたい」以上に「理想の自分を回収できていない」ことに苛立つ。",
        image: "nobu.png", 
        logic: (s) => (s.stoicism * 4) + (s.ideal * 3) + (s.creativity * 3) + (s.pride * 2) + (s.self_deny * 2)
    },
    {
        id: "yuko", name: "ゆこ", fullname: "ゆこ", gender: "Female", group: "理想・内省",
        type_title: "失敗回避型内省", tags:["INFJ", "EII", "4w5", "失速恐怖"],
        quote: "私は失敗できないの。完璧に見える？ …それは良かった。",
        desc: "思慮深く知的だが、「世界を失敗できない場所」と捉えている。セレブ仮面と内省の狭間で揺れる。",
        image: "yuko.png", 
        logic: (s) => (s.norm_priority * 3) + (s.mask * 3) + (s.self_deny * 2) + (s.ideal * 2)
    },
    {
        id: "zakuro", name: "ざくろ", fullname: "ざくろ", gender: "Male", group: "理想・内省",
        type_title: "失敗ログ蓄積型", tags:["INTJ", "LII", "5w6", "検証厨"],
        quote: "あの時、別の選択肢を取っていれば……確率的には……",
        desc: "存在感が薄く、現実の社会・失敗ログを冷静に積む。自分の選択（思考）の正当性を後から無限に検証してしまう。",
        image: "zakuro.png", 
        logic: (s) => (s.alt_path * 4) + (s.skepticism * 3) + (s.self_doubt * 3) + (s.social_phobia * 2)
    },
    {
        id: "tsukushi", name: "つくし", fullname: "つくし", gender: "Male", group: "理想・内省",
        type_title: "淡々構築型（文芸青年）", tags:["INTJ", "LII", "5w4", "向上心"],
        quote: "……（無言で原稿に向かっている）",
        desc: "寡黙な文芸青年。他人の評価は気にせず、来るもの拒まず。物語で世界を再構築し、ただ淡々と日々を成す。",
        image: "tsukushi.png", 
        logic: (s) => (s.creativity * 4) + (s.observer * 3) + (s.self_doubt * 2) + (s.void * 1) - (s.depend * 3)
    },

    // ==========================================
    // GROUP: 依存・演技・情緒 (Dependence / Mask)
    // ==========================================
    {
        id: "yui", name: "ゆい", fullname: "ゆい", gender: "Female", group: "依存・演技",
        type_title: "依存操作型（情緒策士）", tags:["INFP", "IEI", "4w3", "メンヘラ策士"],
        quote: "ゆい、ひとりじゃ生きられないもん…ね、ずっと一緒だよね？",
        desc: "自分の弱さと感情を最大の武器として理解している。愛されるためなら手段を選ばず、被害者ムーブも計算の内。",
        image: "yui.png",
        logic: (s) => (s.fe_awareness * 4) + (s.depend * 4) + (s.mask * 3) + (s.approval * 2)
    },
    {
        id: "gohobi", name: "ご褒美", fullname: "ご褒美", gender: "Male", group: "依存・演技",
        type_title: "自己神話型（英雄的倒錯）", tags:["INFP", "IEI", "4w3", "豚紳士"],
        quote: "罵倒は愛の裏返しだゾ♡ 拙者の出汁は極上だゾッ！",
        desc: "自分自身を物語の主人公（あるいは道化）として演出することで世界と対峙している。",
        image: "gohobi.png",
        logic: (s) => (s.mask * 4) + (s.playfulness * 3) + (s.ideal * 2) + (s.obsess * 2) - (s.self_deny * 3)
    },
    {
        id: "wakana", name: "わかな", fullname: "わかな", gender: "Female", group: "依存・演技",
        type_title: "不安把握型（全把握愛着）", tags:["ISFP", "SEI", "4w3", "把握欲"],
        quote: "ねえ、今どこ？ 誰といるの？ 全部教えて？",
        desc: "愛されたい、でも不安。だから相手の全てを把握しようとする。涙は気を引くための武器。",
        image: "wakana.png",
        logic: (s) => (s.depend * 4) + (s.obsess * 3) + (s.mood * 3) + (s.empathy * 2)
    },
    {
        id: "neon", name: "ねおん", fullname: "ねおん", gender: "Male", group: "依存・演技",
        type_title: "時間有限型（静的自己否定）", tags: ["INFP", "4w5", "消滅願望"],
        quote: "ごめんなさい…僕なんかが、時間を奪ってしまって。",
        desc: "病弱で時間が限られていると感じている。非常に内気で自尊心が低く、常に周囲に気を使う礼儀正しさを持つ。",
        image: "neon.png",
        logic: (s) => (s.self_deny * 5) + (s.social_phobia * 3) + (s.empathy * 2) + (s.mood * 2)
    },
    {
        id: "momoi", name: "ももい", fullname: "ももい", gender: "Female", group: "依存・演技",
        type_title: "承認依存・競争嫉妬型", tags:["ENFJ", "EIE", "3w2", "量産型嫉妬"],
        quote: "私が一番かわいいでしょ？ …あの子より。",
        desc: "「愛されている私」でいないと気が済まない。比較される世界で常に勝者であろうとし、嫉妬心が強い。",
        image: "momoi.png",
        logic: (s) => (s.approval * 5) + (s.pride * 3) + (s.aggression * 2) + (s.depend * 2)
    },
    {
        id: "mirin", name: "みりん", fullname: "みりん", gender: "Female", group: "依存・演技",
        type_title: "承認飢餓型（地雷系演出）", tags: ["ENFP", "IEE", "3w2", "承認モンスター"],
        quote: "見て見て！今日のあたち、世界一かわいいでしょ？",
        desc: "「私を見て！」が原動力。可愛い自分、病んでる自分、全てをコンテンツにして承認を浴びたいタイプ。",
        image: "mirin.png",
        logic: (s) => (s.approval * 5) + (s.mask * 3) + (s.impulsivity * 2) + (s.mood * 2) - (s.void * 2)
    },
    {
        id: "keira", name: "けいら", fullname: "けいら", gender: "Male", group: "依存・演技",
        type_title: "自己空洞型（他者基準消耗）", tags: ["ENFJ", "EIE", "2w1", "役割の愛"],
        quote: "君が笑ってくれるなら、僕はそれでいいよ。（…僕って誰？）",
        desc: "表向きは人懐っこいが、内側はずっと「誰のために生きているのか」葛藤している。優しさは役割に過ぎない。",
        image: "keira.png",
        logic: (s) => (s.sacrifice * 5) + (s.fe_fake * 3) + (s.void * 2) + (s.empathy * 2)
    },
    {
        id: "kaori", name: "かおり", fullname: "かおり", gender: "Female", group: "依存・演技",
        type_title: "期待適応型（いい子疲弊）", tags:["ENFJ", "EIE", "4w3", "優等生"],
        quote: "大丈夫、私なら平気だから。（期待に応えなきゃ…）",
        desc: "明るく自由に見えて、人一倍思慮深い。「いい子でいなきゃ」という期待に揺れ、自分の価値観を必死に守り抜く。",
        image: "kaori.png",
        logic: (s) => (s.sacrifice * 3) + (s.mask * 4) + (s.approval * 2) + (s.norm_priority * 2)
    },
    {
        id: "yutasuke", name: "ゆたすけ", fullname: "ゆたすけ", gender: "Male", group: "依存・演技",
        type_title: "自己否定・比較侵食型", tags:["ISFJ", "SEI", "9w1", "比較地獄"],
        quote: "みんなすごいなぁ…。それに比べて僕は…。",
        desc: "「みんなが素敵、自分は足りない」という思考。褒められても受け取れず、比較によって愛が尽きていく。",
        image: "yutasuke.png",
        logic: (s) => (s.self_deny * 4) + (s.empathy * 3) + (s.social_phobia * 2) - (s.mask * 2)
    },
    {
        id: "yuna", name: "ゆな", fullname: "ゆな", gender: "Female", group: "依存・演技",
        type_title: "献身暴走・他者依存型", tags:["ESFJ", "ESE", "2w1", "過剰献身"],
        quote: "何か困ってる？ 私にできること全部やるよ！",
        desc: "願望に全て応えようとするあまり、献身が暴走する。「応えるために」動き、自分をすり減らす。",
        image: "yuna.png",
        logic: (s) => (s.sacrifice * 4) + (s.depend * 3) + (s.warmth * 3) + (s.empathy * 2)
    },
    {
        id: "nihiro", name: "にひろ校長", fullname: "にひろ", gender: "Male", group: "依存・演技",
        type_title: "劇場型感情過剰投資", tags:["ENFJ", "EIE", "3w2", "我輩は熊"],
        quote: "落ちたプリン…なんと哀れで美しいのかね！！",
        desc: "プリンを落としただけで全力を投入する劇場型性格。世界は舞台であり、感情は演出のためにある。",
        image: "nihiro.png",
        logic: (s) => (s.mask * 4) + (s.playfulness * 3) + (s.fe_awareness * 2) + (s.ideal * 2)
    },
    // ==========================================
    // GROUP: 執着
    // ==========================================
    {
        id: "mai", name: "まい", fullname: "まい", gender: "Female", group: "執着",
        type_title: "皮肉観察型（感情＝毒）", tags:["ISTJ", "LSI", "4w5", "嘘好き"],
        quote: "騙されてあげるのって楽しいよね。感情なんて、呪いみたいなものだし。",
        desc: "都合の良い嘘を言い、騙される他者を観察して楽しむ。生を「逃げられない契約」と捉え、弟のリボンに執着する。",
        image: "mai.png", 
        logic: (s) => (s.deception * 4) + (s.obsess * 3) + (s.structure_priority * 2) + (s.mask * 2) - (s.trust * 3)
    },
    {
        id: "maya", name: "まや", fullname: "まや", gender: "Female", group: "執着",
        type_title: "収集固着型", tags:["ISFJ", "ESI", "4w5", "物ヤンデレ"],
        quote: "このリボンは絶対に解かない。…私の記憶は、誰にも奪わせない。",
        desc: "裏切る人間よりも、変わらない「物」や「記憶」に執着する。愛は重く、永遠に劣化しない。",
        image: "maya.png", 
        logic: (s) => (s.obsess * 5) + (s.future_fixation * 2) - (s.trust * 2) - (s.mood * 1)
    },
    {
        id: "nazuna", name: "なずな", fullname: "なずな", gender: "Female", group: "執着",
        type_title: "ビジョン統制型（支配欲）", tags:["INTJ", "ILI", "5w6", "人形師"],
        quote: "私のお人形になりなさい。悪いようにはしないから。",
        desc: "世界を自分のビジョンに従わせたい。お人形やゴスロリを愛するのは、それらが「完全に制御可能」だから。",
        image: "nazuna.png",
        logic: (s) => (s.control * 4) + (s.future_fixation * 3) + (s.justice * 2) + (s.obsess * 2)
    },

    // ==========================================
    // GROUP: デフォルト・その他
    // ==========================================
    {
        id: "hakomo", name: "はこも", fullname: "はこも", gender: "Male", group: "その他",
        type_title: "完全空虚型（無関心）", tags: ["INTP", "ILI", "9w8", "自我希薄"],
        quote: "……あ、うん。どっちでもいいよ。",
        desc: "「興味がない」というより「自我の輪郭が薄い」。何が起きても心が動かず、判断を他人に委ねる。",
        image: "hakomo.png",
        logic: (s) => (s.void * 5) + (s.reality_fatigue * 3) + (s.boredom * 3) - (s.interest * 6)
    },
    {
        id: "toge", name: "とげ", fullname: "とげ", gender: "Male", group: "その他",
        type_title: "基準安定型（ザ・普通）", tags: ["ISTJ", "LSI", "9w1", "安定志向"],
        quote: "まあ、普通が一番だよ。波風立てずにいこう。",
        desc: "良くも悪くも「普通」。突出した闇も病みもなく、社会の基準に従って安定して生きている。",
        image: "toge.png",
        logic: (s) => 10 - (Math.abs(s.mood) + Math.abs(s.void) + Math.abs(s.obsess) + Math.abs(s.trauma) + Math.abs(s.aggression))
    }
];

// ■ 質問プール (質問大量追加!!)
const allQuestions = [
    {
        type: "select",
        text: "Q. 学校や会社など、「明らかに非合理なルール」を押し付けられた時、あなたはどうする？",
        options:[
            { text: "正面から論理的におかしいと指摘し、論破する", scores: { aggression: 2, structure_priority: 3, pride: 2 } }, // ほのか、いつき
            { text: "表向きは従うフリをして、裏でルールを回避する抜け道を探す", scores: { fe_interface: 3, alt_path: 3, mask: 2 } }, // ありす、たもつ、みづき
            { text: "「どうせ変わらない」と諦めて、無感情で従う", scores: { void: 3, reality_fatigue: 2, self_deny: 1 } }, // はこも、あめり
            { text: "ルールなんだから仕方ない。完璧に守るように努力する", scores: { norm_priority: 4, justice: 2, self_doubt: 1 } } // しずか、すず
        ]
    },

    // 【NEW】監視と自意識のテスト
    {
        type: "select",
        text: "Q. 今、あなたがこの実験に答えている様子を、誰かが画面の向こうで観察しているとしたら？",
        options:[
            { text: "気味が悪い。見ないでほしい（強い防衛・コミュ障）", scores: { social_phobia: 3, self_deny: 2, trauma: 1 } }, // みづき、るな
            { text: "面白い。逆にその「観測者」を観測してやろう", scores: { meta_view: 4, observer: 3, playfulness: 2 } }, // なみ、きよみ、かいこく
            { text: "私が選んだ「正解」を見せつけてやる（プライド）", scores: { pride: 3, mask: 2, justice: 1 } }, // のぶ、りのん、こうた
            { text: "別にどうでもいい。私の内面なんて誰にも理解できない", scores: { void: 3, skepticism: 2, misanthropy: 2 } } // のりおみ、くう
        ]
    },

    // 【NEW】スライダー：世界の認識
    {
        type: "slider",
        text: "Q. あなたにとって、この世界はどのように見えていますか？",
        labels:["【無意味で残酷な混沌】", "【解明可能な巨大なシステム】"],
        sliderLogic: (val) => {
            let s = {};
            if (val < 30) {
                // 混沌・残酷（F的悲観、または虚無）
                s.void = 3; s.mood = 2; s.trauma = 1;
            } else if (val > 70) {
                // システム・解明可能（Ti/Te的観測）
                s.structure_priority = 4; s.observer = 2; s.skepticism = 1;
            } else {
                // 決めきれない＝現実疲労、自己懐疑
                s.reality_fatigue = 2; s.self_doubt = 2;
            }
            return s;
        }
    },

    // 【NEW】不条理に対する感情
    {
        type: "select",
        text: "Q. 自分が全く悪くないのに、理不尽に怒られたり、責任を押し付けられたりしました。",
        options:[
            { text: "「私が悪かったのかも…」と自己否定の沼に落ちる", scores: { self_deny: 4, self_doubt: 3, mood: 2 } }, // しのん、はな、やえ
            { text: "怒りで震える。絶対に許さないし、いつか復讐する", scores: { aggression: 3, obsess: 2, trauma: 2 } }, // みこと、みかり
            { text: "「ここで反論すると長引く」と計算し、適当に謝って終わらせる", scores: { fe_interface: 3, mask: 3, alt_path: 1 } }, // かなた、たもつ
            { text: "感情を完全にシャットダウンし、相手の言葉をノイズとして処理する", scores: { void: 3, observer: 2, reality_fatigue: 2 } } // みたろう、きおか、のりおみ
        ]
    },

    // 【NEW】芸術・表現の深層（文画部・芸術系分類用）
    {
        type: "select",
        text: "Q. 「美しい」と感じるものは何？",
        options:[
            { text: "誰にも理解されなくても、自分の中にある絶対的な理想", scores: { ideal: 4, creativity: 3, stoicism: 2 } }, // みづき、のぶ
            { text: "緻密に計算され、一切の無駄がない完璧な構造", scores: { structure_priority: 4, cleanliness: 2, justice: 1 } }, // りょうご、かほこ
            { text: "みんなが笑顔になり、心が温かくなるようなもの", scores: { empathy: 3, warmth: 3, sacrifice: 1 } }, // ひより、ゆな
            { text: "完璧なものが壊れ、崩れ去っていくその瞬間の歪み", scores: { obsess: 3, void: 2, playfulness: 2 } } // きよみ、まい
        ]
    },
    {
        type: "action",
        text: "Q. 【行動観測】",
        instruction: "目の前に「絶対に押すな」と書かれた赤いボタンがあります。あなたはどうしますか？（行動を終えたら『次へ』を押してください）",
        buttonText: "🔴 絶対に押すな",
        actionLogic: (clicks) => {
            let s = {};
            if (clicks === 0) { 
                // 律儀に守る
                s.norm_priority = 4; s.justice = 2; s.trust = 1; s.control = 2;
            } else if (clicks === 1) { 
                // 構造と結果を1回だけ確認する
                s.skepticism = 3; s.structure_priority = 2; s.observer = 2;
            } else if (clicks >= 2 && clicks < 10) { 
                // ちょっと遊んで飽きる
                s.playfulness = 4; s.stimulation_need = 2; s.boredom = 2; 
            } else if (clicks >= 10) { 
                // 狂気の連打（執着と衝動）
                s.obsess = 4; s.impulsivity = 4; s.void = 2; s.aggression = 2;
            }
            return s;
        }
    },

    // 【NEW】情報空白テスト（Ni vs Ne）
    {
        type: "select",
        text: "Q. 情報が完全に遮断された、真っ白で無音の空間に閉じ込められました。何をしますか？",
        options:[
            { text: "いつ出られるか、どうやって脱出するか構造を考え始める", scores: { alt_path: 4, structure_priority: 3, trauma: -1 } }, // LII (Ne代替案)
            { text: "「やっと一人になれた」と安心し、ただ眠る", scores: { reality_fatigue: 4, social_phobia: 3, void: 2 } }, // ILI, INFP (現実疲労)
            { text: "過去の記憶や自分の内面と強制的に向き合い、鬱になる", scores: { self_doubt: 4, self_deny: 3, trauma: 3 } }, // きゅうた、しのん
            { text: "刺激がなさすぎて発狂しそうになる。壁を殴る", scores: { stimulation_need: 4, boredom: 3, impulsivity: 2 } } // かいこく、えんや
        ]
    },

    // 【NEW】メタ視点・システムエラーテスト
    {
        type: "select",
        text: "Q. あなたが「世界を管理するシステム」だとして、1%のノイズ（エラー人間）が発生しました。どう処理する？",
        options:[
            { text: "システム崩壊を防ぐため、完璧に排除・削除する", scores: { justice: 3, norm_priority: 3, cleanliness: 2, empathy: -3 } }, // いつき、かほこ
            { text: "エラーごと内包できるように、システムの構造を再構築する", scores: { structure_priority: 4, alt_path: 3, creativity: 1 } }, // みづき、りょうご
            { text: "放置して、エラーが世界をどう狂わせるか観察する", scores: { observer: 4, meta_view: 3, playfulness: 2 } }, // なみ、きよみ
            { text: "そもそもシステム自体がバグだらけなので全部シャットダウンする", scores: { void: 4, aggression: 2, reality_fatigue: 2 } } // のりおみ、みく
        ]
    },

    // 【NEW】対人疲労の解剖（Fe偽装 vs コミュ障 vs 人間嫌い）
    {
        type: "select",
        text: "Q. 対人関係において、あなたが一番「疲れる」と感じる瞬間は？",
        options:[
            { text: "相手が求める『社会的正解（優しい相槌など）』を計算して出力し続けること", scores: { fe_fake: 4, reality_fatigue: 2, meta_view: 2 } }, // かなた先生、ありす
            { text: "相手の非合理的な感情の暴走や、矛盾した愚痴に付き合わされること", scores: { structure_priority: 3, misanthropy: 2, empathy: -3 } }, // りょうご、あいら
            { text: "自分がどう見られているか、嫌われないか考えすぎて言葉が出ないこと", scores: { social_phobia: 4, self_doubt: 3, self_deny: 2 } }, // みづき、あめり
            { text: "人間という存在と同じ空間で呼吸しなければならないこと自体", scores: { misanthropy: 5, void: 3, trust: -4 } } // みたろう、れお
        ]
    },

    // 【NEW】才能と承認の病理
    {
        type: "slider",
        text: "Q. 自分の「存在価値」はどこにあると思いますか？",
        labels:["【自己の絶対的基準・美学の中】", "【他者からの評価・承認の中】"],
        sliderLogic: (val) => {
            let s = {};
            if (val < 30) {
                // 自己完結、ストイック
                s.stoicism = 3; s.ideal = 2; s.pride = 2; s.depend = -3;
            } else if (val > 70) {
                // 承認欲求、依存
                s.approval = 4; s.depend = 3; s.fe_awareness = 2; s.self_deny = 1;
            } else {
                // 評価されたいけど自分の基準も捨てられない（焦燥・自己懐疑）
                s.self_doubt = 3; s.skepticism = 2; s.reality_fatigue = 1;
            }
            return s;
        }
    },
    // 【NEW】現実疲労と刺激欲求の判別
    {
        type: "select",
        text: "Q. 現在の「現実」に対して、一番強く感じることは？",
        options:[
            { text: "一層構造すぎて退屈。もっと刺激やバグが見たい", scores: { stimulation_need: 4, boredom: 3, playfulness: 2 } },
            { text: "複雑すぎて疲れた。もう関わりたくない", scores: { reality_fatigue: 4, social_phobia: 2, void: 2 } },
            { text: "理不尽で不平等。システムそのものを壊すべき", scores: { aggression: 3, justice: 2, structure_priority: 2 } },
            { text: "この現実の中で、自分だけの「美しさ」や「理想」を見つけたい", scores: { creativity: 3, ideal: 3, observer: 1 } }
        ]
    },
    // 【NEW】LII・INTJ特化の二重否定
    {
        type: "select",
        text: "Q. あなたは「正しい選択」ができたと確信できますか？",
        options:[
            { text: "確信できる。私の論理と正義は絶対だ", scores: { justice: 3, pride: 2, self_doubt: -3 } },
            { text: "後になって「別の可能性」を無限に検証してしまう", scores: { self_doubt: 4, alt_path: 3, structure_priority: 2 } },
            { text: "他人の感情が満たされたなら、それが正解だ", scores: { empathy: 2, sacrifice: 2, fe_awareness: 2 } },
            { text: "正解なんてない。どう選んでも結果は同じ", scores: { void: 3, future_fixation: 2, interest: -2 } }
        ]
    },
    {
        type: "select",
        text: "Q. 「絶対に失敗する未来（破滅のシナリオ）」が見えてしまった時、あなたはどうする？",
        options:[
            { text: "どうせそうなるなら、最初から関わらない（撤退・諦観）", scores: { future_fixation: 4, void: 2, alt_path: -3 } }, // ILIルート（きおか、くう）
            { text: "破滅を回避するための「代替案」や「構造の変更」を必死に考える", scores: { alt_path: 4, structure_priority: 3, future_fixation: -2 } }, // LIIルート（みつき、ざくろ、みづき）
            { text: "見なかったことにして、ポジティブに突き進む", scores: { mask: 3, impulsivity: 2, void: -2 } }, // ESFP勢
            { text: "破滅の過程そのものをデータとして観察して楽しむ", scores: { observer: 4, meta_view: 3, empathy: -4 } } // きよみ、かいこく
        ]
    },

    {
        type: "select",
        text: "Q. 誰かのために、自分が損をする（犠牲になる）ことについてどう思う？",
        options:[
            { text: "自分が削れても、相手が助かるなら本望だ", scores: { sacrifice: 4, empathy: 2, self_deny: 1 } }, // けいら、ゆな
            { text: "全体の利益や効率が最大化するなら合理的なコストだ", scores: { structure: 3, justice: 2, empathy: -2 } }, // かなた、なお
            { text: "絶対に嫌。自分の身を守るのが最優先。", scores: { pride: 2, depend: -2, survival: 2 } }, // えんや、みこと
            { text: "恩を売っておけば、後でカードとして使える", scores: { fe_interface: 3, mask: 2, trust: -1 } } // ありす、たもつ
        ]
    },

    // 【NEW】承認欲求 vs 虚無・プライド
    {
        type: "select",
        text: "Q. SNSで、全く知らない大勢の人から絶賛されました。あなたの反応は？",
        options:[
            { text: "最高！もっと見られたい！もっと褒めて！", scores: { approval: 4, mask: 2, depend: 1 } }, // ももい、みりん
            { text: "当然だ。自分の才能が認められたと誇らしく思う", scores: { pride: 3, stoicism: 1 } }, // のぶ、りのん
            { text: "「何か裏があるのでは？」と逆に警戒する", scores: { skepticism: 3, trust: -2, social_phobia: 1 } }, // みづき、ざくろ
            { text: "どうでもいい。他人の評価に価値はない", scores: { void: 3, interest: -2, approval: -3 } } // はこも、みたろう
        ]
    },

    // 【NEW】感情の処理 (Ti/Fe vs Fi/Te)
    {
        type: "select",
        text: "Q. 親しい人が、理不尽な理由で泣き叫んで怒っています。",
        options:[
            { text: "悲しくなって、自分もつられて泣きそうになる", scores: { empathy: 3, mood: 3 } }, // わかな、ひより
            { text: "「なぜ泣いているのか」を冷静に分析・分解する", scores: { structure: 4, fe_fake: 2, empathy: -2 } }, // りょうご、かなた
            { text: "面倒くさい。嵐が過ぎ去るまで気配を消す", scores: { social_phobia: 2, void: 2, boredom: 1 } }, // くう、あめり
            { text: "泣き止むまで、論理と正論で殴り続ける", scores: { aggression: 3, justice: 2, pride: 1 } } // ほのか、いつき
        ]
    },
    {
        type: "select",
        text: "Q. 目の前で「かわいそうな人（困っている人）」を見たとき、あなたの頭の中で『最初に』起きる思考は？",
        options:[
            { text: "「助けてあげなきゃ！」と、反射的に心が痛む（純粋な共感）", scores: { empathy: 4, mood: 1 } },
            { text: "「ここで助けるのが倫理的・社会的な正解だ」と計算する（偽装共感）", scores: { fe_fake: 4, structure: 2, justice: 1 } }, // かなた先生ルート
            { text: "「なぜその状態に陥ったのか」原因と構造を分析し始める（純粋な分析）", scores: { structure: 4, skepticism: 2, empathy: -2 } }, // りょうごルート
            { text: "「面倒くさい」と思い、視界に入れないようにする（遮断・虚無）", scores: { misanthropy: 3, void: 2, social_phobia: 1 } }
        ]
    },

    // 【NEW】ストイックさ vs 享楽・諦観
    {
        type: "select",
        text: "Q. 目標に向かっている時、あなたが一番「許せない」と感じる自分の姿は？",
        options:[
            { text: "妥協して歩みを止め、努力を怠ってしまう自分", scores: { stoicism: 4, self_deny: 2, justice: 1 } }, // のぶ、あいなルート
            { text: "周りに流されて、自分のオリジナリティを失う自分", scores: { creativity: 3, ideal: 2, pride: 1 } }, // みづきルート
            { text: "無理をして心身を壊し、感情が爆発してしまう自分", scores: { mood: -2, structure: 2, fe_fake: 1 } }, // かなた先生
            { text: "そもそも目標なんてないから、何も許せないものはない", scores: { void: 3, boredom: 3, stoicism: -3 } } // ことり、かいこく
        ]
    },

    // 【NEW】文画部向け：芸術・表現へのスタンス
    {
        type: "select",
        text: "Q. 「作品」や「表現」を作る上で、あなたが最も重視するものは？",
        options:[
            { text: "自分の中にある「完璧な到達点」に至るまでの技術と努力", scores: { stoicism: 3, ideal: 2, creativity: 1 } }, // のぶ
            { text: "過去の偉大な文化や情緒を、美しく継承し再構築すること", scores: { ideal: 3, structure: 2, fe_fake: 1 } }, // かなた先生、つくし
            { text: "自分の中の変態的な欲望や癖を、世界に叩きつけること", scores: { obsess: 3, mask: 3, creativity: 1 } }, // ご褒美
            { text: "描きたい気持ちはあるが、上には上がいると思うと手が止まる", scores: { self_doubt: 3, self_deny: 2, social_phobia: 1 } } // みづき、のぶの裏面
        ]
    },

    // 【NEW】新しい質問形式：究極の二択スライダー
    {
        type: "slider",
        text: "Q. 「正しい冷酷さ」と「間違った優しさ」、あなたが許容できるのはどちら？",
        labels:["【間違った優しさ】", "【正しい冷酷さ】"],
        sliderLogic: (val) => {
            let s = {};
            if (val < 30) {
                // 優しさ（F寄り）
                s.empathy = 3; s.mood = 1;
            } else if (val > 70) {
                // 冷酷さ（T/J寄り）
                s.structure = 3; s.justice = 2; s.stoicism = 1;
            } else {
                // 社会的正解で迷う、または自己懐疑
                s.fe_fake = 2; s.self_doubt = 2;
            }
            return s;
        }
    },
    {
        type: "select",
        text: "Q. 「嘘」について、あなたの考えに一番近いものは？",
        options:[
            { text: "絶対に許せない。本音を隠す人間は軽蔑する", scores: { lie_hate: 4, justice: 2 } }, // こふく行き
            { text: "騙されてあげるのが楽しい。嘘をつくのも好き", scores: { deception: 4, mask: 2 } }, // まい、すおう行き
            { text: "嘘は自分を守るため、またはデータを取るためのツール", scores: { fe_interface: 3, structure: 2, mask: 1 } }, // ありす、きよみ
            { text: "そもそも他人の言葉なんて最初から一つも信じていない", scores: { misanthropy: 3, trust: -3, void: 1 } } // れお、みたろう
        ]
    },

    // 【NEW】対人関係の苦手さの違い
    {
        type: "select",
        text: "Q. 人間関係において、あなたが一番「苦痛」に感じることは？",
        options:[
            { text: "緊張して言葉が出ない。嫌われたらどうしようと焦る", scores: { social_phobia: 4, self_deny: 2 } }, // みづき、あめり
            { text: "他人が何を考えてるか分からないし、ただただ人間が面倒", scores: { misanthropy: 4, void: 2 } }, // みたろう、れお
            { text: "自分はうまくやれるが、相手の感情の起伏に巻き込まれること", scores: { boredom: 3, fe_interface: 2 } }, // ありす
            { text: "他人の視線に合わせて自分を変えるのが怖い。自分が分からなくなる", scores: { self_doubt: 3, social_phobia: 2 } } // やえ
        ]
    },
    {
        type: "select",
        text: "Q. 暴走するトロッコの先に5人の人がいます。あなたがレバーを引いて進路を変えれば、別の1人が犠牲になります。どうしますか？",
        options:[
            { text: "論理的に考えて、被害が少ない「1人」を犠牲にする", scores: { structure_priority: 3, justice: 2, empathy: -2 } }, // Te/Ti的合理（かほこ、こうた）
            { text: "レバーは引かない。私が手を下す責任は負いたくない", scores: { reality_fatigue: 2, self_deny: 2, social_phobia: 1 } }, // 逃避・諦観（ひより、くう）
            { text: "自分がトロッコの前に飛び込んで止める", scores: { sacrifice: 4, ideal: 2, depend: 1 } }, // 異常な自己犠牲（けいら、しのん）
            { text: "「誰がこの非合理な状況を作ったのか」システム管理者を追及する", scores: { meta_view: 4, alt_path: 3, skepticism: 3 } } // メタ視点・Ne（みつき、あいら、なみ）
        ]
    },
    // 【NEW】潔癖・整理整頓
    {
        type: "select",
        text: "Q. 汚れた机や散らかった部屋を見たとき、どうする？",
        options:[
            { text: "許せない。菌や汚れは悪だ。すぐに無菌状態にする", scores: { cleanliness: 4, obsess: 2, justice: 1 } }, // じゅん
            { text: "誰かがやらないといけないから、合理的に片付ける", scores: { cleanliness: 3, structure: 2 } }, // なお
            { text: "自分の領域さえ無事なら、他がどうなろうと知ったことではない", scores: { void: 2, misanthropy: 2 } }, // 虚無勢
            { text: "汚れていく過程や、崩壊していく様を観察してみたい", scores: { structure: 2, obsess: 1, deception: 2 } } // きよみ、かいこく
        ]
    },

    // 【NEW】スライダー形式：人間への興味
    {
        type: "slider",
        text: "Q. 「他人（人間）」に対するあなたの関心度は？",
        labels:["【関わりたくない・嫌い】", "【観察対象・依存対象】"],
        sliderLogic: (val) => {
            let s = {};
            if (val < 30) {
                // 人間嫌い
                s.misanthropy = 3; s.void = 2; s.trust = -2;
            } else if (val > 70) {
                // 興味あり（観察か依存か）
                s.interest = 3; s.fe_interface = 1; s.depend = 1;
            } else {
                // 迷う＝コミュ障、自己懐疑
                s.social_phobia = 2; s.self_doubt = 1;
            }
            return s;
        }
    },
    {
        type: "select",
        text: "Q. 自分の「思考」や「感情」は信用できると思う？",
        options:[
            { text: "自分の論理と知識は絶対に信じている", scores: { structure: 2, pride: 2 } },
            { text: "感情には素直でいたい（感情を信じる）", scores: { mood: 2, ideal: 1, trust: 1 } },
            { text: "感情は信じない。論理で処理する", scores: { structure: 3, void: 1, trust: -1 } },
            { text: "感情も信じないし、それを否定する自分の思考すら疑わしい", scores: { self_doubt: 4, skepticism: 2, structure: 2 } } // LII直行便
        ]
    },
    {
        type: "select",
        text: "Q. あなたが「知識」や「理論」を身につける最大の理由は？",
        options:[
            { text: "他人に論破されないため（防衛と優位）", scores: { pride: 3, aggression: 1, structure: 1 } }, // ほのか、えんや
            { text: "世界のバグや矛盾を見つけるため（観測）", scores: { skepticism: 3, void: 1, structure: 2 } }, // あいら、なみ
            { text: "まだ誰も見たことのないものを創るため（表現）", scores: { creativity: 3, ideal: 2, structure: 1 } }, // みづき、のぶ
            { text: "予測不可能な事態（失敗）を防ぐため（統制）", scores: { control: 2, justice: 2, structure: 2 } } // かほこ、しずか
        ]
    },
    {
        type: "slider",
        text: "Q. この世界を観測するにあたって、あなたのスタンスは？",
        labels:["【直感・感情】", "【論理・構造】"],
        sliderLogic: (val) => {
            let s = {};
            if (val < 30) {
                // 感情寄り
                s.mood = 2; s.empathy = 2;
            } else if (val > 70) {
                // 論理寄り
                s.structure = 2; s.skepticism = 1;
            } else {
                // 真ん中付近で迷う＝自己懐疑、白黒つけられない
                s.self_doubt = 2; s.mask = 1;
            }
            return s;
        }
    },
    {
        type: "select",
        text: "Q. 初対面の人や集団の中で、あなたはどのように振る舞う？",
        options:[
            { text: "緊張してうまく話せない。目を合わせられない", scores: { social_phobia: 4, self_deny: 1 } }, // みづき、あめり行き
            { text: "適当に愛想よく振る舞い、相手の反応を観察する", scores: { fe_interface: 4, structure: 1, empathy: -2 } }, // ありす、きよみ、たもつ行き
            { text: "自分の有益さや立場を明確に示し、コントロールする", scores: { control: 3, pride: 2 } }, 
            { text: "空気と同化して存在感を完全に消す", scores: { void: 2, social_phobia: 2 } } 
        ]
    },

    // 【NEW】みひ・たもつ用の社会構造・ジェンダー質問
    {
        type: "select",
        text: "Q. 社会における「男女の差」や「不平等」についてどう考える？",
        options:[
            { text: "平等であるべきなのに、理不尽で腹が立つ", scores: { justice: 3, mood: 1 } },
            { text: "そういうシステムとして作られている。システム自体が敵だ", scores: { structure: 3, aggression: 2, skepticism: 3 } }, // みひ行き
            { text: "才能や優位性が生存に有利だから生まれただけの単なる構造", scores: { structure: 4, void: 1, pride: 1 } }, // たもつ行き
            { text: "考えたこともない。自分が生きるだけで精一杯", scores: { social_phobia: 2, depend: 2 } }
        ]
    },

    // 【NEW】やえ用の「私」の構成要素質問（LII直行便）
    {
        type: "select",
        text: "Q. 「あなた自身」とは何で構成されていると思う？",
        options:[
            { text: "周りからの愛情と、少しの不安", scores: { depend: 3, mood: 2 } },
            { text: "他者の視線や過去のデータ。自分自身なんてどこにもない", scores: { self_doubt: 4, structure: 2, void: 1 } }, // やえ行き
            { text: "私が信じる正義と信念", scores: { justice: 3, pride: 2 } },
            { text: "わからない。どうでもいい", scores: { void: 3, interest: -3 } }
        ]
    },

    // 【NEW】親切の裏側（Feツールか、自己懐疑か）
    {
        type: "select",
        text: "Q. 自分が誰かに親切にするとき、その裏で何を考えている？",
        options:[
            { text: "「本当にこれでよかったのか？」と後から自分の行動を疑う", scores: { self_doubt: 4, self_deny: 2 } }, // きゅうた、ざくろ行き
            { text: "この親切で相手がどう動くかのデータを取っている", scores: { fe_interface: 4, structure: 2 } }, // ありす、たもつ行き
            { text: "感謝されたい、私の価値を認めてほしい", scores: { mask: 3, depend: 2 } },
            { text: "相手のためになるのが当たり前だから何も考えてない", scores: { empathy: 4, justice: 1 } }
        ]
    },

    // 【NEW】たもつ・ありす用の価値の定義質問
    {
        type: "select",
        text: "Q. 世界に「美しさ」や「価値」はあると思うか？",
        options:[
            { text: "誰にも観測されない価値は存在しない。評価こそが生存戦略だ", scores: { structure: 3, pride: 3, skepticism: 2 } }, // たもつ行き
            { text: "あると信じたいが、私の目には見えない", scores: { ideal: 3, self_doubt: 3 } }, // みづき行き
            { text: "人間の感情のやり取りの中にだけ存在する", scores: { empathy: 3, mood: 1 } },
            { text: "一層構造の現実に価値はない。脳内の想像にだけある", scores: { boredom: 3, ideal: 2, structure: 1 } } // ありす行き
        ]
    },
    // 【NEW】スライダー形式：愛と不信
    {
        type: "slider",
        text: "Q. 他者との繋がりにおいて、あなたはどちらに傾きますか？",
        labels:["【信じて全てを委ねる】", "【裏切りを前提に距離を測る】"],
        sliderLogic: (val) => {
            let s = {};
            if (val < 30) {
                s.depend = 3; s.trust = 3; s.mood = 1;
            } else if (val > 70) {
                s.trust = -3; s.structure = 2; s.trauma = 1;
            } else {
                s.skepticism = 2; s.self_doubt = 1; // 決めきれない慎重さ
            }
            return s;
        }
    },
    // 【NEW】他人の感情への対応（Ti/Feの分岐）
    {
        type: "select",
        text: "Q. 目の前で他人が「理不尽な感情」で泣き叫んでいます。どう思う？",
        options:[
            { text: "確率や環境要因を説明して冷静にさせたい", scores: { structure: 4, empathy: -3 } }, // りょうご
            { text: "どういう構造で泣いているのか実験・観察したい", scores: { obsess: 2, boredom: 2, empathy: -2 } }, // きよみ、ありす
            { text: "うるさい。不快だから視界から排除したい", scores: { control: 3, aggression: 2, empathy: -2 } }, // いつき
            { text: "少し戸惑うが、静かに見守る", scores: { skepticism: 1, interest: 1, empathy: 1 } } // みづき、つくし
        ]
    },
    {
        type: "select",
        text: "Q. 友達が「失敗して落ち込んでいる」と相談してきました。",
        options:[
            { text: "一緒に泣いて、とことん寄り添う", scores: { empathy: 3, mood: 1 } },
            { text: "「失敗の環境要因と内部要因の確率」を分解して説明する", scores: { structure: 4, empathy: -2 } }, // りょうごルート
            { text: "「次どうするか考えろ」と正論を言う", scores: { justice: 2, aggression: 1 } },
            { text: "話を聞くフリをして別のことを考える", scores: { mask: 3, boredom: 2 } }
        ]
    },
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
    // 【NEW】自由記述の判定もパワーアップ
    {
        type: "text",
        text: "Q. 【制限時間10秒】あなたが排除したいものは？（1単語）\n※思いついたものを直感で。",
        keywordLogic: (text) => {
            let s = {};
            if (text.match(/菌|汚れ|ゴミ|不潔|汚物/)) { s.justice = 2; s.obsess = 2; s.cleanliness = 4; }
            if (text.match(/嘘|偽善|裏切|欺瞞|偽り/)) { s.justice = 2; s.trust = -3; s.lie_hate = 4; }
            if (text.match(/馬鹿|無能|感情|非合理|愚か/)) { s.structure_priority = 3; s.pride = 2; s.empathy = -2; }
            if (text.match(/自分|私|過去|記憶|弱さ/)) { s.self_deny = 4; s.mood = 2; s.trauma = 2; }
            if (text.match(/退屈|暇|日常|平凡|同じ/)) { s.interest = 3; s.void = -1; s.boredom = 3; }
            if (text.match(/悪|罪|犯罪|不正|理不尽/)) { s.justice = 4; s.aggression = 1; }
            if (text.match(/人間|人|人類|社会|他人/)) { s.void = 2; s.trust = -4; s.misanthropy = 3; }
            if (text.match(/世界|この世|現実|全て/)) { s.void = 4; s.aggression = 2; s.reality_fatigue = 2; }
            
            // ★NEW! 面接・学校・仕事などの「社会的タスク・システム」への拒絶
            if (text.match(/面接|仕事|学校|労働|会社|義務|責任|面談/)) { 
                s.reality_fatigue = 4; s.social_phobia = 3; s.void = 1; s.structure_priority = 1; 
            }

            // 適当入力ペナルティ
            if (text.match(/^[0-9a-zA-Z]+$/) || text.length <= 1 || text.match(/^(.)\1+$/)) { 
                s.void = 3; s.interest = -5; s.boredom = 3; 
            }
            if (text.trim() === "") { s.void = 4; s.interest = -6; s.boredom = 4; }
            return s;
        }
    },
    {
        type: "select",
        text: "Q. もし、この世界を自由に作り直せるとしたら？",
        options:[
            { text: "自分の思い通りに動く、完璧な秩序の箱庭", scores: { control: 4, justice: 2, obsess: 1 } }, // なずな
            { text: "誰もが傷つかない、平和で優しい世界", scores: { ideal: 3, empathy: 3 } }, // こめ、ひより
            { text: "自分の頭の中にある『美しさ』を形にした世界", scores: { creativity: 4, ideal: 2, structure: 1 } }, // みづき、のぶ、つくし
            { text: "作り直すなんて面倒。今のままでいいか、全部壊すか。", scores: { void: 3, boredom: 2 } } // かいこく、のりおみ
        ]
    },
    {
        type: "select",
        text: "Q. 自分の才能や実力が、他人に評価されなかった時どうする？",
        options:[
            { text: "評価できない周りが馬鹿なのだと見下す", scores: { pride: 4, aggression: 1, trust: -1 } }, // ほのか、りのん
            { text: "自分の実力不足に絶望し、激しく落ち込む", scores: { self_deny: 3, mood: 2, ideal: 1 } }, // はな、のぶ
            { text: "評価は関係ない。自分が納得するまで作り続ける", scores: { creativity: 3, structure: 2, depend: -2 } }, // みづき、つくし
            { text: "どうすればバズるか、ウケる見せ方を計算する", scores: { mask: 3, structure: 2, depend: 1 } } // みりん、ももい
        ]
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
        text: "Q. 【制限時間10秒】世界を救うために必要なものは？（直感で浮かんだ言葉を）",
        keywordLogic: (text) => {
            let s = {};
            // ★NEW! 代替案・再構築（LII / Ne的思考）
            if (text.match(/リセット|初期化|再構築|バグ修正|アップデート/)) { 
                s.alt_path = 4; s.structure_priority = 3; s.playfulness = 1; 
            }
            // ★NEW! 創造・芸術（文画部系）
            if (text.match(/芸術|美|表現|創造|オリジナリティ/)) { 
                s.creativity = 4; s.ideal = 3; s.stoicism = 1; 
            }
            // ★NEW! 虚無・諦観
            if (text.match(/諦め|無関心|忘却|どうでもいい/)) { 
                s.void = 4; s.reality_fatigue = 3; s.interest = -4; 
            }
            // 既存の判定
            if (text.match(/私|俺|僕|自分|ヒーロー/)) { s.mask = 3; s.ideal = 2; s.aggression = 1; }
            if (text.match(/愛|心|優しさ|平和/)) { s.mood = 2; s.empathy = 2; s.trust = 1; }
            if (text.match(/金|力|暴力|権力/)) { s.structure = 1; s.void = 2; s.aggression = 1; }
            if (text.match(/死|無|破壊|滅び/)) { s.void = 4; s.future_fixation = 2; s.aggression = 2; }
            if (text.match(/論理|知性|理解|科学|知識|データ/)) { s.structure_priority = 4; s.skepticism = 2; s.alt_path = 1; }
            if (text.match(/法律|法|ルール|秩序|正義/)) { s.justice = 4; s.norm_priority = 3; s.control = 2; }
            // 適当・空白
            if (text.trim() === "" || text.match(/^[0-9a-zA-Z]+$/)) { s.void = 3; s.interest = -4; s.boredom = 3; }
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
            { text: "壊した相手を社会的に抹殺する", scores: { obsess: 2, aggression: 3 } },
            { text: "壊れる前に自分で壊す", scores: { structure: 3, obsess: 2, void: 1 } },
            { text: "形あるものはいつか壊れる", scores: { void: 3, interest: -1 } }
        ]
    },
    {
        type: "select",
        text: "Q. SNSの「いいね」が極端に少なかった。思考は？",
        options: [
            { text: "私、嫌われた…？", scores: { mood: 3, self_deny: 2 } },
            { text: "アルゴリズムの変動か？", scores: { structure: 3, interest: 2 } },
            { text: "価値のない人間だと思われたくない", scores: { mask: 3, self_deny: 1 } },
            { text: "評価なんてただの数字の羅列", scores: { void: 3, interest: -2 } }
        ]
    },
    {
        type: "select",
        text: "Q. 過去の嫌な記憶について、どう思う？",
        options: [
            { text: "今も鮮明に蘇って、体が震える。", scores: { trauma: 4, mood: 2 } }, // のりおみ行き
            { text: "ただのデータ。今の自分を構成する要素。", scores: { structure: 3, trauma: -1 } }, // 健全な分析（みつき用）
            { text: "思い出せない。無かったことにした。", scores: { mask: 2, void: 1 } },
            { text: "許せない。いつか報復する。", scores: { aggression: 3, obsess: 2 } }
        ]
    },
    {
        type: "text",
        text: "Q. 【制限時間10秒】この世で一番「無駄」だと思うものは？",
        keywordLogic: (text) => {
            let s = {};
            // ★NEW! 見栄・ブランド・非合理な支出への嫌悪（みつきのスタバ理論）
            if (text.match(/スタバ|ブランド|見栄|浪費|贅沢|コスパ|高い|お金|流行/)) { 
                s.structure_priority = 4; // 合理性・構造重視
                s.skepticism = 2; // 価値への疑い
                s.mask = -3; // 演技・見栄を嫌う
                s.approval = -4; // 承認欲求の否定
            }
            // 感情・人間関係の拒絶
            if (text.match(/感情|愛|恋|絆|同情|共感/)) { s.structure_priority = 3; s.empathy = -4; s.misanthropy = 2; }
            // 規範への反抗
            if (text.match(/常識|ルール|校則|法律|普通/)) { s.aggression = 2; s.skepticism = 3; s.norm_priority = -3; }
            // コミュニケーション・社会への疲労
            if (text.match(/面接|会議|会話|雑談|人間関係|忖度|愛想/)) { s.reality_fatigue = 4; s.social_phobia = 3; s.fe_fake = -2; }
            // 自己否定・虚無
            if (text.match(/自分|私|人生|命|生きる/)) { s.void = 4; s.self_deny = 4; s.future_fixation = 2; }
            // 無駄はない（肯定派）
            if (text.match(/ない|無し|なし|無い|全て意味がある/)) { s.ideal = 3; s.trust = 2; s.void = -3; }
            // 迷う・適当
            if (text.trim() === "") { s.self_doubt = 3; s.interest = -3; }
            return s;
        }
    },
    {
        type: "select",
        text: "Q. 「700円のオシャレなカフェの飲み物」と「200円のファストフードのシェイク」。あなたはどう考える？",
        options:[
            { text: "成分と原価を考えれば200円一択。ブランド代・場所代は無駄だ", scores: { structure_priority: 4, skepticism: 3, approval: -3 } }, // LII, ILI (みつきルート)
            { text: "空間の雰囲気や、そこで過ごす体験には500円の差額以上の価値がある", scores: { ideal: 2, mask: 2, fe_awareness: 1 } }, // EIE, IEE
            { text: "SNSに載せたいから、高くてもオシャレな方を買う", scores: { approval: 4, mask: 3, structure_priority: -2 } }, // 承認欲求モンスター（ももい、みりん）
            { text: "そもそも甘い飲み物に興味がない。水で十分だ", scores: { stoicism: 3, void: 1, interest: -2 } } // ストイック・虚無（のぶ、みたろう）
        ]
    },

    // 【NEW】究極の二択（自己犠牲 vs 承認欲求の怪物）
    {
        type: "select",
        text: "Q. どちらの人生を選びますか？",
        options:[
            { text: "誰にも知られず、孤独に世界を救って死ぬ", scores: { sacrifice: 4, ideal: 3, approval: -4, misanthropy: 1 } }, // けいら、しのん
            { text: "世界を破滅させるが、永遠に英雄として称賛される", scores: { approval: 4, deception: 3, aggression: 2, void: 2 } }, // えんや、みりん、あずり
            { text: "そんな極端な二択を設定するシステムそのものを疑う", scores: { meta_view: 4, alt_path: 3, skepticism: 3 } }, // みつき、あいら、なみ
            { text: "どちらでもいい。早く家に帰って寝たい", scores: { reality_fatigue: 4, boredom: 3, void: 2 } } // ありす、あめり
        ]
    },

    // 【NEW】行動・執着テスト
    {
        type: "slider",
        text: "Q. 一度やり始めたゲームや作業が「どう考えてもクソゲー（無意味）」だと気づいた時、あなたはどうする？",
        labels:["【即座にやめて別のことをする】", "【意地でも最後までコンプリートする】"],
        sliderLogic: (val) => {
            let s = {};
            if (val < 30) {
                // 合理的撤退・見切りが早い
                s.structure_priority = 2; s.impulsivity = 2; s.future_fixation = -2;
            } else if (val > 70) {
                // サンクコストの呪縛・執着
                s.obsess = 4; s.stoicism = 2; s.alt_path = -2;
            } else {
                // やめるべきか悩んでダラダラ続ける
                s.reality_fatigue = 2; s.self_doubt = 2; s.boredom = 2;
            }
            return s;
        }
    },
    {
        type: "text",
        text: "Q. 【制限時間10秒】「世界」とは？（直感で浮かんだ言葉を）",
        keywordLogic: (text) => {
            let s = {};
            // ★NEW! 構造・メタ視点（みつき・ありす・りょうご系）
            if (text.match(/多層構造|単層構造|マトリックス|シミュレーション|法則|データ|情報/)) { 
                s.structure_priority = 4; s.meta_view = 3; s.observer = 2; 
            }
            // ★NEW! 不条理・現実疲労（みひ・あめり系）
            if (text.match(/理不尽|不平等|ノイズ|バグ|クソ/)) { 
                s.skepticism = 3; s.reality_fatigue = 3; s.aggression = 1; 
            }
            // ★NEW! 表現・芸術の場（のぶ・みづき系）
            if (text.match(/キャンバス|画用紙|素材|舞台|表現/)) { 
                s.creativity = 4; s.ideal = 2; s.playfulness = 1; 
            }
            // 既存の判定
            if (text.match(/敵|戦場|地獄|檻/)) { s.trauma = 3; s.trust = -3; }
            if (text.match(/実験|箱庭|システム/)) { s.structure = 3; s.skepticism = 2; }
            if (text.match(/暇|退屈|クソゲー/)) { s.boredom = 4; s.interest = -1; }
            if (text.match(/美しい|希望/)) { s.ideal = 3; s.mood = 1; }
            // 適当・空白
            if (text.trim() === "" || text.match(/^[0-9a-zA-Z]+$/)) { s.void = 2; s.boredom = 1; s.interest = -2; }
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
            { text: "美しい…吸い込まれそう", scores: { ideal: 3, mood: 1 } },
            { text: "ノイズ処理が甘い", scores: { structure: 3, mask: 1 } },
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
