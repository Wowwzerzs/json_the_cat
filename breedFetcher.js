const request = require('request');

// API endpoint for breed search
const apiUrl = 'https://api.thecatapi.com/v1/breeds/search?q=';

// Fetch breed information based on user input
const fetchBreedInfo = (breedName) => {
  // Construct the URL
  const url = apiUrl + breedName;

  // Make the request
  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error.message);
      return;
    }

    // Check if the response is successful (status code 200)
    if (response.statusCode !== 200) {
      console.error('Error:', 'Failed to fetch data. Status Code:', response.statusCode);
      return;
    }

    // Parse the JSON response
    const data = JSON.parse(body);

    // Check if the data array is not empty
    if (data.length > 0) {
      console.log(data[0].description);
    } else {
      console.log('Breed not found.');
    }
  });
};

// Get the breed name from command-line arguments
const breedName = process.argv[2];

// Check if breedName is provided
if (breedName) {
  fetchBreedInfo(breedName);
} else {
  console.log('Please provide a breed name.');
}
