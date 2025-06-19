import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loading = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 150,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
        <a href="${largeImageURL}" class="gallery-link">
          <div class="thumb">
            <img src="${webformatURL}" alt="${tags}" class="gallery-img" />
          </div>
          <ul class="info-box">
            <li class="info-item">
              <span class="info-text">Likes</span>
              <span class="info-amount">${likes}</span>
            </li>
            <li class="info-item">
              <span class="info-text">Views</span>
              <span class="info-amount">${views}</span>
            </li>
            <li class="info-item">
              <span class="info-text">Comments</span>
              <span class="info-amount">${comments}</span>
            </li>
            <li class="info-item">
              <span class="info-text">Downloads</span>
              <span class="info-amount">${downloads}</span>
            </li>
          </ul>
        </a>
      </li>`;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loading.classList.remove('is-hidden');
}
export function hideLoader() {
  loading.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
