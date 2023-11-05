import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '30370578-997578adb70a7e834e9536c05';
const API_URL = 'https://pixabay.com/api/?';
export const LIMIT = 40;

const createSearchParams = (querySearch, currentPage) =>
  new URLSearchParams({
    key: API_KEY,
    q: querySearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: LIMIT,
  });

export const fetchPhotos = async (querySearch, currentPage) => {
  try {
    const response = await axios.get(
      API_URL + createSearchParams(querySearch, currentPage)
    );
    if (response.data.hits.length === 0) throw new Error();
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};
