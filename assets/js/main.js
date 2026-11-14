
document.addEventListener("DOMContentLoaded", () => {
    console.log("BloodBridge Website Loaded Successfully!");

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});



/* Registration Page */

.register-container {
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    background: #f5f6fa;
}

.register-form {
    width: 100%;
    max-width: 480px;
    padding: 35px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

.register-form h1 {
    text-align: center;
    color: #c62828;
    margin-bottom: 10px;
}

.register-form p {
    text-align: center;
    color: #666;
    margin-bottom: 25px;
}

.register-form label {
    display: block;
    margin: 14px 0 7px;
    font-weight: 600;
}

.register-form input,
.register-form select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
}

.register-form .consent {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-weight: normal;
    font-size: 14px;
    margin: 20px 0;
}

.register-form .consent input {
    width: auto;
    margin-top: 3px;
}

.register-btn {
    width: 100%;
    padding: 13px;
    background: #c62828;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
}

.register-btn:hover {
    background: #a91f1f;
}

.login-text {
    margin-top: 20px;
}

.login-text a {
    color: #c62828;
    text-decoration: none;
    font-weight: bold;
}


// Login System  - Code

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const button = loginForm.querySelector("button[type='submit']");
        button.disabled = true;
        button.textContent = "Logging in...";

        try {
            const { data, error } = await db.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            alert("Login successful!");

            window.location.href = "index.html";

        } catch (error) {
            alert("Login failed: " + error.message);
        } finally {
            button.disabled = false;
            button.textContent = "Login";
        }
    });
}
