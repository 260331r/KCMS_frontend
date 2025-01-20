document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#search_button').addEventListener('click', async function() {
        const date = document.getElementById('date').value;
        if (!date) {
            empty_error_text();
            return;
        }

        // データベースに接続していないとここで止まる
        const searched_elements = await db_search_elements(date);

        // 別ページへオブジェクトを渡すための処理
        if (searched_elements) {
            const encoded_object = encodeURIComponent(JSON.stringify(searched_elements));
            window.location.href = `./calender_search_result.html?param=${encoded_object}`;
        } else {
            window.location.href = './calender_search_result.html';
        }
        
    });
});

async function db_search_elements(date){
    try {
        const response = await fetch("http://127.0.0.1:8000/api/user/matched_list/get_by_date", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "date": {"日時" : date}
            })
        });
        
        if (!response.ok) {
            return false;
        }

        const result = await response.json();
        /*
        if (!response.ok || !result || result.length <= 0) {
            create_not_search_text();
        }*/
        return result;
    } catch (error) {
        //create_server_error_text();
        return null;
    }
}


function empty_error_text() {
    const error_text = document.getElementById('error');
    error_text.textContent = "※日付を入力してください！";
}