const form = document.getElementById("profile-form");

// Load saved data
window.onload = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (profile) {
        document.getElementById("username").value = profile.username || "";
        document.getElementById("avatar").value = profile.avatar || "";
        document.getElementById("theme").value = profile.theme || "dark";
    }
};

// Save data
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const profile = {
        username: document.getElementById("username").value,
        avatar: document.getElementById("avatar").value,
        theme: document.getElementById("theme").value
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    alert("Profile saved!");
});
