import React from 'react';
import { Editor } from '../components/Editor'
import { PageTemplate } from "../components/PageTemplate";

const arrCode = `
// добавление
const arr = [5, 6, 7];
arr.push(1);    // сложность O(1)
arr.unshift(9); // сложность O(n) - это затратно

console.log(arr);

// удаление
const lastEl = arr.pop();    
console.log(lastEl);

const firstEl = arr.shift(); // сложность O(n) - это затратно
console.log(firstEl);
`;

const arrSearch = `
const arr = [1, 9, 7, 23, 1, 1, 90, 7];
console.log(arr.indexOf(1));
console.log(arr.includes(90));
console.log(arr.at(-2));

// если нужно первое совпадение
console.log(arr.find(el => el > 7 && el < 10));
console.log(arr.findIndex(el => el === 7));

// если нужно последнее совпадение
console.log(arr.findLast(el => el > 20));
console.log(arr.findLastIndex(el => el === 1));
`;

const arrCopy = `
const arr = [2, 4, 5];
const addressCopy = arr;
const fullCopy = [...arr];

arr.push(99);

console.log(addressCopy);
console.log(fullCopy);
`;

const arrOther = `
const arr = [1, 4, 7, 12, 9, 12, 6];
// перевернутый массив
const reversedArr = arr.reverse();
console.log(reversedArr);

// отсортированный массив
const sorted = arr.sort((a, b) => a - b);
console.log(sorted);

// произвольная вставка
const beginIndex = 2;  // куда вставляем
const elemsCount = 1;  // сколько элементов удалить перед beginIndex
const newData = '444'; // что вставляем - включая 555 и 666 ниже
arr.splice(beginIndex, elemsCount, newData, 555, 666);
console.log(arr);
`;

// получить результат (не массив)
const arrRes = `
const arr = [1, 4, 7, 12];

// проверка, что ВСЕ значения удовлетворяют условию
const checkEvery = arr.every(el => el < 20);
console.log(checkEvery);

// проверка, что хотя бы одно значение удовлетворяет условию
const checkSome = arr.some(el => el === 7);
console.log(checkSome);

// получить некий конечный результат по всем элементам
// метод с конца - reduceRight
const initialValue = 0;
const sumResult = arr.reduce((acc, current) => {
    return acc + current;
}, initialValue);
console.log(sumResult);

// объединить массив в строку
const arrToStr = ['make', 'love,', 'not', 'warcraft'];
console.log(arrToStr.join(' '));
`;

const arrNew = `
// слияние нескольких массивов
const arr1 = [1, 2];
const arr2 = ['a', 'b'];
const arr3 = [true, false];
const concatedArr = arr1.concat(arr2, arr3);
console.log(concatedArr);

// рекурсивное объединение
const reArr = [1, 2, [3, 4, [5]]];
const depth = 2; // глубина объединения
console.log(reArr.flat(depth));

// отфильтрованный массив
const arr = [1, 4, 7, 12, 9, 12, 6];
const filteredArr = arr.filter(el => el < 5);
console.log(filteredArr);

// поверхностная копия без выбранных индексов
const slicedArr = arr.slice(1, 4);
console.log(slicedArr);

// проходим по всем элементам, получая новый массив
const newArr = arr.map(el => el * 2);
console.log(newArr);
`;

const page_content = {
    content: ( <> {
`**Массив** нужен для хранения упорядоченных коллекций. Элементы массива могут быть разных типов (в том числе другими массивами).
Элементы хранятся в пронумерованных ячейках. Если ячейка пустая, то при обращении к ней вернется **undefined**.
Если мы хотим использовать массив как **очередь**, пользуемся операциями **push** и **shift**.
Если как **стек** - то **push** и **pop**.

Добавление и удаление элементов:
`} <Editor code={ arrCode } height={ 11 } /> {`
**Поиск** по массиву.
**indexOf()**, чтобы найти, под каким индексом хранится элемент.
**includes()**, чтобы проверить, что элемент есть в массиве.
**at()** - для получения значения по (отрицательному) индексу.
`} <Editor code={ arrSearch } height={ 10 } /> {`
**Копирование** массива.
Массив работает как объект - если присвоить массив переменной, а потом изменить его - изменится и значение переменной.
`} <Editor code={ arrCopy } height={ 7 } /> {`
Есть много методов работы с массивом, в результате которых можно получить:
◽ полностью новый массив (не изменяя исходный)
◽ измененный исходный массив
◽ некое значение

**Полностью новый массив** означает, что изменяя исходный массив - новый массив не изменится. Как получить:
`} <Editor code={ arrNew } height={ 20 } /> {`

**Измененный массив** означает, что в результате мы получим ту же ссылку на исходный массив. Если изменить элементы исходного массива, измененный массив так же поменяется:
`} <Editor code={ arrOther } height={ 13 } /> {`

Из массива можно получить какое-то значение - на каком индексе находится элемент, есть ли что-то конкретное в массиве и т.п.:
`} <Editor code={ arrRes } height={ 18 } /> {`

`} </>),
    keywords: 'нумерованный список',
    title: 'array',
    anchors: ['mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array']
}

export const ArrayPage = () => {
    return <PageTemplate { ...page_content } />
}