let records = JSON.parse(localStorage.getItem("records")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// İlk yükleme
if (records.length === 0) {
    fetch("data/records.json")
        .then(res => res.json())
        .then(data => {
            records = data;
            saveRecords();
            displayRecords(records);
        });
} else {
    displayRecords(records);
}

function saveRecords() {
    localStorage.setItem("records", JSON.stringify(records));
}

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function displayRecords(data) {
    const list = document.getElementById("record-list");
    list.innerHTML = "";

    data.forEach((record, index) => {
        const isFav = favorites.includes(index);

        const div = document.createElement("div");
        div.className = "record";

        div.innerHTML = `
            <img src="${record.image}">
            <h3>${record.artist}</h3>
            <p>${record.album}</p>
            <small>${record.year}</small>

            <button onclick="toggleFavorite(${index})">
                ${isFav ? "❤️" : "🤍"}
            </button>

            <button onclick="deleteRecord(${index})">🗑️</button>
        `;

        list.appendChild(div);
    });
}

// 🔍 SEARCH
document.getElementById("search").addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = records.filter(r =>
        r.artist.toLowerCase().includes(value) ||
        r.album.toLowerCase().includes(value)
    );

    displayRecords(filtered);
});

// ➕ ADD
document.getElementById("record-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const newRecord = {
        artist: artist.value,
        album: album.value,
        year: year.value,
        image: image.value || "https://via.placeholder.com/200"
    };

    records.push(newRecord);
    saveRecords();
    displayRecords(records);

    this.reset();
});

// ⭐ FAVORITE
function toggleFavorite(index) {
    if (favorites.includes(index)) {
        favorites = favorites.filter(f => f !== index);
    } else {
        favorites.push(index);
    }

    saveFavorites();
    displayRecords(records);
}

// 🗑️ DELETE
function deleteRecord(index) {
    records.splice(index, 1);
    saveRecords();

    favorites = favorites.filter(f => f !== index);
    saveFavorites();

    displayRecords(records);
}
