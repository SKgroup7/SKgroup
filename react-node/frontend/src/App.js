// Reactとフックをインポートします
import React, { useState, useEffect } from 'react'; 
// HTTPリクエストを行うためのaxiosをインポートします
import axios from 'axios'; 
// マップ表示用のコンポーネントをインポートします
import MapComponent from './MapComponent'; 

function App() {
  // messageというステートを定義し、初期値を空文字に設定します
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    // コンポーネントのマウント時に実行される副作用を設定します
    // サーバーからデータを取得します
    axios.get('http://localhost:5000/api') 
      .then(response => {
        // 取得したデータをステートに設定します
        setMessage(response.data.message); 
      })
      .catch(error => {
        // エラーが発生した場合の処理
        console.error("Error fetching data: ", error); 
      })
      // 空の依存配列を渡すことで、コンポーネントのマウント時に一度だけ実行されるようにします
  }, []); 

  return (
    <div className="App">
      {/* サイトのタイトルを表示します */}
      <h1>マップサイト(仮)</h1> 

      {/* サーバーから取得したメッセージを表示します */}
      <p>backend/server.jsから: {message}</p> 

      {/* マップ表示用のコンポーネントを表示します */}
      <MapComponent /> 
    </div>
  );
}
// Appコンポーネントをエクスポートします 
export default App; 
