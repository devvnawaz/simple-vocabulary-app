const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((response) => response.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  // console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10">
        <h2>${word.word}</h2>
        <p>Meaning / Pronunciation</p>
        <p>${word.meaning} / ${word.pronunciation}</p>
      </div>`;
    wordContainer.append(card);
  });
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
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open"></i>
    Lesson - ${lesson.level_no}
    </button>
`;

    // 4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();
