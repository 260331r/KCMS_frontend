const storedata = [
    {name: "ダミー店舗名１", date: "XXXX/XX/XX XX:XX~"},
    {name: "ダミー店舗名２", date: "XXXX/XX/XX XX:XX~"},
    {name: "ダミー店舗名３", date: "XXXX/XX/XX XX:XX~"},
    {name: "ダミー店舗名４", date: "XXXX/XX/XX XX:XX~"}
]; 

const resultlist = document.querySelector('.RESULT_LIST');

storedata.forEach(store => {
    // 各店舗のコンテナを作成する
    const resultcontainer = document.createElement('div');
    resultcontainer.className = 'RESULT_CONTAINER';

    // 店舗名書き込み
    const storeName = document.createElement('p');
    storeName.className = 'COMMON_TEXT';
    // 全部色が#ff7f00だとメリハリがつかない気がする．
    storeName.style = 'color: black'; 
    storeName.textContent = store.name;

    // 日付，時間書き込み
    const dateandtime = document.createElement('p');
    dateandtime.className = 'COMMON_TEXT DATE_TEXT';
    dateandtime.textContent = '日付： ' + store.date

    // 各コンテナのボタン
    const detailbutton = document.createElement('button');
    detailbutton.className = 'COMMON_BUTTON COMMON_BUTTON_LARGE';
    detailbutton.textContent = '詳しくはこちら';

    // コンテナに要素追加
    resultcontainer.appendChild(storeName);
    resultcontainer.appendChild(dateandtime);
    resultcontainer.appendChild(detailbutton);

    // 親要素に追加
    resultlist.appendChild(resultcontainer);
});