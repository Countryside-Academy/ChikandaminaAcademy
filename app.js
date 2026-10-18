const lessons = [
  {
    id: "fractions",
    icon: "½",
    title: "Fractions and mixed numbers",
    description: "Represent parts of a whole and work with equivalent fractions.",
    duration: "15 min",
    level: "Number",
    intro: "A fraction shows equal parts of a whole. The denominator tells how many equal parts make the whole; the numerator tells how many parts are being considered.",
    sections: [
      ["Key idea", "For a fraction such as 3/5, the 5 means the whole is divided into five equal parts, and the 3 means three of those parts are counted."],
      ["Worked example", "A community garden is divided into 8 equal beds. Vegetables are planted in 3 beds. The planted part is 3/8 of the garden."],
      ["Equivalent fractions", "Equivalent fractions have the same value. Multiply or divide the numerator and denominator by the same non-zero number. For example, 1/2 = 2/4 = 4/8."],
      ["Try it", "Simplify 6/12. Divide the numerator and denominator by 6: 6/12 = 1/2."]
    ],
    heritage: "Heritage connection: When sharing a harvest, a family may divide produce into equal portions. Fractions help describe fair shares."
  },
  {
    id: "percentages",
    icon: "%",
    title: "Percentages",
    description: "Connect percentages to fractions, decimals and everyday comparisons.",
    duration: "15 min",
    level: "Number",
    intro: "Percent means “out of one hundred”. So 25% means 25 out of 100, which is also 1/4 or 0.25.",
    sections: [
      ["Convert a percentage", "To write 40% as a fraction, write 40/100 and simplify: 40/100 = 2/5."],
      ["Worked example", "A school garden has 100 seedlings. If 35 are tomato seedlings, 35% of the seedlings are tomatoes."],
      ["Find a percentage of a quantity", "To find 10% of 80, divide 80 by 10. The answer is 8. To find 25%, find one quarter: 80 ÷ 4 = 20."],
      ["Remember", "Percentages are useful for interpreting survey results, comparing quantities and checking progress."]
    ],
    heritage: "Heritage connection: Learners can survey the types of crops grown by families in their community and show the results as percentages."
  },
  {
    id: "ratio",
    icon: "↔",
    title: "Ratio and proportion",
    description: "Compare quantities and scale a simple recipe or mixture fairly.",
    duration: "12 min",
    level: "Number",
    intro: "A ratio compares quantities. The ratio 2:3 means two parts of one quantity for every three parts of another quantity.",
    sections: [
      ["Read a ratio", "If a craft group uses 2 red beads for every 3 white beads, the ratio of red to white beads is 2:3."],
      ["Equivalent ratios", "Multiply or divide both parts by the same number. For example, 2:3 = 4:6 = 6:9."],
      ["Worked example", "A drink mixture uses 1 cup of concentrate for every 4 cups of water. If 2 cups of concentrate are used, 8 cups of water are needed to keep the same ratio."],
      ["Check your thinking", "If a drawing is enlarged proportionally, all lengths are multiplied by the same scale factor."]
    ],
    heritage: "Heritage connection: Patterns in beadwork, weaving and other crafts can be studied by identifying repeated quantities and ratios."
  },
  {
    id: "measurement",
    icon: "⌁",
    title: "Measurement and perimeter",
    description: "Use units and calculate the distance around a shape.",
    duration: "18 min",
    level: "Measurement",
    intro: "Measurement describes size or quantity using units. Perimeter is the total distance around the outside of a 2D shape.",
    sections: [
      ["Useful conversions", "1 metre = 100 centimetres. 1 kilometre = 1,000 metres. Always check that measurements use compatible units before calculating."],
      ["Perimeter of a rectangle", "Add all four sides. If the length is 8 m and the width is 5 m, the perimeter is 8 + 5 + 8 + 5 = 26 m."],
      ["Formula", "Perimeter of a rectangle = 2 × (length + width). For the example: 2 × (8 + 5) = 26 m."],
      ["Worked example", "A rectangular vegetable plot is 12 m long and 7 m wide. Its perimeter is 2 × (12 + 7) = 38 m."]
    ],
    heritage: "Heritage connection: Accurate measurement helps communities plan garden beds, school spaces and practical building projects."
  }
];

const quiz = [
  {q:"1. Which fraction is equivalent to 1/2?", options:["2/3","2/4","3/5","1/3"], answer:1, explain:"2/4 simplifies to 1/2 when the numerator and denominator are divided by 2."},
  {q:"2. What is 25% of 80?", options:["10","15","20","25"], answer:2, explain:"25% is one quarter. 80 ÷ 4 = 20."},
  {q:"3. The ratio 2:3 is doubled. What is the equivalent ratio?", options:["2:6","4:6","3:4","4:5"], answer:1, explain:"Multiply both parts by 2: 2:3 becomes 4:6."},
  {q:"4. A rectangle is 8 m long and 5 m wide. What is its perimeter?", options:["13 m","26 m","40 m","80 m"], answer:1, explain:"Perimeter = 8 + 5 + 8 + 5 = 26 m."},
  {q:"5. How many centimetres are in 3 metres?", options:["30 cm","300 cm","3,000 cm","103 cm"], answer:1, explain:"1 metre = 100 centimetres, so 3 × 100 = 300 cm."}
];

