const words = [
    "no longer human",
    "bandages",
    "suicide",
    "detective",
    "dazai",
    "stray dogs",
    "fyodor",
    "odasaku",
    "chuuya",
    "nikolai",
    "atsushi",
    "kunikida",
    "ranpo",
    "akutagawa",
    "osamu"
  ];
  
  const maxLives = 6;
  let lives = maxLives;
  let guessedLetters = [];
  let selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  
  const wordDisplay = document.getElementById("word-display");
  const letterButtons = document.getElementById("letter-buttons");
  const dazaiStage = document.getElementById("dazai-stage");
  const livesDisplay = document.getElementById("lives-display");

  function updateWordDisplay() {
    wordDisplay.innerHTML = selectedWord
      .split("")
      .map(letter => {
        if (letter === " ") return " ";
        return guessedLetters.includes(letter) ? letter : "_";
      })
      .join(" ");
  }

  function updateLivesDisplay() {
    livesDisplay.textContent = `Lives left: ${lives}`;
  }
  
  
  function createLetterButtons() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    alphabet.split("").forEach(letter => {
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.addEventListener("click", () => guessLetter(letter, btn));
      letterButtons.appendChild(btn);
    });
  }
  
  function guessLetter(letter, btn) {
    if (guessedLetters.includes(letter)) return; 
  
    btn.disabled = true;
    guessedLetters.push(letter);
  
    if (selectedWord.includes(letter)) {
      updateWordDisplay();
      checkWin();
    } else {
      lives--;
      updateLivesDisplay();

      const stage = maxLives - lives;
      dazaiStage.src = `assets/${stage}.png`;
  
      if (lives === 0) {
        showEndScreen(false);
      }
    }
  }
  
  function checkWin() {
    const wordGuessed = selectedWord
      .split("")
      .every(letter => letter === " " || guessedLetters.includes(letter));
  
    if (wordGuessed) {
      showEndScreen(true);
    }
  }
  
  function showEndScreen(won) {
    const popupOverlay = document.getElementById("popup-overlay");
    const popupImg = document.getElementById("popup-img");
    const popupText = document.getElementById("popup-text");
  
    popupOverlay.classList.remove("hidden");
  
    if (won) {
      popupImg.src = "assets/dazaiwin.gif";
      popupText.textContent = '"Whyyy did you winn?!... :<" – Dazai';
    } else {
      popupImg.src = "assets/dazailose.gif";
      popupText.textContent = '"Let\'s gooo... double suicide~ :3" – Dazai';
      wordDisplay.textContent = selectedWord; 
    }
  
    letterButtons.innerHTML = "";
  }
  
  function handleKeyboardInput(event) {
    const key = event.key.toUpperCase(); 
    if (key >= 'A' && key <= 'Z') {
      
      const button = [...letterButtons.children].find(btn => btn.textContent === key);
      if (button) {
        guessLetter(key, button);
      }
    }
  }
  
  updateWordDisplay();
  createLetterButtons();
  updateLivesDisplay();


  document.addEventListener("keydown", handleKeyboardInput);
  