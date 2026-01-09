# 📚 Ghid Complet - Aplicație Teste Școlare Angular

## 🎯 Pașii de Instalare și Configurare

### Pasul 1: Instalarea Programelor Necesare

#### 1.1. Instalați Node.js
1. Accesați: https://nodejs.org/
2. Descărcați versiunea LTS (Long Term Support)
3. Rulați instalatorul și urmați pașii
4. Verificați instalarea deschizând Command Prompt (CMD) și tastând:
```bash
node --version
npm --version
```

#### 1.2. Instalați Angular CLI
Deschideți Command Prompt (CMD) și tastați:
```bash
npm install -g @angular/cli
```

Verificați instalarea:
```bash
ng version
```

### Pasul 2: Crearea Proiectului

1. Navigați în folderul unde doriți să creați proiectul:
```bash
cd C:\Users\NumeleTau\Desktop
```

2. Creați proiectul Angular:
```bash
ng new teste-scolare
```

Când vă întreabă:
- "Would you like to add Angular routing?" → Tastați `y` și apăsați Enter
- "Which stylesheet format?" → Selectați `CSS` și apăsați Enter

3. Intrați în folderul proiectului:
```bash
cd teste-scolare
```

### Pasul 3: Instalarea Bootstrap

```bash
npm install bootstrap bootstrap-icons
```

### Pasul 4: Instalarea JSON Server (pentru baza de date)

```bash
npm install -g json-server
```

### Pasul 5: Crearea Structurii Proiectului

Executați comenzile următoare una câte una:

```bash
ng generate service services/auth
ng generate service services/test
ng generate service services/user
ng generate guard guards/auth
ng generate guard guards/role
ng generate component components/login
ng generate component components/header
ng generate component components/dashboard
ng generate component components/test-list
ng generate component components/test-detail
ng generate component components/test-form
ng generate component components/test-solve
```

### Pasul 6: Configurarea Fișierelor

Urmați instrucțiunile din documentul `CONFIGURARE_FISIERE.md` pentru a copia codul în fiecare fișier.

### Pasul 7: Pornirea Aplicației

#### 7.1. Pornirea Bazei de Date
Deschideți un Command Prompt și navigați în folderul proiectului:
```bash
cd C:\Users\NumeleTau\Desktop\teste-scolare
json-server --watch db.json --port 3000
```
⚠️ Lăsați această fereastră deschisă!

#### 7.2. Pornirea Aplicației Angular
Deschideți un AL DOILEA Command Prompt și navigați în același folder:
```bash
cd C:\Users\NumeleTau\Desktop\teste-scolare
ng serve
```
⚠️ Lăsați și această fereastră deschisă!

#### 7.3. Accesarea Aplicației
Deschideți browser-ul (Google Chrome recomandat) și accesați:
```
http://localhost:4200
```

## 👥 Utilizatori Prestabiliți

### Administrator
- Email: `admin@teste.ro`
- Parolă: `admin123`

### Părinte 1
- Email: `parinte1@teste.ro`
- Parolă: `parinte123`

### Copil 1
- Email: `copil1@teste.ro`
- Parolă: `copil123`

## 📋 Funcționalități

### Administrator
✅ Poate adăuga, modifica și șterge orice test
✅ Poate vedea toate testele din sistem

### Părinte
✅ Poate adăuga teste noi
✅ Poate modifica/șterge doar testele create de el
✅ Poate rezolva teste (pentru testare)

### Copil
✅ Poate rezolva testele disponibile
✅ Poate vedea rezultatele obținute

## 🎨 Navigare

- **Meniu Principal**: Selectați disciplina și clasa dorită
- **Listă Teste**: Vedeți toate testele disponibile pentru clasa selectată
- **Rezolvare Test**: Răspundeți la întrebări și vedeți rezultatul
- **Administrare**: (Admin/Părinte) Adăugați sau editați teste

## ⚠️ Probleme Comune

### 1. Portul 4200 este deja folosit
```bash
ng serve --port 4300
```
Apoi accesați: http://localhost:4300

### 2. Erori la instalarea pachetelor
```bash
npm cache clean --force
npm install
```

### 3. JSON Server nu pornește
Verificați dacă fișierul `db.json` există în folderul rădăcină al proiectului.

### 4. Aplicația nu se încarcă
- Verificați dacă ambele procese rulează (json-server și ng serve)
- Verificați consolei browser-ului (F12) pentru erori

## 📞 Contact Administrator
Email: admin@teste-scolare.ro
Telefon: +40 123 456 789

## 🔧 Comenzi Utile

### Oprirea aplicației
- Apăsați `Ctrl + C` în fereastră Command Prompt
- Confirmați cu `Y`

### Curățarea cache-ului
```bash
npm cache clean --force
```

### Re-instalarea dependințelor
```bash
rm -rf node_modules
npm install
```

### Generarea unei componente noi
```bash
ng generate component components/nume-componenta
```

### Generarea unui serviciu nou
```bash
ng generate service services/nume-serviciu
```

## 📝 Notițe Importante

1. **Baza de Date**: Fișierul `db.json` conține toate datele. NU îl ștergeți!
2. **Backup**: Faceți periodic o copie a fișierului `db.json`
3. **Modificări**: Orice modificare în cod necesită restart doar dacă modificați fișiere din folderul `src/`
4. **Producție**: Pentru a crea versiunea finală pentru găzduire, rulați: `ng build --prod`

## 🎓 Resurse de Învățare

- [Angular Documentation](https://angular.io/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Succes cu proiectul! 🚀**
