import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroCreated } from '../../components/heroesList/heroesSlice';

const HeroesAddForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [element, setElement] = useState('');

  const { filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  const addNewListItem = (e) => {
    e.preventDefault();

    if (name !== '' && description !== '' && element !== '') {
      const hero = { id: uuidv4(), name, description, element };
      const body = JSON.stringify(hero);
      request('http://localhost:3001/heroes', 'POST', body)
        .then((data) => console.log(data, 'send success'))
        .then(dispatch(heroCreated(hero)))
        .catch((error) => console.log(error));

      setName('');
      setDescription('');
      setElement('');
    }
  };

  const renderFilters = (filters, status) => {
    if (status === 'loading') {
      return <option>Загрузка елементів</option>;
    } else if (status === 'error') {
      return <option>Помилка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line
        if (name === 'all') return;
        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Ім`я нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Як мене звати?"
          value={name}
          onInput={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Деталі
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Що я вмію?"
          style={{ height: '130px' }}
          value={description}
          onInput={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Вибрати елемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={element}
          onInput={(e) => setElement(e.target.value)}
        >
          <option>Я володію елементом...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => addNewListItem(e)}
      >
        Добавити
      </button>
    </form>
  );
};

export default HeroesAddForm;
