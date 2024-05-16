## Description

Cервис для хранения и получения оценок за занятия.

Для соответствия соглашениям о REST API эндпоинты "GET /user", "POST /user" переименованы на "GET /users", "POST /users".

Добавлена поддержка версионирования API.

В качестве аутентификации пользователей реализована стратегия passport-local через емейл + пароль.
Добавлено использование JWT.
Добавлен эндпоинт "POST /auth/login". Сохраняет в браузере клиента cookie "Authentication=...".
Добавлен эндпоинт "POST /auth/logout". Очищает в браузере клиента cookie "Authentication=...".
В эндпоинтах "GET /users", "GET /lessons", "POST /lessons", "POST /lessons/:id/evaluations" требуется передавать cookie "Authentication=...".

Для эндпоинтов "GET /users", "GET /lessons" добавлена возможность использования limit/offset пагинации.

Для исключения дублирования записей в таблицах Users, Lessons задано ограничение уникальности соответствующим полям email и code.
перед добавлением новой записи в БД значение уникального поля переводится в нижний регистр.
Добавлены индексы для поиска по данным полям.

С целью повышения безопасности сервиса использована библиотека Helmet.

Документация API доступна по эндпоинту "/api".

Файл .env указан в .gitignore. Добавлен в репозиторий специально, чтобы было проще запустить сервис.
Внести изменения файл .env, если требуется.

## Installation

```bash
$ npm install
```

## Running the postgres db

sudo docker-compose up -d

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Linting
npm run lint

# Formatting
npm run format
