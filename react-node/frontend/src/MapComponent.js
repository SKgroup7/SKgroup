// 必要なReactフックとGoogle Maps APIコンポーネントをインポート
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Google Maps APIキーを定義（実際の使用時は環境変数などで安全に管理することをお勧めします）
const API_KEY = 'AIzaSyDLExH6OAGCBZLZspYmQquis5AFpPJ63TQ';

// マップのコンテナスタイルを定義（幅100%、高さ500px）
const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

// デフォルトの中心座標を設定
const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

// MapComponentの定義を開始
const MapComponent = () => {
  // 現在位置の状態を管理するためのuseState
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  // マーカーの配列を管理するためのuseState
  const [markers, setMarkers] = useState([]);

  // コンポーネントがマウントされたときに実行されるuseEffect
  useEffect(() => {
    // ブラウザのジオロケーションAPIを使用して現在位置を取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 位置情報の取得に成功した場合、現在位置を更新
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      () => {
        // 位置情報の取得に失敗した場合、エラーをコンソールに出力
        console.error("現在位置の取得に失敗");
      }
    );
  }, []); // 空の依存配列で、このエフェクトは初回レンダリング時のみ実行される

  // マップがクリックされたときのハンドラ関数
  const handleMapClick = (event) => {
    // クリックされた位置に新しいマーカーを作成
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    // 新しいマーカーを既存のマーカー配列に追加
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    // 新しいマーカーの位置をコンソールに出力
    console.log("マーカー追加:", newMarker);
  };

  // コンポーネントのレンダリング
  return (
    // Google Maps APIをロードするためのLoadScriptコンポーネント
    <LoadScript googleMapsApiKey={API_KEY}>
      {/* GoogleMapコンポーネントを描画 */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentPosition}
        zoom={15}
        onClick={handleMapClick}
      >
        {/* 現在位置にマーカーを配置 */}
        <Marker position={currentPosition} />
        {/* クリックで追加されたマーカーを全て表示 */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

// MapComponentをエクスポート
export default MapComponent;
