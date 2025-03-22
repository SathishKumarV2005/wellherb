// Get current date and day of the week
function getCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    return {
        dayName: days[now.getDay()],
        date: now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    };
}

// Function to get upcoming days
function getUpcomingDays(currentDay) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentIndex = days.indexOf(currentDay);
    const upcoming = [];
    
    for(let i = 1; i <= 6; i++) {
        const nextIndex = (currentIndex + i) % 7;
        upcoming.push(days[nextIndex]);
    }
    return upcoming;
}

// Function to get previous days
function getPreviousDays(currentDay) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentIndex = days.indexOf(currentDay);
    const previous = [];
    
    for(let i = 1; i <= 3; i++) {
        const prevIndex = (currentIndex - i + 7) % 7;
        previous.push(days[prevIndex]);
    }
    return previous;
}

// Function to update the main herb card
function updateMainHerbCard(dayName) {
    const herb = herbSchedule[dayName];
    
    // Update image
    document.getElementById('todayHerbImage').src = herb.image;
    document.getElementById('todayHerbImage').alt = herb.name;
    
    // Update herb name
    document.getElementById('todayHerbName').textContent = herb.name;
    
    // Update benefits preview
    const benefitsHtml = herb.benefits
        .slice(0, 3)
        .map(benefit => `<span class="benefit-tag">${benefit}</span>`)
        .join('');
    document.getElementById('todayHerbBenefits').innerHTML = benefitsHtml;
    
    // Update link to details page
    document.getElementById('todayHerbLink').href = `herb_details.html?day=${dayName}`;
}

// Function to create timeline steps
function createTimelineSteps(days) {
    return days.map(day => {
        const herb = herbSchedule[day];
        return `
            <div class="timeline-step" onclick="window.location.href='herb_details2.html?day=${day}'">
                <div class="step-icon">
                    <i class="fas fa-seedling"></i>
                </div>
                <div class="step-content">
                    <h3>${day}</h3>
                    <p>${herb.name}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Function to create previous recommendation cards
function createPreviousCards(days) {
    return days.map(day => {
        const herb = herbSchedule[day];
        return `
            <div class="mini-card" onclick="window.location.href='herb_details2.html?day=${day}'">
                <img src="${herb.image}" alt="${herb.name}">
                <div class="mini-card-content">
                    <h4>${herb.name}</h4>
                    <p>${day}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize the page
function initializePage() {
    const { dayName, date } = getCurrentDay();
    
    // Update current date
    document.getElementById('currentDate').textContent = date;
    
    // Update today's herb
    updateMainHerbCard(dayName);
    
    // Update upcoming days
    const upcoming = getUpcomingDays(dayName);
    document.getElementById('upcomingDays').innerHTML = createTimelineSteps(upcoming);
    
    // Update previous days
    const previous = getPreviousDays(dayName);
    document.getElementById('previousDays').innerHTML = createPreviousCards(previous);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
