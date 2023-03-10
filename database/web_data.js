let db = require('./config.js')
let modules = require('../modules/modules')
let COLLECTIONS = require('./collections.js');
let ObjectId = require('mongodb').ObjectID;

module.exports = {
    addIndex: (urlData) => {
        return new Promise((resolve, reject) => {
            try {
                db.get().collection(COLLECTIONS.INDEX).findOne({ url: urlData.href }).then((page) => {
                    if (!page) {
                        modules.crawl(urlData).then(async (pageData) => {
                            db.get().collection(COLLECTIONS.INDEX).insertOne(pageData).then((insertData) => {
                                resolve({ message: 'Page indexed succesfully.' })
                            })
                        }).catch((err) => {
                            reject({ error: err.error })
                        })
                    } else {
                        reject({ error: 'Page is already indexed!.' })
                    }
                })
            } catch (err) {
                // Error handling
                console.error(err)
            }
        })
    }
}