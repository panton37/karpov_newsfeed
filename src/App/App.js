import React from 'react';

import { categoryIds } from '../utils.js';
import { Navigation } from '../Navigation/Navigation.js';
import { Articles } from '../Articles/Articles.js';

import './App.css';

export const App = () => {
  const [category, setCategory] = React.useState('index');
  const [articles, setArticles] = React.useState({
    items: [],
    categories: [],
    sources: [],
  });

  const onNavClick = (e) => {
    e.preventDefault();
    setCategory(e.currentTarget.dataset.href);
  };

  React.useEffect(() => {
    fetch(
      'https://frontend.karpovcourses.net/api/v2/ru/news/' +
        categoryIds[category] || ''
    )
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, [category]);

  return (
    <>
      <header className='header'>
        <div className='container'>
          <Navigation
            className='header__navigation'
            placement='header'
            onNavClick={onNavClick}
            currentCategory={category}
          />
        </div>
      </header>
      <main>
        <Articles articles={articles} />
      </main>
      <footer className='footer'>
        <div className='container'>
          <Navigation
            className='footer__navigation'
            placement='footer'
            onNavClick={onNavClick}
            currentCategory={category}
          />
          <div className='footer__bottom'>
            <p className='footer__text'>
              Сделано на Frontend курсе в
              <a
                className='footer__link'
                href='https://karpov.courses/frontend'
                target='_blank'
              >
                Karpov.Courses
              </a>
            </p>
            <p className='footer__text footer__text--gray'>© 2023</p>
          </div>
        </div>
      </footer>
    </>
  );
};
