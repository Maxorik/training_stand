import React, { useState } from 'react';
import { Editor } from '../Editor'

const Content_01 = () => {
    let str = `let a = 5; \nconsole.log(a)\nconsole.log("12")\nconsole.log('ddd', a)\nconsole.log()`;

    let promise =
`setTimeout(function timeout() {
  console.log('Таймаут');
}, 0);

let p = new Promise(function(resolve, reject) {
 console.log('Создание промиса');
 resolve();
});

p.then(function(){
 console.log('Обработка промиса');
});

console.log('Конец скрипта');`

    return <Editor code={ promise } />

}

export default Content_01;