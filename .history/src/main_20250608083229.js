import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', event => {
  event.preventDefault();
  query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      title: 'warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  showLoader();
  loadMoreBtn.classList.add('is-hidden');

  getImagesByQuery(query, page, perPage)
    .then(data => {
      const { hits, totalHits: total } = data;
      totalHits = total;

      createGallery(hits);

      if (totalHits > perPage) {
        loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message:
          error.message || 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
});

loadMoreBtn.addEventListener('click', () => {
  page += 1;
  showLoader();

  getImagesByQuery(query, page, perPage)
    .then(data => {
      createGallery(data.hits);

      const maxPage = Math.ceil(totalHits / perPage);
      if (page >= maxPage) {
        loadMoreBtn.classList.add('is-hidden');
        iziToast.info({
          title: 'Info',
          message: "You've reached the end of search results.",
          position: 'topRight',
        });
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Failed to load more images.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
