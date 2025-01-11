document.addEventListener("DOMContentLoaded", () => {
    fetch_before();
})

function fetch_before() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('param');
    console.log(encodedData);
    if (encodedData) {
        try{
            const searched_elements = JSON.parse(decodeURIComponent(encodedData));
            console.log(searched_elements);
            store_view_result(searched_elements);
            place_view_result(searched_elements);
        } catch (error) {
            console.error('データ解析中にエラーが発生しました');
        }
        
    }
}

function store_view_result(searched_elements) {
    const resultlist = document.querySelector('#STORE_VIEW');
    let count = 0;
    for (let i = 0; i < searched_elements.length; i++) {
        if (searched_elements[i].出店者名 == null) continue;
        const resultcontainer = document.createElement('div');
        resultcontainer.className = 'RESULT_CONTAINER';

        const storeName = document.createElement('p');
        storeName.className = 'COMMON_TEXT STORE_NAME_TEXT';
        console.log(searched_elements[i].出店者名);
        storeName.textContent = searched_elements[i].出店者名;
        resultcontainer.appendChild(storeName);

        const detailButton = document.createElement('button');
        detailButton.className = 'COMMON_BUTTON COMMON_BUTTON_LARGE';
        detailButton.textContent = "詳しくはこちら";
        detailButton.addEventListener('click', function() {
            // 出店者IDを詳細画面に渡し，ページ遷移
        })
        resultcontainer.appendChild(detailButton);

        resultlist.appendChild(resultcontainer);
        count++;
    }
    create_no_search_text(resultlist, count);
}

function place_view_result(searched_elements) {
    const resultlist = document.querySelector('#PLACE_VIEW');
    let count = 0;
    for (let i = 0; i < searched_elements.length; i++) {
        if (searched_elements[i].場所名 == null) continue;
        const resultcontainer = document.createElement('div');
        resultcontainer.className = 'RESULT_CONTAINER';

        const placeName = document.createElement('p');
        placeName.className = 'COMMON_TEXT STORE_NAME_TEXT';
        console.log(searched_elements[i].場所名);
        placeName.textContent = searched_elements[i].場所名;
        resultcontainer.appendChild(placeName);

        const detailButton = document.createElement('button');
        detailButton.className = 'COMMON_BUTTON';
        detailButton.textContent = "詳しくはこちら";
        detailButton.addEventListener('click', function() {
            // 場所IDを詳細画面に渡し，ページ遷移
        })
        resultlist.appendChild(resultcontainer);
        count++;
    }
    create_no_search_text(resultlist, count);
}

function create_no_search_text(parent_element, count) {
    if (count === 0){
        const textbox = document.createElement('p');
        textbox.className = 'COMMON_TEXT';
        textbox.style = 'color: black';
        textbox.textContent = '合致するものが見つかりませんでした';
        parent_element.appendChild(textbox);
    }
}