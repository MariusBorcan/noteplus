import superagent from 'superagent';
    
module.exports.get = function(url, params, callback) {
        
        superagent
        .get(url)
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if(err){
                callback(err, null);
                return;
            }
            const status = response.body.status;
            if(status!='success'){
                callback({message: response.body.error}, null);
                return;
            }
            callback(null, response.body);
        });
        
}

module.exports.post = function(url, body, callback) {
    console.log(url);
    superagent
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .end((err, res) => {
        if(err) {
            callback(err, null)
            return
        }

        const status = res.body.status;
        if(status!='success') {
            callback({message: res.body.error})
            return;
        }
        callback(null, res.body);
    });
};

module.exports.put = function(url, body, callback) {
    console.log(url);
    superagent
    .put(url)
    .send(body)
    .set('Accept', 'application/json')
    .end((err, res) => {
        if(err) {
            callback(err, null)
            return
        }

        const status = res.body.status;
        if(status!='success') {
            callback({message: res.body.error})
            return;
        }
        callback(null, res.body);
    });
};