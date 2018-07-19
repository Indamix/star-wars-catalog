import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';

const HTTP_PORT = 8000;

gulp.task('default', ['webpack-dev-server']);

gulp.task('build', callback => {
  const config = Object.create(webpackConfig);
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(config, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({colors: true}));
    callback();
  });
});

gulp.task('webpack-dev-server', () => {
  const config = Object.create(webpackConfig);
  config.devtool = 'eval-source-map';
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    })
  );

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: {
      assets: false,
      children: false,
      chunkModules: false,
      chunks: false,
      colors: true,
      hash: false,
      timings: false,
      version: false
    }
  }).listen(HTTP_PORT, '0.0.0.0', err => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log(
      '[webpack-dev-server]',
      `http://localhost:${HTTP_PORT}/webpack-dev-server/`
    );
  });
});
