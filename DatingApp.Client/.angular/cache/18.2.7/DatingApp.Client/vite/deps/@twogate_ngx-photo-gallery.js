import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Optional,
  Output,
  ViewChild,
  createComponent,
  setClassMetadata,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵqueryRefresh,
  ɵɵviewQuery
} from "./chunk-CKIJOZLC.js";
import "./chunk-GM2YTKEO.js";
import {
  __async,
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-KBUIKKCC.js";

// node_modules/photoswipe/dist/photoswipe.js
var require_photoswipe = __commonJS({
  "node_modules/photoswipe/dist/photoswipe.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module.exports = factory();
      } else {
        root.PhotoSwipe = factory();
      }
    })(exports, function() {
      "use strict";
      var PhotoSwipe2 = function(template, UiClass, items, options) {
        var framework = {
          features: null,
          bind: function(target, type, listener, unbind) {
            var methodName = (unbind ? "remove" : "add") + "EventListener";
            type = type.split(" ");
            for (var i = 0; i < type.length; i++) {
              if (type[i]) {
                target[methodName](type[i], listener, false);
              }
            }
          },
          isArray: function(obj) {
            return obj instanceof Array;
          },
          createEl: function(classes, tag) {
            var el = document.createElement(tag || "div");
            if (classes) {
              el.className = classes;
            }
            return el;
          },
          getScrollY: function() {
            var yOffset = window.pageYOffset;
            return yOffset !== void 0 ? yOffset : document.documentElement.scrollTop;
          },
          unbind: function(target, type, listener) {
            framework.bind(target, type, listener, true);
          },
          removeClass: function(el, className) {
            var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
            el.className = el.className.replace(reg, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
          },
          addClass: function(el, className) {
            if (!framework.hasClass(el, className)) {
              el.className += (el.className ? " " : "") + className;
            }
          },
          hasClass: function(el, className) {
            return el.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(el.className);
          },
          getChildByClass: function(parentEl, childClassName) {
            var node = parentEl.firstChild;
            while (node) {
              if (framework.hasClass(node, childClassName)) {
                return node;
              }
              node = node.nextSibling;
            }
          },
          arraySearch: function(array, value, key) {
            var i = array.length;
            while (i--) {
              if (array[i][key] === value) {
                return i;
              }
            }
            return -1;
          },
          extend: function(o1, o2, preventOverwrite) {
            for (var prop in o2) {
              if (o2.hasOwnProperty(prop)) {
                if (preventOverwrite && o1.hasOwnProperty(prop)) {
                  continue;
                }
                o1[prop] = o2[prop];
              }
            }
          },
          easing: {
            sine: {
              out: function(k) {
                return Math.sin(k * (Math.PI / 2));
              },
              inOut: function(k) {
                return -(Math.cos(Math.PI * k) - 1) / 2;
              }
            },
            cubic: {
              out: function(k) {
                return --k * k * k + 1;
              }
            }
            /*
            	elastic: {
            		out: function ( k ) {
            				var s, a = 0.1, p = 0.4;
            			if ( k === 0 ) return 0;
            			if ( k === 1 ) return 1;
            			if ( !a || a < 1 ) { a = 1; s = p / 4; }
            			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            			return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );
            			},
            	},
            	back: {
            		out: function ( k ) {
            			var s = 1.70158;
            			return --k * k * ( ( s + 1 ) * k + s ) + 1;
            		}
            	}
            */
          },
          /**
           * 
           * @return {object}
           * 
           * {
           *  raf : request animation frame function
           *  caf : cancel animation frame function
           *  transfrom : transform property key (with vendor), or null if not supported
           *  oldIE : IE8 or below
           * }
           * 
           */
          detectFeatures: function() {
            if (framework.features) {
              return framework.features;
            }
            var helperEl = framework.createEl(), helperStyle = helperEl.style, vendor = "", features = {};
            features.oldIE = document.all && !document.addEventListener;
            features.touch = "ontouchstart" in window;
            if (window.requestAnimationFrame) {
              features.raf = window.requestAnimationFrame;
              features.caf = window.cancelAnimationFrame;
            }
            features.pointerEvent = !!window.PointerEvent || navigator.msPointerEnabled;
            if (!features.pointerEvent) {
              var ua = navigator.userAgent;
              if (/iP(hone|od)/.test(navigator.platform)) {
                var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                if (v && v.length > 0) {
                  v = parseInt(v[1], 10);
                  if (v >= 1 && v < 8) {
                    features.isOldIOSPhone = true;
                  }
                }
              }
              var match = ua.match(/Android\s([0-9\.]*)/);
              var androidversion = match ? match[1] : 0;
              androidversion = parseFloat(androidversion);
              if (androidversion >= 1) {
                if (androidversion < 4.4) {
                  features.isOldAndroid = true;
                }
                features.androidVersion = androidversion;
              }
              features.isMobileOpera = /opera mini|opera mobi/i.test(ua);
            }
            var styleChecks = ["transform", "perspective", "animationName"], vendors = ["", "webkit", "Moz", "ms", "O"], styleCheckItem, styleName;
            for (var i = 0; i < 4; i++) {
              vendor = vendors[i];
              for (var a = 0; a < 3; a++) {
                styleCheckItem = styleChecks[a];
                styleName = vendor + (vendor ? styleCheckItem.charAt(0).toUpperCase() + styleCheckItem.slice(1) : styleCheckItem);
                if (!features[styleCheckItem] && styleName in helperStyle) {
                  features[styleCheckItem] = styleName;
                }
              }
              if (vendor && !features.raf) {
                vendor = vendor.toLowerCase();
                features.raf = window[vendor + "RequestAnimationFrame"];
                if (features.raf) {
                  features.caf = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
                }
              }
            }
            if (!features.raf) {
              var lastTime = 0;
              features.raf = function(fn) {
                var currTime = (/* @__PURE__ */ new Date()).getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                  fn(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
              };
              features.caf = function(id) {
                clearTimeout(id);
              };
            }
            features.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
            framework.features = features;
            return features;
          }
        };
        framework.detectFeatures();
        if (framework.features.oldIE) {
          framework.bind = function(target, type, listener, unbind) {
            type = type.split(" ");
            var methodName = (unbind ? "detach" : "attach") + "Event", evName, _handleEv = function() {
              listener.handleEvent.call(listener);
            };
            for (var i = 0; i < type.length; i++) {
              evName = type[i];
              if (evName) {
                if (typeof listener === "object" && listener.handleEvent) {
                  if (!unbind) {
                    listener["oldIE" + evName] = _handleEv;
                  } else {
                    if (!listener["oldIE" + evName]) {
                      return false;
                    }
                  }
                  target[methodName]("on" + evName, listener["oldIE" + evName]);
                } else {
                  target[methodName]("on" + evName, listener);
                }
              }
            }
          };
        }
        var self = this;
        var DOUBLE_TAP_RADIUS = 25, NUM_HOLDERS = 3;
        var _options = {
          allowPanToNext: true,
          spacing: 0.12,
          bgOpacity: 1,
          mouseUsed: false,
          loop: true,
          pinchToClose: true,
          closeOnScroll: true,
          closeOnVerticalDrag: true,
          verticalDragRange: 0.75,
          hideAnimationDuration: 333,
          showAnimationDuration: 333,
          showHideOpacity: false,
          focus: true,
          escKey: true,
          arrowKeys: true,
          mainScrollEndFriction: 0.35,
          panEndFriction: 0.35,
          isClickableElement: function(el) {
            return el.tagName === "A";
          },
          getDoubleTapZoom: function(isMouseClick, item) {
            if (isMouseClick) {
              return 1;
            } else {
              return item.initialZoomLevel < 0.7 ? 1 : 1.33;
            }
          },
          maxSpreadZoom: 1.33,
          modal: true,
          // not fully implemented yet
          scaleMode: "fit"
          // TODO
        };
        framework.extend(_options, options);
        var _getEmptyPoint = function() {
          return {
            x: 0,
            y: 0
          };
        };
        var _isOpen, _isDestroying, _closedByScroll, _currentItemIndex, _containerStyle, _containerShiftIndex, _currPanDist = _getEmptyPoint(), _startPanOffset = _getEmptyPoint(), _panOffset = _getEmptyPoint(), _upMoveEvents, _downEvents, _globalEventHandlers, _viewportSize = {}, _currZoomLevel, _startZoomLevel, _translatePrefix, _translateSufix, _updateSizeInterval, _itemsNeedUpdate, _currPositionIndex = 0, _offset = {}, _slideSize = _getEmptyPoint(), _itemHolders, _prevItemIndex, _indexDiff = 0, _dragStartEvent, _dragMoveEvent, _dragEndEvent, _dragCancelEvent, _transformKey, _pointerEventEnabled, _isFixedPosition = true, _likelyTouchDevice, _modules = [], _requestAF, _cancelAF, _initalClassName, _initalWindowScrollY, _oldIE, _currentWindowScrollY, _features, _windowVisibleSize = {}, _renderMaxResolution = false, _orientationChangeTimeout, _registerModule = function(name, module2) {
          framework.extend(self, module2.publicMethods);
          _modules.push(name);
        }, _getLoopedId = function(index) {
          var numSlides = _getNumItems();
          if (index > numSlides - 1) {
            return index - numSlides;
          } else if (index < 0) {
            return numSlides + index;
          }
          return index;
        }, _listeners = {}, _listen = function(name, fn) {
          if (!_listeners[name]) {
            _listeners[name] = [];
          }
          return _listeners[name].push(fn);
        }, _shout = function(name) {
          var listeners = _listeners[name];
          if (listeners) {
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            for (var i = 0; i < listeners.length; i++) {
              listeners[i].apply(self, args);
            }
          }
        }, _getCurrentTime = function() {
          return (/* @__PURE__ */ new Date()).getTime();
        }, _applyBgOpacity = function(opacity) {
          _bgOpacity = opacity;
          self.bg.style.opacity = opacity * _options.bgOpacity;
        }, _applyZoomTransform = function(styleObj, x, y, zoom, item) {
          if (!_renderMaxResolution || item && item !== self.currItem) {
            zoom = zoom / (item ? item.fitRatio : self.currItem.fitRatio);
          }
          styleObj[_transformKey] = _translatePrefix + x + "px, " + y + "px" + _translateSufix + " scale(" + zoom + ")";
        }, _applyCurrentZoomPan = function(allowRenderResolution) {
          if (_currZoomElementStyle) {
            if (allowRenderResolution) {
              if (_currZoomLevel > self.currItem.fitRatio) {
                if (!_renderMaxResolution) {
                  _setImageSize(self.currItem, false, true);
                  _renderMaxResolution = true;
                }
              } else {
                if (_renderMaxResolution) {
                  _setImageSize(self.currItem);
                  _renderMaxResolution = false;
                }
              }
            }
            _applyZoomTransform(_currZoomElementStyle, _panOffset.x, _panOffset.y, _currZoomLevel);
          }
        }, _applyZoomPanToItem = function(item) {
          if (item.container) {
            _applyZoomTransform(item.container.style, item.initialPosition.x, item.initialPosition.y, item.initialZoomLevel, item);
          }
        }, _setTranslateX = function(x, elStyle) {
          elStyle[_transformKey] = _translatePrefix + x + "px, 0px" + _translateSufix;
        }, _moveMainScroll = function(x, dragging) {
          if (!_options.loop && dragging) {
            var newSlideIndexOffset = _currentItemIndex + (_slideSize.x * _currPositionIndex - x) / _slideSize.x, delta2 = Math.round(x - _mainScrollPos.x);
            if (newSlideIndexOffset < 0 && delta2 > 0 || newSlideIndexOffset >= _getNumItems() - 1 && delta2 < 0) {
              x = _mainScrollPos.x + delta2 * _options.mainScrollEndFriction;
            }
          }
          _mainScrollPos.x = x;
          _setTranslateX(x, _containerStyle);
        }, _calculatePanOffset = function(axis, zoomLevel) {
          var m = _midZoomPoint[axis] - _offset[axis];
          return _startPanOffset[axis] + _currPanDist[axis] + m - m * (zoomLevel / _startZoomLevel);
        }, _equalizePoints = function(p1, p22) {
          p1.x = p22.x;
          p1.y = p22.y;
          if (p22.id) {
            p1.id = p22.id;
          }
        }, _roundPoint = function(p3) {
          p3.x = Math.round(p3.x);
          p3.y = Math.round(p3.y);
        }, _mouseMoveTimeout = null, _onFirstMouseMove = function() {
          if (_mouseMoveTimeout) {
            framework.unbind(document, "mousemove", _onFirstMouseMove);
            framework.addClass(template, "pswp--has_mouse");
            _options.mouseUsed = true;
            _shout("mouseUsed");
          }
          _mouseMoveTimeout = setTimeout(function() {
            _mouseMoveTimeout = null;
          }, 100);
        }, _bindEvents = function() {
          framework.bind(document, "keydown", self);
          if (_features.transform) {
            framework.bind(self.scrollWrap, "click", self);
          }
          if (!_options.mouseUsed) {
            framework.bind(document, "mousemove", _onFirstMouseMove);
          }
          framework.bind(window, "resize scroll orientationchange", self);
          _shout("bindEvents");
        }, _unbindEvents = function() {
          framework.unbind(window, "resize scroll orientationchange", self);
          framework.unbind(window, "scroll", _globalEventHandlers.scroll);
          framework.unbind(document, "keydown", self);
          framework.unbind(document, "mousemove", _onFirstMouseMove);
          if (_features.transform) {
            framework.unbind(self.scrollWrap, "click", self);
          }
          if (_isDragging) {
            framework.unbind(window, _upMoveEvents, self);
          }
          clearTimeout(_orientationChangeTimeout);
          _shout("unbindEvents");
        }, _calculatePanBounds = function(zoomLevel, update) {
          var bounds = _calculateItemSize(self.currItem, _viewportSize, zoomLevel);
          if (update) {
            _currPanBounds = bounds;
          }
          return bounds;
        }, _getMinZoomLevel = function(item) {
          if (!item) {
            item = self.currItem;
          }
          return item.initialZoomLevel;
        }, _getMaxZoomLevel = function(item) {
          if (!item) {
            item = self.currItem;
          }
          return item.w > 0 ? _options.maxSpreadZoom : 1;
        }, _modifyDestPanOffset = function(axis, destPanBounds, destPanOffset, destZoomLevel) {
          if (destZoomLevel === self.currItem.initialZoomLevel) {
            destPanOffset[axis] = self.currItem.initialPosition[axis];
            return true;
          } else {
            destPanOffset[axis] = _calculatePanOffset(axis, destZoomLevel);
            if (destPanOffset[axis] > destPanBounds.min[axis]) {
              destPanOffset[axis] = destPanBounds.min[axis];
              return true;
            } else if (destPanOffset[axis] < destPanBounds.max[axis]) {
              destPanOffset[axis] = destPanBounds.max[axis];
              return true;
            }
          }
          return false;
        }, _setupTransforms = function() {
          if (_transformKey) {
            var allow3dTransform = _features.perspective && !_likelyTouchDevice;
            _translatePrefix = "translate" + (allow3dTransform ? "3d(" : "(");
            _translateSufix = _features.perspective ? ", 0px)" : ")";
            return;
          }
          _transformKey = "left";
          framework.addClass(template, "pswp--ie");
          _setTranslateX = function(x, elStyle) {
            elStyle.left = x + "px";
          };
          _applyZoomPanToItem = function(item) {
            var zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio, s = item.container.style, w = zoomRatio * item.w, h = zoomRatio * item.h;
            s.width = w + "px";
            s.height = h + "px";
            s.left = item.initialPosition.x + "px";
            s.top = item.initialPosition.y + "px";
          };
          _applyCurrentZoomPan = function() {
            if (_currZoomElementStyle) {
              var s = _currZoomElementStyle, item = self.currItem, zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio, w = zoomRatio * item.w, h = zoomRatio * item.h;
              s.width = w + "px";
              s.height = h + "px";
              s.left = _panOffset.x + "px";
              s.top = _panOffset.y + "px";
            }
          };
        }, _onKeyDown = function(e) {
          var keydownAction = "";
          if (_options.escKey && e.keyCode === 27) {
            keydownAction = "close";
          } else if (_options.arrowKeys) {
            if (e.keyCode === 37) {
              keydownAction = "prev";
            } else if (e.keyCode === 39) {
              keydownAction = "next";
            }
          }
          if (keydownAction) {
            if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
              if (e.preventDefault) {
                e.preventDefault();
              } else {
                e.returnValue = false;
              }
              self[keydownAction]();
            }
          }
        }, _onGlobalClick = function(e) {
          if (!e) {
            return;
          }
          if (_moved || _zoomStarted || _mainScrollAnimating || _verticalDragInitiated) {
            e.preventDefault();
            e.stopPropagation();
          }
        }, _updatePageScrollOffset = function() {
          self.setScrollOffset(0, framework.getScrollY());
        };
        var _animations = {}, _numAnimations = 0, _stopAnimation = function(name) {
          if (_animations[name]) {
            if (_animations[name].raf) {
              _cancelAF(_animations[name].raf);
            }
            _numAnimations--;
            delete _animations[name];
          }
        }, _registerStartAnimation = function(name) {
          if (_animations[name]) {
            _stopAnimation(name);
          }
          if (!_animations[name]) {
            _numAnimations++;
            _animations[name] = {};
          }
        }, _stopAllAnimations = function() {
          for (var prop in _animations) {
            if (_animations.hasOwnProperty(prop)) {
              _stopAnimation(prop);
            }
          }
        }, _animateProp = function(name, b, endProp, d, easingFn, onUpdate, onComplete) {
          var startAnimTime = _getCurrentTime(), t;
          _registerStartAnimation(name);
          var animloop = function() {
            if (_animations[name]) {
              t = _getCurrentTime() - startAnimTime;
              if (t >= d) {
                _stopAnimation(name);
                onUpdate(endProp);
                if (onComplete) {
                  onComplete();
                }
                return;
              }
              onUpdate((endProp - b) * easingFn(t / d) + b);
              _animations[name].raf = _requestAF(animloop);
            }
          };
          animloop();
        };
        var publicMethods = {
          // make a few local variables and functions public
          shout: _shout,
          listen: _listen,
          viewportSize: _viewportSize,
          options: _options,
          isMainScrollAnimating: function() {
            return _mainScrollAnimating;
          },
          getZoomLevel: function() {
            return _currZoomLevel;
          },
          getCurrentIndex: function() {
            return _currentItemIndex;
          },
          isDragging: function() {
            return _isDragging;
          },
          isZooming: function() {
            return _isZooming;
          },
          setScrollOffset: function(x, y) {
            _offset.x = x;
            _currentWindowScrollY = _offset.y = y;
            _shout("updateScrollOffset", _offset);
          },
          applyZoomPan: function(zoomLevel, panX, panY, allowRenderResolution) {
            _panOffset.x = panX;
            _panOffset.y = panY;
            _currZoomLevel = zoomLevel;
            _applyCurrentZoomPan(allowRenderResolution);
          },
          init: function() {
            if (_isOpen || _isDestroying) {
              return;
            }
            var i;
            self.framework = framework;
            self.template = template;
            self.bg = framework.getChildByClass(template, "pswp__bg");
            _initalClassName = template.className;
            _isOpen = true;
            _features = framework.detectFeatures();
            _requestAF = _features.raf;
            _cancelAF = _features.caf;
            _transformKey = _features.transform;
            _oldIE = _features.oldIE;
            self.scrollWrap = framework.getChildByClass(template, "pswp__scroll-wrap");
            self.container = framework.getChildByClass(self.scrollWrap, "pswp__container");
            _containerStyle = self.container.style;
            self.itemHolders = _itemHolders = [{
              el: self.container.children[0],
              wrap: 0,
              index: -1
            }, {
              el: self.container.children[1],
              wrap: 0,
              index: -1
            }, {
              el: self.container.children[2],
              wrap: 0,
              index: -1
            }];
            _itemHolders[0].el.style.display = _itemHolders[2].el.style.display = "none";
            _setupTransforms();
            _globalEventHandlers = {
              resize: self.updateSize,
              // Fixes: iOS 10.3 resize event
              // does not update scrollWrap.clientWidth instantly after resize
              // https://github.com/dimsemenov/PhotoSwipe/issues/1315
              orientationchange: function() {
                clearTimeout(_orientationChangeTimeout);
                _orientationChangeTimeout = setTimeout(function() {
                  if (_viewportSize.x !== self.scrollWrap.clientWidth) {
                    self.updateSize();
                  }
                }, 500);
              },
              scroll: _updatePageScrollOffset,
              keydown: _onKeyDown,
              click: _onGlobalClick
            };
            var oldPhone = _features.isOldIOSPhone || _features.isOldAndroid || _features.isMobileOpera;
            if (!_features.animationName || !_features.transform || oldPhone) {
              _options.showAnimationDuration = _options.hideAnimationDuration = 0;
            }
            for (i = 0; i < _modules.length; i++) {
              self["init" + _modules[i]]();
            }
            if (UiClass) {
              var ui = self.ui = new UiClass(self, framework);
              ui.init();
            }
            _shout("firstUpdate");
            _currentItemIndex = _currentItemIndex || _options.index || 0;
            if (isNaN(_currentItemIndex) || _currentItemIndex < 0 || _currentItemIndex >= _getNumItems()) {
              _currentItemIndex = 0;
            }
            self.currItem = _getItemAt(_currentItemIndex);
            if (_features.isOldIOSPhone || _features.isOldAndroid) {
              _isFixedPosition = false;
            }
            template.setAttribute("aria-hidden", "false");
            if (_options.modal) {
              if (!_isFixedPosition) {
                template.style.position = "absolute";
                template.style.top = framework.getScrollY() + "px";
              } else {
                template.style.position = "fixed";
              }
            }
            if (_currentWindowScrollY === void 0) {
              _shout("initialLayout");
              _currentWindowScrollY = _initalWindowScrollY = framework.getScrollY();
            }
            var rootClasses = "pswp--open ";
            if (_options.mainClass) {
              rootClasses += _options.mainClass + " ";
            }
            if (_options.showHideOpacity) {
              rootClasses += "pswp--animate_opacity ";
            }
            rootClasses += _likelyTouchDevice ? "pswp--touch" : "pswp--notouch";
            rootClasses += _features.animationName ? " pswp--css_animation" : "";
            rootClasses += _features.svg ? " pswp--svg" : "";
            framework.addClass(template, rootClasses);
            self.updateSize();
            _containerShiftIndex = -1;
            _indexDiff = null;
            for (i = 0; i < NUM_HOLDERS; i++) {
              _setTranslateX((i + _containerShiftIndex) * _slideSize.x, _itemHolders[i].el.style);
            }
            if (!_oldIE) {
              framework.bind(self.scrollWrap, _downEvents, self);
            }
            _listen("initialZoomInEnd", function() {
              self.setContent(_itemHolders[0], _currentItemIndex - 1);
              self.setContent(_itemHolders[2], _currentItemIndex + 1);
              _itemHolders[0].el.style.display = _itemHolders[2].el.style.display = "block";
              if (_options.focus) {
                template.focus();
              }
              _bindEvents();
            });
            self.setContent(_itemHolders[1], _currentItemIndex);
            self.updateCurrItem();
            _shout("afterInit");
            if (!_isFixedPosition) {
              _updateSizeInterval = setInterval(function() {
                if (!_numAnimations && !_isDragging && !_isZooming && _currZoomLevel === self.currItem.initialZoomLevel) {
                  self.updateSize();
                }
              }, 1e3);
            }
            framework.addClass(template, "pswp--visible");
          },
          // Close the gallery, then destroy it
          close: function() {
            if (!_isOpen) {
              return;
            }
            _isOpen = false;
            _isDestroying = true;
            _shout("close");
            _unbindEvents();
            _showOrHide(self.currItem, null, true, self.destroy);
          },
          // destroys the gallery (unbinds events, cleans up intervals and timeouts to avoid memory leaks)
          destroy: function() {
            _shout("destroy");
            if (_showOrHideTimeout) {
              clearTimeout(_showOrHideTimeout);
            }
            template.setAttribute("aria-hidden", "true");
            template.className = _initalClassName;
            if (_updateSizeInterval) {
              clearInterval(_updateSizeInterval);
            }
            framework.unbind(self.scrollWrap, _downEvents, self);
            framework.unbind(window, "scroll", self);
            _stopDragUpdateLoop();
            _stopAllAnimations();
            _listeners = null;
          },
          /**
           * Pan image to position
           * @param {Number} x     
           * @param {Number} y     
           * @param {Boolean} force Will ignore bounds if set to true.
           */
          panTo: function(x, y, force) {
            if (!force) {
              if (x > _currPanBounds.min.x) {
                x = _currPanBounds.min.x;
              } else if (x < _currPanBounds.max.x) {
                x = _currPanBounds.max.x;
              }
              if (y > _currPanBounds.min.y) {
                y = _currPanBounds.min.y;
              } else if (y < _currPanBounds.max.y) {
                y = _currPanBounds.max.y;
              }
            }
            _panOffset.x = x;
            _panOffset.y = y;
            _applyCurrentZoomPan();
          },
          handleEvent: function(e) {
            e = e || window.event;
            if (_globalEventHandlers[e.type]) {
              _globalEventHandlers[e.type](e);
            }
          },
          goTo: function(index) {
            index = _getLoopedId(index);
            var diff = index - _currentItemIndex;
            _indexDiff = diff;
            _currentItemIndex = index;
            self.currItem = _getItemAt(_currentItemIndex);
            _currPositionIndex -= diff;
            _moveMainScroll(_slideSize.x * _currPositionIndex);
            _stopAllAnimations();
            _mainScrollAnimating = false;
            self.updateCurrItem();
          },
          next: function() {
            self.goTo(_currentItemIndex + 1);
          },
          prev: function() {
            self.goTo(_currentItemIndex - 1);
          },
          // update current zoom/pan objects
          updateCurrZoomItem: function(emulateSetContent) {
            if (emulateSetContent) {
              _shout("beforeChange", 0);
            }
            if (_itemHolders[1].el.children.length) {
              var zoomElement = _itemHolders[1].el.children[0];
              if (framework.hasClass(zoomElement, "pswp__zoom-wrap")) {
                _currZoomElementStyle = zoomElement.style;
              } else {
                _currZoomElementStyle = null;
              }
            } else {
              _currZoomElementStyle = null;
            }
            _currPanBounds = self.currItem.bounds;
            _startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;
            _panOffset.x = _currPanBounds.center.x;
            _panOffset.y = _currPanBounds.center.y;
            if (emulateSetContent) {
              _shout("afterChange");
            }
          },
          invalidateCurrItems: function() {
            _itemsNeedUpdate = true;
            for (var i = 0; i < NUM_HOLDERS; i++) {
              if (_itemHolders[i].item) {
                _itemHolders[i].item.needsUpdate = true;
              }
            }
          },
          updateCurrItem: function(beforeAnimation) {
            if (_indexDiff === 0) {
              return;
            }
            var diffAbs = Math.abs(_indexDiff), tempHolder;
            if (beforeAnimation && diffAbs < 2) {
              return;
            }
            self.currItem = _getItemAt(_currentItemIndex);
            _renderMaxResolution = false;
            _shout("beforeChange", _indexDiff);
            if (diffAbs >= NUM_HOLDERS) {
              _containerShiftIndex += _indexDiff + (_indexDiff > 0 ? -NUM_HOLDERS : NUM_HOLDERS);
              diffAbs = NUM_HOLDERS;
            }
            for (var i = 0; i < diffAbs; i++) {
              if (_indexDiff > 0) {
                tempHolder = _itemHolders.shift();
                _itemHolders[NUM_HOLDERS - 1] = tempHolder;
                _containerShiftIndex++;
                _setTranslateX((_containerShiftIndex + 2) * _slideSize.x, tempHolder.el.style);
                self.setContent(tempHolder, _currentItemIndex - diffAbs + i + 1 + 1);
              } else {
                tempHolder = _itemHolders.pop();
                _itemHolders.unshift(tempHolder);
                _containerShiftIndex--;
                _setTranslateX(_containerShiftIndex * _slideSize.x, tempHolder.el.style);
                self.setContent(tempHolder, _currentItemIndex + diffAbs - i - 1 - 1);
              }
            }
            if (_currZoomElementStyle && Math.abs(_indexDiff) === 1) {
              var prevItem = _getItemAt(_prevItemIndex);
              if (prevItem.initialZoomLevel !== _currZoomLevel) {
                _calculateItemSize(prevItem, _viewportSize);
                _setImageSize(prevItem);
                _applyZoomPanToItem(prevItem);
              }
            }
            _indexDiff = 0;
            self.updateCurrZoomItem();
            _prevItemIndex = _currentItemIndex;
            _shout("afterChange");
          },
          updateSize: function(force) {
            if (!_isFixedPosition && _options.modal) {
              var windowScrollY = framework.getScrollY();
              if (_currentWindowScrollY !== windowScrollY) {
                template.style.top = windowScrollY + "px";
                _currentWindowScrollY = windowScrollY;
              }
              if (!force && _windowVisibleSize.x === window.innerWidth && _windowVisibleSize.y === window.innerHeight) {
                return;
              }
              _windowVisibleSize.x = window.innerWidth;
              _windowVisibleSize.y = window.innerHeight;
              template.style.height = _windowVisibleSize.y + "px";
            }
            _viewportSize.x = self.scrollWrap.clientWidth;
            _viewportSize.y = self.scrollWrap.clientHeight;
            _updatePageScrollOffset();
            _slideSize.x = _viewportSize.x + Math.round(_viewportSize.x * _options.spacing);
            _slideSize.y = _viewportSize.y;
            _moveMainScroll(_slideSize.x * _currPositionIndex);
            _shout("beforeResize");
            if (_containerShiftIndex !== void 0) {
              var holder, item, hIndex;
              for (var i = 0; i < NUM_HOLDERS; i++) {
                holder = _itemHolders[i];
                _setTranslateX((i + _containerShiftIndex) * _slideSize.x, holder.el.style);
                hIndex = _currentItemIndex + i - 1;
                if (_options.loop && _getNumItems() > 2) {
                  hIndex = _getLoopedId(hIndex);
                }
                item = _getItemAt(hIndex);
                if (item && (_itemsNeedUpdate || item.needsUpdate || !item.bounds)) {
                  self.cleanSlide(item);
                  self.setContent(holder, hIndex);
                  if (i === 1) {
                    self.currItem = item;
                    self.updateCurrZoomItem(true);
                  }
                  item.needsUpdate = false;
                } else if (holder.index === -1 && hIndex >= 0) {
                  self.setContent(holder, hIndex);
                }
                if (item && item.container) {
                  _calculateItemSize(item, _viewportSize);
                  _setImageSize(item);
                  _applyZoomPanToItem(item);
                }
              }
              _itemsNeedUpdate = false;
            }
            _startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;
            _currPanBounds = self.currItem.bounds;
            if (_currPanBounds) {
              _panOffset.x = _currPanBounds.center.x;
              _panOffset.y = _currPanBounds.center.y;
              _applyCurrentZoomPan(true);
            }
            _shout("resize");
          },
          // Zoom current item to
          zoomTo: function(destZoomLevel, centerPoint, speed, easingFn, updateFn) {
            if (centerPoint) {
              _startZoomLevel = _currZoomLevel;
              _midZoomPoint.x = Math.abs(centerPoint.x) - _panOffset.x;
              _midZoomPoint.y = Math.abs(centerPoint.y) - _panOffset.y;
              _equalizePoints(_startPanOffset, _panOffset);
            }
            var destPanBounds = _calculatePanBounds(destZoomLevel, false), destPanOffset = {};
            _modifyDestPanOffset("x", destPanBounds, destPanOffset, destZoomLevel);
            _modifyDestPanOffset("y", destPanBounds, destPanOffset, destZoomLevel);
            var initialZoomLevel = _currZoomLevel;
            var initialPanOffset = {
              x: _panOffset.x,
              y: _panOffset.y
            };
            _roundPoint(destPanOffset);
            var onUpdate = function(now) {
              if (now === 1) {
                _currZoomLevel = destZoomLevel;
                _panOffset.x = destPanOffset.x;
                _panOffset.y = destPanOffset.y;
              } else {
                _currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
                _panOffset.x = (destPanOffset.x - initialPanOffset.x) * now + initialPanOffset.x;
                _panOffset.y = (destPanOffset.y - initialPanOffset.y) * now + initialPanOffset.y;
              }
              if (updateFn) {
                updateFn(now);
              }
              _applyCurrentZoomPan(now === 1);
            };
            if (speed) {
              _animateProp("customZoomTo", 0, 1, speed, easingFn || framework.easing.sine.inOut, onUpdate);
            } else {
              onUpdate(1);
            }
          }
        };
        var MIN_SWIPE_DISTANCE = 30, DIRECTION_CHECK_OFFSET = 10;
        var _gestureStartTime, _gestureCheckSpeedTime, p = {}, p2 = {}, delta = {}, _currPoint = {}, _startPoint = {}, _currPointers = [], _startMainScrollPos = {}, _releaseAnimData, _posPoints = [], _tempPoint = {}, _isZoomingIn, _verticalDragInitiated, _oldAndroidTouchEndTimeout, _currZoomedItemIndex = 0, _centerPoint = _getEmptyPoint(), _lastReleaseTime = 0, _isDragging, _isMultitouch, _zoomStarted, _moved, _dragAnimFrame, _mainScrollShifted, _currentPoints, _isZooming, _currPointsDistance, _startPointsDistance, _currPanBounds, _mainScrollPos = _getEmptyPoint(), _currZoomElementStyle, _mainScrollAnimating, _midZoomPoint = _getEmptyPoint(), _currCenterPoint = _getEmptyPoint(), _direction, _isFirstMove, _opacityChanged, _bgOpacity, _wasOverInitialZoom, _isEqualPoints = function(p1, p22) {
          return p1.x === p22.x && p1.y === p22.y;
        }, _isNearbyPoints = function(touch0, touch1) {
          return Math.abs(touch0.x - touch1.x) < DOUBLE_TAP_RADIUS && Math.abs(touch0.y - touch1.y) < DOUBLE_TAP_RADIUS;
        }, _calculatePointsDistance = function(p1, p22) {
          _tempPoint.x = Math.abs(p1.x - p22.x);
          _tempPoint.y = Math.abs(p1.y - p22.y);
          return Math.sqrt(_tempPoint.x * _tempPoint.x + _tempPoint.y * _tempPoint.y);
        }, _stopDragUpdateLoop = function() {
          if (_dragAnimFrame) {
            _cancelAF(_dragAnimFrame);
            _dragAnimFrame = null;
          }
        }, _dragUpdateLoop = function() {
          if (_isDragging) {
            _dragAnimFrame = _requestAF(_dragUpdateLoop);
            _renderMovement();
          }
        }, _canPan = function() {
          return !(_options.scaleMode === "fit" && _currZoomLevel === self.currItem.initialZoomLevel);
        }, _closestElement = function(el, fn) {
          if (!el || el === document) {
            return false;
          }
          if (el.getAttribute("class") && el.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) {
            return false;
          }
          if (fn(el)) {
            return el;
          }
          return _closestElement(el.parentNode, fn);
        }, _preventObj = {}, _preventDefaultEventBehaviour = function(e, isDown) {
          _preventObj.prevent = !_closestElement(e.target, _options.isClickableElement);
          _shout("preventDragEvent", e, isDown, _preventObj);
          return _preventObj.prevent;
        }, _convertTouchToPoint = function(touch, p3) {
          p3.x = touch.pageX;
          p3.y = touch.pageY;
          p3.id = touch.identifier;
          return p3;
        }, _findCenterOfPoints = function(p1, p22, pCenter) {
          pCenter.x = (p1.x + p22.x) * 0.5;
          pCenter.y = (p1.y + p22.y) * 0.5;
        }, _pushPosPoint = function(time, x, y) {
          if (time - _gestureCheckSpeedTime > 50) {
            var o = _posPoints.length > 2 ? _posPoints.shift() : {};
            o.x = x;
            o.y = y;
            _posPoints.push(o);
            _gestureCheckSpeedTime = time;
          }
        }, _calculateVerticalDragOpacityRatio = function() {
          var yOffset = _panOffset.y - self.currItem.initialPosition.y;
          return 1 - Math.abs(yOffset / (_viewportSize.y / 2));
        }, _ePoint1 = {}, _ePoint2 = {}, _tempPointsArr = [], _tempCounter, _getTouchPoints = function(e) {
          while (_tempPointsArr.length > 0) {
            _tempPointsArr.pop();
          }
          if (!_pointerEventEnabled) {
            if (e.type.indexOf("touch") > -1) {
              if (e.touches && e.touches.length > 0) {
                _tempPointsArr[0] = _convertTouchToPoint(e.touches[0], _ePoint1);
                if (e.touches.length > 1) {
                  _tempPointsArr[1] = _convertTouchToPoint(e.touches[1], _ePoint2);
                }
              }
            } else {
              _ePoint1.x = e.pageX;
              _ePoint1.y = e.pageY;
              _ePoint1.id = "";
              _tempPointsArr[0] = _ePoint1;
            }
          } else {
            _tempCounter = 0;
            _currPointers.forEach(function(p3) {
              if (_tempCounter === 0) {
                _tempPointsArr[0] = p3;
              } else if (_tempCounter === 1) {
                _tempPointsArr[1] = p3;
              }
              _tempCounter++;
            });
          }
          return _tempPointsArr;
        }, _panOrMoveMainScroll = function(axis, delta2) {
          var panFriction, overDiff = 0, newOffset = _panOffset[axis] + delta2[axis], startOverDiff, dir = delta2[axis] > 0, newMainScrollPosition = _mainScrollPos.x + delta2.x, mainScrollDiff = _mainScrollPos.x - _startMainScrollPos.x, newPanPos, newMainScrollPos;
          if (newOffset > _currPanBounds.min[axis] || newOffset < _currPanBounds.max[axis]) {
            panFriction = _options.panEndFriction;
          } else {
            panFriction = 1;
          }
          newOffset = _panOffset[axis] + delta2[axis] * panFriction;
          if (_options.allowPanToNext || _currZoomLevel === self.currItem.initialZoomLevel) {
            if (!_currZoomElementStyle) {
              newMainScrollPos = newMainScrollPosition;
            } else if (_direction === "h" && axis === "x" && !_zoomStarted) {
              if (dir) {
                if (newOffset > _currPanBounds.min[axis]) {
                  panFriction = _options.panEndFriction;
                  overDiff = _currPanBounds.min[axis] - newOffset;
                  startOverDiff = _currPanBounds.min[axis] - _startPanOffset[axis];
                }
                if ((startOverDiff <= 0 || mainScrollDiff < 0) && _getNumItems() > 1) {
                  newMainScrollPos = newMainScrollPosition;
                  if (mainScrollDiff < 0 && newMainScrollPosition > _startMainScrollPos.x) {
                    newMainScrollPos = _startMainScrollPos.x;
                  }
                } else {
                  if (_currPanBounds.min.x !== _currPanBounds.max.x) {
                    newPanPos = newOffset;
                  }
                }
              } else {
                if (newOffset < _currPanBounds.max[axis]) {
                  panFriction = _options.panEndFriction;
                  overDiff = newOffset - _currPanBounds.max[axis];
                  startOverDiff = _startPanOffset[axis] - _currPanBounds.max[axis];
                }
                if ((startOverDiff <= 0 || mainScrollDiff > 0) && _getNumItems() > 1) {
                  newMainScrollPos = newMainScrollPosition;
                  if (mainScrollDiff > 0 && newMainScrollPosition < _startMainScrollPos.x) {
                    newMainScrollPos = _startMainScrollPos.x;
                  }
                } else {
                  if (_currPanBounds.min.x !== _currPanBounds.max.x) {
                    newPanPos = newOffset;
                  }
                }
              }
            }
            if (axis === "x") {
              if (newMainScrollPos !== void 0) {
                _moveMainScroll(newMainScrollPos, true);
                if (newMainScrollPos === _startMainScrollPos.x) {
                  _mainScrollShifted = false;
                } else {
                  _mainScrollShifted = true;
                }
              }
              if (_currPanBounds.min.x !== _currPanBounds.max.x) {
                if (newPanPos !== void 0) {
                  _panOffset.x = newPanPos;
                } else if (!_mainScrollShifted) {
                  _panOffset.x += delta2.x * panFriction;
                }
              }
              return newMainScrollPos !== void 0;
            }
          }
          if (!_mainScrollAnimating) {
            if (!_mainScrollShifted) {
              if (_currZoomLevel > self.currItem.fitRatio) {
                _panOffset[axis] += delta2[axis] * panFriction;
              }
            }
          }
        }, _onDragStart = function(e) {
          if (e.type === "mousedown" && e.button > 0) {
            return;
          }
          if (_initialZoomRunning) {
            e.preventDefault();
            return;
          }
          if (_oldAndroidTouchEndTimeout && e.type === "mousedown") {
            return;
          }
          if (_preventDefaultEventBehaviour(e, true)) {
            e.preventDefault();
          }
          _shout("pointerDown");
          if (_pointerEventEnabled) {
            var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, "id");
            if (pointerIndex < 0) {
              pointerIndex = _currPointers.length;
            }
            _currPointers[pointerIndex] = {
              x: e.pageX,
              y: e.pageY,
              id: e.pointerId
            };
          }
          var startPointsList = _getTouchPoints(e), numPoints = startPointsList.length;
          _currentPoints = null;
          _stopAllAnimations();
          if (!_isDragging || numPoints === 1) {
            _isDragging = _isFirstMove = true;
            framework.bind(window, _upMoveEvents, self);
            _isZoomingIn = _wasOverInitialZoom = _opacityChanged = _verticalDragInitiated = _mainScrollShifted = _moved = _isMultitouch = _zoomStarted = false;
            _direction = null;
            _shout("firstTouchStart", startPointsList);
            _equalizePoints(_startPanOffset, _panOffset);
            _currPanDist.x = _currPanDist.y = 0;
            _equalizePoints(_currPoint, startPointsList[0]);
            _equalizePoints(_startPoint, _currPoint);
            _startMainScrollPos.x = _slideSize.x * _currPositionIndex;
            _posPoints = [{
              x: _currPoint.x,
              y: _currPoint.y
            }];
            _gestureCheckSpeedTime = _gestureStartTime = _getCurrentTime();
            _calculatePanBounds(_currZoomLevel, true);
            _stopDragUpdateLoop();
            _dragUpdateLoop();
          }
          if (!_isZooming && numPoints > 1 && !_mainScrollAnimating && !_mainScrollShifted) {
            _startZoomLevel = _currZoomLevel;
            _zoomStarted = false;
            _isZooming = _isMultitouch = true;
            _currPanDist.y = _currPanDist.x = 0;
            _equalizePoints(_startPanOffset, _panOffset);
            _equalizePoints(p, startPointsList[0]);
            _equalizePoints(p2, startPointsList[1]);
            _findCenterOfPoints(p, p2, _currCenterPoint);
            _midZoomPoint.x = Math.abs(_currCenterPoint.x) - _panOffset.x;
            _midZoomPoint.y = Math.abs(_currCenterPoint.y) - _panOffset.y;
            _currPointsDistance = _startPointsDistance = _calculatePointsDistance(p, p2);
          }
        }, _onDragMove = function(e) {
          e.preventDefault();
          if (_pointerEventEnabled) {
            var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, "id");
            if (pointerIndex > -1) {
              var p3 = _currPointers[pointerIndex];
              p3.x = e.pageX;
              p3.y = e.pageY;
            }
          }
          if (_isDragging) {
            var touchesList = _getTouchPoints(e);
            if (!_direction && !_moved && !_isZooming) {
              if (_mainScrollPos.x !== _slideSize.x * _currPositionIndex) {
                _direction = "h";
              } else {
                var diff = Math.abs(touchesList[0].x - _currPoint.x) - Math.abs(touchesList[0].y - _currPoint.y);
                if (Math.abs(diff) >= DIRECTION_CHECK_OFFSET) {
                  _direction = diff > 0 ? "h" : "v";
                  _currentPoints = touchesList;
                }
              }
            } else {
              _currentPoints = touchesList;
            }
          }
        }, _renderMovement = function() {
          if (!_currentPoints) {
            return;
          }
          var numPoints = _currentPoints.length;
          if (numPoints === 0) {
            return;
          }
          _equalizePoints(p, _currentPoints[0]);
          delta.x = p.x - _currPoint.x;
          delta.y = p.y - _currPoint.y;
          if (_isZooming && numPoints > 1) {
            _currPoint.x = p.x;
            _currPoint.y = p.y;
            if (!delta.x && !delta.y && _isEqualPoints(_currentPoints[1], p2)) {
              return;
            }
            _equalizePoints(p2, _currentPoints[1]);
            if (!_zoomStarted) {
              _zoomStarted = true;
              _shout("zoomGestureStarted");
            }
            var pointsDistance = _calculatePointsDistance(p, p2);
            var zoomLevel = _calculateZoomLevel(pointsDistance);
            if (zoomLevel > self.currItem.initialZoomLevel + self.currItem.initialZoomLevel / 15) {
              _wasOverInitialZoom = true;
            }
            var zoomFriction = 1, minZoomLevel = _getMinZoomLevel(), maxZoomLevel = _getMaxZoomLevel();
            if (zoomLevel < minZoomLevel) {
              if (_options.pinchToClose && !_wasOverInitialZoom && _startZoomLevel <= self.currItem.initialZoomLevel) {
                var minusDiff = minZoomLevel - zoomLevel;
                var percent = 1 - minusDiff / (minZoomLevel / 1.2);
                _applyBgOpacity(percent);
                _shout("onPinchClose", percent);
                _opacityChanged = true;
              } else {
                zoomFriction = (minZoomLevel - zoomLevel) / minZoomLevel;
                if (zoomFriction > 1) {
                  zoomFriction = 1;
                }
                zoomLevel = minZoomLevel - zoomFriction * (minZoomLevel / 3);
              }
            } else if (zoomLevel > maxZoomLevel) {
              zoomFriction = (zoomLevel - maxZoomLevel) / (minZoomLevel * 6);
              if (zoomFriction > 1) {
                zoomFriction = 1;
              }
              zoomLevel = maxZoomLevel + zoomFriction * minZoomLevel;
            }
            if (zoomFriction < 0) {
              zoomFriction = 0;
            }
            _currPointsDistance = pointsDistance;
            _findCenterOfPoints(p, p2, _centerPoint);
            _currPanDist.x += _centerPoint.x - _currCenterPoint.x;
            _currPanDist.y += _centerPoint.y - _currCenterPoint.y;
            _equalizePoints(_currCenterPoint, _centerPoint);
            _panOffset.x = _calculatePanOffset("x", zoomLevel);
            _panOffset.y = _calculatePanOffset("y", zoomLevel);
            _isZoomingIn = zoomLevel > _currZoomLevel;
            _currZoomLevel = zoomLevel;
            _applyCurrentZoomPan();
          } else {
            if (!_direction) {
              return;
            }
            if (_isFirstMove) {
              _isFirstMove = false;
              if (Math.abs(delta.x) >= DIRECTION_CHECK_OFFSET) {
                delta.x -= _currentPoints[0].x - _startPoint.x;
              }
              if (Math.abs(delta.y) >= DIRECTION_CHECK_OFFSET) {
                delta.y -= _currentPoints[0].y - _startPoint.y;
              }
            }
            _currPoint.x = p.x;
            _currPoint.y = p.y;
            if (delta.x === 0 && delta.y === 0) {
              return;
            }
            if (_direction === "v" && _options.closeOnVerticalDrag) {
              if (!_canPan()) {
                _currPanDist.y += delta.y;
                _panOffset.y += delta.y;
                var opacityRatio = _calculateVerticalDragOpacityRatio();
                _verticalDragInitiated = true;
                _shout("onVerticalDrag", opacityRatio);
                _applyBgOpacity(opacityRatio);
                _applyCurrentZoomPan();
                return;
              }
            }
            _pushPosPoint(_getCurrentTime(), p.x, p.y);
            _moved = true;
            _currPanBounds = self.currItem.bounds;
            var mainScrollChanged = _panOrMoveMainScroll("x", delta);
            if (!mainScrollChanged) {
              _panOrMoveMainScroll("y", delta);
              _roundPoint(_panOffset);
              _applyCurrentZoomPan();
            }
          }
        }, _onDragRelease = function(e) {
          if (_features.isOldAndroid) {
            if (_oldAndroidTouchEndTimeout && e.type === "mouseup") {
              return;
            }
            if (e.type.indexOf("touch") > -1) {
              clearTimeout(_oldAndroidTouchEndTimeout);
              _oldAndroidTouchEndTimeout = setTimeout(function() {
                _oldAndroidTouchEndTimeout = 0;
              }, 600);
            }
          }
          _shout("pointerUp");
          if (_preventDefaultEventBehaviour(e, false)) {
            e.preventDefault();
          }
          var releasePoint;
          if (_pointerEventEnabled) {
            var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, "id");
            if (pointerIndex > -1) {
              releasePoint = _currPointers.splice(pointerIndex, 1)[0];
              if (navigator.msPointerEnabled) {
                var MSPOINTER_TYPES = {
                  4: "mouse",
                  // event.MSPOINTER_TYPE_MOUSE
                  2: "touch",
                  // event.MSPOINTER_TYPE_TOUCH 
                  3: "pen"
                  // event.MSPOINTER_TYPE_PEN
                };
                releasePoint.type = MSPOINTER_TYPES[e.pointerType];
                if (!releasePoint.type) {
                  releasePoint.type = e.pointerType || "mouse";
                }
              } else {
                releasePoint.type = e.pointerType || "mouse";
              }
            }
          }
          var touchList = _getTouchPoints(e), gestureType, numPoints = touchList.length;
          if (e.type === "mouseup") {
            numPoints = 0;
          }
          if (numPoints === 2) {
            _currentPoints = null;
            return true;
          }
          if (numPoints === 1) {
            _equalizePoints(_startPoint, touchList[0]);
          }
          if (numPoints === 0 && !_direction && !_mainScrollAnimating) {
            if (!releasePoint) {
              if (e.type === "mouseup") {
                releasePoint = {
                  x: e.pageX,
                  y: e.pageY,
                  type: "mouse"
                };
              } else if (e.changedTouches && e.changedTouches[0]) {
                releasePoint = {
                  x: e.changedTouches[0].pageX,
                  y: e.changedTouches[0].pageY,
                  type: "touch"
                };
              }
            }
            _shout("touchRelease", e, releasePoint);
          }
          var releaseTimeDiff = -1;
          if (numPoints === 0) {
            _isDragging = false;
            framework.unbind(window, _upMoveEvents, self);
            _stopDragUpdateLoop();
            if (_isZooming) {
              releaseTimeDiff = 0;
            } else if (_lastReleaseTime !== -1) {
              releaseTimeDiff = _getCurrentTime() - _lastReleaseTime;
            }
          }
          _lastReleaseTime = numPoints === 1 ? _getCurrentTime() : -1;
          if (releaseTimeDiff !== -1 && releaseTimeDiff < 150) {
            gestureType = "zoom";
          } else {
            gestureType = "swipe";
          }
          if (_isZooming && numPoints < 2) {
            _isZooming = false;
            if (numPoints === 1) {
              gestureType = "zoomPointerUp";
            }
            _shout("zoomGestureEnded");
          }
          _currentPoints = null;
          if (!_moved && !_zoomStarted && !_mainScrollAnimating && !_verticalDragInitiated) {
            return;
          }
          _stopAllAnimations();
          if (!_releaseAnimData) {
            _releaseAnimData = _initDragReleaseAnimationData();
          }
          _releaseAnimData.calculateSwipeSpeed("x");
          if (_verticalDragInitiated) {
            var opacityRatio = _calculateVerticalDragOpacityRatio();
            if (opacityRatio < _options.verticalDragRange) {
              self.close();
            } else {
              var initalPanY = _panOffset.y, initialBgOpacity = _bgOpacity;
              _animateProp("verticalDrag", 0, 1, 300, framework.easing.cubic.out, function(now) {
                _panOffset.y = (self.currItem.initialPosition.y - initalPanY) * now + initalPanY;
                _applyBgOpacity((1 - initialBgOpacity) * now + initialBgOpacity);
                _applyCurrentZoomPan();
              });
              _shout("onVerticalDrag", 1);
            }
            return;
          }
          if ((_mainScrollShifted || _mainScrollAnimating) && numPoints === 0) {
            var itemChanged = _finishSwipeMainScrollGesture(gestureType, _releaseAnimData);
            if (itemChanged) {
              return;
            }
            gestureType = "zoomPointerUp";
          }
          if (_mainScrollAnimating) {
            return;
          }
          if (gestureType !== "swipe") {
            _completeZoomGesture();
            return;
          }
          if (!_mainScrollShifted && _currZoomLevel > self.currItem.fitRatio) {
            _completePanGesture(_releaseAnimData);
          }
        }, _initDragReleaseAnimationData = function() {
          var lastFlickDuration, tempReleasePos;
          var s = {
            lastFlickOffset: {},
            lastFlickDist: {},
            lastFlickSpeed: {},
            slowDownRatio: {},
            slowDownRatioReverse: {},
            speedDecelerationRatio: {},
            speedDecelerationRatioAbs: {},
            distanceOffset: {},
            backAnimDestination: {},
            backAnimStarted: {},
            calculateSwipeSpeed: function(axis) {
              if (_posPoints.length > 1) {
                lastFlickDuration = _getCurrentTime() - _gestureCheckSpeedTime + 50;
                tempReleasePos = _posPoints[_posPoints.length - 2][axis];
              } else {
                lastFlickDuration = _getCurrentTime() - _gestureStartTime;
                tempReleasePos = _startPoint[axis];
              }
              s.lastFlickOffset[axis] = _currPoint[axis] - tempReleasePos;
              s.lastFlickDist[axis] = Math.abs(s.lastFlickOffset[axis]);
              if (s.lastFlickDist[axis] > 20) {
                s.lastFlickSpeed[axis] = s.lastFlickOffset[axis] / lastFlickDuration;
              } else {
                s.lastFlickSpeed[axis] = 0;
              }
              if (Math.abs(s.lastFlickSpeed[axis]) < 0.1) {
                s.lastFlickSpeed[axis] = 0;
              }
              s.slowDownRatio[axis] = 0.95;
              s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
              s.speedDecelerationRatio[axis] = 1;
            },
            calculateOverBoundsAnimOffset: function(axis, speed) {
              if (!s.backAnimStarted[axis]) {
                if (_panOffset[axis] > _currPanBounds.min[axis]) {
                  s.backAnimDestination[axis] = _currPanBounds.min[axis];
                } else if (_panOffset[axis] < _currPanBounds.max[axis]) {
                  s.backAnimDestination[axis] = _currPanBounds.max[axis];
                }
                if (s.backAnimDestination[axis] !== void 0) {
                  s.slowDownRatio[axis] = 0.7;
                  s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
                  if (s.speedDecelerationRatioAbs[axis] < 0.05) {
                    s.lastFlickSpeed[axis] = 0;
                    s.backAnimStarted[axis] = true;
                    _animateProp("bounceZoomPan" + axis, _panOffset[axis], s.backAnimDestination[axis], speed || 300, framework.easing.sine.out, function(pos) {
                      _panOffset[axis] = pos;
                      _applyCurrentZoomPan();
                    });
                  }
                }
              }
            },
            // Reduces the speed by slowDownRatio (per 10ms)
            calculateAnimOffset: function(axis) {
              if (!s.backAnimStarted[axis]) {
                s.speedDecelerationRatio[axis] = s.speedDecelerationRatio[axis] * (s.slowDownRatio[axis] + s.slowDownRatioReverse[axis] - s.slowDownRatioReverse[axis] * s.timeDiff / 10);
                s.speedDecelerationRatioAbs[axis] = Math.abs(s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis]);
                s.distanceOffset[axis] = s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis] * s.timeDiff;
                _panOffset[axis] += s.distanceOffset[axis];
              }
            },
            panAnimLoop: function() {
              if (_animations.zoomPan) {
                _animations.zoomPan.raf = _requestAF(s.panAnimLoop);
                s.now = _getCurrentTime();
                s.timeDiff = s.now - s.lastNow;
                s.lastNow = s.now;
                s.calculateAnimOffset("x");
                s.calculateAnimOffset("y");
                _applyCurrentZoomPan();
                s.calculateOverBoundsAnimOffset("x");
                s.calculateOverBoundsAnimOffset("y");
                if (s.speedDecelerationRatioAbs.x < 0.05 && s.speedDecelerationRatioAbs.y < 0.05) {
                  _panOffset.x = Math.round(_panOffset.x);
                  _panOffset.y = Math.round(_panOffset.y);
                  _applyCurrentZoomPan();
                  _stopAnimation("zoomPan");
                  return;
                }
              }
            }
          };
          return s;
        }, _completePanGesture = function(animData) {
          animData.calculateSwipeSpeed("y");
          _currPanBounds = self.currItem.bounds;
          animData.backAnimDestination = {};
          animData.backAnimStarted = {};
          if (Math.abs(animData.lastFlickSpeed.x) <= 0.05 && Math.abs(animData.lastFlickSpeed.y) <= 0.05) {
            animData.speedDecelerationRatioAbs.x = animData.speedDecelerationRatioAbs.y = 0;
            animData.calculateOverBoundsAnimOffset("x");
            animData.calculateOverBoundsAnimOffset("y");
            return true;
          }
          _registerStartAnimation("zoomPan");
          animData.lastNow = _getCurrentTime();
          animData.panAnimLoop();
        }, _finishSwipeMainScrollGesture = function(gestureType, _releaseAnimData2) {
          var itemChanged;
          if (!_mainScrollAnimating) {
            _currZoomedItemIndex = _currentItemIndex;
          }
          var itemsDiff;
          if (gestureType === "swipe") {
            var totalShiftDist = _currPoint.x - _startPoint.x, isFastLastFlick = _releaseAnimData2.lastFlickDist.x < 10;
            if (totalShiftDist > MIN_SWIPE_DISTANCE && (isFastLastFlick || _releaseAnimData2.lastFlickOffset.x > 20)) {
              itemsDiff = -1;
            } else if (totalShiftDist < -MIN_SWIPE_DISTANCE && (isFastLastFlick || _releaseAnimData2.lastFlickOffset.x < -20)) {
              itemsDiff = 1;
            }
          }
          var nextCircle;
          if (itemsDiff) {
            _currentItemIndex += itemsDiff;
            if (_currentItemIndex < 0) {
              _currentItemIndex = _options.loop ? _getNumItems() - 1 : 0;
              nextCircle = true;
            } else if (_currentItemIndex >= _getNumItems()) {
              _currentItemIndex = _options.loop ? 0 : _getNumItems() - 1;
              nextCircle = true;
            }
            if (!nextCircle || _options.loop) {
              _indexDiff += itemsDiff;
              _currPositionIndex -= itemsDiff;
              itemChanged = true;
            }
          }
          var animateToX = _slideSize.x * _currPositionIndex;
          var animateToDist = Math.abs(animateToX - _mainScrollPos.x);
          var finishAnimDuration;
          if (!itemChanged && animateToX > _mainScrollPos.x !== _releaseAnimData2.lastFlickSpeed.x > 0) {
            finishAnimDuration = 333;
          } else {
            finishAnimDuration = Math.abs(_releaseAnimData2.lastFlickSpeed.x) > 0 ? animateToDist / Math.abs(_releaseAnimData2.lastFlickSpeed.x) : 333;
            finishAnimDuration = Math.min(finishAnimDuration, 400);
            finishAnimDuration = Math.max(finishAnimDuration, 250);
          }
          if (_currZoomedItemIndex === _currentItemIndex) {
            itemChanged = false;
          }
          _mainScrollAnimating = true;
          _shout("mainScrollAnimStart");
          _animateProp("mainScroll", _mainScrollPos.x, animateToX, finishAnimDuration, framework.easing.cubic.out, _moveMainScroll, function() {
            _stopAllAnimations();
            _mainScrollAnimating = false;
            _currZoomedItemIndex = -1;
            if (itemChanged || _currZoomedItemIndex !== _currentItemIndex) {
              self.updateCurrItem();
            }
            _shout("mainScrollAnimComplete");
          });
          if (itemChanged) {
            self.updateCurrItem(true);
          }
          return itemChanged;
        }, _calculateZoomLevel = function(touchesDistance) {
          return 1 / _startPointsDistance * touchesDistance * _startZoomLevel;
        }, _completeZoomGesture = function() {
          var destZoomLevel = _currZoomLevel, minZoomLevel = _getMinZoomLevel(), maxZoomLevel = _getMaxZoomLevel();
          if (_currZoomLevel < minZoomLevel) {
            destZoomLevel = minZoomLevel;
          } else if (_currZoomLevel > maxZoomLevel) {
            destZoomLevel = maxZoomLevel;
          }
          var destOpacity = 1, onUpdate, initialOpacity = _bgOpacity;
          if (_opacityChanged && !_isZoomingIn && !_wasOverInitialZoom && _currZoomLevel < minZoomLevel) {
            self.close();
            return true;
          }
          if (_opacityChanged) {
            onUpdate = function(now) {
              _applyBgOpacity((destOpacity - initialOpacity) * now + initialOpacity);
            };
          }
          self.zoomTo(destZoomLevel, 0, 200, framework.easing.cubic.out, onUpdate);
          return true;
        };
        _registerModule("Gestures", {
          publicMethods: {
            initGestures: function() {
              var addEventNames = function(pref, down, move, up, cancel) {
                _dragStartEvent = pref + down;
                _dragMoveEvent = pref + move;
                _dragEndEvent = pref + up;
                if (cancel) {
                  _dragCancelEvent = pref + cancel;
                } else {
                  _dragCancelEvent = "";
                }
              };
              _pointerEventEnabled = _features.pointerEvent;
              if (_pointerEventEnabled && _features.touch) {
                _features.touch = false;
              }
              if (_pointerEventEnabled) {
                if (navigator.msPointerEnabled) {
                  addEventNames("MSPointer", "Down", "Move", "Up", "Cancel");
                } else {
                  addEventNames("pointer", "down", "move", "up", "cancel");
                }
              } else if (_features.touch) {
                addEventNames("touch", "start", "move", "end", "cancel");
                _likelyTouchDevice = true;
              } else {
                addEventNames("mouse", "down", "move", "up");
              }
              _upMoveEvents = _dragMoveEvent + " " + _dragEndEvent + " " + _dragCancelEvent;
              _downEvents = _dragStartEvent;
              if (_pointerEventEnabled && !_likelyTouchDevice) {
                _likelyTouchDevice = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1;
              }
              self.likelyTouchDevice = _likelyTouchDevice;
              _globalEventHandlers[_dragStartEvent] = _onDragStart;
              _globalEventHandlers[_dragMoveEvent] = _onDragMove;
              _globalEventHandlers[_dragEndEvent] = _onDragRelease;
              if (_dragCancelEvent) {
                _globalEventHandlers[_dragCancelEvent] = _globalEventHandlers[_dragEndEvent];
              }
              if (_features.touch) {
                _downEvents += " mousedown";
                _upMoveEvents += " mousemove mouseup";
                _globalEventHandlers.mousedown = _globalEventHandlers[_dragStartEvent];
                _globalEventHandlers.mousemove = _globalEventHandlers[_dragMoveEvent];
                _globalEventHandlers.mouseup = _globalEventHandlers[_dragEndEvent];
              }
              if (!_likelyTouchDevice) {
                _options.allowPanToNext = false;
              }
            }
          }
        });
        var _showOrHideTimeout, _showOrHide = function(item, img, out, completeFn) {
          if (_showOrHideTimeout) {
            clearTimeout(_showOrHideTimeout);
          }
          _initialZoomRunning = true;
          _initialContentSet = true;
          var thumbBounds;
          if (item.initialLayout) {
            thumbBounds = item.initialLayout;
            item.initialLayout = null;
          } else {
            thumbBounds = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
          }
          var duration = out ? _options.hideAnimationDuration : _options.showAnimationDuration;
          var onComplete = function() {
            _stopAnimation("initialZoom");
            if (!out) {
              _applyBgOpacity(1);
              if (img) {
                img.style.display = "block";
              }
              framework.addClass(template, "pswp--animated-in");
              _shout("initialZoom" + (out ? "OutEnd" : "InEnd"));
            } else {
              self.template.removeAttribute("style");
              self.bg.removeAttribute("style");
            }
            if (completeFn) {
              completeFn();
            }
            _initialZoomRunning = false;
          };
          if (!duration || !thumbBounds || thumbBounds.x === void 0) {
            _shout("initialZoom" + (out ? "Out" : "In"));
            _currZoomLevel = item.initialZoomLevel;
            _equalizePoints(_panOffset, item.initialPosition);
            _applyCurrentZoomPan();
            template.style.opacity = out ? 0 : 1;
            _applyBgOpacity(1);
            if (duration) {
              setTimeout(function() {
                onComplete();
              }, duration);
            } else {
              onComplete();
            }
            return;
          }
          var startAnimation = function() {
            var closeWithRaf = _closedByScroll, fadeEverything = !self.currItem.src || self.currItem.loadError || _options.showHideOpacity;
            if (item.miniImg) {
              item.miniImg.style.webkitBackfaceVisibility = "hidden";
            }
            if (!out) {
              _currZoomLevel = thumbBounds.w / item.w;
              _panOffset.x = thumbBounds.x;
              _panOffset.y = thumbBounds.y - _initalWindowScrollY;
              self[fadeEverything ? "template" : "bg"].style.opacity = 1e-3;
              _applyCurrentZoomPan();
            }
            _registerStartAnimation("initialZoom");
            if (out && !closeWithRaf) {
              framework.removeClass(template, "pswp--animated-in");
            }
            if (fadeEverything) {
              if (out) {
                framework[(closeWithRaf ? "remove" : "add") + "Class"](template, "pswp--animate_opacity");
              } else {
                setTimeout(function() {
                  framework.addClass(template, "pswp--animate_opacity");
                }, 30);
              }
            }
            _showOrHideTimeout = setTimeout(function() {
              _shout("initialZoom" + (out ? "Out" : "In"));
              if (!out) {
                _currZoomLevel = item.initialZoomLevel;
                _equalizePoints(_panOffset, item.initialPosition);
                _applyCurrentZoomPan();
                _applyBgOpacity(1);
                if (fadeEverything) {
                  template.style.opacity = 1;
                } else {
                  _applyBgOpacity(1);
                }
                _showOrHideTimeout = setTimeout(onComplete, duration + 20);
              } else {
                var destZoomLevel = thumbBounds.w / item.w, initialPanOffset = {
                  x: _panOffset.x,
                  y: _panOffset.y
                }, initialZoomLevel = _currZoomLevel, initalBgOpacity = _bgOpacity, onUpdate = function(now) {
                  if (now === 1) {
                    _currZoomLevel = destZoomLevel;
                    _panOffset.x = thumbBounds.x;
                    _panOffset.y = thumbBounds.y - _currentWindowScrollY;
                  } else {
                    _currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
                    _panOffset.x = (thumbBounds.x - initialPanOffset.x) * now + initialPanOffset.x;
                    _panOffset.y = (thumbBounds.y - _currentWindowScrollY - initialPanOffset.y) * now + initialPanOffset.y;
                  }
                  _applyCurrentZoomPan();
                  if (fadeEverything) {
                    template.style.opacity = 1 - now;
                  } else {
                    _applyBgOpacity(initalBgOpacity - now * initalBgOpacity);
                  }
                };
                if (closeWithRaf) {
                  _animateProp("initialZoom", 0, 1, duration, framework.easing.cubic.out, onUpdate, onComplete);
                } else {
                  onUpdate(1);
                  _showOrHideTimeout = setTimeout(onComplete, duration + 20);
                }
              }
            }, out ? 25 : 90);
          };
          startAnimation();
        };
        var _items, _tempPanAreaSize = {}, _imagesToAppendPool = [], _initialContentSet, _initialZoomRunning, _controllerDefaultOptions = {
          index: 0,
          errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
          forceProgressiveLoading: false,
          // TODO
          preload: [1, 1],
          getNumItemsFn: function() {
            return _items.length;
          }
        };
        var _getItemAt, _getNumItems, _initialIsLoop, _getZeroBounds = function() {
          return {
            center: {
              x: 0,
              y: 0
            },
            max: {
              x: 0,
              y: 0
            },
            min: {
              x: 0,
              y: 0
            }
          };
        }, _calculateSingleItemPanBounds = function(item, realPanElementW, realPanElementH) {
          var bounds = item.bounds;
          bounds.center.x = Math.round((_tempPanAreaSize.x - realPanElementW) / 2);
          bounds.center.y = Math.round((_tempPanAreaSize.y - realPanElementH) / 2) + item.vGap.top;
          bounds.max.x = realPanElementW > _tempPanAreaSize.x ? Math.round(_tempPanAreaSize.x - realPanElementW) : bounds.center.x;
          bounds.max.y = realPanElementH > _tempPanAreaSize.y ? Math.round(_tempPanAreaSize.y - realPanElementH) + item.vGap.top : bounds.center.y;
          bounds.min.x = realPanElementW > _tempPanAreaSize.x ? 0 : bounds.center.x;
          bounds.min.y = realPanElementH > _tempPanAreaSize.y ? item.vGap.top : bounds.center.y;
        }, _calculateItemSize = function(item, viewportSize, zoomLevel) {
          if (item.src && !item.loadError) {
            var isInitial = !zoomLevel;
            if (isInitial) {
              if (!item.vGap) {
                item.vGap = {
                  top: 0,
                  bottom: 0
                };
              }
              _shout("parseVerticalMargin", item);
            }
            _tempPanAreaSize.x = viewportSize.x;
            _tempPanAreaSize.y = viewportSize.y - item.vGap.top - item.vGap.bottom;
            if (isInitial) {
              var hRatio = _tempPanAreaSize.x / item.w;
              var vRatio = _tempPanAreaSize.y / item.h;
              item.fitRatio = hRatio < vRatio ? hRatio : vRatio;
              var scaleMode = _options.scaleMode;
              if (scaleMode === "orig") {
                zoomLevel = 1;
              } else if (scaleMode === "fit") {
                zoomLevel = item.fitRatio;
              }
              if (zoomLevel > 1) {
                zoomLevel = 1;
              }
              item.initialZoomLevel = zoomLevel;
              if (!item.bounds) {
                item.bounds = _getZeroBounds();
              }
            }
            if (!zoomLevel) {
              return;
            }
            _calculateSingleItemPanBounds(item, item.w * zoomLevel, item.h * zoomLevel);
            if (isInitial && zoomLevel === item.initialZoomLevel) {
              item.initialPosition = item.bounds.center;
            }
            return item.bounds;
          } else {
            item.w = item.h = 0;
            item.initialZoomLevel = item.fitRatio = 1;
            item.bounds = _getZeroBounds();
            item.initialPosition = item.bounds.center;
            return item.bounds;
          }
        }, _appendImage = function(index, item, baseDiv, img, preventAnimation, keepPlaceholder) {
          if (item.loadError) {
            return;
          }
          if (img) {
            item.imageAppended = true;
            _setImageSize(item, img, item === self.currItem && _renderMaxResolution);
            baseDiv.appendChild(img);
            if (keepPlaceholder) {
              setTimeout(function() {
                if (item && item.loaded && item.placeholder) {
                  item.placeholder.style.display = "none";
                  item.placeholder = null;
                }
              }, 500);
            }
          }
        }, _preloadImage = function(item) {
          item.loading = true;
          item.loaded = false;
          var img = item.img = framework.createEl("pswp__img", "img");
          var onComplete = function() {
            item.loading = false;
            item.loaded = true;
            if (item.loadComplete) {
              item.loadComplete(item);
            } else {
              item.img = null;
            }
            img.onload = img.onerror = null;
            img = null;
          };
          img.onload = onComplete;
          img.onerror = function() {
            item.loadError = true;
            onComplete();
          };
          img.src = item.src;
          return img;
        }, _checkForError = function(item, cleanUp) {
          if (item.src && item.loadError && item.container) {
            if (cleanUp) {
              item.container.innerHTML = "";
            }
            item.container.innerHTML = _options.errorMsg.replace("%url%", item.src);
            return true;
          }
        }, _setImageSize = function(item, img, maxRes) {
          if (!item.src) {
            return;
          }
          if (!img) {
            img = item.container.lastChild;
          }
          var w = maxRes ? item.w : Math.round(item.w * item.fitRatio), h = maxRes ? item.h : Math.round(item.h * item.fitRatio);
          if (item.placeholder && !item.loaded) {
            item.placeholder.style.width = w + "px";
            item.placeholder.style.height = h + "px";
          }
          img.style.width = w + "px";
          img.style.height = h + "px";
        }, _appendImagesPool = function() {
          if (_imagesToAppendPool.length) {
            var poolItem;
            for (var i = 0; i < _imagesToAppendPool.length; i++) {
              poolItem = _imagesToAppendPool[i];
              if (poolItem.holder.index === poolItem.index) {
                _appendImage(poolItem.index, poolItem.item, poolItem.baseDiv, poolItem.img, false, poolItem.clearPlaceholder);
              }
            }
            _imagesToAppendPool = [];
          }
        };
        _registerModule("Controller", {
          publicMethods: {
            lazyLoadItem: function(index) {
              index = _getLoopedId(index);
              var item = _getItemAt(index);
              if (!item || (item.loaded || item.loading) && !_itemsNeedUpdate) {
                return;
              }
              _shout("gettingData", index, item);
              if (!item.src) {
                return;
              }
              _preloadImage(item);
            },
            initController: function() {
              framework.extend(_options, _controllerDefaultOptions, true);
              self.items = _items = items;
              _getItemAt = self.getItemAt;
              _getNumItems = _options.getNumItemsFn;
              _initialIsLoop = _options.loop;
              if (_getNumItems() < 3) {
                _options.loop = false;
              }
              _listen("beforeChange", function(diff) {
                var p3 = _options.preload, isNext = diff === null ? true : diff >= 0, preloadBefore = Math.min(p3[0], _getNumItems()), preloadAfter = Math.min(p3[1], _getNumItems()), i;
                for (i = 1; i <= (isNext ? preloadAfter : preloadBefore); i++) {
                  self.lazyLoadItem(_currentItemIndex + i);
                }
                for (i = 1; i <= (isNext ? preloadBefore : preloadAfter); i++) {
                  self.lazyLoadItem(_currentItemIndex - i);
                }
              });
              _listen("initialLayout", function() {
                self.currItem.initialLayout = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
              });
              _listen("mainScrollAnimComplete", _appendImagesPool);
              _listen("initialZoomInEnd", _appendImagesPool);
              _listen("destroy", function() {
                var item;
                for (var i = 0; i < _items.length; i++) {
                  item = _items[i];
                  if (item.container) {
                    item.container = null;
                  }
                  if (item.placeholder) {
                    item.placeholder = null;
                  }
                  if (item.img) {
                    item.img = null;
                  }
                  if (item.preloader) {
                    item.preloader = null;
                  }
                  if (item.loadError) {
                    item.loaded = item.loadError = false;
                  }
                }
                _imagesToAppendPool = null;
              });
            },
            getItemAt: function(index) {
              if (index >= 0) {
                return _items[index] !== void 0 ? _items[index] : false;
              }
              return false;
            },
            allowProgressiveImg: function() {
              return _options.forceProgressiveLoading || !_likelyTouchDevice || _options.mouseUsed || screen.width > 1200;
            },
            setContent: function(holder, index) {
              if (_options.loop) {
                index = _getLoopedId(index);
              }
              var prevItem = self.getItemAt(holder.index);
              if (prevItem) {
                prevItem.container = null;
              }
              var item = self.getItemAt(index), img;
              if (!item) {
                holder.el.innerHTML = "";
                return;
              }
              _shout("gettingData", index, item);
              holder.index = index;
              holder.item = item;
              var baseDiv = item.container = framework.createEl("pswp__zoom-wrap");
              if (!item.src && item.html) {
                if (item.html.tagName) {
                  baseDiv.appendChild(item.html);
                } else {
                  baseDiv.innerHTML = item.html;
                }
              }
              _checkForError(item);
              _calculateItemSize(item, _viewportSize);
              if (item.src && !item.loadError && !item.loaded) {
                item.loadComplete = function(item2) {
                  if (!_isOpen) {
                    return;
                  }
                  if (holder && holder.index === index) {
                    if (_checkForError(item2, true)) {
                      item2.loadComplete = item2.img = null;
                      _calculateItemSize(item2, _viewportSize);
                      _applyZoomPanToItem(item2);
                      if (holder.index === _currentItemIndex) {
                        self.updateCurrZoomItem();
                      }
                      return;
                    }
                    if (!item2.imageAppended) {
                      if (_features.transform && (_mainScrollAnimating || _initialZoomRunning)) {
                        _imagesToAppendPool.push({
                          item: item2,
                          baseDiv,
                          img: item2.img,
                          index,
                          holder,
                          clearPlaceholder: true
                        });
                      } else {
                        _appendImage(index, item2, baseDiv, item2.img, _mainScrollAnimating || _initialZoomRunning, true);
                      }
                    } else {
                      if (!_initialZoomRunning && item2.placeholder) {
                        item2.placeholder.style.display = "none";
                        item2.placeholder = null;
                      }
                    }
                  }
                  item2.loadComplete = null;
                  item2.img = null;
                  _shout("imageLoadComplete", index, item2);
                };
                if (framework.features.transform) {
                  var placeholderClassName = "pswp__img pswp__img--placeholder";
                  placeholderClassName += item.msrc ? "" : " pswp__img--placeholder--blank";
                  var placeholder = framework.createEl(placeholderClassName, item.msrc ? "img" : "");
                  if (item.msrc) {
                    placeholder.src = item.msrc;
                  }
                  _setImageSize(item, placeholder);
                  baseDiv.appendChild(placeholder);
                  item.placeholder = placeholder;
                }
                if (!item.loading) {
                  _preloadImage(item);
                }
                if (self.allowProgressiveImg()) {
                  if (!_initialContentSet && _features.transform) {
                    _imagesToAppendPool.push({
                      item,
                      baseDiv,
                      img: item.img,
                      index,
                      holder
                    });
                  } else {
                    _appendImage(index, item, baseDiv, item.img, true, true);
                  }
                }
              } else if (item.src && !item.loadError) {
                img = framework.createEl("pswp__img", "img");
                img.style.opacity = 1;
                img.src = item.src;
                _setImageSize(item, img);
                _appendImage(index, item, baseDiv, img, true);
              }
              if (!_initialContentSet && index === _currentItemIndex) {
                _currZoomElementStyle = baseDiv.style;
                _showOrHide(item, img || item.img);
              } else {
                _applyZoomPanToItem(item);
              }
              holder.el.innerHTML = "";
              holder.el.appendChild(baseDiv);
            },
            cleanSlide: function(item) {
              if (item.img) {
                item.img.onload = item.img.onerror = null;
              }
              item.loaded = item.loading = item.img = item.imageAppended = false;
            }
          }
        });
        var tapTimer, tapReleasePoint = {}, _dispatchTapEvent = function(origEvent, releasePoint, pointerType) {
          var e = document.createEvent("CustomEvent"), eDetail = {
            origEvent,
            target: origEvent.target,
            releasePoint,
            pointerType: pointerType || "touch"
          };
          e.initCustomEvent("pswpTap", true, true, eDetail);
          origEvent.target.dispatchEvent(e);
        };
        _registerModule("Tap", {
          publicMethods: {
            initTap: function() {
              _listen("firstTouchStart", self.onTapStart);
              _listen("touchRelease", self.onTapRelease);
              _listen("destroy", function() {
                tapReleasePoint = {};
                tapTimer = null;
              });
            },
            onTapStart: function(touchList) {
              if (touchList.length > 1) {
                clearTimeout(tapTimer);
                tapTimer = null;
              }
            },
            onTapRelease: function(e, releasePoint) {
              if (!releasePoint) {
                return;
              }
              if (!_moved && !_isMultitouch && !_numAnimations) {
                var p0 = releasePoint;
                if (tapTimer) {
                  clearTimeout(tapTimer);
                  tapTimer = null;
                  if (_isNearbyPoints(p0, tapReleasePoint)) {
                    _shout("doubleTap", p0);
                    return;
                  }
                }
                if (releasePoint.type === "mouse") {
                  _dispatchTapEvent(e, releasePoint, "mouse");
                  return;
                }
                var clickedTagName = e.target.tagName.toUpperCase();
                if (clickedTagName === "BUTTON" || framework.hasClass(e.target, "pswp__single-tap")) {
                  _dispatchTapEvent(e, releasePoint);
                  return;
                }
                _equalizePoints(tapReleasePoint, p0);
                tapTimer = setTimeout(function() {
                  _dispatchTapEvent(e, releasePoint);
                  tapTimer = null;
                }, 300);
              }
            }
          }
        });
        var _wheelDelta;
        _registerModule("DesktopZoom", {
          publicMethods: {
            initDesktopZoom: function() {
              if (_oldIE) {
                return;
              }
              if (_likelyTouchDevice) {
                _listen("mouseUsed", function() {
                  self.setupDesktopZoom();
                });
              } else {
                self.setupDesktopZoom(true);
              }
            },
            setupDesktopZoom: function(onInit) {
              _wheelDelta = {};
              var events = "wheel mousewheel DOMMouseScroll";
              _listen("bindEvents", function() {
                framework.bind(template, events, self.handleMouseWheel);
              });
              _listen("unbindEvents", function() {
                if (_wheelDelta) {
                  framework.unbind(template, events, self.handleMouseWheel);
                }
              });
              self.mouseZoomedIn = false;
              var hasDraggingClass, updateZoomable = function() {
                if (self.mouseZoomedIn) {
                  framework.removeClass(template, "pswp--zoomed-in");
                  self.mouseZoomedIn = false;
                }
                if (_currZoomLevel < 1) {
                  framework.addClass(template, "pswp--zoom-allowed");
                } else {
                  framework.removeClass(template, "pswp--zoom-allowed");
                }
                removeDraggingClass();
              }, removeDraggingClass = function() {
                if (hasDraggingClass) {
                  framework.removeClass(template, "pswp--dragging");
                  hasDraggingClass = false;
                }
              };
              _listen("resize", updateZoomable);
              _listen("afterChange", updateZoomable);
              _listen("pointerDown", function() {
                if (self.mouseZoomedIn) {
                  hasDraggingClass = true;
                  framework.addClass(template, "pswp--dragging");
                }
              });
              _listen("pointerUp", removeDraggingClass);
              if (!onInit) {
                updateZoomable();
              }
            },
            handleMouseWheel: function(e) {
              if (_currZoomLevel <= self.currItem.fitRatio) {
                if (_options.modal) {
                  if (!_options.closeOnScroll || _numAnimations || _isDragging) {
                    e.preventDefault();
                  } else if (_transformKey && Math.abs(e.deltaY) > 2) {
                    _closedByScroll = true;
                    self.close();
                  }
                }
                return true;
              }
              e.stopPropagation();
              _wheelDelta.x = 0;
              if ("deltaX" in e) {
                if (e.deltaMode === 1) {
                  _wheelDelta.x = e.deltaX * 18;
                  _wheelDelta.y = e.deltaY * 18;
                } else {
                  _wheelDelta.x = e.deltaX;
                  _wheelDelta.y = e.deltaY;
                }
              } else if ("wheelDelta" in e) {
                if (e.wheelDeltaX) {
                  _wheelDelta.x = -0.16 * e.wheelDeltaX;
                }
                if (e.wheelDeltaY) {
                  _wheelDelta.y = -0.16 * e.wheelDeltaY;
                } else {
                  _wheelDelta.y = -0.16 * e.wheelDelta;
                }
              } else if ("detail" in e) {
                _wheelDelta.y = e.detail;
              } else {
                return;
              }
              _calculatePanBounds(_currZoomLevel, true);
              var newPanX = _panOffset.x - _wheelDelta.x, newPanY = _panOffset.y - _wheelDelta.y;
              if (_options.modal || newPanX <= _currPanBounds.min.x && newPanX >= _currPanBounds.max.x && newPanY <= _currPanBounds.min.y && newPanY >= _currPanBounds.max.y) {
                e.preventDefault();
              }
              self.panTo(newPanX, newPanY);
            },
            toggleDesktopZoom: function(centerPoint) {
              centerPoint = centerPoint || {
                x: _viewportSize.x / 2 + _offset.x,
                y: _viewportSize.y / 2 + _offset.y
              };
              var doubleTapZoomLevel = _options.getDoubleTapZoom(true, self.currItem);
              var zoomOut = _currZoomLevel === doubleTapZoomLevel;
              self.mouseZoomedIn = !zoomOut;
              self.zoomTo(zoomOut ? self.currItem.initialZoomLevel : doubleTapZoomLevel, centerPoint, 333);
              framework[(!zoomOut ? "add" : "remove") + "Class"](template, "pswp--zoomed-in");
            }
          }
        });
        var _historyDefaultOptions = {
          history: true,
          galleryUID: 1
        };
        var _historyUpdateTimeout, _hashChangeTimeout, _hashAnimCheckTimeout, _hashChangedByScript, _hashChangedByHistory, _hashReseted, _initialHash, _historyChanged, _closedFromURL, _urlChangedOnce, _windowLoc, _supportsPushState, _getHash = function() {
          return _windowLoc.hash.substring(1);
        }, _cleanHistoryTimeouts = function() {
          if (_historyUpdateTimeout) {
            clearTimeout(_historyUpdateTimeout);
          }
          if (_hashAnimCheckTimeout) {
            clearTimeout(_hashAnimCheckTimeout);
          }
        }, _parseItemIndexFromURL = function() {
          var hash = _getHash(), params = {};
          if (hash.length < 5) {
            return params;
          }
          var i, vars = hash.split("&");
          for (i = 0; i < vars.length; i++) {
            if (!vars[i]) {
              continue;
            }
            var pair = vars[i].split("=");
            if (pair.length < 2) {
              continue;
            }
            params[pair[0]] = pair[1];
          }
          if (_options.galleryPIDs) {
            var searchfor = params.pid;
            params.pid = 0;
            for (i = 0; i < _items.length; i++) {
              if (_items[i].pid === searchfor) {
                params.pid = i;
                break;
              }
            }
          } else {
            params.pid = parseInt(params.pid, 10) - 1;
          }
          if (params.pid < 0) {
            params.pid = 0;
          }
          return params;
        }, _updateHash = function() {
          if (_hashAnimCheckTimeout) {
            clearTimeout(_hashAnimCheckTimeout);
          }
          if (_numAnimations || _isDragging) {
            _hashAnimCheckTimeout = setTimeout(_updateHash, 500);
            return;
          }
          if (_hashChangedByScript) {
            clearTimeout(_hashChangeTimeout);
          } else {
            _hashChangedByScript = true;
          }
          var pid = _currentItemIndex + 1;
          var item = _getItemAt(_currentItemIndex);
          if (item.hasOwnProperty("pid")) {
            pid = item.pid;
          }
          var newHash = _initialHash + "&gid=" + _options.galleryUID + "&pid=" + pid;
          if (!_historyChanged) {
            if (_windowLoc.hash.indexOf(newHash) === -1) {
              _urlChangedOnce = true;
            }
          }
          var newURL = _windowLoc.href.split("#")[0] + "#" + newHash;
          if (_supportsPushState) {
            if ("#" + newHash !== window.location.hash) {
              history[_historyChanged ? "replaceState" : "pushState"]("", document.title, newURL);
            }
          } else {
            if (_historyChanged) {
              _windowLoc.replace(newURL);
            } else {
              _windowLoc.hash = newHash;
            }
          }
          _historyChanged = true;
          _hashChangeTimeout = setTimeout(function() {
            _hashChangedByScript = false;
          }, 60);
        };
        _registerModule("History", {
          publicMethods: {
            initHistory: function() {
              framework.extend(_options, _historyDefaultOptions, true);
              if (!_options.history) {
                return;
              }
              _windowLoc = window.location;
              _urlChangedOnce = false;
              _closedFromURL = false;
              _historyChanged = false;
              _initialHash = _getHash();
              _supportsPushState = "pushState" in history;
              if (_initialHash.indexOf("gid=") > -1) {
                _initialHash = _initialHash.split("&gid=")[0];
                _initialHash = _initialHash.split("?gid=")[0];
              }
              _listen("afterChange", self.updateURL);
              _listen("unbindEvents", function() {
                framework.unbind(window, "hashchange", self.onHashChange);
              });
              var returnToOriginal = function() {
                _hashReseted = true;
                if (!_closedFromURL) {
                  if (_urlChangedOnce) {
                    history.back();
                  } else {
                    if (_initialHash) {
                      _windowLoc.hash = _initialHash;
                    } else {
                      if (_supportsPushState) {
                        history.pushState("", document.title, _windowLoc.pathname + _windowLoc.search);
                      } else {
                        _windowLoc.hash = "";
                      }
                    }
                  }
                }
                _cleanHistoryTimeouts();
              };
              _listen("unbindEvents", function() {
                if (_closedByScroll) {
                  returnToOriginal();
                }
              });
              _listen("destroy", function() {
                if (!_hashReseted) {
                  returnToOriginal();
                }
              });
              _listen("firstUpdate", function() {
                _currentItemIndex = _parseItemIndexFromURL().pid;
              });
              var index = _initialHash.indexOf("pid=");
              if (index > -1) {
                _initialHash = _initialHash.substring(0, index);
                if (_initialHash.slice(-1) === "&") {
                  _initialHash = _initialHash.slice(0, -1);
                }
              }
              setTimeout(function() {
                if (_isOpen) {
                  framework.bind(window, "hashchange", self.onHashChange);
                }
              }, 40);
            },
            onHashChange: function() {
              if (_getHash() === _initialHash) {
                _closedFromURL = true;
                self.close();
                return;
              }
              if (!_hashChangedByScript) {
                _hashChangedByHistory = true;
                self.goTo(_parseItemIndexFromURL().pid);
                _hashChangedByHistory = false;
              }
            },
            updateURL: function() {
              _cleanHistoryTimeouts();
              if (_hashChangedByHistory) {
                return;
              }
              if (!_historyChanged) {
                _updateHash();
              } else {
                _historyUpdateTimeout = setTimeout(_updateHash, 800);
              }
            }
          }
        });
        framework.extend(self, publicMethods);
      };
      return PhotoSwipe2;
    });
  }
});

