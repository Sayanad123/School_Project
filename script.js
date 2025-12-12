
// DOM Elements
const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
const pages = document.querySelectorAll('.page');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.getElementById('navLinks');
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('aiSendBtn');
const aiChat = document.getElementById('aiChat');
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const marketplaceTabs = document.querySelectorAll('.marketplace-tab');
const marketplaceItems = document.querySelectorAll('.marketplace-item');
const ctaBtn = document.querySelector('.cta-btn');

// Current date for calendar
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// KEF AI Responses
const aiResponses = [
    "The library is open from 9 AM to 5 PM on weekdays. During exam periods, it's extended until 8 PM.",
    "The web development competition deadline is December 20th. Don't forget to submit your project!",
    "You can find your exam schedule in the calendar section of this website.",
    "The science fair will be held on December 20th in the main hall. All students are encouraged to participate.",
    "You can submit assignments through the school portal or directly to your teacher during class.",
    "The canteen is open from 8 AM to 4 PM on school days. They serve snacks and lunch.",
    "You can contact the administration office at extension 101 or visit them in the main building.",
    "School buses arrive at 7:30 AM and depart at 4:30 PM. Make sure to be on time!",
    "The computer lab is open for students from 10 AM to 5 PM, Monday to Friday.",
    "You can borrow up to 5 books from the library for 2 weeks at a time.",
    "The sports complex is open from 6 AM to 8 PM. You need your student ID to access facilities.",
    "Academic counseling sessions can be booked through the student portal or at the counseling office.",
    "WiFi access is available throughout campus. Use your student credentials to log in.",
    "Lost and found items are kept at the security office near the main gate.",
    "Student ID cards can be replaced at the administration office for a fee of Rs. 500."
];

// Navigation between pages
function navigateToPage(pageId) {
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Show selected page
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
            
            // If navigating to calendar, refresh it
            if (pageId === 'calendar') {
                generateCalendar(currentMonth, currentYear);
            }
        }
    });
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        navLinksContainer.classList.remove('active');
    }
    
    // Scroll to top of content
    document.querySelector('.content-area').scrollTop = 0;
}

// Initialize navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// KEF AI Chat functionality
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    aiChat.appendChild(messageDiv);
    aiChat.scrollTop = aiChat.scrollHeight;
}

function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords and provide relevant responses
    if (lowerMessage.includes('library') || lowerMessage.includes('book') || lowerMessage.includes('study')) {
        return "The library is open from 9 AM to 5 PM on weekdays. During exam periods, it's extended until 8 PM. You can borrow up to 5 books at a time.";
    } else if (lowerMessage.includes('competition') || lowerMessage.includes('web') || lowerMessage.includes('develop')) {
        return "The web development competition is on December 15th. Submit your projects by December 20th. Prizes will be awarded to the top 3 projects.";
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('schedule')) {
        return "Final exams start on January 8th, 2024. Check the calendar section for the complete schedule.";
    } else if (lowerMessage.includes('science') || lowerMessage.includes('fair')) {
        return "The science fair is on December 20th from 9 AM to 5 PM in the main hall. Registration closes on December 15th.";
    } else if (lowerMessage.includes('time') || lowerMessage.includes('hour') || lowerMessage.includes('open')) {
        return "School hours are 9 AM to 4 PM. The canteen is open 8 AM to 4 PM. Library hours are 9 AM to 5 PM (extended to 8 PM during exams).";
    } else if (lowerMessage.includes('bus') || lowerMessage.includes('transport')) {
        return "School buses arrive at 7:30 AM and depart at 4:30 PM. The bus schedule is posted at the main gate.";
    } else if (lowerMessage.includes('fee') || lowerMessage.includes('payment') || lowerMessage.includes('money')) {
        return "For fee-related queries, please contact the accounts office at extension 103 or visit them in the administration building.";
    } else if (lowerMessage.includes('teacher') || lowerMessage.includes('faculty') || lowerMessage.includes('staff')) {
        return "You can find teacher contact information on the school portal or visit the faculty office in the main building.";
    } else if (lowerMessage.includes('holiday') || lowerMessage.includes('break') || lowerMessage.includes('vacation')) {
        return "Winter break starts on December 25th and classes resume on January 2nd, 2024.";
    } else if (lowerMessage.includes('club') || lowerMessage.includes('activity') || lowerMessage.includes('sports')) {
        return "We have over 50 clubs and activities! Visit the student activities office to learn more and join.";
    } else {
        // Return a random response if no keywords match
        return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    }
}

