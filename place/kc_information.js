// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    const store_info = new URLSearchParams(window.location.search);
    const store_id = store_info.get("store_id");
    const genre = store_info.get("genre");
    const name = store_info.get("name");
    const menu = store_info.get("menu");

    // 店舗情報をHTMLに表示
    displayStoreInfo(name, genre, menu);

    // 出店日時リストの作成を開始
    if (store_id) {
        init_create_schedule_list(store_id);
    } else {
        create_error_text("店舗IDが見つかりません。");
    }
});

// 店舗情報をHTMLに表示する関数
function displayStoreInfo(name, genre, menu) {
    document.getElementById("store_name").textContent = name || "店舗名不明";
    document.getElementById("store_genre").textContent = genre || "ジャンル不明";
    document.getElementById("store_menu").textContent = menu || "メニュー情報なし";
}

// 出店日時のリストを作成する関数
async function init_create_schedule_list(store_id) {
    try {
        const all_elements = await db_all_elements(store_id);
        const list = document.getElementById("list");

        if (all_elements.length > 0) {
            create_schedule_frame_list(all_elements, list); // 出店予定リストを作成
        } else {
            create_error_text("出店予定が見つかりません。");
        }
    } catch (error) {
        create_error_text("サーバーとの通信に失敗しました。");
    }
}

// 出店予定リストの枠を作成する関数
function create_schedule_frame_list(shop_array, list) {
    shop_array.forEach(shop_details => {
        const frame = make_frame(shop_details);
        list.append(frame);
    });
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
    shop_genre.textContent = "住所 : " + (shop_details.住所 || "未定"); // 安全策を追加
    frame.append(shop_genre);

    const shop_name = document.createElement("p");
    shop_name.className = "PLACE_TEXT";
    shop_name.textContent = shop_details.場所名 || "未定"; // 安全策を追加
    frame.append(shop_name);

    return frame;
}

// ストアIDからキッチンカー出店予定情報を取得する関数
async function db_all_elements(store_id) {
    const response = await fetch("http://127.0.0.1:8000/api/store/store_schedule_check/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "ユーザID": store_id })
    });

    if (!response.ok) {
        throw new Error("サーバーエラー");
    }

    const result = await response.json();
    return result.length > 0 ? result : [];
}

// エラーメッセージを表示する関数
function create_error_text(message) {
    const error_text_box = document.getElementById("error");
    error_text_box.textContent = message;
}
