export class JsonConverter {
  public convertJsonToObject<T>(json: any) {
    try {
      return JSON.parse(json) as T;
    } catch (err) {
      throw Error("JSON invalid");
    }
  }
}
