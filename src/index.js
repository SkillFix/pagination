import NewsApiService from './news-service';
import LoadMoreBtn from './load-more-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  articlesContainer: document.querySelector('.articles__container'),
  loadMore: document.querySelector('[data-action=load-more]'),
};

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action=load-more]',
  hidden: true,
});

loadMoreBtn.enable();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Введите запрос для поиска');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  refs.articlesContainer.innerHTML = '';
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    renderMarkup(articles);
    loadMoreBtn.enable();
  });
}

function renderMarkup(articles) {
  const markup = articles
    .map(e => {
      return `<li>
           <a href="${e.url}" >
              <article>
                <img src="${e.urlToImage}" alt="" width="480" class='img-articles'/>
                <h2>${e.title}</h2>
                <p>Posted By: ${e.author}</p>
                <p>${e.description}</p>
              </article>
            </a>
          </li>`;
    })
    .join('');
  refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
}
