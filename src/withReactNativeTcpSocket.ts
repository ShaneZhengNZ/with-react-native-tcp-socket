import { ConfigPlugin, createRunOncePlugin, withAppBuildGradle } from "expo/config-plugins";

const pkg = {
  name: "react-native-tcp-socket",
  version: "UNVERSIONED",
};

const withReactNativeTcpSocket: ConfigPlugin<void> = (config) => {
  return withAppBuildGradle(config, (config) => {
    const rnTcpSocketImplementation = `implementation(project(':${pkg.name}')) {
        exclude group: 'org.bouncycastle'
    }`;

    if (!config.modResults.contents.includes(pkg.name)) {
      config.modResults.contents = config.modResults.contents.replace(
        /dependencies\s?{/,
        `dependencies {
    ${rnTcpSocketImplementation}
    `,
      );
    }

    return config;
  });
};


export default createRunOncePlugin(withReactNativeTcpSocket, pkg.name, pkg.version);
