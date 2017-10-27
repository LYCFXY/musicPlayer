module.exports = {
    devtool: 'eval-source-map',
    entry: './scripts/app.js',  //入口文件
    output: {
        filename: 'dist/app.js' //输出文件
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /\.js$/,   //找到符合条件的文件
                exclude: /(node_modules|bower_components)/, //排除掉一些文件夹
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
}