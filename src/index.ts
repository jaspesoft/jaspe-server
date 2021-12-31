import express = require("express");
import cors = require("cors");
import bodyParser = require("body-parser");

export default class ServerExpress {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.disable("x-powered-by");
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(
      cors({
        origin: "*",
        methods: "GET, HEAD, PUT, POST, DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );
  }

  static instance(): ServerExpress {
    return new ServerExpress();
  }

  public setRoutes(router: express.Router): ServerExpress {
    this.app.use(router);
    return this;
  }

  public setCors(option: cors.CorsOptions): ServerExpress {
    this.app.use(cors(option));
    return this;
  }

  public setUse(params: any) {
    this.app.use(params);
    return this;
  }

  public start(port: string): void {
    this.app.set("port", port);

    this.app.listen(port, () => {
      console.log(`⚡️[server]: Server running on port ${port}`);
    });
  }
}
