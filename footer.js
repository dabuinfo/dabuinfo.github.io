// footer.js - Centralna stopka oraz wielojęzyczny asystent dla dabu-info
(function() {
    function initFooterAndAssistant() {
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
                .dabu-footer-contact { list-style: none; padding: 0; margin: 0; font-size: 0.9em; line-height: 1.9; }
                .dabu-footer-contact li a { color: #3498db; text-decoration: none; transition: color 0.3s ease; }
                .dabu-footer-contact li a:hover { color: #2ecc71; text-decoration: underline; }
                .dabu-footer-contact strong { color: #e0e0e0; }

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
                    position: fixed !important; bottom: 90px !important; right: 20px !important; width: 350px !important; max-width: 90vw !important;
                    height: 480px !important; max-height: 70vh !important; background: white !important; border-radius: 10px !important;
                    box-shadow: 0 5px 25px rgba(0,0,0,0.4) !important; display: none; flex-direction: column !important;
                    z-index: 100000 !important; overflow: hidden !important; font-size: 14px !important; line-height: 1.4 !important; color: #000 !important;
                }
                .chat-header { background: var(--theme-color); color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
                #chat-messages-area { flex: 1; overflow-y: auto; padding: 15px; background: #f5f5f5; display: flex; flex-direction: column; gap: 8px; }
                .chat-bubble-sent { background: var(--theme-color); color: white; padding: 10px 14px; border-radius: 15px 15px 2px 15px; max-width: 85%; align-self: flex-end; text-align: left; word-wrap: break-word; }
                .chat-bubble-received { background: #e0e0e0; color: black; padding: 10px 14px; border-radius: 15px 15px 15px 2px; max-width: 85%; align-self: flex-start; word-wrap: break-word; }
                .chat-input-area { display: flex; padding: 10px; border-top: 1px solid #ddd; background: white; align-items: stretch; }
                #chat-user-input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; outline: none; }
                .chat-send-button { margin-left: 10px; padding: 0 15px; background: var(--theme-color); color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }

                @media (max-width: 768px) {
                    .dabu-footer { padding: 35px 15px 15px; }
                    .dabu-footer-container { flex-direction: column; gap: 25px; text-align: center; }
                    .dabu-footer-boxes { gap: 8px; }
                    .dabu-footer-boxes li a { font-size: 0.8em; padding: 7px 12px; }
                    #chat-main-window { bottom: 85px !important; left: 15px !important; right: 15px !important; width: auto !important; max-width: none !important; }
                }
            `;
            document.head.appendChild(style);
        }

        const currentYear = new Date().getFullYear();

        // 2. TWORZENIE STOPKI (jeśli nie istnieje)
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
                            <li>📞 Zamówienia: <a href="tel:+48600812820">+48 600 812 820</a></li>
                            <li>📧 E-mail: <a href="mailto:kontakt@dabu-info.com">kontakt@dabu-info.com</a></li>
                            <li><a href="https://calendar.app.google/BY6HkVsjGmfvYkQ76" target="_blank" rel="noopener noreferrer">📍 56-300 Milicz (umów spotkanie)</a></li>
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
                        <li><a href="https://dabu-info.com/zestaw.html">Zestaw Tygodniowy</a></li>
                        <li><a href="https://dabu-info.com/mapa.html">Mapa Wystawek</a></li>
                        <li><a href="https://dabu-info.com/kalendarz.html">Kalendarz Wystawek</a></li>
                        <li><a href="https://dabu-info.com/data.html">Bazy Danych</a></li>
                        <li><a href="https://dabu-info.com/gieldy.html">Adresy Giełd</a></li>
                        <li><a href="https://dabu-info.blogspot.com/" target="_blank">Blog dabu-info</a></li>
                        <li><a href="https://dabu-info.com/politykaprywatnosci.html">Polityka Prywatności</a></li>
                    </ul>
                </div>
                
                <div class="dabu-footer-bottom">
                    <p>&copy; <span>${currentYear}</span> <a href="https://dabu-info.com/">dabu-info</a>. Wszelkie prawa zastrzeżone.</p>
                </div>
            `;
            document.body.appendChild(footerElement);
        }

        // 3. TWORZENIE ASYSTENTA (niezależne sprawdzenie)
        if (!document.getElementById('chat-toggle-btn')) {
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby3T_TzlSpGWdkBDgGWHh9Jcvhg2Kmzc16cb0C2IW8Rs2pfNtcppyo1OwrLQZ8icyattg/exec';

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
                    <div style="text-align: center; color: #b0b0b0; font-family: sans-serif; padding: 10px 0 15px 0; background: white; font-size: 12px; letter-spacing: 1px; opacity: 0.6;">
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

            const slownik = {
                de: {
                    powitanie: "Hallo! Geben Sie den Namen der Stadt oder die Adresse ein, um verfügbare Termine zu prüfen.",
                    placeholder: "Stadt oder Adresse eingeben...",
                    wyslij: "Senden",
                    ladowanie: "🤔 Suche...",
                    blad: "❌ Serverfehler."
                },
                pl: {
                    powitanie: "Cześć! Wpisz nazwę miejscowości, numer tygodnia lub adres, aby sprawdzić dostępne terminy.",
                    placeholder: "Wpisz miejscowość lub adres...",
                    wyslij: "Wyślij",
                    ladowanie: "🤔 Szukam...",
                    blad: "❌ Błąd serwera."
                },
                en: {
                    powitanie: "Hi! Enter the city name or address to check available dates.",
                    placeholder: "Enter city or address...",
                    wyslij: "Send",
                    ladowanie: "🤔 Searching...",
                    blad: "❌ Server error."
                },
                ro: {
                    powitanie: "Salut! Introduceți numele orașului sau adresa pentru a verifica datele disponibile de colectare.",
                    placeholder: "Introduceți orașul sau adresa...",
                    wyslij: "Trimite",
                    ladowanie: "🤔 Se caută...",
                    blad: "❌ Eroare de server."
                },
                bg: {
                    powitanie: "Здравейте! Въведете име на град или адрес, за да проверите свободните дати за извозване.",
                    placeholder: "Въведете град или адрес...",
                    wyslij: "Изпрати",
                    ladowanie: "🤔 Търсене...",
                    blad: "❌ Сървърна грешка."
                },
                hu: {
                    powitanie: "Szia! Add meg a település nevét vagy a címet az elérhető lomtalanítási időpontok ellenőrzéséhez.",
                    placeholder: "Település vagy cím...",
                    wyslij: "Küldés",
                    ladowanie: "🤔 Keresés...",
                    blad: "❌ Szerverhiba."
                },
                cs: {
                    powitanie: "Ahoj! Zadejte název obce nebo adresu pro kontrolu dostupných termínů svozu.",
                    placeholder: "Zadejte město nebo adresu...",
                    wyslij: "Odeslat",
                    ladowanie: "🤔 Hledám...",
                    blad: "❌ Chyba serveru."
                },
                sk: {
                    powitanie: "Ahoj! Zadajte názov obce alebo adresu pre kontrolu dostupných termínov zberu.",
                    placeholder: "Zadajte mesto alebo adresu...",
                    wyslij: "Odoslať",
                    ladowanie: "🤔 Hľadám...",
                    blad: "❌ Chyba servera."
                },
                bs: {
                    powitanie: "Pozdrav! Unesite naziv mjesta ili adresu kako biste provjerili dostupne termine odvoza.",
                    placeholder: "Unesite grad ili adresu...",
                    wyslij: "Pošalji",
                    ladowanie: "🤔 Tražim...",
                    blad: "❌ Greška na serveru."
                },
                hr: {
                    powitanie: "Pozdrav! Unesite naziv mjesta ili adresu kako biste provjerili dostupne termine odvoza.",
                    placeholder: "Unesite grad ili adresu...",
                    wyslij: "Pošalji",
                    ladowanie: "🤔 Tražim...",
                    blad: "❌ Greška na serveru."
                },
                uk: {
                    powitanie: "Вітаємо! Введіть назву населеного пункту або адресу, щоб перевірити графік вивозу великогабаритного сміття.",
                    placeholder: "Введіть місто або адресу...",
                    wyslij: "Надіслати",
                    ladowanie: "🤔 Пошук...",
                    blad: "❌ Помилка сервера."
                },
                ru: {
                    powitanie: "Здравствуйте! Введите название города или адрес, чтобы узнать доступные даты вывоза крупногабаритного мусора.",
                    placeholder: "Введите город или адрес...",
                    wyslij: "Отправить",
                    ladowanie: "🤔 Поиск...",
                    blad: "❌ Ошибка сервера."
                },
                tr: {
                    powitanie: "Merhaba! Mevcut kaba atık toplama tarihlerini öğrenmek için şehir adı veya adres girin.",
                    placeholder: "Şehir veya adres girin...",
                    wyslij: "Gönder",
                    ladowanie: "🤔 Aranıyor...",
                    blad: "❌ Sunucu hatası."
                }
            };

            let browserLang = (navigator.language || navigator.userLanguage).substring(0, 2).toLowerCase();
            let cLang = slownik[browserLang] ? browserLang : 'de'; 
            let tChat = slownik[cLang];

            headerTitle.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span style="font-family:Arial Black; font-size:16px;">DABU-INFO ASYSTENT</span>
                </div>
                <span id="close-chat-btn" style="cursor:pointer; font-size: 16px; padding: 5px;">❌</span>
            `;

            userInput.placeholder = tChat.placeholder;
            sendBtn.innerText = tChat.wyslij;
            messagesArea.innerHTML = `<div class="chat-bubble-received">${tChat.powitanie}</div>`;

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
                        body: JSON.stringify({ akcja: 'szukaj_terminow', zapytanie: text, jezyk: cLang })
                    });
                    const data = await resp.json();
                    
                    const el = document.getElementById(loadingId);
                    if(el) el.remove();
                    
                    if (data && data.odpowiedz) {
                        appendMessage(data.odpowiedz, 'received');
                    } else {
                        appendMessage(tChat.blad, 'received');
                    }
                } catch(e) {
                    const el = document.getElementById(loadingId);
                    if(el) el.remove();
                    appendMessage(tChat.blad, 'received');
                }
            };

            function appendMessage(text, type, id = null) {
                const bubble = document.createElement('div');
                bubble.className = type === 'sent' ? 'chat-bubble-sent' : 'chat-bubble-received';
                if(id) bubble.id = id;
                
                let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                bubble.innerHTML = formattedText.replace(/\n/g, '<br>');
                
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
