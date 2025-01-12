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

// アカウントIDからキッチンカー情報を取得する関数
async function db_all_elements(user_id) {
    const response = await fetch("http://127.0.0.1:8000/api/locate/get_store_infor/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_id": { "ユーザID": user_id }
        })
    });

    try {
        const result = await response.json();
        if (!response.ok || !result || result.length <= 0) {
            return []; // マッチング依頼がない場合は空配列を返す
        }

        // 出店者情報を表示
        if (result[0]) {
            document.getElementById("store_name").textContent = result[0].出店者名 || "未定";
            document.getElementById("store_genre").textContent = result[0].商品ジャンル || "未定";
            document.getElementById("store_menu").textContent = result[0].メニュー || "未定";  // メニューの表示
            document.getElementById("store_photo").src = result[0].写真 || "default.jpg";  // 写真の表示
        }

        return result; // 出店予定情報を返す
    } catch (error) {
        create_server_error_text();
        return []; // エラー発生時は空配列を返す
    }
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
