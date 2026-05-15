# SECP — Dokumentacja Systemu
## Smart Employee Control Panel | KSM-Group | Autor: Michał Kucia

---

## 🌐 ADRESY URL

| Moduł | Adres | Opis |
|-------|-------|------|
| **Lista obecności** | `https://ksm-group.github.io/lista-obecnosci/` | Główny panel zarządzania |
| **Dashboard** | `https://ksm-group.github.io/lista-obecnosci/dashboard.html` | Wykresy i statystyki |
| **Landing Page** | `https://ksm-group.github.io/secp-app/` | Strona prezentacyjna SECP |
| **Panel QR** | `https://ksm-group.github.io/secp-app/secp_qr_panel.html` | Kody QR przy wejściu |
| **Aplikacja pracownika** | `https://ksm-group.github.io/secp-app/secp_employee.html` | PWA dla pracownika |
| **Panel admina** | `https://ksm-group.github.io/secp-app/secp_admin.html` | Zarządzanie, delegacje, raporty |

---

## 👤 KTO MOŻE SIĘ ZALOGOWAĆ?

### Lista obecności i Dashboard
- **Tylko admin** — logowanie emailem `kucia.michal@gmail.com` + hasło
- Opcjonalnie: logowanie przez Microsoft 365 (wymaga konfiguracji Azure)

### Aplikacja pracownika
- **Tylko pracownicy z listy SECP** — logowanie **imieniem i nazwiskiem**
- Dokładnie takim jak zostało wpisane na liście obecności (np. `Jan Kowalski`)
- System weryfikuje czy imię i nazwisko istnieje w bazie
- Jeśli pracownika nie ma na liście → **brak dostępu**

### Panel QR
- Dostęp publiczny (wyświetla kody QR)
- Ustawienia chronione **PIN-em: 7777** (można zmienić po zalogowaniu)

### Panel admina
- Dostęp przez przeglądarkę bez logowania (zalecane tylko na urządzeniu admina)

---

## 🔄 JAK DZIAŁA REJESTRACJA OBECNOŚCI?

```
1. Admin wyświetla Panel QR na ekranie przy wejściu
   ↓
2. Pracownik skanuje odpowiedni kod QR telefonem
   ↓
3. Otwiera się aplikacja pracownika w przeglądarce
   ↓
4. Pracownik loguje się imieniem i nazwiskiem (raz — sesja jest zapamiętana)
   ↓
5. Obecność zostaje zarejestrowana w Google Sheets
   ↓
6. Admin widzi dane w Liście obecności i Panelu admina
```

---

## 📱 KODY QR — LEGENDA

| Kod | Kolor | Akcja |
|-----|-------|-------|
| 🟢 **WEJŚCIE** | Zielony | Rozpoczęcie pracy / Powrót z przerwy |
| 🔴 **WYJŚCIE** | Czerwony | Zakończenie pracy |
| 🟡 **START PRZERWY** | Żółty | Wychodzę na przerwę |
| 🟣 **KONIEC PRZERWY** | Fioletowy | Wracam do pracy |

**Bezpieczeństwo QR:**
- Kody zmieniają się automatycznie co **15 minut**
- Pętla **20 unikalnych kodów** — po 20 wraca do początku
- Nie można "wysłać kodu znajomemu" bo za chwilę wygaśnie

---

## ⚙️ PANEL QR — USTAWIENIA

Kliknij ⚙️ w prawym górnym rogu → wprowadź PIN

| Ustawienie | Domyślna wartość | Opis |
|-----------|-----------------|------|
| PIN admina | **7777** | Zmień po pierwszym uruchomieniu! |
| Nazwa firmy | Moja Firma | Wyświetlana w nagłówku |
| Tajny klucz | SECP-2026 | Klucz szyfrujący kody QR |
| Czas zmiany kodu | 15 minut | Co ile zmienia się kod |
| Liczba kodów | 20 | Długość pętli |
| URL aplikacji pracownika | secp_employee.html | Link otwierany po skanowaniu |

---

## 📋 DELEGACJE

1. Pracownik otwiera **aplikację pracownika**
2. Klika **"Zgłoś delegację"** i opisuje cel
3. Wniosek trafia do **Panelu admina** → zakładka Delegacje
4. Admin klika **Zatwierdź** lub **Odrzuć**

---

## 📄 RAPORT DZIENNY

Panel admina → **Raport dzienny** → przycisk **Eksportuj PDF**

Zawiera:
- Liczbę obecnych / nieobecnych
- Spóźnienia
- Delegacje
- Godziny przepracowane per pracownik

---

## 🔧 PIERWSZE URUCHOMIENIE — LISTA KONTROLNA

- [ ] Zmień hasło w pliku `index.html` (znajdź `USTAW_HASLO_TUTAJ`)
- [ ] Zmień hasło w pliku `dashboard.html` (to samo)
- [ ] Zmień PIN w Panelu QR (domyślny: **7777**)
- [ ] Zmień tajny klucz QR w ustawieniach (domyślny: `SECP-2026`)
- [ ] Dodaj pracowników do listy obecności
- [ ] Przetestuj skanowanie QR telefonem

---

## 🗂️ STRUKTURA PLIKÓW

```
lista-obecnosci/
├── index.html          ← Lista obecności (główny panel)
└── dashboard.html      ← Dashboard analityczny

secp-app/
├── index.html          ← Landing page SECP
├── secp_qr_panel.html  ← Panel z kodami QR (ekran przy wejściu)
├── secp_employee.html  ← Aplikacja pracownika (PWA)
├── secp_admin.html     ← Panel admina
└── manifest.json       ← Konfiguracja PWA
```

---

## ☁️ BAZA DANYCH

Wszystkie dane przechowywane w **Google Sheets** via Apps Script.

| Dane | Lokalizacja |
|------|------------|
| Pracownicy, grupy | Arkusz `SECP-Data` → komórka A1 (JSON) |
| Statusy obecności | j.w. |
| Zdarzenia QR | j.w. — pole `attendance` |
| Delegacje | j.w. — pole `delegations` |

---

*Dokumentacja SECP v1.0 | KSM-Group | © 2026 Michał Kucia*
