import React, { useState, useEffect } from 'react';
import { Input, Switch } from 'antd';
import { SearchProps } from 'antd/es/input';

const { Search } = Input;

interface NavbarProps {
    searching?: SearchProps['onSearch'];
    onThemeChange: (theme: 'light' | 'dark') => void;
}

const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

const Navbar: React.FC<NavbarProps> = ({ searching = onSearch, onThemeChange }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const onChange = (checked: boolean) => {
        setIsDarkMode(checked);
        const theme = checked ? 'dark' : 'light';
        onThemeChange(theme);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Extract the value from the event
        const value = e.target.value;

        // Check if searching is defined before calling it
        if (searching) {
            searching(value, e, undefined); // Call the original searching function
        }
    };

    useEffect(() => {
        // You can perform any additional actions when the theme changes
        // For example, you can apply different CSS classes or update styles
        document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    }, [isDarkMode]);

    return (
        <>
            <nav className={`${isDarkMode ? 'bg-[#232323]' : 'bg-gray-300'} py-2 text-white px-4 md:px-10 lg:px-20 flex justify-between w-full items-center`}>
                <div className={`${isDarkMode ? 'text-white' : 'text-black'} select-none text-xl md:text-2xl lg:text-3xl font-thin`}>
                    FotoFolio
                </div>
                <div className={'hidden md:flex'}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        className={`w-96 rounded-md ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-400'}`}
                        onChange={handleSearch}
                        onSearch={searching}
                    />
                </div>
                <Switch defaultChecked={isDarkMode} onChange={onChange} />
            </nav>
            <div className={`${isDarkMode ? 'bg-[#232323]' : 'bg-gray-300'} flex items-cennter justify-center p-2 md:hidden`}>
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    className={`rounded-md bg-[#2d2d2d] ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-400'}`}
                    onChange={handleSearch}
                    onSearch={searching}
                />
            </div>
        </>
    );
};

export default Navbar;
