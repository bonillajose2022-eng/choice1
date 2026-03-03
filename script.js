const STORAGE_KEY = "familyMembersKidsV2";

const familyData = [
  { word: "mother", emoji: "👩", sentence: "This is my mother." },
  { word: "father", emoji: "👨", sentence: "This is my father." },
  { word: "mom", emoji: "👩", sentence: "This is my mom." },
  { word: "dad", emoji: "👨", sentence: "This is my dad." },
  { word: "sister", emoji: "👧", sentence: "She is my sister." },
  { word: "brother", emoji: "👦", sentence: "He is my brother." },
  { word: "grandmother", emoji: "👵", sentence: "She is my grandmother." },
  { word: "grandfather", emoji: "👴", sentence: "He is my grandfather." },
  { word: "aunt", emoji: "👩", sentence: "She is my aunt." },
  { word: "uncle", emoji: "👨", sentence: "He is my uncle." },
  { word: "cousin", emoji: "🧒", sentence: "This is my cousin." },
  { word: "baby", emoji: "👶", sentence: "This is the baby." }
];

const activityLabels = {
  learn: "Learn section",
  flashcards: "Flashcards",
  matching: "Matching Game",
  memory: "Memory Game",
  dragdrop: "Drag & Drop Family Tree",
  bingo: "Bingo of Family Members",
  unscramble: "Unscramble the Word",
  guesswho: "Guess Who?",
  balloon: "Balloon Pop",
  sentencebuilder: "Sentence Builder",
  familywheel: "Family Wheel",
  racehouse: "Race to the Family House",
  practice: "Practice section",
  quiz: "Final Quiz"
};

const totalActivities = Object.keys(activityLabels).length;

const defaultState = {
  studentName: "",
  score: 0,
  completed: {
    learn: false,
    flashcards: false,
    matching: false,
    memory: false,
    dragdrop: false,
    bingo: false,
    unscramble: false,
    guesswho: false,
    balloon: false,
    sentencebuilder: false,
    familywheel: false,
    racehouse: false,
    practice: false,
    quiz: false
  }
};

const quizQuestions = [
  { emoji: "👩", question: "Who is she?", options: ["mother", "uncle", "brother"], answer: "mother" },
  { emoji: "👨", question: "Who is he?", options: ["father", "baby", "aunt"], answer: "father" },
  { emoji: "👵", question: "Who is she?", options: ["sister", "grandmother", "cousin"], answer: "grandmother" },
  { emoji: "👴", question: "Who is he?", options: ["grandfather", "dad", "baby"], answer: "grandfather" },
  { emoji: "👧", question: "Who is she?", options: ["sister", "mother", "uncle"], answer: "sister" },
  { emoji: "👦", question: "Who is he?", options: ["brother", "father", "grandfather"], answer: "brother" },
  { emoji: "🧒", question: "Who is this?", options: ["baby", "cousin", "aunt"], answer: "cousin" },
  { emoji: "👶", question: "Who is this?", options: ["baby", "grandmother", "uncle"], answer: "baby" },
  { emoji: "👩", question: "My mother's sister is my...", options: ["aunt", "mom", "cousin"], answer: "aunt" },
  { emoji: "👨", question: "My father's brother is my...", options: ["uncle", "dad", "brother"], answer: "uncle" }
];

const practiceMultipleChoice = {
  image: "👦",
  options: ["This is my brother.", "She is my grandmother.", "This is my aunt."],
  answer: "This is my brother."
};

const fillSentenceData = {
  sentence: "She is my ______.",
  options: ["grandmother", "uncle", "brother"],
  answer: "grandmother"
};

const matchingSet = [
  { word: "mother", emoji: "👩" },
  { word: "father", emoji: "👨" },
  { word: "brother", emoji: "👦" },
  { word: "grandmother", emoji: "👵" }
];

const dragWords = ["grandmother", "grandfather", "mother", "father", "baby"];

const bingoPool = ["mother", "father", "sister", "brother", "grandmother", "grandfather", "aunt", "uncle", "cousin", "baby"];

const unscrambleWords = ["mother", "father", "brother", "grandmother"];

const guessWhoQuestions = [
  { clue: "She is my mother's mother.", options: ["grandmother", "aunt", "sister"], answer: "grandmother" },
  { clue: "He is my father's brother.", options: ["uncle", "brother", "grandfather"], answer: "uncle" },
  { clue: "She is my father's sister.", options: ["mother", "aunt", "cousin"], answer: "aunt" },
  { clue: "He is my mother's son.", options: ["brother", "baby", "grandfather"], answer: "brother" }
];

const sentenceBuilderSet = [
  { prompt: "Build: This is my mother.", words: ["my", "This", "mother.", "is"], answer: "This is my mother." },
  { prompt: "Build: He is my brother.", words: ["my", "He", "brother.", "is"], answer: "He is my brother." },
  { prompt: "Build: She is my aunt.", words: ["my", "She", "aunt.", "is"], answer: "She is my aunt." },
  { prompt: "Build: This is the baby.", words: ["the", "baby.", "This", "is"], answer: "This is the baby." }
];

