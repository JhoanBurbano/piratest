import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/state.hooks';
import { scrollImagesByTag, searchImagesByTag } from '../store/thunks/pin.thunk';
import { cleanAll, cleanPage } from '../store/slices/gallery.slice';
import { debounce } from '../utils/common.utils';
import Searchbar from '../components/Chore/Atoms/Searchbar';
import PinLists from '../components/Chore/Organism/PinLists';

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
      {search ? <h2>Resultados de busqueda:</h2> : null}
      <PinLists handleLoadMore={handleRequest} />
    </>
  );
};

export default Dashboard;
