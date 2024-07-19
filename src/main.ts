import './style.css';
import { stat, size, curSize } from '../lib/lshelper';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="card">
    <button id="stat" type="button">Calc Local Storage Stat</button>
    <span id="statValue"></span>
  </div>

  <div class="card">
    <button id="size" type="button">Calc Local Storage Max Size</button>
    <span id="sizeValue"></span>
  </div>

  <div class="card">
    <button id="curSize" type="button">Calc Current Local Storage Size</button>
    <span id="curSizeValue"></span>
  </div>
`;

document.querySelector('#stat')?.addEventListener('click', () => {
  const statRet = stat();
  document.querySelector('#statValue')!.innerHTML = `
    Max size: ${statRet.total / 1024 / 1024}Mb\n
    Used size: ${statRet.used / 1024 / 1024}Mb\n
    Free size: ${statRet.free / 1024 / 1024}Mb\n
    Used rate: ${(statRet.used / statRet.total) * 100}%\n
    Key size: ${statRet.usedKey / 1024}Kb\n
    Content size: ${statRet.usedContent / 1024}Kb\n
  `;

  console.log('local storage stat: ', statRet);
});

document.querySelector('#size')?.addEventListener('click', () => {
  const bytes = size();
  document.querySelector('#sizeValue')!.innerHTML = `Max size: ${bytes / 1024 / 1024}Mb`;

  console.log('max size: ', bytes);
});

document.querySelector('#curSize')?.addEventListener('click', () => {
  const bytes = curSize();
  document.querySelector('#curSizeValue')!.innerHTML = `Current size: ${bytes / 1024 / 1024}Mb`;

  console.log('max size: ', bytes);
});
