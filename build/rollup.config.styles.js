import styles from 'rollup-plugin-styles'
import cssNext from 'postcss-preset-env'
import multiInput from 'rollup-plugin-multi-input'
import del from 'rollup-plugin-delete'

export default {
  input: ['src/**/*.css'],
  output: {
    dir: '.temp/rollup-config-styles'
  },
  plugins: [
    multiInput(),
    del({
      verbose: true,
      targets: [
        'src/**/*.css.d.ts',
        '.temp/rollup-config-styles'
      ]
    }),
    styles({
      autoModules: id => id.endsWith(".css"),
      dts: true,
      plugins: [cssNext]
    })
  ]
}
