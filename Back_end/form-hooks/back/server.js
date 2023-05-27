const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors');
//import express from "express";
//import fileupload from "express-fileupload";
//import cors from "cors";

const app = express();

app.use(
    fileupload({
        createParentPath: true,
    }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload-file", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: "failed",
                message: "No file uploaded",
            });
        } else {
            let file = req.files.file;
            let name = req.body.name;

            console.log("Name received: " + name);
            console.log(req.files);

            file.mv("./uploads/" + file.name);

            res.send({
                status: "success",
                message: "File is uploaded. Name: " + name,
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size,
                },
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
