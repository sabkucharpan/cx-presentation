class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 8;
        this.animationTimeout = null;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateNavigation();
        this.updateProgress();
        
        // Start animations for the first slide
        setTimeout(() => {
            this.triggerSlideAnimations(1);
        }, 500);
    }
    
    bindEvents() {
        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Slide indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index + 1));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
            }
        });
        
        // CTA button interactions
        const ctaButtons = document.querySelectorAll('.cta-btn, .final-cta');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleCTAClick(e.target.textContent.trim());
            });
        });
        
        // Touch/swipe support
        this.setupTouchEvents();
    }
    
    goToSlide(slideNumber) {
        // Validate slide number and prevent transition if already transitioning
        if (slideNumber < 1 || slideNumber > this.totalSlides || 
            slideNumber === this.currentSlide || this.isTransitioning) {
            return;
        }
        
        this.isTransitioning = true;
        
        // Clear any existing animation timeout
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
        

        
        // Get current and target slides
        const currentSlideEl = document.querySelector('.slide--active');
        const newSlideEl = document.querySelector(`[data-slide="${slideNumber}"]`);
        
        if (!newSlideEl) {
            console.error(`Slide ${slideNumber} not found`);
            this.isTransitioning = false;
            return;
        }
        
        // Remove active class from current slide
        if (currentSlideEl) {
            currentSlideEl.classList.remove('slide--active');
        }
        
        // Add active class to new slide
        newSlideEl.classList.add('slide--active');
        
        // Update current slide
        this.currentSlide = slideNumber;
        
        // Update all navigation elements
        this.updateNavigation();
        this.updateProgress();
        
        // Allow new transitions after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
            this.triggerSlideAnimations(slideNumber);
        }, 600); // Match CSS transition duration
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    updateNavigation() {
        // Update indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index + 1 === this.currentSlide) {
                indicator.classList.add('indicator--active');
            } else {
                indicator.classList.remove('indicator--active');
            }
        });
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.disabled = (this.currentSlide === 1);
        }
        
        if (nextBtn) {
            nextBtn.disabled = (this.currentSlide === this.totalSlides);
        }
    }
    
    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const percentage = (this.currentSlide / this.totalSlides) * 100;
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
    }
    
    triggerSlideAnimations(slideNumber) {
        const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (!slide) return;
        
        // Trigger specific animations based on slide content
        switch (slideNumber) {
            case 1:
                this.animateHero(slide);
                break;
            case 2:
                this.animateValueProps(slide);
                break;
            case 3:
                this.animateSpecs(slide);
                break;
            case 4:
                this.animateFeatures(slide);
                break;
            case 5:
                this.animateROI(slide);
                break;
            case 6:
                this.animateMarkets(slide);
                break;
            case 7:
                this.animateEcosystem(slide);
                break;
            case 8:
                this.animateContact(slide);
                break;
        }
    }
    
    animateHero(slide) {
        // Hero animations are handled by CSS, but we can add extra effects
        const lightningBolt = slide.querySelector('.lightning-bolt');
        if (lightningBolt) {
            setTimeout(() => {
                lightningBolt.style.animation = 'pulse 2s ease-in-out infinite';
            }, 1000);
        }
    }
    
    animateValueProps(slide) {
        // CSS animations handle the main transitions
        const valueProps = slide.querySelectorAll('.value-prop');
        valueProps.forEach((prop, index) => {
            setTimeout(() => {
                prop.style.transform = 'translateY(0)';
                prop.style.opacity = '1';
            }, index * 200 + 300);
        });
    }
    
    animateSpecs(slide) {
        // Animate the gauge fill
        setTimeout(() => {
            const gaugeFill = slide.querySelector('.gauge-fill');
            if (gaugeFill) {
                gaugeFill.style.width = '85%';
            }
        }, 1500);
    }
    
    animateFeatures(slide) {
        // Features are animated via CSS, add any special effects here
        const touchscreen = slide.querySelector('.touchscreen-mockup');
        if (touchscreen) {
            setTimeout(() => {
                touchscreen.style.animation = 'float 3s ease-in-out infinite';
            }, 1000);
        }
    }
    
    animateROI(slide) {
        // Animate the comparison bars
        setTimeout(() => {
            const comparisonFills = slide.querySelectorAll('.comparison-fill');
            if (comparisonFills.length >= 2) {
                comparisonFills[0].style.width = '70%';
                comparisonFills[1].style.width = '45%';
            }
        }, 1000);
    }
    
    animateMarkets(slide) {
        // Market cards are animated via CSS
        const marketCards = slide.querySelectorAll('.market-card');
        marketCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.opacity = '1';
            }, index * 200 + 300);
        });
    }
    
    animateEcosystem(slide) {
        // Ecosystem items and connectors
        const ecosystemItems = slide.querySelectorAll('.ecosystem-item');
        const connectors = slide.querySelectorAll('.ecosystem-connector');
        
        ecosystemItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                
                // Animate corresponding connector
                if (connectors[index]) {
                    setTimeout(() => {
                        connectors[index].style.opacity = '1';
                        connectors[index].style.transform = 'scaleX(1)';
                    }, 200);
                }
            }, index * 400 + 300);
        });
    }
    
    animateContact(slide) {
        // CTA buttons and contact info are animated via CSS
        const finalCta = slide.querySelector('.final-cta');
        if (finalCta) {
            setTimeout(() => {
                finalCta.classList.add('pulse');
            }, 1500);
        }
    }
    
    handleCTAClick(buttonText) {
        // Simulate CTA actions with improved notifications
        const actions = {
            'Book a Free Consultation': () => {
                this.showNotification('🗓️ Consultation booking system would open here', 'info');
            },
            'Calculate Your ROI': () => {
                this.showNotification('📊 ROI calculator would launch here', 'info');
            },
            'Schedule a Demo': () => {
                this.showNotification('🎬 Demo scheduling would open here', 'info');
            },
            'Get Started Today': () => {
                this.showNotification('🚀 Contact form would open here - Ready to charge ahead!', 'success');
            }
        };
        
        const action = actions[buttonText];
        if (action) {
            action();
        } else {
            this.showNotification('✨ Feature would be available in production', 'info');
        }
    }
    
    showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            document.body.removeChild(notification);
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const bgColor = type === 'success' ? '#008B8B' : '#f0f9ff';
        const textColor = type === 'success' ? 'white' : '#1e293b';
        const borderColor = type === 'success' ? '#006666' : '#008B8B';
        
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${bgColor};
            color: ${textColor};
            padding: 16px 20px;
            border-radius: 12px;
            border: 2px solid ${borderColor};
            box-shadow: 0 10px 25px rgba(0, 139, 139, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            max-width: 400px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 400);
            }
        }, 4000);
    }
    
    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let startTime = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY || this.isTransitioning) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            const deltaTime = endTime - startTime;
            
            // Only trigger if:
            // 1. Horizontal swipe is dominant
            // 2. Swipe distance is significant (>50px)
            // 3. Swipe was fast enough (<500ms)
            if (Math.abs(deltaX) > Math.abs(deltaY) && 
                Math.abs(deltaX) > 50 && 
                deltaTime < 500) {
                
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            // Reset values
            startX = 0;
            startY = 0;
            startTime = 0;
        }, { passive: true });
    }
    
    // Auto-advance functionality
    startAutoAdvance(interval = 8000) {
        this.stopAutoAdvance(); // Clear any existing timer
        
        this.autoAdvanceTimer = setInterval(() => {
            if (this.currentSlide < this.totalSlides) {
                this.nextSlide();
            } else {
                // Option: loop back to start or stop
                this.stopAutoAdvance();
            }
        }, interval);
        
        this.showNotification('▶️ Auto-advance started - Press ESC to stop', 'info');
    }
    
    stopAutoAdvance() {
        if (this.autoAdvanceTimer) {
            clearInterval(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }
    
    // Fullscreen functionality
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                this.showNotification('📺 Entered fullscreen mode - Press F or ESC to exit', 'info');
            }).catch(() => {
                this.showNotification('❌ Fullscreen not supported', 'info');
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Presentation controls
    goToFirstSlide() {
        this.goToSlide(1);
    }
    
    goToLastSlide() {
        this.goToSlide(this.totalSlides);
    }
    
    // Get current slide info
    getCurrentSlideInfo() {
        return {
            current: this.currentSlide,
            total: this.totalSlides,
            isFirst: this.currentSlide === 1,
            isLast: this.currentSlide === this.totalSlides,
            progress: (this.currentSlide / this.totalSlides) * 100
        };
    }
    

}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const presentation = new PresentationApp();
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Fullscreen toggle
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            presentation.toggleFullscreen();
        }
        
        // Auto-advance controls
        if (e.key === 'p' || e.key === 'P') {
            e.preventDefault();
            presentation.startAutoAdvance();
        }
        
        if (e.key === 'Escape') {
            e.preventDefault();
            presentation.stopAutoAdvance();
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
        
        // Quick navigation
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'Home') {
                e.preventDefault();
                presentation.goToFirstSlide();
            }
            if (e.key === 'End') {
                e.preventDefault();
                presentation.goToLastSlide();
            }
        }
    });
    
    // Add notification styles to document
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        
        .notification__message {
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .notification__close {
            background: none;
            border: none;
            color: inherit;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        }
        
        .notification__close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    `;
    
    document.head.appendChild(notificationStyles);
    
    // Make presentation globally accessible for debugging
    window.presentation = presentation;
    
    // Show welcome message
    setTimeout(() => {
        presentation.showNotification('🎯 Use arrow keys, swipe, or click indicators to navigate • Press F for fullscreen • Press P for auto-advance', 'info');
    }, 2000);
});

// Add enhanced entrance animations for first slide
setTimeout(() => {
    const firstSlide = document.querySelector('[data-slide="1"]');
    if (firstSlide && firstSlide.classList.contains('slide--active')) {
        const elements = {
            title: firstSlide.querySelector('.hero__title'),
            subtitle: firstSlide.querySelector('.hero__subtitle'),
            tagline: firstSlide.querySelector('.hero__tagline'),
            icon: firstSlide.querySelector('.charger-icon')
        };
        
        // Enhanced animations
        if (elements.icon) {
            elements.icon.style.animation = 'float 3s ease-in-out infinite';
        }
        
        // Add sparkle effect to lightning bolt
        const lightning = firstSlide.querySelector('.lightning-bolt');
        if (lightning) {
            setInterval(() => {
                lightning.style.filter = `drop-shadow(0 0 ${Math.random() * 15 + 5}px rgba(255, 255, 0, ${Math.random() * 0.5 + 0.5}))`;
            }, 500);
        }
    }
}, 1500);