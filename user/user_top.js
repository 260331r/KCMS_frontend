document.querySelector("#NEXT_BUTTON").addEventListener("click", function() {
    const selectElement = document.getElementById("SEARCH_TYPE_BOX");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedValue = selectElement.value;

    if (selectedOption.hidden) {
        preventDefault();
    }
    if (selectedValue) {
        window.location.href = selectedValue;
    }
});

const dammydata = [
    {name: "店舗名", genre: "商品ジャンル", city: "市区町村", address: "住所"},
    {name: "A", genre: "B", city: "C", address: "D"},
    {name: "A", genre: "B", city: "C", address: "D"}
];

const todayslist = document.querySelector('.TODAYS_LIST');

dammydata.forEach(store=>{
    // 各店舗のコンテナを作成する
    const resultcontainer = document.createElement('div');
    resultcontainer.className = 'TODAYS_CONTAINER';

    // 店舗名書き込み
    const storeName = document.createElement('p');
    storeName.className = 'COMMON_TEXT TODAYS_TEXT';
    // 全部色が#ff7f00だとメリハリがつかない気がする．
    storeName.style = 'color: black'; 
    storeName.textContent = store.name;

    const storeGenre = document.createElement('p');
    storeGenre.className = 'COMMON_TEXT TODAYS_TEXT';
    storeGenre.textContent = store.genre;

    const storeCity = document.createElement('p');
    storeCity.className = 'COMMON_TEXT TODAYS_TEXT';
    storeCity.textContent = store.city + " " + store.address;
    
    /*const storeAddress = document.createElement('p');
    storeAddress.className = 'COMMON_TEXT TODAYS_TEXT';
    storeAddress.textContent = store.address;*/
    /*
    // 各コンテナのボタン
    const detailbutton = document.createElement('button');
    detailbutton.className = 'COMMON_BUTTON COMMON_BUTTON_LARGE';
    detailbutton.textContent = '詳しくはこちら';
    */
    // コンテナに要素追加
    resultcontainer.appendChild(storeName);
    resultcontainer.appendChild(storeGenre);
    resultcontainer.appendChild(storeCity);
    //resultcontainer.appendChild(storeAddress);
    //resultcontainer.appendChild(detailbutton);

    // 親要素に追加
    todayslist.appendChild(resultcontainer);
});
