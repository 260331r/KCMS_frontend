// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    give_function_buttons();
});

// ボタンに機能を追加する関数
function give_function_buttons(){
    const yes_button = document.getElementById("yes");
    yes_button.addEventListener("click", () => {
        make_page_last_check();
    });

    const no_button = document.getElementById("no");
    no_button.addEventListener("click", () => {
        // ここでトップページに戻る
    });

    return 0;
}

// 最終確認画面を作る関数
function make_page_last_check(){
    const text_container = document.getElementById("text_container");
    text_container.innerText = "";

    const last_attention = document.createElement("span");
    last_attention.innerText = "本当によろしいですか？";
    last_attention.className = "COMMON_TEXT";
    text_container.append(last_attention);

    const button_container = document.createElement("div");
    button_container.style = "padding-top: 30px;";
    text_container.append(button_container);

    const no_button = document.createElement("button");
    no_button.innerText = "いいえ";
    no_button.className = "COMMON_BUTTON";
    no_button.style = "margin-right: 30px;";
    button_container.append(no_button);
    no_button.addEventListener("click", () => {
        // ここでトップページに戻る
    });

    const yes_button = document.createElement("button");
    yes_button.innerText = "はい";
    yes_button.className = "COMMON_BUTTON";
    button_container.append(yes_button);
    yes_button.addEventListener("click", () => {
        const user_id = localStorage("user_id");
        db_delete_shop(user_id);
    });

    const error_text = document.createElement("span");
    error_text.id = "error";
    error_text.className = "COMMON_TEXT";
    text_container.append(error_text);
    
    return 0;
}

// データベースからアカウント情報を削除する画面
async function db_delete_shop(user_id){
    const response = await fetch("http://127.0.0.1:8000/api/common/account_delete/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_info": {"ユーザID": user_id}
        })
    });

    try {
        const result = await response.json();

        if (!response.ok || !result) {
            create_can_not_delete_text();
        }

        return result;
    } catch (error) {
        create_server_error_text();
    }

    return false;
}

// 正しい入力がされていなかったときのエラー文を表示する関数
function create_can_not_regist_text(){
    const text_box = document.getElementById("error");
    text_box.innerText = "正しく削除することができませんでした";

    return 0;
}

// データベースとの通信でエラーが起こった場合のエラー文を表示する関数
function create_server_error_text(){
    const text_box = document.getElementById("error");
    text_box.innerText = "サーバーエラーが起こりました";

    return 0;
}
