function getCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    return days[today];
}

function getCurrentHerbData() {
    const currentDay = getCurrentDay();
    return herbSchedule[currentDay];
}

// Update content based on current herb
function updateCurrentHerbContent() {
    const currentHerb = getCurrentHerbData();
    const contentContainer = document.getElementById('content-container');
    
    if (!currentHerb || !contentContainer) return;

    // Update page title with current herb
    const titleElement = document.getElementById('current-herb-title');
    if (titleElement) {
        titleElement.textContent = `${currentHerb.name} - Today's Herb (${getCurrentDay()})`;
    }

    return currentHerb;
}