aiSendBtn.addEventListener('click', () => {
    const userMessage = aiInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        aiInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const aiResponse = getAIResponse(userMessage);
            addMessage(aiResponse, false);
        }, 1000);
    }
});

aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        aiSendBtn.click();
    }
});

// Calendar functionality
const monthNames = ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function generateCalendar(month, year) {
    calendarGrid.innerHTML = '';
    
    // Update month/year display
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    
    // Add day headers
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day', 'header');
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        
        // Highlight current day
        if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
            dayElement.style.backgroundColor = '#e3f2fd';
            dayElement.style.fontWeight = 'bold';
        }
        
        // Add event indicators for specific days
        if ((day === 15 && month === 11) || (day === 20 && month === 11) || (day === 8 && month === 0)) {
            const eventIndicator = document.createElement('div');
            eventIndicator.classList.add('event-indicator');
            eventIndicator.innerHTML = '<i class="fas fa-calendar-check"></i>';
            eventIndicator.title = "Event on this day";
            dayElement.appendChild(eventIndicator);
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Initialize calendar
generateCalendar(currentMonth, currentYear);

// Calendar navigation
prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Marketplace tabs
marketplaceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        marketplaceTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const category = tab.getAttribute('data-category');
        
        // Show/hide items based on category
        marketplaceItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Buy button functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-buy')) {
        const itemName = e.target.closest('.marketplace-item').querySelector('h4').textContent;
        alert(`Thank you for your interest in "${itemName}"! The seller will contact you soon.`);
    }
});

// CTA button functionality
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        navigateToPage('marketplace');
    });
}

// Footer links
document.querySelectorAll('.footer-section a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// Initialize with some AI messages
window.addEventListener('DOMContentLoaded', () => {
    // Add welcome message to AI chat
    setTimeout(() => {
        addMessage("Hi there! I'm KEF AI Assistant. I can help you with information about school schedules, events, and academic resources. What would you like to know?", false);
    }, 500);
    
    // Initialize marketplace to show all items
    marketplaceItems.forEach(item => {
        item.style.display = 'block';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('header') && navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
const pages = document.querySelectorAll('.page');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.getElementById('navLinks');
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('aiSendBtn');
const aiChat = document.getElementById('aiChat');
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const marketplaceTabs = document.querySelectorAll('.marketplace-tab');
const marketplaceItems = document.querySelectorAll('.marketplace-item');
const ctaBtn = document.querySelector('.cta-btn');

// Current date for calendar
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// KEF AI Responses
const aiResponses = [
    "The library is open from 9 AM to 5 PM on weekdays. During exam periods, it's extended until 8 PM.",
    "The web development competition deadline is December 20th. Don't forget to submit your project!",
    "You can find your exam schedule in the calendar section of this website.",
    "The science fair will be held on December 20th in the main hall. All students are encouraged to participate.",
    "You can submit assignments through the school portal or directly to your teacher during class.",
    "The canteen is open from 8 AM to 4 PM on school days. They serve snacks and lunch.",
    "You can contact the administration office at extension 101 or visit them in the main building.",
    "School buses arrive at 7:30 AM and depart at 4:30 PM. Make sure to be on time!",
    "The computer lab is open for students from 10 AM to 5 PM, Monday to Friday.",
    "You can borrow up to 5 books from the library for 2 weeks at a time.",
    "The sports complex is open from 6 AM to 8 PM. You need your student ID to access facilities.",
    "Academic counseling sessions can be booked through the student portal or at the counseling office.",
    "WiFi access is available throughout campus. Use your student credentials to log in.",
    "Lost and found items are kept at the security office near the main gate.",
    "Student ID cards can be replaced at the administration office for a fee of Rs. 500."
];

// Navigation between pages
function navigateToPage(pageId) {
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Show selected page
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
            
            // If navigating to calendar, refresh it
            if (pageId === 'calendar') {
                generateCalendar(currentMonth, currentYear);
            }
        }
    });
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        navLinksContainer.classList.remove('active');
    }
    
    // Scroll to top of content
    document.querySelector('.content-area').scrollTop = 0;
}

// Initialize navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// KEF AI Chat functionality
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    aiChat.appendChild(messageDiv);
    aiChat.scrollTop = aiChat.scrollHeight;
}

