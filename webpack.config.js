
const path = require('path');
//Esta línea carga un módulo de Node.js llamado path,
//que se usa para trabajar con rutas de archivos y directorios.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const CopyPlugin  = require("copy-webpack-plugin"); 
const CssMinimizerPlugin = require ("css-minimizer-webpack-plugin");
const TaserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { optimize } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



//Aquí estamos exportando un objeto de configuración para Webpack. Este objeto contiene toda la información que Webpack necesita para trabajar.
module.exports = {
    //unto de entrada de mi proyecto: Le decimos a Webpack cuál es el archivo principal de nuestro proyecto. 
    //En este caso, es ./src/index.js. Webpack comenzará a juntar los archivos a partir de este.
    entry: "./src/index.js",
    //Esta sección le dice a Webpack dónde y cómo guardar el archivo final juntado (bundle).
    output: {
        //Ruta de salida: Le decimos a Webpack que guarde el archivo final en una carpeta llamada dist.
        // path.resolve(__dirname, "dist") crea una ruta absoluta a la carpeta dist en nuestro proyecto.
        path: path.resolve(__dirname,"dist"),
        //Nombre del archivo de salida: Le decimos a Webpack que nombre el archivo final como main.js.
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    //Esta sección le dice a Webpack cómo manejar las extensiones de archivo.
    resolve : {
       // Extensiones: Le decimos a Webpack que solo considere los archivos con la extensión .js cuando esté juntando los archivos.
        extensions: [".js"],
            //Agregamos una key alias a nuestro objeto resolve
      //para ponerles nombres mas pequenos a las extensiones
        //de nuestros archivos
        alias: {
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@template": path.resolve(__dirname, "src/templates/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@images": path.resolve(__dirname, "src/assets/images/"),
          }
    },
    //Es una propiedad de la configuración de Webpack que define cómo tratar diferentes tipos de archivos en tu proyecto. Cada regla especifica un tipo de archivo y un conjunto de cargadores que deben aplicarse a esos archivos.
    module: {
        rules:[
            {
                //Descripción: Esta línea es una expresión regular que indica a Webpack qué archivos deben ser procesados por esta regla.
                //\.js$: Coincide con todos los archivos que tienen la extensión .js.
                //\.m?js$: Además, permite que coincidan también los archivos .mjs (módulos JavaScript ES6). La m? indica que la m es opcional.
                test:/\.m?js$/,
                //Descripción: Esta línea le dice a Webpack que ignore los archivos en la carpeta node_modules.
                //La carpeta node_modules contiene dependencias de terceros que generalmente ya están compiladas, por lo que no necesitan ser procesadas por Babel.
                exclude: /node_modules/,
                //Esta línea especifica el cargador (loader) que se utilizará para procesar los archivos que coinciden con la expresión regular definida en test.
                use: {
                    //loader: "babel-loader": Indica que babel-loader debe usarse para transformar estos archivos. 
                    //Babel-loader es un cargador que utiliza Babel para transpilar el código ES6/ES7/ES8+ a una versión de JavaScript compatible con versiones más antiguas de los navegadores.
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css|\.styl$/i,
                use:[MiniCssExtracPlugin.loader,
                    "css-loader",
                    "stylus-loader"
                ],

            },
            {
                test:  /\.(png|jpg|gif)$/i,
                type: "asset/resource",
                use: [
                    {loader: 'file-loader', // Usa file-loader para manejar archivos de imagen
                        options: {
                          name: '[path][name].[ext]'}
                        }
                ]
                
            },
            {
                test: /\.(woff|woff2)$/,
                use:{
                    loader: "url-loader",
                    options:{
                        limit: 10000,
                        mimetype:"application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./src/assets/fonts/",
                        publicPath: "../src/assets/fonts/",
                        esModule: false,

                    },
                }
            },

        ]
    },
    plugins :[
        new HtmlWebpackPlugin({
            inject : true,
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtracPlugin({
            filename: ".assets/[name].[contenthash].css"
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname,"src", "assets/images"),
                    to: "assets/images"
                 }
                ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TaserPlugin()
        ] 
    }

}








