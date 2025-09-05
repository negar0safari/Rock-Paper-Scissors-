document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const userChoiceDisplay = document.getElementById('user-choice-display');
    const computerChoiceDisplay = document.getElementById('computer-choice-display');
    const userScoreElement = document.getElementById('user-score');
    const computerScoreElement = document.getElementById('computer-score');
    const roundResultElement = document.getElementById('round-result');
    const selectionButtons = document.querySelectorAll('.selection-btn');
    const resetButton = document.getElementById('reset-btn');
    
    // Game variables
    let userScore = 0;
    let computerScore = 0;
    let roundCount = 0;
    
    // Image paths
    const images = {
        rock: 'images/rock.png',
        paper: 'images/paper.png',
        scissors: 'images/scissors.png',
        question: 'images/question-mark.png'
    };
    
    // Game logic
    function playRound(userChoice) {
        roundCount++;
        
        // Display user choice
        displayChoice(userChoiceDisplay, userChoice, 'You chose: ');
        
        // Computer makes random choice
        const computerChoice = getComputerChoice();
        displayChoice(computerChoiceDisplay, computerChoice, 'Computer chose: ');
        
        // Determine winner
        const result = determineWinner(userChoice, computerChoice);
        
        // Update scores and display result
        updateScore(result);
        displayResult(result, userChoice, computerChoice);
    }
    
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }
    
    function displayChoice(displayElement, choice, prefix) {
        const choiceImage = displayElement.querySelector('.selection-image');
        const choiceText = displayElement.querySelector('.selection-text');
        
        choiceImage.src = images[choice] || images.question;
        choiceImage.alt = choice.charAt(0).toUpperCase() + choice.slice(1);
        choiceText.textContent = prefix + choice.charAt(0).toUpperCase() + choice.slice(1);
    }
    
    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'draw';
        }
        
        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };
        
        return winConditions[userChoice] === computerChoice ? 'user' : 'computer';
    }
    
    function updateScore(result) {
        if (result === 'user') {
            userScore++;
            userScoreElement.textContent = userScore;
        } else if (result === 'computer') {
            computerScore++;
            computerScoreElement.textContent = computerScore;
        }
    }
    
    function displayResult(result, userChoice, computerChoice) {
        let resultMessage = '';
        
        switch (result) {
            case 'user':
                resultMessage = `You win! ${capitalizeFirstLetter(userChoice)} beats ${capitalizeFirstLetter(computerChoice)}`;
                break;
            case 'computer':
                resultMessage = `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(userChoice)}`;
                break;
            case 'draw':
                resultMessage = `It's a draw! Both chose ${capitalizeFirstLetter(userChoice)}`;
                break;
        }
        
        roundResultElement.textContent = resultMessage;
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function resetGame() {
        userScore = 0;
        computerScore = 0;
        roundCount = 0;
        
        userScoreElement.textContent = '0';
        computerScoreElement.textContent = '0';
        roundResultElement.textContent = 'Make your move!';
        
        // Reset choice displays
        displayChoice(userChoiceDisplay, 'question', 'Waiting...');
        displayChoice(computerChoiceDisplay, 'question', 'Waiting...');
    }
    
    // Event listeners
    selectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userChoice = button.dataset.choice;
            playRound(userChoice);
        });
    });
    
    resetButton.addEventListener('click', resetGame);
    
    // Initialize displays
    displayChoice(userChoiceDisplay, 'question', 'Waiting...');
    displayChoice(computerChoiceDisplay, 'question', 'Waiting...');
});