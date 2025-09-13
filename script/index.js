const createElements = (arr) => {
  // console.log(arr);
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const synonyms = ["hello", "hi", "hey"];

createElements(synonyms);

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((response) => response.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActive(); // remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active"); // add active class
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const response = await fetch(url);
  const wordDetails = await response.json();
  displayWordDetails(wordDetails.data);
};

/* {
  "word": "Eager",
  "meaning": "আগ্রহী",
  "pronunciation": "ইগার",
  "level": 1,
  "sentence": "The kids were eager to open their gifts.",
  "points": 1,
  "partsOfSpeech": "adjective",
  "synonyms": [
      "enthusiastic",
      "excited",
      "keen"
  ],
  "id": 5
} */

const displayWordDetails = (word) => {
  // console.log(word);
  const wordDetailsContainer = document.getElementById(
    "word-details-container"
  );
  wordDetailsContainer.innerHTML = `
  <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold bangla-font">সমার্থক শব্দ গুলো</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
  `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  // console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full space-y-4">
    <i class="fa-solid fa-triangle-exclamation text-8xl text-gray-400"></i>
        <p class="font-bangla text-xl font-medium text-gray-400">
        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="text-4xl font-bold font-bangla">
        নেক্সট Lesson এ যান
        </h2>
      </div>
    `;
    manageSpinner(false)
    return;
  }

  /*   {
    "id": 147,
    "level": 5,
    "word": "Recalcitrant",
    "meaning": "অধিকারী নয় এমন",
    "pronunciation": "রিক্যালসিট্রান্ট"
} */

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-xl">${
          word.word ? word.word : "Word is not found"
        }</h2>
        <p class="font-semibold">Meaning / Pronunciation</p>
        <div class="text-2xl font-medium font-bangla">"${
          word.meaning ? word.meaning : "Meaning is not found"
        } / ${
      word.pronunciation ? word.pronunciation : "Pronunciation is not found"
    }"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
      `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  // console.log(lessons);
  // 1. get the container and empty

  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. get into every lesson
  for (const lesson of lessons) {
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i>
    Lesson - ${lesson.level_no}
    </button>
`;

    // 4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();
