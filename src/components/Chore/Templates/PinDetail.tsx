import { Modal, ModalContent, ModalBody, User, Chip, Image } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/state.hooks';
import { cleanPin, selectPin } from '../../../store/slices/gallery.slice';

interface PinDetailProps {}

const PinDetail: React.FC<PinDetailProps> = () => {
  const dispatch = useAppDispatch();
  const pin = useSelector(selectPin);
  const onClose = () => {
    dispatch(cleanPin());
  };
  return (
    <Modal
      backdrop="blur"
      isOpen={!!pin}
      onClose={onClose}
      size="5xl"
      classNames={{ base: 'max-width-[none] max-h-[80vh]' }}
      scrollBehavior="outside"
      placement="bottom-center"
    >
      <ModalContent>
        {
          <>
            <ModalBody as={'article'} className="md:flex-row p-0 bg-white rounded-2xl">
              <section>
                <Image
                  width="w-[80%] md:w-full min-w-[400px]"
                  height={'min-h-[400px]'}
                  alt="NextUI hero Image with delay"
                  src={pin?.img}
                  loading="lazy"
                  radius="none"
                  isBlurred
                  classNames={{
                    img: 'h-full w-full object-cover rounded-t-2xl md:rounded-l-2xl',
                    wrapper: 'h-full',
                  }}
                  className="max-w-max h-full m-auto md:min-h-[500px]"
                />
              </section>
              <section className="flex flex-col justify-between md:p-8 pl-2 gap-2 md:gap-4 w-[95%] md:max-w-max">
                <section className="flex justify-between md:grid gap-4 w-full">
                  <User
                    name={pin?.userName || 'Jane Doe'}
                    description="Author"
                    className="justify-self-start flex-1 max-w-max"
                    avatarProps={{
                      src:
                        pin?.userProfile ||
                        'https://firebasestorage.googleapis.com/v0/b/piratest-cheaf.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=81f58597-20b9-44c3-a26a-6e9118081abd',
                    }}
                  />
                  <section className="flex gap-4 w-full items-center text-xs max-w-min md:min-w-max">
                    <span className="flex md:gap-2 items-center flex-col md:flex-row">
                      <i className="fa-solid fa-comments p-2 text-blue-500 rounded-full bg-slate-300  shadow-lg w-[32px] h-[32px] flex justify-center items-center cursor-pointer"></i>
                      <p className="text-center">{pin?.comments || 0} comments</p>
                    </span>
                    <span className="flex md:gap-2 items-center flex-col md:flex-row">
                      <i className="fa-solid fa-thumbs-up p-2 text-blue-500 rounded-full bg-slate-300  shadow-lg w-[32px] h-[32px] flex justify-center items-center cursor-pointer"></i>
                      <p className="text-center">{pin?.likes} likes</p>
                    </span>
                    <span className="flex md:gap-2 items-center flex-col md:flex-row">
                      <i className="fa-solid fa-download p-2 text-blue-500 rounded-full bg-slate-300  shadow-lg w-[32px] h-[32px] flex justify-center items-center cursor-pointer"></i>
                      <p className="text-center">{pin?.downloads} downloads</p>
                    </span>
                  </section>
                </section>
                <section className="flex gap-4 w-full items-center justify-start">
                  <p className="font-bold">Tags</p>
                  <span className="flex gap-4">
                    {pin?.tags.map((t, i) => (
                      <Chip color="warning" variant="dot" className="text-xs" key={i}>
                        {t}
                      </Chip>
                    ))}
                  </span>
                </section>
              </section>
            </ModalBody>
          </>
        }
      </ModalContent>
    </Modal>
  );
};

export default PinDetail;
