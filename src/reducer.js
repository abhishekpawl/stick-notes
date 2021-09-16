export const reducer = (state, action) => {
  if(action.type === 'ADD_ITEM') {

    const newCards = [...state.cards, action.payload];
    return {...state, cards: newCards};

  }
  if(action.type === 'EMPTY') {

    return {...state, showModal: true, modalContent: 'All fields are required'};

  }
  if(action.type === 'CLOSE_MODAL') {

    return {...state, showModal: false};

  }
  if(action.type === 'CLEAR_ALL') {

    return {...state, cards: []};

  }
  if(action.type === 'DELETE_ONE') {

    const newCards = state.cards.filter((card) => card.id !== action.payload);
    return {...state, cards: newCards};

  }

  throw new Error('no matchin type');
}