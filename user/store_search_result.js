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
    before_button();
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

        // 商品ジャンル
        const store_jenre = document.createElement('p');
        store_jenre.className = "COMMON_TEXT GENRE_TEXT";
        store_jenre.textContent = "商品ジャンル:" + searched_elements[i].商品ジャンル;
        result_container.appendChild(store_jenre);

        // 電話番号
        const phone_number = document.createElement('p');
        phone_number.className = "COMMON_TEXT PHONE_TEXT";
        phone_number.textContent = "電話番号:" + searched_elements[i].電話番号;
        result_container.appendChild(phone_number);

        // メールアドレス
        const mail_address = document.createElement('p');
        mail_address.className = "COMMON_TEXT MAIL_TEXT";
        mail_address.textContent = "メールアドレス:" + searched_elements[i].メールアドレス;
        result_container.appendChild(mail_address);
        
        resultlist.appendChild(result_container);
    }
    return 0;
}

function view_error() {
    const error_text = document.getElementById('error');
    error_text.textContent = "条件に合致するキッチンカーは見つかりませんでした"
}

function before_button() {
    const before_button = document.getElementById('before_button');
    before_button.className = "COMMON_BUTTON";
    before_button.textContent = "戻る";
    before_button.addEventListener("click", () =>{
        window.location.href = './genre_search.html';
    });
}