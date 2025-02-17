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
    return 0;
}
// 検索結果を表示させる．
function view_result(searched_elements) {
    const result_list = document.querySelector('.RESULT_LIST');
    for (let i = 0; i < searched_elements.length; i++) {
        const result_container = document.createElement('div');
        result_container.className = 'RESULT_CONTAINER';
        // 名前
        const place_name = document.createElement('p');
        place_name.className = 'COMMON_TEXT NAME_TEXT';
        place_name.style = 'color: black';
        place_name.textContent = searched_elements[i].場所名;
        result_container.appendChild(place_name);

        // 地域/住所
        const place_address = document.createElement('p');
        place_address.className = "COMMON_TEXT ADDRESS_TEXT";
        place_address.textContent = "地域:" + searched_elements[i].地域 + "/住所:" + searched_elements[i].住所;
        result_container.appendChild(place_address);

        // 電話番号
        const phone_number = document.createElement('p');
        phone_number.className = "COMMON_TEXT PHONE_TEXT";
        phone_number.textContent = "電話番号:" + searched_elements[i].電話番号;
        result_container.appendChild(phone_number);

        // メールアドレス
        const mail_address = document.createElement('p');
        mail_address.className = "COMMON_TEXT MAIL_TEXT";
        mail_address.textContent = "メールアドレス\n" + searched_elements[i].メールアドレス;
        result_container.appendChild(mail_address);

        result_list.appendChild(result_container);
    }
}

function view_error() {
    const element = document.getElementById('error');
    element.textContent = "条件に合致する場所が見つかりませんでした．"
}