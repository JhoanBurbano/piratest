import Pin from '../Atoms/Pin';
import PinDetail from '../Templates/PinDetail';
import SmoothScrollButton from '../../UI/SmoothScrollButton';
import { useSelector } from 'react-redux';
import { selectPinList } from '../../../store/slices/gallery.slice';
import { Button } from '@nextui-org/react';

interface PinListProps {
  handleLoadMore?: () => void;
  showLoadMore?: boolean;
  isCustom?: boolean;
}
const PinLists: React.FC<PinListProps> = ({
  handleLoadMore = () => {},
  showLoadMore = true,
  isCustom,
}) => {
  const pinList = useSelector(selectPinList);

  const handleLoadMoreClick = () => {
    handleLoadMore();
  };

  return (
    <>
      {pinList?.length ? (
        <>
          <section className="w-full grid grid-cols-[repeat(auto-fill,300px)] mt-[15px] justify-center flex-1">
            {pinList && pinList.map((data) => <Pin key={data.id} {...data} isCustom={isCustom} />)}
          </section>
          {showLoadMore && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleLoadMoreClick} variant="ghost" color="danger" className="my-4">
                Cargar Más
              </Button>
            </div>
          )}
          <SmoothScrollButton />
          <PinDetail />
        </>
      ) : (
        <section className="w-full grid mt-[15px] justify-center flex-1">
          <section className="text-9xl text-red-600 m-auto flex flex-col items-center">
            <i className="fa-brands fa-pinterest"></i>
            <p className="text-sm font-bold text-black">Oops, no items found.</p>
            <p className="text-sm text-black">
              Try another search term {isCustom ? 'or upload files.' : ''}
            </p>
          </section>
        </section>
      )}
    </>
  );
};

export default PinLists;
