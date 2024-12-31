const owner_info = {
    name: 'ダミー店舗名', // 店舗名
    date: 'XXXX/XX/XX XX:XX~XX:XX', // 日付
}

const info_container = document.querySelector('.CONFIRM_TEXT_INFO');

const owner_name = document.createElement('p');
owner_name.className = 'COMMON_TEXT OWNER_TEXT';
owner_name.textContent = owner_info.name;

const owner_date = document.createElement('p');
owner_date.className = 'COMMON_TEXT OWNER_TEXT';
owner_date.textContent = owner_info.date;

info_container.appendChild(owner_name);
info_container.appendChild(owner_date);