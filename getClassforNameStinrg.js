Java.perform(function () {
    var Class = Java.use("java.lang.Class");

    // Hook Class.forName
    Class.forName.overload('java.lang.String').implementation = function (className) {
        console.log("Class.forName called with argument: " + className);
        return this.forName(className);
    };

    Class.forName.overload('java.lang.String', 'boolean', 'java.lang.ClassLoader').implementation = function (className, initialize, classLoader) {
        console.log("Class.forName called with arguments: " + className + ", " + initialize + ", " + classLoader);
        return this.forName(className, initialize, classLoader);
    };
});
