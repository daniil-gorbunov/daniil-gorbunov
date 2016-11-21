'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
    function Model(apiUri) {
        _classCallCheck(this, Model);

        this.apiUri = apiUri;
        this.apiKey = API_KEY;
    }

    _createClass(Model, [{
        key: 'get',
        value: function get() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();

            params.set('apiKey', this.apiKey);
            var uri = this.apiUri + '?' + Model.serialize(params);
            var init = {
                method: 'GET'
            };
            var request = new Request(uri, init);

            return fetch(request).then(function (response) {
                return response.json().then(function (json) {
                    return json;
                });
            }).catch(function (err) {
                return [];
            });
        }
    }], [{
        key: 'serialize',
        value: function serialize() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();

            var result = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = params[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        p = _step$value[0],
                        v = _step$value[1];

                    var param = encodeURIComponent(p);
                    var value = encodeURIComponent(v);
                    result.push(param + '=' + value);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return result.join('&');
        }
    }]);

    return Model;
}();