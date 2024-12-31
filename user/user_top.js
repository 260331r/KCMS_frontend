document.querySelector("#NEXT_BUTTON").addEventListener("click", function() {
    const selectElement = document.getElementById("SEARCH_TYPE_BOX");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedValue = selectElement.value;

    if (selectedOption.hidden) {
        preventDefault();
    }
    if (selectedValue) {
        window.location.href = selectedValue;
    }
});