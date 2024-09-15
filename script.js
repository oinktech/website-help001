(function () {
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
    `;
    document.head.appendChild(loaderStyle);

    // Create and inject the loader overlay into the body
    const loaderOverlay = document.createElement('div');
    loaderOverlay.className = 'loading-overlay';
    loaderOverlay.innerHTML = `
        <button class="close-btn" aria-label="Close">&times;</button>
        <div class="loading-spinner"></div>
        <div class="loading-message" data-key="loadingMessage">Loading...</div>
        <div class="loading-percentage">0%</div>
        <div class="progress-bar">
            <div class="progress-bar-fill"></div>
        </div>
    `;
    document.body.appendChild(loaderOverlay);

    // Function to show the loader with progress
    function showLoader() {
        loaderOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scroll
        if (window.loaderConfig.audioPath) {
            const audio = new Audio(window.loaderConfig.audioPath);
            audio.loop = true;
            audio.play();
        }
        updateProgress(0); // Start from 0%
    }

    // Function to hide the loader
    function hideLoader() {
        loaderOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Enable page scroll
        if (window.loaderConfig.audioPath) {
            const audio = new Audio(window.loaderConfig.audioPath);
            audio.pause();
            audio.currentTime = 0; // Reset audio
        }
    }

    // Function to update the progress percentage
    function updateProgress(percentage) {
        const percentageElement = loaderOverlay.querySelector('.loading-percentage');
        const progressBarFill = loaderOverlay.querySelector('.progress-bar-fill');
        percentageElement.textContent = `${percentage}%`;
        progressBarFill.style.width = `${percentage}%`;
    }

    // Load language data from IndexedDB
    function loadLanguageFromIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('languageDB', 1);
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction('languages', 'readonly');
                const store = transaction.objectStore('languages');
                const getRequest = store.get('currentLang');

                getRequest.onsuccess = () => {
                    const lang = getRequest.result || 'zh-Hant'; // Default to Traditional Chinese
                    resolve(lang);
                };

                getRequest.onerror = () => {
                    reject('Error fetching language from IndexedDB');
                };
            };

            request.onerror = () => {
                reject('Error opening IndexedDB');
            };
        });
    }

    // Update loader language text based on the language file
    function updateLoaderLanguage(lang) {
        fetch(`https://oinktech.github.io/lang/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.querySelectorAll('[data-key]').forEach(element => {
                    const key = element.getAttribute('data-key');
                    if (data[key]) {
                        element.textContent = data[key];
                    }
                });

                // Change text direction if needed
                const rtlLanguages = ['ar', 'he', 'fa']; // Add any RTL languages here
                if (rtlLanguages.includes(lang)) {
                    document.documentElement.setAttribute('dir', 'rtl');
                } else {
                    document.documentElement.removeAttribute('dir');
                }
            })
            .catch(error => {
                console.error('Error loading language file:', error);
                // Optionally, you can reload the default language or show an error message
                updateLoaderLanguage('zh-Hant'); // Default to Traditional Chinese
            });
    }

    // Initialize language and show loader
    window.onload = function() {
        loadLanguageFromIndexedDB().then(lang => {
            updateLoaderLanguage(lang);
        }).catch(error => {
            console.error('Error during language initialization:', error);
            updateLoaderLanguage('zh-Hant'); // Default to Traditional Chinese
        });

        showLoader();
        
        // Hide loader after 3 seconds if not loaded correctly
        const hideLoaderTimeout = setTimeout(() => {
            hideLoader();
            alert('Loading took too long. Please try again.');
        }, 30000);

        // Clear timeout and hide loader when page has fully loaded
        window.addEventListener('load', () => {
            clearTimeout(hideLoaderTimeout);
            hideLoader();
        });

        // Close button functionality
        loaderOverlay.querySelector('.close-btn').addEventListener('click', hideLoader);
    };
})();
