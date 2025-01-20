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
        store_name.style = "color: black";
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
        mail_address.textContent = "メールアドレス\n" + searched_elements[i].メールアドレス;
        result_container.appendChild(mail_address);

        result_list.appendChild(result_container);
        count++;
    }
    create_nostore_search_text(result_list, count);
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
        place_name.style = "color: black";
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
        count++;
    }
    create_noplace_search_text(result_list, count);
    return 0;
}

function create_nostore_search_text(parent_element, count) {
    if (count === 0){
        const textbox = document.createElement('p');
        textbox.className = 'COMMON_TEXT';
        textbox.style = 'color: black';
        textbox.textContent = '合致する出店者が見つかりませんでした';
        parent_element.appendChild(textbox);
    }
    return 0;
}

function create_noplace_search_text(parent_element, count) {
    if (count === 0){
        const textbox = document.createElement('p');
        textbox.className = 'COMMON_TEXT';
        textbox.style = 'color: black';
        textbox.textContent = '合致する場所提供者が見つかりませんでした';
        parent_element.appendChild(textbox);
    }
    return 0;
}