import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/heroFiltersSlice';
import { configureStore } from '@reduxjs/toolkit';

const stringMiddlewere = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { heroes, filters },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddlewere),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
