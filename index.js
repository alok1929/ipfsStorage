    const express = require('express');
    const multer = require('multer');
    const path = require('path');
    const cors = require('cors'); // Import the cors module
    const app = express();
    const port = 3000;

    app.use(cors()); // Enable CORS for all routes

    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be saved in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Rename file to include timestamp
    },
    });

    const upload = multer({ storage: storage });

    app.use(express.static('public')); // Serve static files from the 'public' directory

    app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Perform processing here (e.g., generating URLs, saving to database, etc.)
    // For demonstration purposes, let's just return the file's new name
    const uploadedFileName = req.file.filename;
    res.json({ fileName: uploadedFileName }); // Send a JSON response
    });

    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
