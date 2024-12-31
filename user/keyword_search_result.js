// ダミーの店舗名を作成.
// それぞれ遷移先のリンクが必要であるが，今回は省く.
const storedata = [
    {name: "ダミー店舗名１"},
    {name: "ダミー店舗名２"},
    {name: "ダミー店舗名３"},
    {name: "ダミー店舗名４"}
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

    // 各コンテナのボタン
    const detailbutton = document.createElement('button');
    detailbutton.className = 'COMMON_BUTTON COMMON_BUTTON_LARGE';
    detailbutton.textContent = '詳しくはこちら';

    // コンテナに要素追加
    resultcontainer.appendChild(storeName);
    resultcontainer.appendChild(detailbutton);

    // 親要素に追加
    resultlist.appendChild(resultcontainer);
});