const {
  FuseBox,
  SVGPlugin,
  CSSPlugin,
  SassPlugin,
  CSSModules,
  QuantumPlugin,
  WebIndexPlugin,
  Sparky
} = require('fuse-box');

let fuse,
  app,
  vendor,
  isProduction = false;

Sparky.task('config', () => {
  fuse = new FuseBox({
    homeDir: 'src/client',
    output: 'dist/$name.js',
    log: true,
    experimentalFeatures: true,
    cache: !isProduction,
    target: 'browser',
    sourceMaps: !isProduction,
    hash: isProduction,
    tsConfig: './tsconfig.client.json',
    plugins: [
      SVGPlugin(),
      [
        SassPlugin({
          outputStyle: 'compressed'
        }),
        CSSModules(),
        CSSPlugin()
      ],
      WebIndexPlugin({
        template: 'src/client/index.html',
        title: 'Christian Todd'
      }),
      isProduction &&
        QuantumPlugin({
          removeExportsInterop: false,
          bakeApiIntoBundle: 'vendor',
          uglify: true,
          treeshake: true
        })
    ]
  });
  // vendor
  vendor = fuse.bundle('vendor').instructions('~ index.tsx');

  // bundle app
  app = fuse.bundle('app').instructions('!> [index.tsx]');
});

Sparky.task('default', ['clean', 'copy-assets', 'config'], () => {
  fuse.dev({ root: './dist' });
  // add dev instructions
  app.watch().hmr();
  return fuse.run();
});

Sparky.task('copy-assets', () =>
  Sparky.src('./assets', { base: './src' }).dest('./dist')
);

Sparky.task('clean', () => Sparky.src('dist/*').clean('dist/'));
Sparky.task('prod-env', ['clean'], () => {
  isProduction = true;
});

Sparky.task('dist', ['prod-env', 'config'], () => fuse.run());
