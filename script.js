(function () {
    // Create and inject styles for the loader
    const loaderStyle = document.createElement('style');
    loaderStyle.innerHTML = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            display: none;
            backdrop-filter: blur(8px);
        }
        .loading-spinner {
            border: 8px solid rgba(255, 255, 255, 0.2);
            border-top: 8px solid #00bfff;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spin 1.5s linear infinite;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .loading-message {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 20px;
            color: #fff;
            margin-top: 20px;
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
        .loading-overlay.hidden {
            display: none;
        }
        .loading-overlay.active {
            display: flex;
        }
    `;
    document.head.appendChild(loaderStyle);

    // Create and inject the loader overlay into the body
    const loaderOverlay = document.createElement('div');
    loaderOverlay.className = 'loading-overlay';
    loaderOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-message">Please wait...</div>
    `;
    document.body.appendChild(loaderOverlay);

    // Function to show the loader
    function showLoader() {
        loaderOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scroll
    }

    // Function to hide the loader
    function hideLoader() {
        loaderOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Enable page scroll
    }

    // Function to handle clicks on the overlay to hide loader
    loaderOverlay.addEventListener('click', function (event) {
        if (event.target === loaderOverlay) {
            hideLoader();
        }
    });

    // Event listener for link clicks
    document.addEventListener('click', function (event) {
        const target = event.target.closest('a');
        if (target) {
            event.preventDefault();

            const href = target.getAttribute('href');
            const isExternalLink = href.startsWith('http') && !href.includes(window.location.hostname);

            if (isExternalLink) {
                const userConfirmed = confirm('Are you sure you want to navigate to an external website?');
                if (userConfirmed) {
                    showLoader();
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                }
            } else {
                showLoader();
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        }
    });

    // Hide the loader when the page has fully loaded
    window.addEventListener('load', hideLoader);
})();
