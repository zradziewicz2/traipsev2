document.addEventListener("DOMContentLoaded", function () {
    loadLocations();
});

function applyFilters() {
    let selectedCost = document.getElementById("costFilter").value;
    let selectedType = document.getElementById("typeFilter").value;
    let selectedFamily = document.getElementById("familyFilter").value;
    let selectedLocalOrNational = document.getElementById("localOrNationalFilter").value;
    let selectedHistoryType = document.getElementById("historyTypeFilter").value;
    let selectedTimePeriod = document.getElementById("timePeriodFilter").value;
    let selectedThematicCategory = document.getElementById("thematicCategoryFilter").value;
    let selectedSiteType = document.getElementById("siteTypeFilter").value;
    let selectedEstimatedTime = document.getElementById("estimatedTimeFilter").value;
    let selectedReservation = document.getElementById("reservationFilter").value;
    let selectedGuidedTours = document.getElementById("guidedToursFilter").value;
    let selectedAccessibility = document.getElementById("accessibilityFilter").value;
    let selectedFamilyFriendly = document.getElementById("familyFriendlyFilter").value;
    let selectedDogFriendly = document.getElementById("dogFriendlyFilter").value;
    let selectedGiftShop = document.getElementById("giftShopFilter").value;
    let selectedDining = document.getElementById("diningFilter").value;
    let selectedHiddenGem = document.getElementById("hiddenGemFilter").value;
    let selectedMustSee = document.getElementById("mustSeeFilter").value;
    let selectedPublicAccess = document.getElementById("publicAccessFilter").value;
    
    let resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";
    allMarkers.forEach(marker => map.removeLayer(marker));
    allMarkers = [];

    siteData.forEach(site => {
        if (
            (selectedCost === "all" || site.cost.toLowerCase() === selectedCost) &&
            (selectedType === "all" || site.type.toLowerCase() === selectedType) &&
            (selectedFamily === "all" || String(site.family_friendly) === selectedFamily) &&
            (selectedLocalOrNational === "all" || site.localornational.toLowerCase() === selectedLocalOrNational) &&
            (selectedHistoryType === "all" || site.historyType.toLowerCase() === selectedHistoryType) &&
            (selectedTimePeriod === "all" || site.timePeriod.toLowerCase() === selectedTimePeriod) &&
            (selectedThematicCategory === "all" || site.thematicCategory.toLowerCase() === selectedThematicCategory) &&
            (selectedSiteType === "all" || site.siteType.toLowerCase() === selectedSiteType) &&
            (selectedEstimatedTime === "all" || site.estimatedTime.toLowerCase() === selectedEstimatedTime) &&
            (selectedReservation === "all" || site.reservation.toLowerCase() === selectedReservation) &&
            (selectedGuidedTours === "all" || site.guidedTours.toLowerCase() === selectedGuidedTours) &&
            (selectedAccessibility === "all" || site.accessibility.toLowerCase() === selectedAccessibility) &&
            (selectedFamilyFriendly === "all" || site.familyFriendly.toLowerCase() === selectedFamilyFriendly) &&
            (selectedDogFriendly === "all" || site.dogFriendly.toLowerCase() === selectedDogFriendly) &&
            (selectedGiftShop === "all" || site.giftShop.toLowerCase() === selectedGiftShop) &&
            (selectedDining === "all" || site.dining.toLowerCase() === selectedDining) &&
            (selectedHiddenGem === "all" || site.hiddenGem.toLowerCase() === selectedHiddenGem) &&
            (selectedMustSee === "all" || site.mustSee.toLowerCase() === selectedMustSee) &&
            (selectedPublicAccess === "all" || site.publicAccess.toLowerCase() === selectedPublicAccess)
        ) {
            let marker = L.marker([site.lat, site.lng]).bindPopup(
                `<b>${site.name}</b><br>${site.description}<br><b>Cost:</b> ${site.cost}<br><b>Type:</b> ${site.type}<br><b>Family Friendly:</b> ${site.family_friendly ? "Yes" : "No"}<br><b>Local or National:</b> ${site.localornational}`
            );
            marker.addTo(map);
            allMarkers.push(marker);

            resultsContainer.innerHTML += `
                <div class="site-card">
                    <h3>${site.name}</h3>
                    <p>${site.description}</p>
                </div>`;
        }
    });
}
