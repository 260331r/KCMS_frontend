document.addEventListener("DOMContentLoaded", () => {
    const place_info = new URLSearchParams(window.location.search);
    const place_id = place_info.get("place_id");
    const address = place_info.get("address");
    const name = place_info.get("name");
    const region = place_info.get("region");

    // 店舗情報をHTMLに表示
    displayStoreInfo(name, address, region);

    // 出店日時リストの作成を開始
    if (place_id) {
        init_create_schedule_list(place_id);
    } else {
        create_error_text("店舗IDが見つかりません。");
    }
});

// キッチンカーの出店日時のリストを作成する関数
async function init_create_schedule_list() {
    const user_id = 1; // ユーザーIDを取得

    try {
        // サーバーから本日以降の出店予定を取得
        const all_elements = await fetch_schedule_from_server(user_id);
        const list = document.getElementById("list");

        if (all_elements.length > 0) {
            create_schedule_frame_list(all_elements, list); // 出店予定があればリストを作成
        } else {
            create_error_text(list); // 出店予定がなければエラーメッセージを表示
        }
    } catch (error) {
        console.error("スケジュールの取得に失敗しました:", error);
        create_error_text(document.getElementById("list")); // エラー時もエラーメッセージを表示
    }

    return false;
}

// サーバーからスケジュールを取得する関数
async function fetch_schedule_from_server(place_id) {
    const response = await fetch("http://127.0.0.1:8000/api/locate/place_owner_schedule_check/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "ユーザID": place_id })
        });

    try {
        const result = await response.json();

        if (!response.ok || !result || result.length <= 0) {
            create_not_search_text();
        }

        return result;
    } catch (error) {
        create_error_text();
    }

    return data;
}

// リストの枠を量産する関数
function create_schedule_frame_list(shop_array, list) {
    for (let i = 0; i < shop_array.length; i++) {
        const frame = make_frame(shop_array[i]);
        list.append(frame);
    }

    return 0;
}

// リストに表示する枠を作成する
function make_frame(shop_details) {
    const frame = document.createElement("div");
    frame.className = "FRAME_DESIGN";

    const shop_schedule = document.createElement("p");
    shop_schedule.className = "SCHEDULE_TEXT";
    shop_schedule.textContent = "出店日時 : " + shop_details.日時 - "TO";
    frame.append(shop_schedule);

    const shop_name = document.createElement("p");
    shop_name.className = "NAME_TEXT";
    shop_name.textContent = "店舗名 : " + shop_details.出店者名;
    frame.append(shop_name);

    const shop_genre = document.createElement("p");
    shop_genre.className = "GENRE_TEXT";
    shop_genre.textContent = "商品ジャンル : " + shop_details.商品ジャンル;
    frame.append(shop_genre);

    return frame;
}

// エラー文を表示する関数
function create_error_text(list) {
    const text_box = document.createElement("div");
    text_box.className = "COMMON_TEXT";
    text_box.textContent = "検索結果が見つかりませんでした";
    list.append(text_box);

    return 0;
}
