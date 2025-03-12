import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');

  const customCardsData = [];

  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    const ch = row.children;
    for (let i = 0; i < ch.length;) {
      const el = ch[i];

      // image column
      if (el.querySelector('picture')) {
        el.className = 'custom-cards-card-image';
        // console.log(el);
        li.append(el);

        // code column
      } else if (el.querySelector('code')) {
        const elData = JSON.parse(el.querySelector('code').innerText);
        // console.log(elData)
        customCardsData.push(elData);
        i += 1; // don't append this block, just push to datalayer and move increment i

        // body column
      } else {
        el.className = 'custom-cards-card-body';
        // console.log(el);
        li.append(el);
      }
    }

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'custom-cards-data': customCardsData });
}
