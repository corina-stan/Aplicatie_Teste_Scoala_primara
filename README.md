# 📚 Teste Școlare - Platformă Educațională

## 📋 Despre Proiect

Platformă web educațională pentru teste grilă la **Matematică și explorarea mediului (MEM)** și **Comunicare în Limba Română (CLR)**, pentru clasele I-IV.

### ✨ Funcționalități Principale

#### 👨‍💼 Administrator
- ✅ Drepturi depline de administrare
- ✅ Poate adăuga, modifica și șterge orice test
- ✅ Vizualizare completă a tuturor testelor

#### 👨‍👩‍👧 Părinte
- ✅ Poate adăuga teste noi
- ✅ Poate modifica/șterge doar testele create de el
- ✅ Poate rezolva teste pentru testare

#### 👶 Copil
- ✅ Poate rezolva testele disponibile
- ✅ Vizualizare rezultate și răspunsuri corecte
- ✅ Poate relua testele

### 🎨 Caracteristici Tehnice

- **Framework**: Angular 17
- **Design**: Bootstrap 5.3 + Bootstrap Icons
- **Bază de Date**: JSON Server (local)
- **Routing**: Angular Router cu Guards
- **Autentificare**: Custom Auth Service
- **Responsive**: Design adaptiv pentru toate dispozitivele

## 🚀 Instalare și Configurare

### Cerințe Preliminare

1. **Node.js** (versiunea 18 sau mai nouă)
2. **npm** (vine cu Node.js)
3. **Angular CLI** (se instalează global)

### Pași de Instalare

#### 1. Instalați Node.js

Descărcați și instalați de la: https://nodejs.org/
Verificați instalarea:
```bash
node --version
npm --version
```

#### 2. Instalați Angular CLI

```bash
npm install -g @angular/cli
```

Verificați instalarea:
```bash
ng version
```

#### 3. Creați Proiectul

```bash
# Navigați în folderul dorit
cd C:\Users\NumeleTau\Desktop

# Creați proiectul
ng new teste-scolare

# La întrebări răspundeți:
# Would you like to add Angular routing? → y
# Which stylesheet format? → CSS

# Intrați în folder
cd teste-scolare
```

#### 4. Instalați Dependențele

```bash
# Bootstrap și Bootstrap Icons
npm install bootstrap bootstrap-icons

# JSON Server (pentru baza de date)
npm install -g json-server
```

#### 5. Copiați Fișierele

Copiați toate fișierele din acest proiect în folderul `teste-scolare` creat.

Structura finală ar trebui să arate așa:
```
teste-scolare/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── models/
│   │   ├── services/
│   │   ├── guards/
│   │   └── ...
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── db.json
├── angular.json
├── package.json
└── ...
```

#### 6. Instalați Pachetele

```bash
npm install
```

## ▶️ Pornire Aplicație

### Pasul 1: Pornirea Bazei de Date

Deschideți un **Command Prompt** și executați:

```bash
cd C:\cale\catre\teste-scolare
json-server --watch db.json --port 3000
```

**⚠️ IMPORTANT**: Lăsați această fereastră deschisă!

Veți vedea ceva similar cu:
```
Resources
http://localhost:3000/users
http://localhost:3000/tests
http://localhost:3000/results

Home
http://localhost:3000
```

### Pasul 2: Pornirea Aplicației Angular

Deschideți un **AL DOILEA Command Prompt** și executați:

```bash
cd C:\cale\catre\teste-scolare
ng serve
```

**⚠️ IMPORTANT**: Lăsați și această fereastră deschisă!

Veți vedea ceva similar cu:
```
✔ Browser application bundle generation complete.
Initial Chunk Files | Names         | Raw Size
polyfills.js        | polyfills     | 90.20 kB
main.js             | main          | 50.00 kB

** Angular Live Development Server is listening on localhost:4200 **
```

### Pasul 3: Accesarea Aplicației

Deschideți browser-ul (Google Chrome recomandat) și accesați:

```
http://localhost:4200
```

## 👥 Conturi de Test

### Administrator
```
Email: admin@teste.ro
Parolă: admin123
```

### Părinte 1
```
Email: parinte1@teste.ro
Parolă: parinte123
```

### Părinte 2
```
Email: parinte2@teste.ro
Parolă: parinte123
```

### Copil 1
```
Email: copil1@teste.ro
Parolă: copil123
```

### Copil 2
```
Email: copil2@teste.ro
Parolă: copil123
```

## 🎯 Cum se Folosește

### Pentru Elevi (Copii)

1. **Autentificare**: Folosiți contul de copil
2. **Navigare**: Selectați disciplina și clasa din meniu
3. **Rezolvare**: Alegeți un test și începeți rezolvarea
4. **Rezultat**: La final vedeți scorul și răspunsurile corecte

### Pentru Părinți

1. **Autentificare**: Folosiți contul de părinte
2. **Creare Test**: Click pe "Adaugă Test" sau "Creare Test"
3. **Completare**: Introduceți titlul, disciplina, clasa și întrebările
4. **Salvare**: Click pe "Salvează Test"
5. **Editare**: Puteți edita doar testele create de dvs.

### Pentru Administrator

