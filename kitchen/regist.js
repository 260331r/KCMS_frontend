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
    const text_box = document.getElementById("error");

    const email = document.getElementById("email").value;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.length <= 0){
        text_box.innerText = "メールアドレスは記入必須です";
        return false;
    }
    if(!email_pattern.test(email)){
        text_box.innerText = "正しいメールアドレス形式を入力してください";
        return false;
    }

    const pass1 = document.getElementById("password1").value;
    const pass2 = document.getElementById("password2").value;
    const check_pass = /^[\x20-\x7E]+$/;
    if(pass1 != pass2){
        text_box.innerText = "パスワードが異なります";
        return false;
    }
    if(pass1.length < 8){
        text_box.innerText = "パスワードを8文字以上入力してください";
        return false;
    }
    if(check_pass.test(pass1)){
        text_box.innerText = "パスワードは半角文字のみを用いてください"
        return false;
    }

    const name = document.getElementById("shop_name").value;
    if(name.length <= 0){
        text_box.innerText = "出店者名は記入必須です";
        return false;
    }

    const address = document.getElementById("genre").value;
    if(address.length <= 0){
        text_box.innerText = "商品ジャンルは記入必須です";
        return false;
    }

    const tel = document.getElementById("tel_num").value;
    const tel_pattern = /[0-9]{11}/;
    if(!tel_pattern.test(tel)){
        text_box.innerText = "電話番号は半角数字11文字を入力してください";
        return false;
    }

    const contact1 = document.getElementById("contact1").value;
    if(contact1.length <= 0){
        text_box.innerText = "連絡手段1は記入必須です";
        return false;
    }

    const res = document.getElementById("response").value;
    if(res.length <= 0){
        text_box.innerText = "責任者名は記入必須です";
        return false;
    }

    return true;
}

// データベースに情報を登録する関数
async function db_regist_info(){
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password1").value;
    const name = document.getElementById("shop_name").value;
    const genre = document.getElementById("genre").value;
    const terms = document.getElementById("terms").value;
    const tel = document.getElementById("tel_num").value;
    const contact1 = document.getElementById("contact1").value;
    const contact2 = document.getElementById("contact2").value;
    const res = document.getElementById("response").value;
    const remark = document.getElementById("remark").value;

    const response = await fetch("http://127.0.0.1:8000/api/store/shop_account_regist/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_info": {"メールアドレス": email, "パスワード": pass, "電話番号": tel, "連絡手段1": contact1, "連絡手段2": contact2, "責任者名": res, "備考": remark},
            "place_info": {"場所名": name, "商品ジャンル": genre, "出店条件": terms}
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