const STORAGE_KEY = "chikandamina-g7-maths-progress-v1";
let state = loadState();
let activeLesson = null;

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {completed:[], quizBest:null}; }
  catch (_) { return {completed:[], quizBest:null}; }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  updateProgress();
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function renderLessons() {
  const grid = document.getElementById("lessonGrid");
  grid.innerHTML = lessons.map((lesson, index) => {
    const done = state.completed.includes(lesson.id);
    return `<article class="lesson-card">
      <div class="lesson-top"><div class="lesson-icon" aria-hidden="true">${lesson.icon}</div><span class="lesson-duration">${lesson.duration}</span></div>
      <h3>${index + 1}. ${escapeHtml(lesson.title)}</h3>
      <p>${escapeHtml(lesson.description)}</p>
      <div class="lesson-bottom"><span class="tag">${escapeHtml(lesson.level)}</span>
      <div style="display:flex;align-items:center;gap:8px">${done ? '<span class="complete-label">✓ Completed</span>' : ''}<button class="button button-secondary small-button" data-open="${lesson.id}" type="button">${done ? "Review" : "Start lesson"} →</button></div></div>
    </article>`;
  }).join("");
  grid.querySelectorAll("[data-open]").forEach(button => button.addEventListener("click", () => openLesson(button.dataset.open)));
  updateProgress();
}
function openLesson(id) {
  activeLesson = lessons.find(item => item.id === id);
  if (!activeLesson) return;
  document.getElementById("panelKicker").textContent = `LESSON • ${activeLesson.duration.toUpperCase()}`;
  document.getElementById("panelTitle").textContent = activeLesson.title;
  const body = document.getElementById("panelBody");
  body.innerHTML = `<p>${escapeHtml(activeLesson.intro)}</p>` +
    activeLesson.sections.map(([heading, content]) => `<h3>${escapeHtml(heading)}</h3><p>${escapeHtml(content)}</p>`).join("") +
    `<div class="heritage"><strong>Heritage-based learning</strong><p>${escapeHtml(activeLesson.heritage)}</p></div>` +
    `<h3>Pause and reflect</h3><p>Explain in your own words how this mathematics idea could help at home, at school or in your community.</p>`;
  document.getElementById("markComplete").textContent = state.completed.includes(id) ? "✓ Lesson completed" : "Mark lesson complete";
  document.getElementById("lessonPanel").classList.remove("hidden");
  document.getElementById("lessonPanel").scrollIntoView({behavior:"smooth",block:"start"});
}
function updateProgress() {
  const total = lessons.length;
  const done = state.completed.length;
  const percent = Math.round(done / total * 100);
  document.getElementById("lessonCount").textContent = `${done} of ${total} completed`;
  document.getElementById("progressText").textContent = done ? `You have completed ${done} of ${total} starter lessons. Keep going!` : "Complete a lesson to start tracking progress.";
  document.getElementById("progressBar").style.width = `${percent}%`;
  document.getElementById("progressPercent").textContent = `${percent}%`;
}
function renderQuiz() {
  document.getElementById("quizQuestions").innerHTML = quiz.map((item, i) =>
    `<fieldset class="question"><legend>${escapeHtml(item.q)}</legend><div class="option-list">${item.options.map((option, j) =>
      `<label class="option"><input type="radio" name="q${i}" value="${j}"><span>${escapeHtml(option)}</span></label>`).join("")}</div></fieldset>`
  ).join("");
}
document.getElementById("quizForm").addEventListener("submit", event => {
  event.preventDefault();
  let score = 0;
  const feedback = quiz.map((item, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const correct = selected && Number(selected.value) === item.answer;
    if (correct) score++;
    return `<li>${correct ? "✓" : "•"} ${escapeHtml(item.explain)}</li>`;
  }).join("");
  if (state.quizBest === null || score > state.quizBest) state.quizBest = score;
  saveState();
  const result = document.getElementById("quizResult");
  result.className = `quiz-result${score < 3 ? " needs-work" : ""}`;
  result.innerHTML = `<div>You scored ${score} out of ${quiz.length}.</div><ul>${feedback}</ul><div>Best score on this device: ${state.quizBest}/${quiz.length}</div>`;
});
document.getElementById("resetQuiz").addEventListener("click", () => {
  document.getElementById("quizForm").reset();
  const result = document.getElementById("quizResult");
  result.className = "quiz-result hidden";
  result.innerHTML = "";
});
document.getElementById("closeLesson").addEventListener("click", () => {
  document.getElementById("lessonPanel").classList.add("hidden");
  activeLesson = null;
});
document.getElementById("markComplete").addEventListener("click", () => {
  if (!activeLesson) return;
  if (!state.completed.includes(activeLesson.id)) state.completed.push(activeLesson.id);
  saveState();
  renderLessons();
  document.getElementById("markComplete").textContent = "✓ Lesson completed";
});
function printCurrentLesson() {
  if (!activeLesson) {
    const first = lessons[0];
    openLesson(first.id);
    setTimeout(() => window.print(), 100);
  } else window.print();
}
document.getElementById("printBtn").addEventListener("click", printCurrentLesson);
document.getElementById("panelPrint").addEventListener("click", () => window.print());
document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {title:"Chikandamina Academy — Grade 7 Mathematics", text:"Grade 7 Mathematics lessons and practice from Chikandamina Academy. Open index.html in a browser from the extracted folder."};
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (_) {}
  } else {
    const result = document.createElement("div");
    result.className = "quiz-result";
    result.textContent = "To share: send the Chikandamina_Academy_Grade7_Mathematics.zip file or the hosted website link through WhatsApp.";
    document.querySelector(".footer").before(result);
  }
});
renderLessons();
renderQuiz();

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
