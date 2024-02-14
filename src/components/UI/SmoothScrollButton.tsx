import classNames from 'classnames';
import { useEffect, useState } from 'react';

const SmoothScrollButton = () => {
  const [showGoTop, setShowGoTop] = useState<Boolean>(false);
  const handleScrollBar = () => {
    if (showGoTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };
  const handleScroll = () => {
    const isScrollEnd = window.scrollY + window.innerHeight >= document.body.scrollHeight;
    setShowGoTop(window.scrollY > (document.body.scrollHeight * 3) / 4 || isScrollEnd);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <button
      className="fixed p-2 bottom-4 right-4 bg-red-600 text-white fa-bounce h-[50px] w-[50px] flex justify-center items-center rounded-full shadow-2xl z-30"
      onClick={handleScrollBar}
    >
      <i
        className={classNames('fa-solid font-bold text-medium', {
          'fa-arrow-up': showGoTop,
          'fa-arrow-down': !showGoTop,
        })}
      ></i>
    </button>
  );
};

export default SmoothScrollButton;
