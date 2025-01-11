document.addEventListener("DOMContentLoaded", () => {
    fetch_before();
});
// 前ページから検索結果を取得
function fetch_before() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('param');
    console.log(encodedData);
    if (encodedData) {
        const searched_elements = JSON.parse(decodeURIComponent(encodedData));
        view_result(searched_elements);
    } else {

    }
}
// 検索結果を表示させる．
function view_result(searched_elements) {
    const resultlist = document.querySelector('.RESULT_LIST');
    for (let i = 0; i < searched_elements.length; i++) {
        const resultcontainer = document.createElement('div');
        resultcontainer.className = 'RESULT_CONTAINER';

        const placeName = document.createElement('p');
        placeName.className = 'COMMON_TEXT';
        placeName.style = 'color: black';
        placeName.textContent = searched_elements[i].場所名;
        resultcontainer.appendChild(placeName);

        const detailButton = document.createElement('button');
        detailButton.className = 'COMMON_BUTTON COMMON_BUTTON_LARGE';
        detailButton.textContent = '詳しくはこちら';

        detailButton.addEventListener('click', function() {
            // 場所IDを場所提供者詳細画面へ渡す．
            // window.location.href=`../place/sample.html?id={searched_elements[i].場所ID}`;
        });
        resultcontainer.appendChild(detailButton);

        resultlist.appendChild(resultcontainer);
    }
}