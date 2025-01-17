document.addEventListener("DOMContentLoaded", () => {
    // 場所名，出店日時を持ってくる
    const owner_info = get_before_info();
    // 前画面でlocalstorageにユーザID,場所IDを保存しておく
    if (!owner_info) {
        view_info(owner_info);
    }
});

function get_before_info() {
    const url_params = new URLSearchParams(window.location.search);
    const encoded_data = url_params.get('param');
    if (encoded_data) {
        try{
            const info_elements = JSON.parse(decodeURIComponent(encoded_data));
            return info_elements;
        } catch (error) {
            console.error('データ解析中にエラーが発生しました');
            return false;
        }   
    } else {
        view_error();
        before_button();
    }
    return false;
}

function view_info(info_element) {
    const info_container = document.querySelector('#CONFIRM_TEXT_INFO');
    
    const title = document.createElement('p');
    title.textContent = "依頼を確定しますか？";
    title.className = "COMMON_TEXT OWNER_TEXT";
    title.style = "color: black";

    const owner_name = document.createElement('p');
    owner_name.className = 'COMMON_TEXT OWNER_TEXT';
    owner_name.textContent = "場所名" + info_element.name;

    const owner_date = document.createElement('p');
    owner_date.className = 'COMMON_TEXT OWNER_TEXT';
    owner_date.textContent = "出店日時" + info_element.date;

    const confirm_button = document.createElement('button');
    confirm_button.textContent = "確定";
    confirm_button.addEventListener("click", async() => {
        // APIに渡す要素
        const user_id = localStorage.getItem("user_id");
        const locate_id = localStorage.getItem("place_id");
        const datetime = info_element.日時;
        const schedule_info = {
            "ユーザID": user_id,
            "場所ID": locate_id,
            "日時": datetime
        }
        const isconfirm = await fetch_db(schedule_info);
        if (!isconfirm) {
            return false;
        }
        window.location.href = './requestconfimation.html';
    });
    info_container.appendChild(owner_name);
    info_container.appendChild(owner_date);
    info_container.appendChild(confirm_button);
}

async function fetch_db(schedule_info) {
    console.log(schedule_info);
    const response = await fetch("http://127.0.0.1:8000/api/store/store_mathing_accept/insert_datetime", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            place_info: schedule_info
        })
    });

    try {
        const result = await response.json();

        if (!response.ok || !result) {
            create_can_not_regist_text();
            before_button();
            return false;
        }

        return result;
    } catch (error) {
        create_server_error_text();
        before_button();
    }
    return false;
}

function view_error() {
    const error_text = document.getElementById('error');
    error_text.textContent = "情報を取得できませんでした．";
}

function create_server_error_text() {
    const error_text = document.getElementById('error');
    error_text.textContent = "サーバーエラーです";
}

function create_can_not_regist_text() {
    const error_text = document.getElementById('error');
    error_text.textContent = "情報を登録できませんでした．";
}

function before_button() {
    const error = document.getElementById('error_button');
    const error_button = document.createElement('button');
    error_button.className = "COMMON_BUTTON";
    error_button.textContent = "OK";
    error_button.addEventListener("click", () => {
        window.location.href = './acceptance_form.html';
    });
    error.appendChild(error_button);
}