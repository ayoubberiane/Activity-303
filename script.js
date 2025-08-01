// STEM Community Action Plan Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Button click handlers
    const getInvolvedBtn = document.getElementById('getInvolvedBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    
    // Get Involved button functionality
    getInvolvedBtn.addEventListener('click', function() {
        // Smooth scroll to action section
        const actionSection = document.querySelector('.action-section');
        actionSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add highlight effect
        actionSection.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            actionSection.style.animation = '';
        }, 1000);
        
        // Show alert with next steps
        setTimeout(() => {
            alert('Ready to get involved? Choose an action above or contact us at stembridge@community.org!');
        }, 500);
    });
    
    // Learn More button functionality
    learnMoreBtn.addEventListener('click', function() {
        // Create modal-like information display
        const modal = createInfoModal();
        document.body.appendChild(modal);
    });
    
    // Action list item interactions
    const actionItems = document.querySelectorAll('.action-list li');
    actionItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const actions = [
                'Visit stembridge.org/volunteer to sign up for mentoring!',
                'Drop off donations at our community center (123 Main St) on weekends!',
                'Contact your school board representative - we have template emails ready!',
                'Share this page on social media or send to friends via email!',
                'Next community meeting: First Saturday of every month at 10 AM!'
            ];
            
            alert(actions[index]);
        });
    });
    
    // Stats counter animation
    animateStats();
    
    // Add scroll reveal effects
    addScrollReveal();
    
    // Social sharing functionality
    addSocialSharing();
});

// Create information modal
function createInfoModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        margin: 20px;
        text-align: center;
        position: relative;
    `;
    
    content.innerHTML = `
        <h2 style="color: #2c3e50; margin-bottom: 20px;">About Our Initiative</h2>
        <p style="color: #7f8c8d; line-height: 1.6; margin-bottom: 20px;">
            Our STEM Bridge program was founded in 2023 to address the growing digital divide in our community. We've already helped over 200 students gain access to coding classes, science equipment, and mentorship opportunities.
        </p>
        <p style="color: #7f8c8d; line-height: 1.6; margin-bottom: 20px;">
            <strong>Our Impact So Far:</strong><br>
            • 5 new computer labs established<br>
            • 50+ volunteer mentors recruited<br>
            • $25,000 in equipment donations<br>
            • Partnership with 3 local tech companies
        </p>
        <button id="closeModal" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
            Close
        </button>
    `;
    
    modal.appendChild(content);
    
    // Close modal functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.id === 'closeModal') {
            document.body.removeChild(modal);
        }
    });
    
    return modal;
}

// Animate statistics with counting effect
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const targetValues = ['40', '3', '85'];
    
    statNumbers.forEach((stat, index) => {
        const target = parseInt(targetValues[index]);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (index === 0 || index === 2 ? '%' : '');
        }, 40);
    });
}

// Add scroll reveal effects
function addScrollReveal() {
    const sections = document.querySelectorAll('.problem-section, .leadership-section, .action-section, .urgency-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add social sharing functionality
function addSocialSharing() {
    // Add invisible share buttons that can be triggered
    const shareData = {
        title: 'Bridge the Gap - STEM Education Initiative',
        text: 'Help us bridge the STEM education gap in our community! Every student deserves access to quality science and technology education.',
        url: window.location.href
    };
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S to share
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (navigator.share) {
                navigator.share(shareData);
            } else {
                // Fallback: copy URL to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard! Share it with others to spread the word.');
                });
            }
        }
    });
}

// Add pulse animation for highlighted sections
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Add loading progress indicator
function showLoadingProgress() {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
        transition: width 0.3s ease;
        z-index: 9999;
    `;
    document.body.appendChild(progress);
    
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 15;
        if (width >= 100) {
            width = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.body.removeChild(progress);
            }, 500);
        }
        progress.style.width = width + '%';
    }, 100);
}

// Initialize loading progress on page load
showLoadingProgress();
