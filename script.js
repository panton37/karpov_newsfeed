const categoryNames = {
  index: 'Главная',
  fashion: 'Мода',
  technologies: 'Технологии',
  sport: 'Спорт',
  karpov: 'Карпов',
};

const categoryIds = {
  index: 0,
  fashion: 3,
  technologies: 1,
  sport: 2,
  karpov: 6,
};

const App = () => {
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
      <header class='header'>
        <div class='container'>
          <nav class='grid navigation header__navigation'>
            <a class='navigation__logo' href='/'>
              <img
                class='navigation__logo-image'
                src='./images/logo.svg'
                alt='Логотип'
              />
            </a>
            <ul className='navigation__list'>
              {['index', 'fashion', 'technologies', 'sport', 'karpov'].map(
                (item) => {
                  return (
                    <li className='navigation__item' key={item}>
                      <a
                        onClick={onNavClick}
                        className={`navigation__link ${
                          category === item ? 'navigation__link--active' : ''
                        }`}
                        data-href={item}
                        href={`./${item}.html`}
                      >
                        {categoryNames[item]}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section class='articles'>
          <div class='container grid'>
            <section class='articles__big-column'>
              {articles.items.slice(0, 3).map((item) => {
                return (
                  <article className='main-article' key={item.title}>
                    <div className='main-article__image-container'>
                      <img
                        className='article-img main-article__img'
                        src={item.image}
                        alt='Фото новости'
                      />
                    </div>
                    <div className='main-article__content'>
                      <span className='article-category'>
                        {
                          articles.categories.find(
                            ({ id }) => item.category_id === id
                          ).name
                        }
                      </span>
                      <h2 className='main-article__title'>{item.title}</h2>
                      <p className='main-article__text'>{item.description}</p>
                      <span className='article-source main-article__caption'>
                        {
                          articles.sources.find(
                            ({ id }) => item.source_id === id
                          ).name
                        }
                      </span>
                    </div>
                  </article>
                );
              })}
            </section>
            <section className='articles__small-column'>
              {articles.items.slice(3, 12).map((item) => {
                return (
                  <article className='small-article' key={item.title}>
                    <h2 className='small-article__title'>{item.title}</h2>
                    <span className='article-date'>
                      {
                        articles.sources.find(({ id }) => item.source_id === id)
                          .name
                      }
                    </span>
                    <span className='article-source'>
                      {new Date(item.date).toLocaleDateString('ru-RU', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </article>
                );
              })}
            </section>
          </div>
        </section>
      </main>

      <footer class='footer'>
        <div class='container'>
          <nav class='grid navigation footer__navigation'>
            <a class='navigation__logo' href='/'>
              <img
                class='navigation__logo-image'
                src='./images/logo.svg'
                alt='Логотип'
              />
            </a>
            <ul className='navigation__list'>
              {['index', 'fashion', 'technologies', 'sport', 'karpov'].map(
                (item) => {
                  return (
                    <li className='navigation__item' key={item}>
                      <a
                        onClick={onNavClick}
                        className={`navigation__link ${
                          category === item ? 'navigation__link--active' : ''
                        }`}
                        data-href={item}
                        href={`./${item}.html`}
                      >
                        {categoryNames[item]}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>

          <div class='footer__bottom'>
            <p class='footer__text'>
              Сделано на Frontend курсе в
              <a
                class='footer__link'
                href='https://karpov.courses/frontend'
                target='_blank'
              >
                Karpov.Courses
              </a>
            </p>
            <p class='footer__text footer__text--gray'>© 2023</p>
          </div>
        </div>
      </footer>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