const familyWheelSet = [
  { emoji: "👶", question: "Who is this?", options: ["baby", "aunt", "uncle"], answer: "baby" },
  { emoji: "👵", question: "Who is she?", options: ["mother", "grandmother", "cousin"], answer: "grandmother" },
  { emoji: "👨", question: "My mother's brother is my...", options: ["uncle", "father", "brother"], answer: "uncle" },
  { emoji: "👧", question: "Who is she?", options: ["sister", "aunt", "mom"], answer: "sister" }
];

const raceQuestions = [
  { question: "She is my father's mother.", options: ["grandmother", "aunt", "sister"], answer: "grandmother" },
  { question: "He is my mother's brother.", options: ["uncle", "brother", "dad"], answer: "uncle" },
  { question: "She is my parents' daughter.", options: ["sister", "grandmother", "cousin"], answer: "sister" },
  { question: "Who is the smallest family member?", options: ["baby", "cousin", "aunt"], answer: "baby" },
  { question: "Who is your aunt’s child?", options: ["cousin", "dad", "grandfather"], answer: "cousin" }
];

let state = loadState();
let flashIndex = 0;
let selectedMatchWord = null;
let selectedMatchImage = null;
let matchingPairs = 0;
let memoryCards = [];
let flippedMemoryCards = [];
let matchedPairs = 0;
let dragCorrect = 0;
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let bingoWords = [];
let bingoTarget = "";
let bingoHits = 0;
let unscrambleSolved = 0;
let guessIndex = 0;
let guessCorrect = 0;
let guessAnswered = false;
let balloonRound = 0;
let balloonCorrect = 0;
let builderIndex = 0;
let builderSolved = 0;
let wheelCurrent = null;
let wheelCorrect = 0;
let wheelAnswered = false;
let raceIndex = 0;
let raceSteps = 0;
let practiceAnsweredCount = 0;

const elements = {
  studentName: document.getElementById("studentName"),
  studentNameDisplay: document.getElementById("studentNameDisplay"),
  scoreDisplay: document.getElementById("scoreDisplay"),
  saveNameBtn: document.getElementById("saveNameBtn"),
  vocabCards: document.getElementById("vocabCards"),
  completeLearnBtn: document.getElementById("completeLearnBtn"),
  flashcard: document.getElementById("flashcard"),
  flashEmoji: document.getElementById("flashEmoji"),
  flashWord: document.getElementById("flashWord"),
  flashSentence: document.getElementById("flashSentence"),
  flashIndex: document.getElementById("flashIndex"),
  flashTotal: document.getElementById("flashTotal"),
  speakFlashBtn: document.getElementById("speakFlashBtn"),
  prevFlashcard: document.getElementById("prevFlashcard"),
  nextFlashcard: document.getElementById("nextFlashcard"),
  completeFlashBtn: document.getElementById("completeFlashBtn"),
  matchingWords: document.getElementById("matchingWords"),
  matchingImages: document.getElementById("matchingImages"),
  matchingStatus: document.getElementById("matchingStatus"),
  resetMatchingBtn: document.getElementById("resetMatchingBtn"),
  memoryBoard: document.getElementById("memoryBoard"),
  memoryStatus: document.getElementById("memoryStatus"),
  resetMemoryBtn: document.getElementById("resetMemoryBtn"),
  dragBank: document.getElementById("dragBank"),
  dragStatus: document.getElementById("dragStatus"),
  resetDragBtn: document.getElementById("resetDragBtn"),
  bingoBoard: document.getElementById("bingoBoard"),
  bingoPrompt: document.getElementById("bingoPrompt"),
  bingoStatus: document.getElementById("bingoStatus"),
  nextBingoBtn: document.getElementById("nextBingoBtn"),
  resetBingoBtn: document.getElementById("resetBingoBtn"),
  unscrambleGame: document.getElementById("unscrambleGame"),
  unscrambleStatus: document.getElementById("unscrambleStatus"),
  resetUnscrambleBtn: document.getElementById("resetUnscrambleBtn"),
  guessPrompt: document.getElementById("guessPrompt"),
  guessOptions: document.getElementById("guessOptions"),
  guessFeedback: document.getElementById("guessFeedback"),
  guessStatus: document.getElementById("guessStatus"),
  resetGuessBtn: document.getElementById("resetGuessBtn"),
  balloonPrompt: document.getElementById("balloonPrompt"),
  balloonArea: document.getElementById("balloonArea"),
  balloonStatus: document.getElementById("balloonStatus"),
  resetBalloonBtn: document.getElementById("resetBalloonBtn"),
  builderTarget: document.getElementById("builderTarget"),
  builderBank: document.getElementById("builderBank"),
  builderAnswer: document.getElementById("builderAnswer"),
  builderFeedback: document.getElementById("builderFeedback"),
  builderStatus: document.getElementById("builderStatus"),
  builderCheckBtn: document.getElementById("builderCheckBtn"),
  builderClearBtn: document.getElementById("builderClearBtn"),
  resetBuilderBtn: document.getElementById("resetBuilderBtn"),
  wheelDisplay: document.getElementById("wheelDisplay"),
  wheelOptions: document.getElementById("wheelOptions"),
  wheelFeedback: document.getElementById("wheelFeedback"),
  wheelStatus: document.getElementById("wheelStatus"),
  spinWheelBtn: document.getElementById("spinWheelBtn"),
  resetWheelBtn: document.getElementById("resetWheelBtn"),
  raceRunner: document.getElementById("raceRunner"),
  raceQuestion: document.getElementById("raceQuestion"),
  raceOptions: document.getElementById("raceOptions"),
  raceFeedback: document.getElementById("raceFeedback"),
  raceStatus: document.getElementById("raceStatus"),
  resetRaceBtn: document.getElementById("resetRaceBtn"),
  practiceChoices: document.getElementById("practiceChoices"),
  fillSentence: document.getElementById("fillSentence"),
  fillOptions: document.getElementById("fillOptions"),
  fillFeedback: document.getElementById("fillFeedback"),
  quizNumber: document.getElementById("quizNumber"),
  quizTotal: document.getElementById("quizTotal"),
  quizScoreMini: document.getElementById("quizScoreMini"),
  quizEmoji: document.getElementById("quizEmoji"),
  quizQuestion: document.getElementById("quizQuestion"),
  quizOptions: document.getElementById("quizOptions"),
  quizFeedback: document.getElementById("quizFeedback"),
  nextQuizBtn: document.getElementById("nextQuizBtn"),
  restartQuizBtn: document.getElementById("restartQuizBtn"),
  progressBar: document.getElementById("progressBar"),
  progressPercent: document.getElementById("progressPercent"),
  motivationText: document.getElementById("motivationText"),
  activityList: document.getElementById("activityList"),
  badgeContainer: document.getElementById("badgeContainer"),
  badgeText: document.getElementById("badgeText"),
  resetProgressBtn: document.getElementById("resetProgressBtn"),
  toast: document.getElementById("toast"),
  menuToggle: document.getElementById("menuToggle"),
  mainNav: document.getElementById("mainNav")
};

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...defaultState, ...saved, completed: { ...defaultState.completed, ...(saved.completed || {}) } } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  setTimeout(() => elements.toast.classList.remove("show"), 2200);
}

