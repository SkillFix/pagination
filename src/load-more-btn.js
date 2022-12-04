export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }
  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    return refs;
  }
  hide() {
    this.refs.button.classList.add('is-hidden');
  }
  show() {
    this.refs.button.classList.remove('is-hidden');
  }
  disable() {
    this.refs.label.textContent = 'Загружаем...';
    this.refs.button.disabled = true;
  }
  enable() {
    this.refs.label.textContent = 'Показать еще';
    this.refs.button.disabled = false;
  }
}
