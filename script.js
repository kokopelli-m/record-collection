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
