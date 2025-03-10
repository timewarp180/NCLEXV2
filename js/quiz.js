// Quiz State Management
let currentQuestion = 0;
let timeElapsed = 0;
let userAnswers = Array(questions.length).fill().map(() => ({
    answer: null,
    flagged: false,
    confidence: 'Not rated',
    timeSpent: 0
}));
let timerInterval;


// DOM Elements
const questionText = document.querySelector('.question-text');
const questionBody = document.getElementById('question-body');
const nextBtn = document.querySelector('.next-btn');
const progressBar = document.querySelector('.progress-bar');
const timerDisplay = document.querySelector('.timer');
const totalQuestions = document.getElementById('total-q');
const prevBtn = document.querySelector('.prev-btn');

// Initialize Quiz
document.addEventListener('DOMContentLoaded', () => {
    const savedSession = localStorage.getItem('activeQuiz');
    if(savedSession) {
        if(confirm('Would you like to resume your previous quiz?')) {
            const session = JSON.parse(savedSession);
            currentQuestion = session.currentQuestion;
            timeElapsed = session.timeElapsed;
            userAnswers = session.userAnswers;
        }
    }
    
    // Add session autosave (AFTER timerInterval)
    setInterval(saveSession, 30000);
    // Load first question
    loadQuestion(currentQuestion);
    
    // Start timer
    timerInterval = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = formatTime(timeElapsed);
    }, 1000);

    
});

prevBtn.addEventListener('click', () => {
    if(currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
});
// Add session saving function (BEFORE helper functions)
function saveSession() {
    const session = {
        currentQuestion,
        timeElapsed,
        userAnswers
    };
    localStorage.setItem('activeQuiz', JSON.stringify(session));
}

const showError = (message, isWarning = false) => {
    const errorEl = document.createElement('div');
    errorEl.className = `alert ${isWarning ? 'alert-warning' : 'alert-danger'} position-fixed top-0 start-50 translate-middle-x mt-3`;
    errorEl.textContent = message;
    document.body.appendChild(errorEl);
    setTimeout(() => errorEl.remove(), 3000);
};


// Question Loader
// In quiz.js - Update loadQuestion function
function loadQuestion(index) {
    initPagination();

    // Get question FIRST
    const q = questions[index];

    // Initialize answer object if not exists
    if(!userAnswers[currentQuestion]) {
        userAnswers[currentQuestion] = {
            answer: null,
            flagged: false,
            confidence: 'Not rated',
            timeSpent: 0
        };
    }

    // Restore previous answer if exists - NOW q IS DEFINED
    if(userAnswers[index]) restoreAnswer(q.type, userAnswers[index].answer);

     // Restore confidence level
     const confidenceBtns = document.querySelectorAll('.confidence-meter .btn');
     confidenceBtns.forEach(btn => {
         btn.classList.remove('active');
         if(btn.textContent === (userAnswers[index]?.confidence || 'Not rated')) {
             btn.classList.add('active');
         }
     });
 

    // Rest of the function remains the same...
    totalQuestions.textContent = questions.length;
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === questions.length - 1 
        ? 'Submit Quiz' 
        : 'Next Question →';

    // Update progress
    progressBar.style.width = `${(index/questions.length)*100}%`;
    document.getElementById('current-q').textContent = index + 1;
    
    // Render question
    questionText.innerHTML = `
        ${q.text}
        <span class="badge bg-${getDifficultyColor(q.difficulty)} ms-2">
            ${q.difficulty.toUpperCase()}
        </span>
    `;
    
    questionBody.innerHTML = generateQuestionHTML(q);
    
    // Update flag button state
    const flagBtn = document.querySelector('.flag-btn');
    flagBtn.classList.toggle('flagged', userAnswers[index]?.flagged || false);
}

// Add to loadQuestion function
// In quiz.js - Update initPagination function
function initPagination() {
    const container = document.getElementById('question-pagination');
    container.innerHTML = questions.map((_, i) => {
        let btnClass = 'btn-outline-primary';
        if(i === currentQuestion) {
            btnClass = 'btn-primary';
        } else if (userAnswers[i]?.answer !== null) {
            btnClass = 'btn-success';
        }
        // Add flag indicator
        const flagIndicator = userAnswers[i]?.flagged 
            ? '<i class="fas fa-flag ms-2 text-danger"></i>' 
            : '';
            
        return `
        <button class="btn btn-sm ${btnClass} pagination-btn"
                data-index="${i}">
            ${i + 1} ${flagIndicator}
        </button>
    `}).join('');
    
    document.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentQuestion = parseInt(e.target.dataset.index);
            loadQuestion(currentQuestion);
        });
    });
}
// Add this helper function ABOVE loadQuestion
function getDifficultyColor(difficulty) {
    return {
        easy: 'success',
        medium: 'warning',
        hard: 'danger'
    }[difficulty];
}

