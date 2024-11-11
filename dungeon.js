var createDeck = document.getElementById("createDeck");
var addQuestions = document.getElementById("addQuestions");
var addQuestionsForm = document.getElementById("addQuestionsForm");
var home = document.getElementById("home")
var dungeon =document.getElementById("dungeon")
var chooseDeck = document.getElementById("chooseDeck")
var questionToAnswer = document.getElementById("questionToAnswer")
var dungeonQuestion = document.getElementById("dungeonQuestion")
var dungeonAnswer = document.getElementById("dungeonAnswer")
var yourAnswer = document.getElementById("yourAnswer")
var submitAnswerBtn = document.getElementById("submitAnswerBtn")
var myCoinSpan = document.getElementById("myCoinSpan")
var addDeckBtn = document.getElementById("addDeckBtn")
var myDeckBtn = document.getElementById("addDeckBtn")
var clearedDungeonAddCoins  = document.getElementById("clearedDungeonAddCoins")
var enemyMinusHP  = document.getElementById("enemyMinusHP")


var deckArray = [];
var questionsArray = [];
var currentDeckIndex = null;
var deckSelections = document.getElementById("deckSelections");
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


function clearAllDiv(){
    home.style.display="none";
    createDeck.style.display="none";
    addQuestions.style.display="none";
    chooseDeck.style.display="none";
    dungeon.style.display="none";
}

createDeck.addEventListener('submit',(e)=>{
    e.preventDefault();
    clearAllDiv();
    addDeck();
    
    addQuestions.style.display="block";
    renderDeckList(false); // Render the updated deck list
})

function createDeckFunc(){
    console.log("createDeckFunc triggered");
    clearAllDiv();
    createDeck.style.display="block";
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
    clearAllDiv();
    home.style.display="block";
}

function viewMyDeckFunc(){
    clearAllDiv();
    chooseDeck.style.display="block";
    
    renderDeckList(false);
}

function startSelectDeckFunc(){
    clearAllDiv();
    chooseDeck.style.display="block";
    renderDeckList(true);
}

// Function to render the list of created decks
function renderDeckList(goDungeon) {
    if(!goDungeon){
        addDeckBtn.style.display="block";
    } else {
        addDeckBtn.style.display="none";

    }
    // Clear previous list
    deckSelections.innerHTML = ""; // Clear any previous entries

    // Loop through the deckArray and create a button for each deck
    deckArray.forEach((deck, index) => {
        var deckContainer = document.createElement("div");
        deckContainer.className = "deck-container";
        deckContainer.style.textAlign = "center"; // Center-align the text
        deckContainer.style.display = "inline-block"; // Keep elements in-line
        deckContainer.style.margin = "10px"; // Add spacing around each deck
        if(goDungeon)
            deckContainer.onclick = () => selectDeck(index);
        else
            deckContainer.onclick = () => viewDeck();

        var bookImg = document.createElement("img");
        bookImg.src = "./Icons/redBook.png";
        bookImg.title = deck.deckName;
        bookImg.className = "deck-image";
        bookImg.style.cursor="pointer";
        bookImg.style.width= "100px";
        
        var deckNameText = document.createElement("p");
        deckNameText.className = "deck-name-text";
        deckNameText.textContent = deck.deckName;
        deckNameText.style.marginTop = "5px"; // Add some space above the text

        // Append image and text to the container div
        deckContainer.appendChild(bookImg);
        deckContainer.appendChild(deckNameText);

        // Append the container div to the main deck selection area
        deckSelections.appendChild(deckContainer);
    });

    
}

function viewDeck(){
    
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

function displayRandomQuestion() {
    if (currentDeckIndex !== null && deckArray[currentDeckIndex].questions.length > 0) {
        // Get a random index from the questions array
        do {
            randomIndex = Math.floor(Math.random() * deckArray[currentDeckIndex].questions.length);
        } while (shownQuestions.includes(randomIndex));  // Ensure the question hasn't been displayed already

        
        // If all questions have been shown
        

        const question = deckArray[currentDeckIndex].questions[randomIndex].question;
        
        // Set the question in the span with id "questionToAnswer"
        questionToAnswer.textContent = question;
        document.getElementById("dungeonQuestion").style.display = "block"; // Show the question div
    } else {
        questionToAnswer.textContent = "You Cleared the Dungeon!";
        document.getElementById("dungeonQuestion").style.display = "none"; // Show the question div
    }
}

function checkCorrectness(){
    var correctAnswer = deckArray[currentDeckIndex].questions[randomIndex].answer;

    if (yourAnswer.value.toLowerCase() == correctAnswer.toLowerCase()) {
        updateCorrectAnswer();
        shownQuestions.push(randomIndex);// Add the randomIndex to the shownQuestions array to prevent it from being displayed again
    } else {
        updateWrongAnswer();
    }
    if (shownQuestions.length == deckArray[currentDeckIndex].questions.length) {
            dungeonCleared();
            return;
    } else {
        displayRandomQuestion();
    }
}

function updateCorrectAnswer(){
    //if one questions left
    if (shownQuestions.length+1 == deckArray[currentDeckIndex].questions.length) {
        enemyMinusHP.textContent= "-" + String(enemyHP);
        enemyMinusHP.style.display="block";
        setTimeout(() => {
            enemyMinusHP.style.display = "none";
        }, 1500); // 1 second delay
        enemyHP = 0;
        enemyHPSpan.textContent = enemyHP;
        //enemyDies();
        dungeonCleared();
        return;
    }

    enemyMinusHP.textContent= "-30";
    enemyMinusHP.style.display="block";
    setTimeout(() => {
        enemyMinusHP.style.display = "none";
    }, 1500); // 1 second delay

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
    

    //have some questions left
    if (shownQuestions.length != deckArray[currentDeckIndex].questions.length) {
        setTimeout(() => {
            enemy.style.display = "inline-block"; // Show next enemy
            enemyHP = 100;
            enemyHPSpan.textContent = enemyHP;
        }, 1000); // 1 second delay
    }
}

function updateWrongAnswer(){
    myHP-=30;
    if(myHP <= 0) {
        myHP = 0;
        myHPSpan.textContent = myHP;
        weDie();
    } else {
        myHPSpan.textContent = myHP;
    }

}

function weDie(){
    myCharacter.style.display = "none";
    shownQuestions = [];
    document.getElementById("loseDiv").style.display="block";
}


function updateCoins(val){
    myCoins += val;
    localStorage.setItem("myCoins", myCoins);
    myCoinSpan.textContent = myCoins;
}

function dungeonCleared(){
    updateCoins(20);
    enemy.style.display = "none";
    document.getElementById("winDiv").style.display="block";
    document.getElementById("dungeonQADiv").style.display="none";
}




