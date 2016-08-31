+(function (window, undefined) {
    //记录全局中的touha对象
    var _touha = window.touha,
        //为了直接通过touha()进行实例化，不需要new touha()
        touha = function () {
            return new touha.fn.init();
        }

    touha.fn = touha.prototype = {
        init: function () {
            return this;
        }
    };

    //让touha()返回的对象，可以访问touha对象的属性
    touha.fn.init.prototype = touha.fn;

    window.touha = touha;
})(window, undefined);