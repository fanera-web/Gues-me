let knowledge = JSON.parse(localStorage.getItem("knowledge")) || {
  question: "У твого персонажа є хвіст?",
  yes: { answer: "Кіт" },
  no: null
};

let currentNode = knowledge;

function showQuestion() {
  if (currentNode.question) {
    document.getElementById("question").innerText = currentNode.question;
    document.getElementById("result").classList.add("hidden");
    document.getElementById("newCharacter").classList.add("hidden");
  } else if (currentNode.answer) {
    document.getElementById("result").innerText = "Це " + currentNode.answer + "!";
    document.getElementById("result").classList.remove("hidden");
  } else {
    document.getElementById("question").innerText = "Я не знаю... Додай нового персонажа!";
    document.getElementById("newCharacter").classList.remove("hidden");
  }
}

function answer(choice) {
  if (choice) {
    if (currentNode.yes) {
      currentNode = currentNode.yes;
      showQuestion();
    } else {
      document.getElementById("newCharacter").classList.remove("hidden");
    }
  } else {
    if (currentNode.no) {
      currentNode = currentNode.no;
      showQuestion();
    } else {
      document.getElementById("newCharacter").classList.remove("hidden");
    }
  }
}

function saveCharacter() {
  let name = document.getElementById("name").value.trim();
  let trait = document.getElementById("trait").value.trim();

  if (name && trait) {
    currentNode.question = "У твого персонажа " + trait + "?";
    currentNode.yes = { answer: name };
    currentNode.no = { answer: "???" }; // запасний варіант
    localStorage.setItem("knowledge", JSON.stringify(knowledge));
    alert("Додано! Спробуй ще раз.");
    currentNode = knowledge;
    showQuestion();
  } else {
    alert("Будь ласка, заповніть усі поля.");
  }
}

showQuestion();
