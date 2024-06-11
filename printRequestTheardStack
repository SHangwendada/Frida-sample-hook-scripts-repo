Java.perform(function () {
    // Hook URL.openConnection()
    var URL = Java.use("java.net.URL");
    URL.openConnection.overload().implementation = function () {
        console.log("URL.openConnection() called");
        var result = this.openConnection();
        printStackTrace();
        return result;
    };

    // Hook HttpURLConnection.connect()
    var HttpURLConnection = Java.use("java.net.HttpURLConnection");
    HttpURLConnection.connect.implementation = function () {
        console.log("HttpURLConnection.connect() called");
        printStackTrace();
        return this.connect();
    };

    // Hook HttpURLConnection.getOutputStream()
    HttpURLConnection.getOutputStream.implementation = function () {
        console.log("HttpURLConnection.getOutputStream() called");
        printStackTrace();
        return this.getOutputStream();
    };

    // Hook HttpURLConnection.getInputStream()
    HttpURLConnection.getInputStream.implementation = function () {
        console.log("HttpURLConnection.getInputStream() called");
        printStackTrace();
        return this.getInputStream();
    };



    function printStackTrace() {
        var stackTrace = Java.use("java.lang.Thread").currentThread().getStackTrace();
        console.log("Stack trace:");
        for (var i in stackTrace) {
            console.log(stackTrace[i].toString());
        }
    }

    // Hook okhttp3.OkHttpClient and related methods
    var OkHttpClient = Java.use("okhttp3.OkHttpClient");
    var Call = Java.use("okhttp3.Call");
    var Request = Java.use("okhttp3.Request");
    var Response = Java.use("okhttp3.Response");

    // Hook OkHttpClient.newCall
    OkHttpClient.newCall.overload('okhttp3.Request').implementation = function (request) {
        console.log("OkHttpClient.newCall() called with request: " + request);
        printStackTrace();
        return this.newCall(request);
    };

    // Hook Call.execute
    Call.execute.implementation = function () {
        console.log("Call.execute() called");
        printStackTrace();
        return this.execute();
    };

    // Hook Response.body
    Response.body.implementation = function () {
        console.log("Response.body() called");
        printStackTrace();
        return this.body();
    };

});
