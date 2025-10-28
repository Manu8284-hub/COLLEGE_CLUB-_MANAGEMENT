document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const headerContainer = document.querySelector("header .container");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const validEmail = "admin@college.com";
    const validPassword = "12345";

    if (email === validEmail && password === validPassword) {
      // ✅ Save login info to db.json (via JSON Server)
      try {
        await fetch("http://localhost:3000/logins", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            loginTime: new Date().toLocaleString()
          })
        });
        console.log("Login data saved to db.json");
      } catch (error) {
        console.error("Error saving login:", error);
      }

      // ✅ Update header immediately
      if (headerContainer) {
        headerContainer.innerHTML = `
          <h1 class="logo">College Club Management</h1>
          <div class="user-info">
            <span>Welcome, Admin</span>
            <button id="logoutBtn">Logout</button>
          </div>
        `;

        // Logout button reloads page
        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", () => {
          window.location.reload();
        });
      }

      // ✅ Redirect after alert
      alert("Login successful! Redirecting...");
      window.location.href = "index.html";

    } else {
      alert("Invalid email or password. Try again.");
    }
  });
});
