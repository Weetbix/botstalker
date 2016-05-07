module.exports = {
    "parser": "babel-eslint",
    "rules": {
        "strict": 0,
        "indent": [
            2,
            2
        ],
        "quotes": [
            2,
            "single"
        ],
        "linebreak-style": [
            2,
            "windows"
        ],
        "semi": [
            2,
            "always"
        ]
    },
    "ecmaFeatures": {
      "modules": true,
      "spread": true,
      "experimentalObjectRestSpread": true,
      "destructing": true,
      "restParams": true
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": "eslint:recommended"
};