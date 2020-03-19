export const formMixin = {
  methods: {
    typeToComponent(questionType: string): string {
      switch (questionType) {
        case 'text':
          return 'BaseTextField';
        case 'radio':
          return 'BaseRadioButtons';
        case 'select':
          return 'BaseSelect';
        case 'multiselect':
          return "BaseMultiselect";
        default:
          return 'BaseTextField';
      }
    },
    parseQuery(queryString: string): object {
      // returns key-value pairs object: {"key1": "val1", "key2": "val2"}
      let keyValueArray = queryString.replace(/^\?/, '').split('&');
      let queryObject: any = {};
      for (let pair of keyValueArray) {
        let key = pair.split('=')[0];
        let value = pair.split('=')[1];
        queryObject[key] = value;
      }
      return queryObject;
    }
  }
};
