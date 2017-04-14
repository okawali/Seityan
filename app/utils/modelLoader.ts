import * as fs from "fs";
import * as path from "path";
import axios from "axios";

export interface ModelDescription {
    basePath: string,
    modelFile: string
}

export class ModelLoader {
    static async loadModelAsync(model: ModelDescription): Promise<object | null> {
        console.log(model);
        var modelPath = path.join(model.basePath, model.modelFile);
        console.log(modelPath);
        var response = await axios.get(modelPath);
        return response.data;
    }
}
