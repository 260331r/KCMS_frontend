document.querySelector('#search_button').addEventListener('click', async function() {
    const genre = document.querySelector('#genre_input').value;
    console.log(genre);
    const searched_elements = await db_search_elements(genre);
    // 別ページへオブジェクトを渡すための処理
    const encoded_object = encodeURIComponent(JSON.stringify(searched_elements));
    window.location.href = `./store_search_result.html?param=${encoded_object}`;
})

// 商品ジャンルを元にデータベースから出店者のリストを取得する関数
async function db_search_elements(genre){
    const response = await fetch("http://127.0.0.1:8000/api/user/user_search_food_type/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "food_type": {"商品ジャンル" : genre}
        })
    });

    try {
        const result = await response.json();
        
        if (!response.ok || !result || result.length <= 0) {
            create_not_search_text();
        }

        return result;
    } catch (error) {
        create_server_error_text();
    }
    return false;
}

function create_not_search_text() {
    console.log('何もありませんでした．');
    return 0;
}

function create_server_error_text() {
    console.log('サーバーエラーです．');
    return 0;
}