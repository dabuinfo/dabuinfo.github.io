# dabuinfo.github.io

<div align="center">
  <!-- Kontener wideo z przyciskiem Play/Pause -->
  <div class="video-hero-container">
    <video id="heroVideo" autoplay loop muted playsinline>
      <source src="96656272_1786735918255625.mp4" type="video/mp4">
      Twoja przeglądarka nie obsługuje tagu video.
    </video>

    <button id="toggleBtn" class="control-btn" aria-label="Wstrzymaj / Odtwórz">
      <!-- Ikona Pauzy (dwie kreski) -->
      <svg id="iconPause" viewBox="0 0 24 24">
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
      </svg>
      <!-- Ikona Play (obrysowany trójkąt jak na wzorze) -->
      <svg id="iconPlay" viewBox="0 0 24 24" style="display: none;">
        <path d="M8 5v14l11-7z" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>
  </div>

  <h2>🚛 Terminy wystawek w Niemczech (Sperrmüll)</h2>
</div>

<style>
.video-hero-container {
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  line-height: 0;
}

.video-hero-container video {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
}

/* Półprzezroczysty przycisk w prawym górnym rogu */
.control-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.1s ease;
  backdrop-filter: blur(4px);
  padding: 0;
  z-index: 10;
}

.control-btn:hover {
  background: rgba(0, 0, 0, 0.75);
}

.control-btn:active {
  transform: scale(0.95);
}

.control-btn svg {
  width: 22px;
  height: 22px;
  fill: #ffffff;
  color: #ffffff;
}
</style>

<script>
const video = document.getElementById('heroVideo');
const btn = document.getElementById('toggleBtn');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');

btn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
  } else {
    video.pause();
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
  }
});
</script>

---

### 🌐 Oficjalna strona
Wszystkie aktualne informacje, rozpiski oraz konfigurator zamówień znajdziesz na stronie:  
👉 **[dabu-info.com](https://dabu-info.com)**

---

### 📌 O projekcie
* 🗺️ **Obszar działania:** Niemcy (wybrane landy i powiaty)
* ⚡ **Aktualizacja:** Terminy wywozu gabarytów, elektroodpadów oraz metalu synchronizowane na bieżąco
* 🛠️ **Formaty:** PDF (druk / smartfon), JPG oraz Panel Klienta Online

---

<div align="center">
  <sub>© 2026 Dabu-Info. Wszelkie prawa zastrzeżone.</sub>
</div>
