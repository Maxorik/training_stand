import React from 'react';
import { Editor } from '../components/Editor'
import { PageTemplate } from "../components/PageTemplate";

const objCode = `
const user = {
    name: 'Petr',
    age: 27
}

// проверка, есть ли свойство у объекта
console.log('age' in user);

// перебор объекта
for(let key in user) {
    console.log(user[key]);
}
`;

const objClone = `
const mainObject = {
    name: 'Petr',
    pets: {
        dog: 'Sharik',
        cat: 'Barsik'
    }
} 

// поверхностное копирование
const simpleClone = { ...mainObject };
const assignClone = Object.assign({}, mainObject); // экзотика

// глубокое копирование
const weightDeepClone = JSON.parse(JSON.stringify(mainObject));
const lightDeepClone = structuredClone(mainObject); // предпочтительно
`;

const objMethods = `
const mainObject = {
    name: 'Petr',
    age: 27,
    money: 1000
}

const passObject = {
    job: 'Zavod',
    money: 500
}

// объединение объектов
const assignedObj = Object.assign(mainObject, passObject);
console.log(JSON.stringify(assignedObj));

// массив пар "ключ-значение"
const arrEntries = Object.entries(mainObject);
console.log(arrEntries);

// обратная операция - массив -> объект
const objFromArr = Object.fromEntries(arrEntries);
console.log(JSON.stringify(objFromArr));

// массив ключей объекта
const keysArr = Object.keys(mainObject);
console.log(keysArr);

// массив значений объекта
const valArr = Object.values(mainObject);
console.log(valArr);
`;

const objProto = `
const user = { name: 'Petr' };
const family = { place: 'Tomsk' };

// получить прототип
const getProto = Object.getPrototypeOf(user);
console.log(getProto);

// установить прототип
Object.setPrototypeOf(family, user);
console.log(JSON.stringify(Object.getPrototypeOf(family)));

// проверить свойство
const hasOwn = Object.hasOwn(user, 'place');
console.log(hasOwn);
`;

const objBlock = `
const obj = {
    edited: true 
};

// запрет на изменение конкретных ключей 
Object.defineProperty(obj, "edited", {
  value: false,
  writable: false,
});
obj.edited = 'something'; // error
console.log(JSON.stringify(obj));

// полный запрет на расширение и редактирование объекта
Object.freeze(obj);
obj.prop = 27; // error
console.log(JSON.stringify(obj));
`;

const page_content = {
    content: ( <> {
`Объект (**object**) — это набор свойств. Каждое свойство состоит из названия и значения. Название может быть строкой или символом, а значение может быть любым.

Это ссылочный тип данных. Сравниваются не значения свойств объектов, а адреса в памяти, по которым эти объекты хранятся. Поэтому любое сравнение двух объектов будет возвращать **false**, даже если они выглядят одинаково.

Типовая работа с объектом:
`} <Editor code={ objCode } height={ 10 } /><hr /> {`

Важная тема - **клонирование объектов**.

Есть два вида:
◽ Поверхностное копирование - если есть ключи со значениями объектов, скопируются не сами объекты, а ссылки на них.
◽ Глубокое копирование - полная копия объекта. Более ресурсозатратная операция.
`} <Editor code={ objClone } height={ 13 } /><hr /> {`
**Методы объекта**, которые часто используются:
◽ клонирование (см. выше)
◽ получение массива ключей\\значений объекта
◽ создание объекта из массива
◽ объединение нескольких объектов
`} <Editor code={ objMethods } height={ 25 }/><hr /> {`
**prototype** основные методы:
◽ получить прототип объекта
◽ установить прототип для объекта
◽ проверить, является ли свойство именно текущего объекта, а не его прототипа

Методы **__proto__** являются устаревшими.
`} <Editor code={ objProto } /><hr /> {`
Еще важная тема, которую могут спросить: "Как запретить редактирование объекта? Как запретить редактирование значения ключа?"
`} <Editor code={ objBlock } height={ 14 } /><hr /> {`
`} </>),
    keywords: 'prototype',
    title: 'object',
    anchors: ['mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object']
}

export const ObjectsPage = () => {
    return <PageTemplate { ...page_content } />
}