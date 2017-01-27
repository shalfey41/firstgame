'use strict';

module.exports = {
    extends: 'airbnb',

    plugins: [
        'react',
    ],

    rules: {
        indent: ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
        }],

        // http://eslint.org/docs/rules/space-before-function-paren
        'space-before-function-paren': 0,

        // http://eslint.org/docs/rules/func-names
        'func-names': 0,

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': [2, 4],

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': [2, 4],
    },

    settings: {
        'import/resolver': {
            webpack: {
                config: `${__dirname}/webpack.config.js`,
            },
        },
    },

    env: {
        browser: true,
        es6: true,
    },

    globals: {
        ENV: false,
        NODE_ENV: false,
        API_VERSION: false,
        Backbone: false,
    },

    parser: 'babel-eslint',
};
