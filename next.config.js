const webpack = require("webpack");
const path = require("path");
const { parsed: localEnv } = require("dotenv").config();

module.exports = {
    webpack(config, { isServer }) {
        config.resolve.alias["~"] = path.resolve(__dirname, "src");

        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

        config.module.rules.push({
            test: /\.(js|jsx)$/,
            use: "webpack-import-glob-loader"
        });

        if (!isServer) {
            config.node = {
                fs: "empty"
            };
        }

        config.externals = {
            googleapis: "googleapis"
        };

        return config;
    },
    env: {
        settings: {
            title: "Google Calendar Launchpad",
            reduxDebugMode: false,
            api: "http://localhost:3001/api/",
            symbols: {
                parser: {
                    TODAY: "t",
                    DAY: "d",
                    WEEK: "w",
                    MONTH: "m",
                    YEAR: "y"
                },
                review: {
                    EMPTY: "EMPTY",
                    EDITING: "EDITING",
                    REVIEW: "REVIEW",
                    SENDING: "SENDING",
                    SEND_SUCCESS: "SEND_SUCCESS",
                    SEND_FAILURE: "SEND_FAILURE"
                }
            }
        }
    }
};
