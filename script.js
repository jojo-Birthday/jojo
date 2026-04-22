/* ============================================
   JOJO'S BIRTHDAY - ENHANCED ANIMATIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS
    AOS.init({
        once: true,
        offset: 100,
        duration: 1000,
        easing: 'ease-out-cubic'
    });

    // ============================================
    // 1. COUNTDOWN TIMER - STRICT INTERVAL LOGIC
    // ============================================
    const targetDate = new Date("April 22, 2026 00:00:00").getTime();
    
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const countdown = document.getElementById("countdown");
    const revealBtn = document.getElementById("revealBtn");
    
    // Initialize button as hidden by default
    revealBtn.style.display = 'none';
    revealBtn.style.opacity = '0';
    
    let hasRevealed = false;
    let countdownComplete = false;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // CRITICAL: If distance > 0, button MUST remain display: none
        if (distance > 0) {
            revealBtn.style.display = 'none';
            revealBtn.style.opacity = '0';
        }
        
        // Last 10 seconds: add vibrate animation
        if (distance > 0 && distance <= 10000) {
            countdown.classList.add('vibrate');
        } else {
            countdown.classList.remove('vibrate');
        }
        
        // THE MOMENT OF ZERO - Strict transition sequence
        if (distance <= 0) {
            clearInterval(countdownInterval);
            countdownComplete = true;
            
            // Step 1: Fade out timerDisplay (opacity to 0 over 0.5s)
            countdown.classList.add('fade-out');
            countdown.classList.remove('vibrate');
            
            setTimeout(() => {
                // Step 2: Completely delete the timer from DOM
                countdown.remove();
                
                // Step 3: Show the message button
                revealBtn.style.display = 'inline-flex';
                revealBtn.style.opacity = '1';
                revealBtn.classList.add('show');
                
            }, 500);
            
            return;
        }
        
        // Update countdown values
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Check if countdown already complete on page load (and wasn't already handled)
    if (countdown && targetDate - new Date().getTime() <= 0) {
        clearInterval(countdownInterval);
        if (countdown.parentNode) {
            countdown.remove();
        }
        revealBtn.style.display = 'inline-flex';
        revealBtn.style.opacity = '1';
        revealBtn.classList.add('show');
        countdownComplete = true;
    }
    
    // ============================================
    // 2. REVEAL BUTTON - ERROR PREVENTION
    // ============================================
    
    // Define click handler ONCE - cannot be triggered before countdown ends
    revealBtn.addEventListener("click", function handleReveal() {
        // Prevent any multiple triggers
        if (hasRevealed || !countdownComplete) {
            return;
        }
        
        hasRevealed = true;
        
        // Remove event listener to prevent future triggers
        revealBtn.removeEventListener("click", handleReveal);
        
        // Safely clear interval if it exists
        try {
            clearInterval(countdownInterval);
        } catch (e) {
            // Interval already cleared, ignore
        }
        
        // Fade out the button smoothly
        revealBtn.classList.add('hide');
        
        // After fade animation completes (0.4s), remove button and trigger content reveal
        setTimeout(() => {
            revealBtn.remove();
            triggerReveal();
        }, 400);
    });

    // ============================================
    // 3. REVEAL BUTTON & ANIMATIONS
    // ============================================
    
    const birthdayMsg = document.getElementById("birthdayMsg");
    const messageSection = document.getElementById("messageSection");
    const messageCard = document.getElementById("messageCard");
    const gallerySection = document.getElementById("gallerySection");
    const musicBtn = document.getElementById("musicBtn");
    const bgMusic = document.getElementById("bgMusic");
    const floatingHearts = document.getElementById("floatingHearts");
    const bigCountdown = document.getElementById("bigCountdown");
    const bigCountdownNumber = document.getElementById("bigCountdownNumber");
    
    // Click reveal button - removed (now handled by guard above)
    
    function initVoice() {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            femaleVoice = voices.find(v => v.name.includes('Female')) || voices[0];
            maleVoice = voices.find(v => v.name.includes('Male')) || voices[0];
        }
    }
    
    speechSynthesis.onvoiceschanged = initVoice;
    initVoice();
    
    function speakCrowd(num, delay = 0) {
        setTimeout(() => {
            speechSynthesis.cancel();
            const count = 4;
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(String(num));
                    utterance.rate = 1.1 + Math.random() * 0.3;
                    utterance.pitch = 0.9 + Math.random() * 0.4;
                    utterance.volume = 0.8;
                    utterance.voice = (i % 2 === 0 && femaleVoice) ? femaleVoice : (maleVoice || femaleVoice);
                    speechSynthesis.speak(utterance);
                }, i * 100);
            }
        }, delay);
    }
    
    function runBigCountdown(callback) {
        countdown.style.display = 'none';
        revealBtn.style.display = 'none';
        
        bigCountdown.classList.add('show');
        
        function showCount(num) {
            bigCountdownNumber.textContent = num;
            bigCountdownNumber.style.animation = 'none';
            bigCountdownNumber.offsetHeight;
            bigCountdownNumber.style.animation = 'bigCountdownPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            const countdownSub = document.getElementById("countdownSub");
            const messages = { 3: "The sweetest💕", 2: "Jojo💖", 1: "The princess👑" };
            if (countdownSub) {
                countdownSub.textContent = messages[num] || "The Queen🌸";
            }
        }
        
        function processCount(num, delay, done) {
            setTimeout(() => {
                showCount(num);
                if (done) {
                    const countdownSub = document.getElementById("countdownSub");
                    if (countdownSub) countdownSub.textContent = "The Queen🌸";
                    setTimeout(() => {
                        bigCountdown.classList.remove('show');
                        callback();
                    }, 800);
                }
            }, delay);
        }
        
        processCount(3, 0, false);
        processCount(2, 1800, false);
        processCount(1, 3600, true);
    }
    
    function triggerReveal() {
        playMusic();
        
        runBigCountdown(() => {
            triggerHeartBurst();
            
            birthdayMsg.style.display = 'block';
            messageSection.classList.add('show');
            
            setTimeout(() => {
                messageCard.classList.add('show');
                showMessageLines();
            }, 100);
            
            setTimeout(() => {
                gallerySection.style.display = 'block';
                showPhotoCards();
            }, 1200);
            
            musicBtn.classList.add('show');
            startConfetti();
            
            setTimeout(() => {
                messageSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
        });
    }
    
    // ============================================
    // 3. STAGGERED MESSAGE REVEAL
    // ============================================
    function showMessageLines() {
        const lines = document.querySelectorAll('.message-line');
        const signature = document.querySelector('.signature');
        
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('show');
            }, index * 200);
        });
        
        // Show signature last
        setTimeout(() => {
            signature.classList.add('show');
        }, lines.length * 200 + 200);
    }
    
    // ============================================
    // 4. 3D CARD DEAL ANIMATION
    // ============================================
    function showPhotoCards() {
        const cards = document.querySelectorAll('.photo-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 150);
        });
    }
    
    // ============================================
    // 5. REACTIVE FLOATING HEARTS
    // ============================================
    function triggerHeartBurst() {
        const hearts = ['💖', '✨', '💕', '🌸', '💗', '💘'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart reveal';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = (Math.random() * 100) + '%';
                heart.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
                floatingHearts.appendChild(heart);
                
                // Remove after animation
                setTimeout(() => heart.remove(), 8000);
            }, i * 150);
        }
    }
    
    // Create initial floating hearts
    createFloatingHearts();
    
    function createFloatingHearts() {
        const hearts = ['💖', '✨', '💕', '🌸', '💗', '💘'];
        
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
            heart.style.animationDelay = (Math.random() * 15) + 's';
            heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
            floatingHearts.appendChild(heart);
        }
    }

    // ============================================
    // 6. CONFETTI EFFECT
    // ============================================
    function startConfetti() {
        const colors = ['#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d'];
        
        // Main burst
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: colors,
            gravity: 1.1
        });
        
        // Side bursts
        setTimeout(() => {
            confetti({ particleCount: 70, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
            confetti({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
        }, 300);
        
        // Center burst
        setTimeout(() => {
            confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 }, colors: colors });
        }, 600);
        
        // Continuous celebration
        const interval = setInterval(() => {
            if (!hasRevealed) { clearInterval(interval); return; }
            const x = Math.random();
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti({ 
                particleCount: 20, 
                spread: 50, 
                origin: { x: x, y: 1 }, 
                colors: [color],
                ticks: 40 
            });
        }, 700);
    }

    // ============================================
    // 7. MUSIC PLAYER
    // ============================================
    let isPlaying = false;
    bgMusic.volume = 0.4;
    
    function playMusic() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('active');
            musicBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
            localStorage.setItem('musicEnabled', 'true');
        }).catch((e) => {
            console.log('Autoplay blocked:', e);
        });
    }
    
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('active');
            musicBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
            localStorage.setItem('musicEnabled', 'false');
        } else {
            bgMusic.play().then(() => {
                musicBtn.classList.add('active');
                musicBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
                localStorage.setItem('musicEnabled', 'true');
            }).catch((e) => {
                console.log('Playback failed:', e);
            });
        }
        isPlaying = !isPlaying;
    });
});