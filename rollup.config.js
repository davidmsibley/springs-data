import html from 'rollup-plugin-html';
import minify from 'rollup-plugin-minify-es';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';


function buildPlugins({dir='wc',min=false, es5=false}) {
  let result = [];
  if ('wc' === dir) {
    result.push(html({
      include: `${dir}/*.html`,
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true
      }
    }));
  } else if ('vue' === dir) {
    result.push(commonjs());
    result.push(vue());
  }
  if (min) {
    result.push(minify({
      output: {
        wrap_iife: true
      }
    }));
  }
  if (es5) {
    result.push(babel({
      exclude: 'node_modules/**',
      presets: [['@babel/env', { modules: false }]]
    }));
  }
  return result;
}

function buildConfig({dir='wc', filename='index', min=false, es5=false, format='umd'}) {
  let minifyToken = (min) ? '.min': '';
  let result = {
    input: `${dir}/${filename}.js`,
    plugins: buildPlugins({dir, min, es5}),
    external: ['@sibley/app-component'],
    output: {
      file: `dist/${dir}/${filename}${minifyToken}.js`,
      format: format,
      name: 'bundle',
      sourcemap: min,
      globals: {
        '@sibley/app-component': 'AppComponent'
      }
    }
  }
  return result;
}


export default [
  buildConfig({dir: 'wc', es5: true}),
  buildConfig({dir: 'wc', min: true, es5: true}),
  buildConfig({dir: 'vue', es5: true, format: 'iife'}),
  buildConfig({dir: 'vue', min: true, es5: true, format: 'iife'})
];
