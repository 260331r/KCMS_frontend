// 初期設定
document.addEventListener("DOMContentLoaded", () =>{
    give_function_place_button();
    give_function_shop_button();
});

// 更新ボタンに登録機能を与える関数
function give_function_place_button(){
    const place_button = document.getElementById("place_button");
    place_button.addEventListener("click", () => {
        // 場所提供者登録画面に飛ばす
    });
}

function give_function_shop_button(){
    const shop_button = document.getElementById("shop_button");
    shop_button.addEventListener("click", () => {
        // 出店者登録画面に飛ばす
    });
}
