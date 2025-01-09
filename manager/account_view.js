document.getElementById('deleteButton').addEventListener('click', function() {
    // 削除確認のポップアップ
    if (confirm('本当に削除しますか？')) {
        // 「はい」が選択された場合、削除しました画面に遷移
        window.location.href = 'acount_delete.html';
    } else {
        // 「いいえ」が選択された場合、何もせず遷移しない
        return;
    }
});
