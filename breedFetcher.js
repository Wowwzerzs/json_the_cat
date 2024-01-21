const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  const apiUrl = 'https://api.thecatapi.com/v1/breeds/search?q=';
  const url = apiUrl + breedName;

  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      return callback(new Error(`Failed to fetch data. Status Code: ${response.statusCode}`), null);
    }

    const data = JSON.parse(body);

    if (data.length > 0) {
      const description = data[0].description;
      callback(null, description);
    } else {
      callback(new Error('Breed not found.'), null);
    }
  });
};

module.exports = { fetchBreedDescription };
