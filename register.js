document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    localStorage.setItem("name", name);
    window.location.href = "index.html";
});