function playTone(type = "good") {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const audio = new AudioContextClass();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.connect(gain);
  gain.connect(audio.destination);
  oscillator.type = type === "good" ? "sine" : "triangle";
  oscillator.frequency.value = type === "good" ? 660 : 220;
  gain.gain.value = 0.05;
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.12);
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function updateStudentName() {
  const safeName = state.studentName?.trim() || "Guest";
  elements.studentNameDisplay.textContent = safeName;
  elements.studentName.value = state.studentName || "";
}

function updateScoreUI() {
  elements.scoreDisplay.textContent = state.score;
}

function awardPoints(points) {
  state.score += points;
  saveState();
  updateScoreUI();
}

function markCompleted(key, points = 10) {
  if (!state.completed[key]) {
    state.completed[key] = true;
    awardPoints(points);
    saveState();
    updateProgressUI();
    showToast(`Great job! You completed ${activityLabels[key]}.`);
  } else {
    updateProgressUI();
  }
}

function resetWholeProgress() {
  state = JSON.parse(JSON.stringify(defaultState));
  saveState();
  updateStudentName();
  updateScoreUI();
  updateProgressUI();
  initAllGames();
  renderLearnCards();
  renderFlashcard();
  renderPractice();
  renderQuiz();
  showToast("Progress reset!");
}

function updateProgressUI() {
  const completedKeys = Object.keys(state.completed).filter(key => state.completed[key]);
  const percent = Math.round((completedKeys.length / totalActivities) * 100);

  elements.progressBar.style.width = `${percent}%`;
  elements.progressPercent.textContent = percent;

  elements.activityList.innerHTML = "";
  if (completedKeys.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No activities completed yet.";
    elements.activityList.appendChild(li);
  } else {
    completedKeys.forEach(key => {
      const li = document.createElement("li");
      li.textContent = `✅ ${activityLabels[key]}`;
      elements.activityList.appendChild(li);
    });
  }

  const stars = Math.floor(state.score / 20);
  elements.badgeContainer.innerHTML = "";
  for (let i = 0; i < stars; i++) {
    const badge = document.createElement("div");
    badge.className = "badge-star";
    badge.textContent = "⭐";
    elements.badgeContainer.appendChild(badge);
  }
  elements.badgeText.textContent = stars > 0 ? `You earned ${stars} star${stars > 1 ? "s" : ""}!` : "Keep playing to earn stars!";

  if (percent === 100) {
    elements.motivationText.textContent = "Excellent! You completed all activities!";
  } else if (percent >= 75) {
    elements.motivationText.textContent = "Amazing! You are learning fast!";
  } else if (percent >= 40) {
    elements.motivationText.textContent = "Great job! Keep going!";
  } else {
    elements.motivationText.textContent = "Great start! Let’s learn together.";
  }
}

function renderLearnCards() {
  elements.vocabCards.innerHTML = "";
  familyData.forEach(item => {
    const card = document.createElement("article");
    card.className = "vocab-card";
    card.innerHTML = `
      <div class="vocab-emoji">${item.emoji}</div>
      <h4>${item.word}</h4>
      <p>${item.sentence}</p>
      <button class="small-btn speak-word-btn" data-word="${item.word}">🔊 Listen</button>
    `;
    elements.vocabCards.appendChild(card);
  });

  document.querySelectorAll(".speak-word-btn").forEach(btn => {
    btn.addEventListener("click", () => speak(btn.dataset.word));
  });
}

