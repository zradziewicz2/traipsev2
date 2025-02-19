document.addEventListener("DOMContentLoaded", function () {
    populateFilters();
});

function populateFilters() {
    const filters = {
        timePeriodFilter: [
            "All", "Prehistoric", "Indigenous & Native History", "Colonial & Early Settlements",
            "19th Century & Westward Expansion", "Industrial Revolution & 20th Century",
            "Modern History & Civil Rights"
        ],
        thematicCategoryFilter: [
            "All", "Military & War History", "Architectural & Urban History",
            "Cultural & Artistic History", "Religious & Spiritual History",
            "Science & Innovation", "Maritime & Transportation"
        ],
        siteTypeFilter: [
            "All", "Museums & Exhibits", "Archaeological Sites", "Landmarks & Monuments",
            "Historic Homes & Estates", "Cemeteries & Burial Sites"
        ],
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

    Object.keys(filters).forEach(filterId => {
        const selectElement = document.getElementById(filterId);
        if (selectElement) {
            filters[filterId].forEach(option => {
                const opt = document.createElement("option");
                opt.value = option.toLowerCase();
                opt.textContent = option;
                selectElement.appendChild(opt);
            });
        }
    });
}

function applyFilters() {
    const selectedFilters = {
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

    updateResults(selectedFilters);
}

function updateResults(filters) {
    fetch("locations.json")
        .then(response => response.json())
        .then(data => {
            let filteredData = data.filter(site => {
                return (
                    (filters.timePeriod === "all" || site.time_period.toLowerCase() === filters.timePeriod) &&
                    (filters.thematicCategory === "all" || site.thematic_category.toLowerCase() === filters.thematicCategory) &&
                    (filters.siteType === "all" || site.site_type.toLowerCase() === filters.siteType) &&
                    (filters.historyScope === "all" || site.history_scope.toLowerCase() === filters.historyScope) &&
                    (filters.timeframe === "all" || site.estimated_time.toLowerCase() === filters.timeframe) &&
                    (filters.cost === "all" || site.cost.toLowerCase() === filters.cost) &&
                    (filters.distance === "all" || site.distance.toLowerCase() === filters.distance) &&
                    (filters.reservation === "all" || site.reservation_required.toLowerCase() === filters.reservation) &&
                    (filters.tourType === "all" || site.tour_type.toLowerCase() === filters.tourType) &&
                    (filters.transit === "all" || site.transit_access.toLowerCase() === filters.transit) &&
                    (filters.family === "all" || String(site.family_friendly).toLowerCase() === filters.family) &&
                    (filters.dogFriendly === "all" || String(site.dog_friendly).toLowerCase() === filters.dogFriendly) &&
                    (filters.giftShop === "all" || site.gift_shop.toLowerCase() === filters.giftShop) &&
                    (filters.dining === "all" || site.dining.toLowerCase() === filters.dining) &&
                    (filters.hiddenGem === "all" || site.hidden_gem.toLowerCase() === filters.hiddenGem) &&
                    (filters.mustSee === "all" || site.must_see.toLowerCase() === filters.mustSee) &&
                    (filters.monday === "all" || site.open_monday.toLowerCase() === filters.monday) &&
                    (filters.openLate === "all" || site.open_late.toLowerCase() === filters.openLate) &&
                    (filters.openEarly === "all" || site.open_early.toLowerCase() === filters.openEarly) &&
                    (filters.luggageStorage === "all" || site.luggage_storage.toLowerCase() === filters.luggageStorage) &&
                    (filters.payment === "all" || site.payment.toLowerCase() === filters.payment) &&
                    (filters.publicAccess === "all" || site.public_access.toLowerCase() === filters.publicAccess)
                );
            });

            displayResults(filteredData);
        })
        .catch(error => console.error("Error loading JSON:", error));
}

function displayResults(sites) {
    let resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";
    allMarkers.forEach(marker => map.removeLayer(marker));
    allMarkers = [];

    sites.forEach(site => {
        let marker = L.marker([site.lat, site.lng]).bindPopup(
            `<b>${site.name}</b><br>${site.description}`
        );
        marker.addTo(map);
        allMarkers.push(marker);

        resultsContainer.innerHTML += `<div class="site-card"><h3>${site.name}</h3><p>${site.description}</p></div>`;
    });
}
