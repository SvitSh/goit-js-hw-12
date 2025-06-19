import axios from 'axios';

const API_KEY = '50595861-e3300a20d14d5dbbfabcd1d5e';

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Помилка при запиті:', error);
    throw error;
  }
}
