import { Model } from 'sequelize-typescript';

// TODO: Add sequelize-typescript's types to this. I only created this to add my comments and make this.sequelizeFilters clearer in services
export type SequelizeFilters = {
  /**
   * Filters a query by a column on the model in question
   */
  where?: object;

  /**
   * Array that denotes filters based on other models
   */
  include?: [
    {
      /**
       * Model associated with model in question
       */
      model: Model;

      /**
       * Ensures the attributes you want to include from this model exist; if they don't exist, Sequelize throws an error
       */
      required?: boolean;
      /**
       * Attributes on the model specified in this object.
       *
       * Setting this to [] ensures that this model's attributes don't get included in the query's response, which is desirable, for example, when simply using this model to filter a query as opposed to eagerly load this data
       */
      attributes?: Array<string>;

      /**
       * Attributes on the intermediary table.
       *
       * Setting this to [] ensures that the intermediary model's attributes don't get included in the query's response, which is desirable, for example, when simply using this model to filter a query as opposed to eagerly load this data
       */
      through?: {
        attributes: Array<string>;
      };
    }
  ];
};
