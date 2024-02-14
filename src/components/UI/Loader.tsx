import { useSelector } from 'react-redux';
import { selectLoader } from '../../store/slices/ui.slice';
import { useEffect } from 'react';

interface LoaderProps {
  show?: boolean;
}
const Loader: React.FC<LoaderProps> = ({ show }) => {
  const loader = useSelector(selectLoader);
  useEffect(() => {
    if (loader) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
  return (
    <>
      {(loader || show) && (
        <div className="w-[100vw] h-[100vh] fixed bg-gray-200 top-0 left-0 z-50 bg-opacity-50 backdrop-blur-lg flex justify-center items-center flex-col">
          <section className="text-9xl text-red-600 cursor-pointer fa-bounce">
            <span className="fa-fade bg-white rounded-full flex w-[140px] h-[140px] justify-center items-center">
              <i className="fa-brands fa-pinterest  fa-spin"></i>
            </span>
          </section>
          <p className="text-2xl text-center text-zinc-700 font-bold fa-shake font-mono ">
            Loading
          </p>
        </div>
      )}
    </>
  );
};

export default Loader;
