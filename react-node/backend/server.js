// Expressフレームワークをインポートします
const express = require('express'); 
// CORSを有効にするためのモジュールをインポートします
const cors = require('cors'); 
// リクエストのボディを解析するためのモジュールをインポートします
const bodyParser = require('body-parser'); 

// Expressアプリケーションを作成します
const app = express(); 

// CORSを有効にします
app.use(cors()); 
// JSON形式のリクエストボディを解析するミドルウェアを追加します
app.use(bodyParser.json()); 

// GETリクエストに対するハンドラーを設定します
app.get('/api', (req, res) => {
  // レスポンスとしてJSONを返します
  res.json({ message: "こんにちは!" }); 
});

// ポート番号を設定します。環境変数PORTが設定されていない場合は5000を使用します
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  // サーバーが起動したことをコンソールに出力します
  console.log(`Server running on port ${PORT}`); 
});

// 追加-----------------------------------------------------

// MySQLデータベースに接続するためのモジュールをインポートします
const mysql = require('mysql2'); 

// Create a connection pool
// 接続プールを作成します
const pool = mysql.createPool({
  host: 'localhost', // データベースのホスト名
  user: 'root', // データベースのユーザー名
  password: 'P@ssw0rd', // データベースのパスワード
  database: 'map', // 使用するデータベースの名前
  waitForConnections: true, // 接続待機を有効にします
  connectionLimit: 10, // 最大接続数を設定します
  queueLimit: 0 // 接続キューの最大数を設定します（0は無制限）
});

// Promisify for use with async/await
// async/awaitで使用するためにプロミス化します
const promisePool = pool.promise();

// Example query function
// 例のクエリ関数
async function queryDatabase() {
  try {
    // データベースにクエリを送信します
    const [rows, fields] = await promisePool.query('SELECT * FROM users');
    console.log(rows); // 結果の行をコンソールに出力します
  } catch (error) {
    // エラーが発生した場合の処理
    console.error('Error querying database:', error);
  }
}

// Use the function
// 関数を使用します
queryDatabase(); // queryDatabase関数を呼び出します
