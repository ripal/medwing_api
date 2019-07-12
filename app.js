var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var geoRouter = require("./routes/geocode");
var locationRouter = require("./routes/location");
let routePath = require("./routes/path");

var app = express();

/**
 * Swagger
 */
const swaggerDefinition = {
  info: {
    title: "Location API",
    version: "1.0.0",
    description: "Endpoints to use and test the location API",
    contact: {
      email: "xxxx@xxx.com"
    }
  },
  tags: [
    {
      name: "location",
      description: "Location api"
    },
    {
      name: "geocode",
      description: "Google geocode api"
    }
  ],
  schemes: ["http"],
  host: "localhost:3003",
  basePath: "/"
};
const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * Swagger END
 */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(routePath.GET_LAT_LONG, geoRouter);
app.use(routePath.LOCATION, locationRouter);
app.use(function(req, res, next) {
  if (req.result) res.status(req.result.code || 200).json(req.result);
  else next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
