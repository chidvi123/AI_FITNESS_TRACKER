/* ==========================================================================
   PulseAI Fitness Coach - Interactive Client Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // --- 1. MOBILE MENU TOGGLE ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            
            // Toggle icon shape
            const icon = mobileToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close mobile menu on clicking links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                mobileToggle.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // --- 2. ACTIVE NAVBAR SECTION HIGHLIGHT ---
    const sectionsList = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = 'hero';
        const scrollPosition = window.scrollY + 120; // offset navbar height

        sectionsList.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 3. SCROLL REVEAL ENTRANCE ANIMATIONS ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it contains stats counters, trigger the count animation once
                if (entry.target.classList.contains('about-stats-panel')) {
                    triggerStatsCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. COUNT-UP STATS ANIMATOR ---
    let statsTriggered = false;

    function triggerStatsCounters() {
        if (statsTriggered) return;
        statsTriggered = true;

        const counters = document.querySelectorAll('.stat-num');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-count'));
            const isFloat = target % 1 !== 0;
            const duration = 2000; // 2 seconds
            const stepTime = 30;
            const steps = Math.ceil(duration / stepTime);
            const increment = target / steps;
            let current = 0;
            let stepCount = 0;

            const timer = setInterval(() => {
                current += increment;
                stepCount++;
                
                if (stepCount >= steps) {
                    clearInterval(timer);
                    counter.innerText = isFloat ? target.toFixed(1) : Math.round(target);
                } else {
                    counter.innerText = isFloat ? current.toFixed(1) : Math.round(current);
                }
            }, stepTime);
        });
    }

    // --- 5. AI ROUTINE & MACRO PLANNER LOGIC ---
    const goalRadios = document.querySelectorAll('input[name="fit-goal"]');
    const levelRadios = document.querySelectorAll('input[name="fit-level"]');
    const equipRadios = document.querySelectorAll('input[name="fit-equip"]');

    // UI Outputs
    const valCalories = document.getElementById('val-calories');
    const valDays = document.getElementById('val-days');
    const valTimeline = document.getElementById('val-timeline');
    const valProtein = document.getElementById('val-protein');
    const valCarbs = document.getElementById('val-carbs');
    const valFats = document.getElementById('val-fats');

    const barDays = document.getElementById('bar-days');
    const barTimeline = document.getElementById('bar-timeline');

    // Planner Formulas Database
    const formulas = {
        goal: {
            loss: { calories: 1750, protein: 140, carbs: 160, fats: 55, timeline: 12 },
            gain: { calories: 2750, protein: 175, carbs: 320, fats: 75, timeline: 16 },
            endurance: { calories: 2350, protein: 130, carbs: 290, fats: 65, timeline: 8 }
        },
        level: {
            beginner: { days: 3, calOffset: -50 },
            intermediate: { days: 4, calOffset: 0 },
            advanced: { days: 5, calOffset: 50 }
        },
        equip: {
            bodyweight: { daysOffset: -1, calOffset: -50 },
            dumbbells: { daysOffset: 0, calOffset: 0 },
            gym: { daysOffset: 0, calOffset: 50 }
        }
    };

    function updatePlannerStats() {
        // Find checked values
        const selectedGoal = document.querySelector('input[name="fit-goal"]:checked').value;
        const selectedLevel = document.querySelector('input[name="fit-level"]:checked').value;
        const selectedEquip = document.querySelector('input[name="fit-equip"]:checked').value;

        // Perform calculation
        const base = formulas.goal[selectedGoal];
        const lvl = formulas.level[selectedLevel];
        const eq = formulas.equip[selectedEquip];

        // Calculated stats
        const finalCalories = base.calories + lvl.calOffset + eq.calOffset;
        const finalDays = Math.max(3, Math.min(6, lvl.days + eq.daysOffset));
        const finalTimeline = base.timeline;

        // Protein scale based on calories
        let protein = base.protein;
        let carbs = base.carbs;
        let fats = base.fats;

        // Visual feedback progress bars
        // Weekly days (max scale 7)
        const daysPercentage = (finalDays / 7) * 100;
        barDays.style.width = `${daysPercentage}%`;
        // Timeline duration (max scale 24 weeks)
        const timelinePercentage = (finalTimeline / 24) * 100;
        barTimeline.style.width = `${timelinePercentage}%`;

        // Update text labels
        valCalories.innerText = `${finalCalories.toLocaleString()} Kcal`;
        valDays.innerText = `${finalDays} Days / Week`;
        valTimeline.innerText = `${finalTimeline} Weeks`;
        valProtein.innerText = `${protein}g`;
        valCarbs.innerText = `${carbs}g`;
        valFats.innerText = `${fats}g`;
    }

    // Connect selection events
    const radioGroups = [goalRadios, levelRadios, equipRadios];
    radioGroups.forEach(group => {
        group.forEach(radio => {
            radio.addEventListener('change', (e) => {
                // Remove active styling class on all sibling cards
                const nameAttr = e.target.getAttribute('name');
                const cards = document.querySelectorAll(`input[name="${nameAttr}"]`);
                cards.forEach(c => {
                    c.closest('.radio-card').classList.remove('active');
                });
                
                // Add active to selected
                e.target.closest('.radio-card').classList.add('active');

                // Perform stats calculation
                updatePlannerStats();
            });
        });
    });

    // Custom Quote Hook: Pre-populates contact text-area with planner specifications
    const configCheckoutBtn = document.getElementById('config-checkout-btn');
    const formSpecField = document.getElementById('form-spec');

    if (configCheckoutBtn && formSpecField) {
        configCheckoutBtn.addEventListener('click', () => {
            const goal = document.querySelector('input[name="fit-goal"]:checked').value.toUpperCase();
            const level = document.querySelector('input[name="fit-level"]:checked').value.toUpperCase();
            const equip = document.querySelector('input[name="fit-equip"]:checked').value.toUpperCase();
            
            const calories = valCalories.innerText;
            const days = valDays.innerText;
            const timeline = valTimeline.innerText;
            const protein = valProtein.innerText;
            const carbs = valCarbs.innerText;
            const fats = valFats.innerText;

            formSpecField.value = `AI PLANNER INPUTS SYNCED:
- Target Fitness Goal: ${goal}
- Experience Level: ${level}
- Available Equipment: ${equip}

CALCULATED TARGETS:
- Daily Calorie Intake: ${calories}
- Weekly Sessions: ${days}
- Est. Timeline Target: ${timeline}
- Target Macros: Protein ${protein} | Carbs ${carbs} | Fats ${fats}

Health History: None. Please establish coaching uplink.`;
        });
    }

    // --- 6. SECURE FORM UPLINK SIMULATOR ---
    const contactForm = document.getElementById('cyber-contact-form');
    const toast = document.getElementById('toast-notification');
    const toastTitle = document.getElementById('toast-title');
    const toastMsg = document.getElementById('toast-msg');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform simple success validation logs
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('span');
            const submitIcon = submitBtn.querySelector('i');
            
            // Visual transition loading
            submitBtn.style.opacity = '0.7';
            submitText.innerText = 'Syncing Profile...';
            submitIcon.setAttribute('data-lucide', 'loader');
            lucide.createIcons();

            setTimeout(() => {
                // Show notification pop
                toastTitle.innerText = 'Athlete Uplink Active';
                toastMsg.innerText = 'Custom workout split compiled and sent to your email.';
                toast.classList.add('active');

                // Restore button state
                submitBtn.style.opacity = '1';
                submitText.innerText = 'Submit Profile Uplink';
                submitIcon.setAttribute('data-lucide', 'activity');
                lucide.createIcons();
                
                // Clear input values
                contactForm.reset();

                // Clear toast notification after 4 seconds
                setTimeout(() => {
                    toast.classList.remove('active');
                }, 4000);
            }, 1500);
        });
    }
});
