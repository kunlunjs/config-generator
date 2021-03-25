import { ConfigGenerator } from "./abstract";
import BabelGenerator from './babel'

const generatorMap: Record<string, ConfigGenerator> = {}

generatorMap[BabelGenerator.key] = BabelGenerator

export default async function run() {
  for (const key in generatorMap) {
    if (!await generatorMap[key].checkExist()) {
      console.log(`generating ${key}`)
      await generatorMap[key].generateConfig()
    }
  }
}