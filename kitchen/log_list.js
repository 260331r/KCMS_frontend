// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_log_list();
});

// 本日以前のすべての日時のリストを作成する関数
async function init_create_log_list(){
    const user_id = localStorage.getItem("user_id");
    const all_elements = await db_all_elements(user_id);
    const list = document.getElementById("list");

    create_kitchen_frame_list(all_elements, list);

    return 0;
}

// リストの枠を量産する関数
function create_place_frame_list(place_array, list){
    for(let i = 0; i < place_array.length; i++){
        const frame = make_frame(place_array[i]);
        list.append(frame);
    }

    return 0;
}

// リストに表示する枠を作成する
function make_frame(place_details){
    const frame = document.createElement("div");
    frame.className = "FRAME_DESIGN";

    const place_schedule = document.createElement("p");
    place_schedule.className = "SCHEDULE_TEXT";
    place_schedule.textContent = "出店した日時 : " + place_details.日時;
    frame.append(place_schedule);

    const place_name = document.createElement("p");
    place_name.className = "NAME_TEXT";
    place_name.textContent = place_details.出店者名;
    frame.append(place_name);

    const place_genre = document.createElement("p");
    place_genre.className = "GENRE_TEXT";
    place_genre.textContent = "商品ジャンル : " + place_details.商品ジャンル;
    frame.append(place_genre);

    return frame;
}

// データベースから本日以降のすべての提供予定の要素を取得する関数
async function db_all_elements(user_id){
    const response = await fetch("http://127.0.0.1:8000/api/locate/shop_offer_history/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_id": {"ユーザID": user_id}
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

// 検索結果が見つからなかった時のエラー文を表示する関数
function create_error_text(){
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
