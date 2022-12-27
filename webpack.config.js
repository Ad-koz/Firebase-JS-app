const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
module.exports = {
entry: {
main: path.resolve(__dirname, './src/app.js'),
},
output: {
filename: 'app.bundle.js',
path: path.resolve(__dirname, 'dist')
},
plugins: [
new HtmlWebpackPlugin({
template: "index.html"
}),
],
module: {
rules: [
{
test: /\.css$/i,
use: ["style-loader", "css-loader"],
},
],
},
};