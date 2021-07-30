import eslint from '@rollup/plugin-eslint'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/vue-threejs.ts',
  output: {
    file: 'dist/vue-threejs.mjs',
    format: 'es'
  },
  plugins: [
    eslint(),
    nodeResolve({
      resolveOnly: ['./src/**/*']
    }),
    typescript()
  ]
}
