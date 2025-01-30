import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function DisablePreventNavigation() {
    const history = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // ブラウザバックを防ぐためのイベントリスナーを追加
        const handlePopState = (event: PopStateEvent) => {
            event.preventDefault();
            history(location.pathname);
        };

        // イベントリスナーを登録
        window.addEventListener("popstate", handlePopState);

        // クリーンアップ関数
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [history,location]);

    return <></>;
}