function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords and provide relevant responses
    if (lowerMessage.includes('library') || lowerMessage.includes('book') || lowerMessage.includes('study')) {
        return "The library is open from 9 AM to 5 PM on weekdays. During exam periods, it's extended until 8 PM. You can borrow up to 5 books at a time.";
    } else if (lowerMessage.includes('competition') || lowerMessage.includes('web') || lowerMessage.includes('develop')) {
        return "The web development competition is on December 15th. Submit your projects by December 20th. Prizes will be awarded to the top 3 projects.";
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('schedule')) {
        return "Final exams start on January 8th, 2024. Check the calendar section for the complete schedule.";
    } else if (lowerMessage.includes('science') || lowerMessage.includes('fair')) {
        return "The science fair is on December 20th from 9 AM to 5 PM in the main hall. Registration closes on December 15th.";
    } else if (lowerMessage.includes('time') || lowerMessage.includes('hour') || lowerMessage.includes('open')) {
        return "School hours are 9 AM to 4 PM. The canteen is open 8 AM to 4 PM. Library hours are 9 AM to 5 PM (extended to 8 PM during exams).";
    } else if (lowerMessage.includes('bus') || lowerMessage.includes('transport')) {
        return "School buses arrive at 7:30 AM and depart at 4:30 PM. The bus schedule is posted at the main gate.";
    } else if (lowerMessage.includes('fee') || lowerMessage.includes('payment') || lowerMessage.includes('money')) {
        return "For fee-related queries, please contact the accounts office at extension 103 or visit them in the administration building.";
    } else if (lowerMessage.includes('teacher') || lowerMessage.includes('faculty') || lowerMessage.includes('staff')) {
        return "You can find teacher contact information on the school portal or visit the faculty office in the main building.";
    } else if (lowerMessage.includes('holiday') || lowerMessage.includes('break') || lowerMessage.includes('vacation')) {
        return "Winter break starts on December 25th and classes resume on January 2nd, 2024.";
    } else if (lowerMessage.includes('club') || lowerMessage.includes('activity') || lowerMessage.includes('sports')) {
        return "We have over 50 clubs and activities! Visit the student activities office to learn more and join.";
    } else {
        // Return a random response if no keywords match
        return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    }
}

aiSendBtn.addEventListener('click', () => {
    const userMessage = aiInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        aiInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const aiResponse = getAIResponse(userMessage);
            addMessage(aiResponse, false);
        }, 1000);
    }
});

aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        aiSendBtn.click();
    }
});

// Calendar functionality
const monthNames = ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function generateCalendar(month, year) {
    calendarGrid.innerHTML = '';
    
    // Update month/year display
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    
    // Add day headers
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day', 'header');
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        
        // Highlight current day
        if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
            dayElement.style.backgroundColor = '#e3f2fd';
            dayElement.style.fontWeight = 'bold';
        }
        
        // Add event indicators for specific days
        if ((day === 15 && month === 11) || (day === 20 && month === 11) || (day === 8 && month === 0)) {
            const eventIndicator = document.createElement('div');
            eventIndicator.classList.add('event-indicator');
            eventIndicator.innerHTML = '<i class="fas fa-calendar-check"></i>';
            eventIndicator.title = "Event on this day";
            dayElement.appendChild(eventIndicator);
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Initialize calendar
generateCalendar(currentMonth, currentYear);

// Calendar navigation
prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Marketplace tabs
marketplaceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        marketplaceTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const category = tab.getAttribute('data-category');
        
        // Show/hide items based on category
        marketplaceItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Buy button functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-buy')) {
        const itemName = e.target.closest('.marketplace-item').querySelector('h4').textContent;
        alert(`Thank you for your interest in "${itemName}"! The seller will contact you soon.`);
    }
});

// CTA button functionality
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        navigateToPage('marketplace');
    });
}

// Footer links
document.querySelectorAll('.footer-section a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// Initialize with some AI messages
window.addEventListener('DOMContentLoaded', () => {
    // Add welcome message to AI chat
    setTimeout(() => {
        addMessage("Hi there! I'm KEF AI Assistant. I can help you with information about school schedules, events, and academic resources. What would you like to know?", false);
    }, 500);
    
    // Initialize marketplace to show all items
    marketplaceItems.forEach(item => {
        item.style.display = 'block';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('header') && navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    })})})