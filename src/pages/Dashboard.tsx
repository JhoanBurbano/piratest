import { useCallback, useEffect, useState } from 'react';
import { PinLists, Searchbar } from '../components/';
import { useAppDispatch } from '../hooks/state.hooks';
import { scrollImagesByTag, searchImagesByTag } from '../store/thunks/pin.thunk';
import { cleanAll, cleanPage } from '../store/slices/gallery.slice';
import { debounce } from '../utils/common.utils';

const Dashboard = () => {
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const searchHandler = useCallback(
    debounce(async (value: string) => {
      setSearch(value);
      dispatch(cleanPage());
      await dispatch(searchImagesByTag(value));
    }, 300),
    [],
  );
  function handleRequest() {
    dispatch(scrollImagesByTag(search));
  }
  useEffect(() => {
    handleRequest();
    return () => {
      dispatch(cleanAll());
    };
  }, []);
  return (
    <>
      <Searchbar searchHandler={searchHandler} />
      {search ? <h2>Resulados de busqueda:</h2> : null}
      <PinLists handleLoadMore={handleRequest} />
    </>
  );
};

export default Dashboard;
