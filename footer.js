<!-- KONFIGURATOR WYJAZDU 7 DNI: DOWOLNE NAKŁADKI NA WYBRANE PAŃSTWO (100 PLN / 25 € ZA NAKŁADKĘ) -->
                <div class="single-trip-promo">
                    <div class="single-trip-header">
                        <div>
                            <div class="single-trip-title">🎯 Konfigurator na 1 Państwo (7 dni) – wybierz dowolne nakładki na jedną mapę!</div>
                            <div style="font-size: 0.9rem; color: var(--muted-text); margin-top: 3px;">
                                Zaznacz jedną lub kilka branż, które chcesz widzieć naraz na wspólnej mapie wybranego kraju (np. Rowery + Kosiarki + Myjki na Niemcy).
                            </div>
                        </div>
                        <div class="single-trip-price-badge">
                            +<span id="priceSingleTrip">100 PLN</span> / 1 nakładka (7 dni)
                        </div>
                    </div>

                    <div>
                        <label style="margin-bottom: 10px; font-size: 0.92rem;">1. Zaznacz nakładki serwisowe, które mają znaleźć się na Twojej mapie (możesz zaznaczyć kilka):</label>
                        <div class="overlays-grid" id="overlaysGrid">
                            <label class="overlay-checkbox-card">
                                <input type="checkbox" name="tripOverlay" value="Rowery Bosch eBike" data-countries="Niemcy,Włochy,Francja,Szwajcaria,Holandia,Austria,Belgia,Polska,Czechy,Dania,Norwegia,Szwecja,Islandia,Luksemburg,Wielka Brytania,Hiszpania,Finlandia" onchange="przeliczNakladkiWyjazd(this)">
                                <span class="overlay-card-text">
                                    <span>🚲 Rowery: Bosch eBike</span>
                                    <span class="overlay-card-sub">+<span class="lblSinglePrice">100 PLN</span></span>
                                </span>
                            </label>
                            <label class="overlay-checkbox-card">
                                <input type="checkbox" name="tripOverlay" value="Kosiarki Husqvarna" data-countries="Niemcy,Francja,Włochy,Austria,Szwajcaria,Polska,Szwecja,Norwegia,Wielka Brytania,Holandia,Czechy,Belgia,Dania,Hiszpania,Finlandia" onchange="przeliczNakladkiWyjazd(this)">
                                <span class="overlay-card-text">
                                    <span>🚜 Kosiarki: Husqvarna</span>
                                    <span class="overlay-card-sub">+<span class="lblSinglePrice">100 PLN</span></span>
                                </span>
                            </label>
                            <label class="overlay-checkbox-card">
                                <input type="checkbox" name="tripOverlay" value="Serwisy STIHL" data-countries="Niemcy,Polska,Francja,Wielka Brytania,Włochy,San Marino,Malta,Szwajcaria,Liechtenstein,Austria,Dania,Norwegia,Szwecja,Finlandia,Belgia,Holandia,Luksemburg,Hiszpania,Czechy" onchange="przeliczNakladkiWyjazd(this)">
                                <span class="overlay-card-text">
                                    <span>🪚 Serwisy i Dilerzy: STIHL</span>
                                    <span class="overlay-card-sub">+<span class="lblSinglePrice">100 PLN</span></span>
                                </span>
                            </label>
                            <label class="overlay-checkbox-card">
                                <input type="checkbox" name="tripOverlay" value="Złomowiska Schrottplätze DE" data-countries="Niemcy" onchange="przeliczNakladkiWyjazd(this)">
                                <span class="overlay-card-text">
                                    <span>♻️ Złomowiska: Schrottplätze DE</span>
                                    <span class="overlay-card-sub">+<span class="lblSinglePrice">100 PLN</span> 🔒 Tylko Niemcy</span>
                                </span>
                            </label>
                            <label class="overlay-checkbox-card">
                                <input type="checkbox" name="tripOverlay" value="Wypożyczalnie maszyn Bauma DE" data-countries="Niemcy" onchange="przeliczNakladkiWyjazd(this)">
                                <span class="overlay-card-text">
                                    <span>🏗️ Wypożyczalnie maszyn: Bauma DE</span>
                                    <span class="overlay-card-sub">+<span class="lblSinglePrice">100 PLN</span> 🔒 Tylko Niemcy</span>
                                </span>
                            </label>
                            <label class="overlay-checkbox-card">
                                <input type="checkbox" name="tripOverlay" value="Myjki Kärcher" data-countries="Niemcy,Polska,Norwegia,Holandia,Dania,Hiszpania,Szwajcaria,Włochy,Czechy,Belgia,Austria,Wielka Brytania,Francja,Finlandia,Szwecja" onchange="przeliczNakladkiWyjazd(this)">
                                <span class="overlay-card-text">
                                    <span>⚡ Myjki: Kärcher</span>
                                    <span class="overlay-card-sub">+<span class="lblSinglePrice">100 PLN</span></span>
                                </span>
                            </label>
                            <label class="overlay-checkbox-card">
                                <input type="checkbox" name="tripOverlay" value="Maszyny Wacker Neuson" data-countries="Niemcy,Włochy,Francja,Wielka Brytania,Polska,Norwegia,Rumunia,Szwajcaria,Holandia,Austria,Szwecja,Czechy,Finlandia,Bułgaria,Dania,Hiszpania" onchange="przeliczNakladkiWyjazd(this)">
                                <span class="overlay-card-text">
                                    <span>🏗️ Maszyny: Wacker Neuson</span>
                                    <span class="overlay-card-sub">+<span class="lblSinglePrice">100 PLN</span></span>
                                </span>
                            </label>
                            <label class="overlay-checkbox-card">
                                <input type="checkbox" name="tripOverlay" value="Quady / ATV Multibrand" data-countries="Polska,Niemcy,Francja,Austria,Szwajcaria,Belgia,Holandia,Luksemburg,Szwecja,Norwegia,Finlandia,Czechy,Hiszpania,Wielka Brytania,Włochy" onchange="przeliczNakladkiWyjazd(this)">
                                <span class="overlay-card-text">
                                    <span>🏍️ Quady / ATV Multibrand</span>
                                    <span class="overlay-card-sub">+<span class="lblSinglePrice">100 PLN</span></span>
                                </span>
                            </label>
                            <label class="overlay-checkbox-card">
                                <input type="checkbox" name="tripOverlay" value="Kringloop & Vintage" data-countries="Holandia,Belgia" onchange="przeliczNakladkiWyjazd(this)">
                                <span class="overlay-card-text">
                                    <span>🏺 Kringloop & Vintage</span>
                                    <span class="overlay-card-sub">+<span class="lblSinglePrice">100 PLN</span> 🔒 Tylko Holandia / Belgia</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div class="single-trip-bottom-bar">
                        <div>
                            <select id="singleTripCountry" onchange="zmianaKrajuKonfiguratora()">
                                <option value="">2. Wybierz państwo docelowe wyjazdu...</option>
                                <option value="Austria">🇦🇹 Austria</option>
                                <option value="Belgia">🇧🇪 Belgia</option>
                                <option value="Czechy">🇨🇿 Czechy</option>
                                <option value="Dania">🇩🇰 Dania</option>
                                <option value="Finlandia">🇫🇮 Finlandia</option>
                                <option value="Francja">🇫🇷 Francja</option>
                                <option value="Hiszpania">🇪🇸 Hiszpania</option>
                                <option value="Holandia">🇳🇱 Holandia</option>
                                <option value="Luksemburg">🇱🇺 Luksemburg</option>
                                <option value="Niemcy">🇩🇪 Niemcy</option>
                                <option value="Norwegia">🇳🇴 Norwegia</option>
                                <option value="Polska">🇵🇱 Polska</option>
                                <option value="Szwajcaria">🇨🇭 Szwajcaria</option>
                                <option value="Szwecja">🇸🇪 Szwecja</option>
                                <option value="Wielka Brytania">🇬🇧 Wielka Brytania</option>
                                <option value="Włochy">🇮🇹 Włochy</option>
                            </select>
                            <div id="countryLockHint" class="country-lock-hint"></div>
                        </div>

                        <div class="trip-summary-box" id="tripSummaryBox">
                            Wybrane nakładki: <strong id="tripCount">0</strong><br>
                            Suma za 7 dni: <span class="trip-summary-total" id="tripTotalAmount">0 PLN</span>
                        </div>

                        <div>
                            <button type="button" class="single-trip-btn" id="btnOrderSingleTrip" onclick="zamowJedenSerwisKraj()">
                                Zamów wybrane nakładki (7 dni)
                            </button>
                        </div>
                    </div>
                </div>
