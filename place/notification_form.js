// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_request_list();
});



//アカウントに来ているマッチング依頼のリストを作成する関数
function init_create_request_list(){
    //中は後で書きます
    }



//エラー
function create_error_text(){
    const text_box = document.getElementById("error");
    text_box.className = "COMMON_TEXT";
    text_box.textContent = "マッチング依頼がありまんでした";

    return 0;
}