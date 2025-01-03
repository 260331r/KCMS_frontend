// 初期設定
document.addEventListener("DOMContentLoaded", () =>{
    give_function_login_button();
    give_function_choice_button();
});

// 更新ボタンに登録機能を与える関数
function give_function_login_button(){
    const login_button = document.getElementById("login_button");
    login_button.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        const user_id = await db_check_login_info(email, pass);
        if(user_id.length > 0){
            localStorage.setItem("user_id", user_id.ユーザID);
            if(user_id.場所ID == null){
                // ここで出店者用トップページに飛ばす
            }else{
                // ここで場所提供者用トップページに飛ばす
            }
        }
    });
}

function give_function_choice_button(){
    const choice_button = document.getElementById("choice_button");
    choice_button.addEventListener("click", () => {
        // 選択画面に飛ばす
    });
}

// データベースに情報を登録する関数
async function db_regist_info(email, pass){
    const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "login_info": {"メールアドレス": email, "パスワード": pass}
        })
    });

    try {
        const result = await response.json();

        if (!response.ok || !result || result.length <= 0) {
            create_can_not_login_text();
        }

        return result;
    } catch (error) {
        create_server_error_text();
    }

    return false;
}

// 正しい入力がされていなかったときのエラー文を表示する関数
function create_can_not_login_text(){
    const text_box = document.getElementById("error");
    text_box.innerText = "メールアドレスかパスワードが間違っています";

    return 0;
}

// データベースとの通信でエラーが起こった場合のエラー文を表示する関数
function create_server_error_text(){
    const text_box = document.getElementById("error");
    text_box.innerText = "サーバーエラーが起こりました";

    return 0;
}
