import React from 'react';
import { Editor } from '../components/Editor'
import { PageTemplate } from "../components/PageTemplate";

const thisInModule = `
"use strict"
/** Внутри модуля, при use strict, this === undefined */
function sayMyName() {
    console.log(\`Меня зовут \${this}\`);
}
sayMyName();
`;

const thisInGlobal = `
/** This - это глобальный объект. В браузере это будет window */
console.log(this);
`;

const thisInFunc = `
/** Контекст функции может изменить (один раз!) call, bind или apply */
function sayNameWithHobby(hobby) { 
  console.log(this.name + ' любит ' + hobby);
}

/** bind - создает новую функцию и привязывает к ней контекст */
const bindedFunc = sayNameWithHobby.bind({ name: "Петр" });
bindedFunc('футбол'); 

/** Можно сразу передать аргумент при bind функции */
const bindedArgFunc = sayNameWithHobby.bind({ name: "Виктор" }, "теннис");
bindedArgFunc(); 

/** call и apply не создают новую функцию, а вызывают имеющуюся */
sayNameWithHobby.call({ name: "Иван" }, "дартс");
// в apply аргументы передаются массивом
sayNameWithHobby.apply({ name: "Федор" }, ["рыбалку"]);

/** функция вызвана через new - this === {} */
const newF = new sayNameWithHobby('баскетбол');`;

const thisInArrowFunc = `
/** this возьмется из лексического окружения родителя в момент создания */
const myFunc = function() {
    return () => {
        console.log(this)
    }
}

myFunc.call('something')(); // this === something 
myFunc()(); // this === undefined`;

const page_content = {
    content: ( <> {
`**This** - это дополнительный параметр функции, который определяет контекст, в котором выполняется данная функция.
Обычно **this** - это объект, но он может принимать любые значения.

**call**, **bind** и **apply** тесно связаны с **this**. Это функции, которые изменяют либо устанавливают **this** для функции.
Также важно, используется ли в коде "use strict" .

Как определить, чему сейчас равен **this**?

1) **This** может быть вызван внутри модуля:`}
<Editor code={ thisInModule } />
{`

2) **This** находится вне модуля и вне функции: `}
<Editor code={ thisInGlobal } />
{`

3) **This** находится в обычной (не стрелочной) функции: `}
<Editor code={ thisInFunc } height={ 17 } />


{`4) **This** находится в стрелочной функции:`}
<Editor code={ thisInArrowFunc } height={ 8 } />

</>),
    keywords: 'контекст, bind, undefined',
    title: 'this, включая bind\\call\\apply',
    anchors: ['дока: https://doka.guide/js/function-context/']
}

export const ThisBindPage = () => {
    return <PageTemplate { ...page_content } />
}