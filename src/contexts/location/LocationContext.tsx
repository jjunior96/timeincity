import { FC, createContext, useContext, useReducer } from 'react';

import { LocationState, LocationDispatch } from './locationTypes';
import locationReducer from './locationReducer';

const LocationContext = createContext<[LocationState, LocationDispatch]>([
  {},
  (action) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
] as [LocationState, LocationDispatch]);

export const LocationContextProvider: FC = ({ children }) => {
  const [contextState, dispatch] = useReducer(locationReducer, {
    position: {
      latitude: null,
      longitude: null,
    },
  });

  return (
    <LocationContext.Provider value={[contextState, dispatch]}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation(): [LocationState, LocationDispatch] {
  const locationContext = useContext(LocationContext);

  return locationContext;
}
