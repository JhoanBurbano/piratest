import { useCallback, useEffect, useState } from 'react';
import { PinLists, Searchbar } from '../components';
import { useAppDispatch } from '../hooks/state.hooks';
import pinRepository from '../repositories/pin.repository';
import { searchPinByTag, updateUsersPin } from '../store/thunks/pin.thunk';
import { PinUploaded } from '../interfaces/pin.interface';
import { cleanAll } from '../store/slices/gallery.slice';
import { setLoader } from '../store/slices/ui.slice';
import { debounce } from '../utils/common.utils';

const Community = () => {
  const [search, setSearch ] = useState<string>('')
  const dispatch = useAppDispatch();
  function handleRequest(value: string) {
    dispatch(searchPinByTag(value));
  }

  const handleRequestDebounced = useCallback(
    debounce((value: string) => {
      setSearch(value),
      handleRequest(value)
    }, 300),
    [],
  );
  useEffect(() => {
    dispatch(setLoader(true));
    let number = 0;
    const unsuscribe = pinRepository.getAllDocumentsObserver(({ docs }) => {
      console.log(number > 0);
      const data = docs.map((d) => ({ id: d.id, ...d.data() }));
      dispatch(updateUsersPin({ pins: data as PinUploaded[], showNotification: number > 0 }));
      number++;
      dispatch(setLoader(false));
    });
    return () => {
      unsuscribe();
      dispatch(cleanAll());
    };
  }, []);
  return (
    <>
      <Searchbar searchHandler={handleRequestDebounced} />
      {search ? <h1 className=''>Resultados de busqueda</h1> : null}
      <PinLists showLoadMore={false} isCustom />
    </>
  );
};

export default Community;
