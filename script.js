// Herb database organized by days of the week
const herbSchedule = {
    Sunday: {
        id: 'sunday_herb',
        name: 'Turmeric (Manjal)',
        image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=500&auto=format',
        benefits: ['Anti-inflammatory', 'Antioxidant', 'Immune Support'],
        description: 'A powerful anti-inflammatory herb that supports immune health and digestion.',
        ingredients: ['Fresh turmeric root', 'Black pepper', 'Honey'],
        procedure: '1. Clean and peel fresh turmeric root\n2. Grate or blend into a paste\n3. Mix with warm water and honey\n4. Add a pinch of black pepper to increase absorption',
        precautions: ['Avoid if on blood-thinning medications', 'May cause stomach upset in high doses', 'Can stain clothes and surfaces']
    },
    Monday: {
        id: 'monday_herb',
        name: 'Ginger (Inji)',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format',
        benefits: ['Digestive Aid', 'Anti-nausea', 'Anti-inflammatory'],
        description: 'Supports digestive health and reduces inflammation.',
        ingredients: ['Fresh ginger root', 'Lemon', 'Honey'],
        procedure: '1. Wash and slice fresh ginger\n2. Boil in water for 10 minutes\n3. Strain and add lemon and honey\n4. Serve warm',
        precautions: ['May interact with diabetes medications', 'Avoid before surgery', 'Can cause heartburn in some people']
    },
    Tuesday: {
        id: 'tuesday_herb',
        name: 'Holy Basil (Tulsi)',
        image: 'https://images.unsplash.com/photo-1615485290466-5a76c5378f02?w=500&auto=format',
        benefits: ['Stress Relief', 'Adaptogenic', 'Immune Support'],
        description: 'An adaptogenic herb that helps the body manage stress.',
        ingredients: ['Fresh tulsi leaves', 'Water', 'Optional: honey'],
        procedure: '1. Pluck fresh tulsi leaves\n2. Boil water and add leaves\n3. Steep for 5-10 minutes\n4. Strain and add honey if desired',
        precautions: ['May slow blood clotting', 'Avoid during pregnancy', 'Can interact with certain medications']
    },
    Wednesday: {
        id: 'wednesday_herb',
        name: 'Moringa (Murungai)',
        image: 'https://images.unsplash.com/photo-1615485290466-5a76c5378f02?w=500&auto=format',
        benefits: ['Nutrient Rich', 'Energy Boost', 'Antioxidant'],
        description: 'A nutrient-dense superfood packed with vitamins and minerals.',
        ingredients: ['Moringa leaves', 'Water', 'Lemon'],
        procedure: '1. Clean moringa leaves\n2. Boil water and add leaves\n3. Simmer for 5 minutes\n4. Strain and add lemon',
        precautions: ['May lower blood sugar', 'Avoid if pregnant', 'Start with small amounts']
    },
    Thursday: {
        id: 'thursday_herb',
        name: 'Neem (Vembu)',
        image: 'https://images.unsplash.com/photo-1615485290466-5a76c5378f02?w=500&auto=format',
        benefits: ['Blood Purifier', 'Skin Health', 'Immune Booster'],
        description: 'A bitter herb known for its purifying properties.',
        ingredients: ['Neem leaves', 'Water', 'Honey (optional)'],
        procedure: '1. Wash neem leaves\n2. Boil in water for 10 minutes\n3. Strain and cool\n4. Add honey if desired',
        precautions: ['Not for pregnant women', 'Can lower blood sugar', 'Start with small doses']
    },
    Friday: {
        id: 'friday_herb',
        name: 'Mint (Pudina)',
        image: 'https://images.unsplash.com/photo-1615485290466-5a76c5378f02?w=500&auto=format',
        benefits: ['Digestive Health', 'Fresh Breath', 'Cooling Effect'],
        description: 'A cooling herb that aids digestion and freshens breath.',
        ingredients: ['Fresh mint leaves', 'Water', 'Lemon', 'Honey'],
        procedure: '1. Clean mint leaves\n2. Crush leaves gently\n3. Add to boiling water\n4. Strain and add lemon and honey',
        precautions: ['May interact with certain medications', 'Avoid large amounts if pregnant', 'Can worsen acid reflux']
    },
    Saturday: {
        id: 'saturday_herb',
        name: 'Cinnamon (Pattai)',
        image: 'https://images.unsplash.com/photo-1615485290466-5a76c5378f02?w=500&auto=format',
        benefits: ['Blood Sugar Control', 'Anti-bacterial', 'Warming'],
        description: 'A warming spice that helps regulate blood sugar.',
        ingredients: ['Cinnamon stick', 'Water', 'Honey'],
        procedure: '1. Break cinnamon stick into pieces\n2. Boil in water for 10-15 minutes\n3. Strain and cool slightly\n4. Add honey if desired',
        precautions: ['May interact with diabetes medications', 'Avoid large amounts during pregnancy', 'Can lower blood pressure']
    }
};

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
    const upcomingDays = [];
    
    for (let i = 1; i <= 6; i++) {
        const nextIndex = (currentIndex + i) % 7;
        upcomingDays.push(days[nextIndex]);
    }
    
    return upcomingDays;
}

