import { Outlet } from 'react-router-dom';
import './App.scss';
import { useAppDispatch } from './hooks/state.hooks';
import { useEffect } from 'react';
import AuthService from './services/auth.service';
import { thunkSignOut } from './store/thunks/auth.thunk';
import { Navbar as AppNavbar } from './components';
import { useSelector } from 'react-redux';
import { selectUser } from './store/slices/auth.slice';

function App() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!user) {
      dispatch(thunkSignOut());
    }
    const unsubscribe = AuthService.observeAuthChanges(async (authUser) => {
      if (!authUser) {
        dispatch(thunkSignOut());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (!user) {
    return <></>;
  }

  return (
    <div className="w-full h-full flex lg:p-4 bg-white ">
      <AppNavbar />
      <main className="flex w-full h-full flex-1 flex-col gap-2 ">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
