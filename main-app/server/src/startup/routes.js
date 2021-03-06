const express = require("express");
const path = require("path");
const cors = require("cors");
const errorMiddleware = require("../middleware/error");
const appErrorsRoute = require("../routes/app-errors")(process.env.LOGGING_APP_HOST_URL);
const db1AccessRoute = require("../routes/db-access")(process.env.DB_ADMINISTRATION_APP_1_HOST_URL, process.env.DB_ADMIN_ADMINISTRATION_APP_1_HOST_URL);
const db2AccessRoute = require("../routes/db-access")(process.env.DB_ADMINISTRATION_APP_2_HOST_URL, process.env.DB_ADMIN_ADMINISTRATION_APP_2_HOST_URL);

module.exports = function (app) {
    app.use(express.json());
    app.use(cors({origin: "*"}));
    app.use(express.static(path.join(__dirname, "../../../client", "build"))); // Serve front-end
    app.use("/app-errors", appErrorsRoute);
    app.use("/db-1-access", db1AccessRoute);
    app.use("/db-2-access", db2AccessRoute);
    app.use(errorMiddleware);
};
