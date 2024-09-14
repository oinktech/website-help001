(function () {
    const loaderStyle = document.createElement('style');
    loaderStyle.innerHTML = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            display: none;
        }
        .loading-spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyle);

    const loaderOverlay = document.createElement('div');
    loaderOverlay.className = 'loading-overlay';
    loaderOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loaderOverlay);

    function showLoader() {
        loaderOverlay.style.display = 'flex';
    }

    function hideLoader() {
        loaderOverlay.style.display = 'none';
    }

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

    window.addEventListener('load', hideLoader);
})();
