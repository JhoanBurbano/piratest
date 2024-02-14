import { Input } from '@nextui-org/react';
import { useState } from 'react';

interface SearchBarProps {
  searchHandler: (value: string) => void;
}
const Searchbar: React.FC<SearchBarProps> = ({ searchHandler }) => {
  const [search, setSearch] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    searchHandler(value);
  };
  return (
    <div className="h-60px w-full sticky top-5 z-40">
      <Input
        label="Search"
        radius="lg"
        className="w-full"
        variant="bordered"
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60',
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'shadow-xl',
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focused=true]:bg-default-200/50',
            'dark:group-data-[focused=true]:bg-default/60',
            '!cursor-text',
          ],
        }}
        placeholder="Type to search..."
        startContent={<i className="fa-solid fa-magnifying-glass"></i>}
        value={search}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Searchbar;
