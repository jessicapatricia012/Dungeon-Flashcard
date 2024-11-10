var createDeck = document.getElementById("createDeck");
var addQuestions = document.getElementById("addQuestions");
var home = document.getElementById("home")
var deckArray = [];
var questionsArray = [];
var currentDeckIndex = null;


createDeck.addEventListener('submit',(e)=>{
    e.preventDefault();

    addDeck();
    createDeck.style.display="none";
    addQuestions.style.display="block";

})

function createDeckFunc(){
    createDeck.style.display="block"
    home.style.display="none"
}

function addDeck(){
    var deckName = document.getElementById("deckName").value;
    deckArray.push({ deckName: deckName, questions: [] });
    currentDeckIndex = deckArray.length - 1;

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

    console.log("Questions Array:", deckArray);
}

function homeFunc(){
    addQuestions.style.display="none";
    home.style.display="block"
}