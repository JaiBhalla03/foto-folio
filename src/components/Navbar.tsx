import React from 'react';
import { Input, Switch } from 'antd';
import { SearchProps } from 'antd/es/input';

const { Search } = Input;

interface NavbarProps {
    searching?: SearchProps['onSearch'];
}

const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

const Navbar: React.FC<NavbarProps> = ({ searching = onSearch }) => {
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Extract the value from the event
        const value = e.target.value;

        // Check if searching is defined before calling it
        if (searching) {
            searching(value, e, undefined); // Call the original searching function
        }
    };

    return (
        <nav className={'bg-[#232323] py-2 text-white px-20 flex justify-between w-full items-center'}>
            <div className={'text-3xl font-thin'}>
                FotoFolio
            </div>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                className={'w-96 rounded-md bg-[#2d2d2d]'}
                onChange={handleSearch}
                onSearch={searching}
            />
            <Switch defaultChecked onChange={onChange} />
        </nav>
    );
};

export default Navbar;
