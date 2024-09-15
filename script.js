(function () {
    // Ensure the config object is available and contains required fields
    if (!window.loaderConfig || !window.loaderConfig.imagePath || !window.loaderConfig.audioPath) {
        console.error('Loader configuration is missing required fields.');
        return;
    }

    // Create and inject styles for the loader
    const loaderStyle = document.createElement('style');
    loaderStyle.innerHTML = `
        :root {
            --loader-bg: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
            --spinner-border: rgba(255, 255, 255, 0.5);
            --spinner-border-top: #00bfff;
            --message-color: #fff;
            --percentage-color: #fff;
            --box-shadow: rgba(0, 0, 0, 0.7);
            --bar-bg: rgba(255, 255, 255, 0.4);
            --bar-fill: #00bfff;
            --close-btn-bg: rgba(0, 0, 0, 0.6);
            --close-btn-color: #fff;
            --btn-hover-bg: rgba(0, 0, 0, 0.8);
            --loader-text-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
            --progress-bar-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
            --animation-duration: 0.75s;
        }
        
        .light-mode {
            --loader-bg: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
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
            --loader-text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            --progress-bar-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            --animation-duration: 0.5s;
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
            visibility: hidden;
            opacity: 0;
            transition: opacity var(--animation-duration) ease, visibility var(--animation-duration) ease;
            backdrop-filter: blur(8px);
        }
        .loading-spinner {
            border: 8px solid var(--spinner-border);
            border-top: 8px solid var(--spinner-border-top);
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 1.5s linear infinite, pulse 1s ease-in-out infinite;
            box-shadow: 0 0 30px var(--box-shadow);
            margin-bottom: 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        .loading-message {
            font-family: 'Roboto', Arial, sans-serif;
            font-size: 24px;
            color: var(--message-color);
            margin-bottom: 10px;
            text-shadow: var(--loader-text-shadow);
            text-align: center;
        }
        .loading-percentage {
            font-family: 'Roboto', Arial, sans-serif;
            font-size: 20px;
            color: var(--percentage-color);
            margin-bottom: 20px;
            text-shadow: var(--loader-text-shadow);
        }
        .progress-bar {
            width: 80%;
            max-width: 400px;
            height: 15px;
            background: var(--bar-bg);
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            box-shadow: var(--progress-bar-shadow);
            z-index: 1;
        }
        .progress-bar-fill {
            height: 100%;
            width: 0%;
            background: var(--bar-fill);
            border-radius: 10px;
            transition: width var(--animation-duration) ease;
            box-shadow: inset 0 0 12px var(--box-shadow);
        }
        .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: var(--close-btn-bg);
            color: var(--close-btn-color);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 22px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background var(--animation-duration) ease, transform var(--animation-duration) ease;
            z-index: 2;
        }
        .close-btn:hover {
            background: var(--btn-hover-bg);
            transform: scale(1.2);
        }
        .loading-overlay.hidden {
            visibility: hidden;
            opacity: 0;
        }
        .loading-overlay.active {
            visibility: visible;
            opacity: 1;
        }
        .loading-image {
            width: 120px;
            height: auto;
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(loaderStyle);

    // Create and inject the loader overlay into the body
    const loaderOverlay = document.createElement('div');
    loaderOverlay.className = 'loading-overlay';
    loaderOverlay.innerHTML = `
        ${window.loaderConfig.showImage !== false ? `<img src="${window.loaderConfig.imagePath}" alt="Logo" class="loading-image"/>` : ''}
        <button class="close-btn" aria-label="Close">&times;</button>
        <div class="loading-spinner"></div>
        <div class="loading-message">${window.loaderConfig.message || 'Please wait...'}</div>
        <div class="loading-percentage">0%</div>
        <div class="progress-bar">
            <div class="progress-bar-fill"></div>
        </div>
    `;
    document.body.appendChild(loaderOverlay);

    // Play background sound
    const audio = new Audio(window.loaderConfig.audioPath);
    audio.loop = true;

    let loaderAlreadyHidden = false;

    // Function to show the loader with progress
    function showLoader() {
        if (!loaderAlreadyHidden) {
            loaderOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable page scroll
            audio.play();
            updateProgress(0); // Start from 0%
            loaderAlreadyHidden = false;
        }
    }

    // Function to hide the loader
    function hideLoader() {
        loaderAlreadyHidden = true;
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
            if (typeof window.loaderConfig.onComplete === 'function') {
                window.loaderConfig.onComplete();
            }
        } else {
            updateProgress(progress);
        }
    }, 100);

    // Function to handle link clicks
    function handleLinkClick(event) {
        event.preventDefault();
        const href = this.getAttribute('href');
        showLoader();
        setTimeout(() => {
            window.location.href = href;
        }, 1000);
    }

    // Add event listener for close button
    loaderOverlay.querySelector('.close-btn').addEventListener('click', hideLoader);

    // Add event listeners for all links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    // Show the loader initially
    showLoader();
})();
