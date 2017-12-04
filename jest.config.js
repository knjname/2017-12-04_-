module.exports = {
    "verbose": true,
    "transform": {
        "\\.tsx?$": "ts-jest"
    },
    "moduleNameMapper": {
        "\\.s?css": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
    ],
    "testRegex": "\\.test\\.tsx?$",
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/**/*.ts",
        "src/**/*.tsx"
    ],
    "moduleDirectories": [
        "node_modules",
        "<rootDir>"
    ],
    "unmockedModulePathPatterns": [
        "\\.scss$"
    ]
}