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

let txt;
sec.addEventListener(`change`, function() {
    txt = this.options[sec.value].textContent;
})

const button = document.getElementById('placenext');
button.onclick= function() {
    window.location.href=`./search_result.html?param=${txt}`;
};