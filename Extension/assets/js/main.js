fetch('http://localhost:5555/admin/vocabulary/')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        const vocabData = data;

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

        speakusButton.addEventListener("click", () => {
            console.log();
            playAudio(`https://www.oxfordlearnersdictionaries.com/${randomVocab[currentQuestionIndex].soundus}`);
        });

        speakukButton.addEventListener("click", () => {
            playAudio(`https://www.oxfordlearnersdictionaries.com/${randomVocab[currentQuestionIndex].sounduk}`);
        });

        showAnswerButton.addEventListener("click", () => {
            document.getElementById("answerDisplayed").innerHTML = randomVocab[currentQuestionIndex].translate;
        });

        checkButton.addEventListener("click", () => {
            const userAnswer = answerInput.value.trim().toLowerCase();
            const correctAnswer = randomVocab[currentQuestionIndex].translate.trim().toLowerCase();

            if (userAnswer === correctAnswer) {
                alert("Correct!");
            } else {
                alert("Incorrect");
            }
        });

        answerInput.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                checkButton.click();
            }
        });

        nextButton.addEventListener("click", () => {
            currentQuestionIndex++;
            if (currentQuestionIndex >= 20) {
                currentQuestionIndex = 0;
            }
            displayQuestion(currentQuestionIndex);
        });

        function displayQuestion(index) {
            const exampleArray = randomVocab[index].example;
            const randomExampleIndex = Math.floor(Math.random() * exampleArray.length);
            const question = exampleArray[randomExampleIndex];

            const answerInput = document.getElementById("answerToCheck");
            document.getElementById("answerDisplayed").innerHTML = '<textarea id="answerToCheck" type="text" placeholder="Enter Your Answer..."></textarea>';

            answerInput.value = "";
            answerInput.focus();
            document.getElementById("questionDisplayed").innerHTML = question;
        }
        function playAudio(url) {
            const audio = new Audio(url);
            audio.play();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });