const express = require('express');
const authRoutes = require('../modules/auth/auth.route');
const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
