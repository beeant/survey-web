import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import {history} from "../store/configureStore";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function ScrollToTop() {
  const location = useLocation();
  const previous = usePrevious(location) || {};
  useEffect(() => {

    if (history.action !== "POP" && (`${previous.pathname}${previous.search}` !== `${location.pathname}${location.search}`)) {
      window.scrollTo(0, 0);
    }
  }, [previous, location]);

  return null;
}
