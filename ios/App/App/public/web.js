(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["web"],{

/***/ "wzPO":
/*!********************************************************!*\
  !*** ./node_modules/@capacitor/camera/dist/esm/web.js ***!
  \********************************************************/
/*! exports provided: CameraWeb, Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CameraWeb", function() { return CameraWeb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
/* harmony import */ var _Users_primozalho_d_filho_PIONEER_Capacitor_poc_capacitor_poc_capacitor_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "HaE+");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ "FUe0");
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./definitions */ "dTEF");



class CameraWeb extends _capacitor_core__WEBPACK_IMPORTED_MODULE_1__["WebPlugin"] {
  getPhoto(options) {
    var _this = this;

    return Object(_Users_primozalho_d_filho_PIONEER_Capacitor_poc_capacitor_poc_capacitor_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise( /*#__PURE__*/function () {
        var _ref = Object(_Users_primozalho_d_filho_PIONEER_Capacitor_poc_capacitor_poc_capacitor_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
          if (options.webUseInput || options.source === _definitions__WEBPACK_IMPORTED_MODULE_2__["CameraSource"].Photos) {
            _this.fileInputExperience(options, resolve);
          } else if (options.source === _definitions__WEBPACK_IMPORTED_MODULE_2__["CameraSource"].Prompt) {
            let actionSheet = document.querySelector('pwa-action-sheet');

            if (!actionSheet) {
              actionSheet = document.createElement('pwa-action-sheet');
              document.body.appendChild(actionSheet);
            }

            actionSheet.header = options.promptLabelHeader || 'Photo';
            actionSheet.cancelable = false;
            actionSheet.options = [{
              title: options.promptLabelPhoto || 'From Photos'
            }, {
              title: options.promptLabelPicture || 'Take Picture'
            }];
            actionSheet.addEventListener('onSelection', /*#__PURE__*/function () {
              var _ref2 = Object(_Users_primozalho_d_filho_PIONEER_Capacitor_poc_capacitor_poc_capacitor_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (e) {
                const selection = e.detail;

                if (selection === 0) {
                  _this.fileInputExperience(options, resolve);
                } else {
                  _this.cameraExperience(options, resolve, reject);
                }
              });

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());
          } else {
            _this.cameraExperience(options, resolve, reject);
          }
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    })();
  }

  cameraExperience(options, resolve, reject) {
    var _this2 = this;

    return Object(_Users_primozalho_d_filho_PIONEER_Capacitor_poc_capacitor_poc_capacitor_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (customElements.get('pwa-camera-modal')) {
        const cameraModal = document.createElement('pwa-camera-modal');
        document.body.appendChild(cameraModal);

        try {
          yield cameraModal.componentOnReady();
          cameraModal.addEventListener('onPhoto', /*#__PURE__*/function () {
            var _ref3 = Object(_Users_primozalho_d_filho_PIONEER_Capacitor_poc_capacitor_poc_capacitor_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (e) {
              const photo = e.detail;

              if (photo === null) {
                reject(new _capacitor_core__WEBPACK_IMPORTED_MODULE_1__["CapacitorException"]('User cancelled photos app'));
              } else if (photo instanceof Error) {
                reject(photo);
              } else {
                resolve(yield _this2._getCameraPhoto(photo, options));
              }

              cameraModal.dismiss();
              document.body.removeChild(cameraModal);
            });

            return function (_x4) {
              return _ref3.apply(this, arguments);
            };
          }());
          cameraModal.present();
        } catch (e) {
          _this2.fileInputExperience(options, resolve);
        }
      } else {
        console.error(`Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/pwa-elements.`);

        _this2.fileInputExperience(options, resolve);
      }
    })();
  }

  fileInputExperience(options, resolve) {
    let input = document.querySelector('#_capacitor-camera-input');

    const cleanup = () => {
      var _a;

      (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
    };

    if (!input) {
      input = document.createElement('input');
      input.id = '_capacitor-camera-input';
      input.type = 'file';
      input.hidden = true;
      document.body.appendChild(input);
      input.addEventListener('change', _e => {
        const file = input.files[0];
        let format = 'jpeg';

        if (file.type === 'image/png') {
          format = 'png';
        } else if (file.type === 'image/gif') {
          format = 'gif';
        }

        if (options.resultType === 'dataUrl' || options.resultType === 'base64') {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            if (options.resultType === 'dataUrl') {
              resolve({
                dataUrl: reader.result,
                format
              });
            } else if (options.resultType === 'base64') {
              const b64 = reader.result.split(',')[1];
              resolve({
                base64String: b64,
                format
              });
            }

            cleanup();
          });
          reader.readAsDataURL(file);
        } else {
          resolve({
            webPath: URL.createObjectURL(file),
            format: format
          });
          cleanup();
        }
      });
    }

    input.accept = 'image/*';
    input.capture = true;

    if (options.source === _definitions__WEBPACK_IMPORTED_MODULE_2__["CameraSource"].Photos || options.source === _definitions__WEBPACK_IMPORTED_MODULE_2__["CameraSource"].Prompt) {
      input.removeAttribute('capture');
    } else if (options.direction === _definitions__WEBPACK_IMPORTED_MODULE_2__["CameraDirection"].Front) {
      input.capture = 'user';
    } else if (options.direction === _definitions__WEBPACK_IMPORTED_MODULE_2__["CameraDirection"].Rear) {
      input.capture = 'environment';
    }

    input.click();
  }

  _getCameraPhoto(photo, options) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const format = photo.type.split('/')[1];

      if (options.resultType === 'uri') {
        resolve({
          webPath: URL.createObjectURL(photo),
          format: format
        });
      } else {
        reader.readAsDataURL(photo);

        reader.onloadend = () => {
          const r = reader.result;

          if (options.resultType === 'dataUrl') {
            resolve({
              dataUrl: r,
              format: format
            });
          } else {
            resolve({
              base64String: r.split(',')[1],
              format: format
            });
          }
        };

        reader.onerror = e => {
          reject(e);
        };
      }
    });
  }

  checkPermissions() {
    var _this3 = this;

    return Object(_Users_primozalho_d_filho_PIONEER_Capacitor_poc_capacitor_poc_capacitor_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (typeof navigator === 'undefined' || !navigator.permissions) {
        throw _this3.unavailable('Permissions API not available in this browser');
      }

      try {
        // https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
        // the specific permissions that are supported varies among browsers that implement the
        // permissions API, so we need a try/catch in case 'camera' is invalid
        const permission = yield window.navigator.permissions.query({
          name: 'camera'
        });
        return {
          camera: permission.state,
          photos: 'granted'
        };
      } catch (_a) {
        throw _this3.unavailable('Camera permissions are not available in this browser');
      }
    })();
  }

  requestPermissions() {
    var _this4 = this;

    return Object(_Users_primozalho_d_filho_PIONEER_Capacitor_poc_capacitor_poc_capacitor_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      throw _this4.unimplemented('Not implemented on web.');
    })();
  }

}
const Camera = new CameraWeb();
 //# sourceMappingURL=web.js.map

/***/ })

}]);
//# sourceMappingURL=web.js.map