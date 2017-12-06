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
                callback({message: response.body.message}, null);
                return;
            }
            callback(null, response.body);
        });
        
}