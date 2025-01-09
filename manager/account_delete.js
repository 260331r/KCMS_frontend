// 削除ボタンがクリックされた時の処理
document.getElementById('deleteButton').addEventListener('click', function() {
    // アカウントIDまたは必要な情報をここで取得
    var accountId = 'sample_account_id'; // ここでは仮のアカウントIDを使用

    // 削除リクエストをサーバーに送信
    fetch('/deleteAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: accountId })
    })
    .then(response => response.json()) // サーバーからのレスポンスを受け取る
    .then(data => {
        if (data.success) {
            // 削除が成功した場合
            window.location.href = 'account_delete.html'; // 削除完了ページに遷移
        } else {
            // 削除に失敗した場合
            alert('アカウントの削除に失敗しました。再試行してください。');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました。再試行してください。');
    });
});
