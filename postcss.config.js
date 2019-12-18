module.exports = {
    plugins: [
        require('postcss-cssnext'),
        require('postcss-adaptive')({
            remUnit: 75,
            baseDpr: 2,
            remPrecision: 6,
            hairlineClass: 'hairlines',
            autoRem: true,
        })
    ]
}
