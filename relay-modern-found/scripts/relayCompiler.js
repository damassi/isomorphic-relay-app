const spawn = require('child_process').spawn
const path = require('path')

// prettier-ignore
const args = [
  '--extensions', 'js', 'jsx', 'ts', 'tsx',
  '--schema', path.resolve(__dirname, '../../graphql/metaphysics/data/schema.graphql'),
  '--language', 'typescript',

  '--src', path.resolve(__dirname, '..'),
  '--artifactDirectory', './src/__generated__',

  '--include',
    'src/**',
    'node_modules/@artsy/reaction/src/**',

  '--exclude',
    'node_modules/@artsy/reaction/node_modules/**',

  '--no-watchman'
];

if (process.argv.includes('--watch')) {
  args.push('--watch')
}

if (process.argv.includes('--no-watchman')) {
  // use this flag if linking node modules
  args.push('--no-watchman')
}

const proc = spawn(
  path.resolve(__dirname, '../node_modules/.bin/relay-compiler'),
  args,
  { stdio: 'inherit' }
)

proc.on('close', code => {
  process.exit(code)
})
