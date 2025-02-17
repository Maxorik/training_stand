import React from 'react';
import { Editor } from '../components/Editor'
import { PageTemplate } from "../components/PageTemplate";

const code = `
let z = 1;

if(true) {
    var f = 10
    let a = 10
    b = 4
    let z = 5
}

console.log('z =', z);
console.log('f =', f);
// console.log('a =', a); undefined!
console.log('b =', b);
console.log('z =', z); // все еще 1, в блочной области другая переменная

const d = {}
d['a'] = 10
d = {...d}

// console.log(d); Ошибка при переопределении const
`;

const page_content = {
    content: ( <> {
`Для имени переменной можно использовать следующие символы:

◽ буквы латинского алфавита;
◽ цифры;
◽ символы $ и _.

Первый символ не должен быть цифрой.
Нельзя использовать зарезервированные языком слова **class, super, throw, yield, var, let, const** и т.д.

**let** и **const**:
◽ При помощи **const** нельзя объявлять переменные без значения.
◽ Объект, хранящийся в **const**, можно мутировать.
◽ К переменным **let** и **const** нельзя обращаться до их объявления в коде.
◽ Имеют блочную область видимости и не становятся частью глобального объекта.
◽ Объявление переменной с именем, которое уже используется в текущей области видимости, приведёт к ошибке.

**var** работает наоборот:
◽ Можно объявлять без присвоения им значения (будет **undefined**).
◽ Имеет функциональную область видимости.
◽ Объявление переменных вне функций делает их глобальными переменными (**var a === window.a**).
◽ К ним можно обращаться до момента объявления (всплывают, **hoisting**).
◽ Можно еще раз создать переменную с существующим именем, тогда значение перезапишется 
**var a = 5; var a = 15 // a === 15**.

`} <Editor code={ code } height={ 17 }/>
</>),
    keywords: 'область видимости переменной',
    title: 'var let const',
    anchors: ['дока: https://doka.guide/js/var-let/']
}

export const VarLetPage = () => {
    return <PageTemplate { ...page_content } />
}