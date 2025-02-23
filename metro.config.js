const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ["require", "import"];
config.resolver.sourceExts = ["js", "jsx", "json", "ts", "tsx"];
config.resolver.assetExts = ["png", "jpg", "jpeg", "gif"];

module.exports = config;
