fetch("data/records.json")
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById("record-list");

        data.forEach(record => {
            const div = document.createElement("div");
            div.className = "record";

            div.innerHTML = `
                <img src="${record.image}" alt="">
                <h3>${record.artist}</h3>
                <p>${record.album}</p>
                <small>${record.year}</small>
            `;

            list.appendChild(div);
        });
    });
let records = [];

fetch("data/records.json")
    .then(response => response.json())
    .then(data => {
        records = data;
        displayRecords(records);
    });

function displayRecords(data) {
    const list = document.getElementById("record-list");
    list.innerHTML = "";

    data.forEach(record => {
        const div = document.createElement("div");
        div.className = "record";

        div.innerHTML = `
            <img src="${record.image}" alt="">
            <h3>${record.artist}</h3>
            <p>${record.album}</p>
            <small>${record.year}</small>
        `;

        list.appendChild(div);
    });
}

// 🔍 SEARCH
document.getElementById("search").addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = records.filter(record =>
        record.artist.toLowerCase().includes(value) ||
        record.album.toLowerCase().includes(value)
    );

    displayRecords(filtered);
});

// ➕ ADD RECORD
document.getElementById("record-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const newRecord = {
        artist: document.getElementById("artist").value,
        album: document.getElementById("album").value,
        year: document.getElementById("year").value,
        image: document.getElementById("image").value || "https://via.placeholder.com/200"
    };

    records.push(newRecord);
    displayRecords(records);

    this.reset();
});
