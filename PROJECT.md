# Что установлено в проекте

## Основа проекта

Проект сделан на:

- React
- TypeScript
- Vite
- SCSS / Sass
- ESLint

Основная папка с кодом:

```text
src/
```

Точка входа приложения:

```text
src/main.tsx
```

Главный компонент:

```text
src/App.tsx
```

## Команды

Запуск проекта в режиме разработки:

```bash
npm run dev
```

Сборка проекта:

```bash
npm run build
```

Проверка ESLint:

```bash
npm run lint
```

Предпросмотр собранного проекта:

```bash
npm run preview
```

## Основные зависимости

### React

```json
"react": "^19.2.6",
"react-dom": "^19.2.6"
```

Нужны для создания React-приложения.

### Vite

```json
"vite": "^8.0.12",
"@vitejs/plugin-react": "^6.0.1"
```

Vite запускает dev server, собирает проект и обрабатывает React.

### TypeScript

```json
"typescript": "~6.0.2"
```

Добавляет типизацию в проект.

### Sass

```json
"sass": "^1.100.0"
```

Нужен для работы `.scss` и `.module.scss` файлов.

### clsx

```json
"clsx": "^2.1.1"
```

Нужен для удобной сборки `className`.

Пример:

```tsx
className={clsx(styles.button, {
  [styles.active]: active,
})}
```

Это значит:

- `styles.button` добавляется всегда
- `styles.active` добавляется только если `active === true`

### React Router

```json
"react-router-dom": "^7.15.1"
```

Нужен для маршрутизации между страницами.

Сейчас в коде еще не используется.

### Redux Toolkit и React Redux

```json
"@reduxjs/toolkit": "^2.12.0",
"react-redux": "^9.3.0"
```

Нужны для хранения глобального состояния приложения.

Сейчас в коде еще не используются.

## Dev зависимости

### ESLint

```json
"eslint": "^10.3.0",
"@eslint/js": "^10.0.1",
"typescript-eslint": "^8.59.2",
"eslint-plugin-react-hooks": "^7.1.1",
"eslint-plugin-react-refresh": "^0.5.2"
```

Нужны для проверки качества кода.

### Типы

```json
"@types/react": "^19.2.14",
"@types/react-dom": "^19.2.3",
"@types/node": "^24.12.4"
```

Нужны TypeScript, чтобы понимать типы React, React DOM и Node.js.

## Alias `@`

В проекте настроен alias:

```ts
'@': path.resolve(__dirname, './src')
```

Он позволяет писать импорты от папки `src`.

Вместо такого:

```tsx
import { Button } from './shared/ui/Button'
```

Можно писать так:

```tsx
import { Button } from '@/shared/ui/Button'
```

Alias настроен в двух местах:

- `vite.config.ts`
- `tsconfig.app.json`

## SCSS Modules

В проекте можно использовать модульные SCSS-файлы.

Пример файла:

```text
src/shared/ui/Button/Button.module.scss
```

Пример импорта:

```tsx
import styles from './Button.module.scss'
```

Пример использования:

```tsx
<button className={styles.button}>Кнопка</button>
```

SCSS Modules нужны, чтобы классы не конфликтовали между компонентами.

## Компонент Button

Кнопка находится тут:

```text
src/shared/ui/Button/Button.tsx
```

Стили кнопки:

```text
src/shared/ui/Button/Button.module.scss
```

Экспорт:

```text
src/shared/ui/Button/index.ts
```

Использование:

```tsx
import { Button } from '@/shared/ui/Button'

<Button active>Кнопка</Button>
```

Если нужно переключать активное состояние по клику:

```tsx
const [isActive, setIsActive] = useState(false)

<Button active={isActive} onClick={() => setIsActive(!isActive)}>
  Кнопка
</Button>
```

## Важно про Node.js

Установленный Vite требует Node.js:

```text
20.19+ или 22.12+
```

Если запускать проект на Node.js 18, сборка может падать.
