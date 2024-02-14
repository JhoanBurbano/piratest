import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/slices/auth.slice';
import { useAppDispatch } from '../../../hooks/state.hooks';
import { thunkSignOut } from '../../../store/thunks/auth.thunk';
import { setPath } from '../../../store/slices/ui.slice';
import { PATHS } from '../../../enums/paths.enum';

export default function AppNavbar() {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(thunkSignOut());
  };

  const handleClickPlus = (page: PATHS) => {
    dispatch(setPath(page));
  };

  return (
    <nav className="h-[90vh] w-[70px] flex flex-col px-2 pb-8 pt-4 items-center gap-6 justify-between sticky top-2">
      <section
        className="w-full text-5xl text-red-600 cursor-pointer"
        onClick={() => handleClickPlus(PATHS.HOME)}
      >
        <i className="fa-brands fa-pinterest"></i>
      </section>
      <section className="flex flex-col gap-6 items-center w-full">
        <Dropdown placement="bottom-end" className="max-h-max">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={
                user?.photoURL ||
                'https://firebasestorage.googleapis.com/v0/b/piratest-cheaf.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=81f58597-20b9-44c3-a26a-6e9118081abd'
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" textValue={user!.email!}>
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user!.email!}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <button className="text-2xl border-1 border-gray-600 p-1 rounded-full w-[45px] h-[45px] shadow-lg ">
          <i className="fa-solid fa-bell"></i>
        </button>
        <button
          className="text-2xl border-1 border-gray-600 p-1 rounded-full w-[45px] h-[45px] shadow-lg "
          onClick={() => handleClickPlus(PATHS.USERS_POST)}
        >
          <i className="fa-solid fa-users fa-shake"></i>
        </button>
      </section>
      <section className="text-2xl border-1 border-black p-1 rounded-full w-[45px] h-[45px] shadow-lg flex items-center justify-center bg-black text-white">
        <i className="fa-solid fa-heart "></i>
      </section>
      <section className="flex flex-col gap-6 items-center w-full">
        <button className="text-2xl border-1 border-gray-600 p-1 rounded-full w-[45px] h-[45px] shadow-lg ">
          <i className="fa-solid fa-question"></i>
        </button>
        <button
          className="text-2xl border-1 border-gray-600 p-1 rounded-full w-[45px] h-[45px] shadow-lg "
          onClick={() => handleClickPlus(PATHS.NEW_POST)}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </section>
    </nav>
  );
}
