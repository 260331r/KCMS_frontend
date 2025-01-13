//高知県内の地域リスト
const place = ['高知市', '室戸市', '安芸市', '南国市', '土佐市', '須崎市', '宿毛市', '土佐清水市', '四万十市', '香南市', '香美市',
    '東洋町', '奈半利町', '田野町', '安田町', '北川村', '馬路村', '芸西村', '本山町', '大豊町', '土佐町', '大川村', 'いの町', '仁淀川村', '中土佐町',
    '佐川町', '越知町', '檮原町', '日高村', '津野町', '四万十町', '大月町', '三原村', '黒潮町',];
let placelistHtml = '';

placelistHtml += '<label for="placebox">地域を入力</label>'
for (let i = 0; i < place.length; i++) {
    placelistHtml += '<option value=' + i + ' selected>' + place[i] + '</option>';
}

const sec = document.querySelector('select');
sec.innerHTML = placelistHtml;

let selectplace;
selectplace = sec.options[sec.value].textContent;
sec.addEventListener(`change`, function() {
    selectplace = this.options[sec.value].textContent;
});

const button = document.getElementById('place_next_button');
button.onclick= async function() {
    const searched_elements = await db_search_elements(selectplace);
    // 別ページへオブジェクトを渡すための処理
    const encoded_object = encodeURIComponent(JSON.stringify(searched_elements));
    window.location.href = `./place_search_result.html?param=${encoded_object}`;
};

// データベースから地域を元に場所提供者のリストを取得する関数
async function db_search_elements(place){
    const response = await fetch("http://127.0.0.1:8000/api/user/user_search_area/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "area": {"地域" : place}
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
    console.log('サーバーエラーです．')
    return 0;
}
