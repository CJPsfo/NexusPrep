const form = document.querySelector("#login-form");
const status = document.querySelector("#status");

const demoEmail = "demo@vertex.edu";
const demoPassword = "vertex-demo";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "Signing in...";

  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value.trim();

  setTimeout(() => {
    if (email === demoEmail && password === demoPassword) {
      window.location.href = "app.html";
      return;
    }

    status.textContent = "Incorrect demo credentials. Try the ones above.";
  }, 500);
});
