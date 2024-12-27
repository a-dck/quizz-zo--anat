const questions = [
    {
      question: "Quel est la capitale de la Belgique ?",
      answers: ["Bruxelles", "Liège", "Gand", "Anvers"],
      correct: 0
    },
    {
      question: "Quel est le plus grand fleuve d'Europe ?",
      answers: ["Danube", "Volga", "Rhin", "Seine"],
      correct: 1
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    questionElement.textContent = questions[currentQuestion].question;
    answersElement.innerHTML = "";
  
    questions[currentQuestion].answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.onclick = () => checkAnswer(index);
      answersElement.appendChild(button);
    });
  }
  
  function checkAnswer(selected) {
    if (selected === questions[currentQuestion].correct) {
      score++;
      alert("Bonne réponse !");
    } else {
      alert("Mauvaise réponse !");
    }
    document.getElementById("score").textContent = `Score : ${score}`;
  }
  
  document.getElementById("next").onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      alert("Quiz terminé ! Ton score : " + score);
    }
  };
  
  showQuestion();