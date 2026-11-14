
document.addEventListener("DOMContentLoaded", () => {

    const verifyForm = document.getElementById("verifyForm");
    const otpInput = document.getElementById("otpCode");
    const message = document.getElementById("verifyMessage");
    const verifyBtn = document.getElementById("verifyBtn");
    const resendBtn = document.getElementById("resendBtn");

    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    if (!email) {
        message.textContent = "Email address not found. Please register again.";
        verifyBtn.disabled = true;
        resendBtn.disabled = true;
        return;
    }

    // Verify OTP
    verifyForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const token = otpInput.value.trim();

        if (!/^\d{6}$/.test(token)) {
            message.textContent = "Please enter a valid 6-digit code.";
            return;
        }

        verifyBtn.disabled = true;
        verifyBtn.textContent = "Verifying...";

        try {

            const { data, error } = await window.db.auth.verifyOtp({
                email: email,
                token: token,
                type: "signup"
            });

            if (error) throw error;

            message.textContent = "Email verified successfully!";

            alert("Email verification successful!");

            window.location.href = "member-dashboard.html";

        } catch (error) {

            message.textContent = "Verification failed: " + error.message;

        } finally {

            verifyBtn.disabled = false;
            verifyBtn.textContent = "Verify Email";

        }

    });


    // Resend OTP
    resendBtn.addEventListener("click", async () => {

        resendBtn.disabled = true;
        resendBtn.textContent = "Sending...";

        try {

            const { error } = await window.db.auth.resend({
                type: "signup",
                email: email
            });

            if (error) throw error;

            message.textContent = "A new verification code has been sent.";

        } catch (error) {

            message.textContent = "Failed to resend: " + error.message;

        } finally {

            resendBtn.disabled = false;
            resendBtn.textContent = "Resend Code";

        }

    });

});
