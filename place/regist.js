// 初期設定
document.addEventListener("DOMContentLoaded", () =>{
    create_options();
    give_function_regist_button();
});

// 登録ボタンに登録機能を与える関数
function give_function_regist_button(){
    const resist_button = document.getElementById("regist_button");
    resist_button.addEventListener("click", () => {
        const check_flag = check_info();
        if (check_flag){
            db_regist_info();
            // ここでトップページに飛ばす
        }
    });
}

// 入力情報をチェックする関数
function check_info(){
    const pass1 = document.getElementById("password1").value;
    const pass2 = document.getElementById("password2").value;

    if(pass1 != pass2){
        create_pass_not_same_text();
        return false;
    }else{
        return true;
    }
}

// データベースに情報を登録する関数
async function db_regist_info(){
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass1").value;
    const name = document.getElementById("shop_name").value;
    const address = document.getElementById("place_address").value;
    const city = document.getElementById("city").value;
    const tel = document.getElementById("tel_num").value;
    const contact1 = document.getElementById("contact1").value;
    const contact2 = document.getElementById("contact2").value;
    const res = document.getElementById("response").value;
    const remark = document.getElementById("remark").value;

    const response = await fetch("http://127.0.0.1:8000/api/locate/place_owner_account_regist/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_info": {"メールアドレス": email, "パスワード": pass, "電話番号": tel, "連絡手段1": contact1, "連絡手段2": contact2, "責任者名": res, "備考": remark},
            "place_info": {"場所名": name, "住所": address, "地域": city}
        })
    });

    try {
        const result = await response.json();

        if (!response.ok || !result) {
            create_can_not_regist_text();
        }
    } catch (error) {
        create_server_error_text();
    }

    return result;
}

// 地域選択の要素を作成する関数
function create_options(){
    const select_box = document.getElementById("city");
    const options_array = ["高知市", "室戸市", "安芸市", "南国市", "土佐市", "須崎市", "宿毛市", "土佐清水市", 
                           "四万十市", "香南市", "香美市", "東洋町", "奈半利町", "田野町", "安田町", "北川村",
                           "馬路村", "芸西村", "本山町", "大豊町", "土佐町", "大川村", "いの町", "仁淀川町",
                           "中土佐町", "佐川町", "越知町", "檮原町", "日高村", "津野町", "四万十町", "大月町",
                           "三原村", "黒潮町"];

    for(let i = 0; i < options_array.length; i++){
        const option = document.createElement("option");
        option.value = options_array[i];
        option.textContent = options_array[i];
        select_box.append(option);
    }
    
    return 0;
}

// 入力されたパスワード2つが一致していない時のエラー文を表示する関数
function create_pass_not_same_text(){
    const text_box = document.getElementById("error");
    text_box.textContent = "パスワードが異なります";
}

// 正しい入力がされていなかったときのエラー文を表示する関数
function create_can_not_regist_text(){
    const text_box = document.getElementById("error");
    text_box.textContent = "不適切な入力があります";

    return 0;
}

// データベースとの通信でエラーが起こった場合のエラー文を表示する関数
function create_server_error_text(){
    const text_box = document.getElementById("error");
    text_box.textContent = "サーバーエラーが起こりました";

    return 0;
}
