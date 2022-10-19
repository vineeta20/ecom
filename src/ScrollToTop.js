import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ScrollToTop() {
  const category = useSelector((state) => state.product.category);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return null;
}
