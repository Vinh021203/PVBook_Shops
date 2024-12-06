module.exports = (req, res, next) => {
    console.log("---- Incoming Request ----");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("--------------------------");
    next();
};
