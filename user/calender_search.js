document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#search_button').addEventListener('click', async function() {
        const date = document.getElementById('date').value;
        if (date) {
            console.log(date);
        } else {
            return;
        }
        const searched_elements = await db_search_elements(date);
        //console.log(searched_elements);
        // 別ページへオブジェクトを渡すための処理
        const encoded_object = encodeURIComponent(JSON.stringify(searched_elements));
        window.location.href = `./calender_search_result.html?param=${encoded_object}`;
    });
});

async function db_search_elements(date){
    const response = await fetch("http://127.0.0.1:8000/api/user/user_search_calendar/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "datetime": date
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