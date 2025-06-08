// Game State Management
class CashFlowGame {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.lives = 3;
        this.maxLevel = 8;
        this.scenarios = this.initializeScenarios();
        this.currentScenario = null;
        this.playerAnswers = {};
    }

    initializeScenarios() {
        return [
            {
                level: 1,
                company: "Digital Solutions Ltd",
                description: "A small web design company in Brighton has just started trading. They've completed their first project for a local restaurant.",
                transactions: [
                    { id: 1, text: "Received £2,500 from client for website development", amount: 2500, category: "operating", type: "inflow" }
                ]
            },
            {
                level: 2,
                company: "Green Thumb Gardening Ltd",
                description: "A landscaping business in Leeds has had a busy month. They've served customers and invested in new equipment.",
                transactions: [
                    { id: 1, text: "Cash received from garden maintenance services: £4,200", amount: 4200, category: "operating", type: "inflow" },
                    { id: 2, text: "Purchased new lawn mower and tools: £1,800", amount: -1800, category: "investing", type: "outflow" }
                ]
            },
            {
                level: 3,
                company: "TechStart UK Ltd",
                description: "A young technology startup in London has completed its first quarter. They've secured funding and started operations.",
                transactions: [
                    { id: 1, text: "Received £25,000 cash from customer payments", amount: 25000, category: "operating", type: "inflow" },
                    { id: 2, text: "Paid £15,000 for office rent and utilities", amount: -15000, category: "operating", type: "outflow" },
                    { id: 3, text: "Received £50,000 from angel investor funding", amount: 50000, category: "financing", type: "inflow" }
                ]
            },
            {
                level: 4,
                company: "Artisan Bakery plc",
                description: "A traditional bakery in Bath is expanding. They've opened a second location and are managing increased operations.",
                transactions: [
                    { id: 1, text: "Daily cash sales from customers: £8,500", amount: 8500, category: "operating", type: "inflow" },
                    { id: 2, text: "Paid suppliers for flour and ingredients: £3,200", amount: -3200, category: "operating", type: "outflow" },
                    { id: 3, text: "Staff wages for the month: £5,400", amount: -5400, category: "operating", type: "outflow" },
                    { id: 4, text: "Purchased commercial oven for new shop: £12,000", amount: -12000, category: "investing", type: "outflow" }
                ]
            },
            {
                level: 5,
                company: "Northern Logistics Ltd",
                description: "A freight and delivery company in Manchester is modernising its fleet and expanding services across the North West.",
                transactions: [
                    { id: 1, text: "Customer payments for delivery services: £45,000", amount: 45000, category: "operating", type: "inflow" },
                    { id: 2, text: "Fuel and vehicle maintenance costs: £18,500", amount: -18500, category: "operating", type: "outflow" },
                    { id: 3, text: "Driver wages and National Insurance: £22,000", amount: -22000, category: "operating", type: "outflow" },
                    { id: 4, text: "Purchased three new delivery vans: £75,000", amount: -75000, category: "investing", type: "outflow" },
                    { id: 5, text: "Bank loan for vehicle financing: £60,000", amount: 60000, category: "financing", type: "inflow" }
                ]
            },
            {
                level: 6,
                company: "Green Energy Solutions Ltd",
                description: "A renewable energy company in Glasgow is expanding operations. They've made strategic investments and operational decisions this quarter.",
                transactions: [
                    { id: 1, text: "Cash sales to customers: £95,000", amount: 95000, category: "operating", type: "inflow" },
                    { id: 2, text: "Paid suppliers for solar panels and materials: £52,000", amount: -52000, category: "operating", type: "outflow" },
                    { id: 3, text: "Employee salaries and PAYE contributions: £28,000", amount: -28000, category: "operating", type: "outflow" },
                    { id: 4, text: "Purchased manufacturing equipment: £85,000", amount: -85000, category: "investing", type: "outflow" },
                    { id: 5, text: "Sold old machinery for £12,000", amount: 12000, category: "investing", type: "inflow" },
                    { id: 6, text: "Obtained bank loan for expansion: £70,000", amount: 70000, category: "financing", type: "inflow" }
                ]
            },
            {
                level: 7,
                company: "Heritage Hotels Group plc",
                description: "A boutique hotel chain in the Cotswolds is renovating properties and managing seasonal operations during peak tourist season.",
                transactions: [
                    { id: 1, text: "Guest accommodation and restaurant receipts: £185,000", amount: 185000, category: "operating", type: "inflow" },
                    { id: 2, text: "Food and beverage supplier payments: £65,000", amount: -65000, category: "operating", type: "outflow" },
                    { id: 3, text: "Housekeeping and restaurant staff wages: £45,000", amount: -45000, category: "operating", type: "outflow" },
                    { id: 4, text: "Utilities and property maintenance: £18,500", amount: -18500, category: "operating", type: "outflow" },
                    { id: 5, text: "Room renovation and new furniture: £95,000", amount: -95000, category: "investing", type: "outflow" },
                    { id: 6, text: "Sold unused land adjacent to hotel: £150,000", amount: 150000, category: "investing", type: "inflow" },
                    { id: 7, text: "Dividend payment to shareholders: £35,000", amount: -35000, category: "financing", type: "outflow" }
                ]
            },
            {
                level: 8,
                company: "Precision Engineering Ltd",
                description: "A manufacturing company in Birmingham specialising in automotive parts is investing heavily in new technology while managing complex operations.",
                transactions: [
                    { id: 1, text: "Customer receipts from automotive contracts: £240,000", amount: 240000, category: "operating", type: "inflow" },
                    { id: 2, text: "Raw materials and components purchased: £125,000", amount: -125000, category: "operating", type: "outflow" },
                    { id: 3, text: "Manufacturing staff wages and benefits: £68,000", amount: -68000, category: "operating", type: "outflow" },
                    { id: 4, text: "Corporation tax payment to HMRC: £15,000", amount: -15000, category: "operating", type: "outflow" },
                    { id: 5, text: "Factory rent and business rates: £22,000", amount: -22000, category: "operating", type: "outflow" },
                    { id: 6, text: "Purchased CNC machinery and robotics: £180,000", amount: -180000, category: "investing", type: "outflow" },
                    { id: 7, text: "Proceeds from sale of old equipment: £35,000", amount: 35000, category: "investing", type: "inflow" },
                    { id: 8, text: "Bank loan repayment (capital portion): £25,000", amount: -25000, category: "financing", type: "outflow" }
                ]
            }
        ];
    }

    startGame() {
        this.currentLevel = 1;
        this.score = 0;
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
            this.updateUI();
        } else {
            this.showCompletionMessage();
        }
    }

    displayScenario() {
        const scenarioText = document.getElementById('scenarioText');
        const transactionDetails = document.getElementById('transactionDetails');
        const gameTitle = document.querySelector('.game-title');
        
        // Update the company name in the game title
        gameTitle.textContent = `Scenario: ${this.currentScenario.company}`;
        
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
            const isNegative = transaction.amount < 0;
            const absoluteAmount = Math.abs(transaction.amount);
            const formattedAmount = new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(absoluteAmount);
            
            // Display negative amounts in brackets for proper accounting presentation
            const displayAmount = isNegative ? `(${formattedAmount})` : formattedAmount;
            
            item.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 4px;">${displayAmount}</div>
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
        let netTotal = 0;
        const categoryTotals = {};
        
        categories.forEach(category => {
            let total = 0;
            const dropArea = document.getElementById(`${category}Drop`);
            const items = dropArea.querySelectorAll('.draggable-item');
            
            items.forEach(item => {
                total += parseInt(item.dataset.amount);
            });
            
            categoryTotals[category] = total;
            netTotal += total;
            
            const totalElement = document.getElementById(`${category}Total`);
            
            // Format total with brackets for negative amounts
            const isNegativeTotal = total < 0;
            const absoluteTotal = Math.abs(total);
            const formattedTotal = new Intl.NumberFormat('en-GB', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(absoluteTotal);
            
            const displayTotal = isNegativeTotal ? `(${formattedTotal})` : formattedTotal;
            totalElement.textContent = displayTotal;
            
            // Color coding for totals
            if (total > 0) {
                totalElement.style.color = 'var(--success-green)';
            } else if (total < 0) {
                totalElement.style.color = 'var(--error-red)';
            } else {
                totalElement.style.color = 'var(--primary-blue)';
            }
        });
        
        // Update Net Cash Flow
        this.updateNetCashFlow(netTotal, categoryTotals);
    }
    
    updateNetCashFlow(netTotal, categoryTotals) {
        const netCashFlowElement = document.getElementById('netCashFlow');
        const netAmountElement = netCashFlowElement;
        
        // Format net total with brackets for negative amounts
        const isNegativeNet = netTotal < 0;
        const absoluteNet = Math.abs(netTotal);
        const formattedNet = new Intl.NumberFormat('en-GB', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(absoluteNet);
        
        const displayNet = isNegativeNet ? `(£${formattedNet})` : `£${formattedNet}`;
        netCashFlowElement.textContent = displayNet;
        
        // Update styling based on net amount
        netAmountElement.classList.remove('positive', 'negative', 'neutral');
        if (netTotal > 0) {
            netAmountElement.classList.add('positive');
        } else if (netTotal < 0) {
            netAmountElement.classList.add('negative');
        } else {
            netAmountElement.classList.add('neutral');
        }
        
        // Update breakdown values
        const categories = ['operating', 'investing', 'financing'];
        categories.forEach(category => {
            const total = categoryTotals[category];
            const breakdownElement = document.getElementById(`net${category.charAt(0).toUpperCase() + category.slice(1)}`);
            
            if (breakdownElement) {
                const isNegative = total < 0;
                const absolute = Math.abs(total);
                const formatted = new Intl.NumberFormat('en-GB', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(absolute);
                
                const display = isNegative ? `(£${formatted})` : `£${formatted}`;
                breakdownElement.textContent = display;
                
                // Color coding for breakdown
                breakdownElement.classList.remove('positive', 'negative');
                if (total > 0) {
                    breakdownElement.classList.add('positive');
                } else if (total < 0) {
                    breakdownElement.classList.add('negative');
                }
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
        const earnedScore = 100;
        
        this.score += earnedScore;
        
        this.showFeedback(
            'Brilliant!', 
            `Perfect categorisation! You earned ${earnedScore} points.`,
            'success'
        );
        
        this.updateUI();
        this.showNextLevelButton();
    }

    handleIncorrectAnswer(correct, total) {
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
        
        // Update lives display
        const livesElement = document.getElementById('lives');
        livesElement.textContent = '❤️'.repeat(this.lives) + '🤍'.repeat(3 - this.lives);
    }

    updateProgress() {
        const progress = (this.currentLevel - 1) / this.scenarios.length * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }

    showGameSection() {
        const gamesSection = document.getElementById('games');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = gamesSection.offsetTop - navbarHeight - 20; // 20px extra padding
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
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
        this.lives = 3;
        this.updateUI();
        // Scroll back to hero section after reset
        document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
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

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the first level to show content immediately
    game.loadLevel();
    game.updateUI();
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20; // 20px extra padding
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
    
    // Add click handler for hero "Play Games" button
    const playButton = document.querySelector('.btn-primary');
    if (playButton) {
        playButton.addEventListener('click', function() {
            const gamesSection = document.getElementById('games');
            if (gamesSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = gamesSection.offsetTop - navbarHeight - 20; // 20px extra padding
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    }
});

// Global functions for HTML event handlers
function startGame() {
    game.startGame();
    // Scroll to games section smoothly with navbar offset
    const gamesSection = document.getElementById('games');
    if (gamesSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = gamesSection.offsetTop - navbarHeight - 20; // 20px extra padding
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
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
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20; // 20px extra padding
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
    
    // Add smooth scrolling for footer links
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20; // 20px extra padding
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
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
