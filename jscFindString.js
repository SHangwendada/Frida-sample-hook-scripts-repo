setTimeout(function () {
    Java.perform(function () {
        var module = Process.getModuleByName("libcocos2djs.so");
        var addr = module.base.add("0xAE58E4");
        var func = new NativePointer(addr.toString());
        console.log("Hook,success");
        Interceptor.attach(func, {
            onEnter: function (args) {
                console.log("Param:" + args[2].readCString());
            },
            onLeave: function (retval) {
            }
        });
    });
}, 1000)