document.querySelector("#NEXT_BUTTON").addEventListener("click", function() {
    const selectElement = document.getElementById("SEARCH_TYPE_BOX");
    const selectedValue = selectElement.value;

    if (selectedValue) {
        window.location.href = selectedValue;
    }
});