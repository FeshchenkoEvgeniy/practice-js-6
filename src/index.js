import axios from "axios";
import Notiflix from 'notiflix';

const formSearch = document.querySelector("#search-form");
const renderGallery = document.querySelector('.gallery')
formSearch.addEventListener('submit', searchPhotoOnSumbit);

const KEY = '32995191-b21c3f9cffc59aabb19c49243';
const BASE_API = 'https://pixabay.com/api'

async function searchPhotoOnSumbit(evt) {
    evt.preventDefault();
    const { elements: { searchQuery } } = evt.currentTarget
    const querySearch = searchQuery.value
    try {
        const response = await axios.get(`${BASE_API}/?key=${KEY}&q=${querySearch}&image_type=photo&orientation=horizontal&safesearch=true`);
        const data = response.data
        return createMarkup(data);
      } catch (error) {
        console.log(error);
      }
}

function createMarkup(data){
    const markup = data.hits.map(date => 
    `<div class="photo-card">
    <img src="${date.webformatURL}" alt="${date.tags}" loading="lazy" width="200"/>
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
        ${date.comments }
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${date.downloads }
      </p>
    </div>
  </div>`)
    renderGallery.innerHTML = markup;
}