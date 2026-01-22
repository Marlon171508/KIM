// ===== Elemente =====
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// ===== GPT4All Modell laden =====
const model = new GPT4All({
  model: "gpt4all-mini.bin", // stelle sicher, dass die Datei im Hauptverzeichnis liegt
  verbose: true
});

// ===== Nachricht erstellen =====
function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble", sender);
  bubble.textContent = text;
  chatMessages.appendChild(bubble);

  // Scroll automatisch nach unten
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== KIM antwortet individuell =====
async function kimReply(userText) {
  addMessage("KIM tippt…", "kim");
  const typingBubble = chatMessages.querySelector(".kim:last-child");

  try {
    const response = await model.generate(userText, {
      max_tokens: 150,
      temperature: 0.8
    });

    // Entferne „tippt…“
    typingBubble.remove();

    addMessage(response, "kim");
  } catch (err) {
    typingBubble.remove();
    addMessage("Oops, KIM kann gerade nicht antworten 😅", "kim");
    console.error(err);
  }
}

// ===== Nachricht senden =====
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  kimReply(text);
}

// ===== Events =====
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
