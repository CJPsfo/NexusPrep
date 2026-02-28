const form = document.querySelector("#admin-login-form");
const status = document.querySelector("#status");
const ADMIN_EMAIL = "admin@vertex.app";
const ADMIN_PASSWORD = "vertex-admin";

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value.trim();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(
      "vertex_demo_auth",
      JSON.stringify({
        email,
        role: "owner",
        signedInAt: Date.now(),
      })
    );
    window.location.href = "admin.html";
    return;
  }

  if (status) {
    status.textContent = "Incorrect admin demo credentials.";
  }
});
