const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api", (req, res) => {
    res.json({msg: "Hello, World!"});
})

async function main() {
    app.listen(PORT, () => {
        console.log("⚡ Todo App Server");
        console.log(`⚡ Server running at http://127.0.0.1:${PORT}`);
    })
}

main().catch(err => console.error(err));