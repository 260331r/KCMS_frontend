// 削除ボタンのクリックイベントを設定
document.getElementById('deleteButton').addEventListener('click', function() {
    // 確認ダイアログを表示
    if (confirm('本当に削除しますか？')) {
        // 「はい」が選択された場合、manager_toppage.htmlに遷移
        window.location.href = 'manager_toppage.html';
    }
});
