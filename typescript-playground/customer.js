"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.bar = exports.foo = void 0;
exports.foo = '';
function bar() { }
exports.bar = bar;
var Customer = /** @class */ (function () {
    function Customer(id) {
        this.id = id;
    }
    Customer.prototype.fooBar = function () {
        var _this = this;
        setTimeout(function () {
            console.log('ID', _this.id);
        }, 2000);
        return '';
    };
    return Customer;
}());
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map