export default [
  {
    input: 'src/index.js',
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'public/bundle.js'
    },
  }
]