// Function to get previous days
function getPreviousDays(currentDay) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentIndex = days.indexOf(currentDay);
    const previousDays = [];
    
    for (let i = 1; i <= 7; i++) {
        const prevIndex = (currentIndex - i + 7) % 7;
        previousDays.push(days[prevIndex]);
    }
    
    return previousDays;
}

// Function to update the main herb card
function updateMainHerbCard(dayName) {
    const herb = herbSchedule[dayName];
    const herbCard = document.querySelector('.herb-card');
    
    herbCard.innerHTML = `
        <div class="herb-image">
            <img src="${herb.image}" alt="${herb.name}">
        </div>
        <div class="herb-info">
            <h4>${herb.name}</h4>
            <p>${herb.description}</p>
            <button class="view-details-btn" onclick="viewHerbDetails('${herb.id}')">View Details</button>
        </div>
    `;
}

// Function to view herb details
function viewHerbDetails(herbId) {
    window.location.href = `herb_details.html?id=${herbId}`;
}

// Function to initialize the page
function initializePage() {
    const { dayName, date } = getCurrentDay();
    document.getElementById('currentDate').textContent = date;
    
    // Update main herb card
    updateMainHerbCard(dayName);
    
    // Add upcoming days
    const upcomingDays = getUpcomingDays(dayName);
    const upcomingContainer = document.querySelector('.upcoming-days');
    upcomingContainer.innerHTML = '';
    
    upcomingDays.forEach((day) => {
        const herb = herbSchedule[day];
        const dayElement = document.createElement('div');
        dayElement.className = 'timeline-step';
        dayElement.innerHTML = `
            <div class="step-icon">
                <i class="fas fa-calendar-day"></i>
            </div>
            <div class="step-content">
                <h3>${day}</h3>
                <div class="herb-card upcoming" onclick="viewHerbDetails('${herb.id}')">
                    <div class="herb-image">
                        <img src="${herb.image}" alt="${herb.name}">
                    </div>
                    <div class="herb-info">
                        <h4>${herb.name}</h4>
                        <p>${herb.description}</p>
                    </div>
                </div>
            </div>
        `;
        upcomingContainer.appendChild(dayElement);
    });
    
    // Add previous recommendations
    const previousDays = getPreviousDays(dayName);
    const recommendationGrid = document.querySelector('.recommendation-grid');
    recommendationGrid.innerHTML = '';
    
    previousDays.forEach((day) => {
        const herb = herbSchedule[day];
        const recommendationCard = document.createElement('div');
        recommendationCard.className = 'herb-card';
        recommendationCard.onclick = () => viewHerbDetails(herb.id);
        recommendationCard.innerHTML = `
            <div class="herb-image">
                <img src="${herb.image}" alt="${herb.name}">
            </div>
            <div class="herb-info">
                <h4>${herb.name}</h4>
                <p>${herb.description}</p>
            </div>
        `;
        recommendationGrid.appendChild(recommendationCard);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