// Answer Handling
function handleAnswer() {
    const q = questions[currentQuestion];
    const answer = getAnswer(q.type);
    let isValid = true;

    // Type-specific validation
    switch(q.type) {
        case 'select-all':
            isValid = answer.length > 0;
            break;
        case 'fill-blank':
            isValid = answer.trim() !== '';
            break;
        default:
            isValid = !!answer;
    }
    
    // ... rest of handleAnswer logic ...
  // Always save answer
    userAnswers[currentQuestion] = {
        answer: answer,
        flagged: document.querySelector('.flag-btn').classList.contains('flagged'),
        confidence: document.querySelector('.confidence-meter .btn.active')?.textContent || 'Not rated',
        timeSpent: timeElapsed - (userAnswers[currentQuestion]?.timeSpent || 0)
    };

    return isValid;
}

function showValidationError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.textContent = message;
    questionBody.after(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 3000);
}
// Navigation Controls
nextBtn.addEventListener('click', () => {
    if(handleAnswer()) { // Saves answer automatically
        if(currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion(currentQuestion);
        } else {
            submitQuiz();
        }
    } else {
        showError('Please provide an answer before proceeding!');
    }
});

// Add previous button handler
prevBtn.addEventListener('click', () => {
    handleAnswer(); // Save current answer before leaving
    if(currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
});

function showLoading() {
    const loader = `<div class="loader-overlay">
        <div class="spinner-border text-primary"></div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', loader);
}
function hideLoading() {
    document.querySelector('.loader-overlay')?.remove();
}



// Quiz Submission
async function submitQuiz() {
    showLoading();
    clearInterval(timerInterval);
    
    const results = {
        score: 0,
        totalTime: timeElapsed,
        questions: []
    };
    
    questions.forEach((q, index) => {
        const answerData = userAnswers[index] || { answer: null };
        const isCorrect = checkAnswer(q, answerData.answer || {});
        
        results.questions.push({
            ...q,
            userAnswer: answerData.answer,
            correct: isCorrect,
            timeSpent: answerData.timeSpent || 0,
            flagged: answerData.flagged || false
        });
        
        if(isCorrect) results.score++;
    });
    
    saveResults(results);
    // Add this line to store current result
    localStorage.setItem('currentResult', JSON.stringify(results));
    hideLoading();
    window.location.href = 'results.html';
}

// Helper Functions
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function generateQuestionHTML(question) {
    let html = '';
    switch(question.type) {
        case 'multiple-choice':
            html = `<div class="form-group">${question.options.map((opt, i) => `
                <div class="form-check mb-2">
                    <input aria-labelledby="question-text" class="form-check-input" type="radio" name="answer" id="opt${i}" value="${opt}">
                    <label class="form-check-label" for="opt${i}">${opt}</label>
                </div>`).join('')}
            </div>`;
            break;
            
        case 'select-all':
            html = `<div class="form-group">${question.options.map((opt, i) => `
                <div class="form-check mb-2">
                    <input aria-labelledby="question-text" class="form-check-input" type="checkbox" name="answer" id="opt${i}" value="${opt}">
                    <label class="form-check-label" for="opt${i}">${opt}</label>
                </div>`).join('')}
            </div>`;
            break;
            
        case 'fill-blank':
            html = `<div class="input-group">
                <input aria-labelledby="question-text" type="text" class="form-control" placeholder="Enter your answer">
            </div>`;
            break;
            
            case 'priority':
                html = `<div class="priority-grid">
                    ${question.options.map(opt => `
                        <div class="priority-item" data-value="${opt}">
                            <div class="priority-card">
                                <span class="handle">↕</span>
                                ${opt}
                            </div>
                        </div>
                    `).join('')}
                </div>`;
            
                // Add this error-boundary initialization
                setTimeout(() => {
                    const container = document.querySelector('.priority-grid');
                    if(container) {
                        new Sortable(container, {
                            animation: 150,
                            handle: '.priority-card', // Changed from '.handle'
                            filter: '.ignore-elements', // Add if needed            
                            onUpdate: () => handleAnswer()
                        });
                    } else {
                        console.error('Priority grid container not found');
                        showError('Could not initialize prioritization interface', true);
                    }
                }, 0);
                break;
            
        case 'medication-matching':
            html = `<table class="table">
                ${question.pairs.map(pair => `
                <tr>
                    <td>${pair.medication}</td>
                    <td>
                        <select  aria-describedby="scenario-text" class="form-select">
                            ${question.options.map(opt => `
                            <option value="${opt}">${opt}</option>`).join('')}
                        </select>
                    </td>
                </tr>`).join('')}
            </table>`;
            break;
            
            case 'scenario-dropdown':
                // Change 'q' to 'question' to match function parameter
                const parts = question.text.split(/({\d+})/g);
                
                let scenarioHTML = `<div class="scenario-text mb-4">`;
                parts.forEach(part => {
                    if(part.match(/{\d+}/)) {
                        const num = part.match(/\d+/)[0];
                        scenarioHTML += `
                            <select class="scenario-select" data-part="${num}">
                                <option value="">Select</option>
                                ${question.parts[num].options.map(opt => `
                                    <option value="${opt}">${opt}</option>
                                `).join('')}
                            </select>
                        `;
                    } else {
                        scenarioHTML += part;
                    }
                });
                scenarioHTML += `</div>`;
                html = scenarioHTML;
                break;
    }
    return html;
}

// Add confidence meter functionality
document.querySelectorAll('.confidence-meter .btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.confidence-meter .btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        userAnswers[currentQuestion].confidence = this.textContent;
    });
});

// Flagging system
document.querySelector('.flag-btn').addEventListener('click', function() {
    if(!userAnswers[currentQuestion]) {
        userAnswers[currentQuestion] = {
            answer: null,
            flagged: false,
            confidence: 'Not rated',
            timeSpent: 0
        };
    }
    
    const newFlagState = !userAnswers[currentQuestion].flagged;
    this.classList.toggle('flagged', newFlagState);
    userAnswers[currentQuestion].flagged = newFlagState;
    
    // Add visual feedback
    const flagStatus = newFlagState ? 'Flagged' : 'Unflagged';
    showError(`Question ${currentQuestion + 1} ${flagStatus}!`, true);
    
    // Force pagination update
    initPagination();
});

// Text size controls
document.querySelectorAll('.text-size-control button').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const currentSize = parseInt(getComputedStyle(document.documentElement).fontSize);
        const newSize = index === 0 ? currentSize - 2 : currentSize + 2;
        document.documentElement.style.fontSize = `${newSize}px`;
        localStorage.setItem('textSize', `${newSize}px`);
    });
});

// LocalStorage Management
function saveResults(results) {
    const allResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    results.date = new Date().toISOString();
    allResults.push(results);
    localStorage.setItem('quizResults', JSON.stringify(allResults));
}

// Validation Functions
function getAnswer(type) {
    switch(type) {
        case 'multiple-choice':
            return document.querySelector('input[name="answer"]:checked')?.value;
        case 'select-all':
            return Array.from(document.querySelectorAll('input[name="answer"]:checked'))
                .map(checkbox => checkbox.value);
        case 'fill-blank':
            return document.querySelector('input[type="text"]').value.trim();
        case 'priority':
            return Array.from(document.querySelectorAll('.priority-item'))
                .map(item => item.dataset.value);
        case 'medication-matching':
            return Array.from(document.querySelectorAll('select'))
                .map(select => select.value);
        case 'scenario-dropdown':
        const selections = {};
        document.querySelectorAll('.scenario-select').forEach(select => {
            selections[select.dataset.part] = select.value;
        });
        return selections;
        }
}

// Complete checkAnswer function
function checkAnswer(question, userAnswer) {
    if (!question || !userAnswer) return false;

    if(question.type === 'scenario-dropdown') {
        if(!question.parts || !userAnswer) return false;
        return Object.keys(question.parts).every(key => 
            userAnswer[key] === question.parts[key].correct
        );
    }

    const correct = question.correctAnswer;
    
    switch(question.type) {
        case 'multiple-choice':

            case 'scenario-dropdown':
                // Add robust null checking
                if (!question.parts || typeof question.parts !== 'object') return false;
                if (!userAnswer || typeof userAnswer !== 'object') return false;
                
                return Object.keys(question.parts).every(key => {
                    const correctValue = question.parts[key]?.correct;
                    return userAnswer[key] === correctValue;
                });
    
        case 'select-all':
            return arraysEqual([...userAnswer].sort(), [...correct].sort());
        case 'fill-blank':
            return correct.some(c => c.toLowerCase() === userAnswer.toLowerCase().trim());
        case 'priority':
            return arraysEqual(userAnswer, correct);
            case 'medication-matching':
                const expected = question.pairs.map(p => p.correctMatch);
                return arraysEqual(userAnswer, expected);
                
    }
}

function arraysEqual(a, b) {
    return Array.isArray(a) && 
           Array.isArray(b) && 
           a.length === b.length && 
           a.every((val, i) => val === b[i]);
}

function restoreAnswer(type, answer) {
    if (!answer) return; // Add null check

    switch(type) {
        case 'multiple-choice':
            document.querySelector(`input[value="${answer}"]`).checked = true;
            break;
        case 'select-all':
            answer.forEach(val => {
                document.querySelector(`input[value="${val}"]`).checked = true;
            });
            break;
        case 'fill-blank':
            document.querySelector('input[type="text"]').value = answer;
            break;
        case 'priority':
            const container = document.querySelector('.priority-grid');
            answer.forEach(val => {
                const card = document.querySelector(`[data-value="${val}"]`);
                if(card) container.appendChild(card);
            });
            break;
            case 'medication-matching':
                // Add array check and bounds checking
                if (Array.isArray(answer)) {
                    document.querySelectorAll('select').forEach((select, i) => {
                        if (answer[i]) select.value = answer[i];
                    });
                }
                break;
                case 'scenario-dropdown':
                    Object.entries(answer).forEach(([part, value]) => {
                        const select = document.querySelector(`[data-part="${part}"]`);
                        if(select) select.value = value;
                    });
                    break;
    }
}