module.exports = {
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|ts?)$",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    testURL: "http://localhost/",
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx,js,jsx}"
    ]
}