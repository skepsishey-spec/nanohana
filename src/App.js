import React, { useState } from 'react';

const CARD_DATABASE = [
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
  { id: 16, icon: '🍎', text: 'あかい　りんご' },
  { id: 17, icon: '🍌', text: 'きいろい　バナナ' },
  { id: 18, icon: '🚗', text: 'くるまが　はしる' },
  { id: 19, icon: '🚄', text: 'はやい　しんかんせん' },
  { id: 20, icon: '✈️', text: 'ひこうきが　とぶ' },
  { id: 21, icon: '🌸', text: 'はなが　さく' },
  { id: 22, icon: '☀️', text: 'あかるい　たいよう' },
  { id: 23, icon: '🎁', text: 'プレゼントを　もらう' },
  { id: 24, icon: '🍜', text: 'ラーメンを　たべる' },
  { id: 25, icon: '🍣', text: 'すしを　たべる' },
  { id: 26, icon: '🏃', text: 'はやく　はしる' },
  { id: 27, icon: '🎨', text: 'えを　かく' },
  { id: 28, icon: '⚽', text: 'ボールを　ける' },
  { id: 29, icon: '🏊', text: 'プールで　およぐ' },
  { id: 30, icon: '🎤', text: 'うたを　うたう' },
];

const QUESTIONS_PER_PLAY = 20;

const styles = {
  screen: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '16px', userSelect: 'none',
    fontFamily: "'Hiragino Rounded Gothic Pro', 'Rounded Mplus 1c', sans-serif",
  },
  startScreen: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  playScreen: { background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
  resultScreen: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  card: {
    background: 'white', borderRadius: '32px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    width: '100%', maxWidth: '500px',
    overflow: 'hidden',
  },
  emojiArea: {
    background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '40vh', fontSize: '120px',
  },
  textArea: {
    padding: '24px', textAlign: 'center',
    fontSize: '52px', fontWeight: '900',
    color: '#333', letterSpacing: '4px',
    minHeight: '120px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  },
  btn: {
    width: '100%', maxWidth: '500px',
    padding: '24px', fontSize: '40px',
    fontWeight: '900', border: 'none',
    borderRadius: '24px', cursor: 'pointer',
    marginTop: '16px', color: 'white',
    boxShadow: '0 8px 0 rgba(0,0,0,0.2)',
    transition: 'transform 0.1s, box-shadow 0.1s',
  },
  progressBar: {
    width: '100%', maxWidth: '500px',
    background: 'rgba(255,255,255,0.3)',
    borderRadius: '999px', height: '16px',
    marginBottom: '12px', overflow: 'hidden',
  },
};

export default function App() {
  const [gameState, setGameState] = useState('start');
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flash, setFlash] = useState(false);

  const startGame = () => {
    const shuffled = [...CARD_DATABASE].sort(() => 0.5 - Math.random());
    setCurrentDeck(shuffled.slice(0, QUESTIONS_PER_PLAY));
    setCurrentIndex(0);
    setGameState('playing');
  };

  const handleNext = () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      if (currentIndex + 1 < QUESTIONS_PER_PLAY) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setGameState('result');
      }
    }, 500);
  };

  if (gameState === 'start') {
    return (
      <div style={{...styles.screen, ...styles.startScreen}}>
        <div style={{fontSize: '80px', marginBottom: '16px'}}>🐦🍎🚗</div>
        <h1 style={{fontSize: '56px', fontWeight: '900', color: 'white', textAlign: 'center', margin: '0 0 12px', textShadow: '0 4px 12px rgba(0,0,0,0.2)'}}>
          ことばカード
        </h1>
        <p style={{fontSize: '24px', color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: '40px'}}>
          えを みて、ことばを よんでみよう！
        </p>
        <button onClick={startGame} style={{...styles.btn, background: '#FFD700', color: '#333', maxWidth: '380px', fontSize: '44px'}}>
          ▶ スタート！
        </button>
      </div>
    );
  }

  if (gameState === 'result') {
    return (
      <div style={{...styles.screen, ...styles.resultScreen}}>
        <div style={{fontSize: '120px'}}>🎉</div>
        <h2 style={{fontSize: '52px', fontWeight: '900', color: 'white', textAlign: 'center', margin: '16px 0', textShadow: '0 4px 12px rgba(0,0,0,0.2)'}}>
          よく できました！
        </h2>
        <p style={{fontSize: '28px', color: 'rgba(255,255,255,0.95)', textAlign: 'center', marginBottom: '32px'}}>
          ⭐⭐⭐⭐⭐<br/>すごい！ぜんぶ よめたね！
        </p>
        <button onClick={startGame} style={{...styles.btn, background: '#FF6B35', maxWidth: '380px'}}>
          🔄 もう１かい
        </button>
      </div>
    );
  }

  const currentCard = currentDeck[currentIndex];
  const progress = (currentIndex / QUESTIONS_PER_PLAY) * 100;

  return (
    <div style={{...styles.screen, ...styles.playScreen}}>
      <div style={{width: '100%', maxWidth: '500px', marginBottom: '8px', textAlign: 'center'}}>
        <div style={{fontSize: '28px', fontWeight: '900', color: '#555', marginBottom: '8px'}}>
          {currentIndex + 1} / {QUESTIONS_PER_PLAY} もんめ
        </div>
        <div style={styles.progressBar}>
          <div style={{height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #4CAF50, #8BC34A)', borderRadius: '999px', transition: 'width 0.5s'}}/>
        </div>
      </div>

      <div style={{...styles.card, opacity: flash ? 0.3 : 1, transform: flash ? 'scale(0.95)' : 'scale(1)', transition: 'all 0.3s'}}>
        <div style={styles.emojiArea}>
          {currentCard.icon}
        </div>
        <div style={styles.textArea}>
          {currentCard.text}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={flash}
        style={{...styles.btn, background: '#4CAF50', maxWidth: '500px'}}
      >
        ✅ よめた！
      </button>
    </div>
  );
}
