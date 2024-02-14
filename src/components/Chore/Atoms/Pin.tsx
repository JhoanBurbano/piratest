import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/state.hooks';
import { PinPreview } from '../../../interfaces/pin.interface';
import { PinSize } from '../../../enums/pin.enum';
import galleryService from '../../../services/gallery.service';
import { getPinById, searchImageById } from '../../../store/thunks/pin.thunk';
import { Button } from '@nextui-org/react';

const Pin: React.FC<PinPreview & { isCustom?: boolean }> = ({
  id,
  img,
  views,
  height,
  width,
  isCustom,
}) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [size, setSize] = useState<PinSize>();

  const onViewClick = () => {
    if (isCustom) {
      return dispatch(getPinById(id));
    }
    return dispatch(searchImageById(id));
  };

  useEffect(() => {
    setSize(() => galleryService.getImageSize(width, height));
  }, []);

  if (!size) {
    return;
  }

  return (
    <div
      className="rounded-2xl m-1 relative overflow-hidden cursor-pointer"
      style={{
        gridRowEnd: `span ${size === 'large' ? '45' : size === 'medium' ? '35' : '20'}`,
      }}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />

      {show && (
        <section className="absolute bottom-0 w-full h-full bg-[#21212188] transition-all grid content-between p-2 animate-appearance-in">
          <span className="text-sm  text-white flex gap-1 items-center">
            <i className="fa-solid fa-eye"></i>
            <p>{views}</p>
          </span>
          <span className="text-sm justify-self-end">
            <Button className="bg-red-600 text-white" onClick={onViewClick}>
              Show pin
            </Button>
          </span>
        </section>
      )}
    </div>
  );
};

export default Pin;
