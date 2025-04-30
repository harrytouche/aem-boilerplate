import { toCamelCase } from '../../scripts/aem.js';

export default function decorate(block) {
  const heroBlockData = {};
  block.id = 'destination-hero';

  [...block.children].forEach((row) => {
    // console.log(row.children)
    //  console.log('---');

    const ch = row.children;
    const elType = ch[0];
    const el = ch[1];
    let dataKey = null;
    let dataValue = null;
    elType.className += ' hero-block-meta';

    switch (elType.innerText) {
      case 'Name':
        // console.log('is title');

        dataKey = toCamelCase(elType.innerText);
        dataValue = el.children[0].innerText;
        heroBlockData[dataKey] = dataValue;

        el.className += ' hero-block-title';
        block.append(el);
        break;

      case 'Image':

        // console.log('is image');
        el.className += ' hero-block-image';
        block.append(el);
        break;

      default:
        // sets as data in a key value pair which is pushed to datalayer
        // console.log('unknown, setting as data');
        dataKey = toCamelCase(elType.innerText);
        dataValue = el.innerText;
        heroBlockData[dataKey] = dataValue;
        el.remove();
        break;
    }

    // remove the keys and old row from the table as not needed
    elType.remove();
    row.remove();
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ destinationHero: heroBlockData });
}
