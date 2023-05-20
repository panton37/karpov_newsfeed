import { categoryNames } from './utils.js';

export const Navigation = ({
  onNavClick,
  currentCategory,
  className = '',
  placement = '',
}) => {
  return (
    <nav className={`grid navigation ${className} navigation--${placement}`}>
      <a className='navigation__logo' data-href='index' href='#'>
        <img
          className='navigation__logo-image'
          src='./images/logo.svg'
          alt='Логотип'
        />
      </a>
      <ul className='navigation__list'>
        {['index', 'fashion', 'technologies', 'sport', 'karpov'].map((item) => {
          return (
            <li className='navigation__item' key={item}>
              <a
                onClick={onNavClick}
                className={`navigation__link ${
                  currentCategory === item ? 'navigation__link--active' : ''
                }`}
                data-href={item}
                href={`./${item}.html`}
              >
                {categoryNames[item]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
