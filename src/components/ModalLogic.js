import React, { useState } from "react";
import { Button, Modal, Icon, Card, Loader, Dimmer } from 'semantic-ui-react';
import { fetchPets } from "../actions/index";
import { useDispatch } from 'react-redux';
import jsonPlaceholder from '../apis/jsonPlaceholder';

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

const ModalLogic = ({ pet_, imageSrc }) => {
  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
    size: undefined
  });
  const [pet, setPet] = useState(pet_);
  const [sold, setSold] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch_ = useDispatch();
  const { open, size } = state;

  const confirmHandle = async () => {
    setLoading(true);
    pet.status = "sold";
    const response = (await jsonPlaceholder(
      {
        method: 'put',
        data: pet
      })
    );
    setPet(response.data);
    setLoading(false);
    setSold(true);
  }

  const success_ = () => {
    setPet(pet_);
    dispatch_(fetchPets("available"));
    setSold(false);
    return dispatch({ type: 'close' })
  }


  const ButtonLogic =
  {
    color: "green",
    onClick: () => dispatch({ type: 'open', size: 'mini' }),
    disabled: false,
    content: "Buy"
  }
  return (
    <>
      <Button onClick={ButtonLogic.onClick} color={ButtonLogic.color} disabled={ButtonLogic.disabled} floated='right' animated='vertical' size="huge">
        <Button.Content hidden>{ButtonLogic.content}</Button.Content>
        <Button.Content visible>
          <Icon name='in cart' />
        </Button.Content>
      </Button>
      {pet.name ? (
        <Modal
          size={size}
          open={open}
          onClose={() => dispatch({ type: 'close' })}
        >
          <Modal.Header>Buy Pet</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to buy this pet?</p>
            <Card
              image={imageSrc}
              header={pet_.name}
              meta={pet_.category ? pet_.category.name : null}
              description="Best pet you've ever had :)"
              extra={pet_.status}
            />
          </Modal.Content>
          {
            loading ?
              (
                <Dimmer active inverted>
                  <Loader size='small'>Loading</Loader>
                </Dimmer>
              )
              : sold ?
                (
                  <Modal.Actions>
                    <Button positive onClick={success_} >
                      Success
                    </Button>
                  </Modal.Actions>
                )
                :
                (
                  <Modal.Actions>
                    <Button negative onClick={() => dispatch({ type: 'close' })}>
                      No
                    </Button>
                    <Button positive onClick={confirmHandle}>
                      Yes
                    </Button>
                  </Modal.Actions>
                )


          }
        </Modal>

      ) : (null)
      }
    </>)
}
export default ModalLogic;