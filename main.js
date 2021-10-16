import './style.css'
import regions from './regions';
import inregion from './inregion';
import f from './f.jpg';

const fucks = [];
const btnClear = document.getElementById('clear');
const btnSave = document.getElementById('save');
const canv = document.getElementById('canv');
const context = canv.getContext('2d');

const img = new Image(680, 680);
img.src = f;
img.onload = redraw;

btnClear.onclick = redraw;

btnSave.onclick = () => {
  let anchor = document.createElement('a');
  anchor.download = '🖕.png';
  anchor.href = document.getElementById('canv').toDataURL()
  anchor.click();
};

canv.onclick = function (e) {
  const { layerX: x, layerY: y } = e;
  const regionName = inregion({ x, y, regions });
  console.log(x, y);

  if (regionName) {
    const region = regions[regionName];
    redraw({ region });
  }
};

function redraw({ region = null }) {
  canv.width = 600;
  canv.height = 600;
  context.drawImage(img, 0, 0, canv.width, canv.height);

  if (typeof region === 'object') { 

    let custom = null;

    if (region.hasOwnProperty('custom') && region.custom === true) {
      custom = prompt('?');
    }

    let x,y;

    if (region.middlePoint.small) {
      context.font = "15px Arial";
      x = region.middlePoint.x - 5;
      y = region.middlePoint.y + 4;
    } else {
      context.font = "30px Arial Black";
      x = region.middlePoint.x - 12;
      y = region.middlePoint.y - -6;
    }

    context.fillText('✔️', x, y);

    if (custom) {
      context.fillText(custom, region.textLocation.startX, region.textLocation.startY)
    }

  }
}
