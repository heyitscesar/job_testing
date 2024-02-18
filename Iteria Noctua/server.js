const express = require('express');
const fs = require('fs');
const path = require('path');

class FileServer {
    constructor(port, filesDirectory) {
        this.app = express();
        this.port = port;
        this.filesDirectory = filesDirectory;

        this.setupRoutes();
    }

    setupRoutes() {
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });

        this.app.get('/list-files', (req, res) => {
            fs.readdir(this.filesDirectory, (err, files) => {
                if (err) return res.status(500).send('Error reading files directory');
                res.json(files);
            });
        });

        this.app.get('/files/*', (req, res) => {
            const filePath = path.join(this.filesDirectory, req.params[0]);
            if (!filePath.startsWith(this.filesDirectory)) {
                return res.status(400).send('Invalid file path');
            }
            fs.stat(filePath, (err, stat) => {
                if (err) return err.code === 'ENOENT' ? res.status(404).send('File not found') : res.status(500).send('Server error');
                if (stat.isFile()) {
                    res.sendFile(filePath);
                } else {
                    res.status(403).send('Access denied');
                }
            });
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}

const port = 3000;
const filesDirectory = path.join(__dirname, '_');
new FileServer(port, filesDirectory).start();
