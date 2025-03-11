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


document.addEventListener('DOMContentLoaded', () => {
    // Get elements first
    const installBtn = document.getElementById('installBtn');
    const startBtn = document.querySelector('.start-quiz');
    const analyticsBtn = document.querySelector('.view-analytics');

    // Install Button Handling
    if (installBtn) {
        let deferredPrompt;

        const showInstallButton = () => {
            installBtn.classList.remove('d-none');
            installBtn.disabled = false;
        };

        const hideInstallButton = () => {
            installBtn.classList.add('d-none');
            installBtn.disabled = true;
        };

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            showInstallButton();
        });

        installBtn.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            
            try {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User ${outcome} the install`);
                hideInstallButton();
            } catch (error) {
                console.error('Install failed:', error);
            }
            deferredPrompt = null;
        });
    }

    // Existing Quiz Logic
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            localStorage.removeItem('activeQuiz');
            window.location.href = 'quiz.html';
        });
    }
    
    if (analyticsBtn) {
        analyticsBtn.addEventListener('click', () => {
            window.location.href = 'analytics.html';
        });
    }
});

// Service Worker & PWA Logic
let deferredPrompt;


// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registered:', reg))
            .catch(err => console.log('SW registration failed:', err));
    });
}

function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button if it exists
        const installBtn = document.getElementById('installBtn');
        if (installBtn) {
            installBtn.classList.remove('d-none');
            
            // Remove any existing listeners to prevent duplicates
            installBtn.replaceWith(installBtn.cloneNode(true));
        }
    });
}