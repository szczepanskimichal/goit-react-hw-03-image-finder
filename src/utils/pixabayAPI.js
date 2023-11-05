import Axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '22693997-3b9d2e9e1f2e2e8a2b9e2e2e8';
const API_URL = 'https://pixabay.com/api/';
export const LIMIT = 40;

const createSearchParams = (searchQuery, currentPage) =>
  new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: LIMIT,
  });

export const fetchPhotos = async (searchQuery, currentPage) => {
  try {
    const response = await Axios.get(
      API_URL + createSearchParams(searchQuery, currentPage)
    );

    if (response.data.hits.length === 0) throw new Error();

    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};
