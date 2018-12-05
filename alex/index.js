// Getting references
var $tbody = document.querySelector("#table-body");

var $varietyInput = document.querySelector("#variety-input");
var $stateInput = document.querySelector("#state-input");
var $tasterInput = document.querySelector("#taster-input");
var $wineryInput = document.querySelector("#winery-input");
var $priceInput = document.querySelector("#price-input");




var $submitButton = document.querySelector("#submit");

// Filtered list
var filteredReviews = dataSet;

// Set starting index and results per page
var startingIndex = 0;
var resultsPerPage = 1000;

// Rendering table
renderTable();

// Function to render table
function renderTable() {

    // Set the value of ending index
    var endingIndex = startingIndex + resultsPerPage;

    // Looping through data set
    for (var i = 0; i < filteredReviews.length; i++) {
    
        // Insert a row
        var $row = $tbody.insertRow(i);

        // Get current object & keys
        var currentReview = filteredReviews[i];
        var fields = Object.keys(currentReview);

        // Insert filteredReviews
        for(var j = 0; j < fields.length; j++) {
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = currentReview[field];
        };
    };
};

// Event listener for submit button
$submitButton.addEventListener("click", filterInput);




// Function to filter variety
function filterVariety(review) {
    return review.variety == $varietyInput.value.trim();
};
// filter for state
function filterState(review) {
    return review.province == $stateInput.value.trim();
};

// filter for taster name
function filterTaster(review) {
    return review.taster_name == $tasterInput.value.trim();
};

// Function to filter winery
function filterWinery(review) {
    return review.winery == $wineryInput.value.trim();
};

// Function to filter price
function filterPrice(review) {
    return review.price == $priceInput.value.trim();
};



// Function to filter input
function filterInput(event) {

    // Prevent default
    event.preventDefault();

    // Reseting data set each time button is clicked
    filteredReviews = dataSet;

    // Filters

    // if ($countryInput.value) {
    //     filteredReviews = filteredReviews.filter(filterCountry);
    // };

    if ($varietyInput.value) {
        filteredReviews = filteredReviews.filter(filterVariety);
    };

    if ($stateInput.value) {
        filteredReviews = filteredReviews.filter(filterState);
    };

    if ($tasterInput.value) {
        filteredReviews = filteredReviews.filter(filterTaster);
    };

    if ($wineryInput.value) {
        filteredReviews = filteredReviews.filter(filterWinery);
    };

    if ($priceInput.value) {
        filteredReviews = filteredReviews.filter(filterPrice);
    };

    if (!$varietyInput && !$stateInput && !$tasterInput && !$wineryInput && !$priceInput) {
        filteredReviews = dataSet;
    };

    // Reset inputs

    $varietyInput.value = "";
    $tasterInput.value = "";
    $stateInput.value = "";
    $wineryInput.value = "";
    $priceInput.value = "";

    // Re-render table
    $tbody.innerHTML = "";
    renderTable();
};