1. **Autentificare**: Folosiți contul de admin
2. **Administrare**: Aveți acces la toate testele
3. **CRUD Complet**: Adăugați, editați sau ștergeți orice test
4. **Monitorizare**: Vedeți toate testele din sistem

## 📱 Funcționalități Principale

### 🔐 Sistem de Autentificare
- Login securizat cu email și parolă
- Sesiune păstrată în localStorage
- Logout disponibil în header
- Guards pentru protecția rutelor

### 🏠 Dashboard
- Statistici generale
- Teste recente
- Navigare rapidă la discipline
- Informații despre utilizator

### 📝 Gestionare Teste

#### Adăugare Test
- Formular intuitiv
- Titlu, disciplină, clasă
- Întrebări multiple cu 4 opțiuni
- Selectare răspuns corect

#### Editare Test
- Disponibil pentru admin și autorul testului
- Păstrarea ID-ului unic
- Modificare conținut

#### Ștergere Test
- Confirmare înainte de ștergere
- Disponibil pentru admin și autor

### 📊 Rezolvare Teste

#### Interfață Intuitivă
- Navigator de întrebări
- Bară de progres
- Navigare rapidă între întrebări

#### Rezultate Detaliate
- Scor procentual
- Număr răspunsuri corecte/greșite
- Vizualizare răspunsuri corecte
- Opțiune de reluare test

### 🎨 Design Modern
- Gradient backgrounds
- Animații smooth
- Iconițe Bootstrap
- Responsive design
- Culori intuitive

## 📂 Structura Proiectului

```
src/
├── app/
│   ├── components/
│   │   ├── login/              # Pagina de autentificare
│   │   ├── header/             # Header cu meniu navigare
│   │   ├── dashboard/          # Dashboard principal
│   │   ├── test-list/          # Lista de teste
│   │   ├── test-form/          # Formular creare/editare
│   │   └── test-solve/         # Rezolvare teste
│   ├── models/
│   │   ├── user.model.ts       # Model utilizator
│   │   └── test.model.ts       # Model test
│   ├── services/
│   │   ├── auth.service.ts     # Serviciu autentificare
│   │   └── test.service.ts     # Serviciu teste
│   ├── guards/
│   │   ├── auth.guard.ts       # Guard autentificare
│   │   └── role.guard.ts       # Guard roluri
│   ├── app-routing.module.ts   # Configurare rute
│   ├── app.module.ts           # Module principale
│   └── app.component.*         # Componenta rădăcină
├── assets/                     # Resurse statice
├── styles.css                  # Stiluri globale
└── index.html                  # Pagina principală
db.json                         # Baza de date
```

## 🔧 Comenzi Utile

### Dezvoltare
```bash
# Pornire aplicație
ng serve

# Pornire pe alt port
ng serve --port 4300

# Deschidere automată în browser
ng serve --open
```

### Build
```bash
# Build pentru producție
ng build --prod

# Build pentru dezvoltare
ng build
```

### JSON Server
```bash
# Pornire JSON Server
json-server --watch db.json --port 3000

# Alt port
json-server --watch db.json --port 3001
```

### Generare Componente
```bash
# Componentă nouă
ng generate component components/nume-componenta

# Serviciu nou
ng generate service services/nume-serviciu

# Guard nou
ng generate guard guards/nume-guard
```

## ⚠️ Probleme Comune și Soluții

### 1. Eroare "Port 4200 is already in use"
```bash
# Folosiți alt port
ng serve --port 4300
```

### 2. Eroare la instalare pachete
```bash
# Curățați cache-ul
npm cache clean --force

# Re-instalați
npm install
```

### 3. JSON Server nu pornește
- Verificați dacă `db.json` există
- Verificați dacă portul 3000 este liber
- Încercați alt port: `json-server --watch db.json --port 3001`

### 4. Eroare "Cannot find module"
```bash
# Re-instalați dependențele
rm -rf node_modules
npm install
```

### 5. Pagina albă la accesare
- Verificați dacă ambele servere rulează (Angular + JSON Server)
- Deschideți console-ul browser (F12) pentru erori
- Verificați dacă URL-ul este corect: `http://localhost:4200`

## 📞 Contact

**Email**: admin@teste-scolare.ro  
**Telefon**: +40 123 456 789

## 🎓 Resurse Utile

- [Angular Documentation](https://angular.io/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JSON Server](https://github.com/typicode/json-server)

## 📝 Notițe Importante

1. **Backup**: Faceți backup la `db.json` periodic
2. **Siguranță**: În producție, folosiți o bază de date reală
3. **Parolele**: În producție, hash-uiți parolele
4. **API**: JSON Server este doar pentru dezvoltare

## 🚀 Deployment

Pentru a deploya aplicația în producție:

1. **Build**:
```bash
ng build --prod
```

2. **Fișierele** din `dist/teste-scolare` trebuie încărcate pe server

3. **Backend**: Înlocuiți JSON Server cu un backend real (Node.js, .NET, etc.)

4. **Bază de Date**: Folosiți PostgreSQL, MySQL sau MongoDB

## 📄 Licență

Acest proiect este creat în scop educațional.

---

**Dezvoltat cu ❤️ pentru educație**
