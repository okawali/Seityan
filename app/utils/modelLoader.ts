import * as fs from "fs";
import * as path from "path";

export interface ModelDescription {
    basePath: string,
    modelFile: string
}

export default class ModelLoder {
    static loadModel(model: ModelDescription): object | null {
        var modelPath = path.join(model.basePath, model.modelFile);
        try {
            fs.accessSync(modelPath, fs.constants.F_OK | fs.constants.R_OK)
            return JSON.parse(fs.readFileSync(modelPath, "utf-8"));
        } catch (err) {
            try {
                modelPath = path.join("resources", "app.asar", model.basePath, model.modelFile);
                fs.accessSync(modelPath, fs.constants.F_OK | fs.constants.R_OK);
                return JSON.parse(fs.readFileSync(modelPath, "utf-8"));
            }
            catch (err) {
                return null;
            }
        }

    }
}