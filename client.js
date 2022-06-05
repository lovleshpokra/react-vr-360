// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance} from 'react-360-web';
const SimpleRaycaster = {
  drawsCursor: () => true,
  fillDirection: direction => {
    direction[0] = 0;
    direction[1] = 0;
    direction[2] = -1;
    return true;
  },
  fillOrigin: origin => {
    origin[0] = 0;
    origin[1] = 0;
    origin[2] = 0;
    return true;
  },
  getMaxLength: () => Infinity,
  getType: () => "simple",
  hasAbsoluteCoordinates: () => false
};
function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    antialias: false,
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('Hello360', {}),
    r360.getDefaultSurface()
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('main.jpg'), {
    format: '3DTB',
  });
  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(SimpleRaycaster);
  r360.compositor.setCursorVisibility('visible');
  r360.start()
}

window.React360 = {init};
