// 1. Wstrzyknięcie rygorystycznych stylów ukrywających pasek i wymuszających pozycję strony
(function injectTranslateStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Usuwamy sztuczny margines/przesunięcie wstawiane przez Google */
        html, body {
            top: 0 !important;
            position: static !important;
            margin-top: 0 !important;
            padding-top: 0 !important;
        }

        /* Ukrycie wszystkich powiązanych ramek iframe i powiadomień Google */
        .goog-te-banner-frame,
        iframe.goog-te-banner-frame,
        .goog-te-banner,
        .skiptranslate,
        #goog-gt-tt,
        .goog-te-balloon-part,
        div[id*="google_translate"] {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Wyłączenie podświetlania tekstu kursorem */
        .goog-text-highlight {
            background-color: transparent !important;
            box-shadow: none !important;
        }
    `;
    document.head.appendChild(style);
})();

// 2. Utworzenie ukrytego kontenera DOM
document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById('google_translate_element')) {
        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.style.display = 'none';
        document.body.appendChild(translateDiv);
    }
});

// 3. Inicjalizacja i pętla sprzątająca po Google
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pl',
        autoDisplay: false
    }, 'google_translate_element');

    const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);

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

    // Dodatkowy mechanizm: stałe usuwanie klas dodawanych przez Google do znacznika <body> i <html>
    setInterval(() => {
        document.body.style.top = "0px";
        document.body.style.marginTop = "0px";
        if (document.body.classList.contains('translated-ltr') || document.body.classList.contains('translated-rtl')) {
            // Czyszczenie atrybutów przesuwających stronę
            document.body.removeAttribute('style');
        }
    }, 300);
}

// 4. Załadowanie oficjalnego skryptu Google
(function loadGoogleTranslateScript() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
})();
