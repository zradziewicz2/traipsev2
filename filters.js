document.addEventListener("DOMContentLoaded", function () {
    loadFilters();
    loadLocations();
});

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

function applyFilters() {
    console.log("Filters applied! (To be linked with the data)");
