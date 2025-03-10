document.addEventListener('DOMContentLoaded', () => {
    // The actual button class is 'start-quiz' from your HTML
    const startBtn = document.querySelector('.start-quiz'); 
    const analyticsBtn = document.querySelector('.view-analytics');
    
    if(startBtn) {
        startBtn.addEventListener('click', () => {
            localStorage.removeItem('activeQuiz');
            window.location.href = 'quiz.html';
        });
    }
    
    if(analyticsBtn) {
        analyticsBtn.addEventListener('click', () => {
            window.location.href = 'analytics.html';
        });
    }
});