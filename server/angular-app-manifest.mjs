
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1151, hash: '61af152f19ed341953e4901f1156df630524f94962b1df874363e24dd97394f9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1007, hash: '3f23ddf34b7a042d34af62ac8a23e436175633c63f07dede3fe7f327382a6561', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 10141, hash: '1e0ee09e391c96afa6165cc5036b902aaab5bfa9e0cd0b352ad03a8b8168d883', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-GQJZA2P7.css': {size: 3890, hash: 'X5+OBjfaVlo', text: () => import('./assets-chunks/styles-GQJZA2P7_css.mjs').then(m => m.default)}
  },
};
