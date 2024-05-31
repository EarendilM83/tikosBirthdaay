document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    const fireworksButton = document.getElementById('fireworksButton');
    const countdownElement = document.getElementById('countdown');
    const fireworksSound = document.getElementById('fireworksSound');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playMusicButton = document.getElementById('playMusicButton');
    const textLines = document.querySelectorAll('.main-text');
    const line6 = document.getElementById('line6');
    const copyrightLine = document.getElementById('copyrightLine');
    
    // Attempt to start background music automatically
    function startBackgroundMusic() {
        backgroundMusic.play().catch(() => {
            // Show play button if autoplay is blocked
            playMusicButton.classList.remove('hidden');
        });
    }

    playMusicButton.addEventListener('click', function() {
        backgroundMusic.play();
        playMusicButton.classList.add('hidden');
    });

    startBackgroundMusic();

    // Set fireworks sound volume to 70%
    fireworksSound.volume = 0.7;

    // Show fireworks button after 30 seconds
    setTimeout(function() {
        fireworksButton.classList.remove('hidden');
    }, 20000);

    // Animate text lines
    setTimeout(() => document.getElementById('line1').classList.remove('hidden'), 1000);
    setTimeout(() => document.getElementById('line2').classList.remove('hidden'), 5000);
    setTimeout(() => document.getElementById('line3').classList.remove('hidden'), 9000);
    setTimeout(() => document.getElementById('line4').classList.remove('hidden'), 13000);
    setTimeout(() => document.getElementById('line5').classList.remove('hidden'), 17000);

    if (fireworksButton) {
        fireworksButton.addEventListener('click', function() {
            console.log('Fireworks button clicked');
            // Play fireworks sound
            fireworksSound.play();
            // Show fireworks
            createFireworks();
            // Replace button with countdown
            this.style.display = 'none';
            countdownElement.classList.remove('hidden');
            startCountdown();
            // Hide text lines
            textLines.forEach(line => line.classList.add('hidden'));
            // Show line 6
            setTimeout(() => line6.classList.remove('hidden'), 2000);
            // Show copyright text after 30 seconds
            setTimeout(() => {
                countdownElement.classList.add('hidden');
                line6.classList.add('hidden');
                copyrightLine.classList.remove('hidden');
            }, 15000);
        });
    } else {
        console.error('Fireworks button not found');
    }

    function createFireworks() {
        console.log('Creating fireworks');
        const duration = 46000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 150 * (timeLeft / duration);
            if (typeof confetti === 'function') {
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            } else {
                console.error('Confetti function not found');
            }
        }, 250);
    }

    function startCountdown() {
        console.log('Starting countdown');
        const endDate = new Date('June 12, 2024').getTime();

        const interval = setInterval(function() {
            const now = new Date().getTime();
            const distance = endDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = 'EXPIRED';
            }
        }, 1000);
    }

    // Include confetti library
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.3/dist/confetti.browser.min.js';
    script.async = true;
    script.onload = function() {
        console.log('Confetti library loaded');
    };
    document.head.appendChild(script);
});
