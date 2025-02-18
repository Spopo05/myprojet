import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './reducers';
import { loadState } from '../persistStore';

const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem('users');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    return undefined;
  }
};

// Create store function
const configureStore = () => {
  return createStore(
    userReducer,
    loadPersistedState(),
    applyMiddleware(thunk)
  );
};

const store = configureStore();

// Persistence subscription
store.subscribe(() => {
  const state = store.getState();
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('user', serializedState);
  } catch (e) {
    console.warn("State persistence failed:", e);
  }
});

export default store;