var request = new XMLHttpRequest();
request.open("GET", "https://api.myjson.com/bins/ujlls", false);
request.send(null);
var questionList = JSON.parse(request.responseText);

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const wrongAnswer = document.getElementById('wrongAnswer');


$(document).ready((function() {
    const tryGame = document.getElementById("game");
    tryGame.style='none';
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      questionList.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${currentQuestion.answers[letter]}
             </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div id="answerz" class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
      const wrongAnswers = quizContainer.querySelectorAll(".answers");
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      questionList.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer;
        if ((answerContainer.querySelector(selector) || {}).value == 0)
        {
            userAnswer = 'a';
        }
        else if ((answerContainer.querySelector(selector) || {}).value == 1)
        {
            userAnswer = 'b';
        }
        else if ((answerContainer.querySelector(selector) || {}).value == 2)
        {
            userAnswer = 'c';
        }
  
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if answer is wrong or blank
          // color the answers red
          answerContainers[questionNumber].style = "center";
          answerContainers[questionNumber].style.color = "red";
          answerContainers[questionNumber].innerHTML+="<div id=\"wrong\">"+currentQuestion.explanation+"</p>";
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `<h4>Your score: ${numCorrect} out of ${questionList.length}</h4>`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
      
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }

      if (currentSlide >= slides.length){
        tryGame.style.display="inline-block";
      }
      else{
        tryGame.style.display ="none";
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }

    function displayGameBtn(){
        tryGame.style.display ="inline-block";
    }

    function redirectToGame(){
        location.href="./flappypanel.html";
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
  
    // display quiz right away
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
    submitButton.addEventListener("click", displayGameBtn);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
    tryGame.addEventListener("click",redirectToGame);
  }));
