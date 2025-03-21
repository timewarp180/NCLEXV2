document.addEventListener('DOMContentLoaded', () => {
    const results = JSON.parse(localStorage.getItem('currentResult'));
    const savedSize = localStorage.getItem('textSize');
    
    if(savedSize) {
        document.documentElement.style.fontSize = savedSize;
    }
        // Add null check
        if (!results) {
            alert('No quiz results found. Redirecting to home page...');
            window.location.href = 'index.html';
            return;
        }

        // Store for export functionality
        localStorage.setItem('currentResult', JSON.stringify(results)); 
        renderResults(results);
    });

    function renderResults(result) {
        // Score Summary
        const correctCount = result.questions.filter(q => q.correct).length;
        document.getElementById('correct-count').textContent = correctCount;
        document.getElementById('score').textContent = `${result.score}/${result.questions.length}`;
        document.getElementById('percentage').textContent = 
            `${Math.round((result.score/result.questions.length)*100)}%`;
        document.getElementById('time-taken').textContent = formatTime(result.totalTime);
    
        // New Card-Based Breakdown
        const breakdownContainer = document.getElementById('question-breakdown');
        breakdownContainer.innerHTML = result.questions.map((q, i) => `
            <div class="breakdown-card">
                <div class="question-header">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="mb-2">Question ${i+1}</h6>
                            <div class="question-meta">
                                <span class="meta-badge text-primary">
                                    <i class="fas fa-tag me-1"></i>${q.type}
                                </span>
                                <span class="meta-badge">
                                    <i class="fas fa-clock me-1"></i>${q.timeSpent}s
                                </span>
                                <span class="meta-badge ${q.correct ? 'text-success' : 'text-danger'}">
                                    <i class="fas ${q.correct ? 'fa-check' : 'fa-times'} me-1"></i>
                                    ${q.correct ? 'Correct' : 'Incorrect'}
                                </span>
                                <span class="meta-badge" style="background: ${getDifficultyColor(q.difficulty, true)}">
                                    ${q.difficulty.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <span class="text-muted fs-7">${q.category}</span>
                    </div>
                </div>
                
                <div class="card-body">
                    <!-- Question Text -->
                    <div class="fw-medium mb-3">${q.text}</div>
                    
                    <!-- Answers Comparison -->
                    <div class="answer-comparison">
                        <div class="answer-section ${q.correct ? 'answer-correct' : 'answer-incorrect'}">
                            <label class="text-muted small mb-2">Your Answer</label>
                            <div class="text-break pre-wrap">${formatUserAnswer(q)}</div>
                        </div>
                        
                        ${!q.correct ? `
                        <div class="answer-section answer-correct">
                            <label class="text-muted small mb-2">Correct Answer</label>
                            <div class="text-break pre-wrap">${formatCorrectAnswer(q)}</div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <!-- Explanation with Popover -->
                    <div class="explanation-block mt-4">
                        <button class="btn btn-sm copy-explanation explanation-popover" 
                                data-bs-toggle="popover" 
                                title="Detailed Explanation"
                                data-content="${q.explanation.replace(/"/g, '&quot;')}">
                            <i class="fas fa-copy"></i>
                        </button>
                        <label class="text-muted small mb-2">Explanation</label>
                        <div class="text-break pre-wrap">${q.explanation}</div>
                    </div>
                </div>
            </div>
        `).join('');
    
        // Initialize Popovers (updated for new elements)
        document.querySelectorAll('.explanation-popover').forEach(el => {
            new bootstrap.Popover(el, {
                container: 'body',
                html: true,
                trigger: 'hover focus',
                content: () => el.nextElementSibling.innerHTML
            });
        });
    
        // Keep original table for export functionality (hidden)
        // const tbody = document.querySelector('#breakdown tbody');
        // tbody.innerHTML = result.questions.map((q, i) => `
        //     <tr class="${q.correct ? 'table-success' : 'table-danger'}">
        //         <td>${i+1}</td>
        //         <td>${q.type}</td>
        //         <td><pre>${formatUserAnswer(q)}</pre></td>
        //         <td><pre>${formatCorrectAnswer(q)}</pre></td>
        //         <td>${q.explanation}</td>
        //         <td>${q.timeSpent}s</td>
        //     </tr>
        // `).join('');
    
        // Initialize charts
        renderCharts(result);
    }

