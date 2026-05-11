import React, { useState, } from 'react';
import { Play, RotateCcw, Check, Star } from 'lucide-react';

// === 教員＆SEからのコメント ===
// 先生、ここにカードのデータを追加していくことができます。
// id: 通し番号, icon: イラスト(絵文字), text: 提示する文（分かち書き推奨）
const CARD_DATABASE = [
  // 動物・生き物
  { id: 1, icon: '🐦', text: 'とりが　なく' },
  { id: 2, icon: '🐶', text: 'いぬが　はしる' },
  { id: 3, icon: '🐱', text: 'ねこが　ねむる' },
  { id: 4, icon: '🐰', text: 'しろい　うさぎ' },
  { id: 5, icon: '🐘', text: 'おおきい　ぞう' },
  { id: 6, icon: '🦁', text: 'つよい　ライオン' },
  { id: 7, icon: '🦒', text: 'くびが　ながい' },
  { id: 8, icon: '🐵', text: 'さるが　あそぶ' },
  { id: 9, icon: '🐻', text: 'くまが　あるく' },
  { id: 10, icon: '🐼', text: 'かわいい　パンダ' },
  { id: 11, icon: '🐭', text: 'ちいさい　ねずみ' },
  { id: 12, icon: '🐷', text: 'ぶたが　たべる' },
  { id: 13, icon: '🐸', text: 'かえるが　とぶ' },
  { id: 14, icon: '🐟', text: 'さかなが　およぐ' },
  { id: 15, icon: '🐢', text: 'かめが　あるく' },
  { id: 16, icon: '🐍', text: 'ながい　へび' },
  { id: 17, icon: '🦋', text: 'きれいな　ちょう' },
  { id: 18, icon: '🐞', text: 'あかい　てんとうむし' },
  { id: 19, icon: '🐜', text: 'ありが　はたらく' },
  { id: 20, icon: '🐝', text: 'はちが　とぶ' },
  // 食べ物・飲み物
  { id: 21, icon: '🍎', text: 'あかい　りんご' },
  { id: 22, icon: '🍌', text: 'きいろい　バナナ' },
  { id: 23, icon: '🍇', text: 'あまい　ぶどう' },
  { id: 24, icon: '🍊', text: 'まるい　みかん' },
  { id: 25, icon: '🍓', text: 'あかい　いちご' },
  { id: 26, icon: '🍉', text: 'おおきい　すいか' },
  { id: 27, icon: '🍑', text: 'ももを　たべる' },
  { id: 28, icon: '🍙', text: 'おにぎりを　たべる' },
  { id: 29, icon: '🍞', text: 'パンを　やく' },
  { id: 30, icon: '🍜', text: 'ラーメンを　たべる' },
  { id: 31, icon: '🍣', text: 'すしを　たべる' },
  { id: 32, icon: '🍰', text: 'あまい　ケーキ' },
  { id: 33, icon: '🍦', text: 'つめたい　アイス' },
  { id: 34, icon: '🍬', text: 'あめを　なめる' },
  { id: 35, icon: '🍫', text: 'あまい　チョコ' },
  { id: 36, icon: '🥛', text: 'ぎゅうにゅうを　のむ' },
  { id: 37, icon: '☕', text: 'あたたかい　おちゃ' },
  { id: 38, icon: '🧃', text: 'ジュースを　のむ' },
  { id: 39, icon: '🍅', text: 'あかい　トマト' },
  { id: 40, icon: '🥕', text: 'ながい　にんじん' },
  // 乗り物
  { id: 41, icon: '🚗', text: 'くるまが　はしる' },
  { id: 42, icon: '🚌', text: 'バスに　のる' },
  { id: 43, icon: '🚓', text: 'パトカーが　はしる' },
  { id: 44, icon: '🚑', text: 'きゅうきゅうしゃが　くる' },
  { id: 45, icon: '🚒', text: 'しょうぼうしゃが　はしる' },
  { id: 46, icon: '🚕', text: 'タクシーに　のる' },
  { id: 47, icon: '🚚', text: 'トラックが　はこぶ' },
  { id: 48, icon: '🚜', text: 'トラクターが　うごく' },
  { id: 49, icon: '🚲', text: 'じてんしゃを　こぐ' },
  { id: 50, icon: '🛵', text: 'バイクが　はしる' },
  { id: 51, icon: '🚃', text: 'でんしゃが　くる' },
  { id: 52, icon: '🚄', text: 'はやい　しんかんせん' },
  { id: 53, icon: '✈️', text: 'ひこうきが　とぶ' },
  { id: 54, icon: '🚁', text: 'ヘリコプターが　とぶ' },
  { id: 55, icon: '🚢', text: 'ふねが　すすむ' },
  { id: 56, icon: '⛵', text: 'ヨットが　うかぶ' },
  { id: 57, icon: '🚀', text: 'ロケットが　とぶ' },
  { id: 58, icon: '🛸', text: 'ＵＦＯが　くる' },
  { id: 59, icon: '🚏', text: 'バスを　まつ' },
  { id: 60, icon: '🚉', text: 'えきに　つく' },
  // 街・建物・自然
  { id: 61, icon: '📮', text: 'あかい　ポスト' },
  { id: 62, icon: '🏠', text: 'わたしの　いえ' },
  { id: 63, icon: '🏫', text: 'がっこうへ　いく' },
  { id: 64, icon: '🏥', text: 'びょういんへ　いく' },
  { id: 65, icon: '🏪', text: 'コンビニで　かう' },
  { id: 66, icon: '🏭', text: 'おおきい　こうじょう' },
  { id: 67, icon: '⛲', text: 'こうえんで　あそぶ' },
  { id: 68, icon: '🚥', text: 'あかい　しんごう' },
  { id: 69, icon: '🌸', text: 'はなが　さく' },
  { id: 70, icon: '🌻', text: 'きいろい　ひまわり' },
  { id: 71, icon: '🌳', text: 'みどりの　き' },
  { id: 72, icon: '🍂', text: 'はっぱが　おちる' },
  { id: 73, icon: '🍄', text: 'きのこを　みつける' },
  { id: 74, icon: '⛰️', text: 'たかい　やま' },
  { id: 75, icon: '🌊', text: 'あおい　うみ' },
  { id: 76, icon: '☀️', text: 'あかるい　たいよう' },
  { id: 77, icon: '🌙', text: 'きいろい　つき' },
  { id: 78, icon: '⭐', text: 'ほしが　ひかる' },
  { id: 79, icon: '☁️', text: 'しろい　くも' },
  { id: 80, icon: '☔', text: 'あめが　ふる' },
  // 身の回りのもの
  { id: 81, icon: '👕', text: 'ふくを　きる' },
  { id: 82, icon: '👖', text: 'ズボンを　はく' },
  { id: 83, icon: '👗', text: 'かわいい　ドレス' },
  { id: 84, icon: '👟', text: 'くつを　はく' },
  { id: 85, icon: '🧦', text: 'くつしたを　はく' },
  { id: 86, icon: '🧢', text: 'ぼうしを　かぶる' },
  { id: 87, icon: '🎒', text: 'ランドセルを　せおう' },
  { id: 88, icon: '🎒', text: 'あかい　ランドセル' },
  { id: 89, icon: '🌂', text: 'かさを　さす' },
  { id: 90, icon: '👓', text: 'めがねを　かける' },
  { id: 91, icon: '⌚', text: 'とけいを　みる' },
  { id: 92, icon: '📱', text: 'でんわを　かける' },
  { id: 93, icon: '💻', text: 'パソコンを　つかう' },
  { id: 94, icon: '📺', text: 'テレビを　みる' },
  { id: 95, icon: '📷', text: 'しゃしんを　とる' },
  { id: 96, icon: '📖', text: 'ほんを　よむ' },
  { id: 97, icon: '✏️', text: 'えんぴつで　かく' },
  { id: 98, icon: '✂️', text: 'はさみで　きる' },
  { id: 99, icon: '🗑️', text: 'ごみを　すてる' },
  { id: 100, icon: '🛏️', text: 'ベッドで　ねる' },
  // アクション・その他
  { id: 101, icon: '🏃', text: 'はやく　はしる' },
  { id: 102, icon: '🚶', text: 'ゆっくり　あるく' },
  { id: 103, icon: '💃', text: 'たのしく　おどる' },
  { id: 104, icon: '🎤', text: 'うたを　うたう' },
  { id: 105, icon: '🎨', text: 'えを　かく' },
  { id: 106, icon: '⚽', text: 'ボールを　ける' },
  { id: 107, icon: '⚾', text: 'ボールを　なげる' },
  { id: 108, icon: '🎾', text: 'テニスを　する' },
  { id: 109, icon: '🏀', text: 'バスケを　する' },
  { id: 110, icon: '🏊', text: 'プールで　およぐ' },
  { id: 111, icon: '🛁', text: 'おふろに　はいる' },
  { id: 112, icon: '🧼', text: 'てを　あらう' },
  { id: 113, icon: '🪥', text: 'はを　みがく' },
  { id: 114, icon: '🚽', text: 'トイレに　いく' },
  { id: 115, icon: '🧹', text: 'ほうきで　はく' },
  { id: 116, icon: '🎁', text: 'プレゼントを　もらう' },
  { id: 117, icon: '🎈', text: 'あかい　ふうせん' },
  { id: 118, icon: '🎀', text: 'かわいい　リボン' },
  { id: 119, icon: '🔥', text: 'あつい　ひ' },
  { id: 120, icon: '❄️', text: 'つめたい　ゆき' },
];

