document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const result = document.getElementById('result');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const skinAnalysisSection = document.getElementById('skin-analysis');

    // Simulated user authentication
    function loginUser() {
        loginModal.style.display = "none";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
        skinAnalysisSection.style.display = "block";
    }

    loginBtn.addEventListener("click", () => loginModal.style.display = "block");
    logoutBtn.addEventListener("click", () => {
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
        skinAnalysisSection.style.display = "none";
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        loginUser();
    });

    async function setupCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.onloadedmetadata = () => video.play();
            })
            .catch(err => console.error("Camera access denied", err));
    }

    analyzeBtn.addEventListener("click", () => {
        result.innerText = "Analyzing skin... Please wait.";

        const ctx = canvas.getContext('2d');
        canvas.width = 224;
        canvas.height = 224;
        ctx.drawImage(video, 0, 0, 224, 224);

        // Check if face is detected
        let hasFace = Math.random() > 0.2;  // Simulating face detection (80% success rate)

        if (!hasFace) {
            result.innerText = "No face detected.";
            return;
        }

        // Simulating skin issue detection
        const issues = ["Acne", "Dryness", "Redness", "Pigmentation", "Dark Spots", "Dark Circles"];
        const randomIssue = issues[Math.floor(Math.random() * issues.length)];

        const products = {
            "Acne": "Tea Tree Face Wash",
            "Dryness": "Hydrating Moisturizer",
            "Redness": "Soothing Aloe Vera Gel",
            "Pigmentation": "Vitamin C Serum",
            "Dark Spots": "Spot Reduction Cream",
            "Dark Circles": "Under Eye Gel"
        };

        setTimeout(() => {
            result.innerText = `Detected Skin Issue: ${randomIssue}\nRecommended Product: ${products[randomIssue]}`;
        }, 2000);
    });

    setupCamera();
});