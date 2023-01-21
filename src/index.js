import axios from "axios";
import Notiflix from 'notiflix';

const formSearch = document.querySelector("#search-form");
const renderGallery = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');

btn.addEventListener('click', loadContentOnClick);
formSearch.addEventListener('submit', searchPhotoOnSumbit);

const KEY = '32995191-b21c3f9cffc59aabb19c49243';
const BASE_API = 'https://pixabay.com/api'
const PER_PAGE = 40;
let totalHits = 0;

let increment = 1;
let counter = 0;
let querySearch = '';

addClassOnBtn();

function searchPhotoOnSumbit(evt) {
    evt.preventDefault();
    const { elements: { searchQuery } } = evt.currentTarget;
    querySearch = searchQuery.value;
    increment = 1;
    counter = 0;
    addClassOnBtn();
    clearMarkup();
    fetchApi(querySearch, increment);
}

async function fetchApi(value, page) {
  try {
      const response = await axios.get(`${BASE_API}/?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`);
      const data = response.data;
      totalHits = data.totalHits;
        if (data.hits.length === 0) {
          addClassOnBtn();
          clearMarkup();
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        } else if (querySearch === '') {
          addClassOnBtn();
          clearMarkup();
          Notiflix.Notify.failure('Search cannot be empty')
    }
        else {
          Notiflix.Notify.success(`Hooray! We found ${totalHits + counter} images.`)
          removeClassOnBtn()
          createMarkup(data);
    }
        if (increment * PER_PAGE > totalHits) {
           addClassOnBtn();
           Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
      }
      } catch (error) {
          console.log(error);
  }  
}

function createMarkup(data) {
  const markup = data.hits.map(date => {
    return `<div class="photo-card">
    <img class="photo" src="${date.webformatURL}" alt="${date.tags}" loading="lazy" width="200"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${date.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${date.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${date.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${date.downloads}
      </p>
    </div>
  </div>`}).join('');
  renderGallery.innerHTML += markup;
}

function loadContentOnClick() {
  increment += 1;
  counter -= 40;
  fetchApi(querySearch, increment)
}

function clearMarkup() {
  renderGallery.innerHTML = "";
}

function addClassOnBtn() {
  btn.classList.add('is-hidden');
}

function removeClassOnBtn() {
   btn.classList.remove('is-hidden');
}