// node_modules/photoswipe/dist/photoswipe-ui-default.js
var require_photoswipe_ui_default = __commonJS({
  "node_modules/photoswipe/dist/photoswipe-ui-default.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module.exports = factory();
      } else {
        root.PhotoSwipeUI_Default = factory();
      }
    })(exports, function() {
      "use strict";
      var PhotoSwipeUI_Default2 = function(pswp, framework) {
        var ui = this;
        var _overlayUIUpdated = false, _controlsVisible = true, _fullscrenAPI, _controls, _captionContainer, _fakeCaptionContainer, _indexIndicator, _shareButton, _shareModal, _shareModalHidden = true, _initalCloseOnScrollValue, _isIdle, _listen, _loadingIndicator, _loadingIndicatorHidden, _loadingIndicatorTimeout, _galleryHasOneSlide, _options, _defaultUIOptions = {
          barsSize: {
            top: 44,
            bottom: "auto"
          },
          closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
          timeToIdle: 4e3,
          timeToIdleOutside: 1e3,
          loadingIndicatorDelay: 1e3,
          // 2s
          addCaptionHTMLFn: function(item, captionEl) {
            if (!item.title) {
              captionEl.children[0].innerHTML = "";
              return false;
            }
            captionEl.children[0].innerHTML = item.title;
            return true;
          },
          closeEl: true,
          captionEl: true,
          fullscreenEl: true,
          zoomEl: true,
          shareEl: true,
          counterEl: true,
          arrowEl: true,
          preloaderEl: true,
          tapToClose: false,
          tapToToggleControls: true,
          clickToCloseNonZoomable: true,
          shareButtons: [{
            id: "facebook",
            label: "Share on Facebook",
            url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
          }, {
            id: "twitter",
            label: "Tweet",
            url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
          }, {
            id: "pinterest",
            label: "Pin it",
            url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
          }, {
            id: "download",
            label: "Download image",
            url: "{{raw_image_url}}",
            download: true
          }],
          getImageURLForShare: function() {
            return pswp.currItem.src || "";
          },
          getPageURLForShare: function() {
            return window.location.href;
          },
          getTextForShare: function() {
            return pswp.currItem.title || "";
          },
          indexIndicatorSep: " / ",
          fitControlsWidth: 1200
        }, _blockControlsTap, _blockControlsTapTimeout;
        var _onControlsTap = function(e) {
          if (_blockControlsTap) {
            return true;
          }
          e = e || window.event;
          if (_options.timeToIdle && _options.mouseUsed && !_isIdle) {
            _onIdleMouseMove();
          }
          var target = e.target || e.srcElement, uiElement, clickedClass = target.getAttribute("class") || "", found;
          for (var i = 0; i < _uiElements.length; i++) {
            uiElement = _uiElements[i];
            if (uiElement.onTap && clickedClass.indexOf("pswp__" + uiElement.name) > -1) {
              uiElement.onTap();
              found = true;
            }
          }
          if (found) {
            if (e.stopPropagation) {
              e.stopPropagation();
            }
            _blockControlsTap = true;
            var tapDelay = framework.features.isOldAndroid ? 600 : 30;
            _blockControlsTapTimeout = setTimeout(function() {
              _blockControlsTap = false;
            }, tapDelay);
          }
        }, _fitControlsInViewport = function() {
          return !pswp.likelyTouchDevice || _options.mouseUsed || screen.width > _options.fitControlsWidth;
        }, _togglePswpClass = function(el, cName, add) {
          framework[(add ? "add" : "remove") + "Class"](el, "pswp__" + cName);
        }, _countNumItems = function() {
          var hasOneSlide = _options.getNumItemsFn() === 1;
          if (hasOneSlide !== _galleryHasOneSlide) {
            _togglePswpClass(_controls, "ui--one-slide", hasOneSlide);
            _galleryHasOneSlide = hasOneSlide;
          }
        }, _toggleShareModalClass = function() {
          _togglePswpClass(_shareModal, "share-modal--hidden", _shareModalHidden);
        }, _toggleShareModal = function() {
          _shareModalHidden = !_shareModalHidden;
          if (!_shareModalHidden) {
            _toggleShareModalClass();
            setTimeout(function() {
              if (!_shareModalHidden) {
                framework.addClass(_shareModal, "pswp__share-modal--fade-in");
              }
            }, 30);
          } else {
            framework.removeClass(_shareModal, "pswp__share-modal--fade-in");
            setTimeout(function() {
              if (_shareModalHidden) {
                _toggleShareModalClass();
              }
            }, 300);
          }
          if (!_shareModalHidden) {
            _updateShareURLs();
          }
          return false;
        }, _openWindowPopup = function(e) {
          e = e || window.event;
          var target = e.target || e.srcElement;
          pswp.shout("shareLinkClick", e, target);
          if (!target.href) {
            return false;
          }
          if (target.hasAttribute("download")) {
            return true;
          }
          window.open(target.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100));
          if (!_shareModalHidden) {
            _toggleShareModal();
          }
          return false;
        }, _updateShareURLs = function() {
          var shareButtonOut = "", shareButtonData, shareURL, image_url, page_url, share_text;
          for (var i = 0; i < _options.shareButtons.length; i++) {
            shareButtonData = _options.shareButtons[i];
            image_url = _options.getImageURLForShare(shareButtonData);
            page_url = _options.getPageURLForShare(shareButtonData);
            share_text = _options.getTextForShare(shareButtonData);
            shareURL = shareButtonData.url.replace("{{url}}", encodeURIComponent(page_url)).replace("{{image_url}}", encodeURIComponent(image_url)).replace("{{raw_image_url}}", image_url).replace("{{text}}", encodeURIComponent(share_text));
            shareButtonOut += '<a href="' + shareURL + '" target="_blank" class="pswp__share--' + shareButtonData.id + '"' + (shareButtonData.download ? "download" : "") + ">" + shareButtonData.label + "</a>";
            if (_options.parseShareButtonOut) {
              shareButtonOut = _options.parseShareButtonOut(shareButtonData, shareButtonOut);
            }
          }
          _shareModal.children[0].innerHTML = shareButtonOut;
          _shareModal.children[0].onclick = _openWindowPopup;
        }, _hasCloseClass = function(target) {
          for (var i = 0; i < _options.closeElClasses.length; i++) {
            if (framework.hasClass(target, "pswp__" + _options.closeElClasses[i])) {
              return true;
            }
          }
        }, _idleInterval, _idleTimer, _idleIncrement = 0, _onIdleMouseMove = function() {
          clearTimeout(_idleTimer);
          _idleIncrement = 0;
          if (_isIdle) {
            ui.setIdle(false);
          }
        }, _onMouseLeaveWindow = function(e) {
          e = e ? e : window.event;
          var from = e.relatedTarget || e.toElement;
          if (!from || from.nodeName === "HTML") {
            clearTimeout(_idleTimer);
            _idleTimer = setTimeout(function() {
              ui.setIdle(true);
            }, _options.timeToIdleOutside);
          }
        }, _setupFullscreenAPI = function() {
          if (_options.fullscreenEl && !framework.features.isOldAndroid) {
            if (!_fullscrenAPI) {
              _fullscrenAPI = ui.getFullscreenAPI();
            }
            if (_fullscrenAPI) {
              framework.bind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
              ui.updateFullscreen();
              framework.addClass(pswp.template, "pswp--supports-fs");
            } else {
              framework.removeClass(pswp.template, "pswp--supports-fs");
            }
          }
        }, _setupLoadingIndicator = function() {
          if (_options.preloaderEl) {
            _toggleLoadingIndicator(true);
            _listen("beforeChange", function() {
              clearTimeout(_loadingIndicatorTimeout);
              _loadingIndicatorTimeout = setTimeout(function() {
                if (pswp.currItem && pswp.currItem.loading) {
                  if (!pswp.allowProgressiveImg() || pswp.currItem.img && !pswp.currItem.img.naturalWidth) {
                    _toggleLoadingIndicator(false);
                  }
                } else {
                  _toggleLoadingIndicator(true);
                }
              }, _options.loadingIndicatorDelay);
            });
            _listen("imageLoadComplete", function(index, item) {
              if (pswp.currItem === item) {
                _toggleLoadingIndicator(true);
              }
            });
          }
        }, _toggleLoadingIndicator = function(hide) {
          if (_loadingIndicatorHidden !== hide) {
            _togglePswpClass(_loadingIndicator, "preloader--active", !hide);
            _loadingIndicatorHidden = hide;
          }
        }, _applyNavBarGaps = function(item) {
          var gap = item.vGap;
          if (_fitControlsInViewport()) {
            var bars = _options.barsSize;
            if (_options.captionEl && bars.bottom === "auto") {
              if (!_fakeCaptionContainer) {
                _fakeCaptionContainer = framework.createEl("pswp__caption pswp__caption--fake");
                _fakeCaptionContainer.appendChild(framework.createEl("pswp__caption__center"));
                _controls.insertBefore(_fakeCaptionContainer, _captionContainer);
                framework.addClass(_controls, "pswp__ui--fit");
              }
              if (_options.addCaptionHTMLFn(item, _fakeCaptionContainer, true)) {
                var captionSize = _fakeCaptionContainer.clientHeight;
                gap.bottom = parseInt(captionSize, 10) || 44;
              } else {
                gap.bottom = bars.top;
              }
            } else {
              gap.bottom = bars.bottom === "auto" ? 0 : bars.bottom;
            }
            gap.top = bars.top;
          } else {
            gap.top = gap.bottom = 0;
          }
        }, _setupIdle = function() {
          if (_options.timeToIdle) {
            _listen("mouseUsed", function() {
              framework.bind(document, "mousemove", _onIdleMouseMove);
              framework.bind(document, "mouseout", _onMouseLeaveWindow);
              _idleInterval = setInterval(function() {
                _idleIncrement++;
                if (_idleIncrement === 2) {
                  ui.setIdle(true);
                }
              }, _options.timeToIdle / 2);
            });
          }
        }, _setupHidingControlsDuringGestures = function() {
          _listen("onVerticalDrag", function(now) {
            if (_controlsVisible && now < 0.95) {
              ui.hideControls();
            } else if (!_controlsVisible && now >= 0.95) {
              ui.showControls();
            }
          });
          var pinchControlsHidden;
          _listen("onPinchClose", function(now) {
            if (_controlsVisible && now < 0.9) {
              ui.hideControls();
              pinchControlsHidden = true;
            } else if (pinchControlsHidden && !_controlsVisible && now > 0.9) {
              ui.showControls();
            }
          });
          _listen("zoomGestureEnded", function() {
            pinchControlsHidden = false;
            if (pinchControlsHidden && !_controlsVisible) {
              ui.showControls();
            }
          });
        };
        var _uiElements = [{
          name: "caption",
          option: "captionEl",
          onInit: function(el) {
            _captionContainer = el;
          }
        }, {
          name: "share-modal",
          option: "shareEl",
          onInit: function(el) {
            _shareModal = el;
          },
          onTap: function() {
            _toggleShareModal();
          }
        }, {
          name: "button--share",
          option: "shareEl",
          onInit: function(el) {
            _shareButton = el;
          },
          onTap: function() {
            _toggleShareModal();
          }
        }, {
          name: "button--zoom",
          option: "zoomEl",
          onTap: pswp.toggleDesktopZoom
        }, {
          name: "counter",
          option: "counterEl",
          onInit: function(el) {
            _indexIndicator = el;
          }
        }, {
          name: "button--close",
          option: "closeEl",
          onTap: pswp.close
        }, {
          name: "button--arrow--left",
          option: "arrowEl",
          onTap: pswp.prev
        }, {
          name: "button--arrow--right",
          option: "arrowEl",
          onTap: pswp.next
        }, {
          name: "button--fs",
          option: "fullscreenEl",
          onTap: function() {
            if (_fullscrenAPI.isFullscreen()) {
              _fullscrenAPI.exit();
            } else {
              _fullscrenAPI.enter();
            }
          }
        }, {
          name: "preloader",
          option: "preloaderEl",
          onInit: function(el) {
            _loadingIndicator = el;
          }
        }];
        var _setupUIElements = function() {
          var item, classAttr, uiElement;
          var loopThroughChildElements = function(sChildren) {
            if (!sChildren) {
              return;
            }
            var l = sChildren.length;
            for (var i = 0; i < l; i++) {
              item = sChildren[i];
              classAttr = item.className;
              for (var a = 0; a < _uiElements.length; a++) {
                uiElement = _uiElements[a];
                if (classAttr.indexOf("pswp__" + uiElement.name) > -1) {
                  if (_options[uiElement.option]) {
                    framework.removeClass(item, "pswp__element--disabled");
                    if (uiElement.onInit) {
                      uiElement.onInit(item);
                    }
                  } else {
                    framework.addClass(item, "pswp__element--disabled");
                  }
                }
              }
            }
          };
          loopThroughChildElements(_controls.children);
          var topBar = framework.getChildByClass(_controls, "pswp__top-bar");
          if (topBar) {
            loopThroughChildElements(topBar.children);
          }
        };
        ui.init = function() {
          framework.extend(pswp.options, _defaultUIOptions, true);
          _options = pswp.options;
          _controls = framework.getChildByClass(pswp.scrollWrap, "pswp__ui");
          _listen = pswp.listen;
          _setupHidingControlsDuringGestures();
          _listen("beforeChange", ui.update);
          _listen("doubleTap", function(point) {
            var initialZoomLevel = pswp.currItem.initialZoomLevel;
            if (pswp.getZoomLevel() !== initialZoomLevel) {
              pswp.zoomTo(initialZoomLevel, point, 333);
            } else {
              pswp.zoomTo(_options.getDoubleTapZoom(false, pswp.currItem), point, 333);
            }
          });
          _listen("preventDragEvent", function(e, isDown, preventObj) {
            var t = e.target || e.srcElement;
            if (t && t.getAttribute("class") && e.type.indexOf("mouse") > -1 && (t.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(t.tagName))) {
              preventObj.prevent = false;
            }
          });
          _listen("bindEvents", function() {
            framework.bind(_controls, "pswpTap click", _onControlsTap);
            framework.bind(pswp.scrollWrap, "pswpTap", ui.onGlobalTap);
            if (!pswp.likelyTouchDevice) {
              framework.bind(pswp.scrollWrap, "mouseover", ui.onMouseOver);
            }
          });
          _listen("unbindEvents", function() {
            if (!_shareModalHidden) {
              _toggleShareModal();
            }
            if (_idleInterval) {
              clearInterval(_idleInterval);
            }
            framework.unbind(document, "mouseout", _onMouseLeaveWindow);
            framework.unbind(document, "mousemove", _onIdleMouseMove);
            framework.unbind(_controls, "pswpTap click", _onControlsTap);
            framework.unbind(pswp.scrollWrap, "pswpTap", ui.onGlobalTap);
            framework.unbind(pswp.scrollWrap, "mouseover", ui.onMouseOver);
            if (_fullscrenAPI) {
              framework.unbind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
              if (_fullscrenAPI.isFullscreen()) {
                _options.hideAnimationDuration = 0;
                _fullscrenAPI.exit();
              }
              _fullscrenAPI = null;
            }
          });
          _listen("destroy", function() {
            if (_options.captionEl) {
              if (_fakeCaptionContainer) {
                _controls.removeChild(_fakeCaptionContainer);
              }
              framework.removeClass(_captionContainer, "pswp__caption--empty");
            }
            if (_shareModal) {
              _shareModal.children[0].onclick = null;
            }
            framework.removeClass(_controls, "pswp__ui--over-close");
            framework.addClass(_controls, "pswp__ui--hidden");
            ui.setIdle(false);
          });
          if (!_options.showAnimationDuration) {
            framework.removeClass(_controls, "pswp__ui--hidden");
          }
          _listen("initialZoomIn", function() {
            if (_options.showAnimationDuration) {
              framework.removeClass(_controls, "pswp__ui--hidden");
            }
          });
          _listen("initialZoomOut", function() {
            framework.addClass(_controls, "pswp__ui--hidden");
          });
          _listen("parseVerticalMargin", _applyNavBarGaps);
          _setupUIElements();
          if (_options.shareEl && _shareButton && _shareModal) {
            _shareModalHidden = true;
          }
          _countNumItems();
          _setupIdle();
          _setupFullscreenAPI();
          _setupLoadingIndicator();
        };
        ui.setIdle = function(isIdle) {
          _isIdle = isIdle;
          _togglePswpClass(_controls, "ui--idle", isIdle);
        };
        ui.update = function() {
          if (_controlsVisible && pswp.currItem) {
            ui.updateIndexIndicator();
            if (_options.captionEl) {
              _options.addCaptionHTMLFn(pswp.currItem, _captionContainer);
              _togglePswpClass(_captionContainer, "caption--empty", !pswp.currItem.title);
            }
            _overlayUIUpdated = true;
          } else {
            _overlayUIUpdated = false;
          }
          if (!_shareModalHidden) {
            _toggleShareModal();
          }
          _countNumItems();
        };
        ui.updateFullscreen = function(e) {
          if (e) {
            setTimeout(function() {
              pswp.setScrollOffset(0, framework.getScrollY());
            }, 50);
          }
          framework[(_fullscrenAPI.isFullscreen() ? "add" : "remove") + "Class"](pswp.template, "pswp--fs");
        };
        ui.updateIndexIndicator = function() {
          if (_options.counterEl) {
            _indexIndicator.innerHTML = pswp.getCurrentIndex() + 1 + _options.indexIndicatorSep + _options.getNumItemsFn();
          }
        };
        ui.onGlobalTap = function(e) {
          e = e || window.event;
          var target = e.target || e.srcElement;
          if (_blockControlsTap) {
            return;
          }
          if (e.detail && e.detail.pointerType === "mouse") {
            if (_hasCloseClass(target)) {
              pswp.close();
              return;
            }
            if (framework.hasClass(target, "pswp__img")) {
              if (pswp.getZoomLevel() === 1 && pswp.getZoomLevel() <= pswp.currItem.fitRatio) {
                if (_options.clickToCloseNonZoomable) {
                  pswp.close();
                }
              } else {
                pswp.toggleDesktopZoom(e.detail.releasePoint);
              }
            }
          } else {
            if (_options.tapToToggleControls) {
              if (_controlsVisible) {
                ui.hideControls();
              } else {
                ui.showControls();
              }
            }
            if (_options.tapToClose && (framework.hasClass(target, "pswp__img") || _hasCloseClass(target))) {
              pswp.close();
              return;
            }
          }
        };
        ui.onMouseOver = function(e) {
          e = e || window.event;
          var target = e.target || e.srcElement;
          _togglePswpClass(_controls, "ui--over-close", _hasCloseClass(target));
        };
        ui.hideControls = function() {
          framework.addClass(_controls, "pswp__ui--hidden");
          _controlsVisible = false;
        };
        ui.showControls = function() {
          _controlsVisible = true;
          if (!_overlayUIUpdated) {
            ui.update();
          }
          framework.removeClass(_controls, "pswp__ui--hidden");
        };
        ui.supportsFullscreen = function() {
          var d = document;
          return !!(d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen);
        };
        ui.getFullscreenAPI = function() {
          var dE = document.documentElement, api, tF = "fullscreenchange";
          if (dE.requestFullscreen) {
            api = {
              enterK: "requestFullscreen",
              exitK: "exitFullscreen",
              elementK: "fullscreenElement",
              eventK: tF
            };
          } else if (dE.mozRequestFullScreen) {
            api = {
              enterK: "mozRequestFullScreen",
              exitK: "mozCancelFullScreen",
              elementK: "mozFullScreenElement",
              eventK: "moz" + tF
            };
          } else if (dE.webkitRequestFullscreen) {
            api = {
              enterK: "webkitRequestFullscreen",
              exitK: "webkitExitFullscreen",
              elementK: "webkitFullscreenElement",
              eventK: "webkit" + tF
            };
          } else if (dE.msRequestFullscreen) {
            api = {
              enterK: "msRequestFullscreen",
              exitK: "msExitFullscreen",
              elementK: "msFullscreenElement",
              eventK: "MSFullscreenChange"
            };
          }
          if (api) {
            api.enter = function() {
              _initalCloseOnScrollValue = _options.closeOnScroll;
              _options.closeOnScroll = false;
              if (this.enterK === "webkitRequestFullscreen") {
                pswp.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT);
              } else {
                return pswp.template[this.enterK]();
              }
            };
            api.exit = function() {
              _options.closeOnScroll = _initalCloseOnScrollValue;
              return document[this.exitK]();
            };
            api.isFullscreen = function() {
              return document[this.elementK];
            };
          }
          return api;
        };
      };
      return PhotoSwipeUI_Default2;
    });
  }
});

