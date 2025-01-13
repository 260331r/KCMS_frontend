// 依頼通知
// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_request_list();
});

// マッチング依頼リストを作成する関数
async function init_create_request_list(){
    const user_id = localStorage.getItem("user_id");
    const all_elements = await db_all_elements(user_id);
    const list = document.getElementById("list");

    if (all_elements && all_elements.length > 0) {
        create_request_frame_list(all_elements, list);
    } else {
        create_not_request_text();
    }

    return 0;
}

// リストの枠を量産する関数
function create_request_frame_list(shop_array, list){
    for (let i = 0; i < shop_array.length; i++) {
        const frame = make_frame(shop_array[i]);
        list.append(frame);
    }

    return 0;
}

// リストに表示する枠を作成する
function make_frame(request_details){
    const frame = document.createElement("div");
    frame.className = "FRAME_DESIGN";

    // 出店希望日時
    const place_schedule = document.createElement("p");
    place_schedule.className = "SCHEDULE_TEXT";
    place_schedule.textContent = "出店希望日時 : " + format_date(request_details.日時);
    frame.append(place_schedule);

    // 場所名
    const place_name = document.createElement("p");
    place_name.className = "NAME_TEXT";
    //クリック可能なリンク
    const link = document.createElement("a");
    // 遷移先URL（acceptance_form.htmlにplace_idを渡す）
    link.href = `/acceptance_form.html?store_id=${request_details.場所ID}`;
    link.textContent = "場所名 : " + request_details.場所名;
    link.style.color = "#FF7F00"; // リンクの色を設定（必要に応じて調整）
    place_name.appendChild(link);
    frame.append(place_name);

    // 商品ジャンル
    const place_genre = document.createElement("p");
    place_genre.className = "GENRE_TEXT";
    place_genre.textContent = "住所 : " + request_details.住所;
    frame.append(place_genre);

    return frame;
}

// 日付のフォーマット
function format_date(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 利用者のアカウントIDからマッチング依頼を取得する関数
async function db_all_elements(user_id) {
    const response = await fetch("http://127.0.0.1:8000/api/store/store_matching_request/get_store_infor/", {
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
            return []; // マッチング依頼がない場合は空配列を返す
        }

        return result;
    } catch (error) {
        create_server_error_text();
        return []; // エラー発生時は空配列を返す
    }
}

// マッチング依頼がない場合に表示するテキスト
function create_not_request_text() {
    const text_box = document.getElementById("error");
    text_box.className = "COMMON_TEXT";
    text_box.textContent = "マッチング依頼はありません";

    return 0;
}

// データベースとの通信でエラーが起こった場合のエラー文を表示する関数
function create_server_error_text() {
    const text_box = document.getElementById("error");
    text_box.className = "COMMON_TEXT";
    text_box.textContent = "サーバーエラーが起こりました";

    return 0;
}