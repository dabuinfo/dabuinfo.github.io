// footer.js - Centralna stopka oraz inteligentny asystent z automatycznym tłumaczem Google
(function() {
    function initFooterAndAssistant() {
        // ========================================================
        // KONFIGURACJA URLOPU
        // true = pasek widoczny | false = pasek całkowicie wyłączony
        // ========================================================
        const IS_VACATION_ACTIVE = false;

        // Jeśli urlop trwa 1 dzień, wpisz tylko datę do VACATION_FROM, a VACATION_TO zostaw puste: ''
        // Jeśli urlop to zakres, wpisz obie daty (np. '03.10' i '10.10.2026')
        const VACATION_FROM = '03.10.2026';
        const VACATION_TO   = '';

        // Automatyczne wykrywanie czy to jeden dzień oraz formatowanie zapisu
        const IS_SINGLE_DAY = !VACATION_TO || VACATION_TO.trim() === '' || VACATION_FROM.trim() === VACATION_TO.trim();
        const VACATION_DATES = IS_SINGLE_DAY ? VACATION_FROM.trim() : `${VACATION_FROM.trim()} – ${VACATION_TO.trim()}`;

        // ========================================================
        // KONFIGURACJA GODZIN KONTAKTU TELEFONICZNEGO I WHATSAPP
        // Połączenia tylko Pn–Pt w godz. 16:00–20:00, poza tym SMS lub WhatsApp
        // ========================================================
        const PHONE_RAW = '+48600812820';
        const WA_NUMBER = PHONE_RAW.replace(/\D/g, '');
        const WA_URL = `https://wa.me/${WA_NUMBER}`;
        const CALL_START_HOUR = 16; // od 16:00
        const CALL_END_HOUR = 20;   // do 20:00 (wyłącznie)

        // ========================================================
        // KONFIGURACJA PŁATNOŚCI (dane ukryte do czasu kliknięcia)
        // ========================================================
        const BLIK_PHONE_RAW = '733035301';
        const BLIK_PHONE_DISPLAY = '733 035 301';
        const PAYPAL_EMAIL = 'ewabu74@gmail.com';
        const IBAN_DISPLAY = 'PL33 1020 5297 0000 1702 0290 9323';
        const IBAN_RAW_PL = '33102052970000170202909323';
        const IBAN_RAW_INTL = 'PL33102052970000170202909323';

        const WA_ICON_SVG = `<svg class="wa-icon" viewBox="0 0 24 24" width="16" height="16" fill="#25D366" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.31-1.65a11.86 11.86 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44zm-8.46 18.33h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.88 9.88 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.91-9.9 2.65 0 5.14 1.03 7.01 2.91a9.84 9.84 0 0 1 2.89 7c0 5.46-4.44 9.9-9.9 9.9zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/></svg>`;

        const COPY_ICON_SVG = `<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

        function isCallAllowedNow() {
            const parts = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Europe/Warsaw',
                weekday: 'short',
                hour: 'numeric',
                hourCycle: 'h23'
            }).formatToParts(new Date());

            const weekday = parts.find(p => p.type === 'weekday')?.value;
            const hour = parseInt(parts.find(p => p.type === 'hour')?.value, 10);
            const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);

            return isWeekday && hour >= CALL_START_HOUR && hour < CALL_END_HOUR;
        }

        // Wykrywanie języka przeglądarki
        const browserLang = (navigator.language || navigator.userLanguage || 'de').substring(0, 2).toLowerCase();

        // 1. STYLE CSS
        if (!document.getElementById('dabu-footer-styles')) {
            const style = document.createElement('style');
            style.id = 'dabu-footer-styles';
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
                .dabu-footer-col { flex: 1; min-width: 280px; }
                .dabu-footer-heading {
                    color: #2ecc71;
                    font-size: 1.25em;
                    margin-top: 0;
                    margin-bottom: 18px;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    font-weight: 700;
                }
                .dabu-footer-text { font-size: 0.95em; line-height: 1.6; margin: 0; color: #aaa; }
                .dabu-footer-contact {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    font-size: 0.92em;
                    line-height: 1.6;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .dabu-footer-contact li {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 6px;
                }
                .dabu-footer-contact li a {
                    color: #38bdf8;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                .dabu-footer-contact li a:hover {
                    color: #2ecc71;
                    text-decoration: underline;
                }
                .dabu-footer-contact strong { color: #e0e0e0; }

                /* BLOK KONTAKTOWY (PRZYCISKI AKCJI) */
                .dabu-phone-block {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    width: 100%;
                }
                .dabu-action-buttons {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 10px;
                    width: 100%;
                    max-width: 340px;
                }
                .dabu-action-btn {
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 7px !important;
                    min-height: 40px;
                    padding: 8px 14px;
                    border-radius: 8px;
                    font-size: 0.88em;
                    font-weight: 600;
                    text-decoration: none !important;
                    box-sizing: border-box;
                    transition: transform 0.15s ease, background-color 0.2s ease, border-color 0.2s ease;
                    white-space: nowrap;
                }
                .dabu-action-btn:hover {
                    transform: translateY(-1px);
                    text-decoration: none !important;
                }
                .dabu-action-btn:active {
                    transform: scale(0.98);
                }
                .dabu-btn-primary {
                    background: rgba(56, 189, 248, 0.12);
                    border: 1px solid rgba(56, 189, 248, 0.4);
                    color: #7dd3fc !important;
                }
                .dabu-btn-primary:hover {
                    background: rgba(56, 189, 248, 0.22);
                    border-color: #38bdf8;
                    color: #ffffff !important;
                }
                .dabu-btn-call {
                    grid-column: 1 / -1;
                    background: rgba(46, 204, 113, 0.14);
                    border: 1px solid rgba(46, 204, 113, 0.5);
                    color: #4ade80 !important;
                }
                .dabu-btn-call:hover {
                    background: rgba(46, 204, 113, 0.26);
                    border-color: #2ecc71;
                    color: #ffffff !important;
                }
                .dabu-btn-wa {
                    background: rgba(37, 211, 102, 0.12);
                    border: 1px solid rgba(37, 211, 102, 0.45);
                    color: #4ade80 !important;
                }
                .dabu-btn-wa:hover {
                    background: rgba(37, 211, 102, 0.22);
                    border-color: #25D366;
                    color: #ffffff !important;
                }
                .wa-icon {
                    flex-shrink: 0;
                    vertical-align: middle;
                }
                .dabu-hours-note {
                    display: flex !important;
                    flex-direction: column;
                    align-items: flex-start !important;
                    gap: 2px !important;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid #242424;
                    border-radius: 8px;
                    padding: 8px 12px;
                    font-size: 0.82em;
                    color: #94a3b8;
                    line-height: 1.45;
                    width: 100%;
                    max-width: 340px;
                    box-sizing: border-box;
                }
                .dabu-hours-note span {
                    display: block;
                }

                /* PŁATNOŚCI - PRZYCISKI ODKRYWANIA I UKRYTY PANEL */
                .payment-buttons-wrap {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 7px;
                    width: 100%;
                }
                .payment-toggle-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    background: rgba(46, 204, 113, 0.12);
                    border: 1px solid rgba(46, 204, 113, 0.45);
                    color: #2ecc71;
                    font-family: inherit;
                    font-size: 0.88em;
                    font-weight: 600;
                    padding: 4px 10px;
                    border-radius: 6px;
                    cursor: pointer;
                    line-height: 1.4;
                    transition: all 0.2s ease;
                }
                .payment-toggle-btn:hover,
                .payment-toggle-btn.is-active {
                    background: rgba(46, 204, 113, 0.24);
                    border-color: #2ecc71;
                    color: #ffffff;
                }
                .payment-reveal-item {
                    display: none !important;
                    width: 100%;
                }
                .payment-reveal-item.is-open {
                    display: flex !important;
                }
                .payment-reveal-box {
                    display: inline-flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 8px;
                    background: #181818;
                    border: 1px solid #2a2a2a;
                    border-left: 3px solid #2ecc71;
                    border-radius: 8px;
                    padding: 8px 12px;
                    font-size: 0.9em;
                    box-sizing: border-box;
                    max-width: 100%;
                }
                .payment-value-text {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    color: #f8fafc;
                    cursor: pointer;
                    word-break: break-all;
                }

                /* PRZYCISK KOPIOWANIA */
                .copy-iban-btn {
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    color: #2ecc71;
                    padding: 3px 6px;
                    border-radius: 4px;
                    cursor: pointer;
                    line-height: 1;
                    flex-shrink: 0;
                    width: auto !important;
                    height: auto !important;
                    transition: all 0.2s ease;
                }
                .copy-iban-btn:hover {
                    background: rgba(46, 204, 113, 0.15);
                    border-color: #2ecc71;
                    transform: scale(1.05);
                }
                .copy-iban-btn svg {
                    width: 14px;
                    height: 14px;
                    stroke: currentColor;
                    fill: none;
                    display: block;
                }
                .copy-tooltip {
                    display: none;
                    color: #2ecc71;
                    font-size: 0.82em;
                    font-weight: 600;
                    margin-left: 4px;
                }

                /* JEDYNA STREFA KLIENTA W STOPCE */
                .dabu-footer-client-bar {
                    max-width: 1200px;
                    margin: 32px auto 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 14px;
                    background: linear-gradient(90deg, #162231 0%, #111823 100%);
                    border: 1px solid #1e3a5f;
                    border-left: 4px solid #38bdf8;
                    border-radius: 10px;
                    padding: 14px 20px;
                    box-sizing: border-box;
                }
                .dabu-footer-client-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.94rem;
                    color: #cbd5e1;
                }
                .dabu-footer-client-info strong {
                    color: #f8fafc;
                }
                .dabu-btn-client-footer {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #0284c7;
                    color: #ffffff !important;
                    font-weight: 700;
                    font-size: 0.88rem;
                    padding: 10px 20px;
                    border-radius: 6px;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }
                .dabu-btn-client-footer:hover {
                    background: #2563eb;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
                }

                .dabu-footer-nav {
                    max-width: 1200px;
                    margin: 25px auto 0;
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

                .dabu-footer-bottom {
                    max-width: 1200px;
                    margin: 20px auto 0;
                    text-align: center;
                    font-size: 0.82em;
                    color: #666;
                }
                .dabu-footer-bottom a { color: #2ecc71; text-decoration: none; font-weight: bold; }

                /* STYLE ASYSTENTA */
                :root { --theme-color: #4CAF50; }
                .chat-button {
                    position: fixed !important; bottom: 25px !important; right: 20px !important; width: 55px !important; height: 55px !important;
                    border-radius: 30px !important; background-color: var(--theme-color) !important; color: white !important;
                    border: none !important; cursor: pointer !important; z-index: 99999 !important; box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important;
                    display: flex !important; align-items: center !important; justify-content: center !important; transition: all 0.2s ease !important;
                }
                .chat-button:hover { transform: scale(1.1); box-shadow: 0 6px 14px rgba(0,0,0,0.4); }
                #chat-main-window {
                    position: fixed !important; bottom: 90px !important; right: 20px !important; width: 360px !important; max-width: 92vw !important;
                    height: 520px !important; max-height: 75vh !important; background: white !important; border-radius: 12px !important;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.35) !important; display: none; flex-direction: column !important;
                    z-index: 100000 !important; overflow: hidden !important; font-size: 14px !important; line-height: 1.4 !important; color: #000 !important;
                }
                .chat-header { background: var(--theme-color); color: white; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; }
                #chat-messages-area { flex: 1; overflow-y: auto; padding: 15px; background: #f8fafc; display: flex; flex-direction: column; gap: 10px; }
                .chat-bubble-sent { background: var(--theme-color); color: white; padding: 10px 14px; border-radius: 15px 15px 2px 15px; max-width: 85%; align-self: flex-end; text-align: left; word-wrap: break-word; font-size: 14px; }
                .chat-bubble-received { background: #ffffff; color: #1e293b; padding: 12px 14px; border-radius: 15px 15px 15px 2px; max-width: 90%; align-self: flex-start; word-wrap: break-word; border: 1px solid #e2e8f0; box-shadow: 0 2px 6px rgba(0,0,0,0.04); font-size: 13.5px; }
                
                .chat-bubble-received a { color: #16a34a !important; font-weight: bold !important; text-decoration: underline !important; }
                .chat-bubble-received strong { color: #0f172a !important; }

                .chat-input-area { 
                    display: flex !important; 
                    padding: 10px !important; 
                    border-top: 1px solid #ddd !important; 
                    background: #ffffff !important; 
                    align-items: stretch !important; 
                    box-sizing: border-box !important;
                }
                #chat-user-input { 
                    flex: 1 1 auto !important; 
                    width: 100% !important;
                    min-width: 0 !important;
                    background: #ffffff !important; 
                    color: #0f172a !important; 
                    padding: 10px 12px !important; 
                    border: 1px solid #cbd5e1 !important; 
                    border-radius: 6px !important; 
                    font-size: 14px !important; 
                    outline: none !important; 
                    box-sizing: border-box !important;
                }
                #chat-user-input:focus { 
                    border-color: var(--theme-color) !important; 
                }
                #chat-user-input::placeholder {
                    color: #94a3b8 !important;
                }
                .chat-send-button { 
                    margin-left: 10px !important; 
                    padding: 0 16px !important; 
                    background: var(--theme-color) !important; 
                    color: white !important; 
                    border: none !important; 
                    border-radius: 6px !important; 
                    cursor: pointer !important; 
                    font-weight: bold !important; 
                    flex-shrink: 0 !important;
                }

                @media (max-width: 768px) {
                    .dabu-footer { padding: 36px 18px 96px; }
                    .dabu-footer-container {
                        flex-direction: column;
                        gap: 28px;
                        text-align: left;
                    }
                    .dabu-footer-col {
                        min-width: 0;
                        padding-bottom: 24px;
                        border-bottom: 1px solid #222;
                    }
                    .dabu-footer-col:last-child {
                        padding-bottom: 0;
                        border-bottom: none;
                    }
                    .dabu-footer-heading {
                        font-size: 1.05em;
                        margin-bottom: 14px;
                        letter-spacing: 1px;
                    }
                    .dabu-footer-contact {
                        gap: 12px;
                    }
                    .dabu-footer-contact li {
                        justify-content: flex-start;
                    }
                    .dabu-action-buttons {
                        max-width: 100%;
                        gap: 10px;
                    }
                    .dabu-action-btn {
                        min-height: 44px;
                        font-size: 0.92em;
                    }
                    .dabu-hours-note {
                        max-width: 100%;
                        padding: 10px 12px;
                        font-size: 0.84em;
                    }
                    .payment-toggle-btn {
                        padding: 6px 12px;
                        min-height: 38px;
                    }
                    .payment-reveal-box {
                        display: flex;
                        width: 100%;
                        padding: 10px 12px;
                    }
                    .payment-reveal-box .copy-iban-btn {
                        padding: 6px 10px;
                        margin-left: auto;
                    }
                    .dabu-footer-client-bar {
                        flex-direction: column;
                        align-items: stretch;
                        text-align: left;
                        margin-top: 28px;
                        padding: 16px;
                        gap: 14px;
                    }
                    .dabu-footer-client-info {
                        justify-content: flex-start;
                        align-items: flex-start;
                        line-height: 1.5;
                    }
                    .dabu-btn-client-footer {
                        justify-content: center;
                        min-height: 44px;
                        box-sizing: border-box;
                    }
                    .dabu-footer-nav {
                        margin-top: 24px;
                        padding-top: 24px;
                    }
                    .dabu-footer-boxes {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: 8px;
                    }
                    .dabu-footer-boxes li {
                        display: flex;
                    }
                    .dabu-footer-boxes li a {
                        width: 100%;
                        text-align: center;
                        font-size: 0.82em;
                        padding: 11px 8px;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .dabu-footer-bottom {
                        margin-top: 24px;
                    }
                    #chat-main-window { bottom: 85px !important; left: 12px !important; right: 12px !important; width: auto !important; max-width: none !important; }
                    #vacation-bar { font-size: 13px !important; padding: 10px 14px !important; }
                }
            `;
            document.head.appendChild(style);
        }

        const currentYear = new Date().getFullYear();

        // 2. TWORZENIE STOPKI
        if (!document.querySelector('.dabu-footer')) {
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
                            <li id="dabu-phone-contact"></li>
                            <li class="dabu-hours-note">
                                <span>🕒 <strong>Tel:</strong> Pn–Pt 16:00–20:00</span>
                                <span>💬 <strong>Poza godz. i weekendy:</strong> SMS lub WhatsApp</span>
                            </li>
                        </ul>
                    </div>

                    <div class="dabu-footer-col">
                        <h4 class="dabu-footer-heading">Dane Firmy i Płatności</h4>
                        <ul class="dabu-footer-contact">
                            <li>👤 Właściciel: <strong>Ewa Buczkowska</strong></li>
                            <li>
                                <div class="payment-buttons-wrap">
                                    <span>💳 Płatności:</span>
                                    <button type="button" class="payment-toggle-btn" data-payment="blik" aria-expanded="false" title="Pokaż numer do przelewu BLIK na telefon">
                                        BLIK na telefon
                                    </button>
                                    <button type="button" class="payment-toggle-btn" data-payment="paypal" aria-expanded="false" title="Pokaż adres PayPal">
                                        PayPal
                                    </button>
                                    <button type="button" class="payment-toggle-btn" data-payment="iban" aria-expanded="false" title="Pokaż numer IBAN">
                                        IBAN
                                    </button>
                                </div>
                            </li>
                            <li class="payment-reveal-item" id="payment-reveal-row">
                                <span class="payment-reveal-box">
                                    <span id="payment-label-display"></span>
                                    <span id="payment-value-display" class="payment-value-text" title="Kliknij, aby skopiować"></span>
                                    <button type="button" class="copy-iban-btn" id="copy-payment-trigger" title="Skopiuj dane do płatności">
                                        ${COPY_ICON_SVG}
                                    </button>
                                    <span class="copy-tooltip" id="payment-copied-msg">Skopiowano!</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- JEDYNA BELKA STREFY KLIENTA W STOPCE -->
                <div class="dabu-footer-client-bar">
                    <div class="dabu-footer-client-info">
                        <span>📂</span>
                        <span><strong>Strefa Klienta:</strong> Posiadasz już aktywne zamówienie lub kod dostępu?</span>
                    </div>
                    <a href="https://dabu-info.com/raporty.html" class="dabu-btn-client-footer">
                        🔑 Otwórz Swoje Raporty &raquo;
                    </a>
                </div>

                <!-- NAWIGACJA (BEZ DUBLOWANIA STREFY KLIENTA) -->
                <div class="dabu-footer-nav">
                    <ul class="dabu-footer-boxes">
                        <li><a href="https://dabu-info.com/">Strona Główna</a></li>
                        <li><a href="https://dabu-info.com/zestaw.html">Zestaw Tygodniowy</a></li>
                        <li><a href="https://dabu-info.com/mapa.html">Mapa Wystawek</a></li>
                        <li><a href="https://dabu-info.com/kalendarz.html">Kalendarz Wystawek</a></li>
                        <li><a href="https://dabu-info.com/data.html">Bazy Danych</a></li>
                        <li><a href="https://dabu-info.com/gieldy.html">Adresy Giełd</a></li>
                        <li><a href="https://dabu-info.com/kontakt.html">Kontakt</a></li>
                        <li><a href="https://dabu-info.com/politykaprywatnosci.html">Polityka Prywatności</a></li>
                    </ul>
                </div>
                
                <div class="dabu-footer-bottom">
                    <p>&copy; <span>${currentYear}</span> <a href="https://dabu-info.com/">dabu-info</a>. Wszelkie prawa zastrzeżone.</p>
                </div>
            `;
            document.body.appendChild(footerElement);

            // Dynamiczne przełączanie przycisków kontaktu w zależności od dnia i godziny (bez wyświetlania numeru)
            function updatePhoneContact() {
                const phoneEl = document.getElementById('dabu-phone-contact');
                if (!phoneEl) return;

                if (isCallAllowedNow()) {
                    phoneEl.innerHTML = `
                        <div class="dabu-phone-block">
                            <div class="dabu-action-buttons">
                                <a href="tel:${PHONE_RAW}" class="dabu-action-btn dabu-btn-call" title="Zadzwoń">
                                    📞 Zadzwoń
                                </a>
                                <a href="sms:${PHONE_RAW}" class="dabu-action-btn dabu-btn-primary" title="Wyślij SMS">
                                    💬 Wyślij SMS
                                </a>
                                <a href="${WA_URL}" target="_blank" rel="noopener noreferrer" class="dabu-action-btn dabu-btn-wa" title="Napisz wiadomość na WhatsApp">
                                    ${WA_ICON_SVG} WhatsApp
                                </a>
                            </div>
                        </div>
                    `;
                } else {
                    phoneEl.innerHTML = `
                        <div class="dabu-phone-block">
                            <div class="dabu-action-buttons">
                                <a href="sms:${PHONE_RAW}" class="dabu-action-btn dabu-btn-primary" title="Wyślij SMS">
                                    💬 Wyślij SMS
                                </a>
                                <a href="${WA_URL}" target="_blank" rel="noopener noreferrer" class="dabu-action-btn dabu-btn-wa" title="Napisz wiadomość na WhatsApp">
                                    ${WA_ICON_SVG} WhatsApp
                                </a>
                            </div>
                        </div>
                    `;
                }
            }

            updatePhoneContact();
            setInterval(updatePhoneContact, 60000);

            // Obsługa odkrywania i kopiowania danych do płatności (BLIK, PayPal, IBAN)
            const isPoland = (browserLang === 'pl');
            const paymentMethods = {
                blik: {
                    label: '📱 BLIK:',
                    display: BLIK_PHONE_DISPLAY,
                    copyValue: BLIK_PHONE_RAW,
                    copyTitle: 'Skopiuj numer BLIK'
                },
                paypal: {
                    label: '🅿️ PayPal:',
                    display: PAYPAL_EMAIL,
                    copyValue: PAYPAL_EMAIL,
                    copyTitle: 'Skopiuj adres PayPal'
                },
                iban: {
                    label: '🏛️ IBAN:',
                    display: IBAN_DISPLAY,
                    copyValue: isPoland ? IBAN_RAW_PL : IBAN_RAW_INTL,
                    copyTitle: 'Skopiuj numer konta'
                }
            };

            const paymentButtons = footerElement.querySelectorAll('.payment-toggle-btn');
            const paymentRevealRow = document.getElementById('payment-reveal-row');
            const paymentLabelDisplay = document.getElementById('payment-label-display');
            const paymentValueDisplay = document.getElementById('payment-value-display');
            const copyPaymentBtn = document.getElementById('copy-payment-trigger');
            const paymentCopiedMsg = document.getElementById('payment-copied-msg');

            let activePaymentKey = null;
            let copyMsgTimeout = null;

            paymentButtons.forEach((btn) => {
                btn.addEventListener('click', function() {
                    const key = btn.getAttribute('data-payment');
                    const method = paymentMethods[key];
                    if (!method || !paymentRevealRow) return;

                    const isClosing = (activePaymentKey === key);

                    paymentButtons.forEach((b) => {
                        b.classList.remove('is-active');
                        b.setAttribute('aria-expanded', 'false');
                    });

                    if (paymentCopiedMsg) {
                        paymentCopiedMsg.style.display = 'none';
                    }

                    if (isClosing) {
                        activePaymentKey = null;
                        paymentRevealRow.classList.remove('is-open');
                        paymentLabelDisplay.textContent = '';
                        paymentValueDisplay.textContent = '';
                    } else {
                        activePaymentKey = key;
                        btn.classList.add('is-active');
                        btn.setAttribute('aria-expanded', 'true');
                        paymentLabelDisplay.textContent = method.label;
                        paymentValueDisplay.textContent = method.display;
                        if (copyPaymentBtn) copyPaymentBtn.title = method.copyTitle;
                        paymentRevealRow.classList.add('is-open');
                    }
                });
            });

            function copyActivePaymentValue() {
                if (!activePaymentKey || !paymentMethods[activePaymentKey]) return;
                const textToCopy = paymentMethods[activePaymentKey].copyValue;
                const msgText = isPoland ? 'Skopiowano!' : 'Copied!';

                function showCopySuccess() {
                    if (paymentCopiedMsg) {
                        paymentCopiedMsg.textContent = msgText;
                        paymentCopiedMsg.style.display = 'inline';
                        clearTimeout(copyMsgTimeout);
                        copyMsgTimeout = setTimeout(() => {
                            paymentCopiedMsg.style.display = 'none';
                        }, 2500);
                    }
                }

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy).then(showCopySuccess).catch(fallbackCopy);
                } else {
                    fallbackCopy();
                }

                function fallbackCopy() {
                    const tempInput = document.createElement('input');
                    tempInput.value = textToCopy;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                    showCopySuccess();
                }
            }

            if (copyPaymentBtn) copyPaymentBtn.onclick = copyActivePaymentValue;
            if (paymentValueDisplay) paymentValueDisplay.onclick = copyActivePaymentValue;
        }

        // ========================================================
        // PŁYWAJĄCY PASEK URLOPOWY (WIELOJĘZYCZNY Z PRZEŁĄCZNIKIEM)
        // ========================================================
        if (IS_VACATION_ACTIVE && !document.getElementById('vacation-bar')) {
            const vacationTranslations = {
                pl: {
                    title: "Przerwa urlopowa:",
                    text: IS_SINGLE_DAY 
                        ? `W dniu <strong>${VACATION_DATES}</strong> przebywamy na urlopie. Na wiadomości odpowiemy po powrocie!`
                        : `W dniach <strong>${VACATION_DATES}</strong> przebywamy na urlopie. Na wiadomości odpowiemy po powrocie!`,
                    close: "✕ Zamknij"
                },
                de: {
                    title: "Betriebsurlaub:",
                    text: IS_SINGLE_DAY
                        ? `Am <strong>${VACATION_DATES}</strong> befinden wir uns im Urlaub. Wir melden uns umgehend nach unserer Rückkehr!`
                        : `Vom <strong>${VACATION_DATES}</strong> befinden wir uns im Urlaub. Wir melden uns umgehend nach unserer Rückkehr!`,
                    close: "✕ Schließen"
                },
                en: {
                    title: "Vacation notice:",
                    text: IS_SINGLE_DAY
                        ? `On <strong>${VACATION_DATES}</strong> we are on vacation. We will reply to your inquiries as soon as we return!`
                        : `From <strong>${VACATION_DATES}</strong> we are on vacation. We will reply to your inquiries as soon as we return!`,
                    close: "✕ Close"
                },
                cs: {
                    title: "Dovolená:",
                    text: IS_SINGLE_DAY
                        ? `Dne <strong>${VACATION_DATES}</strong> máme dovolenou. Na všechny zprávy odpovíme ihned po návratu!`
                        : `V termínu <strong>${VACATION_DATES}</strong> máme dovolenou. Na všechny zprávy odpovíme ihned po návratu!`,
                    close: "✕ Zavřít"
                },
                sk: {
                    title: "Dovolenka:",
                    text: IS_SINGLE_DAY
                        ? `Dňa <strong>${VACATION_DATES}</strong> máme dovolenku. Na správy odpovieme hneď po návrate!`
                        : `V termíne <strong>${VACATION_DATES}</strong> máme dovolenku. Na správy odpovieme hneď po návrate!`,
                    close: "✕ Zavrieť"
                },
                hu: {
                    title: "Szabadság:",
                    text: IS_SINGLE_DAY
                        ? `<strong>${VACATION_DATES}</strong> napon szabadságon vagyunk. Visszatérésünk után azonnal válaszolunk!`
                        : `<strong>${VACATION_DATES}</strong> között szabadságon vagyunk. Visszatérésünk után azonnal válaszolunk!`,
                    close: "✕ Bezárás"
                },
                ro: {
                    title: "Concediu:",
                    text: IS_SINGLE_DAY
                        ? `În data de <strong>${VACATION_DATES}</strong> suntem în concediu. Vă vom răspunde la mesaje imediat după întoarcere!`
                        : `În perioada <strong>${VACATION_DATES}</strong> suntem în concediu. Vă vom răspunde la mesaje imediat după întoarcere!`,
                    close: "✕ Închide"
                },
                bg: {
                    title: "В отпуск:",
                    text: IS_SINGLE_DAY
                        ? `На <strong>${VACATION_DATES}</strong> сме в отпуск. Ще отговорим на съобщенията ви веднага след завръщането си!`
                        : `В периода <strong>${VACATION_DATES}</strong> сме в отпуск. Ще отговорим на съобщенията ви веднага след завръщането си!`,
                    close: "✕ Затвори"
                },
                uk: {
                    title: "Відпустка:",
                    text: IS_SINGLE_DAY
                        ? `<strong>${VACATION_DATES}</strong> ми у відпустці. Відповімо на всі повідомлення одразу після повернення!`
                        : `У період <strong>${VACATION_DATES}</strong> ми у відпустці. Відповімо на всі повідомлення одразу після повернення!`,
                    close: "✕ Закрити"
                },
                lt: {
                    title: "Atostogos:",
                    text: IS_SINGLE_DAY
                        ? `<strong>${VACATION_DATES}</strong> atostogaujame. Į žinutes atsakysime grįžę!`
                        : `Nuo <strong>${VACATION_DATES}</strong> atostogaujame. Į žinutes atsakysime grįžę!`,
                    close: "✕ Uždaryti"
                },
                nl: {
                    title: "Vakantie:",
                    text: IS_SINGLE_DAY
                        ? `Op <strong>${VACATION_DATES}</strong> zijn wij met vakantie. Wij beantwoorden berichten na terugkomst!`
                        : `Van <strong>${VACATION_DATES}</strong> zijn wij met vakantie. Wij beantwoorden berichten na terugkomst!`,
                    close: "✕ Sluiten"
                }
            };

            const tVac = vacationTranslations[browserLang] || vacationTranslations['de'];

            const vacationBar = document.createElement('div');
            vacationBar.id = 'vacation-bar';
            vacationBar.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: #1e293b;
                color: #f8fafc;
                padding: 12px 20px;
                box-shadow: 0 -4px 16px rgba(0,0,0,0.35);
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 16px;
                z-index: 99998;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                box-sizing: border-box;
                border-top: 1px solid #334155;
            `;
            vacationBar.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:18px;">🌴</span>
                    <span><strong>${tVac.title}</strong> ${tVac.text}</span>
                </div>
                <button onclick="document.getElementById('vacation-bar').remove()" style="background:#334155; border:none; color:#ffffff; padding:5px 12px; border-radius:6px; cursor:pointer; font-size:13px; font-weight:600; white-space:nowrap; transition:0.2s;">
                    ${tVac.close}
                </button>
            `;
            document.body.appendChild(vacationBar);
        }

        // 3. TWORZENIE ASYSTENTA
        const currentPath = window.location.pathname.toLowerCase();
        const isExcludedPage = currentPath.includes('kalendarz') || 
                               currentPath.includes('gieldy') || 
                               currentPath.includes('mapa2026') || 
                               currentPath.includes('mapa') ||
                               currentPath.includes('data');

        if (!isExcludedPage && !document.getElementById('chat-toggle-btn')) {
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPgIdADbokUR4ww2B6AytMt4B3JNQgmxamU5-VW5asuDk8TDMDWV5yzIT34XemPKf0HA/exec';

            const chatWrapper = document.createElement('div');
            chatWrapper.id = 'dabu-chat-wrapper';
            chatWrapper.innerHTML = `
                <button class="chat-button" id="chat-toggle-btn" title="Otwórz asystenta">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </button>
                <div id="chat-main-window" style="display:none;">
                    <div class="chat-header" id="chat-header-title"></div>
                    <div id="chat-messages-area"></div>
                    <div class="chat-input-area">
                        <input type="text" id="chat-user-input" placeholder="..." />
                        <button class="chat-send-button" id="chat-send-btn">Wyślij</button>
                    </div>
                    <div style="text-align: center; color: #94a3b8; font-family: sans-serif; padding: 8px 0 12px 0; background: white; font-size: 11.5px; letter-spacing: 0.5px;">
                        © ${currentYear} dabu-info
                    </div>
                </div>
            `;
            document.body.appendChild(chatWrapper);

            const chatMainWindow = document.getElementById('chat-main-window');
            const toggleBtn = document.getElementById('chat-toggle-btn');
            const messagesArea = document.getElementById('chat-messages-area');
            const userInput = document.getElementById('chat-user-input');
            const sendBtn = document.getElementById('chat-send-btn');
            const headerTitle = document.getElementById('chat-header-title');

            const fallbackLang = {
                pl: { powitanie: "Cześć! Wpisz nazwę miejscowości lub adres, aby sprawdzić dostępne terminy.", placeholder: "Wpisz miejscowość lub adres...", wyslij: "Wyślij", ladowanie: "🤔 Szukam...", blad: "❌ Błąd serwera." },
                de: { powitanie: "Hallo! Geben Sie den Namen der Stadt oder die Adresse ein, um Termine zu prüfen.", placeholder: "Stadt oder Adresse eingeben...", wyslij: "Senden", ladowanie: "🤔 Suche...", blad: "❌ Serverfehler." },
                en: { powitanie: "Hi! Enter the city name or address to check available dates.", placeholder: "Enter city or address...", wyslij: "Send", ladowanie: "🤔 Searching...", blad: "❌ Server error." }
            };

            let tChat = fallbackLang[browserLang] || fallbackLang['de'];

            headerTitle.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span style="font-family:Arial Black, sans-serif; font-size:15px; letter-spacing:0.5px;">DABU-INFO ASYSTENT</span>
                </div>
                <span id="close-chat-btn" style="cursor:pointer; font-size: 16px; padding: 4px;">❌</span>
            `;

            userInput.placeholder = tChat.placeholder;
            sendBtn.innerText = tChat.wyslij;
            messagesArea.innerHTML = `<div class="chat-bubble-received">${tChat.powitanie}</div>`;

            if (!fallbackLang[browserLang]) {
                fetch(SCRIPT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'text/plain;charset=utf-8'},
                    body: JSON.stringify({ akcja: 'pobierz_powitanie', jezyk: browserLang })
                })
                .then(r => r.json())
                .then(d => {
                    if (d && d.powitanie) {
                        tChat.powitanie = d.powitanie;
                        tChat.placeholder = d.placeholder || tChat.placeholder;
                        tChat.wyslij = d.wyslij || tChat.wyslij;
                        tChat.ladowanie = d.ladowanie || tChat.ladowanie;
                        
                        userInput.placeholder = tChat.placeholder;
                        sendBtn.innerText = tChat.wyslij;
                        messagesArea.innerHTML = `<div class="chat-bubble-received">${tChat.powitanie}</div>`;
                    }
                })
                .catch(() => {});
            }

            document.getElementById('close-chat-btn').onclick = () => chatMainWindow.style.display = 'none';

            toggleBtn.onclick = function() {
                if (chatMainWindow.style.display === 'none' || chatMainWindow.style.display === '') {
                    chatMainWindow.style.display = 'flex';
                    if (window.innerWidth > 768) userInput.focus();
                } else {
                    chatMainWindow.style.display = 'none';
                }
            };

            userInput.addEventListener("keypress", function(event) {
                if (event.key === "Enter") { event.preventDefault(); sendBtn.click(); }
            });

            sendBtn.onclick = async function() {
                const text = userInput.value.trim();
                if (!text) return;

                appendMessage(text, 'sent');
                userInput.value = '';

                const loadingId = 'loading-' + Date.now();
                appendMessage(tChat.ladowanie, 'received', loadingId);

                try {
                    const resp = await fetch(SCRIPT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'text/plain;charset=utf-8'},
                        body: JSON.stringify({ akcja: 'szukaj_terminow', zapytanie: text, jezyk: browserLang })
                    });
                    const data = await resp.json();
                    
                    const el = document.getElementById(loadingId);
                    if(el) el.remove();
                    
                    if (data && data.odpowiedz) {
                        appendMessage(data.odpowiedz, 'received', null, data.infoRejon);
                    } else {
                        appendMessage(tChat.blad, 'received');
                    }
                } catch(e) {
                    const el = document.getElementById(loadingId);
                    if(el) el.remove();
                    appendMessage(tChat.blad, 'received');
                }
            };

            function appendMessage(text, type, id = null, infoRejon = null) {
                const bubble = document.createElement('div');
                bubble.className = type === 'sent' ? 'chat-bubble-sent' : 'chat-bubble-received';
                if(id) bubble.id = id;
                
                let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                bubble.innerHTML = formattedText.replace(/\n/g, '<br>');

                if (infoRejon && infoRejon.trim() !== '') {
                    const uniqueId = 'info-' + Math.random().toString(36).substring(2, 9);
                    const infoBlock = document.createElement('div');
                    infoBlock.style.marginTop = '10px';
                    infoBlock.style.paddingTop = '8px';
                    infoBlock.style.borderTop = '1px dashed #cbd5e1';

                    infoBlock.innerHTML = `
                        <a href="javascript:void(0)" id="btn-${uniqueId}" style="color: #16a34a; font-weight: bold; text-decoration: underline; font-size: 13px; display: inline-flex; align-items: center; gap: 4px;">
                            ℹ️ Pokaż informację o tym rejonie
                        </a>
                        <div id="content-${uniqueId}" style="display: none; margin-top: 8px; padding: 10px; background: #f1f5f9; border-left: 3px solid #16a34a; border-radius: 4px; font-size: 12.5px; line-height: 1.5; color: #1e293b;">
                            ${infoRejon.replace(/\n/g, '<br>')}
                        </div>
                    `;

                    bubble.appendChild(infoBlock);

                    const btn = infoBlock.querySelector(`#btn-${uniqueId}`);
                    const content = infoBlock.querySelector(`#content-${uniqueId}`);

                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const isOpen = content.style.display === 'block';
                        content.style.display = isOpen ? 'none' : 'block';
                        btn.innerHTML = isOpen ? 'ℹ️ Pokaż informację o tym rejonie' : '🔼 Ukryj informację o rejonie';
                        messagesArea.scrollTop = messagesArea.scrollHeight;
                    });
                }
                
                messagesArea.appendChild(bubble);
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooterAndAssistant);
    } else {
        initFooterAndAssistant();
    }
})();
