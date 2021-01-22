import React, { useState } from "react";
import { Menu } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { fetchPets } from '../actions';

const MenuLogic = ({ onMenuChange }) => {
    const [activeItem, setActiveItem] = useState('Available');

    const dispatch = useDispatch();

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
        dispatch(fetchPets(name.toLowerCase()))
        return onMenuChange(name.toLowerCase());
    }

    return (
        <Menu attached='top' tabular>
            <Menu.Item
                name='Available'
                active={activeItem === 'Available'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='Pending'
                active={activeItem === 'Pending'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='Sold'
                active={activeItem === 'Sold'}
                onClick={handleItemClick}
            />
        </Menu>
    )
}
export default MenuLogic;