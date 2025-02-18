import React from 'react';
import { Editor } from '../components/Editor'
import { PageTemplate } from "../components/PageTemplate";

const funcDec = `
myDecFunc(5, 1);

function myDecFunc() {
    const args = [...arguments];
    console.log(args);
}
`;

const funcNew = `
function User(name) {
    // this = {};  (неявно)
    
    this.name = name;
    this.sayMyName = () => {
        console.log(this.name)
    }
    
    // return this;  (неявно)
}

let user1 = new User('Petr');
user1.sayMyName();
`;

const funcExp = `
const myExpFunc = () => {
    console.log('expression 1')
}

const myExpFunc2 = function() {
    console.log('expression 2')
}

myExpFunc();
myExpFunc2();
`;

const funcArrow = `
const arrowPlusFunc = (a, b) => a + b; 
console.log(arrowPlusFunc(15, 9));

const arrowMinusFunc = (a, b) => {
    return a - b;
}; 
console.log(arrowMinusFunc(15, 9));
`;

const funcAnon = `
// callback для массива
const res = [1, 2, 3, 4, 5].map(function (num) {
  return num * 2
});
console.log(res);

// событие - анонимная функция
document.body.addEventListener('click', () => { console.log('bup') });

// таймер
setTimeout(() => {
    // что-то случится через 10 секунд
}, 10000)
`;

const funcIife = `
(function () {
    console.log('Immediately!' );
})();
`;

const funcRet = `
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

console.log(counter());
console.log(counter());
console.log(counter());
`;

const page_content = {
    content: ( <> {
`Функция — это блок из различных команд. Имеет тип **function**, может быть передана как аргумент другой функции, возвращёна из функции или присвоена переменной.
Есть два вида объявления функции:

**Function declaration**:
◽ всегда имеют ИМЯ
◽ всплывают, можно вызвать фунцкию ДО ее объявления
◽ имеют псевдомассив **arguments**
`} <Editor code={ funcDec } height={ 5 } /><hr /> {
`Создание экземпляра функции через **new**:`
} <Editor code={ funcNew } height={ 11 } /><hr /> {
`**Function expression**:
◽ вместо имени вызываем переменную, которой присвоена функция
`} <Editor code={ funcExp } height={ 9 } /><hr /> {
`**Стрелочные функции**:
◽ являются **function expression**
◽ не имеют своего **this** (берут его из лексического окружения родителя в момент создания)
◽ не имеют псевдомассива **arguments**
◽ нельзя создать с помощью **new**
◽ функция должна возвращать что-то
`} <Editor code={ funcArrow } height={ 6 } /><hr /> {
`
**Анонимные функции**:
◽ сложнее отлаживать, т.к. нет имени
◽ лучше использовать не сами по себе, а передавать в какой-нибудь метод
◽ типичные случаи для использования - **замыкания**, **обработчики событий**, **таймеры** и **callback-и** для методов и других функций.
`} <Editor code={ funcAnon } height={ 11 } /><hr /> {`
**Замыкание**:
`} <Editor code={ funcRet } height={ 12 } /><hr /> {`

Функция высшего порядка **(Higher Order Function)** — это функция, которая принимает в качестве аргумента другие функции и/или возвращает в результате своей работы функцию.
Пример: **setTimeOut()**, **.map()** из примера выше - они принимают в качестве аргумента колбэк-функции.
`} <hr /> {`
**IIFE (Immediately Invoked Function Expression)** – это функция, которая выполняется сразу же после того, как была определена.
`} <Editor code={ funcIife } height={ 3 } /><hr /> {`

`} </>),
    keywords: 'замыкание, контекст',
    title: 'functions',
    anchors: ['дока: https://doka.guide/js/function/', ]
}

export const FunctionsPage = () => {
    return <PageTemplate { ...page_content } />
}