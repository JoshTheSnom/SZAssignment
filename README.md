# Instalace aplikace

Tato dokumentace vás provede instalací a spuštěním aplikace.

---

## Požadavky

Před instalací aplikace je potřeba mít nainstalovaný následující software:

### 1. Instalace **Node.js**

Aplikace běží na **Node.js**, což je nutné k jejímu spuštení.

1. Stáhněte a nainstalujte **Node.js**:\
   [Node.js ke stažení](https://nodejs.org/)
2. Po instalaci ověřte správnou instalaci příkazem v terminálu:

   ```sh
   node -v
   ```

   Tento příkaz by měl vrátit číslo verze, např. `v22.13.1`.  
3. Ověřte instalaci **npm** (správce balíčků pro Node.js):

   ```sh
   npm -v
   ```

   Tento příkaz by měl vrátit číslo verze, např. `11.1.0`.

---

### 2. Instalace .NET SDK

Aplikace využívá backend postavený na **.NET 8.0 SDK**.

1. Stáhněte a nainstalujte **.NET 8.0 SDK**:\
   [.NET SDK ke stažení](https://dotnet.microsoft.com/en-us/download)
2. Ověřte instalaci příkazem:

   ```sh
   dotnet --version
   ```

   Tento příkaz by měl vrátit číslo verze, např. `8.0.130`.

---

### 3. Instalace **Git**

Aplikace je spravována pomocí **Gitu**, který je nutný pro stažení projektu.

1. Stáhněte a nainstalujte **Git**:\
   [Git ke stažení](https://git-scm.com/downloads)
2. Ověřte instalaci **Gitu** příkazem:

   ```sh
   git --version
   ```

   Tento příkaz by měl vrátit číslo verze, např. `git version 2.47.1.windows.2`.
3. Zkopírujte projekt pomocí Gitu:

   ```sh
   git clone https://github.com/JoshTheSnom/SZAssignment.git
   ```

---

## Instalace závislostí a spuštění backendu

1. Přesuňte se do složky backendu:

   ```sh
   cd SZAssignment/Example.Rest.Api
   ```

2. Instalaci závislostí proveďte příkazem:

   ```sh
   dotnet restore
   ```

3. Spusťte backend příkazem:

   ```sh
   dotnet run --launch-profile "http"
   ```

4. Na [**http://localhost:5178/data/**](http://localhost:5178/data) by mělo být pole o velikosti 150 položek.

---

## Instalace závislostí a spuštění frontendu

1. Přesuňte se do složky frontendu:

   ```sh
   cd ../szfrontend
   ```

   V případě že jste aktuálně ve složce SZAssignment použijte příkaz:

   ```sh
   cd szfrontend
   ```

2. Instalaci závislostí proveďte příkazem:

   ```sh
   npm install
   ```

   Tento krok může chvíli trvat - stáhne všechny potřebné knihovny.
3. Spusťte frontend příkazem:

   ```sh
   npm run dev
   ```

4. **Aplikace by měla být dostupná** na [**http://localhost:5173/**](http://localhost:5173/) (nebo jiném portu, pokud je obsazený).

---

Původně jsem plánoval hostovat tuto aplikaci na Azure, ale nemám možnost založit tento server zdarma.
