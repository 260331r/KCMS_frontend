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

// データベースから今日の日付で出店するキッチンカーを取得する関数を作成する．
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

async function create_kicthen_list() {
    const date = new Date();
    const today = date.toISOString();
    const searched_elements = await db_search_elements(today);
    return searched_elements;
}

async function make_container(){
    let count = 0;
    const resultcontainer = document.createElement('div');
    resultcontainer.className = "TODAYS_CONTAINER"

    const searched_elements = await create_kicthen_list();
    if (!searched_elements || searched_elements.length === 0) {
        return;
    }
    searched_elements.forEach(store => {
        // 店舗名書き込み
        const storeName = document.createElement('p');
        storeName.className = 'COMMON_TEXT TODAYS_TEXT';
        // 全部色が#ff7f00だとメリハリがつかない気がする．
        storeName.style = 'color: black'; 
        storeName.textContent = store.出店者名;
        resultcontainer.append(storeName);

        const storeGenre = document.createElement('p');
        storeGenre.className = 'COMMON_TEXT TODAYS_TEXT';
        storeGenre.textContent = "商品ジャンル ： " + store.商品ジャンル;
        resultcontainer.append(storeGenre);

        const storeCity = document.createElement('p');
        storeCity.className = 'COMMON_TEXT TODAYS_TEXT';
        storeCity.textContent = store.地域 + " " + store.住所;
        resultcontainer.append(storeCity);

        count += 1;
        if (count > 3) {
            return 0;
        }
    });
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