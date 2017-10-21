var vkPixel = function (parameters) {

    this.baseUrl = "https://vk.com/rtrg";
    this.pixelCode = null;
    this.autoHit = true;
    this.debug = false;

    this.buildQuery = function(dataPair) {
        var ret = [];
        for (var dataKey in dataPair)
            ret.push(encodeURIComponent(dataKey) + '=' + encodeURIComponent(dataPair[dataKey]));
        return ret.join('&');
    };
    
    this.request = function (keys) {
        keys = keys || {};
        if(this.pixelCode === null){
            if(this.debug){
                console.error("vkPixel.Request: Pixel code undefined.");
            }
            return false;
        }

        keys.p = this.pixelCode;
        (window.Image ? (new Image()) : document.createElement('img')).src = this.baseUrl + '?' + this.buildQuery(keys);
        return true;
    };

    this.hit = function () {
        if(this.request()){
            if(this.debug) {
                console.info("vkPixel.Hit: sended.");
            }
        }
        return this;
    };

    this.event = function (eventName){
        if(typeof(eventName) !== "string"){
            if(this.debug){
                console.error("vkPixel.Event: Name undefined.");
            }
            return false;
        }

        if(this.request({'event' : eventName})){
            if(this.debug) {
                console.info("vkPixel.Event: (" + eventName + ") sended.");
            }
        }
        return this;
    };

    this.add = function (audienceID) {
        if(typeof(audienceID) !== "number"){
            if(this.debug){
                console.error("vkPixel.Add: Audience ID undefined.");
            }
            return false;
        }

        if(this.request({'audience' : audienceID})){
            if(this.debug) {
                console.info("vkPixel.Add: User added in audience (ID=" + audienceID + ").");
            }
        }
        return this;
    };

    if(typeof(parameters) === "object"){
        if(typeof(parameters['code']) === "string" ){
            this.pixelCode = parameters['code'];
        }

        if(typeof(parameters['autoHit']) === "boolean" ){
            this.autoHit = parameters['autoHit'];
        }

        if(typeof(parameters['debug']) === "boolean" ){
            this.debug = parameters['debug'];
        }
    }

    if(this.autoHit){
        this.hit();
    }
};