function renderFlashcard() {
  const item = familyData[flashIndex];
  elements.flashEmoji.textContent = item.emoji;
  elements.flashWord.textContent = item.word;
  elements.flashSentence.textContent = item.sentence;
  elements.flashIndex.textContent = flashIndex + 1;
  elements.flashTotal.textContent = familyData.length;
  elements.flashcard.classList.remove("flipped");
}

function nextFlashcard() {
  flashIndex = (flashIndex + 1) % familyData.length;
  renderFlashcard();
}

function prevFlashcard() {
  flashIndex = (flashIndex - 1 + familyData.length) % familyData.length;
  renderFlashcard();
}

function initMatchingGame() {
  selectedMatchWord = null;
  selectedMatchImage = null;
  matchingPairs = 0;
  elements.matchingStatus.textContent = `0 / ${matchingSet.length} correct`;

  elements.matchingWords.innerHTML = "";
  elements.matchingImages.innerHTML = "";

  shuffle(matchingSet).forEach(item => {
    const wordBtn = document.createElement("button");
    wordBtn.className = "match-item";
    wordBtn.textContent = item.word;
    wordBtn.dataset.word = item.word;
    wordBtn.addEventListener("click", () => handleMatchSelection("word", item.word, wordBtn));
    elements.matchingWords.appendChild(wordBtn);
  });

  shuffle(matchingSet).forEach(item => {
    const imgBtn = document.createElement("button");
    imgBtn.className = "match-item image";
    imgBtn.textContent = item.emoji;
    imgBtn.dataset.word = item.word;
    imgBtn.addEventListener("click", () => handleMatchSelection("image", item.word, imgBtn));
    elements.matchingImages.appendChild(imgBtn);
  });
}

function handleMatchSelection(type, value, element) {
  if (element.classList.contains("correct")) return;

  if (type === "word") {
    document.querySelectorAll("#matchingWords .match-item").forEach(el => el.classList.remove("selected"));
    element.classList.add("selected");
    selectedMatchWord = { value, element };
  } else {
    document.querySelectorAll("#matchingImages .match-item").forEach(el => el.classList.remove("selected"));
    element.classList.add("selected");
    selectedMatchImage = { value, element };
  }

  if (selectedMatchWord && selectedMatchImage) {
    if (selectedMatchWord.value === selectedMatchImage.value) {
      selectedMatchWord.element.classList.add("correct");
      selectedMatchImage.element.classList.add("correct");
      playTone("good");
      matchingPairs++;
      elements.matchingStatus.textContent = `${matchingPairs} / ${matchingSet.length} correct`;
      if (matchingPairs === matchingSet.length) {
        markCompleted("matching", 15);
      }
    } else {
      playTone("bad");
      setTimeout(() => {
        selectedMatchWord?.element.classList.remove("selected");
        selectedMatchImage?.element.classList.remove("selected");
      }, 300);
    }
    selectedMatchWord = null;
    selectedMatchImage = null;
  }
}

function initMemoryGame() {
  const memoryItems = familyData.slice(0, 6).flatMap(item => [
    { type: "emoji", content: item.emoji, match: item.word },
    { type: "word", content: item.word, match: item.word }
  ]);

  memoryCards = shuffle(memoryItems);
  flippedMemoryCards = [];
  matchedPairs = 0;
  elements.memoryStatus.textContent = `Pairs found: 0 / 6`;
  elements.memoryBoard.innerHTML = "";

  memoryCards.forEach((cardData, index) => {
    const card = document.createElement("button");
    card.className = "memory-card";
    card.textContent = "❓";
    card.dataset.index = index;
    card.addEventListener("click", () => flipMemoryCard(index, card));
    elements.memoryBoard.appendChild(card);
  });
}

function flipMemoryCard(index, cardElement) {
  const cardData = memoryCards[index];
  if (
    cardElement.classList.contains("revealed") ||
    cardElement.classList.contains("matched") ||
    flippedMemoryCards.length === 2
  ) return;

  cardElement.classList.add("revealed");
  cardElement.textContent = cardData.content;
  flippedMemoryCards.push({ index, cardElement, cardData });

  if (flippedMemoryCards.length === 2) {
    const [first, second] = flippedMemoryCards;

    if (first.cardData.match === second.cardData.match && first.cardData.type !== second.cardData.type) {
      first.cardElement.classList.add("matched");
      second.cardElement.classList.add("matched");
      matchedPairs++;
      elements.memoryStatus.textContent = `Pairs found: ${matchedPairs} / 6`;
      playTone("good");
      flippedMemoryCards = [];
      if (matchedPairs === 6) {
        markCompleted("memory", 15);
      }
    } else {
      playTone("bad");
      setTimeout(() => {
        first.cardElement.classList.remove("revealed");
        second.cardElement.classList.remove("revealed");
        first.cardElement.textContent = "❓";
        second.cardElement.textContent = "❓";
        flippedMemoryCards = [];
      }, 650);
    }
  }
}

