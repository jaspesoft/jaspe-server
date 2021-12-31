import express = require("express");
import cors = require("cors");

export default class ServerExpress {
  private app: express.Application;
  private corsOption: cors.CorsOptions;

  constructor() {
    this.app = express();
  }

  static instance(): ServerExpress {
    return new ServerExpress();
  }

  public setRoutes(router: express.Router): ServerExpress {
    this.app.use(router);
    return this;
  }

  public setCors(option: cors.CorsOptions): ServerExpress {
    this.corsOption = option;
    return this;
  }

  public start(port: number): void {
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(cors(this.getCors()));

    this.app.listen(port, () => {
      console.log(`⚡️[server]: Server running on port ${port}`);
    });
  }

  private getCors(): cors.CorsOptions {
    if (!this.corsOption) {
      return {
        origin: "*",
        methods: "GET, HEAD, PUT, POST, DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      };
    }
    return this.corsOption;
  }
}
