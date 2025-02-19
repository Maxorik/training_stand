import React from 'react';
import { Editor } from '../components/Editor'
import { PageTemplate } from "../components/PageTemplate";

const mapCode = `
const data = new Map([['somekey', 'str'], [true, false], [undefined, 1]]);
data.set(1, 'ключ1');

console.log(data.get('somekey'));
console.log(data.get('anotherkey')); // пусто

console.log(data.has(1));

// нас можно перебрать с помощью forEach \\ for ... of
console.log(data.values());
console.log(data.keys());
console.log(data.entries());

// либо превратить в массив
console.log(Array.from(data.values()));

console.log(data.size);

data.forEach((value, key) => {
  console.log(key, value)
});

// удалить определенный ключ
data.delete('somekey');
// очистить коллекцию
data.clear();
`;

const weakMapCode = `
const obj = { 1: 1 };
const wMap = new WeakMap([[obj, undefined], [Symbol("foo"), 'fo0o']]);
console.log(wMap.has(obj));
`;

const setCode = `
// объекты имеют ссылочный тип!
const arr = [{1: 1}, {1: 1}, 2, '2', 3, 3, 3, 3];
const data = new Set(arr);

console.log(data.size);

data.add(false);

data.delete(2);

console.log(data.has(1));

data.forEach(function(value) {
  console.log(value);
})

data.clear();
`;

const page_content = {
    content: ( <> {
`**Map** — коллекция для хранения данных любого типа в виде пар **[уникальный ключ, значение]**. В качестве ключей принимаются значения любого типа - это важно.
`} <Editor code={ mapCode } height={ 22 } /><hr /> {`
**WeakMap** отличается тем, что его ключи имеют ссылочный тип данных. Если у них нет значения, они удаляются из памяти.
Ключом **WeakMap** могут быть **объекты** или **символы**.
Преимущество перед **map** - оптимизация памяти. Не имеет перебора по ключам\\значениям.
`} <Editor code={ weakMapCode } height={ 3 } /><hr /> {`
**Set** — неиндексированная коллекция для хранения уникальных значений любого типа. Одно и то же значение нельзя добавить в **Set** больше одного раза.
При обходе коллекции нам гарантируется, что мы будем получать элементы в порядке их добавления.
`} <Editor code={ setCode } height={ 15 } /><hr /> {`
**WeakSet** полезен для временного хранения объектов без удержания их в памяти дольше необходимого. Поддерживает только **объекты**.Пример использования - хранение метаданных о **DOM-элементах**, чтобы не препятствовать их удалению, когда они больше не нужны.
**WeakSet** не имеет перебора элементов, но остается **has**.
`} </>),
    keywords: 'weakmap, weakset, хеш-таблица, коллекция',
    title: 'map и set',
    anchors: ['дока_set: https://doka.guide/js/set/', 'дока_map: https://doka.guide/js/map/']
}

export const MapSetPage = () => {
    return <PageTemplate { ...page_content } />
}