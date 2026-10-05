import addOnUISdk from 'https://express.adobe.com/static/add-on-sdk/sdk.js';

const button = document.getElementById('add-to-express');
const status = document.getElementById('express-status');

async function connectExpress() {
  try {
    await addOnUISdk.ready;
    if (!window.designXDMSneaker || !addOnUISdk.app?.document?.addImage) {
      throw new Error('The Adobe Express canvas is unavailable.');
    }
    button.disabled = false;
    button.textContent = 'Add to Express';
    status.textContent = 'Create your design, then add it to your page.';
    button.addEventListener('click', async () => {
      button.disabled = true;
      button.textContent = 'Adding sneaker…';
      status.textContent = 'Preparing your sneaker artwork.';
      try {
        const blob = await window.designXDMSneaker.createPNG();
        await addOnUISdk.app.document.addImage(blob, {
          title: window.designXDMSneaker.getName(),
        });
        status.textContent = 'Sneaker added to your Adobe Express page.';
      } catch (error) {
        console.error('Sneaker insertion failed:', error);
        status.textContent = 'Could not add the sneaker. Check your connection and try again.';
      } finally {
        button.disabled = false;
        button.textContent = 'Add to Express';
      }
    });
  } catch (error) {
    console.error('Adobe Express connection failed:', error);
    status.textContent = 'Open this add-on inside an Adobe Express project to use Add to Express.';
    button.textContent = 'Express unavailable';
    button.disabled = true;
  }
}

connectExpress();
