function hook_android_dlopen_ext() {
    Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"), {
        onEnter: function (args) {
            this.name = args[0].readCString();
            if (this.name.indexOf("libanti.so") > 0) {
                ;
                console.log(this.name);
                var symbols = Process.getModuleByName("linker64").enumerateSymbols();
                var callConstructorAdd = null;
                for (var index = 0; index < symbols.length; index++) {
                    const symbol = symbols[index];
                    if (symbol.name.indexOf("__dl__ZN6soinfo17call_constructorsEv") != -1) {
                        callConstructorAdd = symbol.address;
                    }
                }
                console.log("callConstructorAdd -> " + callConstructorAdd);

                var isHook = false;
                Interceptor.attach(callConstructorAdd, {
                    onEnter: function (args) {
                        if (!isHook) {

                            //Hook InitArray 中运行的方法在这里
                            hookDecode();


                            isHook = true;
                        }
                    },
                    onLeave: function () {}
                });

            }
        }, onLeave: function () {}
    });
}
function hookDecode() {
    var module = Process.getModuleByName("libanti.so");
    var addr = module.base.add("0xEC0");
    var func = new NativePointer(addr.toString());
    console.log('[+] Hooking ' + func.toString());
    var arg = NULL;
    Interceptor.attach(func, {
        onEnter: function (args) {
            console.log('[+] Hook success');
            arg = args[0];
        },
        onLeave: function (retval) {
            arg.readUtf8String();
            console.log('[+] Method onLeave : ', arg.readUtf8String());
        }
    });
}




function main() {
    hook_android_dlopen_ext();

}

setImmediate(main);