// node_modules/@twogate/ngx-photo-gallery/fesm2022/twogate-ngx-photo-gallery.mjs
var import_photoswipe = __toESM(require_photoswipe(), 1);
var import_photoswipe_ui_default = __toESM(require_photoswipe_ui_default(), 1);
var _c0 = ["Lightbox"];
var LightboxComponent = class _LightboxComponent {
  constructor() {
  }
  static {
    this.ɵfac = function LightboxComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LightboxComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _LightboxComponent,
      selectors: [["photo-gallery-lightbox"]],
      viewQuery: function LightboxComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c0, 7);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.element = _t.first);
        }
      },
      decls: 26,
      vars: 0,
      consts: [["Lightbox", ""], [1, "lightbox-wrapper"], ["tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "pswp"], [1, "pswp__bg"], [1, "pswp__scroll-wrap"], [1, "pswp__container"], [1, "pswp__item"], [1, "pswp__ui", "pswp__ui--hidden"], [1, "pswp__top-bar"], [1, "pswp__counter"], ["title", "Close (Esc)", 1, "pswp__button", "pswp__button--close"], ["title", "Share", 1, "pswp__button", "pswp__button--share"], ["title", "Toggle fullscreen", 1, "pswp__button", "pswp__button--fs"], ["title", "Zoom in/out", 1, "pswp__button", "pswp__button--zoom"], [1, "pswp__preloader"], [1, "pswp__preloader__icn"], [1, "pswp__preloader__cut"], [1, "pswp__preloader__donut"], [1, "pswp__share-modal", "pswp__share-modal--hidden", "pswp__single-tap"], [1, "pswp__share-tooltip"], ["title", "Previous (arrow left)", 1, "pswp__button", "pswp__button--arrow--left"], ["title", "Next (arrow right)", 1, "pswp__button", "pswp__button--arrow--right"], [1, "pswp__caption"], [1, "pswp__caption__center"]],
      template: function LightboxComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 1)(1, "div", 2, 0);
          ɵɵelement(3, "div", 3);
          ɵɵelementStart(4, "div", 4)(5, "div", 5);
          ɵɵelement(6, "div", 6)(7, "div", 6)(8, "div", 6);
          ɵɵelementEnd();
          ɵɵelementStart(9, "div", 7)(10, "div", 8);
          ɵɵelement(11, "div", 9)(12, "button", 10)(13, "button", 11)(14, "button", 12)(15, "button", 13);
          ɵɵelementStart(16, "div", 14)(17, "div", 15)(18, "div", 16);
          ɵɵelement(19, "div", 17);
          ɵɵelementEnd()()()();
          ɵɵelementStart(20, "div", 18);
          ɵɵelement(21, "div", 19);
          ɵɵelementEnd();
          ɵɵelement(22, "button", 20)(23, "button", 21);
          ɵɵelementStart(24, "div", 22);
          ɵɵelement(25, "div", 23);
          ɵɵelementEnd()()()()();
        }
      },
      styles: ['@charset "UTF-8";.lightbox-wrapper[_ngcontent-%COMP%] {position:relative;z-index:20000}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp{display:none;position:absolute;width:100%;height:100%;left:0;top:0;overflow:hidden;-ms-touch-action:none;touch-action:none;z-index:20000;-webkit-text-size-adjust:100%;-webkit-backface-visibility:hidden;outline:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp *{box-sizing:border-box}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp img{max-width:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--animate_opacity{opacity:.001;will-change:opacity;transition:opacity .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--open{display:block}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--zoom-allowed .pswp__img{cursor:-webkit-zoom-in;cursor:-moz-zoom-in;cursor:zoom-in}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--zoomed-in .pswp__img{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--dragging .pswp__img{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__bg{position:absolute;left:0;top:0;width:100%;height:100%;background:#000c;opacity:0;transform:translateZ(0);-webkit-backface-visibility:hidden;will-change:opacity}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__scroll-wrap{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__container, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__zoom-wrap{-ms-touch-action:none;touch-action:none;position:absolute;inset:0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__container, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__img{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-touch-callout:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__zoom-wrap{position:absolute;width:100%;-webkit-transform-origin:left top;-moz-transform-origin:left top;-ms-transform-origin:left top;transform-origin:left top;transition:transform .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__bg{will-change:opacity;transition:opacity .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--animated-in .pswp__bg, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--animated-in .pswp__zoom-wrap{-webkit-transition:none;transition:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__container, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__zoom-wrap{-webkit-backface-visibility:hidden}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__item{position:absolute;inset:0;overflow:hidden}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__img{position:absolute;width:auto;height:auto;top:0;left:0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__img--placeholder{-webkit-backface-visibility:hidden}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__img--placeholder--blank{background:#333}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--ie .pswp__img{width:100%!important;height:auto!important;left:0;top:0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__error-msg{position:absolute;left:0;top:50%;width:100%;text-align:center;font-size:14px;line-height:16px;margin-top:-8px;color:#ccc}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__error-msg a{color:#ccc;text-decoration:underline}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button{width:44px;height:44px;position:relative;background:none;cursor:pointer;overflow:visible;-webkit-appearance:none;display:block;border:0;padding:0;margin:0;float:right;opacity:.75;transition:opacity .2s;box-shadow:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button:focus, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button:hover{opacity:1}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button:active{outline:none;opacity:.9}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button::-moz-focus-inner{padding:0;border:0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--over-close .pswp__button--close{opacity:1}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--left:before, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--right:before{background:url(/default-skin.png) 0 0 no-repeat;background-size:264px 88px;width:44px;height:44px}@media (-webkit-min-device-pixel-ratio: 1.1),(min-resolution: 105dpi),(min-resolution: 1.1dppx){.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--svg .pswp__button, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--svg .pswp__button--arrow--left:before, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--svg .pswp__button--arrow--right:before{background-image:url(/default-skin.svg)}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--svg .pswp__button--arrow--left, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--svg .pswp__button--arrow--right{background:none}}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--close{background-position:0 -44px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--share{background-position:-44px -44px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--fs{display:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--supports-fs .pswp__button--fs{display:block}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--fs .pswp__button--fs{background-position:-44px 0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--zoom{display:none;background-position:-88px 0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--zoom-allowed .pswp__button--zoom{display:block}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--zoomed-in .pswp__button--zoom{background-position:-132px 0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--touch .pswp__button--arrow--left, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--touch .pswp__button--arrow--right{visibility:hidden}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--left, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--right{background:none;top:50%;margin-top:-50px;width:70px;height:100px;position:absolute}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--left{left:0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--right{right:0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--left:before, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--right:before{content:"";top:35px;background-color:#0000004d;height:30px;width:32px;position:absolute}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--left:before{left:6px;background-position:-138px -44px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--right:before{right:6px;background-position:-94px -44px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__counter, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-modal{-webkit-user-select:none;-moz-user-select:none;user-select:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-modal{display:block;background:#00000080;width:100%;height:100%;top:0;left:0;padding:10px;position:absolute;z-index:20100;opacity:0;transition:opacity .25s ease-out;-webkit-backface-visibility:hidden;will-change:opacity}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-modal--hidden{display:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-tooltip{z-index:20120;position:absolute;background:#fff;top:56px;border-radius:2px;display:block;width:auto;right:44px;box-shadow:0 2px 5px #00000040;transform:translateY(6px);transition:transform .25s;-webkit-backface-visibility:hidden;will-change:transform}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-tooltip a{display:block;padding:8px 12px;color:#000;text-decoration:none;font-size:14px;line-height:18px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-tooltip a:hover{text-decoration:none;color:#000}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-tooltip a:first-child{border-radius:2px 2px 0 0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-tooltip a:last-child{border-radius:0 0 2px 2px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-modal--fade-in{opacity:1}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__share-modal--fade-in .pswp__share-tooltip{transform:translateY(0)}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--touch .pswp__share-tooltip a{padding:16px 12px}.lightbox-wrapper[_ngcontent-%COMP%]  a.pswp__share--facebook:before{content:"";display:block;width:0;height:0;position:absolute;top:-12px;right:15px;border:6px solid rgba(0,0,0,0);border-bottom-color:#fff;-webkit-pointer-events:none;-moz-pointer-events:none;pointer-events:none}.lightbox-wrapper[_ngcontent-%COMP%]  a.pswp__share--facebook:hover{background:#3e5c9a;color:#fff}.lightbox-wrapper[_ngcontent-%COMP%]  a.pswp__share--facebook:hover:before{border-bottom-color:#3e5c9a}.lightbox-wrapper[_ngcontent-%COMP%]  a.pswp__share--twitter:hover{background:#55acee;color:#fff}.lightbox-wrapper[_ngcontent-%COMP%]  a.pswp__share--pinterest:hover{background:#ccc;color:#ce272d}.lightbox-wrapper[_ngcontent-%COMP%]  a.pswp__share--download:hover{background:#ddd}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__counter{position:absolute;left:0;top:0;height:44px;font-size:13px;line-height:44px;color:#fff;opacity:.75;padding:0 10px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption{position:absolute;left:0;bottom:0;width:100%;min-height:44px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption small{font-size:11px;color:#bbb}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption__center{text-align:left;max-width:420px;margin:0 auto;font-size:13px;padding:10px;line-height:20px;color:#ccc}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption--empty{display:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption--fake{visibility:hidden}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__preloader{width:44px;height:44px;position:absolute;top:0;left:50%;margin-left:-22px;opacity:0;transition:opacity .25s ease-out;will-change:opacity;direction:ltr}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__preloader__icn{width:20px;height:20px;margin:12px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__preloader--active{opacity:1}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__preloader--active .pswp__preloader__icn{background:url(/preloader.gif) 0 0 no-repeat}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--css_animation .pswp__preloader--active{opacity:1}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--css_animation .pswp__preloader--active .pswp__preloader__icn{animation:_ngcontent-%COMP%_clockwise .5s linear infinite}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--css_animation .pswp__preloader--active .pswp__preloader__donut{animation:_ngcontent-%COMP%_donut-rotate 1s cubic-bezier(.4,0,.22,1) infinite}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--css_animation .pswp__preloader__icn{background:none;opacity:.75;width:14px;height:14px;position:absolute;left:15px;top:15px;margin:0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--css_animation .pswp__preloader__cut{position:relative;width:7px;height:14px;overflow:hidden}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--css_animation .pswp__preloader__donut{box-sizing:border-box;width:14px;height:14px;border:2px solid #FFF;border-radius:50%;border-left-color:transparent;border-bottom-color:transparent;position:absolute;top:0;left:0;background:none;margin:0}@media screen and (max-width: 1024px){.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__preloader{position:relative;left:auto;top:auto;margin:0;float:right}}@keyframes _ngcontent-%COMP%_clockwise{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes _ngcontent-%COMP%_donut-rotate{0%{transform:rotate(0)}50%{transform:rotate(-140deg)}to{transform:rotate(0)}}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui{-webkit-font-smoothing:auto;visibility:visible;opacity:1;z-index:20050}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__top-bar{position:absolute;left:0;top:0;height:44px;width:100%}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__top-bar, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--has_mouse .pswp__button--arrow--left, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--has_mouse .pswp__button--arrow--right{-webkit-backface-visibility:hidden;will-change:opacity;transition:opacity .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--has_mouse .pswp__button--arrow--left, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--has_mouse .pswp__button--arrow--right{visibility:visible}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__top-bar, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption{background-color:#00000080}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--fit .pswp__top-bar, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--fit .pswp__caption{background-color:#0000004d}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--idle .pswp__top-bar{opacity:0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--idle .pswp__button--arrow--left, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--idle .pswp__button--arrow--right{opacity:0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--hidden .pswp__top-bar, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--hidden .pswp__caption, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--hidden .pswp__button--arrow--left, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--hidden .pswp__button--arrow--right{opacity:.001}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--one-slide .pswp__button--arrow--left, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--one-slide .pswp__button--arrow--right, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--one-slide .pswp__counter{display:none}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__element--disabled{display:none!important}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--minimal--dark .pswp__top-bar{background:none}@media (-webkit-min-device-pixel-ratio: 1.1),(min-resolution: 105dpi),(min-resolution: 1.1dppx){.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--svg .pswp__button, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--svg .pswp__button--arrow--left:before, .lightbox-wrapper[_ngcontent-%COMP%]  .pswp--svg .pswp__button--arrow--right:before{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9Ijg4IiB2aWV3Qm94PSIwIDAgMjY0IDg4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5kZWZhdWx0LXNraW4gMjwvdGl0bGU+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Zz48cGF0aCBkPSJNNjcuMDAyIDU5LjV2My43NjhjLTYuMzA3Ljg0LTkuMTg0IDUuNzUtMTAuMDAyIDkuNzMyIDIuMjItMi44MyA1LjU2NC01LjA5OCAxMC4wMDItNS4wOThWNzEuNUw3MyA2NS41ODUgNjcuMDAyIDU5LjV6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTMgMjl2LTVoMnYzaDN2MmgtNXpNMTMgMTVoNXYyaC0zdjNoLTJ2LTV6TTMxIDE1djVoLTJ2LTNoLTN2LTJoNXpNMzEgMjloLTV2LTJoM3YtM2gydjV6IiBpZD0iU2hhcGUiLz48L2c+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTYyIDI0djVoLTJ2LTNoLTN2LTJoNXpNNjIgMjBoLTV2LTJoM3YtM2gydjV6TTcwIDIwdi01aDJ2M2gzdjJoLTV6TTcwIDI0aDV2MmgtM3YzaC0ydi01eiIvPjwvZz48cGF0aCBkPSJNMjAuNTg2IDY2bC01LjY1Ni01LjY1NiAxLjQxNC0xLjQxNEwyMiA2NC41ODZsNS42NTYtNS42NTYgMS40MTQgMS40MTRMMjMuNDE0IDY2bDUuNjU2IDUuNjU2LTEuNDE0IDEuNDE0TDIyIDY3LjQxNGwtNS42NTYgNS42NTYtMS40MTQtMS40MTRMMjAuNTg2IDY2eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMTEuNzg1IDY1LjAzTDExMCA2My41bDMtMy41aC0xMHYtMmgxMGwtMy0zLjUgMS43ODUtMS40NjhMMTE3IDU5bC01LjIxNSA2LjAzeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNTIuMjE1IDY1LjAzTDE1NCA2My41bC0zLTMuNWgxMHYtMmgtMTBsMy0zLjUtMS43ODUtMS40NjhMMTQ3IDU5bDUuMjE1IDYuMDN6IiBmaWxsPSIjZmZmIi8+PGc+PHBhdGggaWQ9IlJlY3RhbmdsZS0xMSIgZmlsbD0iI2ZmZiIgZD0iTTE2MC45NTcgMjguNTQzbC0zLjI1LTMuMjUtMS40MTMgMS40MTQgMy4yNSAzLjI1eiIvPjxwYXRoIGQ9Ik0xNTIuNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIGlkPSJPdmFsLTEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUwIDIxaDV2MWgtNXoiLz48L2c+PGc+PHBhdGggZD0iTTExNi45NTcgMjguNTQzbC0xLjQxNCAxLjQxNC0zLjI1LTMuMjUgMS40MTQtMS40MTQgMy4yNSAzLjI1eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMDguNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA2IDIxaDV2MWgtNXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA5LjA0MyAxOS4wMDhsLS4wODUgNS0xLS4wMTcuMDg1LTV6Ii8+PC9nPjwvZz48L2c+PC9zdmc+)}}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__img--placeholder{align-items:center;display:flex;justify-content:center}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__img--placeholder:after{background:url(data:image/gif;base64,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) center/64px no-repeat;color:#fff;content:"";font-size:128px;height:128px;left:50%;pointer-events:none;position:absolute;top:50%;transform:translate3d(-50%,-50%,0);width:128px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__ui--hidden .pswp__top-bar{transform:translateY(-15px)}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__top-bar{background:none;height:30px;margin-top:env(safe-area-inset-top);padding:16px;transition:transform .3s ease-out,opacity .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__counter{background-color:#00000080;border-radius:15px;font-family:Hiragino Kaku Gothic ProN,\\30e1\\30a4\\30ea\\30aa,sans-serif;font-size:12px;font-weight:700;height:30px;left:16px;line-height:30px;padding:0 16px;top:16px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button{background-size:180px 60px;height:30px;margin-left:8px;opacity:1;width:30px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button:before{background-color:#00000080;border-radius:50%;content:"";inset:0;position:absolute;z-index:-1}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--close{background-position:0 -30px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--share{background-position:-30px -30px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--zoom{background-position:-60px 0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--zoomed-in .pswp__button--zoom{background-position:-90px 0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp--fs .pswp__button--fs{background-position:-30px 0}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--left:before{background-position:-94px -30px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__button--arrow--right:before{background-position:-64px -30px}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption{padding-bottom:env(safe-area-inset-top)}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption--empty{display:block;opacity:0;pointer-events:none;transition:opacity .2s ease-out}.lightbox-wrapper[_ngcontent-%COMP%]  .pswp__caption__center{min-height:40px}'],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LightboxComponent, [{
    type: Component,
    args: [{
      selector: "photo-gallery-lightbox",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<div class="lightbox-wrapper">
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" #Lightbox tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe.
           It's a separate element, as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
      <!-- don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</div>
`,
      styles: ['@charset "UTF-8";.lightbox-wrapper::ng-deep{position:relative;z-index:20000}.lightbox-wrapper::ng-deep .pswp{display:none;position:absolute;width:100%;height:100%;left:0;top:0;overflow:hidden;-ms-touch-action:none;touch-action:none;z-index:20000;-webkit-text-size-adjust:100%;-webkit-backface-visibility:hidden;outline:none}.lightbox-wrapper::ng-deep .pswp *{box-sizing:border-box}.lightbox-wrapper::ng-deep .pswp img{max-width:none}.lightbox-wrapper::ng-deep .pswp--animate_opacity{opacity:.001;will-change:opacity;transition:opacity .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper::ng-deep .pswp--open{display:block}.lightbox-wrapper::ng-deep .pswp--zoom-allowed .pswp__img{cursor:-webkit-zoom-in;cursor:-moz-zoom-in;cursor:zoom-in}.lightbox-wrapper::ng-deep .pswp--zoomed-in .pswp__img{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.lightbox-wrapper::ng-deep .pswp--dragging .pswp__img{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.lightbox-wrapper::ng-deep .pswp__bg{position:absolute;left:0;top:0;width:100%;height:100%;background:#000c;opacity:0;transform:translateZ(0);-webkit-backface-visibility:hidden;will-change:opacity}.lightbox-wrapper::ng-deep .pswp__scroll-wrap{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden}.lightbox-wrapper::ng-deep .pswp__container,.lightbox-wrapper::ng-deep .pswp__zoom-wrap{-ms-touch-action:none;touch-action:none;position:absolute;inset:0}.lightbox-wrapper::ng-deep .pswp__container,.lightbox-wrapper::ng-deep .pswp__img{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-touch-callout:none}.lightbox-wrapper::ng-deep .pswp__zoom-wrap{position:absolute;width:100%;-webkit-transform-origin:left top;-moz-transform-origin:left top;-ms-transform-origin:left top;transform-origin:left top;transition:transform .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper::ng-deep .pswp__bg{will-change:opacity;transition:opacity .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper::ng-deep .pswp--animated-in .pswp__bg,.lightbox-wrapper::ng-deep .pswp--animated-in .pswp__zoom-wrap{-webkit-transition:none;transition:none}.lightbox-wrapper::ng-deep .pswp__container,.lightbox-wrapper::ng-deep .pswp__zoom-wrap{-webkit-backface-visibility:hidden}.lightbox-wrapper::ng-deep .pswp__item{position:absolute;inset:0;overflow:hidden}.lightbox-wrapper::ng-deep .pswp__img{position:absolute;width:auto;height:auto;top:0;left:0}.lightbox-wrapper::ng-deep .pswp__img--placeholder{-webkit-backface-visibility:hidden}.lightbox-wrapper::ng-deep .pswp__img--placeholder--blank{background:#333}.lightbox-wrapper::ng-deep .pswp--ie .pswp__img{width:100%!important;height:auto!important;left:0;top:0}.lightbox-wrapper::ng-deep .pswp__error-msg{position:absolute;left:0;top:50%;width:100%;text-align:center;font-size:14px;line-height:16px;margin-top:-8px;color:#ccc}.lightbox-wrapper::ng-deep .pswp__error-msg a{color:#ccc;text-decoration:underline}.lightbox-wrapper::ng-deep .pswp__button{width:44px;height:44px;position:relative;background:none;cursor:pointer;overflow:visible;-webkit-appearance:none;display:block;border:0;padding:0;margin:0;float:right;opacity:.75;transition:opacity .2s;box-shadow:none}.lightbox-wrapper::ng-deep .pswp__button:focus,.lightbox-wrapper::ng-deep .pswp__button:hover{opacity:1}.lightbox-wrapper::ng-deep .pswp__button:active{outline:none;opacity:.9}.lightbox-wrapper::ng-deep .pswp__button::-moz-focus-inner{padding:0;border:0}.lightbox-wrapper::ng-deep .pswp__ui--over-close .pswp__button--close{opacity:1}.lightbox-wrapper::ng-deep .pswp__button,.lightbox-wrapper::ng-deep .pswp__button--arrow--left:before,.lightbox-wrapper::ng-deep .pswp__button--arrow--right:before{background:url(/default-skin.png) 0 0 no-repeat;background-size:264px 88px;width:44px;height:44px}@media (-webkit-min-device-pixel-ratio: 1.1),(min-resolution: 105dpi),(min-resolution: 1.1dppx){.lightbox-wrapper::ng-deep .pswp--svg .pswp__button,.lightbox-wrapper::ng-deep .pswp--svg .pswp__button--arrow--left:before,.lightbox-wrapper::ng-deep .pswp--svg .pswp__button--arrow--right:before{background-image:url(/default-skin.svg)}.lightbox-wrapper::ng-deep .pswp--svg .pswp__button--arrow--left,.lightbox-wrapper::ng-deep .pswp--svg .pswp__button--arrow--right{background:none}}.lightbox-wrapper::ng-deep .pswp__button--close{background-position:0 -44px}.lightbox-wrapper::ng-deep .pswp__button--share{background-position:-44px -44px}.lightbox-wrapper::ng-deep .pswp__button--fs{display:none}.lightbox-wrapper::ng-deep .pswp--supports-fs .pswp__button--fs{display:block}.lightbox-wrapper::ng-deep .pswp--fs .pswp__button--fs{background-position:-44px 0}.lightbox-wrapper::ng-deep .pswp__button--zoom{display:none;background-position:-88px 0}.lightbox-wrapper::ng-deep .pswp--zoom-allowed .pswp__button--zoom{display:block}.lightbox-wrapper::ng-deep .pswp--zoomed-in .pswp__button--zoom{background-position:-132px 0}.lightbox-wrapper::ng-deep .pswp--touch .pswp__button--arrow--left,.lightbox-wrapper::ng-deep .pswp--touch .pswp__button--arrow--right{visibility:hidden}.lightbox-wrapper::ng-deep .pswp__button--arrow--left,.lightbox-wrapper::ng-deep .pswp__button--arrow--right{background:none;top:50%;margin-top:-50px;width:70px;height:100px;position:absolute}.lightbox-wrapper::ng-deep .pswp__button--arrow--left{left:0}.lightbox-wrapper::ng-deep .pswp__button--arrow--right{right:0}.lightbox-wrapper::ng-deep .pswp__button--arrow--left:before,.lightbox-wrapper::ng-deep .pswp__button--arrow--right:before{content:"";top:35px;background-color:#0000004d;height:30px;width:32px;position:absolute}.lightbox-wrapper::ng-deep .pswp__button--arrow--left:before{left:6px;background-position:-138px -44px}.lightbox-wrapper::ng-deep .pswp__button--arrow--right:before{right:6px;background-position:-94px -44px}.lightbox-wrapper::ng-deep .pswp__counter,.lightbox-wrapper::ng-deep .pswp__share-modal{-webkit-user-select:none;-moz-user-select:none;user-select:none}.lightbox-wrapper::ng-deep .pswp__share-modal{display:block;background:#00000080;width:100%;height:100%;top:0;left:0;padding:10px;position:absolute;z-index:20100;opacity:0;transition:opacity .25s ease-out;-webkit-backface-visibility:hidden;will-change:opacity}.lightbox-wrapper::ng-deep .pswp__share-modal--hidden{display:none}.lightbox-wrapper::ng-deep .pswp__share-tooltip{z-index:20120;position:absolute;background:#fff;top:56px;border-radius:2px;display:block;width:auto;right:44px;box-shadow:0 2px 5px #00000040;transform:translateY(6px);transition:transform .25s;-webkit-backface-visibility:hidden;will-change:transform}.lightbox-wrapper::ng-deep .pswp__share-tooltip a{display:block;padding:8px 12px;color:#000;text-decoration:none;font-size:14px;line-height:18px}.lightbox-wrapper::ng-deep .pswp__share-tooltip a:hover{text-decoration:none;color:#000}.lightbox-wrapper::ng-deep .pswp__share-tooltip a:first-child{border-radius:2px 2px 0 0}.lightbox-wrapper::ng-deep .pswp__share-tooltip a:last-child{border-radius:0 0 2px 2px}.lightbox-wrapper::ng-deep .pswp__share-modal--fade-in{opacity:1}.lightbox-wrapper::ng-deep .pswp__share-modal--fade-in .pswp__share-tooltip{transform:translateY(0)}.lightbox-wrapper::ng-deep .pswp--touch .pswp__share-tooltip a{padding:16px 12px}.lightbox-wrapper::ng-deep a.pswp__share--facebook:before{content:"";display:block;width:0;height:0;position:absolute;top:-12px;right:15px;border:6px solid rgba(0,0,0,0);border-bottom-color:#fff;-webkit-pointer-events:none;-moz-pointer-events:none;pointer-events:none}.lightbox-wrapper::ng-deep a.pswp__share--facebook:hover{background:#3e5c9a;color:#fff}.lightbox-wrapper::ng-deep a.pswp__share--facebook:hover:before{border-bottom-color:#3e5c9a}.lightbox-wrapper::ng-deep a.pswp__share--twitter:hover{background:#55acee;color:#fff}.lightbox-wrapper::ng-deep a.pswp__share--pinterest:hover{background:#ccc;color:#ce272d}.lightbox-wrapper::ng-deep a.pswp__share--download:hover{background:#ddd}.lightbox-wrapper::ng-deep .pswp__counter{position:absolute;left:0;top:0;height:44px;font-size:13px;line-height:44px;color:#fff;opacity:.75;padding:0 10px}.lightbox-wrapper::ng-deep .pswp__caption{position:absolute;left:0;bottom:0;width:100%;min-height:44px}.lightbox-wrapper::ng-deep .pswp__caption small{font-size:11px;color:#bbb}.lightbox-wrapper::ng-deep .pswp__caption__center{text-align:left;max-width:420px;margin:0 auto;font-size:13px;padding:10px;line-height:20px;color:#ccc}.lightbox-wrapper::ng-deep .pswp__caption--empty{display:none}.lightbox-wrapper::ng-deep .pswp__caption--fake{visibility:hidden}.lightbox-wrapper::ng-deep .pswp__preloader{width:44px;height:44px;position:absolute;top:0;left:50%;margin-left:-22px;opacity:0;transition:opacity .25s ease-out;will-change:opacity;direction:ltr}.lightbox-wrapper::ng-deep .pswp__preloader__icn{width:20px;height:20px;margin:12px}.lightbox-wrapper::ng-deep .pswp__preloader--active{opacity:1}.lightbox-wrapper::ng-deep .pswp__preloader--active .pswp__preloader__icn{background:url(/preloader.gif) 0 0 no-repeat}.lightbox-wrapper::ng-deep .pswp--css_animation .pswp__preloader--active{opacity:1}.lightbox-wrapper::ng-deep .pswp--css_animation .pswp__preloader--active .pswp__preloader__icn{animation:clockwise .5s linear infinite}.lightbox-wrapper::ng-deep .pswp--css_animation .pswp__preloader--active .pswp__preloader__donut{animation:donut-rotate 1s cubic-bezier(.4,0,.22,1) infinite}.lightbox-wrapper::ng-deep .pswp--css_animation .pswp__preloader__icn{background:none;opacity:.75;width:14px;height:14px;position:absolute;left:15px;top:15px;margin:0}.lightbox-wrapper::ng-deep .pswp--css_animation .pswp__preloader__cut{position:relative;width:7px;height:14px;overflow:hidden}.lightbox-wrapper::ng-deep .pswp--css_animation .pswp__preloader__donut{box-sizing:border-box;width:14px;height:14px;border:2px solid #FFF;border-radius:50%;border-left-color:transparent;border-bottom-color:transparent;position:absolute;top:0;left:0;background:none;margin:0}@media screen and (max-width: 1024px){.lightbox-wrapper::ng-deep .pswp__preloader{position:relative;left:auto;top:auto;margin:0;float:right}}@keyframes clockwise{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes donut-rotate{0%{transform:rotate(0)}50%{transform:rotate(-140deg)}to{transform:rotate(0)}}.lightbox-wrapper::ng-deep .pswp__ui{-webkit-font-smoothing:auto;visibility:visible;opacity:1;z-index:20050}.lightbox-wrapper::ng-deep .pswp__top-bar{position:absolute;left:0;top:0;height:44px;width:100%}.lightbox-wrapper::ng-deep .pswp__caption,.lightbox-wrapper::ng-deep .pswp__top-bar,.lightbox-wrapper::ng-deep .pswp--has_mouse .pswp__button--arrow--left,.lightbox-wrapper::ng-deep .pswp--has_mouse .pswp__button--arrow--right{-webkit-backface-visibility:hidden;will-change:opacity;transition:opacity .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper::ng-deep .pswp--has_mouse .pswp__button--arrow--left,.lightbox-wrapper::ng-deep .pswp--has_mouse .pswp__button--arrow--right{visibility:visible}.lightbox-wrapper::ng-deep .pswp__top-bar,.lightbox-wrapper::ng-deep .pswp__caption{background-color:#00000080}.lightbox-wrapper::ng-deep .pswp__ui--fit .pswp__top-bar,.lightbox-wrapper::ng-deep .pswp__ui--fit .pswp__caption{background-color:#0000004d}.lightbox-wrapper::ng-deep .pswp__ui--idle .pswp__top-bar{opacity:0}.lightbox-wrapper::ng-deep .pswp__ui--idle .pswp__button--arrow--left,.lightbox-wrapper::ng-deep .pswp__ui--idle .pswp__button--arrow--right{opacity:0}.lightbox-wrapper::ng-deep .pswp__ui--hidden .pswp__top-bar,.lightbox-wrapper::ng-deep .pswp__ui--hidden .pswp__caption,.lightbox-wrapper::ng-deep .pswp__ui--hidden .pswp__button--arrow--left,.lightbox-wrapper::ng-deep .pswp__ui--hidden .pswp__button--arrow--right{opacity:.001}.lightbox-wrapper::ng-deep .pswp__ui--one-slide .pswp__button--arrow--left,.lightbox-wrapper::ng-deep .pswp__ui--one-slide .pswp__button--arrow--right,.lightbox-wrapper::ng-deep .pswp__ui--one-slide .pswp__counter{display:none}.lightbox-wrapper::ng-deep .pswp__element--disabled{display:none!important}.lightbox-wrapper::ng-deep .pswp--minimal--dark .pswp__top-bar{background:none}@media (-webkit-min-device-pixel-ratio: 1.1),(min-resolution: 105dpi),(min-resolution: 1.1dppx){.lightbox-wrapper::ng-deep .pswp--svg .pswp__button,.lightbox-wrapper::ng-deep .pswp--svg .pswp__button--arrow--left:before,.lightbox-wrapper::ng-deep .pswp--svg .pswp__button--arrow--right:before{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9Ijg4IiB2aWV3Qm94PSIwIDAgMjY0IDg4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5kZWZhdWx0LXNraW4gMjwvdGl0bGU+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Zz48cGF0aCBkPSJNNjcuMDAyIDU5LjV2My43NjhjLTYuMzA3Ljg0LTkuMTg0IDUuNzUtMTAuMDAyIDkuNzMyIDIuMjItMi44MyA1LjU2NC01LjA5OCAxMC4wMDItNS4wOThWNzEuNUw3MyA2NS41ODUgNjcuMDAyIDU5LjV6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTMgMjl2LTVoMnYzaDN2MmgtNXpNMTMgMTVoNXYyaC0zdjNoLTJ2LTV6TTMxIDE1djVoLTJ2LTNoLTN2LTJoNXpNMzEgMjloLTV2LTJoM3YtM2gydjV6IiBpZD0iU2hhcGUiLz48L2c+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTYyIDI0djVoLTJ2LTNoLTN2LTJoNXpNNjIgMjBoLTV2LTJoM3YtM2gydjV6TTcwIDIwdi01aDJ2M2gzdjJoLTV6TTcwIDI0aDV2MmgtM3YzaC0ydi01eiIvPjwvZz48cGF0aCBkPSJNMjAuNTg2IDY2bC01LjY1Ni01LjY1NiAxLjQxNC0xLjQxNEwyMiA2NC41ODZsNS42NTYtNS42NTYgMS40MTQgMS40MTRMMjMuNDE0IDY2bDUuNjU2IDUuNjU2LTEuNDE0IDEuNDE0TDIyIDY3LjQxNGwtNS42NTYgNS42NTYtMS40MTQtMS40MTRMMjAuNTg2IDY2eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMTEuNzg1IDY1LjAzTDExMCA2My41bDMtMy41aC0xMHYtMmgxMGwtMy0zLjUgMS43ODUtMS40NjhMMTE3IDU5bC01LjIxNSA2LjAzeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNTIuMjE1IDY1LjAzTDE1NCA2My41bC0zLTMuNWgxMHYtMmgtMTBsMy0zLjUtMS43ODUtMS40NjhMMTQ3IDU5bDUuMjE1IDYuMDN6IiBmaWxsPSIjZmZmIi8+PGc+PHBhdGggaWQ9IlJlY3RhbmdsZS0xMSIgZmlsbD0iI2ZmZiIgZD0iTTE2MC45NTcgMjguNTQzbC0zLjI1LTMuMjUtMS40MTMgMS40MTQgMy4yNSAzLjI1eiIvPjxwYXRoIGQ9Ik0xNTIuNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIGlkPSJPdmFsLTEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUwIDIxaDV2MWgtNXoiLz48L2c+PGc+PHBhdGggZD0iTTExNi45NTcgMjguNTQzbC0xLjQxNCAxLjQxNC0zLjI1LTMuMjUgMS40MTQtMS40MTQgMy4yNSAzLjI1eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMDguNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA2IDIxaDV2MWgtNXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA5LjA0MyAxOS4wMDhsLS4wODUgNS0xLS4wMTcuMDg1LTV6Ii8+PC9nPjwvZz48L2c+PC9zdmc+)}}.lightbox-wrapper::ng-deep .pswp__img--placeholder{align-items:center;display:flex;justify-content:center}.lightbox-wrapper::ng-deep .pswp__img--placeholder:after{background:url(data:image/gif;base64,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) center/64px no-repeat;color:#fff;content:"";font-size:128px;height:128px;left:50%;pointer-events:none;position:absolute;top:50%;transform:translate3d(-50%,-50%,0);width:128px}.lightbox-wrapper::ng-deep .pswp__ui--hidden .pswp__top-bar{transform:translateY(-15px)}.lightbox-wrapper::ng-deep .pswp__top-bar{background:none;height:30px;margin-top:env(safe-area-inset-top);padding:16px;transition:transform .3s ease-out,opacity .3s cubic-bezier(.4,0,.22,1)}.lightbox-wrapper::ng-deep .pswp__counter{background-color:#00000080;border-radius:15px;font-family:Hiragino Kaku Gothic ProN,\\30e1\\30a4\\30ea\\30aa,sans-serif;font-size:12px;font-weight:700;height:30px;left:16px;line-height:30px;padding:0 16px;top:16px}.lightbox-wrapper::ng-deep .pswp__button{background-size:180px 60px;height:30px;margin-left:8px;opacity:1;width:30px}.lightbox-wrapper::ng-deep .pswp__button:before{background-color:#00000080;border-radius:50%;content:"";inset:0;position:absolute;z-index:-1}.lightbox-wrapper::ng-deep .pswp__button--close{background-position:0 -30px}.lightbox-wrapper::ng-deep .pswp__button--share{background-position:-30px -30px}.lightbox-wrapper::ng-deep .pswp__button--zoom{background-position:-60px 0}.lightbox-wrapper::ng-deep .pswp--zoomed-in .pswp__button--zoom{background-position:-90px 0}.lightbox-wrapper::ng-deep .pswp--fs .pswp__button--fs{background-position:-30px 0}.lightbox-wrapper::ng-deep .pswp__button--arrow--left:before{background-position:-94px -30px}.lightbox-wrapper::ng-deep .pswp__button--arrow--right:before{background-position:-64px -30px}.lightbox-wrapper::ng-deep .pswp__caption{padding-bottom:env(safe-area-inset-top)}.lightbox-wrapper::ng-deep .pswp__caption--empty{display:block;opacity:0;pointer-events:none;transition:opacity .2s ease-out}.lightbox-wrapper::ng-deep .pswp__caption__center{min-height:40px}\n']
    }]
  }], () => [], {
    element: [{
      type: ViewChild,
      args: ["Lightbox", {
        static: true
      }]
    }]
  });
})();
var PhotoGalleryConfig = class {
};
var LightboxService = class _LightboxService {
  constructor(applicationRef) {
    this.applicationRef = applicationRef;
    this.lightbox = null;
    this.lightboxElement = null;
  }
  create() {
    this.lightbox = createComponent(LightboxComponent, {
      environmentInjector: this.applicationRef.injector
    });
    document.body.appendChild(this.lightbox.location.nativeElement);
    this.applicationRef.attachView(this.lightbox.hostView);
    this.lightboxElement = this.lightbox.instance.element;
  }
  destroy() {
    if (this.lightbox) {
      this.applicationRef.detachView(this.lightbox.hostView);
      this.lightbox = null;
      this.lightboxElement = null;
    }
  }
  /**
   * Returns the lightbox element.
   * This method is called after the lightbox is created.
   * @returns HTMLElement
   */
  getLightboxElement() {
    return this.lightboxElement.nativeElement;
  }
  static {
    this.ɵfac = function LightboxService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LightboxService)(ɵɵinject(ApplicationRef));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _LightboxService,
      factory: _LightboxService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LightboxService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: ApplicationRef
  }], null);
})();
var DEFAULT_OPTIONS = {
  history: false,
  closeEl: true,
  captionEl: false,
  fullscreenEl: false,
  zoomEl: true,
  shareEl: false,
  counterEl: true,
  arrowEl: false,
  preloaderEl: true
};
var PhotoGalleryGroupDirective = class _PhotoGalleryGroupDirective {
  constructor(photoGalleryConfig, lightboxService) {
    this.photoGalleryConfig = photoGalleryConfig;
    this.lightboxService = lightboxService;
    this.onPhotoGalleryInit = new EventEmitter();
    this.onPhotoGalleryDestroy = new EventEmitter();
    this.galleryItems = {};
    this.galleryItemIds = /* @__PURE__ */ new Set();
    this.galleryImages = [];
    this.defaultOptions = __spreadValues(__spreadValues({}, DEFAULT_OPTIONS), this.photoGalleryConfig?.defaultOptions);
  }
  registerGalleryItem(item) {
    const image = __spreadProps(__spreadValues({
      id: item.id,
      src: item.imageUrl
    }, item.caption ? {
      title: item.caption
    } : {}), {
      w: 0,
      h: 0,
      doGetSlideDimensions: true
    });
    this.galleryItems[item.id] = {
      id: item.id,
      element: item.element,
      image
    };
    this.galleryItemIds.add(item.id);
  }
  unregisterGalleryItem(id) {
    this.galleryItemIds.delete(id);
  }
  openPhotoSwipe(id) {
    return __async(this, null, function* () {
      this.lightboxService.create();
      if (this.galleryItems[id].image.doGetSlideDimensions) {
        const targetImage = yield loadImage(this.galleryItems[id].image.src);
        this.galleryItems[id].image.w = targetImage.naturalWidth;
        this.galleryItems[id].image.h = targetImage.naturalHeight;
        delete this.galleryItems[id].image.doGetSlideDimensions;
      }
      this.galleryImages = [...this.galleryItemIds].map((key) => this.galleryItems[key].image);
      const idx = this.galleryImages.findIndex((image) => image.id === id);
      const options = __spreadValues(__spreadValues({}, this.defaultOptions), this.options);
      options.index = idx;
      options.getThumbBoundsFn = (imageIndex) => {
        const key = this.galleryImages[imageIndex].id;
        const thumbnail = this.galleryItems[key].element;
        const origin = this.galleryItems[key].image;
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        const rect = thumbnail.getBoundingClientRect();
        const thumbnailRate = rect.height / rect.width;
        const originRate = origin.h / origin.w;
        let x, y, w;
        if (thumbnailRate > originRate) {
          y = rect.top + pageYScroll;
          w = origin.w * rect.height / origin.h;
          x = rect.left - (w - rect.width) / 2;
        } else {
          const imageHeight = origin.h * rect.width / origin.w;
          x = rect.left;
          w = rect.width;
          y = rect.top + pageYScroll - (imageHeight - rect.height) / 2;
        }
        return {
          x,
          y,
          w
        };
      };
      const photoSwipe = this.lightboxService.getLightboxElement();
      this.gallery = new import_photoswipe.default(photoSwipe, import_photoswipe_ui_default.default, this.galleryImages, options);
      this.gallery.listen("gettingData", (_, slide) => {
        if (slide.doGetSlideDimensions) {
          setTimeout(() => __async(this, null, function* () {
            yield this.getSlideDimensions(slide);
          }), 300);
        }
      });
      this.gallery.listen("imageLoadComplete", (_, slide) => __async(this, null, function* () {
        if (slide.doGetSlideDimensions) {
          yield this.getSlideDimensions(slide);
        }
      }));
      this.gallery.listen("destroy", () => {
        this.lightboxService.destroy();
        this.onPhotoGalleryDestroy.emit();
      });
      this.onPhotoGalleryInit.emit();
      this.gallery.init();
    });
  }
  getSlideDimensions(slide) {
    return __async(this, null, function* () {
      if (!slide.doGetSlideDimensions) {
        return;
      }
      const image = yield loadImage(slide.src).catch(() => null);
      slide.doGetSlideDimensions = false;
      slide.w = image.naturalWidth;
      slide.h = image.naturalHeight;
      this.gallery.invalidateCurrItems();
      this.gallery.updateSize(true);
    });
  }
  static {
    this.ɵfac = function PhotoGalleryGroupDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PhotoGalleryGroupDirective)(ɵɵdirectiveInject(PhotoGalleryConfig, 8), ɵɵdirectiveInject(LightboxService));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PhotoGalleryGroupDirective,
      selectors: [["", "photoGalleryGroup", ""]],
      inputs: {
        options: [0, "photoGalleryGroup", "options"]
      },
      outputs: {
        onPhotoGalleryInit: "onPhotoGalleryInit",
        onPhotoGalleryDestroy: "onPhotoGalleryDestroy"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhotoGalleryGroupDirective, [{
    type: Directive,
    args: [{
      selector: "[photoGalleryGroup]"
    }]
  }], () => [{
    type: PhotoGalleryConfig,
    decorators: [{
      type: Optional
    }]
  }, {
    type: LightboxService
  }], {
    options: [{
      type: Input,
      args: ["photoGalleryGroup"]
    }],
    onPhotoGalleryInit: [{
      type: Output
    }],
    onPhotoGalleryDestroy: [{
      type: Output
    }]
  });
})();
function loadImage(path) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
    image.src = path;
  });
}
var PhotoGalleryDirective = class _PhotoGalleryDirective {
  constructor(el, photoGalleryGroup) {
    this.el = el;
    this.photoGalleryGroup = photoGalleryGroup;
  }
  openPhotoSwipe() {
    return __async(this, null, function* () {
      yield this.photoGalleryGroup.openPhotoSwipe(this.id);
    });
  }
  ngAfterContentInit() {
    this.id = this.photoGalleryTrackBy || this.imageUrl;
    this.photoGalleryGroup.registerGalleryItem({
      id: this.id,
      element: this.el.nativeElement,
      imageUrl: this.imageUrl,
      caption: this.photoGalleryCaption
    });
  }
  ngOnDestroy() {
    this.photoGalleryGroup.unregisterGalleryItem(this.id);
  }
  static {
    this.ɵfac = function PhotoGalleryDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PhotoGalleryDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(PhotoGalleryGroupDirective));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PhotoGalleryDirective,
      selectors: [["", "photoGallery", ""]],
      hostBindings: function PhotoGalleryDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function PhotoGalleryDirective_click_HostBindingHandler() {
            return ctx.openPhotoSwipe();
          });
        }
      },
      inputs: {
        imageUrl: [0, "photoGallery", "imageUrl"],
        photoGalleryTrackBy: "photoGalleryTrackBy",
        photoGalleryCaption: "photoGalleryCaption"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhotoGalleryDirective, [{
    type: Directive,
    args: [{
      selector: "[photoGallery]"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: PhotoGalleryGroupDirective
  }], {
    imageUrl: [{
      type: Input,
      args: ["photoGallery"]
    }],
    photoGalleryTrackBy: [{
      type: Input
    }],
    photoGalleryCaption: [{
      type: Input
    }],
    openPhotoSwipe: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var PhotoGalleryModule = class _PhotoGalleryModule {
  static forRoot(config) {
    return {
      ngModule: _PhotoGalleryModule,
      providers: [{
        provide: PhotoGalleryConfig,
        useValue: config
      }]
    };
  }
  static {
    this.ɵfac = function PhotoGalleryModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PhotoGalleryModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _PhotoGalleryModule,
      declarations: [LightboxComponent, PhotoGalleryDirective, PhotoGalleryGroupDirective],
      exports: [PhotoGalleryDirective, PhotoGalleryGroupDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhotoGalleryModule, [{
    type: NgModule,
    args: [{
      declarations: [LightboxComponent, PhotoGalleryDirective, PhotoGalleryGroupDirective],
      providers: [],
      imports: [],
      exports: [PhotoGalleryDirective, PhotoGalleryGroupDirective]
    }]
  }], null, null);
})();
export {
  DEFAULT_OPTIONS,
  PhotoGalleryDirective,
  PhotoGalleryGroupDirective,
  PhotoGalleryModule
};
/*! Bundled license information:

photoswipe/dist/photoswipe.js:
  (*! PhotoSwipe - v4.1.3 - 2019-01-08
  * http://photoswipe.com
  * Copyright (c) 2019 Dmitry Semenov; *)

photoswipe/dist/photoswipe-ui-default.js:
  (*! PhotoSwipe Default UI - 4.1.3 - 2019-01-08
  * http://photoswipe.com
  * Copyright (c) 2019 Dmitry Semenov; *)
*/
//# sourceMappingURL=@twogate_ngx-photo-gallery.js.map
