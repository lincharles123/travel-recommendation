let recommendationData = []

fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => recommendationData = data)
    .catch(error => console.error('Error:', error));

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
    document.getElementById('search').value = '';
    document.getElementById('search-results').innerHTML = '';
});

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    const search = document.getElementById('search').value.trim().toLowerCase();

    const destinationElement = document.getElementById('search-results');
    destinationElement.innerHTML = '';

    if(search === '') {
        return;
    }
    

    if(recommendationData.length === 0) {
        alert('Data is not loaded yet. Please try again later.');
        return;
    }

    recommendationData.forEach((recommendation) => {
        const country = recommendation.country.toLowerCase();

        recommendation.cities.forEach((city) => {
            const cityName = city.name.toLowerCase();
            const description = city.description.toLowerCase();

            if(country.includes(search) || cityName.includes(search) || description.includes(search)) {
                const cityElement = document.createElement('div');
                cityElement.className = 'destination';

                const options = { 
                    timeZone: recommendation.timeZone,
                    hour12: true, 
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'};
                const localTime = new Date().toLocaleTimeString('en-US', options);

                cityElement.innerHTML = `
                    <div class="destination-card">
                        <img class="destination-image" src="${city.imageUrl}" alt="${city.name}">
                        <div class="destination-info">
                            <h2 class="destination-title">${city.name}, ${recommendation.country}, ${localTime}</h2>
                            <p class="destination-description">${city.description}</p>
                            <Button type="button" class="destination-button">Learn More</Button>
                        </div>
                        
                    </div>
                `;
                destinationElement.appendChild(cityElement);
            }
        });
    });

    if(destinationElement.children.length === 0) {
        destinationElement.innerHTML = `
            <div class="no-destination">
                No destination found
            </div>
        `;
    }
});