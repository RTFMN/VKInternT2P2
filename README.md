## Установка

1. Клонируйте репозиторий
2. Установите зависимости
```bash
npm install
```
3. Настройте файл .env с вашими данными
4. Запуск тестов
```bash
npx playwright test
```
5. Генерация Allure отчета
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```