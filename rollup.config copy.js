import eslint from '@rollup/plugin-eslint'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import ttypescript from 'ttypescript'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import cssNext from 'postcss-preset-env'

export default {
  input: 'src/vue-threejs.ts',
  output: {
    file: 'dist/vue-threejs.mjs',
    format: 'esm'
  },
  plugins: [
    eslint(),
    vue(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    }),
    // Process only `<style module>` blocks.
    postcss({
      modules: {
        generateScopedName: '[local]___[hash:base64:5]',
      },
      include: /&module=.*\.css$/,
      plugins: [cssNext]
    }),
    // Process all `<style>` blocks except `<style module>`.
    postcss({
      include: /(?<!&module=.*)\.css$/,
      plugins: [cssNext]
    }),
    typescript({
      typescript: ttypescript
    }),
  ]
}
