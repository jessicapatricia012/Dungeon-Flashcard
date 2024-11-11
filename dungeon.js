var createDeck = document.getElementById("createDeck");
var addQuestions = document.getElementById("addQuestions");
var home = document.getElementById("home")
var dungeon =document.getElementById("dungeon")
var chooseDeck = document.getElementById("chooseDeck")
var questionToAnswer = document.getElementById("questionToAnswer")
var dungeonQuestion = document.getElementById("dungeonQuestion")
var dungeonAnswer = document.getElementById("dungeonAnswer")
var yourAnswer = document.getElementById("yourAnswer")
var submitAnswerBtn = document.getElementById("submitAnswerBtn")
var myCoinSpan = document.getElementById("myCoinSpan")

var deckArray = [];
var questionsArray = [];
var currentDeckIndex = null;
var deckSelectionBtns = document.getElementById("deckSelectionBtns");
var randomIndex;
var shownQuestions = [];

var enemy = document.getElementById("enemy")

var myCoins = 0;

var myHPSpan = document.getElementById("myHPSpan")
var enemyHPSpan = document.getElementById("enemyHPSpan")
var enemyHP = 100;
var myHP = 100;


// Retrieve stored data from localStorage (if any)
if (localStorage.getItem("deckArray")) {
    deckArray = JSON.parse(localStorage.getItem("deckArray"));
    //renderDeckList(); // Render the saved deck list when the page loads
}

if (localStorage.getItem("myCoins")) {
    myCoins = parseInt(localStorage.getItem("myCoins"));
    myCoinSpan.textContent = myCoins;  // Display saved coins
} else {
    myCoins = 0;  // Default to 0 if no coins are stored
}

myCoinSpan.textContent= myCoins;
myHPSpan.textContent = myHP;
enemyHPSpan.textContent = enemyHP;

createDeck.addEventListener('submit',(e)=>{
    e.preventDefault();

    addDeck();
    createDeck.style.display="none";
    addQuestions.style.display="block";
    renderDeckList(); // Render the updated deck list
})

function createDeckFunc(){
    createDeck.style.display="block"
    home.style.display="none"
}

function addDeck(){
    var deckName = document.getElementById("deckName").value;
    deckArray.push({ deckName: deckName, questions: [] });
    currentDeckIndex = deckArray.length - 1;

    localStorage.setItem("deckArray", JSON.stringify(deckArray));
}


addQuestions.addEventListener('submit',(e)=>{
    e.preventDefault();

    addQuestionsFunc();
    addQuestionsForm.reset(); // Clear the form for the next question

})

function addQuestionsFunc(){
    var question = document.getElementById("questions").value;
    var answer = document.getElementById("answer").value;

    // Add the question-answer pair to the array
    if (currentDeckIndex !== null) {
        deckArray[currentDeckIndex].questions.push({ question: question, answer: answer });
    }

    localStorage.setItem("deckArray", JSON.stringify(deckArray));

    console.log("Questions Array:", deckArray);
}

function homeFunc(){
    addQuestions.style.display="none";
    home.style.display="block";
    chooseDeck.style.display="none";
    dungeon.style.display="none";
}

function startSelectDeckFunc(){
    home.style.display="none";
    chooseDeck.style.display="block";
    renderDeckList();
}

// Function to render the list of created decks
function renderDeckList() {
    // Clear previous list
    deckSelectionBtns.innerHTML = ""; // Clear any previous entries

    // Loop through the deckArray and create a button for each deck
    deckArray.forEach((deck, index) => {
        var button = document.createElement("button");
        button.textContent = deck.deckName;
        button.onclick = () => selectDeck(index); // Select deck on click
        deckSelectionBtns.appendChild(button);
    });
}

// Function to handle selecting a deck
function selectDeck(index) {
    currentDeckIndex = index;
    addQuestions.style.display = "none";
    chooseDeck.style.display = "none";
    dungeon.style.display="block";

    startDungeon();
    
}

// Function to handle starting the selected deck
function startSelectedDeck() {
    if (currentDeckIndex !== null) {
        console.log("Starting Deck:", deckArray[currentDeckIndex]);
        addQuestions.style.display = "block"; // Show add questions form for selected deck
        chooseDeck.style.display = "none"; // Hide deck selection
    } else {
        alert("Please select a deck to start.");
    }
}

function startDungeon(){
    showEnemy();
    
}


function displayRandomQuestion() {
    if (currentDeckIndex !== null && deckArray[currentDeckIndex].questions.length > 0) {
        // Get a random index from the questions array
        do {
            randomIndex = Math.floor(Math.random() * deckArray[currentDeckIndex].questions.length);
        } while (shownQuestions.includes(randomIndex));  // Ensure the question hasn't been displayed already

        // Add the randomIndex to the shownQuestions array to prevent it from being displayed again
        shownQuestions.push(randomIndex);

        // If all questions have been shown, reset shownQuestions to allow repeating questions
        if (shownQuestions.length === deckArray[currentDeckIndex ].questions.length) {
            shownQuestions = [];
        }

        const question = deckArray[currentDeckIndex].questions[randomIndex].question;
        
        // Set the question in the span with id "questionToAnswer"
        questionToAnswer.textContent = question;
        document.getElementById("dungeonQuestion").style.display = "block"; // Show the question div
    } else {
        questionToAnswer.textContent = "No questions available!";
        document.getElementById("dungeonQuestion").style.display = "block"; // Show the question div
    }
}

function showEnemy() {
    setTimeout(() => {
        enemy.style.display = "inline-block"; // Show the second icon
    }, 500); // 1 seconds delay

    setTimeout(() => {
        dungeonQuestion.style.display = "inline-block"; // Show the second icon
        displayRandomQuestion();
    }, 1000); // 3 seconds delay

    setTimeout(() => {
        dungeonAnswer.style.display = "inline-block"; // Show the second icon
    }, 1500); // 5 seconds delay
}

function checkCorrectness(){
    var correctAnswer = deckArray[currentDeckIndex].questions[randomIndex].answer;

    if (yourAnswer.value.toLowerCase() == correctAnswer.toLowerCase()) {
        updateCorrectAnswer();
        displayRandomQuestion();
     } else {
        updateWrongAnswer();
        alert("Incorrect! The correct answer was: " + correctAnswer);
    }

}

function updateCorrectAnswer(){
    enemyHP-=30;
    if(enemyHP <= 0) {
        enemyHP = 0;
        enemyHPSpan.textContent = enemyHP;
        enemyDies();
    } else {
        enemyHPSpan.textContent = enemyHP;
    }
}

function enemyDies(){
    enemy.style.display = "none";
    updateCoins(20);
}

function updateWrongAnswer(){
    myHP-=30;
    myHPSpan.textContent = myHP;
}


function updateCoins(val){
    myCoins += val;
    localStorage.setItem("myCoins", myCoins);
    myCoinSpan.textContent = myCoins;
}




