import { RefObject, useEffect, useState } from "react";

const useVisible = (element: RefObject<Element>, rootMargin: string) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observe = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin }
    );

    element.current && observe.observe(element.current);
  });
  return isVisible;
};

export default useVisible;
