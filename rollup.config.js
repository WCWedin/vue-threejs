import eslint from '@rollup/plugin-eslint'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import ttypescript from 'ttypescript'
import vue from 'rollup-plugin-vue'
import styles from 'rollup-plugin-styles'
import cssNext from 'postcss-preset-env'

export default {
  input: 'src/vue-threejs.ts',
  output: {
    file: 'dist/vue-threejs.mjs',
    format: 'es'
  },
  plugins: [
    eslint(),
    vue(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    }),
    styles({
      modules: true,
      plugins: [cssNext]
    }),
    typescript({
      typescript: ttypescript
    })
  ]
}
