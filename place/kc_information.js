// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_schedule_list();
});

// 出店日時のリストを作成する関数
async function init_create_schedule_list() {
    const user_id = localStorage.getItem("user_id");  // ローカルストレージからユーザーIDを取得

    if (!user_id || user_id.trim() === "") {  // 空文字チェック
        document.getElementById("error").textContent = "ユーザーIDが見つかりません";
        return;
    }

    const all_elements = await db_all_elements(user_id);  // 出店予定情報を取得
    const list = document.getElementById("list");

    if (all_elements.length > 0) {
        create_schedule_frame_list(all_elements, list);  // 出店予定があればリストを作成
    } else {
        create_error_text();  // 出店予定がなければエラーメッセージを表示
    }
}

// 出店予定リストの枠を作成する関数
function create_schedule_frame_list(shop_array, list) {
    for (let i = 0; i < shop_array.length; i++) {
        const frame = make_frame(shop_array[i]);
        list.append(frame);
    }
}

// 各リスト項目の枠を作成する関数
function make_frame(shop_details) {
    const frame = document.createElement("div");
    frame.className = "FRAME_DESIGN";

    const shop_schedule = document.createElement("p");
    shop_schedule.className = "SCHEDULE_TEXT";
    shop_schedule.textContent = "出店日 : " + (shop_details.日時 || "未定"); // 安全策を追加
    frame.append(shop_schedule);

    const shop_genre = document.createElement("p");
    shop_genre.className = "TIME_TEXT";
    shop_genre.textContent = "営業時間 : " + (shop_details.営業時間 || "未定"); // 安全策を追加
    frame.append(shop_genre);

    const shop_name = document.createElement("p");
    shop_name.className = "PLACE_TEXT";
    shop_name.textContent = shop_details.出店者名 || "未定"; // 安全策を追加
    frame.append(shop_name);

    return frame;
}

// ダミーデータを返す関数（キッチンカーは1つだけ）
async function db_all_elements(user_id) {
    const dummy_data = [
        {
            出店者名: "キッチンカーA",
            商品ジャンル: "タコス",
            メニュー: "タコス、ブリトー",
            写真: "https://via.placeholder.com/300",
            日時: "2025-02-15T10:00:00",
            営業時間: "10:00 - 18:00"
        }
    ];

    // 出店者情報をページに表示
    if (dummy_data.length > 0) {
        const store = dummy_data[0];
        document.getElementById("store_name").textContent = store.出店者名 || "未定";
        document.getElementById("store_genre").textContent = store.商品ジャンル || "未定";
        document.getElementById("store_menu").textContent = store.メニュー || "未定";
        document.getElementById("store_photo").src = store.写真 || "default.jpg";  // 写真がなければデフォルト画像
    }

    // ダミーデータを返す
    return dummy_data;
}

// 出店予定がない場合にエラーメッセージを表示する関数
function create_error_text() {
    const error_text_box = document.getElementById("error");
    error_text_box.textContent = "出店予定がありません"; // 出店予定がない場合のメッセージ
}

// サーバーエラーが発生した場合のメッセージ
function create_server_error_text() {
    const text_box = document.getElementById("error");
    text_box.className = "COMMON_TEXT";
    text_box.textContent = "サーバーエラーが発生しました";
}
