import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPets = (status) => async dispatch => {
    const response = await jsonPlaceholder.get(`/findByStatus?status=${status}`);
    dispatch({ type: 'FETCH_PETS', payload: response.data });
};
