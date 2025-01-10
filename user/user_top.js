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
    const response = await fetch("http://127.0.0.1:8000/api/user/user_search_calender.py/get_list_repository", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "date": {"日時": date}
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
    const today = format_Date(date, "-");
    const searched_elements = await db_search_elements(today);
    return searched_elements;
}

function make_container(){
    const resultcontainer = document.createElement('div');
    resultcontainer.className = "TODAYS_CONTAINER"

    const searched_element = create_kicthen_list();
    searched_element.forEach(store => {
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
    });
}

// yyyy-mm-dd形式にする関数
function format_Date(date, sep="") {
    const yyyy = date.getFullYear();
    const mm = ('00' + (date.getMonth()+1)).slice(-2);
    const dd = ('00' + date.getDate()).slice(-2);

    return `${yyyy}${sep}${mm}${sep}${dd}`;
}

// 検索結果が見つからなかった時のエラー文を表示する関数
function create_not_search_text(){
    const text_box = document.getElementById("error");
    text_box.innerText = "検索結果が見つかりませんでした";

    return 0;
}

// データベースとの通信でエラーが起こった場合のエラー文を表示する関数
function create_server_error_text(){
    const text_box = document.getElementById("error");
    text_box.innerText = "サーバーエラーが起こりました";

    return 0;
}