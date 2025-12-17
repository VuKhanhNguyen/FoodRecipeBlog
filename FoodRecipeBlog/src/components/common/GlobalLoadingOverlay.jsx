import { useEffect, useState } from "react";
import {
  subscribe,
  isLoading as getIsLoading,
} from "../../utils/loadingManager";
import "../../App.css";

export default function GlobalLoadingOverlay() {
  const [active, setActive] = useState(getIsLoading());

  useEffect(() => {
    const unsub = subscribe((count) => setActive(count > 0));
    return unsub;
  }, []);

  if (!active) return null;

  return (
    <div className="loading-overlay">
      <div className="loader" />
    </div>
  );
}
