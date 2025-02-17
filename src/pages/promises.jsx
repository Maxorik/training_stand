import React from 'react';
import { Editor } from '../components/Editor'
import { PageTemplate } from "../components/PageTemplate";

/** Примеры кода ******************************************************************************************************/
const promise_example = `
let isLoading = true

fetch(\`https://swapi.dev/api/films/\`)
  .then(function (movies) {
    console.log(movies)
  })
  .catch(function (err) {
    console.log(err)
  })
  .finally(function () {
    isLoading = false
  })
`;

const promise_all = `
/** Дефолтная функция:  */
Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 6000)),
    new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 2200)),
    new Promise((resolve, reject) => setTimeout(() => reject('p2'), 3300))
]).then(res => console.log(res))

/** Кастомная реализация */
function promiseAll(promises) {
    const results = [];
    let count = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((pr, idx) => {
            pr.then((res) => {
                results[idx] = res;
                count++;

                if (promises.length === count) {
                    resolve(results);
                }
            }).catch((error) => {
                reject(error)
            })
        })
    })
}
    
promiseAll([
    new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 6000)),
    new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 2200)),
    new Promise((resolve, reject) => setTimeout(() => reject('p2'), 3300))
]).then(res => console.log(res))`;

const promise_all_settled = `
/** Дефолтная функция:  */
Promise.allSettled([
    new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 6000)),
    new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 2200)),
    new Promise((resolve, reject) => setTimeout(() => reject('p2'), 3300))
]).then(res => console.log(res))

/** Кастомная реализация */
function promiseAllSettled(promises) {
    const result = [];
    let count = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((pr, idx) => {
            pr.then(res => {
                result[idx] = {status: 'fulfilled', value: res};
            }).catch(err => {
                result[idx] = {status: 'rejected', reason: err};
            }).finally(() => {
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            })
        })
    })
}

promiseAllSettled([
    new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 6000)),
    new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 2200)),
    new Promise((resolve, reject) => setTimeout(() => reject('p2'), 3300))
]).then(res => console.log(res))\`;
`;

const promise_any = `
/** Дефолтная функция:  */
Promise.any([
    new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 6000)),
    new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 2200)),
    new Promise((resolve, reject) => setTimeout(() => reject('p2'), 3300))
]).then(res => console.log(res))

/** Кастомная реализация */
function promiseAny(promises) {
    let count = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((pr) => {
            pr.then(res => {
                resolve(res);
            }).catch(() => {
                count++;
                if (count === promises.length) {
                    reject('AggregateError: All promises were rejected')
                }
            })
        })
    })
}

promiseAny([
    new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 6000)),
    new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 2200)),
    new Promise((resolve, reject) => setTimeout(() => reject('p2'), 3300))
]).then(res => console.log(res))\`;
`;

const promise_race = `
/** Дефолтная функция:  */
Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 6000)),
    new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 2200)),
    new Promise((resolve, reject) => setTimeout(() => reject('p2'), 3300))
]).then(res => console.log(res))

/** Кастомная реализация */
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(pr => {
            pr.then(res => resolve(res)).catch(err => reject(err))
        })
    })
}

promiseRace([
    new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 6000)),
    new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 2200)),
    new Promise((resolve, reject) => setTimeout(() => reject('p2'), 3300))
]).then(res => console.log(res))\`;
`;

/** *******************************************************************************************************************/
const page_content = {
    content: ( <> {
`Асинхронные функции и **fetch()** возвращают объект **Promise** в качестве значения. Внутри промиса хранится результат вычисления, которое может быть уже выполнено или выполнится в будущем.

Промис может находиться в одном из трёх состояний:
◽ **pending** — стартовое состояние, операция стартовала;
◽ **fulfilled** — получен результат;
◽ **rejected** — ошибка.

Поменять состояние можно только один раз: перейти из pending либо в **fulfilled**, либо в **rejected**.

После создания, промис находится в состоянии ожидания **pending**. Когда асинхронная операция завершается, функция переводит промис в состояние успеха **fulfilled** или ошибки **rejected**.`}
<Editor code={ promise_example } height={ 10 } /><hr />
{`

У промисов есть 4 основных метода. На собеседовании могут попросить реализовать либо использовать какой-то из них.

1. **Promise.all()** - вернет либо массив с результатами ВСЕХ промисов, либо ошибку для первого встреченного **rejected**.`}
<Editor code={ promise_all } height={ 28 } /><hr />
{`

2. **Promise.allSettled()** - вернет массив объектов вида {status: 'fulfilled', value: 'p1'} | {status: 'rejected', reason: 'p2'}`}
<Editor code={ promise_all_settled } height={ 28 } /><hr />
{`

3. **Promise.any()** - вернет первый полученный результат промиса либо ошибку, что ВСЕ промисы **rejected**`}
<Editor code={ promise_any } height={ 25 } /><hr />
{`

4. **Promise.race()** - вернет исход для первого выполненного промиса - это будет либо полученный его результат, либо ошибка`}
<Editor code={ promise_race } height={ 18 } /><hr />
{`важно:
при реализации, если важен порядок промисов (для **Promise.all** и **Promise.allSettled**), то используем индекс.
ВСЕ инкременты проводятся в **then()**, т.к. это микротаски, они выполнятся ПОСЛЕ синхронного кода`
}</>),
    keywords: 'асинхронность, микротаска, цепочка промисов',
    title: 'promise',
    anchors: ['дока: https://doka.guide/js/promise/']
}

/** *******************************************************************************************************************/
export const PromisesPage = () => {
    return <PageTemplate { ...page_content } />
}