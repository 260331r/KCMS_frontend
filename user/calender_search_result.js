document.addEventListener("DOMContentLoaded", () => {
    fetch_before();
})

function fetch_before() {
    const url_params = new URLSearchParams(window.location.search);
    const encoded_data = url_params.get('param');
    if (encoded_data == null) {
        view_error();
    } else if (encoded_data.length !== 2) {
        const searched_elements = JSON.parse(decodeURIComponent(encoded_data));
        view_result(searched_elements);
    } else {
        view_no_search_text();
    }
}

// 検索結果を表示させる．
function view_result(searched_elements) {
    const result_list = document.querySelector('.RESULT_LIST');
    for (let i = 0; i < searched_elements.length; i++) {
        const result_container = document.createElement('div');
        result_container.className = 'RESULT_CONTAINER';

        const store_name = document.createElement('p');
        store_name.className = 'COMMON_TEXT STORE_NAME_TEXT';
        console.log(searched_elements[i].出店者名);
        store_name.textContent = searched_elements[i].出店者名;
        result_container.appendChild(store_name);

        const genre = document.createElement('p');
        genre.className = 'COMMON_TEXT GENRE_TEXT';
        genre.style = 'color: black';
        genre.textContent = "商品ジャンル: " + searched_elements[i].商品ジャンル;
        result_container.appendChild(genre);

        const place_name = document.createElement('p');
        place_name.className = "COMMON_TEXT PLACE_NAME_TEXT";
        place_name.style = 'color: black';
        place_name.textContent = "開催場所: " + searched_elements[i].場所名;
        result_container.appendChild(place_name);


        const address = document.createElement('p');
        address.textContent = "住所: " + searched_elements[i].住所
        address.style = 'color: black';
        result_container.appendChild(address);


        result_list.appendChild(result_container);
    }
}

function view_no_search_text() {
    const error_text = document.getElementById('error');
    error_text.textContent = "出店予定が見つかりませんでした";
    return 0;
} 

function view_error() {
    const error_text = document.getElementById('error');
    error_text.innerText = "データベースから情報を取得できませんでした"
    return 0;
}