
import { useState } from 'react';
import { CalculateWinner } from '../utils/calculateWinner'
import { FieldLayout } from './FieldLayout';
import { store } from '../store';
import { initialState } from '../reducer';

export const Field = () => {

	const [xIsNext, setXIsNext] = useState(true);

	const fieldItems = store.getState();


	function handleClick(i) {
		if (fieldItems[i] || CalculateWinner(fieldItems)) {
			return;
		}
		const newFieldItems = fieldItems.slice();
		if (xIsNext) {
			newFieldItems[i] = 'X';
		  } else {
			newFieldItems[i] = 'O';
		  }
		  store.dispatch({type: 'SET_FIELDITEMS', payload: newFieldItems });
		  setXIsNext(!xIsNext);
	  };


	  const winner = CalculateWinner(fieldItems);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!winner&&!(fieldItems.includes(null))){
	status = "Winner: Nobody";
  } else if (!winner&&fieldItems.includes(null)){
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  const restartClick = () => {
	setXIsNext(true);
	store.dispatch({type: 'SET_FIELDITEMS', payload: initialState });
  }


return <FieldLayout
handleClick={handleClick}
status={status}
restartClick={restartClick}/>

}
