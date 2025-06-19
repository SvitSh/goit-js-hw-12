'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const container = document.querySelector('.gallery');
// приймає масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
const load = document.querySelector('span');
const loadMore = document.querySelector('.load_more');

const galleryLightBox = new SimpleLightbox('.gallery li a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  let markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
  <a class="item-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    <ul class="statistic-list">
      <li class="statistic-item">
        <p class="statistic-text">Likes</p>
        <p class="statistic-value">${likes}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-text">Views</p>
        <p class="statistic-value">${views}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-text">Comments</p>
        <p class="statistic-value">${comments}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-text">Downloads</p>
        <p class="statistic-value">${downloads}</p>
      </li>
    </ul></a
  >
</li>`
    )
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
  galleryLightBox.refresh();
}

// нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
export function clearGallery() {
  container.innerHTML = '';
}
// повинна додавати клас для відображення лоадера. Нічого не повертає.
export function showLoader() {
  load.classList.add('loader');
}
//нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
export function hideLoader() {
  load.classList.remove('loader');
}

export function statusBtnLoadMore({ page, totalHits, PER_PAGE }) {
  let totalPage = Math.ceil(totalHits / PER_PAGE);
  if (totalPage > page) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    message(
      "We're sorry, but you've reached the end of search results.",
      'green'
    );
  }
}
// функція нічого не приймає, повинна додавати клас для відображення кнопки Load more. Нічого не повертає.
export function showLoadMoreButton() {
  loadMore.classList.remove('hidden');
}
//функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more. Нічого не повертає.
export function hideLoadMoreButton() {
  loadMore.classList.add('hidden');
}

export function message(msg, color) {
  iziToast.show({
    message: msg,
    messageColor: 'white', // blue, red,
    backgroundColor: color,
    position: 'topRight',
    iconUrl: './error_outline.svg',
    iconColor: 'white',
  });
}
