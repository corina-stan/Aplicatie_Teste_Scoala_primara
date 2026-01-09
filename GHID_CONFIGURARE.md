# 📋 GHID COMPLET DE CONFIGURARE

## 🎯 Pași Finali pentru Instalare

După ce ați urmat pașii din `INSTRUCTIUNI_INSTALARE.md`, urmați acești pași pentru a configura toate fișierele:

## ✅ Lista de Verificare

### 1. Structura de Foldere Creată
Asigurați-vă că ați creat următoarele foldere în proiect:
```
src/app/
├── components/
│   ├── login/
│   ├── header/
│   ├── dashboard/
│   ├── test-list/
│   ├── test-form/
│   └── test-solve/
├── models/
├── services/
└── guards/
```

### 2. Fișiere de Configurat

#### Fișiere în Rădăcina Proiectului (`teste-scolare/`)
- [x] `db.json` - Baza de date
- [x] `package.json` - Dependențe
- [x] `angular.json` - Configurare Angular
- [x] `tsconfig.json` - Configurare TypeScript
- [x] `tsconfig.app.json` - Configurare aplicație
- [x] `README.md` - Documentație

#### Fișiere în `src/`
- [x] `index.html` - Pagina principală
- [x] `main.ts` - Entry point
- [x] `styles.css` - Stiluri globale

#### Fișiere în `src/app/`
- [x] `app.module.ts` - Module principale
- [x] `app-routing.module.ts` - Rute
- [x] `app.component.ts` - Componenta rădăcină
- [x] `app.component.html` - Template rădăcină
- [x] `app.component.css` - Stiluri rădăcină

#### Fișiere în `src/app/models/`
- [x] `user.model.ts` - Model utilizator
- [x] `test.model.ts` - Model test

#### Fișiere în `src/app/services/`
- [x] `auth.service.ts` - Serviciu autentificare
- [x] `test.service.ts` - Serviciu teste

#### Fișiere în `src/app/guards/`
- [x] `auth.guard.ts` - Guard autentificare
- [x] `role.guard.ts` - Guard roluri

#### Componenta Login (`src/app/components/login/`)
- [x] `login.component.ts`
- [x] `login.component.html`
- [x] `login.component.css`

#### Componenta Header (`src/app/components/header/`)
- [x] `header.component.ts`
- [x] `header.component.html`
- [x] `header.component.css`

#### Componenta Dashboard (`src/app/components/dashboard/`)
- [x] `dashboard.component.ts`
- [x] `dashboard.component.html`
- [x] `dashboard.component.css`

#### Componenta Test List (`src/app/components/test-list/`)
- [x] `test-list.component.ts`
- [x] `test-list.component.html`
- [x] `test-list.component.css`

#### Componenta Test Form (`src/app/components/test-form/`)
- [x] `test-form.component.ts`
- [x] `test-form.component.html`
- [x] `test-form.component.css`

#### Componenta Test Solve (`src/app/components/test-solve/`)
- [x] `test-solve.component.ts`
- [x] `test-solve.component.html`
- [x] `test-solve.component.css`

## 🚀 Pași de Pornire Rapidă

### Metoda 1: Pas cu Pas (Recomandat pentru Prima Dată)

**Terminal 1 - JSON Server:**
```bash
cd teste-scolare
json-server --watch db.json --port 3000
```
✅ Lăsați deschis!

**Terminal 2 - Angular:**
```bash
cd teste-scolare
ng serve
```
✅ Lăsați deschis!

**Browser:**
```
http://localhost:4200
```

### Metoda 2: Un Singur Terminal (Avansați)

Puteți crea un fișier `start.bat` (Windows) cu:
```batch
@echo off
start cmd /k "json-server --watch db.json --port 3000"
timeout /t 3
start cmd /k "ng serve"
timeout /t 10
start http://localhost:4200
```

Sau `start.sh` (Mac/Linux):
```bash
#!/bin/bash
json-server --watch db.json --port 3000 &
ng serve &
sleep 10
open http://localhost:4200
```

## 📝 Verificare Instalare

### 1. Verificați JSON Server
Accesați în browser:
```
http://localhost:3000/users
```
Ar trebui să vedeți lista de utilizatori în format JSON.

