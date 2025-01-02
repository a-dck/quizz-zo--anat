// Définition des questions organisées par chapitres
let chapters = [];
fetch('chapters.json')
    .then(response => response.json())
    .then(data => {
        chapters = data;
        showQuestion(); // Démarre le quiz une fois les données chargées
    })
    .catch(error => console.error('Erreur lors du chargement des chapitres :', error));


// Variables globales pour suivre le chapitre, la question actuelle, le score et si une réponse a déjà été donnée
let currentChapter = 0;
let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

// Ajout des effets sonores
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

// Affiche la question et les réponses sur la page
function showQuestion() {
    hasAnswered = false; // Réinitialise le statut de réponse pour la nouvelle question

    const chapterTitleElement = document.getElementById("chapter-title");
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const imageElement = document.getElementById("image-container");
    const progressElement = document.getElementById("progress");


    const chapter = chapters[currentChapter];
    const question = chapter.questions[currentQuestion];

    // Met à jour le titre du chapitre
    chapterTitleElement.textContent = chapter.title;

    // Met à jour la progression
    const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.questions.length, 0);
    const currentQuestionIndex = chapters.slice(0, currentChapter).reduce((sum, chapter) => sum + chapter.questions.length, 0) + currentQuestion + 1;
    progressElement.textContent = `Question ${currentQuestionIndex} sur ${totalQuestions}`;

    // Ajoute une animation de transition fluide pour la question
    questionElement.style.transition = "opacity 0.5s ease-in-out";
    questionElement.style.opacity = 0;

    setTimeout(() => {
        // Met à jour le texte de la question
        questionElement.textContent = question.question;

        // Vide les réponses précédentes
        answersElement.innerHTML = "";

        // Gère l'affichage de l'image si disponible
        if (question.image) {
            imageElement.innerHTML = `<img src="${question.image}" alt="Illustration" style="max-width: 100%; height: auto;">`;
        } else {
            imageElement.innerHTML = ""; // Efface toute image précédente
        }

        // Ajoute un bouton pour chaque réponse possible avec animation
        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.onclick = () => checkAnswer(index);

            // Applique une animation pour chaque bouton
            button.style.opacity = 0;
            button.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
            button.style.transform = "translateY(20px)";

            answersElement.appendChild(button);

            // Lance l'animation après un délai
            setTimeout(() => {
                button.style.opacity = 1;
                button.style.transform = "translateY(0)";
            }, 100 * index);
        });

        questionElement.style.opacity = 1; // Rétablit l'opacité après avoir mis à jour le contenu
    }, 500); // Délai pour laisser le temps à l'animation de disparition
}

// Affiche une question précédente sans permettre de modifier les réponses
function showPreviousQuestion() {
    const chapterTitleElement = document.getElementById("chapter-title");
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const imageElement = document.getElementById("image-container");
    const progressElement = document.getElementById("progress");

    if (currentQuestion > 0) {
        currentQuestion--;
    } else if (currentChapter > 0) {
        currentChapter--;
        currentQuestion = chapters[currentChapter].questions.length - 1;
    } else {
        alert("Vous êtes déjà à la première question.");
        return;
    }

    const chapter = chapters[currentChapter];
    const question = chapter.questions[currentQuestion];

    // Met à jour le titre du chapitre
    chapterTitleElement.textContent = chapter.title;

    // Met à jour la progression
    const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.questions.length, 0);
    const currentQuestionIndex = chapters.slice(0, currentChapter).reduce((sum, chapter) => sum + chapter.questions.length, 0) + currentQuestion + 1;
    progressElement.textContent = `Question ${currentQuestionIndex} sur ${totalQuestions}`;

    // Met à jour le texte de la question
    questionElement.textContent = question.question;

    // Gère l'affichage de l'image si disponible
    if (question.image) {
        imageElement.innerHTML = `<img src="${question.image}" alt="Illustration" style="max-width: 100%; height: auto;">`;
    } else {
        imageElement.innerHTML = ""; // Efface toute image précédente
    }

    // Affiche les réponses sans permettre de les modifier
    answersElement.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.disabled = true; // Désactive les boutons pour empêcher les modifications
        answersElement.appendChild(button);
    });
}

// Vérifie si la réponse sélectionnée est correcte
function checkAnswer(selected) {
    if (hasAnswered) return; // Empêche d'incrémenter le score ou de jouer des sons plusieurs fois

    hasAnswered = true; // Marque cette question comme répondue

    const chapter = chapters[currentChapter];
    const question = chapter.questions[currentQuestion];

    if (selected === question.correct) {
        score++;
        alert("Bonne réponse !");
        correctSound.play(); // Joue le son de bonne réponse
    } else {
        alert("Mauvaise réponse !");
        incorrectSound.play(); // Joue le son de mauvaise réponse
    }

    // Met à jour l'affichage du score
    document.getElementById("score").textContent = `Score : ${score}`;

    // Désactive les boutons après la réponse
    const buttons = document.getElementById("answers").getElementsByTagName("button");
    for (let button of buttons) {
        button.disabled = true;
    }
}

// Configure le bouton "Suivant"
document.getElementById("next").onclick = () => {
    const chapter = chapters[currentChapter];

    currentQuestion++;
    if (currentQuestion < chapter.questions.length) {
        showQuestion(); // Affiche la prochaine question du chapitre
    } else {
        currentChapter++;
        currentQuestion = 0;
        if (currentChapter < chapters.length) {
            showQuestion(); // Passe au prochain chapitre
        } else {
            alert("Quiz terminé ! Ton score : " + score); // Affiche un message de fin avec le score final
        }
    }
};

// Configure le bouton "Précédent"
const previousButton = document.createElement("button");
previousButton.textContent = "Question précédente";
previousButton.onclick = showPreviousQuestion;
document.body.insertBefore(previousButton, document.getElementById("next"));

// Démarre le quiz en affichant la première question
showQuestion();
