// Définition des questions avec leurs réponses et la bonne réponse
const questions = [
    {
      question: "A quel point je t'aime ?",
      answers: ["Un peu", "Beaucoup", "À la folie", "Pas du tout"],
//      image: "Capture d’écran 2024-12-27 175200.png",
      correct: 2 //indique la bonne réponse
    },
    {
      question: "Quel est le plus grand fleuve d'Europe ?",
      answers: ["Danube", "Volga", "Rhin", "Seine"],
      correct: 1
    }
  ];
  
  // Variables globales pour suivre la question actuelle, le score et si une réponse a déjà été donnée
  let currentQuestion = 0;
  let score = 0;
  let hasAnswered = false; // Indique si une réponse a déjà été donnée pour la question courante

  // Ajout des effets sonores
  const correctSound = new Audio('correctSound.mp3'); 
  const incorrectSound = new Audio('incorrectSound.mp3'); 
  
  // Affiche la question et les réponses sur la page
  function showQuestion() {
    hasAnswered = false; // Réinitialise le statut de réponse pour la nouvelle question

    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const questionImageElement = document.getElementById("questionImage");

 // Ajoute une animation de transition fluide pour la question
        questionElement.style.transition = "opacity 0.5s ease-in-out";
        questionElement.style.opacity = 0;

//Met à jour le texte de la question
    questionElement.textContent = questions[currentQuestion].question

//affiche l'image de la question si elle existe
    if (questions[currentQuestion].image) {
      questionImageElement.src = questions[currentQuestion].image;
      questionImageElement.style.display = "block";
    }
    else {
        questionImageElement.style.display = "none";
        }
// Réinitialise les boutons de réponse
    answersElement.innerHTML = "";
  
// Ajoute un bouton pour chaque réponse possible avec animation
    questions[currentQuestion].answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.onclick = () => checkAnswer(index);

//Crée l'animation pour chaque bouton
      button.style.opacity = 0;
            button.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
            button.style.transform = "translateY(20px)";

      answersElement.appendChild(button);

//Déclenche l'animation après un délai
      setTimeout(() => {
        button.style.opacity = 1;
        button.style.transform = "translateY(0)";
    }, 100 * index); // Décalage pour chaque bouton
});

    questionElement.style.opacity = 0;
    setTimeout(() => questionElement.style.opacity = 1, 500);
  }
  
  function checkAnswer(selected) {
    if (hasAnswered) return; // Empêche d'incrémenter le score ou de jouer des sons plusieurs fois

    if (selected === questions[currentQuestion].correct) {
      score++;
      correctSound.play();
      alert("T'es la meilleure !");
      hasAnswered = true; // Marque cette question comme répondue

    } else {
      incorrectSound.play();
      alert("Essaye encore!");
    }

// Met à jour l'affichage du score
    document.getElementById("score").textContent = `Score : ${score}`;


  }
  
// Configure le bouton "Suivant"
  document.getElementById("next").onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      alert("Finito ! Ton score : " + score);
    }
  };
  
  // Démarre le quiz en affichant la première question
  showQuestion();