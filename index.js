let blackjackGame = {
  you: {
    scoreSpan: '#your-blackjack-result',
    div: '#your-box',
    score: 0,
  },

  dealer: {
    scoreSPan: '#dealer-blackjack-result',
    div: '#dealer-box',
    score: 0,
  },
  cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
  cardsMap: {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
};
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('./static/sounds/swish.m4a');
document
  .querySelector('#blackjack-hit-button')
  .addEventListener('click', blackjackhit);
document
  .querySelector('#blackjack-deal-button')
  .addEventListener('click', blackjackdeal);

function blackjackhit() {
  let card = randomCard();
  showCard(card, YOU);
  updateScore(card, YOU);
  showScore(YOU);
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `./static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackdeal() {
  let yourImages = document.querySelector('#your-box').querySelectorAll('img');
  let dealerImages = document
    .querySelector('#dealer-box')
    .querySelectorAll('img');

  yourImages.forEach((image) => {
    image.remove();
  });

  dealerImages.forEach((image) => {
    image.remove();
  });

  YOU['score'] = 0;
  DEALER['score'] = 0;
  document.querySelector(YOU['scoreSpan']).textContent = 0;
  document.querySelector(YOU['scoreSpan']).style.color = '#fff';
  document.querySelector(DEALER['scoreSpan']).style.color = '#fff';
  document.querySelector(DEALER['scoreSpan']).textContent = 0;
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
  if (card === 'A') {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent =
      activePlayer.score;
  }
}
