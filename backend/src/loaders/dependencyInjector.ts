import { Container } from "typedi";
import LoggerInstance from "./logger";

export default ({ models }: { models: object[] }) => {
  try {
    Object.entries(models).forEach(model => {
      Container.set(model[0], model[1]);
    });

    Container.set("logger", LoggerInstance);

    LoggerInstance.info("✌️ Logger injected into container");
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
