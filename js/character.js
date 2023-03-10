'use strict'

{
  const question = document.getElementById('question-C');
  const choices = document.getElementById('choices-C');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: ['悪魔の実を食べている','東の海出身である','海賊である','初出は一巻である'], c: ['ルフィ', 'バルトロメオ', 'サボ', 'ベンサム']},
    {q: ['ゾロが初めから持っていた刀は？'], c: ['和道一文字', 'エース', '鬼哭', 'むら雲切']},
    {q: ['ウソップのいたシロップ村を襲った海賊は？'], c: ['クロ', 'アーロン', 'エネル', 'クロコダイル']},
    {q: ['ローグタウンで出てきた海軍本部大佐は？'], c: ['スモーカー', 'ネズミ', 'モーガン', 'コビー']},
    {q: ['ドラム王国の国王は？'], c: ['ワポル', 'チェス', 'クレハ', 'チョッパー']},
    {q: ['バロックワークス社長で元七武海の人物は？'], c: ['クロコダイル', 'モリア', 'ミホーク', 'ハンコック']},
    {q: ['ゴロゴロの実の能力者は？'], c: ['エネル', '青雉', 'ルッチ', '黒ひげ']},
    {q: ['ウォーターセブンで麦わらの一味に入ったのは？'], c: ['フランキー', 'ロビン', 'ブルック', 'ナミ']},
    {q: ['エースの所属していた海賊団の船長は？'], c: ['白ひげ', 'クリーク', 'バギー', 'キッド']},
    {q: ['海底１万Mにある島は？'], c: ['魚人島', 'ウォーターセブン', 'スカイピア', 'リトルガーデン']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for( let i = arr.length -1; i > 0; i-- ) {
      const j = Math.floor(Math.random() * (i + 1));
    [arr[j],arr[i]] = [arr[i],arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      document.getElementById('correct-audio').currentTime = 0;
      document.getElementById('correct-audio').play();
      li.classList.add('correct');
      score++;
    } else {
      document.getElementById('wrong-audio').currentTime = 0;
      document.getElementById('wrong-audio').play();
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

function setQuiz() {
  isAnswered = false;
  // 処理中
  question.innerHTML = '';

  const quizSetQ = quizSet[currentNum].q;
  quizSetQ.forEach(choice => {
    const li = document.createElement('li');
    li.textContent = choice;
    question.appendChild(li);
    question.classList.add('current');
  });

  for (let i = 0; i < question.childElementCount; i++) {
    question.children[i].style.opacity = "0";
    setTimeout(function(){
      question.children[i].style.opacity = "1";
    }, i * 1000)
  }

  choices.innerHTML = '';

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  shuffledChoices.forEach(choice => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener('click', () => {
      checkAnswer(li);
    });
    choices.appendChild(li);
  });

  btn.textContent = (currentNum === 9) ? '成績' : '次へ';
}


  setQuiz();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');
    question.classList.remove('current');
  
    if (currentNum === 9) {
      scoreLabel.textContent = `成績: ${score} / 10`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}