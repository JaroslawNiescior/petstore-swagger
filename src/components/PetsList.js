import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../actions';
import { Image, List, Divider, Header } from 'semantic-ui-react'
import ModalLogic from "./ModalLogic";


const PetsList = ({ status }) => {
    const data = useSelector(state => state.pets);
    const [firstRender, setFirstRender] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!firstRender) {
            dispatch(fetchPets(status));
            setFirstRender(true);
        }
    }, [firstRender, dispatch, status])

    const renderedList = data.length > 0 ? data.slice(0, 10).map((pet, index) => {
        return (
            <List.Item key={index}>
                {status === "available" ? (
                    <ModalLogic pet_={pet} imageSrc={`https://placedog.net/600/600?random&foo=${Math.random()}`} />
                ) : null}
                <Image size='tiny' avatar src={`https://placedog.net/600/600?random&foo=${Math.random()}`} />
                <List.Content><Header size="huge">{pet.name}</Header></List.Content>
            </List.Item>
        )
    }) :
        <List.Item>
            <List.Content><Header size="huge">No items...</Header></List.Content>
        </List.Item>;

    return (
        <div className="App_list">
            <List relaxed divided verticalAlign='middle'>{renderedList}</List>
            <Divider />
        </div>
    );
};

export default PetsList;