let request = new XMLHttpRequest();

request.open('GET', 'http://localhost:5555/admin/vocabulary/');

request.onload = function () {
    if (request.status === 200) {
        const vocabData = JSON.parse(request.responseText);

        if (vocabData && vocabData.length > 0) {
            let randomVocab = [];
            for (let i = 0; i < 20; i++) {
                let randomIndex = Math.floor(Math.random() * vocabData.length);
                randomVocab.push(vocabData[randomIndex]);
            }

            let currentQuestionIndex = 0;
            displayQuestion(currentQuestionIndex);

            const speakusButton = document.getElementById("speakus");
            const speakukButton = document.getElementById("speakuk");
            const showAnswerButton = document.getElementById("show-answer");
            const checkButton = document.getElementById("check");
            const answerInput = document.getElementById("answerToCheck");
            const nextButton = document.getElementById("next");
            const prevButton = document.getElementById("prev");
            const answerDisplayed = document.getElementById("answerDisplayed");
            const answerAlert = document.getElementById("answer-alert");

            speakusButton.addEventListener("click", () => {
                playAudio(`https://www.oxfordlearnersdictionaries.com/${randomVocab[currentQuestionIndex].soundus}`);
            });

            speakukButton.addEventListener("click", () => {
                playAudio(`https://www.oxfordlearnersdictionaries.com/${randomVocab[currentQuestionIndex].sounduk}`);
            });

            showAnswerButton.addEventListener("click", () => {
                answerAlert.style.display = "none";
                answerDisplayed.innerHTML = `${randomVocab[currentQuestionIndex].vocabulary} (${randomVocab[currentQuestionIndex].type}): ${randomVocab[currentQuestionIndex].translate}`;
                answerDisplayed.style.display = "block";
            });

            checkButton.addEventListener("click", () => {
                const userAnswer = answerInput.value.trim().toLowerCase();
                const correctAnswer = randomVocab[currentQuestionIndex].translate.trim().toLowerCase();

                if (userAnswer === correctAnswer) {
                    answerAlert.innerHTML = "Correct!";
                    answerAlert.style.display = "block";
                } else {
                    answerAlert.innerHTML = "Incorrect.";
                    answerAlert.style.display = "block";
                }
            });

            answerInput.addEventListener("keyup", (event) => {
                if (event.keyCode === 13) {
                    checkButton.click();
                }
            });

            nextButton.addEventListener("click", () => {
                answerAlert.style.display = "none";
                answerDisplayed.innerHTML = "";
                answerDisplayed.style.display = "none";
                answerInput.style.display = "block";

                currentQuestionIndex++;

                if (currentQuestionIndex >= randomVocab.length) {
                    currentQuestionIndex = 0;
                }

                displayQuestion(currentQuestionIndex);
            });

            prevButton.addEventListener("click", () => {
                answerAlert.style.display = "none";
                answerDisplayed.innerHTML = "";
                answerDisplayed.style.display = "none";
                answerInput.style.display = "block";

                currentQuestionIndex--;

                if (currentQuestionIndex < 0) {
                    currentQuestionIndex = randomVocab.length - 1;
                }

                displayQuestion(currentQuestionIndex);
            });

            function displayQuestion(index) {
                const exampleArray = randomVocab[index].example;
                const randomExampleIndex = Math.floor(Math.random() * exampleArray.length);
                const question = exampleArray[randomExampleIndex];

                const questionNumber = index + 1;
                const totalQuestions = randomVocab.length;
                document.getElementById("questionDisplayed").innerHTML = question;
                document.getElementById("questionCount").innerHTML = `${questionNumber}/${totalQuestions}`;
                answerInput.value = "";

            }

            function playAudio(url) {
                const audio = new Audio(url);
                audio.play();
            }
        } else {
            console.error("Cannot get vocab data from the server");
        }
    } else {
        console.error("Network response was not ok.");
    }
};

request.onerror = function () {
    console.error("An error occurred fetching the data.");
};

request.send();