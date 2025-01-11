// 今は空
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.COMMON_BUTTON').addEventListener('click', async function() {
        const keyword = document.getElementById('INPUT_KEYWORD').value;
        if (keyword) {
            const searched_elements = await db_search_elements(keyword);
            console.log(searched_elements);
            // 別ページへオブジェクトを渡すための処理
            const encodedObject = encodeURIComponent(JSON.stringify(searched_elements));
            window.location.href = `./keyword_search_result.html?param=${encodedObject}`;
        } else {
            return;
        }
    })
});

// 商品ジャンルを元にデータベースから出店者のリストを取得する関数
async function db_search_elements(keyword){
    const response = await fetch("http://127.0.0.1:8000/api/user/user_search_keyword/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "keyword": {"キーワード" : keyword}
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
}

function create_server_error_text() {
    console.log('サーバーエラーです．')
}
