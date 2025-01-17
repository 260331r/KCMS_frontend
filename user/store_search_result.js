document.addEventListener("DOMContentLoaded", () => {
    fetch_before();
});

function fetch_before() {
    const url_params = new URLSearchParams(window.location.search);
    const encoded_data = url_params.get('param');
    console.log(encoded_data);
    if (encoded_data.length !== 2) {
        const searched_elements = JSON.parse(decodeURIComponent(encoded_data));
        console.log(searched_elements);
        view_result(searched_elements);
    } else {
        view_error();
    }
    return 0;
}

// 検索結果を表示させる．
function view_result(searched_elements) {
    const resultlist = document.querySelector('.RESULT_LIST');
    for (let i = 0; i < searched_elements.length; i++) {
        const result_container = document.createElement('div');
        result_container.className = 'RESULT_CONTAINER';

        const store_name = document.createElement('p');
        store_name.className = 'COMMON_TEXT';
        store_name.style = 'color: black';
        console.log(searched_elements[i].出店者名);
        store_name.textContent = searched_elements[i].出店者名;
        result_container.appendChild(store_name);

        const detail_button = document.createElement('button');
        detail_button.className = 'COMMON_BUTTON COMMON_BUTTON_LARGE';
        detail_button.textContent = '詳しくはこちら';

        detail_button.addEventListener('click', function() {
            // 店舗IDを場所提供者詳細画面へ渡す．
            // window.location.href=`../store/sample.html?id={searched_elements[i].場所ID}`;
        });
        result_container.appendChild(detail_button);

        resultlist.appendChild(result_container);
    }
    return 0;
}

function view_error() {
    const error_text = document.getElementById('error');
    error_text.textContent = "条件に合致するキッチンカーは見つかりませんでした"
}