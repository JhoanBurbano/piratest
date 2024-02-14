import { useSelector } from 'react-redux';
import { cleanPath, selectPath } from '../../store/slices/ui.slice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/state.hooks';

const NavigationHandler = () => {
  const path = useSelector(selectPath);
  const router = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!path) {
      router(path);
      dispatch(cleanPath());
    }
  }, [path]);
  return <></>;
};

export default NavigationHandler;
