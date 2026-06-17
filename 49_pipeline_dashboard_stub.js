const express = require('express');
const app = express();

app.get('/status', (req, res) => {
    res.json({
        system: "Kellar-Studio Pipeline",
        status: "Operational",
        active_daemons: 45,
        uptime: process.uptime()
    });
});

app.listen(3000, () => console.log("🖥️ [DASHBOARD] Control panel active at localhost:3000"));
