# Запуск приложение

Прорисать команды в командной строке внутри проекта:

### `npm start`

### `lcp --proxyUrl https://api.vk.com`

### `npm start`

# О приложении

## Основной подход

Я хотел разработать более универсальные и гибкие компоненты, а также продемонстрировать мой подход к написанию кода, поэтому я избежал использования библиотек (типа Bootstrap, MUI) для их создания.
Основной целью было создание компонентов, которые не были бы ограничены конкретной задачей, но при этом могли бы быть переиспользованы в других сценариях. Например, для создания таблицы был разработан трехслойный подход: первый слой создает конфигурацию для всей таблицы, второй добавляет сортировку, а третий слой отвечает за отрисовку. Это позволяет легко создавать таблицы без сортировки или быстро добавлять новые столбцы всего лишь добавляя пару строк в конфиг.
И постарался оптимизировать работу приложения используя useCallback и useMemo.
Для решения проблемы с CORS политикой vk.api я использовал local CORS proxy-server

## Дополнительное фичи

### Поиск по ключевому слову
При разработке дополнительных функций я ориентировался на потребности бизнеса, поэтому была добавлена возможность поиска по записям. Например, при просмотре постов блогера из определенной группы можно проверить, упоминался ли в них домен "Авито". Для этого необходимо ввести домен группы и ключевое слово "авито", после чего будут отображены последние посты, содержащие данное ключевое слово.
### Дизайн в котором я использовал корпоративные цвета

### Дополнительная сортировка по лайкам и репостам
