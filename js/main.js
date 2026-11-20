
document.addEventListener("DOMContentLoaded", () => {

    console.log("BloodBridge Website Loaded Successfully!");

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {

            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    // Registration System
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async event => {

            event.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value;
            const dob = document.getElementById("dob").value;
            const bloodGroup = document.getElementById("bloodGroup").value;
            const division = document.getElementById("division").value;
            const district = document.getElementById("district").value;
            const upazila = document.getElementById("upazila").value.trim();
            const publicConsent = document.getElementById("publicConsent").checked;


            // Age Validation
            if (!dob) {
                alert("Please enter your date of birth.");
                return;
            }

            const birthDate = new Date(dob + "T00:00:00");
            const today = new Date();

            let age = today.getFullYear() - birthDate.getFullYear();

            if (
                today.getMonth() < birthDate.getMonth() ||
                (
                    today.getMonth() === birthDate.getMonth() &&
                    today.getDate() < birthDate.getDate()
                )
            ) {
                age--;
            }

            if (
                Number.isNaN(birthDate.getTime()) ||
                age < 18
            ) {
                alert("Registration requires age 18 or above.");
                return;
            }


            // Disable Button
            const button = registerForm.querySelector(
                "button[type='submit']"
            );

            button.disabled = true;
            button.textContent = "Creating Account...";


            try {

                // Supabase Registration
                const { data, error } = await window.db.auth.signUp({

                    email,
                    password,

                    options: {

                        emailRedirectTo:
                            "https://bds-gules.vercel.app/member-dashboard.html",

                        data: {
                            full_name: fullName,
                            phone: phone,
                            date_of_birth: dob,
                            blood_group: bloodGroup,
                            division: division,
                            district: district,
                            upazila: upazila,
                            public_consent: publicConsent
                        }

                    }

                });

                if (error) throw error;

                alert(
                    "Registration successful! Please check your email and click the Confirm Email link."
                );

                window.location.href = "login.html";

            } catch (error) {

                console.error("Registration Error:", error);

                alert(
                    "Registration failed: " + error.message
                );

            } finally {

                button.disabled = false;
                button.textContent = "Create Account";

            }

        });

    }


    // Login System
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async event => {

            event.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;

            const button = loginForm.querySelector(
                "button[type='submit']"
            );

            button.disabled = true;
            button.textContent = "Logging in...";


            try {

                // Supabase Login
                const { data, error } =
                    await window.db.auth.signInWithPassword({

                        email,
                        password

                    });

                if (error) throw error;

                alert("Login successful!");

                window.location.href = "member-dashboard.html";

            } catch (error) {

                console.error("Login Error:", error);

                alert(
                    "Login failed: " + error.message
                );

            } finally {

                button.disabled = false;
                button.textContent = "Login";

            }

        });

    }


    // Division → District Dropdown
    const divisionSelect = document.getElementById("division");
    const districtSelect = document.getElementById("district");

    if (divisionSelect && districtSelect) {

        const districts = {

            Dhaka: [
                "Dhaka", "Faridpur", "Gazipur", "Gopalganj",
                "Kishoreganj", "Madaripur", "Manikganj",
                "Munshiganj", "Narayanganj", "Narsingdi",
                "Rajbari", "Shariatpur", "Tangail"
            ],

            Chattogram: [
                "Bandarban", "Brahmanbaria", "Chandpur",
                "Chattogram", "Cox's Bazar", "Cumilla",
                "Feni", "Khagrachhari", "Lakshmipur",
                "Noakhali", "Rangamati"
            ],

            Rajshahi: [
                "Bogura", "Joypurhat", "Naogaon", "Natore",
                "Chapainawabganj", "Pabna", "Rajshahi",
                "Sirajganj"
            ],

            Khulna: [
                "Bagerhat", "Chuadanga", "Jashore",
                "Jhenaidah", "Khulna", "Kushtia",
                "Magura", "Meherpur", "Narail", "Satkhira"
            ],

            Barishal: [
                "Barguna", "Barishal", "Bhola",
                "Jhalokathi", "Patuakhali", "Pirojpur"
            ],

            Sylhet: [
                "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"
            ],

            Rangpur: [
                "Dinajpur", "Gaibandha", "Kurigram",
                "Lalmonirhat", "Nilphamari", "Panchagarh",
                "Rangpur", "Thakurgaon"
            ],

            Mymensingh: [
                "Jamalpur", "Mymensingh", "Netrokona", "Sherpur"
            ]

        };


        divisionSelect.addEventListener("change", function () {

            const selectedDivision = this.value;

            districtSelect.innerHTML =
                '<option value="">Select District</option>';

            districtSelect.disabled = true;

            if (!selectedDivision) return;

            const selectedDistricts = districts[selectedDivision];

            if (!selectedDistricts) return;

            selectedDistricts.forEach(district => {

                const option = document.createElement("option");

                option.value = district;
                option.textContent = district;

                districtSelect.appendChild(option);

            });

            districtSelect.disabled = false;

        });

    }

});
