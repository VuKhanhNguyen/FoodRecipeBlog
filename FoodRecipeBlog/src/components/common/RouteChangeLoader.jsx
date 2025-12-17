import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  increment as startLoading,
  decrement as stopLoading,
} from "../../utils/loadingManager";

export default function RouteChangeLoader() {
  const location = useLocation();

  useEffect(() => {
    // Start loading on every route change
    startLoading();
    let done = false;
    const id = setTimeout(() => {
      // Allow a brief overlay even without fetches; if fetches are active,
      // the global counter will keep overlay visible.
      done = true;
      stopLoading();
    }, 400);

    // In React StrictMode (dev), effects run twice: we must decrement
    // when cleaning up if the timeout hasn't fired yet, otherwise count sticks.
    return () => {
      if (!done) {
        stopLoading();
      }
      clearTimeout(id);
    };
    // location.key changes per navigation in React Router v6+.
  }, [location.key]);

  return null;
}
