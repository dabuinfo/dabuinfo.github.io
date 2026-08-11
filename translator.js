// 1. Dynamiczne dodanie ukrytego kontenera Google Translate do DOM
document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById('google_translate_element')) {
        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.style.display = 'none';
        document.body.appendChild(translateDiv);
    }
});

// 2. Funkcja inicjalizująca tłumaczenie
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pl',
        autoDisplay: false
    }, 'google_translate_element');

    // Pobranie języka przeglądarki użytkownika
    const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);

    // Wywołanie tłumaczenia, jeśli język jest inny niż polski ('pl')
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

// 3. Dynamiczne wczytanie zewnętrznego skryptu Google Translate API
(function loadGoogleTranslateScript() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
})();