function initDragDropGame() {
  dragCorrect = 0;
  elements.dragStatus.textContent = `0 / ${dragWords.length} correct`;
  elements.dragBank.innerHTML = "";

  document.querySelectorAll(".tree-slot").forEach(slot => {
    slot.classList.remove("filled");
    slot.dataset.filled = "false";
    slot.innerHTML = `
      <span>${slot.querySelector("span") ? slot.querySelector("span").textContent : ""}</span>
      <small>${slot.querySelector("small") ? slot.querySelector("small").textContent : ""}</small>
    `;
  });

  document.querySelectorAll(".tree-slot").forEach(slot => {
    const emoji = slot.getAttribute("data-answer") === "grandmother" ? "👵"
      : slot.getAttribute("data-answer") === "grandfather" ? "👴"
      : slot.getAttribute("data-answer") === "mother" ? "👩"
      : slot.getAttribute("data-answer") === "father" ? "👨"
      : "👶";
    const label = slot.getAttribute("data-answer") === "grandmother" ? "Grandma"
      : slot.getAttribute("data-answer") === "grandfather" ? "Grandpa"
      : slot.getAttribute("data-answer") === "mother" ? "Mom"
      : slot.getAttribute("data-answer") === "father" ? "Dad"
      : "Baby";
    slot.innerHTML = `<span>${emoji}</span><small>${label}</small>`;
  });

  shuffle(dragWords).forEach(word => {
    const chip = document.createElement("div");
    chip.className = "drag-word";
    chip.textContent = word;
    chip.draggable = true;
    chip.dataset.word = word;

    chip.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", word);
    });

    elements.dragBank.appendChild(chip);
  });

  document.querySelectorAll(".tree-slot").forEach(slot => {
    slot.addEventListener("dragover", event => event.preventDefault());
    slot.addEventListener("drop", event => {
      event.preventDefault();
      if (slot.dataset.filled === "true") return;

      const droppedWord = event.dataTransfer.getData("text/plain");
      const answer = slot.dataset.answer;

      if (droppedWord === answer) {
        slot.dataset.filled = "true";
        slot.classList.add("filled");
        slot.innerHTML += `<div><strong>${droppedWord}</strong></div>`;
        const dragItem = [...elements.dragBank.children].find(child => child.dataset.word === droppedWord);
        if (dragItem) dragItem.remove();
        dragCorrect++;
        elements.dragStatus.textContent = `${dragCorrect} / ${dragWords.length} correct`;
        playTone("good");

        if (dragCorrect === dragWords.length) {
          markCompleted("dragdrop", 15);
        }
      } else {
        playTone("bad");
      }
    });
  });
}

function initBingoGame() {
  bingoHits = 0;
  elements.bingoStatus.textContent = "Hits: 0 / 5";
  bingoWords = shuffle(bingoPool).slice(0, 9);
  elements.bingoBoard.innerHTML = "";
  elements.bingoPrompt.textContent = "Tap Next word!";

  bingoWords.forEach(word => {
    const cell = document.createElement("button");
    cell.className = "bingo-cell";
    cell.textContent = word;
    cell.dataset.word = word;
    cell.addEventListener("click", () => handleBingoClick(cell));
    elements.bingoBoard.appendChild(cell);
  });
}

function nextBingoWord() {
  const available = [...elements.bingoBoard.children].filter(cell => !cell.disabled);
  if (available.length === 0) return;
  const randomCell = available[Math.floor(Math.random() * available.length)];
  bingoTarget = randomCell.dataset.word;
  elements.bingoPrompt.textContent = `Find: ${bingoTarget}`;
  speak(bingoTarget);
}

function handleBingoClick(cell) {
  if (!bingoTarget || cell.disabled) return;

  if (cell.dataset.word === bingoTarget) {
    cell.disabled = true;
    cell.style.background = "#eafde8";
    bingoHits++;
    elements.bingoStatus.textContent = `Hits: ${bingoHits} / 5`;
    playTone("good");
    showToast("Correct!");

    if (bingoHits >= 5) {
      markCompleted("bingo", 15);
      elements.bingoPrompt.textContent = "Bingo complete!";
    } else {
      nextBingoWord();
    }
  } else {
    playTone("bad");
    showToast("Try again!");
  }
}

function scrambleWord(word) {
  return shuffle(word.split("")).join("");
}

function initUnscrambleGame() {
  unscrambleSolved = 0;
  elements.unscrambleStatus.textContent = `0 / ${unscrambleWords.length} solved`;
  elements.unscrambleGame.innerHTML = "";

  unscrambleWords.forEach(word => {
    let mixed = scrambleWord(word);
    while (mixed === word) mixed = scrambleWord(word);

    const wrapper = document.createElement("div");
    wrapper.className = "practice-card";
    wrapper.innerHTML = `
      <p><strong>${mixed}</strong></p>
      <input type="text" placeholder="Type the word" data-answer="${word}" class="unscramble-input" />
      <button class="small-btn check-unscramble-btn">Check</button>
      <p class="feedback-text"></p>
    `;
    elements.unscrambleGame.appendChild(wrapper);
  });

  elements.unscrambleGame.querySelectorAll(".check-unscramble-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const wrapper = btn.parentElement;
      const input = wrapper.querySelector(".unscramble-input");
      const feedback = wrapper.querySelector(".feedback-text");

      if (input.disabled) return;

      if (input.value.trim().toLowerCase() === input.dataset.answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        input.disabled = true;
        btn.disabled = true;
        unscrambleSolved++;
        playTone("good");
        elements.unscrambleStatus.textContent = `${unscrambleSolved} / ${unscrambleWords.length} solved`;

        if (unscrambleSolved === unscrambleWords.length) {
          markCompleted("unscramble", 15);
        }
      } else {
        feedback.textContent = "Try again!";
        feedback.style.color = "crimson";
        playTone("bad");
      }
    });
  });
}

