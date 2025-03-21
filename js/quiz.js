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
    try {
        // Clear previous answer validation
        questionText.innerHTML = '';
        questionBody.innerHTML = '';
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
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



    if (userAnswers[index]) {
        restoreAnswer(q.type, userAnswers[index].answer);
           // Add validation styling
           if (!userAnswers[index].answer) {
            document.querySelectorAll('.scenario-select, input[type="text"], select').forEach(el => {
                el.classList.add('is-invalid');
            });
        }
    }

        // Add null check before restoring answer
        if (userAnswers[index]?.answer) {
            restoreAnswer(q.type, userAnswers[index].answer);
        }

         // Add delay for DOM rendering
         setTimeout(() => {
            if(userAnswers[index]) {
                restoreAnswer(q.type, userAnswers[index].answer);
            }
        }, 50);
    } catch (error) {
        console.error('Critical load error:', error);
        // Fallback to previous question
        currentQuestion = Math.min(currentQuestion + 1, questions.length - 1);
    }
}

// Add to loadQuestion function
// In quiz.js - Update initPagination function
function initPagination() {
    const container = document.getElementById('question-pagination');
    // Add null check first
    if (!container) {
        console.warn('Pagination container not found');
        return;
    }

    container.innerHTML = questions.map((_, i) => {
        let btnClass = 'btn-outline-primary';
        
        // Priority 1: Flagged questions (yellow)
        if (userAnswers[i]?.flagged) {
            btnClass = 'btn-warning';
        }
        // Priority 2: Current question (primary)
        else if (i === currentQuestion) {
            btnClass = 'btn-primary';
        }
        // Priority 3: Answered questions (success)
        else if (userAnswers[i]?.answer !== null) {
            btnClass = 'btn-success';
        }
        // Preserve flag indicator
        const flagIndicator = userAnswers[i]?.flagged 
            ? '<i class="fas fa-flag ms-2 text-warning"></i>' 
            : '';   
            
        return `
        <button class="btn btn-sm ${btnClass} pagination-btn" 
                data-index="${i}">
            ${i + 1}
        </button>`;
    }).join('');

    // Preserve click handlers with event delegation
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.pagination-btn');
        if (btn) {
            handleAnswer(); // Save current answer
            currentQuestion = parseInt(btn.dataset.index);
            loadQuestion(currentQuestion);
        }
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
    
        // Handle empty scenario dropdowns
        if (q.type === 'scenario-dropdown') {
            const isValid = Object.values(answer).every(v => v !== '');
            if (!isValid) {
                showError('Please complete all dropdowns!');
                return false;
            }
        }

    // Validate required answers
    let isValid = true;
    switch(q.type) {
        case 'select-all':
            isValid = answer.length > 0;
            break;
        case 'fill-blank':
            isValid = answer.trim() !== '';
            break;
        case 'scenario-dropdown':
            isValid = Object.values(answer).every(v => v !== '');
            break;
        default:
            isValid = !!answer;
    }

    if (!isValid) {
        showError('Please provide an answer before proceeding!');
        return false;
    }
    
      // Save answer
      userAnswers[currentQuestion] = {
        answer: answer,
        flagged: document.querySelector('.flag-btn')?.classList.contains('flagged') || false,
        confidence: document.querySelector('.confidence-meter .btn.active')?.textContent || 'Not rated',
        timeSpent: timeElapsed - (userAnswers[currentQuestion]?.timeSpent || 0)
    };
    
    return true;
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
    if (handleAnswer()) {
        if (currentQuestion < questions.length - 1) {
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
// In the existing prevBtn event listener
prevBtn.addEventListener('click', () => {
    handleAnswer(); // Save current answer first
    if(currentQuestion > 0) {
        currentQuestion--;
        try {
            loadQuestion(currentQuestion);
        } catch (error) {
            console.error('Failed to load question:', error);
            currentQuestion++; // Rollback if error occurs
        }
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
                    <input type="text" 
                           class="form-control persist-answer" 
                           placeholder="Enter your answer"
                           autocomplete="off"
                           value="${userAnswers[currentQuestion]?.answer || ''}">
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
    
                setTimeout(() => {
                    const container = document.querySelector('.priority-grid');
                    if(!container) {
                        console.warn('Priority grid not found');
                        return;
                    }
                    
                    try {
                        new Sortable(container, {
                            animation: 150,
                            handle: '.priority-card',
                            onUpdate: () => handleAnswer()
                        });
                    } catch (error) {
                        console.error('Sortable init failed:', error);
                    }
                }, 50); // Increased delay for DOM stability
                break;
            
                case 'medication-matching':
                    html = `<table class="table">
                        ${question.pairs.map(pair => `
                        <tr>
                            <td>${pair.medication}</td>
                            <td>
                                <select class="form-select" style="border-color: var(--primary-color)">
                                    <option value="" selected disabled>Select option</option>
                                    ${question.options.map(opt => `
                                    <option value="${opt}">${opt}</option>
                                    `).join('')}
                                </select>
                            </td>
                        </tr>
                        `).join('')}
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

function getAnswer(type) {
    switch(type) {
        case 'multiple-choice':
            return document.querySelector('input[name="answer"]:checked')?.value || null;
            
        case 'select-all':
            return Array.from(document.querySelectorAll('input[name="answer"]:checked'))
                   .map(checkbox => checkbox?.value).filter(Boolean);
            
        case 'fill-blank':
            const input = document.querySelector('input[type="text"]');
            return input ? input.value.trim() : '';
            
        case 'priority':
            const items = document.querySelectorAll('.priority-item');
            return Array.from(items).map(item => item?.dataset.value).filter(Boolean);
            
        case 'medication-matching':
            const selects = document.querySelectorAll('select');
            return Array.from(selects).map(select => select?.value).filter(Boolean);
            
        case 'scenario-dropdown':
            const selections = {};
            document.querySelectorAll('.scenario-select').forEach(select => {
                if (select) selections[select.dataset.part] = select.value;
            });
            return selections;
            
        default:
            return null;
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
            return userAnswer === correct;

        // case 'scenario-dropdown':
        //         // Add robust null checking
        //     if (!question.parts || typeof question.parts !== 'object') return false;
        //     if (!userAnswer || typeof userAnswer !== 'object') return false;
                
        //     return Object.keys(question.parts).every(key => {
        //         const correctValue = question.parts[key]?.correct;
        //         return userAnswer[key] === correctValue;
        //     });
    
        case 'select-all':
            return userAnswer.length === correct.length && 
            correct.every(c => userAnswer.includes(c));

        case 'fill-blank':
                    const correctAnswers = question.correctAnswer.map(c => c.toLowerCase().trim());
                
                // Extract all numbers from user's answer
                const userNumbers = (userAnswer.match(/\d+(\.\d+)?/g) || [])
                    .map(num => parseFloat(num).toFixed(2).replace(/\.00$/, ''));
                
                // Convert correct answers to numbers
                const correctNumbers = correctAnswers.map(c => 
                    parseFloat(c).toFixed(2).replace(/\.00$/, '')
                );

                // Check for exact matches regardless of order
                const matches = correctNumbers.every(c => 
                    userNumbers.includes(c)
                ) && userNumbers.every(u => 
                    correctNumbers.includes(u)
                );

                return matches && userNumbers.length === correctNumbers.length;
        case 'priority':
            return arraysEqual(userAnswer, correct);
        case 'medication-matching':
            return arraysEqual(userAnswer, question.pairs.map(p => p.correctMatch));
    }
}

function arraysEqual(a, b) {
    return Array.isArray(a) && 
           Array.isArray(b) && 
           a.length === b.length && 
           a.every((val, i) => val === b[i]);
}

function restoreAnswer(type, answer) {
    if (!answer) return;

    switch(type) {
        case 'multiple-choice':
            const radio = document.querySelector(`input[value="${CSS.escape(answer)}"]`);
            if (radio) radio.checked = true;
            break;
            
        case 'select-all':
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                if (checkbox) checkbox.checked = answer.includes(checkbox.value);
            });
            break;
            
        case 'fill-blank':
                const input = document.querySelector('input[type="text"]');
                if(input) {
                    // Convert array answers to comma-separated string
                    input.value = Array.isArray(answer) ? answer.join(', ') : answer;
                }
                break;
            
        case 'priority':
            const container = document.querySelector('.priority-grid');
            if (container) {
                answer.forEach(val => {
                    const card = document.querySelector(`[data-value="${CSS.escape(val)}"]`);
                    if (card) container.appendChild(card);
                });
            }
            break;
            
        case 'medication-matching':
                document.querySelectorAll('select').forEach((select, index) => {
                    if (select && answer[index]) select.value = answer[index];
                });
                break;
            
        case 'scenario-dropdown':
            Object.entries(answer).forEach(([part, value]) => {
                const select = document.querySelector(`select[data-part="${part}"]`);
                if (select) select.value = value;
            });
            break;
    }
}