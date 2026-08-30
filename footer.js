// footer.js - Centralna stopka dla dabu-info
(function() {
    // 1. Dodanie stylów CSS dla stopki
    const style = document.createElement('style');
    style.textContent = `
        .dabu-footer {
            background-color: #121212;
            border-top: 1px solid #333;
            color: #ccc;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            padding: 50px 20px 20px;
            width: 100%;
            box-sizing: border-box;
            margin-top: 40px;
            text-align: left;
        }
        .dabu-footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            justify-content: space-between;
        }
        .dabu-footer-col {
            flex: 1;
            min-width: 280px;
        }
        .dabu-footer-heading {
            color: #2ecc71;
            font-size: 1.25em;
            margin-top: 0;
            margin-bottom: 18px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-weight: 700;
        }
        .dabu-footer-text {
            font-size: 0.95em;
            line-height: 1.6;
            margin: 0;
            color: #aaa;
        }
        .dabu-footer-contact {
            list-style: none;
            padding: 0;
            margin: 0;
            font-size: 0.9em;
            line-height: 1.9;
        }
        .dabu-footer-contact li a {
            color: #3498db;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .dabu-footer-contact li a:hover {
            color: #2ecc71;
            text-decoration: underline;
        }
        .dabu-footer-contact strong { color: #e0e0e0; }

        /* --- STYL DLA BOXÓW Z LINKAMI --- */
        .dabu-footer-nav {
            max-width: 1200px;
            margin: 35px auto 0;
            padding-top: 25px;
            border-top: 1px solid #222;
        }
        .dabu-footer-boxes {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .dabu-footer-boxes li a {
            display: inline-block;
            background: #1a1a1a;
            color: #ddd;
            text-decoration: none;
            font-size: 0.85em;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 6px;
            border: 1px solid #2d2d2d;
            transition: all 0.25s ease-in-out;
        }
        .dabu-footer-boxes li a:hover {
            background: #242424;
            color: #2ecc71;
            border-color: #2ecc71;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(46, 204, 113, 0.15);
        }

        /* Stopka dolna - prawa autorskie */
        .dabu-footer-bottom {
            max-width: 1200px;
            margin: 20px auto 0;
            text-align: center;
            font-size: 0.82em;
            color: #666;
        }
        .dabu-footer-bottom a {
            color: #2ecc71;
            text-decoration: none;
            font-weight: bold;
        }

        @media (max-width: 768px) {
            .dabu-footer { padding: 35px 15px 15px; }
            .dabu-footer-container { flex-direction: column; gap: 25px; text-align: center; }
            .dabu-footer-boxes { gap: 8px; }
            .dabu-footer-boxes li a { font-size: 0.8em; padding: 7px 12px; }
        }
    `;
    document.head.appendChild(style);

    // 2. Struktura HTML stopki
    const currentYear = new Date().getFullYear();
    const footerElement = document.createElement('footer');
    footerElement.className = 'dabu-footer';
    footerElement.innerHTML = `
        <div class="dabu-footer-container">
            <div class="dabu-footer-col">
                <h4 class="dabu-footer-heading">DABU-INFO</h4>
                <p class="dabu-footer-text">Twój Nawigator po Wystawkach na terenie Niemiec. Najdokładniejsze plany, rozpiski i terminy wywozu gabarytów na rok ${currentYear}.</p>
            </div>

            <div class="dabu-footer-col">
                <h4 class="dabu-footer-heading">Kontakt i Zamówienia</h4>
                <ul class="dabu-footer-contact">
                    <li>📞 Zamówienia: <a href="tel:+48600812820">+48 600 812 820</a></li>
                    <li>📧 E-mail: <a href="mailto:kontakt@dabu-info.com">kontakt@dabu-info.com</a></li>
                    <li>📍 56-300 Milicz (odbiór osobisty po wcześniejszym kontakcie)</li>
                </ul>
            </div>

            <div class="dabu-footer-col">
                <h4 class="dabu-footer-heading">Dane Firmy i Płatności</h4>
                <ul class="dabu-footer-contact">
                    <li>👤 Właściciel: <strong>Ewa Buczkowska</strong></li>
                    <li>💳 Płatności: BLIK, PayPal</li>
                    <li>🏦 IBAN: PL33 1020 5297 0000 1702 0290 9323</li>
                </ul>
            </div>
        </div>

        <div class="dabu-footer-nav">
            <ul class="dabu-footer-boxes">
                <li><a href="https://dabu-info.com/">Strona Główna</a></li>
                <li><a href="https://dabu-info.com/mapa.html">Mapa Wystawek</a></li>
                <li><a href="https://dabu-info.com/kalendarz.html">Kalendarz Wystawek</a></li>
                <li><a href="https://dabu-info.blogspot.com/" target="_blank">Blog dabu-info</a></li>
                <li><a href="https://dabu-info.com/politykaprywatnosci.html">Polityka Prywatności</a></li>
            </ul>
        </div>
        
        <div class="dabu-footer-bottom">
            <p>&copy; <span>${currentYear}</span> <a href="https://dabu-info.com/">dabu-info</a>. Wszelkie prawa zastrzeżone.</p>
        </div>
    `;

    // 3. Wstawienie na koniec strony
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => document.body.appendChild(footerElement));
    } else {
        document.body.appendChild(footerElement);
    }
})();
