// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_request_list();
});

// キッチンカーの出店日時のリストを作成する関数
function init_create_request_list(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();

    const all_elements = db_all_elements(year, month, day);  // 本日以降の出店予定を取得
    const list = document.getElementById("list");

    if (all_elements.length > 0) {
        create_request_frame_list(all_elements, list);  // 出店予定があればリストを作成
    } else {
        create_error_text(list);  // 出店予定がなければエラーメッセージを表示
    }

    return 0;
}

// リストの枠を量産する関数
function create_request_frame_list(shop_array, list){
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
    shop_schedule.textContent = "出店希望日 : " + shop_details[2];
    frame.append(shop_schedule);

    const shop_name = document.createElement("p");
    shop_name.className = "NAME_TEXT";
    shop_name.textContent = shop_details[0];
    frame.append(shop_name);

    const shop_genre = document.createElement("p");
    shop_genre.className = "GENRE_TEXT";
    shop_genre.textContent = "住所 : " + shop_details[1];
    frame.append(shop_genre);

    return frame;
}

// データベースから本日以降のすべての提供予定の要素を取得する関数
// [[店名, ジャンル, 掲示日時], ...]のような形式
// スケジュールテーブルから、日時がnullでないものかつ、場所提供者IDが自身と一致しているものを取り出す
function db_all_elements(year, month, day){
    // テストのため適当に配列を作っているだけ
    return [["高知工科大学", "高知県香美市○○", 4], ["セイムス北本町店","高知県香美市北本町",5]];
}


//エラー
function create_error_text(){
    const text_box = document.getElementById("error");
    text_box.className = "COMMON_TEXT";
    text_box.textContent = "マッチング依頼はありません";

    return 0;
}