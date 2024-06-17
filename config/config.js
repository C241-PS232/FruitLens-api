/**
 * Configuration for the application.
 * This module sets the port to be used by the server.
 */

module.exports = {
    /**
     * The port used by the server.
     * If the environment variable `PORT` is not set, it defaults to port 8080.
     */
    port: process.env.PORT || 8080
};
