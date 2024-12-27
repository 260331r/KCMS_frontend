// 初期設定
document.addEventListener("DOMContentLoaded", () => {
    init_create_kitchen_list();
    set_months();
    set_days();
    give_function_search_button();
});

// すべての日時のリストを作成する関数
function init_create_kitchen_list(){
    const all_elements = db_all_elements();

}

// リストに表示する枠を作成する
function create_kitchen_frame(shop_array){

}

// データベースからすべての要素を取得する関数
function db_all_elements(){

}

// データベースから条件で絞った要素を取得する関数
function db_search_elements(year, month, day){

}

// セレクトボックスに月の値を与える関数
function set_months(){
    const select_box = document.getElementById("month");
    const months = 12;

    for(let i = 0; i < months; i++){
        let select_option = document.createElement("option");
        select_option.textContent = i + 1;
        select_option.value = i + 1;
        select_box.append(select_option);
    }
    
    return 0;
}

// セレクトボックスに日にちの値を与える関数
function set_days(){
    const select_box = document.getElementById("day");
    const days = 31;

    for(let i = 0; i < days; i++){
        let select_option = document.createElement("option");
        select_option.textContent = i + 1;
        select_option.value = i + 1;
        select_box.append(select_option);
    }
    
    return 0;
}

// 検索ボタンに検索機能を与える関数
function give_function_search_button(){
    const search_button = document.getElementById("search_button");
    search_button.addEventListener("click", () => {
        search_by_date();
    });

    return 0;
}

// 検索処理を行う機能
function search_by_date(){
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;

    const list = document.getElementById("list");
    list.innerHTML = "";

    create_kitchen_list(year, month, day, list);

    return 0;
}
