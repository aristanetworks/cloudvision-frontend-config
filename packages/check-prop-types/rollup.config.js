import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.ts',
  onwarn: (warning) => {
    throw new Error(warning.message);
  },
  plugins: [typescript({ sourceMap: false })],
};

// Build preserving environment variables
if (env === 'es' || env === 'cjs') {
  config.output = {
    format: env,
    indent: false,
  };
}

// Replace NODE_ENV variable
if (env === 'development' || env === 'production') {
  config.output = {
    format: 'umd',
    name: 'check-prop-types',
    indent: false,
  };
  config.plugins.push(
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs(),
  );
}

if (env === 'production') {
  config.plugins.push(terser());
}

export default config;
