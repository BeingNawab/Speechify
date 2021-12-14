const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "Mujhe pani pina hai"
  },
  {
    image: './img/food.jpg',
    text: "Mujhe Bhook lagi hai"
  },
  {
    image: './img/tired.jpg',
    text: "Mai Thak gya hu"
  },
  {
    image: './img/bath.jpg',
    text: "Mujhe Nahana hai"
  },
  {
    image: './img/happy.jpg',
    text: "Mai khush hu"
  },
  {
    image: './img/angry.jpg',
    text: "Mujhe Gussa aa raha hai"
  },
  {
    image: './img/sad1.jpg',
    text: "Mai Naraz hu"
  },
  {
    image: './img/toilet.jpg',
    text: "Mujhe toilet jana hai"
  },
  {
    image: './img/outside.jpg',
    text: 'Mujhe bahar ghumne jana hai'
  },
  {
    image: './img/home.jpg',
    text: 'Mujhe ghar jana hai'
  },
  {
    image: './img/school.jpg',
    text: 'mujhe school jana hai'
  },
  {
    image: './img/grandma.jpg',
    text: 'Mujhe dadi k pas jana hai'
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
