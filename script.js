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
    // 1. COUNTDOWN TIMER
    // ============================================
    const targetDate = new Date("April 26, 2026 00:00:00").getTime();
    
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance <= 0) {
            clearInterval(countdownInterval);
            triggerReveal();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    // ============================================
    // 2. REVEAL BUTTON & ANIMATIONS
    // ============================================
    let hasRevealed = false;
    
    const revealBtn = document.getElementById("revealBtn");
    const countdown = document.getElementById("countdown");
    const birthdayMsg = document.getElementById("birthdayMsg");
    const messageSection = document.getElementById("messageSection");
    const messageCard = document.getElementById("messageCard");
    const gallerySection = document.getElementById("gallerySection");
    const musicBtn = document.getElementById("musicBtn");
    const bgMusic = document.getElementById("bgMusic");
    const floatingHearts = document.getElementById("floatingHearts");
    
    // Click reveal button
    revealBtn.addEventListener("click", function() {
        if (!hasRevealed) {
            hasRevealed = true;
            clearInterval(countdownInterval);
            triggerReveal();
        }
    });
    
    function triggerReveal() {
        // Elegant shrink countdown
        countdown.classList.add('shrink');
        revealBtn.classList.add('hide');
        
        // Reactivate floating hearts (burst effect)
        triggerHeartBurst();
        
        setTimeout(() => {
            countdown.style.display = 'none';
            revealBtn.style.display = 'none';
            
            // Show birthday message
            birthdayMsg.style.display = 'block';
            
            // Show message section
            messageSection.style.display = 'flex';
            
            // Trigger staggered fade-in for message card
            setTimeout(() => {
                messageCard.classList.add('show');
                showMessageLines();
            }, 100);
            
            // Show gallery after message
            setTimeout(() => {
                gallerySection.style.display = 'block';
                showPhotoCards();
            }, 1200);
            
            // Show music button
            musicBtn.classList.add('show');
            
            // Start confetti
            startConfetti();
            
            // Start music
            playMusic();
            
            // Scroll to message
            setTimeout(() => {
                messageSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
            
        }, 800);
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
    bgMusic.volume = 0.3;
    
    function playMusic() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('active');
            localStorage.setItem('musicEnabled', 'true');
        }).catch(() => {});
    }
    
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('active');
            localStorage.setItem('musicEnabled', 'false');
        } else {
            bgMusic.play().then(() => {
                musicBtn.classList.add('active');
                localStorage.setItem('musicEnabled', 'true');
            });
        }
        isPlaying = !isPlaying;
    });
});