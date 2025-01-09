document.getElementById('searchButton').addEventListener('click', function() {
    var userID = document.getElementById('userID').value;

    if (userID === '') {
        alert('IDを入力してください');
        return;
    }

    // IDをサーバーに送信
    fetch('/searchUser', { // このURLはサーバー側のエンドポイント
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userID })
    })
    .then(response => response.json()) // サーバーからのJSONレスポンスを受け取る
    .then(data => {
        if (data.success) {
            // サーバーから受け取ったデータを表示
            document.getElementById('resultArea').innerHTML = `
                <h3>ユーザー情報</h3>
                <p><strong>ID:</strong> ${data.user.id}</p>
                <p><strong>名前:</strong> ${data.user.name}</p>
                <p><strong>メール:</strong> ${data.user.email}</p>
            `;
        } else {
            // ユーザーが見つからない場合
            document.getElementById('resultArea').innerHTML = `<p>ユーザーが見つかりませんでした。</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultArea').innerHTML = `<p>エラーが発生しました。もう一度お試しください。</p>`;
    });
});
