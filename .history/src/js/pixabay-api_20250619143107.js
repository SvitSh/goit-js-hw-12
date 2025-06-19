'use strict';

import axios from 'axios';
const myKey = '49810610-79c0179868d457ece08d99a45';

export async function getImagesByQuery({ query, page, PER_PAGE }) {
  //console.log("query",PER_PAGE );
  let response = await axios('https://pixabay.com/api/', {
    params: {
      key: myKey,
      q: query,
      per_page: PER_PAGE,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response.data;
}
