var gravatar = require('gravatar');

function fakeAuth(req, res, next) {

    const email = "curreyb88@gmail.com";

    req.user = {
        name: "Blair Currey",
        id: "UHQTXAXDW",
        email: email,
        image_24: gravatar.url(email, {
            size: '24'
        }),
        image_32: gravatar.url(email, {
            size: '32'
        }),
        image_48: gravatar.url(email, {
            size: '48'
        }),
        image_72: gravatar.url(email, {
            size: '72'
        }),
        image_192: gravatar.url(email, {
            size: '192'
        }),
        image_512: gravatar.url(email, {
            size: '512'
        })
    }

    next()
}

module.exports = fakeAuth;