const gsheetID = '1ih7uMSaOMxyPtBFYPS5eOzs0duxuqar3dREVZ8paUf0';
const gsheetReviews = `https://spreadsheets.google.com/feeds/list/${gsheetID}/3/public/values?alt=json`;
const agentReviews = document.getElementById('agentReviews');
const agent = 'Chris Duffy';

const fetchReviews = async () => {
  // fetching json data from source
  const resp = await fetch(gsheetReviews);
  // conditional check, and throwing error if fetch is not successful
  if (resp.status !== 200) {
    // throwing an error if fetch failed
    throw new Error('Could not fetch reviews.');
  }
  // if fetch is successful, return fetched data
  const reviews = await resp.json();
  return reviews;
};

const processReviews = (arr) => {
  const reviews = arr.feed.entry;
  console.log(reviews);

  // itirating on fetched array of data
  reviews.forEach((review) => {
    agentReviews.innerHTML += '';

    const rating = parseInt(review.gsx$stars.$t);

    // conditional check to show reviews to specific agent
    if (review.gsx$reviewedagent.$t === agent) {
      let html = `
      <p>
          ${review.gsx$name.$t}
          <a
          href="${review.gsx$namelink.$t}"
          target="_blank"
          >${review.gsx$source.$t}</a
          ><br />
          <span style="color: orange">★★★★★</span><br />
          ${review.gsx$review.$t}
      </p>
      `;

      agentReviews.innerHTML += html;
    }
  });
};

// calling the function to fetch data
// .then calling a function to process fetched data
fetchReviews()
  .then((reviews) => processReviews(reviews))
  .catch((err) => console.log(err));

const stars = `<span style="color: orange">${starsCount}</span>`;
for (let i = 0; i < 5; i++) {}
