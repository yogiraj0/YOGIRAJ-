const listings = [
  { name: 'Green Nest Hostel', type: 'hostel', area: 'College Road', price: 6500, rating: 4.8, details: 'Wi-Fi, laundry, CCTV, furnished rooms', verified: true },
  { name: 'City Boys PG', type: 'hostel', area: 'Station Area', price: 4200, rating: 4.3, details: 'Shared rooms, water purifier, near bus stop', verified: true },
  { name: 'Annapurna Mess', type: 'mess', area: 'Market Chowk', price: 2800, rating: 4.6, details: 'Veg thali, weekly menu, tiffin available', verified: true },
  { name: 'Healthy Bite Mess', type: 'mess', area: 'University Gate', price: 3500, rating: 4.2, details: 'Breakfast and dinner, monthly plans', verified: true },
  { name: 'Focus Point Library', type: 'library', area: 'Civil Lines', price: 1200, rating: 4.9, details: '6 AM - 11 PM, AC, silent cabins', verified: true },
  { name: 'Scholar Study Hub', type: 'library', area: 'New Colony', price: 900, rating: 4.5, details: 'Daily passes, lockers, high-speed internet', verified: true }
];

let reviews = [
  { name: 'Priya', service: 'Focus Point Library', rating: 5, text: 'Clean, quiet, and open till late. Registration was easy.' },
  { name: 'Rohan', service: 'Annapurna Mess', rating: 4, text: 'Affordable food and weekly menu helps with planning.' }
];

const listingGrid = document.querySelector('#listingGrid');
const reviewsContainer = document.querySelector('#reviews');

function budgetBand(price) {
  if (price < 3000) return 'low';
  if (price <= 7000) return 'mid';
  return 'high';
}

function renderListings() {
  const search = document.querySelector('#searchInput').value.toLowerCase();
  const type = document.querySelector('#typeFilter').value;
  const budget = document.querySelector('#budgetFilter').value;
  const filtered = listings.filter(item => {
    const matchesSearch = `${item.name} ${item.area} ${item.details}`.toLowerCase().includes(search);
    const matchesType = type === 'all' || item.type === type;
    const matchesBudget = budget === 'all' || budgetBand(item.price) === budget;
    return matchesSearch && matchesType && matchesBudget;
  });
  listingGrid.innerHTML = filtered.map(item => `
    <article class="listing-card">
      <span class="tag">${item.verified ? '✓ Verified' : 'Pending'} ${item.type}</span>
      <h3>${item.name}</h3>
      <p class="meta">${item.area}</p>
      <p>${item.details}</p>
      <strong>₹${item.price.toLocaleString('en-IN')} / month</strong>
      <span class="rating">★ ${item.rating}</span>
    </article>
  `).join('') || '<p>No listings match your filters.</p>';
}

function renderReviews() {
  reviewsContainer.innerHTML = reviews.map(review => `
    <article class="review-card">
      <span class="rating">${'★'.repeat(Number(review.rating))}</span>
      <h3>${review.service}</h3>
      <p>“${review.text}”</p>
      <strong>- ${review.name}</strong>
    </article>
  `).join('');
}

document.querySelector('.nav-toggle').addEventListener('click', event => {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open'));
});

['searchInput', 'typeFilter', 'budgetFilter'].forEach(id => {
  document.querySelector(`#${id}`).addEventListener('input', renderListings);
});

document.querySelector('#auth').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#authMessage').textContent = 'Welcome! You can now browse verified student services.';
});

document.querySelector('#reviewForm').addEventListener('submit', event => {
  event.preventDefault();
  reviews = [{
    name: document.querySelector('#reviewName').value,
    service: document.querySelector('#reviewService').value,
    rating: document.querySelector('#reviewRating').value,
    text: document.querySelector('#reviewText').value
  }, ...reviews];
  event.target.reset();
  renderReviews();
});

document.querySelector('#providerForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#providerName').value;
  const type = document.querySelector('#providerType').value;
  const area = document.querySelector('#providerArea').value;
  document.querySelector('#providerMessage').textContent = `${name} (${type}, ${area}) has been sent for admin verification.`;
  event.target.reset();
});

renderListings();
renderReviews();
