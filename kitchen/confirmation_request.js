const place_info = {
    name: 'ダミー場所名', // 場所名
    date: 'XXXX/XX/XX XX:XX~XX:XX', // 日付
}

const info_container = document.querySelector('.CONFIRM_TEXT_INFO');

const place_name = document.createElement('p');
place_name.className = 'COMMON_TEXT OWNER_TEXT';
place_name.textContent = place_info.name;

const place_date = document.createElement('p');
place_date.className = 'COMMON_TEXT OWNER_TEXT';
place_date.textContent = place_info.date;

info_container.appendChild(place_name);
info_container.appendChild(place_date);