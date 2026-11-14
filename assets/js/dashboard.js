
document.addEventListener("DOMContentLoaded", async () => {

    const message = document.getElementById("dashboardMessage");
    const logoutBtn = document.getElementById("logoutBtn");

    // Check Login Session
    const { data: { user }, error: authError } =
        await window.db.auth.getUser();

    if (authError || !user) {
        window.location.href = "login.html";
        return;
    }

    // Load Member Profile
    try {
        const { data: profile, error } = await window.db
            .from("profiles")
            .select(`
                full_name,
                phone,
                blood_group,
                date_of_birth,
                division,
                district,
                upazila,
                public_consent
            `)
            .eq("id", user.id)
            .single();

        if (error) throw error;

        // Display Profile Information
        document.getElementById("profileName").textContent =
            profile.full_name || "-";

        document.getElementById("profileEmail").textContent =
            user.email || "-";

        document.getElementById("profilePhone").textContent =
            profile.phone || "-";

        document.getElementById("profileBlood").textContent =
            profile.blood_group || "-";

        document.getElementById("profileDob").textContent =
            profile.date_of_birth || "-";

        document.getElementById("profileDivision").textContent =
            profile.division || "-";

        document.getElementById("profileDistrict").textContent =
            profile.district || "-";

        document.getElementById("profileUpazila").textContent =
            profile.upazila || "-";

        document.getElementById("profileConsent").textContent =
            profile.public_consent ? "Yes" : "No";

        message.textContent = "Profile loaded successfully!";

    } catch (error) {
        console.error("Profile Error:", error);
        message.textContent = "Unable to load profile: " + error.message;
    }


    // Logout System
    logoutBtn.addEventListener("click", async () => {

        logoutBtn.disabled = true;
        logoutBtn.textContent = "Logging out...";

        const { error } = await window.db.auth.signOut();

        if (error) {
            alert("Logout failed: " + error.message);
            logoutBtn.disabled = false;
            logoutBtn.textContent = "Logout";
            return;
        }

        window.location.href = "login.html";
    });

});
