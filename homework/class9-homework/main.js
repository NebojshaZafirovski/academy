
document.getElementById('searchButton').addEventListener('click', () => {
    const countryName = document.getElementById('countryName').value;
    searchCountries(countryName);
});

document.getElementById('europeButton').addEventListener('click', () => {
    getCountriesByRegion('Europe');
});

document.getElementById('neighborsButton').addEventListener('click', () => {
    getBorderingCountries('MKD');
});

document.getElementById('macedoniaButton').addEventListener('click', () => {
    searchCountries('Macedonia');
});

async function searchCountries(name) {
    const API_URL = `https://restcountries.com/v3.1/name/${name}`;
    const output = document.getElementById('output');
    output.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        output.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Fetch countries by region
async function getCountriesByRegion(region) {
    const API_URL = `https://restcountries.com/v3.1/region/${region}`;
    const output = document.getElementById('output');
    output.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        output.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Fetch neighbouring countries
async function getBorderingCountries(countryCode) {
    const API_URL = `https://restcountries.com/v3.1/alpha/${countryCode}`;
    const output = document.getElementById('output');
    output.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countryData = await response.json();
        const country = countryData[0];
        
        const neighbours = country.borders;
        if (neighbours && neighbours.length > 0) {
            const neighbourPromises = neighbours.map(neighbourCode => 
                fetch(`https://restcountries.com/v3.1/alpha/${neighbourCode}`).then(res => res.json())
            );
            const neighbourData = await Promise.all(neighbourPromises);
            const neighbourCountries = neighbourData.map(data => data[0]);
            displayCountries(neighbourCountries);
        } else {
            output.innerHTML += '<p>No neighbouring countries found.</p>';
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        output.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Display a list of countries in the output area
function displayCountries(countries) {
    const output = document.getElementById('output');
    // Create container for the country cards
    output.innerHTML = '<div class="country-list">';
    countries.forEach(country => {
        output.innerHTML += `
            <div class="country-card">
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                <h2>${country.name.common}</h2>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                <a href="https://en.wikipedia.org/wiki/${country.name.common}" target="_blank">Open on Wikipedia</a>
            </div>
        `;
    });
    output.innerHTML += '</div>';
}