const QUESTIONS_PER_PLAY = 20;

export default function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result'
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrectAnimation, setIsCorrectAnimation] = useState(false);

  // ゲームスタート処理：全カードからランダムに20枚抽出
  const startGame = () => {
    const shuffled = [...CARD_DATABASE].sort(() => 0.5 - Math.random());
    setCurrentDeck(shuffled.slice(0, QUESTIONS_PER_PLAY));
    setCurrentIndex(0);
    setGameState('playing');
  };

  // 次のカードへ進む処理
  const handleNext = () => {
    // 視覚的なフィードバック（正解のアニメーション）を表示
    setIsCorrectAnimation(true);
    
    setTimeout(() => {
      setIsCorrectAnimation(false);
      if (currentIndex + 1 < QUESTIONS_PER_PLAY) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setGameState('result');
      }
    }, 600); // 0.6秒後に次のカードへ
  };

  // --- 画面：スタート画面 ---
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 select-none">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border-4 border-sky-200">
          <div className="text-7xl mb-6 flex justify-center space-x-4">
            <span>🐦</span>
            <span>🍎</span>
            <span>🚗</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wider leading-tight">
            ことばカード<br/>アプリ
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            えを みて、ことばを よんでみよう！<br/>
            ぜんぶで {QUESTIONS_PER_PLAY}もん あるよ。
          </p>
          <button
            onClick={startGame}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-2xl font-bold text-white transition-all duration-200 bg-sky-500 rounded-full hover:bg-sky-600 hover:scale-105 active:scale-95 shadow-lg w-full max-w-xs"
          >
            <Play className="w-8 h-8 mr-3 fill-current" />
            スタート！
          </button>
        </div>
      </div>
    );
  }

  // --- 画面：結果画面 ---
  if (gameState === 'result') {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4 select-none">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border-4 border-orange-200 animate-fade-in-up">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 leading-tight">
            よく できました！
          </h2>
          <p className="text-2xl text-gray-700 mb-8 font-medium">
            {QUESTIONS_PER_PLAY}もん ぜんぶ よめたね！<br/>
            すごい！すごい！
          </p>
          
          <div className="flex justify-center space-x-2 mb-10">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-12 h-12 text-yellow-400 fill-current animate-bounce" style={{animationDelay: `${i * 0.1}s`}}/>
            ))}
          </div>

          <button
            onClick={startGame}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-2xl font-bold text-white transition-all duration-200 bg-orange-500 rounded-full hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-lg w-full max-w-xs"
          >
            <RotateCcw className="w-8 h-8 mr-3" />
            もう１かい
          </button>
        </div>
      </div>
    );
  }

  // --- 画面：プレイ画面（フラッシュカード） ---
  const currentCard = currentDeck[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 select-none">
      
      {/* 進捗バー */}
      <div className="w-full max-w-2xl mb-4 sm:mb-8 flex flex-col items-center">
        <div className="text-2xl sm:text-3xl font-bold text-gray-600 mb-3 bg-white px-6 py-2 rounded-full shadow-sm">
          {currentIndex + 1} / {QUESTIONS_PER_PLAY} もんめ
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 sm:h-6 overflow-hidden shadow-inner">
          <div 
            className="bg-green-400 h-4 sm:h-6 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex) / QUESTIONS_PER_PLAY) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* カード本体 */}
      <div className="relative w-full max-w-2xl">
        <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-200 transition-transform duration-300 ${isCorrectAnimation ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
          
          {/* イラストエリア */}
          <div className="aspect-video sm:aspect-[4/3] bg-sky-50 flex items-center justify-center border-b-4 border-gray-100 p-8">
            <span className="text-[120px] sm:text-[180px] drop-shadow-xl hover:scale-110 transition-transform duration-300 cursor-default">
              {currentCard.icon}
            </span>
          </div>

          {/* テキストエリア */}
          <div className="p-8 sm:p-12 flex items-center justify-center bg-white min-h-[160px] sm:min-h-[200px]">
            <p className="text-5xl sm:text-7xl font-black text-gray-800 tracking-widest leading-relaxed text-center break-keep">
              {currentCard.text}
            </p>
          </div>
        </div>

        {/* 正解時のマル表示（オーバーレイ） */}
        {isCorrectAnimation && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-red-500 text-[200px] sm:text-[300px] opacity-80 animate-ping">
              ⭕
            </div>
          </div>
        )}
      </div>

      {/* 操作ボタン */}
      <div className="mt-8 sm:mt-12 w-full max-w-2xl px-4">
        <button
          onClick={handleNext}
          disabled={isCorrectAnimation}
          className="w-full py-6 sm:py-8 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-3xl text-4xl sm:text-5xl font-bold shadow-[0_8px_0_rgb(21,128,61)] active:shadow-[0_0px_0_rgb(21,128,61)] active:translate-y-2 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-12 h-12 sm:w-16 sm:h-16 mr-4 sm:mr-6 stroke-[3]" />
          よめた！
        </button>
      </div>

    </div>
  );
}
