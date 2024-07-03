import Template from '@template/Template.js';
import "@styles/main.css"
import "@styles/vars.styl"
console.log('hola abel');

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
