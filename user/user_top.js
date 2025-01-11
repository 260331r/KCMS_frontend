// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    make_container();
});

// 「次へ」ボタンを押したときの処理
document.querySelector("#NEXT_BUTTON").addEventListener("click", function() {
    const selectElement = document.getElementById("SEARCH_TYPE_BOX");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedValue = selectElement.value;

    if (selectedOption.hidden) {
        preventDefault();
    }
    if (selectedValue) {
        window.location.href = selectedValue;
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

    const todayscontainer = document.querySelector('.TODAYS_LIST');
    const owner_list = delete_deplicate(searched_elements);

    // 三つまで表示させる
    let range;
    if (3 > owner_list.length) {
        range = owner_list.length;
    } else {
        range = 3;
    }

    for (let i = 0; i < range; i++) {
        const resultcontainer = document.createElement('div');
        resultcontainer.className = "TODAYS_CONTAINER";
        // 店舗名書き込み
        const storeName = document.createElement('p');
        storeName.className = 'COMMON_TEXT NAME_TEXT';
        // 全部色が#ff7f00だとメリハリがつかない気がする．
        storeName.style = 'color: black'; 
        storeName.textContent = "店舗名 : " + owner_list[i].出店者名;
        resultcontainer.appendChild(storeName);
        // 商品ジャンル
        const storeGenre = document.createElement('p');
        storeGenre.className = 'COMMON_TEXT GENRE_TEXT';
        storeGenre.textContent = "商品ジャンル ： " + owner_list[i].商品ジャンル;
        resultcontainer.appendChild(storeGenre);

        // 開催場所
        const storePlace = document.createElement('p');
        storePlace.className = 'COMMON_TEXT ADDRESS_TEXT';
        storePlace.textContent = "開催場所 : " + owner_list[i].場所名;
        storePlace.style = 'color: black';
        resultcontainer.appendChild(storePlace);
        // 住所
        const storeCity = document.createElement('p');
        storeCity.className = 'COMMON_TEXT ADDRESS_TEXT';
        storeCity.textContent = "住所 : " + owner_list[i].住所;
        storeCity.style = 'color: black';
        resultcontainer.appendChild(storeCity);

        todayscontainer.appendChild(resultcontainer);    
    }
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