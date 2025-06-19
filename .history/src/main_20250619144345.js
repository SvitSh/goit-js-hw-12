import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalPages = 0;

form.addEventListener('submit', submitForm);
loadMoreBtn.addEventListener('click', onLoadMore);

async function submitForm(event) {
  event.preventDefault();

  query = event.currentTarget.elements['search-text'].value.trim();

  if (query === '') {
    hideLoader();
    iziToast.error({
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      maxWidth: 432,
    });
    return;
  }

  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.error({
        title: 'Oops!',
        message: 'No images found. Try another search.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / 15);

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      position: 'topRight',
      message: error.message,
      maxWidth: 432,
    });
  }
}

async function onLoadMore() {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.error({
        title: 'Oops!',
        message: 'No images found. Try another search.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    smoothScroll();

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      position: 'topRight',
      message: error.message,
      maxWidth: 432,
    });
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
