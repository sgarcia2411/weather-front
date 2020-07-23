// appointment.js
import * as cities from '../city.list.json';

export const CREATE_CITIES = 'CREATE_CITIES';

export function createCities(object){
  return {
    type: CREATE_CITIES,
    object
  };
}

const initialState = {
  cities: cities
};

export default function reducer(state = initialState, action){
    switch (action.type){
    case CREATE_CITIES:
      return Object.assign(
        {},
        state,
        {
            cities: action.object
        }
      );
    default:
      return state;
    }
}