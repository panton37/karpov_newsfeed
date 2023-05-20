import { MainArticle } from './MainArticle.js';
import { SmallArticle } from './SmallArticle.js';

export const Articles = ({ articles }) => {
  return (
    <section className='articles'>
      <div className='container grid'>
        <section className='articles__big-column'>
          {articles.items.slice(0, 3).map((item) => {
            return (
              <MainArticle
                key={item.title}
                image={item.image}
                title={item.title}
                description={item.description}
                category={
                  articles.categories.find(({ id }) => item.category_id === id)
                    .name
                }
                source={
                  articles.sources.find(({ id }) => item.source_id === id).name
                }
              />
            );
          })}
        </section>
        <section className='articles__small-column'>
          {articles.items.slice(3, 12).map((item) => {
            return (
              <SmallArticle
                key={item.title}
                title={item.title}
                source={
                  articles.sources.find(({ id }) => item.source_id === id).name
                }
                date={new Date(item.date).toLocaleDateString('ru-RU', {
                  month: 'long',
                  day: 'numeric',
                })}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
