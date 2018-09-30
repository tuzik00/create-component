Установка:
npm install -g create-component

Использование:
create-component -d dirname -f templatename -c name=test (опционально)

-d - dirname
-t - templatename
-c - context

Добавление шаблона:
1. Создать файла в дириктории templates
2. С помощью тега <template ext="js" name="component"></template> создать шаблон указав в качестве атрибута
ext (расширение файла) и name (имя файла), если не указывать name, то файл будет иметь название папки.
3. Передача переменных в шаблон осуществляется с помощью тегов <% this.name %> и выражений <% if|for|else|switch|case|break %>
