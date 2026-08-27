const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swapBtn");
const copyBtn = document.getElementById("copyBtn");
const speakBtn = document.getElementById("speakBtn");

async function translateText() {
  const text = inputText.value.trim();

  if (!text) {
    alert("Please enter some text");
    return;
  }

  outputText.value = "Translating...";
  translateBtn.disabled = true;
  translateBtn.innerText = "Translating...";

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseData && data.responseData.translatedText) {
      outputText.value = data.responseData.translatedText;
    } else {
      outputText.value = "Translation not available";
    }
  } catch (error) {
    outputText.value = "Error occurred";
  }

  translateBtn.disabled = false;
  translateBtn.innerText = "Translate";
}

function swapLanguages() {
  const tempText = inputText.value;
  inputText.value = outputText.value;
  outputText.value = tempText;
}

function copyText() {
  const text = outputText.value;
  if (!text || text === "Translating...") {
    alert("Nothing to copy");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.innerText = "Copied!";
    setTimeout(() => {
      copyBtn.innerText = "Copy";
    }, 1500);
  });
}

function speakText() {
  const text = outputText.value;
  if (!text || text === "Translating...") {
    alert("Nothing to speak");
    return;
  }
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  speech.rate = 0.9;
  window.speechSynthesis.speak(speech);
}

translateBtn.addEventListener("click", translateText);
swapBtn.addEventListener("click", swapLanguages);
copyBtn.addEventListener("click", copyText);
speakBtn.addEventListener("click", speakText);