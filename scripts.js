const cards = document.querySelectorAll('.social-media-memory-card');

let hasFlippedSocialMediaCard = false;
let lockBoard = false;
let firstSocialMediaCard, secondSocialMediaCard;

function flipSocialMediaCard() {
  if (lockBoard) return;
  if (this === firstSocialMediaCard) return;

  this.classList.add('flip');

  if (!hasFlippedSocialMediaCard) {
    hasFlippedSocialMediaCard = true;
    firstSocialMediaCard = this;

    return;
  }

  secondSocialMediaCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch;
  
  isMatch = firstSocialMediaCard.dataset.framework === secondSocialMediaCard.dataset.framework;

  isMatch ? disableSocialMediaCards() : unflipSocialMediaCards();
}

function disableSocialMediaCards() {
  firstSocialMediaCard.removeEventListener('click', flipSocialMediaCard);
  secondSocialMediaCard.removeEventListener('click', flipSocialMediaCard);

  resetBoard();
}

function unflipSocialMediaCards() {
  lockBoard = true;

  setTimeout(() => {
    firstSocialMediaCard.classList.remove('flip');
    secondSocialMediaCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedSocialMediaCard, lockBoard] = [false, false];
  [firstSocialMediaCard, secondSocialMediaCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipSocialMediaCard));
