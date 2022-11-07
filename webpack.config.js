const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'static/bundle.[contenthash].js',
    clean: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              noEmit: false, // emit javascript files
            },
          },
        },
      },
      {
        test: /\.css$/,
        // use extract plugin instead of 'style-loader' to extract css/scss to separate file
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          // use extract plugin instead of 'style-loader' to extract css/scss to separate file
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      // enable baseUrl in tsconfig
      new TsconfigPathsPlugin({
        /* options: @see https://www.npmjs.com/package/tsconfig-paths-webpack-plugin */
      }),
    ],
  },
  devServer: {
    compress: true,
    // access static folder
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    port: 3000,
    host: 'localhost',
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      '...',
      // minimize css/scss
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    // copy public to build folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
          globOptions: {
            gitignore: true,
            ignore: [path.join(__dirname, 'public/index.html')],
          },
        },
      ],
    }),
    // supply template for react root
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    // create separate html file instead of embedding inside index.html
    new MiniCssExtractPlugin({ filename: 'static/[name].[contenthash].css' }),
  ],
};
