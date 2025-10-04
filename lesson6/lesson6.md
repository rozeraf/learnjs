### План Урока 6: Продвинутые типы: Union, Literal и Enum

**Цель:** Научиться создавать гибкие и самодокументируемые типы с помощью `Union Types` (объединений), `Literal Types` (литеральных типов) и `Enums` (перечислений).

**Концепции, которые мы затронем:**

1.  **Union Types (`|`):**
    - Позволяют переменной быть одного из нескольких типов. "Это ИЛИ то".
    - **Пример:** `let id: string | number;`
    - **Сужение типов (Type Narrowing):** Как TypeScript "умнеет" внутри блока `if` и понимает, с каким именно типом мы работаем. После проверки `typeof id === "string"` TypeScript позволяет использовать строковые методы, например, `id.toUpperCase()`.

2.  **Literal Types (Литеральные типы):**
    - Частный случай Union Types, где мы указываем не просто `string`, а **конкретные строковые значения**.
    - **Пример:** `type Status = "success" | "error" | "loading";`
    - Это гораздо безопаснее, чем просто `string`, так как защищает от опечаток.

3.  **Enums (Перечисления):**
    - Способ создать именованный набор констант. Идеально для статусов, ролей, категорий.
    - **Числовые Enums (по умолчанию):**
      ```ts
      enum UserRole {
        Admin, // 0
        Editor, // 1
        Guest, // 2
      }
      // UserRole.Admin вернёт 0
      // UserRole[0] вернёт "Admin"
      ```
    - **Строковые Enums:**
      ```ts
      enum OrderStatus {
        Processing = 'PROCESSING',
        Shipped = 'SHIPPED',
      }
      ```

---

**Практика:**

1.  **Функция с Union Type и Type Narrowing:**
    - Напиши функцию `processId(id: string | number)`.
    - Внутри функции используй `if (typeof id === "string")`, чтобы для строки вывести её в верхнем регистре (`id.toUpperCase()`), демонстрируя сужение типов.
    - В блоке `else` для числа — вывести его с сообщением "ID число: [число]".
    - Вызови функцию с обоими типами `id`.

2.  **Использование Literal Types для статуса:**
    - Создай тип `type AnimationStatus = "playing" | "paused" | "stopped";`
    - Напиши функцию `controlAnimation(status: AnimationStatus)`, которая будет использовать `switch` для вывода в консоль разных сообщений в зависимости от статуса.

3.  **Использование Enum для ролей:**
    - Создай `enum UserRole` со значениями `Admin`, `Moderator`, `User`.
    - Создай `interface Profile` с полями `username: string` и `role: UserRole`.
    - Создай объект `myProfile` типа `Profile` с ролью `UserRole.Admin`.
    - Напиши функцию `canEdit(profile: Profile): boolean`, которая будет возвращать `true`, если роль пользователя `Admin` или `Moderator`, и `false` в противном случае.
    - Вызови эту функцию со своим профилем и выведи результат.

---

**Инструменты:** `bun run`, `bunx tsc`.

**GitHub:** Закоммитить `lesson6/lesson6.ts` и `lesson6/lesson6.md`.
