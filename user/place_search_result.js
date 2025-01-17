document.addEventListener("DOMContentLoaded", () => {
    fetch_before();
});
// 前ページから検索結果を取得
function fetch_before() {
    const url_params = new URLSearchParams(window.location.search);
    const encoded_data = url_params.get('param');
    console.log(encoded_data);
    if (encoded_data.length !== 2) {
        const searched_elements = JSON.parse(decodeURIComponent(encoded_data));
        view_result(searched_elements);
    } else {
        view_error(encoded_data);
    }
}
// 検索結果を表示させる．
function view_result(searched_elements) {
    const result_list = document.querySelector('.RESULT_LIST');
    for (let i = 0; i < searched_elements.length; i++) {
        const result_container = document.createElement('div');
        result_container.className = 'RESULT_CONTAINER';

        const place_name = document.createElement('p');
        place_name.className = 'COMMON_TEXT';
        place_name.style = 'color: black';
        place_name.textContent = searched_elements[i].場所名;
        result_container.appendChild(place_name);

        const detail_button = document.createElement('button');
        detail_button.className = 'COMMON_BUTTON COMMON_BUTTON_LARGE';
        detail_button.textContent = '詳しくはこちら';

        detail_button.addEventListener('click', function() {
            // 場所IDを場所提供者詳細画面へ渡す．
            // window.location.href=`../place/sample.html?id={searched_elements[i].場所ID}`;
        });
        result_container.appendChild(detail_button);

        result_list.appendChild(result_container);
    }
}

function view_error() {
    const element = document.getElementById('error');
    element.textContent = "条件に合致する場所が見つかりませんでした．"
}