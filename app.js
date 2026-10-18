const DEFAULT_LEVELS = ["Number", "Heritage Maths", "Problem Solving"];
const HERITAGE_NOTE = "Heritage connection: Uses Zimbabwean examples";

const lessons = [
  {
    id: "fractions",
    icon: "½",
    title: "Fractions and mixed numbers",
    description: "Represent parts of a whole and everyday sharing",
    duration: "15 min",
    level: "Number",
    intro: "A fraction shows equal parts of a whole. In Zimbabwe, sharing sadza, land, or harvest uses fractions.",
    sections: [
      ["Key idea", "For a fraction 3/5, bottom (denominator) is total equal parts, top (numerator) is parts taken."],
      ["Worked example", "A community garden is divided into 5 equal sections. 3 sections grow maize. Fraction = 3/5 for maize."],
      ["Equivalent fractions", "Multiply top and bottom by same number. 1/2 = 2/4 = 3/6. Same amount, different name."],
      ["Mixed numbers", "1 1/2 means 1 whole + half. Like 1 full bucket of water + half bucket."],
      ["Try it", "Simplify 6/12. Divide top and bottom by 6. Answer = 1/2. Practice: Simplify 8/10 and 15/20."],
    ],
    heritage: "Heritage connection: When sharing matondo or grain, our elders used fractions. Gogo divides 1 loaf into 4 equal parts for 4 grandchildren - each gets 1/4.",
    quiz: [
      { q: "What is 1/2 of 12?", options: ["4", "6", "8"], answer: 1 },
      { q: "Simplify 9/12", options: ["3/4", "1/2", "2/3"], answer: 0 }
    ]
  },
  {
    id: "percentages",
    icon: "%",
    title: "Percentages and real life",
    description: "Connect percentages to fractions and money",
    duration: "15 min",
    level: "Number",
    intro: "Percent means per 100. In shops and exam results we use % daily.",
    sections: [
      ["Key idea", "50% = 50/100 = 1/2. 25% = 1/4. 10% = 1/10."],
      ["Money example", "If airtime $10 and you use 20%, you used $2. Calculation: 10 x 20/100 = 2."],
      ["Increase", "Price was $200, increases by 10%. New price = 200 + (200x10/100) = $220."],
      ["Try it", "A school has 400 learners, 55% are girls. How many girls? 400 x 55/100 = 220 girls."],
    ],
    heritage: "Heritage connection: At Mbare market, trader gives 10% discount. Understanding % helps you check if you are getting fair price.",
    quiz: [
      { q: "What is 25% of 80?", options: ["20", "25", "30"], answer: 0 }
    ]
  },
  {
    id: "chikandamina-heritage",
    icon: "🇿🇼",
    title: "Chikandamina - Our Heritage Maths",
    description: "Learn maths through Zimbabwean culture",
    duration: "10 min",
    level: "Heritage Maths",
    intro: "Chikandamina means knowledge that sustains. Maths is in our huts, drums, farming.",
    sections: [
      ["Hut geometry", "A round hut (rondavel) is a cylinder + cone roof. Calculating materials needs circumference = π x diameter."],
      ["Farming maths", "One hectare = 10,000 m². If maize spacing is 75cm x 25cm, how many plants per hectare? Approx 53,333 plants."],
      ["Patterns", "Ndebele and Shona patterns use symmetry, rotation, triangles. Counting repeating units is algebra."],
      ["Try it", "A granary (dura) holds 500kg. Family uses 2kg per day. How many days? 500/2 = 250 days."],
    ],
    heritage: "Heritage connection: Our ancestors were mathematicians - builders, traders, farmers. This academy continues that wisdom - Chikandamina!",
    quiz: [
      { q: "One hectare is how many m²?", options: ["1,000", "10,000", "100,000"], answer: 1 }
    ]
  }
];

// Make available globally
window.lessonsData = lessons;
window.DEFAULT_LEVELS = DEFAULT_LEVELS;
