// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    make_container();
});

// 「次へ」ボタンを押したときの処理
document.querySelector("#next_button").addEventListener("click", function() {
    const select_element = document.getElementById("search_type_box");
    const selected_option = select_element.options[select_element.selectedIndex];
    const selected_value = select_element.value;

    if (selected_option.hidden) {
        preventDefault();
    }
    if (selected_value) {
        window.location.href = selected_value;
    }
});

// データベースから今日の日付で出店するキッチンカーを取得する関数
async function db_search_elements(date){
    const response = await fetch("http://127.0.0.1:8000/api/user/user_search_calendar/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "datetime": date
        })
    });

    try {
        const result = await response.json();
        
        if (!response.ok || !result || result.length <= 0) {
            create_not_search_text();
        }

        return result;
    } catch (error) {
        create_server_error_text();
    }

    return false;
}

async function make_container(){
    const today = new Date();
    // 日付をSQLに合わせる
    const searched_elements = await db_search_elements(today.toISOString().split('T')[0]); 
    // 無い場合は処理終了
    if (!searched_elements || searched_elements.length === 0) {
        return;
    }    

    clear_text();

    const todays_container = document.querySelector('.TODAYS_LIST');
    const owner_list = delete_deplicate(searched_elements);

    // 三つまで表示させる
    let range;
    if (3 > owner_list.length) {
        range = owner_list.length;
    } else {
        range = 3;
    }

    for (let i = 0; i < range; i++) {
        const result_container = document.createElement('div');
        result_container.className = "TODAYS_CONTAINER";
        // 店舗名書き込み
        const store_name = document.createElement('p');
        store_name.className = 'COMMON_TEXT NAME_TEXT';
        // 全部色が#ff7f00だとメリハリがつかない気がする．
        store_name.style = 'color: black'; 
        store_name.textContent = "店舗名 : " + owner_list[i].出店者名;
        result_container.appendChild(store_name);
        // 商品ジャンル
        const store_genre = document.createElement('p');
        store_genre.className = 'COMMON_TEXT GENRE_TEXT';
        store_genre.textContent = "商品ジャンル ： " + owner_list[i].商品ジャンル;
        result_container.appendChild(store_genre);

        // 開催場所
        const store_place = document.createElement('p');
        store_place.className = 'COMMON_TEXT ADDRESS_TEXT';
        store_place.textContent = "開催場所 : " + owner_list[i].場所名;
        store_place.style = 'color: black';
        result_container.appendChild(store_place);
        // 住所
        const store_city = document.createElement('p');
        store_city.className = 'COMMON_TEXT ADDRESS_TEXT';
        store_city.textContent = "住所 : " + owner_list[i].住所;
        store_city.style = 'color: black';
        result_container.appendChild(store_city);

        todays_container.appendChild(result_container);    
    }
    return 0;
}

// ダブりの出店者が出るので,ダブりを排除する関数
// 時間も考慮するべき？
function delete_deplicate(searched_list) {
    for (let i = 0; i < searched_list.length; i++) {
        let samecount = 0;
        for (let j = i + 1; j < searched_list.length - 1; j++) {
            if (searched_list[i].出店者名 === searched_list[j].出店者名) {
                searched_list.splice(j, 1);
                samecount++;
            }
        }
        // マッチングが決定していないものは省く
        if (samecount === 0) {
            searched_list.splice(i, 1);
        }
    }
    return searched_list;
}

// 検索結果が見つからなかった時のエラー文を表示する関数
function create_not_search_text(){
    const text_box = document.getElementById("error");
    text_box.innerText = "本日の出店予定はありません";

    return 0;
}

// データベースとの通信でエラーが起こった場合のエラー文を表示する関数
function create_server_error_text(){
    const text_box = document.getElementById("error");
    text_box.innerText = "サーバーエラーが起こりました";

    return 0;
}
// エラー文等リセット
function clear_text() {
    const text_box = document.getElementById("error");
    text_box.innerHTML = "";

    return 0;
}