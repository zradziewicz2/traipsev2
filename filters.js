document.addEventListener("DOMContentLoaded", function () {
    loadFilters();
    loadLocations();
});

function loadFilters() {
    const filterCategories = {
        timePeriods: {
            label: "Time Periods",
            options: ["Prehistoric", "Indigenous & Native History", "Colonial & Early Settlements",
                      "19th Century & Westward Expansion", "Industrial Revolution & 20th Century",
                      "Modern History & Civil Rights"],
            type: "checkbox"
        },
        thematicCategories: {
            label: "Thematic Categories",
            options: ["Military & War History", "Architectural & Urban History",
                      "Cultural & Artistic History", "Religious & Spiritual History",
                      "Science & Innovation", "Maritime & Transportation"],
            type: "checkbox"
        },
        siteType: {
            label: "Type of Site",
            options: ["Museums & Exhibits", "Archaeological Sites", "Landmarks & Monuments",
                      "Historic Homes & Estates", "Cemeteries & Burial Sites"],
            type: "checkbox"
        },
        historyScope: {
            label: "Scope of History",
            options: ["All", "Local", "National"],
            type: "dropdown"
        },
        timeframe: {
            label: "Estimated Timeframe",
            options: ["All", "5 - 10 min", "10 min - 1 hour", "1+ hours"],
            type: "dropdown"
        },
        cost: {
            label: "Cost",
            options: ["All", "Free", "$1 - 5", "$6 - 20", "$20+"],
            type: "dropdown"
        }
    };

    let container = document.getElementById("filterContainer");
    container.innerHTML = "";

    Object.keys(filterCategories).forEach(filterKey => {
        let filterGroup = document.createElement("div");
        filterGroup.classList.add("filter-group");

        let label = document.createElement("h3");
        label.textContent = filterCategories[filterKey].label;
        filterGroup.appendChild(label);

        if (filterCategories[filterKey].type === "checkbox") {
            // Create checkboxes
            filterCategories[filterKey].options.forEach(option => {
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = option.toLowerCase();
                checkbox.id = `${filterKey}-${option.replace(/\s+/g, "-").toLowerCase()}`;

                let checkboxLabel = document.createElement("label");
                checkboxLabel.setAttribute("for", checkbox.id);
                checkboxLabel.textContent = option;

                let wrapper = document.createElement("div");
                wrapper.classList.add("checkbox-option");
                wrapper.appendChild(checkbox);
                wrapper.appendChild(checkboxLabel);

                filterGroup.appendChild(wrapper);
            });
        } else {
            // Create dropdowns
            let select = document.createElement("select");
            select.id = filterKey;

            filterCategories[filterKey].options.forEach(option => {
                let opt = document.createElement("option");
                opt.value = option.toLowerCase();
                opt.textContent = option;
                select.appendChild(opt);
            });

            filterGroup.appendChild(select);
        }

        container.appendChild(filterGroup);
    });
}

function applyFilters() {
    console.log("Filters applied! Ensure checkboxes and dropdowns are filtering correctly.");
}
