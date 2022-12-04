const API_KEY = '74b2bcb2578b464895f11a0434bf7741';
// '0e64de205f82404ba9ad7b5c68460307',
const BASE_URL = 'https://newsapi.org/v2';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  fetchArticles() {
    const URL = `${BASE_URL}/everything?q=${this.searchQuery}&pageSize=10&page=${this.page}`;

    return fetch(URL, options)
      .then(response => response.json())
      .then(({ articles }) => {
        this.page += 1;
        return articles;
      })
      .catch(error => console.log(error));
  }
  resetPage() {
    this.page = 1;
  }
}
