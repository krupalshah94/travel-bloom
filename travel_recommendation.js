const searchBox = document.getElementById("destination-search-input");
const searchButton = document.getElementById("search-destination-btn");
const resultsContainer = document.getElementById("destination-container");

async function fetchApi(event) {
  event.preventDefault();
  const response = await fetch("travel_recommendation_api.json");
  const data = await response.json();
  return data;
}

async function searchCities(event) {
  const searchTerm = searchBox.value.toLowerCase();
  resultsContainer.innerHTML = ""; // Clear previous results

  if (searchTerm !== "") {
    let recommendations = [];

    const data = await fetchApi(event);

    // Check if the search term matches any specific category
    if (searchTerm === "temple" || searchTerm === "temples") {
      recommendations = data.temples;
    } else if (searchTerm === "beach" || searchTerm === "beaches") {
      recommendations = data.beaches;
    } else {
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(searchTerm)) {
            recommendations.push(city);
          }
        });
      });

      data.temples.forEach((city) => {
        if (city.name.toLowerCase().includes(searchTerm)) {
          recommendations.push(city);
        }
      });

      data.beaches.forEach((city) => {
        if (city.name.toLowerCase().includes(searchTerm)) {
          recommendations.push(city);
        }
      });
    }

    // Generate country cards for each matching country
    recommendations.forEach((city) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${city.imageUrl}" alt="${city.name}">
        <h2>${city.name}</h2>
        <p>${city.description}</p>
        <button type="button" class="btn btn-info visit-btn">Visit</button>
      `;
      resultsContainer.appendChild(card);
    });
  }
}

function clearSearch() {
  searchBox.value = ""; // Clear search input
  resultsContainer.innerHTML = ""; // Clear results container
}

searchButton.addEventListener("click", searchCities);
