import eslint from '@rollup/plugin-eslint'
import styles from 'rollup-plugin-styles'
import cssNext from 'postcss-preset-env'
import typescript from 'rollup-plugin-typescript2'
import ttypescript from 'ttypescript'

export default {
  input: 'src/vue-threejs.ts',
  output: {
    file: 'dist/vue-threejs.mjs'
  },
  external: ['vue', 'three'],
  plugins: [
    eslint({
      include: '*.ts'
    }),
    styles({
      autoModules: id => id.endsWith(".css"),
      plugins: [cssNext]
    }),
    typescript({
      typescript: ttypescript
    })
  ]
}
