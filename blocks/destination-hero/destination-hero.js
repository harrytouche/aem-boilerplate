export default function decorate(block) {
  const heroBlock = document.createElement('div');
  const heroBlockBin = document.createElement('div');
  let heroBlockData = {};

  [...block.children].forEach((row) => {
    // console.log(row.children)
    //  console.log('---');

    const ch = row.children;
    const elType = ch[0];
    const el = ch[1];
    elType.className += ' hero-block-meta';

    switch (elType.innerText) {
      case 'Name':
        // console.log('is title');
        el.className += ' hero-block-title';
        break;

      case 'Image':
        // console.log('is image');
        el.className += ' hero-block-image';
        break;

      case 'Data':
        // console.log('is data');
        el.className += ' hero-block-data';
        heroBlockData = JSON.parse(el.querySelector('code').innerText);
        break;

      default:
        // console.log('unknown');
        el.className += ' hero-block-meta';
        break;
    }
    heroBlock.append(el);
    heroBlockBin.append(elType);
  });

  block.append(heroBlock);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'hero-block-data': heroBlockData });
}
