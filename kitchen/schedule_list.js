// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_schedule_list();
});

// 本日以降のすべての日時のリストを作成する関数
function init_create_schedule_list(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const all_elements = db_all_elements(year, month, day);
    const list = document.getElementById("list");

    create_place_frame_list(all_elements, list);
    if(all_elements.length <= 0){
        create_error_text();
    }

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
    place_schedule.textContent = "出店予定日時 : " + place_details[2];
    frame.append(place_schedule);

    const place_name = document.createElement("p");
    place_name.className = "NAME_TEXT";
    place_name.textContent = place_details[0];
    frame.append(place_name);

    const place_address = document.createElement("p");
    place_address.className = "ADDRESS_TEXT";
    place_address.textContent = place_details[1];
    frame.append(place_address);

    return frame;
}

// データベースから本日以降のすべての提供予定の要素を取得する関数
// [[場所名, 住所, 掲示日時], ...]のような形式
// スケジュールテーブルから、日時がnullでないものかつ、出店者IDが自身と一致しているものを取り出す
function db_all_elements(year, month, day){
    // テストのため適当に配列を作っているだけ
    return [["おにぎり屋", "高知県香美市土佐山田町1234-56", "2024/3/4"], [5,5,5]];
}

// エラー文を表示する関数
function create_error_text(){
    const text_box = document.getElementById("error");
    text_box.className = "COMMON_TEXT";
    text_box.textContent = "検索結果が見つかりませんでした";

    return 0;
}
