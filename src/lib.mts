import { Logger } from "./logger";
import { cookies } from "./cookies";

const deepMerge = (obj1: any, obj2: any) => {
  let result = { ...obj1 };
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (
        typeof obj2[key] === "object" &&
        obj2[key] !== null &&
        !Array.isArray(obj2[key])
      ) {
        if (
          typeof result[key] === "object" &&
          result[key] !== null &&
          !Array.isArray(result[key])
        ) {
          result[key] = deepMerge(result[key], obj2[key]);
        } else {
          result[key] = deepMerge({}, obj2[key]);
        }
      } else {
        result[key] = obj2[key];
      }
    }
  }
  return result;
};

export { Logger, cookies, deepMerge };
