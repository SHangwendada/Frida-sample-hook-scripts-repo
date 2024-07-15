function hookNewStringUTF() {
    Java.perform(function () {
        var modules = Process.enumerateModules();
        var newStringUTFAddr = null;
 
        for (var i = 0; i < modules.length; i++) {
            var module = modules[i];
            try {
                var symbols = module.enumerateSymbols();
                for (var j = 0; j < symbols.length; j++) {
                    if (symbols[j].name.indexOf("NewStringUTF") >= 0) {
                        newStringUTFAddr = symbols[j].address;
                        console.log("Found NewStringUTF in module: " + module.name + " at: " + newStringUTFAddr + " with name: " + symbols[j].name);
                        break;
                    }
                }
            } catch (e) {
                console.warn("Failed to enumerate symbols for module: " + module.name);
            }
            if (newStringUTFAddr) {
                break;
            }
        }
 
        if (newStringUTFAddr) {
            // Hook NewStringUTF 函数
            Interceptor.attach(newStringUTFAddr, {
                onEnter: function(args) {
                    // 获取传入的 char* 参数
                    var inputStr = args[1].readCString();
                    console.log("NewStringUTF called with: " + inputStr);
                },
                onLeave: function(retval) {
                    // 如果需要修改返回值，可以在这里进行
                    console.log("NewStringUTF returning: " + retval);
                }
            });
        } else {
            console.log("NewStringUTF address not found!");
        }
    });
}