### 2. Verificați Angular
Accesați în browser:
```
http://localhost:4200
```
Ar trebui să vedeți pagina de login.

### 3. Test Autentificare
Folosiți:
- Email: `admin@teste.ro`
- Parolă: `admin123`

## ❌ Troubleshooting

### Eroare: "Cannot find module '@angular/core'"
```bash
npm install
```

### Eroare: "Port 4200 already in use"
```bash
ng serve --port 4300
```
Apoi accesați: `http://localhost:4300`

### Eroare: "db.json not found"
Verificați că fișierul `db.json` este în folderul rădăcină al proiectului.

### Aplicația se încarcă dar nu afișează date
1. Verificați că JSON Server rulează
2. Deschideți Console-ul browser (F12)
3. Verificați erorile în tab-ul "Console"
4. Verificați Network tab pentru request-uri failed

### "Cannot GET /api/..."
JSON Server ar trebui să fie la `http://localhost:3000`, nu altă adresă.

## 📦 Comenzi NPM Utile

```bash
# Instalare dependențe
npm install

# Curățare node_modules și reinstalare
rm -rf node_modules package-lock.json
npm install

# Build pentru producție
ng build --prod

# Verificare versiuni
node --version
npm --version
ng version

# Verificare pachete outdated
npm outdated

# Update pachete
npm update
```

## 🎨 Personalizare

### Schimbarea Culorilor Principale
Editați `src/styles.css`:
```css
/* Găsiți și înlocuiți */
#667eea  /* Culoare primară */
#764ba2  /* Culoare secundară */
```

### Schimbarea Logo-ului
Înlocuiți iconița în `src/app/components/header/header.component.html`:
```html
<i class="bi bi-book-fill me-2"></i>
<!-- Înlocuiți cu alt icon de la Bootstrap Icons -->
```

### Adăugare Date Contact
Editați `src/app/components/header/header.component.ts`:
```typescript
adminContact = {
  email: 'email-tau@domeniu.ro',
  phone: '+40 xxx xxx xxx'
};
```

## 🔐 Securitate (Pentru Producție)

1. **Nu folosiți JSON Server în producție**
2. **Hash-uiți parolele** - folosiți bcrypt sau similar
3. **Folosiți JWT** pentru autentificare
4. **Validați input-ul** pe server
5. **Folosiți HTTPS**
6. **Configurați CORS** corect

## 📊 Monitorizare

### Verificare Console pentru Erori
Deschideți Developer Tools (F12) și verificați:
- **Console**: Pentru erori JavaScript
- **Network**: Pentru request-uri failed
- **Application**: Pentru localStorage

### Verificare JSON Server Logs
În terminalul unde rulează JSON Server veți vedea:
```
GET /tests 200 15.123 ms - 3456
POST /tests 201 8.456 ms - 234
```

## 🎓 Următorii Pași

1. **Testați toate funcționalitățile**
   - Login cu fiecare tip de utilizator
   - Creare/editare/ștergere teste
   - Rezolvare teste

2. **Personalizați aplicația**
   - Culori
   - Logo
   - Texte

3. **Adăugați mai multe teste**
   - Folosiți contul de admin sau părinte
   - Creați teste pentru toate clasele

4. **Backups**
   - Salvați regulat fișierul `db.json`
   - Faceți commit în Git

5. **Documentare**
   - Notați schimbările făcute
   - Documentați procesele

## ✅ Checklist Final

- [ ] Node.js instalat
- [ ] Angular CLI instalat
- [ ] Proiect creat
- [ ] Bootstrap instalat
- [ ] JSON Server instalat
- [ ] Toate fișierele copiate
- [ ] npm install executat
- [ ] JSON Server pornește corect
- [ ] Angular pornește corect
- [ ] Aplicația se încarcă în browser
- [ ] Login funcționează
- [ ] Testele se încarcă
- [ ] Pot crea un test nou
- [ ] Pot rezolva un test

## 📞 Suport

Dacă întâmpinați probleme:
1. Verificați din nou toate fișierele
2. Verificați console-ul browser pentru erori
3. Verificați că ambele servere rulează
4. Citiți din nou documentația
5. Verificați versiunile pachetelor

---

**Mult succes cu proiectul! 🎉**
