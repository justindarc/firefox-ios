!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=46)}({46:function(e,n,t){t(47),t(48),t(49),t(50),t(51),t(52),t(53),t(54),t(55),e.exports=t(56)},47:function(e,n,t){"use strict";window.browser||Object.defineProperty(window,"browser",{enumerable:!1,configurable:!1,writable:!1,value:{}})},48:function(e,n,t){"use strict";var o={setTitle:noimpl("setTitle"),getTitle:noimpl("getTitle"),setIcon:noimpl("setIcon"),setPopup:noimpl("setPopup"),getPopup:noimpl("getPopup"),openPopup:noimpl("openPopup"),setBadgeText:noimpl("setBadgeText"),getBadgeText:noimpl("getBadgeText"),setBadgeBackgroundColor:noimpl("setBadgeBackgroundColor"),getBadgeBackgroundColor:noimpl("getBadgeBackgroundColor"),setBadgeTextColor:noimpl("setBadgeTextColor"),getBadgeTextColor:noimpl("getBadgeTextColor"),enable:noimpl("enable"),disable:noimpl("disable"),isEnabled:noimpl("isEnabled"),onClicked:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.browserAction.onClicked")};window.browser.browserAction=o},49:function(e,n,t){"use strict";var o={get:function(e){return(new MessagePipeConnection).send("cookies","get",e).then(function(e){return e[0]})},getAll:function(e){return(new MessagePipeConnection).send("cookies","getAll",e).then(function(e){return e[0]})},set:function(e){return(new MessagePipeConnection).send("cookies","set",e).then(function(e){return e[0]})},remove:function(e){return(new MessagePipeConnection).send("cookies","remove",e).then(function(e){return e[0]})},getAllCookieStores:noimpl("getAllCookieStores"),onChanged:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.cookies.onChanged")};window.browser.cookies=o},50:function(e,n,t){"use strict";var o={getBackgroundPage:function(){return window.opener},getExtensionTabs:noimpl("getExtensionTabs"),getURL:function(e){return WEB_EXTENSION_BASE_URL+(e.startsWith("/")?e.substr(1):e)},getViews:noimpl("getViews"),isAllowedIncognitoAccess:noimpl("isAllowedIncognitoAccess"),isAllowedFileSchemeAccess:noimpl("isAllowedFileSchemeAccess"),setUpdateUrlData:noimpl("setUpdateUrlData"),sendRequest:noimpl("sendRequest"),onRequest:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.extension.onRequest"),onRequestExternal:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.extension.onRequestExternal")};window.browser.extension=o},51:function(e,n,t){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=WEB_EXTENSION_MANIFEST.default_locale||"en",i={getAcceptLanguages:noimpl("getAcceptLanguages"),getMessage:function(e,n){var t=(WEB_EXTENSION_LOCALES[WEB_EXTENSION_SYSTEM_LANGUAGE]||WEB_EXTENSION_LOCALES[r]||{})[e];if(!t)return console.error("Localized message not found for '"+e+"'"),"";var i=t.message||"";if(!i.includes("$"))return i;var s=function(e){return e&&"object"===(void 0===e?"undefined":o(e))},a=new Map;if(s(t.placeholders)){var l=!0,E=!1,c=void 0;try{for(var u,p=Object.keys(t.placeholders)[Symbol.iterator]();!(l=(u=p.next()).done);l=!0){var d=u.value;a.set(d.toLowerCase(),t.placeholders[d])}}catch(e){E=!0,c=e}finally{try{!l&&p.return&&p.return()}finally{if(E)throw c}}}var g=i.replace(/\$([A-Za-z0-9@_]+)\$/g,function(e,n){var t=a.get(n.toLowerCase());return s(t)&&"content"in t?t.content:""});return g.includes("$")?(Array.isArray(n)||(n=[n]),g.replace(/\$(?:([1-9]\d*)|(\$+))/g,function(e,t,o){return t?(t=parseInt(t,10)-1)in n?n[t]:"":o})):g},getUILanguage:function(){return WEB_EXTENSION_SYSTEM_LANGUAGE},detectLanguage:noimpl("detectLanguage")};window.browser.i18n=i},52:function(e,n,t){"use strict";var o={clear:noimpl("clear"),create:function(e,n){return"string"!=typeof e&&(n=e,e=void 0),e||(e=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)})),(new MessagePipeConnection).send("notifications","create",{id:e,options:n}),Promise.resolve()},getAll:noimpl("getAll"),update:noimpl("update"),onButtonClicked:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.notifications.onButtonClicked"),onClicked:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.notifications.onClicked"),onClosed:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.notifications.onClosed"),onShown:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.notifications.onShown")};window.browser.notifications=o},53:function(e,n,t){"use strict";var o={getBackgroundPage:function(){return window.opener?Promise.resolve(window.opener):Promise.reject()},openOptionsPage:noimpl("openOptionsPage"),getManifest:noimpl("getManifest"),getURL:function(e){return WEB_EXTENSION_BASE_URL+(e.startsWith("/")?e.substr(1):e)},setUninstallURL:noimpl("setUninstallURL"),reload:noimpl("reload"),requestUpdateCheck:noimpl("requestUpdateCheck"),connect:noimpl("connect"),connectNative:noimpl("connectNative"),sendMessage:function(e,n,t){return 1===arguments.length?(n=e,e=void 0):2===arguments.length&&(t=n,n=e,e=void 0),(new MessagePipeConnection).send("runtime","sendMessage",{extensionId:e,message:n,options:t}),Promise.resolve()},sendNativeMessage:noimpl("sendNativeMessage"),getPlatformInfo:noimpl("getPlatformInfo"),getBrowserInfo:noimpl("getBrowserInfo"),getPackageDirectoryEntry:noimpl("getPackageDirectoryEntry"),onStartup:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onStartup"),onInstalled:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onInstalled"),onSuspend:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onSuspend"),onSuspendCanceled:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onSuspendCanceled"),onUpdateAvailable:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onUpdateAvailable"),onBrowserUpdateAvailable:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onBrowserUpdateAvailable"),onConnect:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onConnect"),onConnectExternal:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onConnectExternal"),onMessage:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onMessage"),onMessageExternal:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onMessageExternal"),onRestartRequired:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.runtime.onRestartRequired")};window.browser.runtime=o},54:function(e,n,t){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r={local:{get:function(e){var n=JSON.parse(localStorage.getItem(WEB_EXTENSION_BASE_URL)||"{}");if(null===e)return Promise.resolve(n);var t={};if(!e)return Promise.resolve(t);if("string"==typeof e){var r=n[e];void 0!==r&&(t[e]=r)}else if(Array.isArray(e))e.forEach(function(e){var o=n[e];void 0!==o&&(t[e]=o)});else if("object"===(void 0===e?"undefined":o(e)))for(var i in e){var s=n[i];t[i]=void 0!==s?s:e[i]}return Promise.resolve(t)},getBytesInUse:function(e){var n=localStorage.getItem(WEB_EXTENSION_BASE_URL)||"";return Promise.resolve(n.length)},set:function(e){if(!e||"object"!==(void 0===e?"undefined":o(e)))return Promise.reject();var n=JSON.parse(localStorage.getItem(WEB_EXTENSION_BASE_URL)||"{}");for(var t in e)n[t]=e[t];return localStorage.setItem(WEB_EXTENSION_BASE_URL,JSON.stringify(n)),Promise.resolve()},remove:function(e){var n=void 0;if("string"==typeof e)n=[e];else{if(!Array.isArray(e))return Promise.reject();n=e}var t=JSON.parse(localStorage.getItem(WEB_EXTENSION_BASE_URL)||"{}");return n.forEach(function(e){delete t[e]}),localStorage.setItem(WEB_EXTENSION_BASE_URL,JSON.stringify(t)),Promise.resolve()},clear:function(){return localStorage.removeItem(WEB_EXTENSION_BASE_URL),Promise.resolve()}},onChanged:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.storage.onChanged")};window.browser.storage=r},55:function(e,n,t){"use strict";var o={captureTab:noimpl("captureTab"),captureVisibleTab:noimpl("captureVisibleTab"),connect:noimpl("connect"),create:function(e){return(new MessagePipeConnection).send("tabs","create",e).then(function(e){return e[0]})},detectLanguage:noimpl("detectLanguage"),discard:noimpl("discard"),duplicate:noimpl("duplicate"),executeScript:noimpl("executeScript"),get:noimpl("get"),getAllInWindow:noimpl("getAllInWindow"),getCurrent:noimpl("getCurrent"),getSelected:noimpl("getSelected"),getZoom:noimpl("getZoom"),getZoomSettings:noimpl("getZoomSettings"),hide:noimpl("hide"),highlight:noimpl("highlight"),insertCSS:noimpl("insertCSS"),move:noimpl("move"),print:noimpl("print"),printPreview:noimpl("printPreview"),query:function(e){return(new MessagePipeConnection).send("tabs","query",e).then(function(e){return e[0]})},reload:noimpl("reload"),remove:noimpl("remove"),removeCSS:noimpl("removeCSS"),saveAsPDF:noimpl("saveAsPDF"),sendMessage:function(e,n,t){return(new MessagePipeConnection).send("tabs","sendMessage",{tabId:e,message:n,options:t}),Promise.resolve()},sendRequest:noimpl("sendRequest"),setZoom:noimpl("setZoom"),setZoomSettings:noimpl("setZoomSettings"),show:noimpl("show"),toggleReaderMode:noimpl("toggleReaderMode"),update:noimpl("update"),onActivated:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onActivated"),onActiveChanged:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onActiveChanged"),onAttached:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onAttached"),onCreated:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onCreated"),onDetached:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onDetached"),onHighlightChanged:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onHighlightChanged"),onHighlighted:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onHighlighted"),onMoved:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onMoved"),onRemoved:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onRemoved"),onReplaced:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onReplaced"),onSelectionChanged:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onSelectionChanged"),onUpdated:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onUpdated"),onZoomChange:new NativeEvent(SECURITY_TOKEN,WEB_EXTENSION_ID,"browser.tabs.onZoomChange")};window.browser.tabs=o},56:function(e,n,t){"use strict";var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),r=function e(n,t,o){null===n&&(n=Function.prototype);var r=Object.getOwnPropertyDescriptor(n,t);if(void 0===r){var i=Object.getPrototypeOf(n);return null===i?void 0:e(i,t,o)}if("value"in r)return r.value;var s=r.get;return void 0!==s?s.call(o):void 0},i=new WeakMap,s=function(e){function n(e,t){return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e,t))}return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,NativeEvent),o(n,[{key:"addListener",value:function(e,t,o){i.set(e,i.get(e)||function(n){e(n)}),r(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"addListener",this).call(this,i.get(e))}},{key:"removeListener",value:function(e){r(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"removeListener",this).call(this,i.get(e)),i.delete(e)}}]),n}(),a={handlerBehaviorChanged:noimpl("handlerBehaviorChanged"),filterResponseData:noimpl("filterResponseData"),getSecurityInfo:noimpl("getSecurityInfo"),onBeforeRequest:new s(SECURITY_TOKEN,"browser.webRequest.onBeforeRequest"),onBeforeSendHeaders:new s(SECURITY_TOKEN,"browser.webRequest.onBeforeSendHeaders"),onSendHeaders:new s(SECURITY_TOKEN,"browser.webRequest.onSendHeaders"),onHeadersReceived:new s(SECURITY_TOKEN,"browser.webRequest.onHeadersReceived"),onAuthRequired:new s(SECURITY_TOKEN,"browser.webRequest.onAuthRequired"),onResponseStarted:new s(SECURITY_TOKEN,"browser.webRequest.onResponseStarted"),onBeforeRedirect:new s(SECURITY_TOKEN,"browser.webRequest.onBeforeRedirect"),onCompleted:new s(SECURITY_TOKEN,"browser.webRequest.onCompleted"),onErrorOccurred:new s(SECURITY_TOKEN,"browser.webRequest.onErrorOccurred")};window.browser.webRequest=a}});