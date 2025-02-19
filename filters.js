document.addEventListener("DOMContentLoaded", function () {
    loadFilters();
    loadLocations();
});

var map;
var allMarkers = [];
var siteData = [];

function loadFilters() {
    const filters = {
        timePeriodFilter: ["All", "Prehistoric", "Indigenous & Native History", "Colonial & Early Settlements",
                           "19th Century & Westward Expansion", "Industrial Revolution & 20th Century",
                           "Modern History & Civil Rights"],

        thematicCategoryFilter: ["All", "Military & War History", "Architectural & Urban History",
                                 "Cultural & Artistic History", "Religious & Spiritual History",
                                 "Science & Innovation", "Maritime & Transportation"],

        siteTypeFilter: ["All", "Museums & Exhibits", "Archaeological Sites", "Landmarks & Monuments",
                         "Historic Homes & Estates", "Cemeteries & Burial Sites"],

        historyScopeFilter: ["All", "Local", "National"],
        timeframeFilter: ["All", "5 - 10 min", "10 min - 1 hour", "1+ hours"],
        costFilter: ["All", "Free", "$1 - 5", "$6 - 20", "$20+"],
        distanceFilter: ["All", "<0.5 mi", "0.5 - 2 mi", "2 - 10 mi", "10 mi+"],
        reservationFilter: ["All", "Yes", "No"],
        tourTypeFilter: ["All", "Guided", "Self Tour", "Offers both"],
        transitFilter: ["All", "<0.5 mile", "1-10 miles", "10+ miles"],
        familyFilter: ["All", "Yes", "No"],
        dogFriendlyFilter: ["All", "Yes", "No"],
        giftShopFilter: ["All", "Yes", "No"],
        diningFilter: ["All", "Yes", "No"],
        hiddenGemFilter: ["All", "Yes", "No"],
        mustSeeFilter: ["All", "Yes", "No"],
        mondayFilter: ["All", "Yes", "No"],
        openLateFilter: ["All", "Yes", "No"],
        openEarlyFilter: ["All", "Yes", "No"],
        luggageStorageFilter: ["All", "Yes", "Unknown"],
        paymentFilter: ["All", "Cash only", "Credit card only", "Free"],
        publicAccessFilter: ["All", "Step inside", "Only view from outside"]
    };

    let container = document.getElementById("filterContainer");
    container.innerHTML = "";

    Object.keys(filters).forEach(filterId => {
        let filterGroup = document.createElement("div");
        filterGroup.classList.add("filter-group");

        let label = document.createElement("label");
        label.textContent = filterId.replace(/([A-Z])/g, " $1").trim() + ":";

        let select = document.createElement("select");
        select.id = filterId;

        filters[filterId].forEach(option => {
            let opt = document.createElement("option");
            opt.value = option.toLowerCase();
            opt.textContent = option;
            select.appendChild(opt);
        });

        filterGroup.appendChild(label);
        filterGroup.appendChild(select);
        container.appendChild(filterGroup);
    });
}

function loadLocations() {
    fetch('locations.json')
        .then(response => response.json())
        .then(data => {
            siteData = data;
            initializeMap();
            applyFilters();
        })
        .catch(error => console.error("Error loading JSON:", error));
}

function initializeMap() {
    if (!map) {
        map = L.map('map').setView([39.7392, -104.9903], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }
}

function applyFilters() {
    let selectedFilters = {
        timePeriod: document.getElementById("timePeriodFilter").value,
        thematicCategory: document.getElementById("thematicCategoryFilter").value,
        siteType: document.getElementById("siteTypeFilter").value,
        historyScope: document.getElementById("historyScopeFilter").value,
        timeframe: document.getElementById("timeframeFilter").value,
        cost: document.getElementById("costFilter").value,
        distance: document.getElementById("distanceFilter").value,
        reservation: document.getElementById("reservationFilter").value,
        tourType: document.getElementById("tourTypeFilter").value,
        transit: document.getElementById("transitFilter").value,
        family: document.getElementById("familyFilter").value,
        dogFriendly: document.getElementById("dogFriendlyFilter").value,
        giftShop: document.getElementById("giftShopFilter").value,
        dining: document.getElementById("diningFilter").value,
        hiddenGem: document.getElementById("hiddenGemFilter").value,
        mustSee: document.getElementById("mustSeeFilter").value,
        monday: document.getElementById("mondayFilter").value,
        openLate: document.getElementById("openLateFilter").value,
        openEarly: document.getElementById("openEarlyFilter").value,
        luggageStorage: document.getElementById("luggageStorageFilter").value,
        payment: document.getElementById("paymentFilter").value,
        publicAccess: document.getElementById("publicAccessFilter").value
    };

    let resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";
    allMarkers.forEach(marker => map.removeLayer(marker));
    allMarkers = [];

    siteData.forEach(site => {
        let matchesFilters = Object.keys(selectedFilters).every(filterKey => {
            let filterValue = selectedFilters[filterKey].toLowerCase();
            return filterValue === "all" || (site[filterKey] && site[filterKey].toLowerCase() === filterValue);
        });

        if (matchesFilters) {
            let marker = L.marker([site.lat, site.lng]).bindPopup(
                `<b>${site.name}</b><br>${site.description}<br><b>Cost:</b> ${site.cost}<br>
                 <b>Type:</b> ${site.type}<br><b>Family Friendly:</b> ${site.family_friendly ? "Yes" : "No"}`
            );
            marker.addTo(map);
            allMarkers.push(marker);

            let siteCard = document.createElement("div");
            siteCard.classList.add("site-card");
            siteCard.innerHTML = `<h3>${site.name}</h3><p>${site.description}</p>`;
            resultsContainer.appendChild(siteCard);
        }
    });
}
