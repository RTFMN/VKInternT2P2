## Установка

1. Клонируйте репозиторий
2. Установите зависимости
```bash
npm install
```
3. Настройте файл .env следующего содержания в корне проекта
```bash
GITHUB_TOKEN=''
GITHUB_USERNAME=''
GITHUB_REPO_UI=''
GITHUB_REPO_API=''
GITHUB_LOGIN=''
GITHUB_PASSWORD=''
```
заполните его вашими данными
4. Запуск тестов
```bash
npx playwright test
```
или
```bash
npm run test
```
5. Генерация Allure отчета
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```
или
```bash
npm run allure:generate
npm run allure:open 
```