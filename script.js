// Game State Management
class CashFlowGame {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.streak = 0;
        this.lives = 3;
        this.maxLevel = 10;
        this.scenarios = this.initializeScenarios();
        this.currentScenario = null;
        this.playerAnswers = {};
    }

    initializeScenarios() {
        return [
            {
                level: 1,
                company: "TechStart UK Ltd",
                description: "A young technology startup in London has completed its first quarter of operations. They've been busy developing their software product and securing initial customers.",
                transactions: [
                    { id: 1, text: "Received £25,000 cash from customer payments", amount: 25000, category: "operating", type: "inflow" },
                    { id: 2, text: "Paid £15,000 for office rent and utilities", amount: -15000, category: "operating", type: "outflow" },
                    { id: 3, text: "Purchased £30,000 of computer equipment", amount: -30000, category: "investing", type: "outflow" },
                    { id: 4, text: "Received £50,000 from venture capital funding", amount: 50000, category: "financing", type: "inflow" }
                ]
            },
            {
                level: 2,
                company: "Green Energy Solutions Ltd",
                description: "A renewable energy company in Manchester is expanding operations. They've made several strategic investments and operational decisions this quarter.",
                transactions: [
                    { id: 1, text: "Cash sales to customers: £80,000", amount: 80000, category: "operating", type: "inflow" },
                    { id: 2, text: "Paid suppliers for materials: £45,000", amount: -45000, category: "operating", type: "outflow" },
                    { id: 3, text: "Purchased manufacturing equipment: £120,000", amount: -120000, category: "investing", type: "outflow" },
                    { id: 4, text: "Sold old machinery for £15,000", amount: 15000, category: "investing", type: "inflow" },
                    { id: 5, text: "Obtained bank loan: £75,000", amount: 75000, category: "financing", type: "inflow" },
                    { id: 6, text: "Paid loan interest: £2,500", amount: -2500, category: "financing", type: "outflow" }
                ]
            },
            {
                level: 3,
                company: "Royal Retail Group plc",
                description: "A well-established retail chain with stores across the UK is restructuring its operations and making strategic changes to improve profitability.",
                transactions: [
                    { id: 1, text: "Customer receipts from sales: £200,000", amount: 200000, category: "operating", type: "inflow" },
                    { id: 2, text: "Payments to suppliers: £120,000", amount: -120000, category: "operating", type: "outflow" },
                    { id: 3, text: "Employee wages and salaries: £45,000", amount: -45000, category: "operating", type: "outflow" },
                    { id: 4, text: "Income tax payment: £8,000", amount: -8000, category: "operating", type: "outflow" },
                    { id: 5, text: "Purchased new store fixtures: £35,000", amount: -35000, category: "investing", type: "outflow" },
                    { id: 6, text: "Sold underperforming store: £180,000", amount: 180000, category: "investing", type: "inflow" },
                    { id: 7, text: "Dividend payment to shareholders: £25,000", amount: -25000, category: "financing", type: "outflow" },
                    { id: 8, text: "Repaid portion of long-term debt: £40,000", amount: -40000, category: "financing", type: "outflow" }
                ]
            }
        ];
    }

    startGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.streak = 0;
        this.lives = 3;
        this.updateUI();
        this.loadLevel();
        this.showGameSection();
    }

    loadLevel() {
        if (this.currentLevel <= this.scenarios.length) {
            this.currentScenario = this.scenarios[this.currentLevel - 1];
            this.playerAnswers = {};
            this.displayScenario();
            this.setupDragAndDrop();
            this.updateProgress();
        } else {
            this.showCompletionMessage();
        }
    }

    displayScenario() {
        const scenarioText = document.getElementById('scenarioText');
        const transactionDetails = document.getElementById('transactionDetails');
        
        scenarioText.textContent = this.currentScenario.description;
        
        // Clear previous transaction details
        transactionDetails.innerHTML = '';
        
        // Create draggable items
        const draggableContainer = document.getElementById('draggableItems');
        draggableContainer.innerHTML = '<h4 style="margin-bottom: 16px; text-align: center; color: var(--text-secondary);">Available Transactions</h4>';
        
        // Shuffle transactions for variety
        const shuffledTransactions = [...this.currentScenario.transactions].sort(() => Math.random() - 0.5);
        
        shuffledTransactions.forEach(transaction => {
            const item = document.createElement('div');
            item.className = 'draggable-item';
            item.draggable = true;
            item.dataset.transactionId = transaction.id;
            item.dataset.amount = transaction.amount;
            item.dataset.category = transaction.category;
            
            // Format amount with proper UK currency formatting
            const formattedAmount = new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(Math.abs(transaction.amount));
            
            item.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 4px;">${formattedAmount}</div>
                <div style="font-size: 14px;">${transaction.text}</div>
            `;
            
            draggableContainer.appendChild(item);
        });
        
        this.clearDropZones();
    }

    setupDragAndDrop() {
        const draggableItems = document.querySelectorAll('.draggable-item');
        const dropAreas = document.querySelectorAll('.drop-area');
        
        // Add drag event listeners to items
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
            item.addEventListener('dragend', this.handleDragEnd.bind(this));
        });
        
        // Add drop event listeners to drop areas
        dropAreas.forEach(area => {
            area.addEventListener('dragover', this.handleDragOver.bind(this));
            area.addEventListener('drop', this.handleDrop.bind(this));
            area.addEventListener('dragenter', this.handleDragEnter.bind(this));
            area.addEventListener('dragleave', this.handleDragLeave.bind(this));
        });
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.transactionId);
        e.target.classList.add('dragging');
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.target.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');
        
        const transactionId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.querySelector(`[data-transaction-id="${transactionId}"]`);
        const dropZone = e.target.closest('.drop-zone');
        
        if (draggedElement && dropZone) {
            const category = dropZone.dataset.category;
            const dropArea = dropZone.querySelector('.drop-area');
            
            // Remove from previous location if it exists
            this.removeFromPreviousLocation(transactionId);
            
            // Add to the drop area container, not to the target element
            dropArea.appendChild(draggedElement);
            this.playerAnswers[transactionId] = category;
            
            // Update totals
            this.updateCategoryTotals();
        }
    }

    removeFromPreviousLocation(transactionId) {
        // Remove from player answers if it was previously placed
        delete this.playerAnswers[transactionId];
    }

    updateCategoryTotals() {
        const categories = ['operating', 'investing', 'financing'];
        
        categories.forEach(category => {
            let total = 0;
            const dropArea = document.getElementById(`${category}Drop`);
            const items = dropArea.querySelectorAll('.draggable-item');
            
            items.forEach(item => {
                total += parseInt(item.dataset.amount);
            });
            
            const totalElement = document.getElementById(`${category}Total`);
            totalElement.textContent = new Intl.NumberFormat('en-GB', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(total);
            
            // Color coding for totals
            if (total > 0) {
                totalElement.style.color = 'var(--success-green)';
            } else if (total < 0) {
                totalElement.style.color = 'var(--error-red)';
            } else {
                totalElement.style.color = 'var(--primary-blue)';
            }
        });
    }

    checkAnswer() {
        let correctAnswers = 0;
        let totalTransactions = this.currentScenario.transactions.length;
        
        // Check each placed transaction
        Object.entries(this.playerAnswers).forEach(([transactionId, playerCategory]) => {
            const transaction = this.currentScenario.transactions.find(t => t.id == transactionId);
            const item = document.querySelector(`[data-transaction-id="${transactionId}"]`);
            
            if (transaction.category === playerCategory) {
                correctAnswers++;
                item.classList.add('correct');
                item.classList.remove('incorrect');
            } else {
                item.classList.add('incorrect');
                item.classList.remove('correct');
            }
        });
        
        // Check for unplaced transactions
        const unplacedCount = totalTransactions - Object.keys(this.playerAnswers).length;
        
        if (unplacedCount > 0) {
            this.showFeedback('Incomplete!', `Please place all ${totalTransactions} transactions before checking your answer.`, 'warning');
            return;
        }
        
        // Calculate score and provide feedback
        const accuracy = correctAnswers / totalTransactions;
        
        if (accuracy === 1) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer(correctAnswers, totalTransactions);
        }
    }

    handleCorrectAnswer() {
        this.streak++;
        const baseScore = 100;
        const streakBonus = this.streak * 10;
        const levelBonus = this.currentLevel * 5;
        const earnedScore = baseScore + streakBonus + levelBonus;
        
        this.score += earnedScore;
        
        this.showFeedback(
            'Brilliant!', 
            `Perfect categorisation! You earned ${earnedScore} points (${baseScore} base + ${streakBonus} streak bonus + ${levelBonus} level bonus).`,
            'success'
        );
        
        this.updateUI();
        this.showNextLevelButton();
    }

    handleIncorrectAnswer(correct, total) {
        this.streak = 0;
        this.lives = Math.max(0, this.lives - 1);
        
        if (this.lives === 0) {
            this.showFeedback(
                'Game Over!', 
                `You've run out of lives. You correctly categorised ${correct} out of ${total} transactions. Your final score: ${this.score} points.`,
                'error'
            );
            setTimeout(() => this.resetGame(), 3000);
        } else {
            this.showFeedback(
                'Not quite right!', 
                `You correctly categorised ${correct} out of ${total} transactions. Review the incorrect items (marked in red) and try again. Lives remaining: ${this.lives}`,
                'warning'
            );
        }
        
        this.updateUI();
    }

    showHint() {
        const hints = {
            operating: "Operating activities include day-to-day business operations like sales receipts, supplier payments, wages, and taxes.",
            investing: "Investing activities involve buying or selling long-term assets like equipment, property, or other companies.",
            financing: "Financing activities relate to raising money (loans, shares) or paying it back (loan repayments, dividends)."
        };
        
        let hintText = "💡 <strong>Cash Flow Categories:</strong><br><br>";
        Object.entries(hints).forEach(([category, hint]) => {
            hintText += `<strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong> ${hint}<br><br>`;
        });
        
        this.showFeedback('Hint', hintText, 'info');
    }

    nextLevel() {
        this.currentLevel++;
        this.loadLevel();
        document.querySelector('.btn-next').style.display = 'none';
    }

    clearDropZones() {
        const dropAreas = document.querySelectorAll('.drop-area');
        dropAreas.forEach(area => {
            area.innerHTML = '';
        });
        
        // Reset totals
        ['operating', 'investing', 'financing'].forEach(category => {
            document.getElementById(`${category}Total`).textContent = '0';
        });
    }

    updateUI() {
        document.getElementById('totalScore').textContent = this.score.toLocaleString();
        document.getElementById('currentLevel').textContent = this.currentLevel;
        document.getElementById('streak').textContent = this.streak;
        
        // Update lives display
        const livesElement = document.getElementById('lives');
        livesElement.textContent = '❤️'.repeat(this.lives) + '🤍'.repeat(3 - this.lives);
    }

    updateProgress() {
        const progress = (this.currentLevel - 1) / this.scenarios.length * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }

    showGameSection() {
        document.getElementById('games').style.display = 'block';
        document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
    }

    showNextLevelButton() {
        document.querySelector('.btn-next').style.display = 'inline-block';
    }

    showFeedback(title, content, type) {
        const modal = document.getElementById('feedbackModal');
        const titleElement = document.getElementById('feedbackTitle');
        const contentElement = document.getElementById('feedbackContent');
        
        titleElement.textContent = title;
        contentElement.innerHTML = content;
        
        // Apply styling based on type
        modal.className = `modal active feedback-${type}`;
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 100);
    }

    closeFeedback() {
        const modal = document.getElementById('feedbackModal');
        modal.classList.remove('active');
    }

    resetGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.streak = 0;
        this.lives = 3;
        this.updateUI();
        document.getElementById('games').style.display = 'none';
    }

    showCompletionMessage() {
        this.showFeedback(
            'Congratulations!', 
            `You've completed all levels! Your final score: ${this.score} points. You've mastered the fundamentals of cash flow statements!`,
            'success'
        );
    }
}

// Initialize game instance
const game = new CashFlowGame();

// Global functions for HTML event handlers
function startGame() {
    game.startGame();
}

function checkAnswer() {
    game.checkAnswer();
}

function showHint() {
    game.showHint();
}

function nextLevel() {
    game.nextLevel();
}

function showTutorial() {
    const modal = document.getElementById('tutorialModal');
    modal.classList.add('active');
}

function closeTutorial() {
    const modal = document.getElementById('tutorialModal');
    modal.classList.remove('active');
}

function closeFeedback() {
    game.closeFeedback();
}

// Additional UI enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
        
        if (e.key === 'Enter' && document.getElementById('games').style.display !== 'none') {
            checkAnswer();
        }
    });
    
    // Add loading animation for better UX
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Initialize tooltips for better accessibility
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.setAttribute('title', zone.querySelector('.category-description').textContent);
    });
});

// Performance optimization: Debounce drag events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Game error:', e.error);
    // Could implement error reporting here
});

// Service Worker registration for offline capability (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here for offline functionality
    });
}
