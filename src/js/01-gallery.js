// Add imports above this line
import { galleryItems } from './gallery-items';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const pictureContainer = document.querySelector('.gallery');
const pictureMarkup = createPictureCardMarkup(galleryItems);

pictureContainer.insertAdjacentHTML('beforeend', pictureMarkup);
pictureContainer.addEventListener('click', onClick);

function createPictureCardMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`;
    })
    .join('');
}

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

function onClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = SimpleLightbox.create(
    `<img src="${event.target.dataset.source}">`
  );

  instance.show();

  window.addEventListener('keydown', onEscClose);

  function onEscClose(event) {
    if (event.code === 'Escape') {
      window.removeEventListener('keydown', onEscClose);
      instance.close();
    }
  }
}
