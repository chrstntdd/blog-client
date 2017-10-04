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

let app,
  vendor,
  server,
  isProduction = false;

const fuse = new FuseBox({
  homeDir: 'src',
  output: 'dist/$name.js',
  log: true,
  experimentalFeatures: true,
  cache: !isProduction,
  sourceMaps: !isProduction,
  hash: isProduction,
  tsConfig: './tsconfig.json',
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
fuse
  .bundle('server/public/vendor')
  .watch('client/**')
  .hmr()
  .instructions('~ client/index.tsx');

// bundle app
fuse
  .bundle('server/public/app')
  .watch('client/**')
  .hmr()
  .instructions('!> [client/index.tsx]');

/* bundle server */
fuse
  .bundle('server/bundle')
  .watch('server/**')
  .instructions(' > [server/index.ts]')
  .completed(proc => proc.start());

/* yarn watch */
Sparky.task('default', ['clean', 'copy-keys', 'config'], () => {
  return fuse.run();
});

Sparky.task('copy-keys', () =>
  Sparky.src('./keys', { base: './src/server' }).dest('./dist/server')
);

/* remove all old files */
Sparky.task('clean', () => Sparky.src('dist/*').clean('dist/'));
/* set production environment */
Sparky.task('prod-env', ['clean'], () => {
  isProduction = true;
});

Sparky.task('dist', ['prod-env', 'config'], () => fuse.run());
