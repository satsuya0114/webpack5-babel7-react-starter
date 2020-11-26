import _ from 'lodash';
import './style.less';
import Icon from './icon.png';
import Svg from './worldwide.svg';
import txt from './hello.txt';
import printMe from './print';

console.log(txt); // hello world

function component() {
  const element = document.createElement('div');
 
  element.innerHTML = _.join(['Hello', 'neinei'], ' ');
  element.onclick = printMe.bind(null, 'Hello webpack!');
  element.classList.add('hello');
  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;  

  element.appendChild(btn);
 
  return element;
}
 
let element = component(); // 存储 element，以在 print.js 修改时重新渲染
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
    document.body.removeChild(element);
    element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
    document.body.appendChild(element);
  })
}