let categoryChartInstance = null;
let difficultyChartInstance = null;
let typeChartInstance = null;
let progressChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    const allResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    renderAnalytics(allResults);

        // Add filter listeners
        document.getElementById('categoryFilter').addEventListener('change', filterResults);
        document.getElementById('startDate').addEventListener('change', filterResults);
        document.getElementById('endDate').addEventListener('change', filterResults);
});

function filterResults() {
    const category = document.getElementById('categoryFilter').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    let filtered = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    if(category) {
        filtered = filtered.filter(result => 
            result.questions.some(q => q.category === category)
        );
    }
    
    if(startDate) {
        filtered = filtered.filter(result => 
            new Date(result.date) >= new Date(startDate)
        );
    }
    
    if(endDate) {
        filtered = filtered.filter(result => 
            new Date(result.date) <= new Date(endDate)
        );
    }
    
    renderAnalytics(filtered);
}

function renderAnalytics(results) {
    // Destroy existing charts first
    if (typeChartInstance) typeChartInstance.destroy();
    if (progressChartInstance) progressChartInstance.destroy();
    if (categoryChartInstance) categoryChartInstance.destroy();
    if (difficultyChartInstance) difficultyChartInstance.destroy();

    // Overall stats
    document.getElementById('totalQuizzes').textContent = results.length;
    document.getElementById('averageScore').textContent = 
        results.length ? `${Math.round(results.reduce((a, b) => a + b.score, 0)) / results.length}%` : '0%';
    document.getElementById('totalTime').textContent = 
        `${Math.round(results.reduce((a, b) => a + b.totalTime, 0) / 3600)}h`;
    document.getElementById('flaggedQs').textContent = 
        results.reduce((a, b) => a + b.questions.filter(q => q.flagged).length, 0);

    // Initialize new charts
    const categoryData = calculateCategoryData(results);

    // Progress Chart
    progressChartInstance = new Chart(document.getElementById('progressChart'), {
        type: 'line',
        data: {
            labels: results.map((_, i) => `Attempt ${i+1}`),
            datasets: [{
                label: 'Scores',
                data: results.map(r => (r.score/r.questions.length)*100),
                borderColor: getComputedStyle(document.documentElement)
                    .getPropertyValue('--primary-color').trim(),
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#fff',
                pointBorderColor: getComputedStyle(document.documentElement)
                    .getPropertyValue('--primary-color').trim()
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Percentage Score' }
                },
                x: {
                    title: { display: true, text: 'Attempt Number' }
                }
            }
        }
    });

    // Type Distribution Chart
    typeChartInstance = new Chart(document.getElementById('typeChart'), {
        type: 'bar',
        data: {
            labels: ['Multiple Choice', 'Select All', 'Fill Blank', 'Priority', 'Matching', 'Scenario'],
            datasets: [{
                label: 'Average Score %',
                data: calculateTypeScores(results),
                backgroundColor: [
                    '#2A5C82', '#5BA4E6', '#FF6B6B', 
                    '#28a745', '#ffc107', '#17a2b8'
                ]
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Average score: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });

    // Initialize category and difficulty charts
    renderCategoryChart(results);
    renderDifficultyChart(results);

        // Quiz History List
        const historyList = document.getElementById('quiz-history-list');
        historyList.innerHTML = results.map(result => `
            <a href="results.html?attempt=${result.date}" class="list-group-item list-group-item-action">
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${new Date(result.date).toLocaleDateString()}</strong>
                        <div class="text-muted small">
                            Score: ${result.score}/${result.questions.length} • 
                            Time: ${Math.floor(result.totalTime/60)}m
                        </div>
                    </div>
                    <span class="badge bg-${result.score/result.questions.length >= 0.7 ? 'success' : 'warning'}">
                        ${Math.round((result.score/result.questions.length)*100)}%
                    </span>
                </div>
            </a>
        `).join('');

        // Flagged Questions List
        const flaggedList = document.getElementById('flagged-questions-list');
        flaggedList.innerHTML = results.reduce((acc, result) => {
            result.questions.filter(q => q.flagged).forEach(q => {
                acc += `
                    <div class="list-group-item question-modal-trigger" 
                         data-question='${escapeHtml(JSON.stringify(q))}'
                         data-date='${result.date}'>
                        <div class="d-flex justify-content-between">
                            <span>${q.text.substring(0, 70)}...</span>
                            <small class="text-muted">${new Date(result.date).toLocaleDateString()}</small>
                        </div>
                    </div>`;
            });
            return acc;
        }, '');

           
    // Add modal handlers
    document.querySelectorAll('.question-modal-trigger').forEach(item => {
        item.addEventListener('click', () => {
            const question = JSON.parse(item.dataset.question);
            const modalContent = `
                <div class="modal-header">
                    <h5 class="modal-title">Flagged Question Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Category:</strong> ${question.category}</p>
                    <p><strong>Difficulty:</strong> ${question.difficulty}</p>
                    <hr>
                    <div class="mb-3">${question.text}</div>
                    <div class="alert ${question.correct ? 'alert-success' : 'alert-danger'}">
                        Your Answer: ${formatUserAnswer(question)}<br>
                        Correct Answer: ${formatCorrectAnswer(question)}
                    </div>
                    <div class="bg-light p-3 rounded">
                        <strong>Explanation:</strong><br>${question.explanation}
                    </div>
                </div>`;
            document.querySelector('#questionModal .modal-content').innerHTML = modalContent;
            new bootstrap.Modal(document.getElementById('questionModal')).show();
        });
    });

}

function calculateTypeScores(results) {
    const typeData = {
        'multiple-choice': { correct: 0, total: 0 },
        'select-all': { correct: 0, total: 0 },
        'fill-blank': { correct: 0, total: 0 },
        'priority': { correct: 0, total: 0 },
        'medication-matching': { correct: 0, total: 0 },
        'scenario-dropdown': { correct: 0, total: 0 }
    };

    results.forEach(result => {
        result.questions.forEach(q => {
            typeData[q.type].total++;
            if(q.correct) typeData[q.type].correct++;
        });
    });

    return [
        Math.round((typeData['multiple-choice'].correct / typeData['multiple-choice'].total) * 100) || 0,
        Math.round((typeData['select-all'].correct / typeData['select-all'].total) * 100) || 0,
        Math.round((typeData['fill-blank'].correct / typeData['fill-blank'].total) * 100) || 0,
        Math.round((typeData['priority'].correct / typeData['priority'].total) * 100) || 0,
        Math.round((typeData['medication-matching'].correct / typeData['medication-matching'].total) * 100) || 0,
        Math.round((typeData['scenario-dropdown'].correct / typeData['scenario-dropdown'].total) * 100) || 0
    ];
}

function formatUserAnswer(q) {
    if (!q.userAnswer) return 'No answer';
    
    if (q.type === 'scenario-dropdown') {
        return Object.values(q.userAnswer).join(' | ');
    }
    
    if (q.type === 'medication-matching') {
        return q.pairs.map((pair, i) => 
            `${pair.medication} → ${q.userAnswer[i] || '?'}`
        ).join('\n');
    }
    
    if (Array.isArray(q.userAnswer)) {
        return q.userAnswer.join(', ');
    }
    
    return q.userAnswer || 'No answer';
}

function formatCorrectAnswer(q) {
    if (q.type === 'scenario-dropdown') {
        return Object.values(q.parts).map(p => p.correct).join(' | ');
    }
    
    if (q.type === 'medication-matching') {
        return q.pairs.map(p => `${p.medication} → ${p.correctMatch}`).join('\n');
    }
    
    if (Array.isArray(q.correctAnswer)) {
        return q.correctAnswer.join(', ');
    }
    
    return q.correctAnswer || '';
}

// Add this helper function
function calculateQuestionTypes(results) {
    const counts = {
        'multiple-choice': 0,
        'select-all': 0,
        'fill-blank': 0,
        'priority': 0,
        'medication-matching': 0,
        'scenario-dropdown': 0
    };
    
    results.forEach(result => {
        result.questions.forEach(q => {
            counts[q.type]++;
        });
    });
    
    return Object.values(counts);
}

function calculateCategoryData(results) {
    const categoryData = {};
    results.forEach(result => {
        result.questions.forEach(q => {
            if(!categoryData[q.category]) categoryData[q.category] = { correct: 0, total: 0 };
            categoryData[q.category].total++;
            if(q.correct) categoryData[q.category].correct++;
        });
    });
    
    const percentages = {};
    Object.entries(categoryData).forEach(([category, data]) => {
        percentages[category] = Math.round((data.correct / data.total) * 100);
    });
    
    return percentages;
}

// Category Mastery Chart
function renderCategoryChart(results) {
    if (categoryChartInstance) {
        categoryChartInstance.destroy();
    }
    
    const ctx = document.getElementById('categoryChart');
    categoryChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(calculateCategoryData(results)),
            datasets: [{
                label: 'Mastery Score %',
                data: Object.values(calculateCategoryData(results)),
                backgroundColor: '#2A5C82'
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}

// Difficulty Breakdown Chart
function renderDifficultyChart(results) {
    if (difficultyChartInstance) {
        difficultyChartInstance.destroy();
    }
    
    const ctx = document.getElementById('difficultyChart');
    difficultyChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Easy Correct', 'Easy Incorrect', 'Medium Correct', 'Medium Incorrect', 'Hard Correct', 'Hard Incorrect'],
            datasets: [{
                data: calculateDifficultyData(results),
                backgroundColor: [
                    '#28a745', '#dc3545', 
                    '#ffc107', '#fd7e14',
                    '#007bff', '#6610f2'
                ]
            }]
        }
    });
}

// Helper functions
function calculateDifficultyData(results) {
    const counts = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } };
    
    results.forEach(result => {
        result.questions.forEach(q => {
            counts[q.difficulty].total++;
            if(q.correct) counts[q.difficulty].correct++;
        });
    });

    return [
        Math.round((counts.easy.correct / counts.easy.total) * 100) || 0,
        Math.round(((counts.easy.total - counts.easy.correct) / counts.easy.total) * 100) || 0,
        Math.round((counts.medium.correct / counts.medium.total) * 100) || 0,
        Math.round(((counts.medium.total - counts.medium.correct) / counts.medium.total) * 100) || 0,
        Math.round((counts.hard.correct / counts.hard.total) * 100) || 0,
        Math.round(((counts.hard.total - counts.hard.correct) / counts.hard.total) * 100) || 0
    ];
}

// Add this helper function
function escapeHtml(unsafe) {
    return unsafe.replace(/[&<>"']/g, (match) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[match]));
}