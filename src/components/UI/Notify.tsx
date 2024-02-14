import { useSelector } from 'react-redux';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { cleanNotify, selectNotify } from '../../store/slices/ui.slice';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../hooks/state.hooks';

const Notify = () => {
  const dispatch = useAppDispatch();
  const onCloseClean = () => dispatch(cleanNotify());
  const notify = useSelector(selectNotify);
  useEffect(() => {
    if (!!notify) {
      toast(notify.content, {
        type: notify.severity,
        theme: 'light',
        transition: Bounce,
        onClose: onCloseClean,
      });
    }
  }, [notify]);
  return (
    <div className="fixed z-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Notify;
