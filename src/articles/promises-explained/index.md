---
title: 'Промисы на примерах из жизни'
subtitle: 'Поговорим о промисах простыми словами'
date: 2017-12-05
source:
    title: 'JavaScript: promises explained with simple real life analogies'
    url: 'https://codeburst.io/javascript-promises-explained-with-simple-real-life-analogies-dd6908092138'
    author: 'Шрути Капур'
translator:
    name: 'Артур Храбров'
    url: 'https://medium.com/@nzvtrkk'
editor:
    name: 'Вадим Макеев'
    url: 'https://twitter.com/pepelsbey'
layout: article.njk
tags:
  - article
  - js
---

![](images/1.jpg)
_Ай промис, фото [Бена Уайта](https://unsplash.com/photos/tX4-tYibILg)._

## Промисы простыми словами

Представьте это как разговор между двумя людьми:

> **Алекс**: Эй, мистер Промис! Можешь сбегать в магазин и принести мне `itemA` для блюда, которое мы приготовим сегодня вечером?
> **Промис**: Отличная мысль!
> **Алекс**: Пока ты бегаешь, я подготовлю `itemB` (асинхронная операция). Только обязательно скажи, нашел ли ты `itemA` (возвращаемое промисом значение).
> **Промис:** А если тебя не будет дома, когда я вернусь?
> **Алекс:** Тогда отправь мне смску, что ты вернулся и принес `item` для меня (успешный колбэк). Если ты не найдешь, позвони мне немедленно (неуспешный колбэк).
> **Промис:** Отлично! Увидимся позже!

Проще говоря, объект `promise` — это данные, возвращаемые асинхронной функцией. Это может быть `resolve`, если функция прошла успешно или `reject`, если функция вернула ошибку.

## Определение

Промис — это объект, представляющий окончательное завершение или сбой асинхронной операции. По сути, промис — это возвращаемый объект, к которому прикрепляется колбэк, вместо его передачи в функцию.

## Промис в JS

Давайте сначала поговорим о JavaScript и его параллелизме. JavaScript является однопоточным. Всё происходит в той последовательности, в которой написано, но асинхронные операции происходят в порядке их завершения.

Что, по вашему мнению, выведется в консоль в следующем примере?

    console.log('1');
    setTimeout(function(){ console.log('2'); }, 3000);

    console.log('3');
    setTimeout(function(){ console.log('4'); }, 1000);

Результатом будет 1 3 4 2. Вы можете задаться вопросом, почему 4 встречается раньше чем 2. Причина в том, что, несмотря на то, что строка с 2 описана раньше, она начала выполняться только после 3000 мс, поэтому 4 выводится до 2.

В типичном веб-приложении может выполняться множество асинхронных операций, таких как загрузка изображений, получение данных из JSON, обращение к API и других.

Теперь рассмотрим, как создать промис в JavaScript:

    var promise = new Promise(function(resolve, reject) {
        // Делаем, что-то, возможно асинхронное, тогда…

        if (/* Всё прошло отлично */) {
            resolve('Сработало!');
        }
        else {
            reject(Error('Сломалось'));
        }
    });

Конструктор `Promise` принимает один аргумент: колбэк с двумя параметрами — `resolve` и `reject`. Этот промис может быть использован следующим образом:

    promise.then(function(result) {
        console.log('Промис сработал');
    }, function(err) {
        console.log('Что-то сломалось');
    });

Если промис прошёл успешно, будет выполнен `resolve`, и консоль выведет Промис сработал, в противном случае выведется Что-то сломалось. Это состояние до получения `resolve` или `reject` называется состоянием ожидания, `pending`. Таким образом, есть три состояния промиса:

1. Ожидание ответа: `pending`.
2. Успешное выполнение: `resolve`.
3. Выход ошибкой: `reject`.

![](images/2.jpg)
_Промис успешно выполнился, [фото Скотта Вебба](https://www.pexels.com/photo/man-couple-love-people-136402/)._

## Пример

Чтобы полностью понять концепцию промисов, создадим приложение, которое загрузит изображение. Если изображение загружено, оно будет отображено, иначе будет выводится ошибка.

Сначала создадим промис с `XMLHttpRequest`:

    const loadImage = url => {
      return new Promise(function(resolve, reject) {
        // Открываем новый XHR
        var request = new XMLHttpRequest();
        request.open('GET', url);

        // После загрузки запроса
        // проверяем, был ли он успешным
        request.onload = function() {
          if (request.status === 200) {
            // Если успешный, то резолвим промис
            resolve(request.response);
          } else {
            // Если нет, то реджектим промис
            reject(Error(
              'Произошла ошибка. Код ошибки:' + request.statusText
            ));
          }
        };

        request.send();
      });
    };

Теперь, когда изображение успешно загружено, промис вернет `resolve` с ответом от XHR. Давайте используем этот промис, вызвав функцию `loadImage`.

    const embedImage = url => {
      loadImage(url).then(function(result) {
          const img = new Image();
          var imageURL = window.URL.createObjectURL(result);
          img.src = imageURL;
          document.querySelector('body').appendChild(img);
        },
        function(err) {
          console.log(err);
        });
    }

Мы сделали это! Неплохо, да?

А теперь сделай несколько промисов сам! Давай :)

### Дополнительные материалы

Вот некоторые статьи, которые показались мне очень полезным в процессе обучения:

1. [Статья про промисы на MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
2. [Введение на Google Developers](http://https//developers.google.com/web/fundamentals/primers/promises)
3. [Про concurrency model на MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#Run-to-completion)
