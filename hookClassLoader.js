function main() {
    Java.perform(function () {
        Java.enumerateClassLoaders({
            onMatch: function (loader) {
                try {

                    var factory = Java.ClassFactory.get(loader);
                    var CheckerClass = factory.use("com.example.challengemobile.Checker");
                    var key = CheckerClass.getKey();
                    console.log("Key: " + key);

                } catch (e) {
                    // console.log("Error accessing class or method: " + e);
                }
            },
            onComplete: function () {
            }
        });

    });
}

setTimeout(main, 100);

