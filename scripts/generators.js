"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generators = function () {
    function Generators() {
        _classCallCheck(this, Generators);
    }

    _createClass(Generators, null, [{
        key: "articleGenerator",
        value: regeneratorRuntime.mark(function articleGenerator(response) {
            var idx;
            return regeneratorRuntime.wrap(function articleGenerator$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            idx = 0;

                        case 1:
                            if (!(idx < response.articles.length)) {
                                _context.next = 6;
                                break;
                            }

                            _context.next = 4;
                            return response.articles[idx++];

                        case 4:
                            _context.next = 1;
                            break;

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, articleGenerator, this);
        })
    }, {
        key: "sourceGenerator",
        value: regeneratorRuntime.mark(function sourceGenerator(response) {
            var idx;
            return regeneratorRuntime.wrap(function sourceGenerator$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            idx = 0;

                        case 1:
                            if (!(idx < response.sources.length)) {
                                _context2.next = 6;
                                break;
                            }

                            _context2.next = 4;
                            return response.sources[idx++];

                        case 4:
                            _context2.next = 1;
                            break;

                        case 6:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, sourceGenerator, this);
        })
    }]);

    return Generators;
}();