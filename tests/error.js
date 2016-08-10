function error(action) { try { action(); } catch(e) { return e; } }

module.exports = error;