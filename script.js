(function () {
    // Ensure the config object is available
    if (!window.loaderConfig) {
        console.error('Loader configuration is not loaded.');
        return;
    }

    // Create and inject styles for the loader
    const loaderStyle = document.createElement('style');
    loaderStyle.innerHTML = `
        :root {
            --loader-bg: rgba(0, 0, 0, 0.5);
            --spinner-border: rgba(255, 255, 255, 0.3);
            --spinner-border-top: #00bfff;
            --message-color: #fff;
            --percentage-color: #fff;
            --box-shadow: rgba(0, 0, 0, 0.5);
            --bar-bg: rgba(255, 255, 255, 0.3);
            --bar-fill: #00bfff;
            --close-btn-bg: rgba(0, 0, 0, 0.5);
            --close-btn-color: #fff;
            --btn-hover-bg: rgba(0, 0, 0, 0.7);
        }
        
        .light-mode {
            --loader-bg: rgba(255, 255, 255, 0.9);
            --spinner-border: rgba(0, 0, 0, 0.3);
            --spinner-border-top: #00bfff;
            --message-color: #000;
            --percentage-color: #000;
            --box-shadow: rgba(0, 0, 0, 0.1);
            --bar-bg: rgba(0, 0, 0, 0.3);
            --bar-fill: #00bfff;
            --close-btn-bg: rgba(0, 0, 0, 0.3);
            --close-btn-color: #000;
            --btn-hover-bg: rgba(0, 0, 0, 0.5);
        }

        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--loader-bg);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            display: none;
            backdrop-filter: blur(10px);
        }
        .loading-spinner {
            border: 8px solid var(--spinner-border);
            border-top: 8px solid var(--spinner-border-top);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            animation: spin 1.5s linear infinite;
            box-shadow: 0 0 25px var(--box-shadow);
            margin-bottom: 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .loading-message {
            font-family: 'Roboto', Arial, sans-serif;
            font-size: 24px;
            color: var(--message-color);
            margin-bottom: 10px;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            text-align: center;
        }
        .loading-percentage {
            font-family: 'Roboto', Arial, sans-serif;
            font-size: 20px;
            color: var(--percentage-color);
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        .progress-bar {
            width: 80%;
            max-width: 400px;
            height: 10px;
            background: var(--bar-bg);
            border-radius: 5px;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        .progress-bar-fill {
            height: 100%;
            width: 0%;
            background: var(--bar-fill);
            border-radius: 5px;
            transition: width 0.5s ease;
        }
        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--close-btn-bg);
            color: var(--close-btn-color);
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background 0.3s, transform 0.3s;
            z-index: 2;
        }
        .close-btn:hover {
            background: var(--btn-hover-bg);
            transform: scale(1.1);
        }
        .loading-overlay.hidden {
            display: none;
        }
        .loading-overlay.active {
            display: flex;
        }
        .loading-image {
            width: 100px;
            height: auto;
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(loaderStyle);

    // Create and inject the loader overlay into the body
    const loaderOverlay = document.createElement('div');
    loaderOverlay.className = 'loading-overlay';
    loaderOverlay.innerHTML = `
        <button class="close-btn" aria-label="Close">&times;</button>
        <img src="${window.loaderConfig.imagePath}" alt="Logo" class="loading-image"/>
        <div class="loading-spinner"></div>
        <div class="loading-message">Please wait...</div>
        <div class="loading-percentage">0%</div>
        <div class="progress-bar">
            <div class="progress-bar-fill"></div>
        </div>
    `;
    document.body.appendChild(loaderOverlay);

    // Play background sound
    const audio = new Audio(window.loaderConfig.audioPath);
    audio.loop = true;

    // Function to show the loader with progress
    function showLoader() {
        loaderOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scroll
        audio.play();
        updateProgress(0); // Start from 0%
    }

    // Function to hide the loader
    function hideLoader() {
        loaderOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Enable page scroll
        audio.pause();
        audio.currentTime = 0; // Reset audio
    }

    // Function to update the progress percentage
    function updateProgress(percentage) {
        const percentageElement = loaderOverlay.querySelector('.loading-percentage');
        const progressBarFill = loaderOverlay.querySelector('.progress-bar-fill');
        percentageElement.textContent = `${percentage}%`;
        progressBarFill.style.width = `${percentage}%`;
    }

    // Simulate loading progress (for demonstration purposes)
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
            clearInterval(progressInterval);
            hideLoader();
        } else {
            updateProgress(progress);
        }
    }, 500);

    // Function to handle link clicks
    function handleLinkClick(event) {
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
    }

    // Attach the click event handler to the document
    document.addEventListener('click', handleLinkClick);

    // Hide the loader when the page has fully loaded
    window.addEventListener('load', hideLoader);

    // Optional: Toggle light mode class based on user preference
    function toggleLightMode(enable) {
        if (enable) {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
    }

    // Example usage: Toggle light mode based on user preference
    toggleLightMode(window.loaderConfig.lightMode);

    // Close button functionality
    loaderOverlay.querySelector('.close-btn').addEventListener('click', hideLoader);

    // Hide loader if loading takes too long (e.g., 30 seconds)
    const timeout = setTimeout(() => {
        hideLoader();
        alert('Loading took too long. Please try again.');
    }, 30000);
})();
