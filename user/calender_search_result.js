document.addEventListener("DOMContentLoaded", () => {
    fetch_before();
})

function fetch_before() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('param');
    console.log(encodedData);
    if (encodedData) {
        const searched_elements = JSON.parse(decodeURIComponent(encodedData));
        console.log(searched_elements);
        view_result(searched_elements);
    }
}

// 検索結果を表示させる．
function view_result(searched_elements) {
    const resultlist = document.querySelector('.RESULT_LIST');
    for (let i = 0; i < searched_elements.length; i++) {
        const resultcontainer = document.createElement('div');
        resultcontainer.className = 'RESULT_CONTAINER';

        const storeName = document.createElement('p');
        storeName.className = 'COMMON_TEXT STORE_NAME_TEXT';
        console.log(searched_elements[i].出店者名);
        storeName.textContent = searched_elements[i].出店者名;
        resultcontainer.appendChild(storeName);

        const genre = document.createElement('p');
        genre.className = 'COMMON_TEXT GENRE_TEXT';
        genre.style = 'color: black';
        genre.textContent = "商品ジャンル: " + searched_elements[i].商品ジャンル;
        resultcontainer.appendChild(genre);

        const placeName = document.createElement('p');
        placeName.className = "COMMON_TEXT PLACE_NAME_TEXT";
        placeName.style = 'color: black';
        placeName.textContent = "開催場所: " + searched_elements[i].場所名;
        resultcontainer.appendChild(placeName);


        const address = document.createElement('p');
        address.textContent = "住所: " + searched_elements[i].住所
        address.style = 'color: black';
        resultcontainer.appendChild(address);


        resultlist.appendChild(resultcontainer);
    }
}