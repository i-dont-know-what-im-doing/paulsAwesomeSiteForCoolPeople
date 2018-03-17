const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const extractSass = new ExtractTextPlugin( {
    filename: "static.css"
} );

module.exports = {
    entry: [ 'whatwg-fetch', './web/index.js' ],
    output: {
        filename: 'bundle.js',
        path: path.resolve( __dirname, 'public' )
    },
    module: {
        loaders: [
            {
                test: /\.html/,
                loader: "html-loader"
            }
        ],
        rules: [
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader'
                    }, {
                        loader: 'markup-inline-loader',
                        options: {
                            svgo: {
                                plugins: [
                                    {
                                        removeTitle: true,
                                    },
                                    {
                                        removeUselessStrokeAndFill: false,
                                    },
                                    {
                                        removeUnknownsAndDefaults: false,
                                    },
                                ],
                            },
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractSass.extract( {
                    fallback: "style-loader",
                    use: [ {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    } ]
                } )
            },
            {
                test: /\.(eot|woff|woff2|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                //test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/
                //loader: 'url?limit=100000&name=[name].[ext]'
                use: "url-loader"
            },
            {
                test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])$/,
                use: "url-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: "file-loader"
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin( [ 'public' ] ),
        new HtmlWebpackPlugin( {
            template: "web/index.html",
            svgoConfig: {
                removeTitle: false,
                removeViewBox: true,
            }
        } ),
        new HtmlWebpackPlugin( {
            filename: "error.html",
            template: "web/error.html",
            svgoConfig: {
                removeTitle: false,
                removeViewBox: true,
            }
        } ),
        extractSass
    ]
};