function initGuessWhoGame() {
  guessIndex = 0;
  guessCorrect = 0;
  guessAnswered = false;
  elements.guessStatus.textContent = `0 / ${guessWhoQuestions.length} correct`;
  renderGuessWhoQuestion();
}

function renderGuessWhoQuestion() {
  const current = guessWhoQuestions[guessIndex];
  elements.guessPrompt.textContent = current.clue;
  elements.guessFeedback.textContent = "";
  elements.guessOptions.innerHTML = "";
  guessAnswered = false;

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleGuessWho(option));
    elements.guessOptions.appendChild(btn);
  });
}

function handleGuessWho(option) {
  if (guessAnswered) return;
  guessAnswered = true;

  const current = guessWhoQuestions[guessIndex];
  if (option === current.answer) {
    elements.guessFeedback.textContent = "Correct!";
    elements.guessFeedback.style.color = "green";
    guessCorrect++;
    elements.guessStatus.textContent = `${guessCorrect} / ${guessWhoQuestions.length} correct`;
    playTone("good");
  } else {
    elements.guessFeedback.textContent = `Oops! The answer is ${current.answer}.`;
    elements.guessFeedback.style.color = "crimson";
    playTone("bad");
  }

  setTimeout(() => {
    if (guessIndex < guessWhoQuestions.length - 1) {
      guessIndex++;
      renderGuessWhoQuestion();
    } else if (guessCorrect === guessWhoQuestions.length) {
      markCompleted("guesswho", 15);
    }
  }, 900);
}

function initBalloonGame() {
  balloonRound = 0;
  balloonCorrect = 0;
  elements.balloonStatus.textContent = "0 / 5 correct";
  nextBalloonRound();
}

function nextBalloonRound() {
  if (balloonRound >= 5) {
    markCompleted("balloon", 15);
    elements.balloonPrompt.textContent = "Balloon Pop complete!";
    elements.balloonArea.innerHTML = "";
    return;
  }

  const words = shuffle(bingoPool).slice(0, 5);
  const target = words[Math.floor(Math.random() * words.length)];
  elements.balloonPrompt.textContent = `Pop: ${target}`;
  elements.balloonArea.innerHTML = "";

  words.forEach((word, index) => {
    const balloon = document.createElement("button");
    balloon.className = "balloon";
    balloon.textContent = word;
    balloon.style.left = `${10 + index * 18}%`;
    balloon.style.background = index % 2 === 0 ? "#ffd7e9" : "#dff3ff";

    balloon.addEventListener("click", () => {
      if (word === target) {
        balloon.remove();
        balloonCorrect++;
        balloonRound++;
        elements.balloonStatus.textContent = `${balloonCorrect} / 5 correct`;
        playTone("good");
        showToast("Nice pop!");
        nextBalloonRound();
      } else {
        playTone("bad");
        showToast("Wrong balloon!");
      }
    });

    elements.balloonArea.appendChild(balloon);
  });
}

function initSentenceBuilder() {
  builderIndex = 0;
  builderSolved = 0;
  elements.builderStatus.textContent = `0 / ${sentenceBuilderSet.length} solved`;
  renderSentenceBuilder();
}

function renderSentenceBuilder() {
  const current = sentenceBuilderSet[builderIndex];
  elements.builderTarget.textContent = current.prompt;
  elements.builderBank.innerHTML = "";
  elements.builderAnswer.innerHTML = "";
  elements.builderFeedback.textContent = "";

  shuffle(current.words).forEach(word => {
    const btn = document.createElement("button");
    btn.className = "builder-word";
    btn.textContent = word;
    btn.addEventListener("click", () => {
      const answerWord = document.createElement("span");
      answerWord.className = "builder-word";
      answerWord.textContent = word;
      answerWord.dataset.word = word;
      elements.builderAnswer.appendChild(answerWord);
      btn.disabled = true;
    });
    elements.builderBank.appendChild(btn);
  });
}

function checkSentenceBuilder() {
  const builtSentence = [...elements.builderAnswer.children].map(el => el.dataset.word).join(" ");
  const current = sentenceBuilderSet[builderIndex];

  if (builtSentence === current.answer) {
    elements.builderFeedback.textContent = "Great!";
    elements.builderFeedback.style.color = "green";
    builderSolved++;
    elements.builderStatus.textContent = `${builderSolved} / ${sentenceBuilderSet.length} solved`;
    playTone("good");

    setTimeout(() => {
      if (builderIndex < sentenceBuilderSet.length - 1) {
        builderIndex++;
        renderSentenceBuilder();
      } else {
        markCompleted("sentencebuilder", 15);
      }
    }, 900);
  } else {
    elements.builderFeedback.textContent = "Try the order again.";
    elements.builderFeedback.style.color = "crimson";
    playTone("bad");
  }
}

