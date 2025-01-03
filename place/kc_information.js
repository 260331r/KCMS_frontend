// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_schedule_list();
});

// キッチンカーの出店日時のリストを作成する関数
function init_create_schedule_list(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();

    const all_elements = db_all_elements(year, month, day);  // 本日以降の出店予定を取得
    const list = document.getElementById("list");

    if (all_elements.length > 0) {
        create_schedule_frame_list(all_elements, list);  // 出店予定があればリストを作成
    } else {
        create_error_text(list);  // 出店予定がなければエラーメッセージを表示
    }

    return 0;
}

// リストの枠を量産する関数
function create_schedule_frame_list(shop_array, list){
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
    shop_schedule.textContent = "出店日 : " + shop_details[2];
    frame.append(shop_schedule);

    const shop_genre = document.createElement("p");
    shop_genre.className = "TINE_TEXT";
    shop_genre.textContent = "営業時間 : " + shop_details[1];
    frame.append(shop_genre);

    const shop_name = document.createElement("p");
    shop_name.className = "PLACE_TEXT";
    shop_name.textContent = shop_details[0];
    frame.append(shop_name);

    

    return frame;
}

// データベースから本日以降のすべての提供予定の要素を取得する関数
// [[店名, ジャンル, 掲示日時], ...]のような形式
// スケジュールテーブルから、日時がnullでないものかつ、場所提供者IDが自身と一致しているものを取り出す
function db_all_elements(year, month, day){
    // テストのため適当に配列を作っているだけ
    return [[2, 3, 4], [5,5,5]];
}

// エラー文を表示する関数
function create_error_text(){
    const text_box = document.getElementById("error");
    text_box.className = "COMMON_TEXT";
    text_box.textContent = "検索結果が見つかりませんでした";

    return 0;
}
