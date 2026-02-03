const form = document.querySelector("#login-form");
const status = document.querySelector("#status");
const button = form.querySelector("button");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const handle = form.handle.value.trim() || "vx-ops";
  status.textContent = "Status: authenticating...";
  button.disabled = true;

  setTimeout(() => {
    status.textContent = `Status: access granted for ${handle}`;
    button.disabled = false;
  }, 900);
});
