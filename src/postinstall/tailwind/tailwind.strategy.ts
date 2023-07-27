import { PackageJson } from "@storybook/types";
import { logger, colors } from "@storybook/node-logger";
import * as t from "@babel/types";

import { hasDependency } from "../utils/dependencies.utils";
import { SUPPORTED_STYLING_TOOLS, ToolConfigurationStrategy } from "../types";
import { createNode } from "../utils/babel.utils";
import { buildAddonConfig } from "../utils/configure";

const projectHasTailwind = (packageJson: PackageJson) =>
  hasDependency(packageJson, "tailwindcss") &&
  hasDependency(packageJson, "postcss");

export const tailwindStrategy: ToolConfigurationStrategy = {
  name: SUPPORTED_STYLING_TOOLS.TAILWIND,
  predicate: projectHasTailwind,
  main: async (mainConfig, meta) => {
    const [addonConfigNode] = createNode(
      buildAddonConfig({
        postcss: true,
      })
    );

    const addonsNodePath = ["addons"];
    let addonsArrayNode = mainConfig.getFieldNode(addonsNodePath);

    if (!addonsArrayNode) {
      mainConfig.setFieldNode(addonsNodePath, t.arrayExpression());
      addonsArrayNode = mainConfig.getFieldNode(addonsNodePath);
    }

    // @ts-expect-error
    addonsArrayNode.elements.push(addonConfigNode);

    return {
      changed: [
        `Configured ${colors.blue.bold("postcss")} for ${colors.blue.bold(
          "webpack"
        )}`,
      ],
      nextSteps: [`🚀 Launch ${colors.pink.bold("storybook")}`],
    };
  },
};
