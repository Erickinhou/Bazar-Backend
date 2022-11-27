import { ParsedQs } from "qs";
export class JsonConverter {
  public convertJsonToObject<T>(
    Json: string | ParsedQs | string[] | ParsedQs[]
  ) {
    try {
      console.log("Json ->", Json);

      return typeof Json === "string" ? (JSON.parse(Json) as T) : (Json as T);
    } catch (err) {
      console.error("Error converting Json");
    }
  }
}
