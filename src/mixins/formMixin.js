export const formMixin = {
  methods: {
    typeToComponent(questionType) {
      if (questionType == "text") {
        return "BaseTextField";
      } else {
        return "BaseSelect";
      }
    },
    parseQuery(queryString) {
      // returns key-value pairs object: {"key1": "val1", "key2": "val2"}
      let keyValueArray = queryString.replace(/^\?/, "").split("&");
      let queryObject = {};
      for (let pair of keyValueArray) {
        let key = pair.split("=")[0];
        let value = pair.split("=")[1];
        queryObject[key] = value;
      }
      return queryObject;
    }
  }
};
