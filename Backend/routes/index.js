const apiRoutes = require("./login");
const invRoutes = require("./inventory");
const patientRoutes = require("./patients");
const adminRoutes = require("./admin");
const feedbackRoutes = require("./feedback");
const inquiryRoutes = require("./inquiry");
const userRoutes = require("./user");
const automateRoutes = require("./automation");

const ConstructorMethod = (app) => {
  app.use("/", apiRoutes);
  app.use("/", invRoutes);
  app.use("/patient/", patientRoutes);
  app.use("/admin/", adminRoutes);
  app.use("/feedback/", feedbackRoutes);
  app.use("/inquiry", inquiryRoutes);
  app.use("/user", userRoutes);
  app.use("/automation", automateRoutes);
  app.use("*", (req, res) => {
    return res.status(404).json("Not Found");
  });
};

module.exports = ConstructorMethod;
