"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var DynamicAdapt = /*#__PURE__*/function () {
  function DynamicAdapt(type) {
    _classCallCheck(this, DynamicAdapt);

    this.type = type;
  }

  _createClass(DynamicAdapt, [{
    key: "init",
    value: function init() {
      var _this = this;

      // ???????????? ????????????????
      this.??bjects = [];
      this.daClassname = '_dynamic_adapt_'; // ???????????? DOM-??????????????????

      this.nodes = _toConsumableArray(document.querySelectorAll('[data-da]')); // ???????????????????? ??bjects ????????????????

      this.nodes.forEach(function (node) {
        var data = node.dataset.da.trim();
        var dataArray = data.split(',');
        var ??bject = {};
        ??bject.element = node;
        ??bject.parent = node.parentNode;
        ??bject.destination = node.closest("".concat(dataArray[0].trim()));
        ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        ??bject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        ??bject.index = _this.indexInParent(??bject.parent, ??bject.element);

        _this.??bjects.push(??bject);
      });
      this.arraySort(this.??bjects); // ???????????? ???????????????????? ??????????-????????????????

      this.mediaQueries = this.??bjects.map(function (_ref) {
        var breakpoint = _ref.breakpoint;
        return "(".concat(_this.type, "-width: ").concat(breakpoint, "px),").concat(breakpoint);
      }).filter(function (item, index, self) {
        return self.indexOf(item) === index;
      }); // ?????????????????????? ?????????????????? ???? ??????????-????????????
      // ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????

      this.mediaQueries.forEach(function (media) {
        var mediaSplit = media.split(',');
        var matchMedia = window.matchMedia(mediaSplit[0]);
        var mediaBreakpoint = mediaSplit[1]; // ???????????? ???????????????? ?? ???????????????????? ????????????????????????

        var ??bjectsFilter = _this.??bjects.filter(function (_ref2) {
          var breakpoint = _ref2.breakpoint;
          return breakpoint === mediaBreakpoint;
        });

        matchMedia.addEventListener('change', function () {
          _this.mediaHandler(matchMedia, ??bjectsFilter);
        });

        _this.mediaHandler(matchMedia, ??bjectsFilter);
      });
    } // ???????????????? ??????????????

  }, {
    key: "mediaHandler",
    value: function mediaHandler(matchMedia, ??bjects) {
      var _this2 = this;

      if (matchMedia.matches) {
        ??bjects.forEach(function (??bject) {
          ??bject.index = _this2.indexInParent(??bject.parent, ??bject.element);

          _this2.moveTo(??bject.place, ??bject.element, ??bject.destination);
        });
      } else {
        ??bjects.forEach(function (_ref3) {
          var parent = _ref3.parent,
              element = _ref3.element,
              index = _ref3.index;

          if (element.classList.contains(_this2.daClassname)) {
            _this2.moveBack(parent, element, index);
          }
        });
      }
    } // ?????????????? ??????????????????????

  }, {
    key: "moveTo",
    value: function moveTo(place, element, destination) {
      element.classList.add(this.daClassname);

      if (place === 'last' || place >= destination.children.length) {
        destination.append(element);
        return;
      }

      if (place === 'first') {
        destination.prepend(element);
        return;
      }

      destination.children[place].before(element);
    } // ?????????????? ????????????????

  }, {
    key: "moveBack",
    value: function moveBack(parent, element, index) {
      element.classList.remove(this.daClassname);

      if (parent.children[index] !== undefined) {
        parent.children[index].before(element);
      } else {
        parent.append(element);
      }
    } // ?????????????? ?????????????????? ?????????????? ???????????? ????????????????

  }, {
    key: "indexInParent",
    value: function indexInParent(parent, element) {
      return _toConsumableArray(parent.children).indexOf(element);
    } // ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place 
    // ???? ?????????????????????? ?????? this.type = min
    // ???? ???????????????? ?????? this.type = max

  }, {
    key: "arraySort",
    value: function arraySort(arr) {
      if (this.type === 'min') {
        arr.sort(function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }

            return a.place - b.place;
          }

          return a.breakpoint - b.breakpoint;
        });
      } else {
        arr.sort(function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }

            return b.place - a.place;
          }

          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    }
  }]);

  return DynamicAdapt;
}();