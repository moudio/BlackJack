let blackjackGame = {
  you: {
    scoreSpan: '#your-blackjack-result',
    div: '#your-box',
    score: 0,
  },

  dealer: {
    scoreSpan: '#dealer-blackjack-result',
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
const winSound = new Audio('./static/sounds/cash.mp3');
const lossSound = new Audio('./static/sounds/aww.mp3');
document
  .querySelector('#blackjack-hit-button')
  .addEventListener('click', blackjackhit);
document
  .querySelector('#blackjack-deal-button')
  .addEventListener('click', blackjackdeal);

document
  .querySelector('#blackjack-stand-button')
  .addEventListener('click', dealerLogic);

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
  showResult(computeWinner());
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

function dealerLogic() {
  let card = randomCard();
  showCard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);
}

function computeWinner() {
  let winner;
  if (YOU['score'] <= 21) {
    if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
      winner = YOU;
    } else if (YOU['score'] < DEALER['score']) {
      winner = DEALER;
    } else if (YOU['score'] === DEALER['score']) {
    }
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    winner = DEALER;
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
  }
  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (winner === YOU) {
    message = 'You Won';
    messageColor = 'green';
    winSound.play();
  } else if (winner === DEALER) {
    message = 'You Lost';
    messageColor = 'red';
    lossSound.play();
  } else {
    message = 'You drew';
    messageColor = 'black';
  }
  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}