function getDifficultyColor(difficulty, background = false) {
    const colors = {
        easy: { text: 'text-success', bg: 'rgba(40,167,69,0.1)' },
        medium: { text: 'text-warning', bg: 'rgba(255,193,7,0.1)' },
        hard: { text: 'text-danger', bg: 'rgba(220,53,69,0.1)' }
    };
    return background ? colors[difficulty].bg : colors[difficulty].text;
}

function formatUserAnswer(q) {
    if (!q.userAnswer) return 'No answer';
    
    if (q.type === 'scenario-dropdown') {
        return Object.keys(q.parts)
            .sort()
            .map(part => q.userAnswer[part] || 'Unanswered')
            .join(' | ');
    }
    
    if (q.type === 'medication-matching') {
        return q.pairs.map((pair, index) => 
            `${pair.medication} → ${q.userAnswer[index] || '?'}`
        ).join('\n');
    }
    
    if (Array.isArray(q.userAnswer)) {
        return q.userAnswer.join(', ');
    }
    
    return q.userAnswer || 'No answer';
}

function formatCorrectAnswer(q) {
    if (q.type === 'scenario-dropdown') {
        return Object.keys(q.parts)
            .sort()
            .map(part => q.parts[part].correct)
            .join(' | ');
    }
    
    if (q.type === 'medication-matching') {
        return q.pairs.map(pair => 
            `${pair.medication} → ${pair.correctMatch}`
        ).join('\n');
    }
    
    if (Array.isArray(q.correctAnswer)) {
        return q.correctAnswer.join(', ');
    }
    
    return q.correctAnswer || '';
}

function renderCharts(result) {
    // Score distribution
    new Chart(document.getElementById('scoreChart'), {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [result.score, result.questions.length - result.score],
                backgroundColor: ['#4CAF50', '#F44336']
            }]
        }
    });
    
    // Time per question
    new Chart(document.getElementById('timeChart'), {
        type: 'bar',
        data: {
            labels: result.questions.map((_, i) => `Q${i+1}`),
            datasets: [{
                label: 'Seconds spent',
                data: result.questions.map(q => q.timeSpent),
                backgroundColor: '#2196F3'
            }]
        }
    });
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


// Add these functions to handle exports
function exportCSV() {
    const results = JSON.parse(localStorage.getItem('currentResult'));
    let csvContent = "Question,Your Answer,Correct Answer,Time Spent,Status\n";
    
    results.questions.forEach((q, i) => {
        csvContent += `${i+1},"${q.userAnswer}","${q.correctAnswer}",${q.timeSpent},${q.correct ? 'Correct' : 'Incorrect'}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nclex-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

 // REPLACE the existing exportPDF function
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const results = JSON.parse(localStorage.getItem('currentResult'));

    // Header
    doc.setFontSize(18);
    doc.setTextColor(42, 92, 130);
    doc.text('NCLEX Results Report', 15, 20);
    
    // Summary
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Score: ${results.score}/${results.questions.length}`, 15, 30);
    doc.text(`Percentage: ${Math.round((results.score/results.questions.length)*100)}%`, 15, 36);
    doc.text(`Time Taken: ${formatTime(results.totalTime)}`, 15, 42);

    // Table
    doc.autoTable({
        head: [['#', 'Question', 'Your Answer', 'Correct Answer', 'Explanation']],
        body: results.questions.map((q, i) => [
            i+1,
            q.text.substring(0, 40) + '...',
            Array.isArray(q.userAnswer) ? q.userAnswer.join(', ') : q.userAnswer,
            Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer,
            q.explanation.substring(0, 40) + '...'
        ]),
        startY: 50,
        theme: 'grid'
    });

    doc.save('nclex-results.pdf');
}

function exportJSON() {
    const results = localStorage.getItem('currentResult');
    const blob = new Blob([results], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nclex-results-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

// Before print handler
window.addEventListener('beforeprint', () => {
    const printData = document.querySelector('.print-data');
    printData.dataset.date = new Date().toLocaleDateString();
    printData.dataset.duration = document.getElementById('time-taken').textContent;
    
    // Force 2 questions per page
    document.querySelectorAll('.breakdown-card').forEach((card, index) => {
        if((index + 1) % 2 === 0) {
            card.style.pageBreakAfter = "always";
        }
    });
    
    // Scale down elements if needed
    if(document.querySelectorAll('.breakdown-card').length > 10) {
        document.documentElement.style.fontSize = '7pt';
    }
});