function clearSentenceBuilder() {
  renderSentenceBuilder();
}

function initFamilyWheel() {
  wheelCurrent = null;
  wheelCorrect = 0;
  wheelAnswered = false;
  elements.wheelStatus.textContent = `0 / ${familyWheelSet.length} correct`;
  elements.wheelDisplay.textContent = "🎡 Spin!";
  elements.wheelOptions.innerHTML = "";
  elements.wheelFeedback.textContent = "";
}

function spinFamilyWheel() {
  const remaining = familyWheelSet.filter(item => !item.used);
  if (remaining.length === 0) {
    markCompleted("familywheel", 15);
    elements.wheelDisplay.textContent = "Complete!";
    return;
  }

  wheelCurrent = remaining[Math.floor(Math.random() * remaining.length)];
  wheelCurrent.used = true;
  wheelAnswered = false;

  elements.wheelDisplay.textContent = `${wheelCurrent.emoji} ${wheelCurrent.question}`;
  elements.wheelOptions.innerHTML = "";
  elements.wheelFeedback.textContent = "";

  wheelCurrent.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleWheelAnswer(option));
    elements.wheelOptions.appendChild(btn);
  });
}

function handleWheelAnswer(option) {
  if (!wheelCurrent || wheelAnswered) return;
  wheelAnswered = true;

  if (option === wheelCurrent.answer) {
    wheelCorrect++;
    elements.wheelFeedback.textContent = "Correct!";
    elements.wheelFeedback.style.color = "green";
    elements.wheelStatus.textContent = `${wheelCorrect} / ${familyWheelSet.length} correct`;
    playTone("good");
  } else {
    elements.wheelFeedback.textContent = `Oops! The answer is ${wheelCurrent.answer}.`;
    elements.wheelFeedback.style.color = "crimson";
    playTone("bad");
  }
}

function resetFamilyWheelData() {
  familyWheelSet.forEach(item => delete item.used);
}

function initRaceGame() {
  raceIndex = 0;
  raceSteps = 0;
  updateRaceRunner();
  elements.raceStatus.textContent = "Steps: 0 / 5";
  renderRaceQuestion();
}

function renderRaceQuestion() {
  if (raceIndex >= raceQuestions.length) {
    markCompleted("racehouse", 15);
    elements.raceQuestion.textContent = "You reached the family house!";
    elements.raceOptions.innerHTML = "";
    elements.raceFeedback.textContent = "Excellent!";
    return;
  }

  const current = raceQuestions[raceIndex];
  elements.raceQuestion.textContent = current.question;
  elements.raceFeedback.textContent = "";
  elements.raceOptions.innerHTML = "";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleRaceAnswer(option));
    elements.raceOptions.appendChild(btn);
  });
}

function handleRaceAnswer(option) {
  const current = raceQuestions[raceIndex];
  if (option === current.answer) {
    raceSteps++;
    raceIndex++;
    elements.raceFeedback.textContent = "Move forward!";
    elements.raceFeedback.style.color = "green";
    elements.raceStatus.textContent = `Steps: ${raceSteps} / 5`;
    playTone("good");
    updateRaceRunner();
    setTimeout(renderRaceQuestion, 700);
  } else {
    elements.raceFeedback.textContent = "Try again!";
    elements.raceFeedback.style.color = "crimson";
    playTone("bad");
  }
}

function updateRaceRunner() {
  const percent = (raceSteps / 5) * 100;
  elements.raceRunner.style.transform = `translateX(${percent * 2.2}px)`;
}

function renderPractice() {
  practiceAnsweredCount = 0;
  document.querySelector(".practice-image").textContent = practiceMultipleChoice.image;
  elements.practiceChoices.innerHTML = "";
  elements.fillSentence.textContent = fillSentenceData.sentence;
  elements.fillOptions.innerHTML = "";
  elements.fillFeedback.textContent = "";

  practiceMultipleChoice.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => {
      if (btn.disabled) return;

      if (option === practiceMultipleChoice.answer) {
        btn.style.background = "#eafde8";
        playTone("good");
        practiceAnsweredCount++;
        checkPracticeCompletion();
      } else {
        btn.style.background = "#ffe5ea";
        playTone("bad");
      }
      elements.practiceChoices.querySelectorAll("button").forEach(button => button.disabled = true);
    });
    elements.practiceChoices.appendChild(btn);
  });

  fillSentenceData.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => {
      if (btn.disabled) return;

      if (option === fillSentenceData.answer) {
        elements.fillFeedback.textContent = "Correct!";
        elements.fillFeedback.style.color = "green";
        playTone("good");
        practiceAnsweredCount++;
        checkPracticeCompletion();
      } else {
        elements.fillFeedback.textContent = "Try again!";
        elements.fillFeedback.style.color = "crimson";
        playTone("bad");
        return;
      }
      elements.fillOptions.querySelectorAll("button").forEach(button => button.disabled = true);
    });
    elements.fillOptions.appendChild(btn);
  });
}

function checkPracticeCompletion() {
  if (practiceAnsweredCount >= 2) {
    markCompleted("practice", 15);
  }
}

function renderQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  elements.quizTotal.textContent = quizQuestions.length;
  elements.quizScoreMini.textContent = quizScore;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const current = quizQuestions[quizIndex];
  elements.quizNumber.textContent = quizIndex + 1;
  elements.quizEmoji.textContent = current.emoji;
  elements.quizQuestion.textContent = current.question;
  elements.quizFeedback.textContent = "";
  elements.nextQuizBtn.disabled = true;
  elements.quizOptions.innerHTML = "";
  quizAnswered = false;

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleQuizAnswer(option, btn));
    elements.quizOptions.appendChild(btn);
  });
}

function handleQuizAnswer(option, button) {
  if (quizAnswered) return;
  quizAnswered = true;

  const current = quizQuestions[quizIndex];
  const optionButtons = elements.quizOptions.querySelectorAll("button");

  optionButtons.forEach(btn => btn.disabled = true);

  if (option === current.answer) {
    button.style.background = "#eafde8";
    elements.quizFeedback.textContent = "Correct!";
    elements.quizFeedback.style.color = "green";
    quizScore++;
    elements.quizScoreMini.textContent = quizScore;
    playTone("good");
  } else {
    button.style.background = "#ffe5ea";
    elements.quizFeedback.textContent = `Oops! The correct answer is ${current.answer}.`;
    elements.quizFeedback.style.color = "crimson";
    playTone("bad");

    optionButtons.forEach(btn => {
      if (btn.textContent === current.answer) {
        btn.style.background = "#eafde8";
      }
    });
  }

  elements.nextQuizBtn.disabled = false;
}

function nextQuizQuestion() {
  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    renderQuizQuestion();
  } else {
    elements.quizQuestion.textContent = `You finished! Final score: ${quizScore} / ${quizQuestions.length}`;
    elements.quizOptions.innerHTML = "";
    elements.quizEmoji.textContent = quizScore >= 8 ? "🏆" : "⭐";
    elements.quizFeedback.textContent = quizScore >= 8 ? "Excellent work!" : "Good job! Keep practicing.";
    elements.nextQuizBtn.disabled = true;

    if (quizScore >= 6) {
      markCompleted("quiz", 20);
    }
  }
}

function initAllGames() {
  initMatchingGame();
  initMemoryGame();
  initDragDropGame();
  initBingoGame();
  initUnscrambleGame();
  initGuessWhoGame();
  initBalloonGame();
  initSentenceBuilder();
  resetFamilyWheelData();
  initFamilyWheel();
  initRaceGame();
}

function setupEvents() {
  elements.saveNameBtn.addEventListener("click", () => {
    state.studentName = elements.studentName.value.trim();
    saveState();
    updateStudentName();
    showToast(`Welcome, ${state.studentName || "Guest"}!`);
  });

  elements.completeLearnBtn.addEventListener("click", () => markCompleted("learn", 10));

  elements.flashcard.addEventListener("click", () => {
    elements.flashcard.classList.toggle("flipped");
  });

  elements.flashcard.addEventListener("keypress", event => {
    if (event.key === "Enter" || event.key === " ") {
      elements.flashcard.classList.toggle("flipped");
    }
  });

  elements.speakFlashBtn.addEventListener("click", event => {
    event.stopPropagation();
    speak(familyData[flashIndex].word);
  });

  elements.nextFlashcard.addEventListener("click", nextFlashcard);
  elements.prevFlashcard.addEventListener("click", prevFlashcard);
  elements.completeFlashBtn.addEventListener("click", () => markCompleted("flashcards", 10));

  elements.resetMatchingBtn.addEventListener("click", initMatchingGame);
  elements.resetMemoryBtn.addEventListener("click", initMemoryGame);
  elements.resetDragBtn.addEventListener("click", initDragDropGame);

  elements.nextBingoBtn.addEventListener("click", nextBingoWord);
  elements.resetBingoBtn.addEventListener("click", initBingoGame);

  elements.resetUnscrambleBtn.addEventListener("click", initUnscrambleGame);
  elements.resetGuessBtn.addEventListener("click", initGuessWhoGame);
  elements.resetBalloonBtn.addEventListener("click", initBalloonGame);

  elements.builderCheckBtn.addEventListener("click", checkSentenceBuilder);
  elements.builderClearBtn.addEventListener("click", clearSentenceBuilder);
  elements.resetBuilderBtn.addEventListener("click", initSentenceBuilder);

  elements.spinWheelBtn.addEventListener("click", spinFamilyWheel);
  elements.resetWheelBtn.addEventListener("click", () => {
    resetFamilyWheelData();
    initFamilyWheel();
  });

  elements.resetRaceBtn.addEventListener("click", initRaceGame);

  elements.nextQuizBtn.addEventListener("click", nextQuizQuestion);
  elements.restartQuizBtn.addEventListener("click", renderQuiz);

  elements.resetProgressBtn.addEventListener("click", resetWholeProgress);

  elements.menuToggle.addEventListener("click", () => {
    elements.mainNav.classList.toggle("show");
  });

  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      elements.mainNav.classList.remove("show");
    });
  });
}

function init() {
  updateStudentName();
  updateScoreUI();
  updateProgressUI();
  renderLearnCards();
  renderFlashcard();
  initAllGames();
  renderPractice();
  renderQuiz();
  setupEvents();
}

init();
