// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_schedule_list();
});

// 本日以降のすべての日時のリストを作成する関数
function init_create_schedule_list(){
    const user_id = localStorage.getItem("user_id");
    const all_elements = db_all_elements(user_id);
    const list = document.getElementById("list");

    create_kitchen_frame_list(all_elements, list);

    return 0;
}

// リストの枠を量産する関数
function create_kitchen_frame_list(shop_array, list){
    for(let i = 0; i < shop_array.length; i++){
        const frame = make_frame(shop_array[i]);
        list.append(frame);
    }

    return 0;
}

// リストに表示する枠を作成する
function make_frame(shop_details){
    const frame = document.createElement("div");
    frame.className = "FRAME_DESIGN";

    const shop_schedule = document.createElement("p");
    shop_schedule.className = "SCHEDULE_TEXT";
    shop_schedule.textContent = "出店予定日時 : " + shop_details.日時;
    frame.append(shop_schedule);

    const shop_name = document.createElement("p");
    shop_name.className = "NAME_TEXT";
    shop_name.textContent = shop_details.出店者名;
    frame.append(shop_name);

    const shop_genre = document.createElement("p");
    shop_genre.className = "GENRE_TEXT";
    shop_genre.textContent = "商品ジャンル : " + shop_details.商品ジャンル;
    frame.append(shop_genre);

    return frame;
}

// データベースから本日以降のすべての提供予定の要素を取得する関数
async function db_all_elements(user_id){
    const response = await fetch("http://127.0.0.1:8000/api/locate/place_owner_schedule_check/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_id": user_id
        })
    });

    try {
        const result = await response.json();

        if (!response.ok || !result || result.length <= 0) {
            create_not_search_text();
        }
    } catch (error) {
        create_server_error_text();
    }

    return result;
}

// 検索結果が見つからなかった時のエラー文を表示する関数
function create_not_search_text(){
    const text_box = document.getElementById("error");
    text_box.textContent = "検索結果が見つかりませんでした";

    return 0;
}

// データベースとの通信でエラーが起こった場合のエラー文を表示する関数
function create_server_error_text(){
    const text_box = document.getElementById("error");
    text_box.textContent = "サーバーエラーが起こりました";

    return 0;
}
