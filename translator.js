// 1. Automatyczne wstrzyknięcie stylów CSS ukrywających pasek Google i nakładki
(function injectTranslateStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Zapobiega przesuwanie strony w dół po aktywacji tłumacza */
        body {
            top: 0 !important;
            position: static !important;
        }

        /* Ukrywa górną ramkę/iframe paska Google Translate */
        .goog-te-banner-frame,
        iframe.goog-te-banner-frame,
        .skiptranslate,
        #goog-gt-tt,
        .goog-te-balloon-part {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
        }

        /* Usuwa podświetlanie przetłumaczonego tekstu po najechaniu myszką */
        .goog-text-highlight {
            background-color: transparent !important;
            box-shadow: none !important;
        }
    `;
    document.head.appendChild(style);
})();

// 2. Dodanie ukrytego kontenera dla widżetu Google do struktury DOM
document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById('google_translate_element')) {
        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.style.display = 'none';
        document.body.appendChild(translateDiv);
    }
});

// 3. Inicjalizacja mechanizmu tłumaczenia
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pl',
        autoDisplay: false
    }, 'google_translate_element');

    // Pobranie języka przeglądarki odwiedzającego
    const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);

    // Automatyczne uruchomienie tłumaczenia tylko dla użytkowników spoza Polski
    if (userLang !== 'pl') {
        const checkWidgetReady = setInterval(() => {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
              select.value = userLang;
              select.dispatchEvent(new Event('change'));
              clearInterval(checkWidgetReady);
            }
        }, 100);

        setTimeout(() => clearInterval(checkWidgetReady), 5000);
    }
}

// 4. Pobranie zewnętrznej biblioteki Google Translate API
(function loadGoogleTranslateScript() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
})();
