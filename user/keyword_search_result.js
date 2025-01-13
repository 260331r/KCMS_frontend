document.addEventListener("DOMContentLoaded", () => {
    fetch_before();
})

function fetch_before() {
    const url_params = new URLSearchParams(window.location.search);
    const encoded_data = url_params.get('param');
    console.log(encoded_data);
    if (encoded_data) {
        try{
            const searched_elements = JSON.parse(decodeURIComponent(encoded_data));
            console.log(searched_elements);
            store_view_result(searched_elements);
            place_view_result(searched_elements);
        } catch (error) {
            console.error('データ解析中にエラーが発生しました');
            return false;
        }   
    }
    return 0;
}

function store_view_result(searched_elements) {
    const result_list = document.querySelector('#store_view');
    let count = 0;
    for (let i = 0; i < searched_elements.length; i++) {
        if (searched_elements[i].出店者名 == null) continue;
        const result_container = document.createElement('div');
        result_container.className = 'RESULT_CONTAINER';

        const store_name = document.createElement('p');
        store_name.className = 'COMMON_TEXT STORE_NAME_TEXT';
        console.log(searched_elements[i].出店者名);
        store_name.textContent = searched_elements[i].出店者名;
        result_container.appendChild(storeName);

        const detail_button = document.createElement('button');
        detail_button.className = 'COMMON_BUTTON COMMON_BUTTON_LARGE';
        detail_button.textContent = "詳しくはこちら";
        detail_button.addEventListener('click', function() {
            // 出店者IDを詳細画面に渡し，ページ遷移
        })
        result_container.appendChild(detail_button);

        result_list.appendChild(result_container);
        count++;
    }
    create_no_search_text(result_list, count);
    return 0;
}

function place_view_result(searched_elements) {
    const result_list = document.querySelector('#place_view');
    let count = 0;
    for (let i = 0; i < searched_elements.length; i++) {
        if (searched_elements[i].場所名 == null) continue;
        const result_container = document.createElement('div');
        result_container.className = 'RESULT_CONTAINER';

        const place_name = document.createElement('p');
        place_name.className = 'COMMON_TEXT STORE_NAME_TEXT';
        console.log(searched_elements[i].場所名);
        place_name.textContent = searched_elements[i].場所名;
        result_container.appendChild(placeName);

        const detail_button = document.createElement('button');
        detail_button.className = 'COMMON_BUTTON';
        detail_button.textContent = "詳しくはこちら";
        detail_button.addEventListener('click', function() {
            // 場所IDを詳細画面に渡し，ページ遷移
        })
        result_list.appendChild(resultcontainer);
        count++;
    }
    create_no_search_text(result_list, count);
    return 0;
}

function create_no_search_text(parent_element, count) {
    if (count === 0){
        const textbox = document.createElement('p');
        textbox.className = 'COMMON_TEXT';
        textbox.style = 'color: black';
        textbox.textContent = '合致するものが見つかりませんでした';
        parent_element.appendChild(textbox);
    }
    return 0;
}