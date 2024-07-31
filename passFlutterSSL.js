function hook_ssl_verify_result(address) {
    Interceptor.attach(address, {
        onEnter: function (args) {
            console.log("禁用 SSL 验证");
        },
        onLeave: function (retval) {
            console.log("返回值: " + retval);
            retval.replace(0x1);
        }
    });
}

function scanMemorySegment(base, size, pattern) {
    try {
        Memory.scan(base, size, pattern, {
            onMatch: function (address, size) {
                console.log('[+] 找到 ssl_verify_result 地址: ' + address.toString());
                hook_ssl_verify_result(address);
            },
            onError: function (reason) {
                console.log('[!] 扫描内存时出错: ' + reason);
            },
            onComplete: function () {
                console.log("扫描段完成: " + base + " - " + (base.add(size)));
            }
        });
    } catch (e) {
        console.log('[!] 内存扫描失败: ' + e.message);
    }
}

function hookFlutter() {
    var m = Process.findModuleByName("libflutter.so");
    if (!m) {
        console.log("[-] 未找到 libflutter.so 模块");
        return;
    }

    console.log("[+] libflutter.so 模块基址: " + m.base + " 模块大小: " + m.size);

    var pattern = "FF C3 01 D1 FD 7B 01 A9 FC 6F 02 A9 FA 67 03 A9 F8 5F 04 A9 F6 57 05 A9 F4 4F 06 A9 08 0A 80 52 48 00 00 39";
    var segmentSize = 0x100000; // 每次扫描 1MB

    for (var offset = 0; offset < m.size; offset += segmentSize) {
        var base = m.base.add(offset);
        var size = Math.min(segmentSize, m.size - offset);
        scanMemorySegment(base, size, pattern);
    }
}

function main() {
    Java.perform(function () {
        hookFlutter();
    });
}

setTimeout(main, 200);
