var gravatar = require('gravatar');

function fakeAuth(req, res, next) {
    const fake = {
        name: process.env.USER_NAME ?? 'Aleksandar Milosevic',
        id: process.env.USER_ID ?? "UGYTW920K",
        email: process.env.USER_EMAIL ?? "leka.milosevic@gmail.com",
    }
    req.user = {
        ...fake,
        ...urls(fake.email)
    }

    next()
}

function urls(email) {
    return {
        image_24: gravatar.url(email, {
            size: '24',
            protocol: 'https'
        }),
        image_32: gravatar.url(email, {
            size: '32',
            protocol: 'https'
        }),
        image_48: gravatar.url(email, {
            size: '48',
            protocol: 'https'
        }),
        image_72: gravatar.url(email, {
            size: '72',
            protocol: 'https'
        }),
        image_192: gravatar.url(email, {
            size: '192',
            protocol: 'https'
        }),
        image_512: gravatar.url(email, {
            size: '512',
            protocol: 'https'
        })
    }
}

module.exports = fakeAuth;