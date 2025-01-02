// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_kitchen_list();
    give_function_search_button();
});

// すべての日時のリストを作成する関数
function init_create_kitchen_list(){
    const all_elements = db_all_elements();
    const list = document.getElementById("list");
    clear_error_text();
    create_kitchen_frame_list(all_elements, list);

    return 0;
}

// 与えられた日時情報で絞ってリストを作成する
async function create_kitchen_list(date, list){
    const searched_elements = await db_search_elements(date);
    clear_error_text();
    create_kitchen_frame_list(searched_elements, list);
    
    return 0;
}

// リストに表示する枠を作成する
function create_kitchen_frame_list(shop_array, list){
    for(let i = 0; i < shop_array.length; i++){
        const shop_details = [shop_array[i].店舗ID, shop_array[i].日時, shop_array[i].出店者, shop_array[i].商品ジャンル];
        const frame = make_frame(shop_details);
        list.append(frame);
    }

    return 0;
}

function make_frame(shop_details){
    const frame = document.createElement("div");
    frame.className = "FRAME_DESIGN";

    const shop_schedule = document.createElement("p");
    shop_schedule.className = "SCHEDULE_TEXT";
    shop_schedule.innerText = "出店希望日時 : " + shop_details[1];
    frame.append(shop_schedule);

    const shop_name = document.createElement("p");
    shop_name.className = "NAME_TEXT";
    shop_name.innerText = shop_details[2];
    frame.append(shop_name);

    const shop_genre = document.createElement("p");
    shop_genre.className = "GENRE_TEXT";
    shop_genre.innerText = "商品ジャンル : " + shop_details[3];
    frame.append(shop_genre);

    frame.addEventListener("click", () => {
        // ここで，出店情報の詳細を表示するページに飛ばす(この時，キッチンカーのIDを持たせて遷移させる)
    });

    return frame;
}

// データベースからすべてのマッチング待ちキッチンカーの要素を取得する関数
async function db_all_elements(){
    const response = await fetch("http://127.0.0.1:8000/api/locate/place_owner_matching_request/get_store_info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
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

// データベースから条件で絞った要素を取得する関数
async function db_search_elements(date){
    const response = await fetch("http://127.0.0.1:8000/api/locate/place_owner_matching_request/get_store_date", {
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

// 検索ボタンに検索機能を与える関数
function give_function_search_button(){
    const search_button = document.getElementById("search_button");
    search_button.addEventListener("click", () => {
        search_by_date();
    });

    return 0;
}

// 検索処理を行う機能
function search_by_date(){
    const date = document.getElementById("date").value;
    if(date == "") return;
    const list = document.getElementById("list");
    list.innerHTML = "";

    create_kitchen_list(date, list);

    return 0;
}

// エラー文をクリアする関数
function clear_error_text(){
    const text_box = document.getElementById("error");
    text_box.innerHTML = "";

    return 0;
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
