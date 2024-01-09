async function handleSearch(event) {
  event.preventDefault();
  const searchTerm = document.getElementById('search-input').value.trim();

  if (!searchTerm) {
    alert('Please enter a search term.');
    return;
  }

  const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=52`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    document.getElementById('results').innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function displayResults(data) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = data.results.length > 0
    ? data.results.map(song => createSongItem(song)).join('')
    : '<p>No results found. Please try a different search term.</p>';
}

function createSongItem(song) {
  return `
  <div class="song-item cursor-pointer p-4 bg-white rounded shadow-lg hover:shadow-xl transition-shadow" onclick="playSong('${song.previewUrl}')">
  <img src="${song.artworkUrl100}" alt="${song.collectionName}" class="album-art w-full h-64 object-cover rounded">
  <div class="song-title text-lg font-semibold mt-3">${song.trackName}</div>
  <div class="band-name text-gray-600">${song.artistName}</div>
</div>
  `;
}

window.playSong = function(previewUrl) {
  const audioPlayer = document.getElementById('audio-player');
  audioPlayer.src = previewUrl;
  audioPlayer.play();
  audioPlayer.hidden = false;

  // document.getElementById('now-playing').textContent = `Now Playing: ${song.artistName} - ${song.trackName}`;
}

document.getElementById('search-form').addEventListener('submit', handleSearch);
