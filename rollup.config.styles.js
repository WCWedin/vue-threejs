import styles from 'rollup-plugin-styles'
import cssNext from 'postcss-preset-env'
import multiInput from 'rollup-plugin-multi-input'

export default {
  input: ['src/**/*.css'],
  output: {
    dir: 'temp/'
  },
  plugins: [
    multiInput(),
    styles({
      autoModules: id => id.endsWith(".css"),
      dts: true,
      plugins: [cssNext]
    })
  ]
}
