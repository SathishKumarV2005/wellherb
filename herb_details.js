// Get the herb name from the URL hash
function getHerbFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const day = urlParams.get('day');
    return day || 'Sunday'; // Default to Sunday if no day specified
}

// Initialize the page with herb details
function initializeHerbDetails() {
    const day = getHerbFromUrl();
    const herb = herbSchedule[day];
    
    if (!herb) {
        console.error('Herb not found');
        return;
    }

    // Update herb image
    document.getElementById('herbImage').src = herb.image;
    document.getElementById('herbImage').alt = herb.name;

    // Update herb name
    document.getElementById('herbName').textContent = herb.name;

    // Update benefits
    const benefitsList = document.getElementById('benefitsList');
    benefitsList.innerHTML = herb.benefits
        .map(benefit => `<li><i class="fas fa-check"></i> ${benefit}</li>`)
        .join('');

    // Update ingredients
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = herb.ingredients
        .map(ing => `
            <div class="ingredient-item">
                <i class="fas fa-mortar-pestle"></i>
                <div class="ingredient-details">
                    <h4>${ing.name}</h4>
                    <p>${ing.amount}</p>
                </div>
            </div>
        `)
        .join('');

    // Update procedure
    const procedureList = document.getElementById('procedureList');
    procedureList.innerHTML = herb.procedure
        .slice(0, 2) // Show only first 2 steps
        .map((step, index) => `
            <li>
                <div class="step-number">${index + 1}</div>
                <p>${step}</p>
            </li>
        `)
        .join('');

    // Update precautions
    const precautionsList = document.getElementById('precautionsList');
    precautionsList.innerHTML = herb.precautions
        .slice(0, 2) // Show only first 2 precautions
        .map(precaution => `<li><i class="fas fa-exclamation-triangle"></i> ${precaution}</li>`)
        .join('');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHerbDetails);
