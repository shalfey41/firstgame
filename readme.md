# Домашнее задание

Чтобы собрать проект:

`npm i`

`NODE_ENV=production webpack`

Проект обязательно загрузить на локальный сервер, иначе не запустится.

Чтобы запустить проект на сервере, наберите в консоли

`webpack-dev-server --content-base html/`

Затем откройте в браузере `htto://localhost:8080`

Для проверки кодстайла с помощью ESLint и подсветки в PhpStorm/WebStorm проблемных мест:

1. Делаем «npm i» в корне с проектом. 
2. Открываем Preferences -> Languages && Frameworks -> JavaScript -> Code Quality Tools -> ESLint.
3. Ставим Enabled.
4. Указываем путь к «Node interpreter» и «ESLint package», если эти поля пустые.
5. В «Configuration file» указываем путь к .eslintrc.js в корне.
6. Сохраняем

Фреймворк [createjs](http://www.createjs.com/)