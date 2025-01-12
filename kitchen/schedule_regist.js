// 初期設定
document.addEventListener("DOMContentLoaded", () =>{
    create_options();
    give_function_regist_button();
});

// 更新ボタンに登録機能を与える関数
function give_function_regist_button(){
    const regist_button = document.getElementById("regist_button");
    regist_button.addEventListener("click", () => {
        const check_flag = check_info();
        if (check_flag){
            db_regist_info();
            // ここでトップページに飛ばす
        }
    });
}


// 入力情報をチェックする関数
function check_info(){

    const date = document.getElementById("date").value;
    //const email = document.getElementById("email").value;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(date.length <= 0){
        text_box.innerText = "日時は記入必須です";
        return false;
    }

    
    return true;
}

// データベースに情報を登録する関数
async function db_regist_info(){
    const date = document.getElementById("date").value;

    const response = await fetch("http://127.0.0.1:8000/api/store/store_matching_request/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_info": {"日時": date}
        })
    });

    try {
        const result = await response.json();

        if (!response.ok || !result) {
            create_can_not_regist_text();
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
    text_box.innerText = "不適切な入力があります";

    return 0;
}

// データベースとの通信でエラーが起こった場合のエラー文を表示する関数
function create_server_error_text(){
    const text_box = document.getElementById("error");
    text_box.innerText = "サーバーエラーが起こりました";

    return 0;
}
