/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/lyon/2020/07/22/你好/index.html","8eefda18173f8a9aa90f7d4c73fea2cf"],["/lyon/2020/07/26/Hexo-admin插件使用/index.html","594125117e4ae88d6583c22b7ea88556"],["/lyon/2020/12/30/hello-world/index.html","c10165da42d43073f42e94df9306638e"],["/lyon/about/index.html","45bb853c2e47c01d14f92aa980ae94ab"],["/lyon/archives/2020/07/index.html","8894f546780a75d9892ef446ef53e7e3"],["/lyon/archives/2020/12/index.html","177fe215fae5d6cae6871272c73e1f90"],["/lyon/archives/2020/index.html","01f0557da116b6a4e5e26beef1be5d07"],["/lyon/archives/index.html","87e4b1d4e3c86904eefa299598107e47"],["/lyon/assets/css/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["/lyon/assets/js/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/lyon/assets/js/Meting.min.js","bfac0368480fd344282ec018d28f173d"],["/lyon/categories/Hexo/index.html","8a3df39fa185bf3b03722f5cc5f8277d"],["/lyon/categories/index.html","314160d53a1ef2cd949d7c4e2fd2a9a0"],["/lyon/css/VolantisTags.css","00e86b5f8f0c685af0cd50a0e5c72c14"],["/lyon/css/fontAnimation.css","e438cbdce5ff14ae374d19c1e13d491b"],["/lyon/css/index.css","ba1ffda86e9653058aa383bc810e2155"],["/lyon/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/lyon/css/volantis.css","cd2a3ce6b8506d280e2ed38354b97b44"],["/lyon/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/lyon/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/lyon/img/avatar.png","38b843ce8d375dd746f3a7e53d288fc9"],["/lyon/img/banner/4.jpg","bbb7c6e21eb3e2349bb74de245cd5165"],["/lyon/img/cover/bg0.jpg","227c284f50c2f53829a24d51077af375"],["/lyon/img/cover/bg1.jpg","ca56a080a292048402bdf56c16e53c05"],["/lyon/img/cover/bg10.jpg","304cb1245e076b490c9f1b43d8197d44"],["/lyon/img/cover/bg2.jpg","ddb5eb139c8a704672457d365a2f505b"],["/lyon/img/cover/bg4.jpg","5de4213d6f3f9aa744a8156a6ce6e628"],["/lyon/img/cover/bg6.jpg","b42bdb3911fa8e275a98878301452b54"],["/lyon/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/lyon/img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["/lyon/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/lyon/img/valine_bg.png","27c5fdfc445c8c3d00d46206d3852fa6"],["/lyon/index.html","4132afbae83d44f71e48904c648b5c2a"],["/lyon/js/VolantisTags.js","3d18dd231aba8d8ae6ca554723630b3b"],["/lyon/js/classify.js","2ec4725eff203ca3defe053eb5ec65ee"],["/lyon/js/main.js","b382597891e958e71bb7c1099977ec66"],["/lyon/js/search/algolia.js","24e286714f775d2a52053e530b2ac199"],["/lyon/js/search/local-search.js","e3a22e76d8b457655f619551990316e8"],["/lyon/js/third-party/ClickShowText.js","22f4c82da4faed04c79e61fcbbdf675c"],["/lyon/js/third-party/activate-power-mode.js","e8455f75769585811cd6b3220787d08e"],["/lyon/js/third-party/canvas-nest.js","bb643bd9c2ac59f6ce2a1251b8014624"],["/lyon/js/third-party/canvas-ribbon.js","4ca518354a167db9fe0869c0982ff215"],["/lyon/js/third-party/click_heart.js","c2420dfec66aa5bad663e6c365a129c8"],["/lyon/js/third-party/fireworks.js","080fdfcacffc6828826484645140af50"],["/lyon/js/third-party/piao.js","5c8c9ff4bb9bed49e333387a54eae9be"],["/lyon/js/tw_cn.js","0dcf46510648b9ff1a8a65d270ba117a"],["/lyon/js/utils.js","9fadc7723c6bd679aa69c1c158f65af0"],["/lyon/js/volantis.js","176cc4b7e4b28ae27e5faa4d28159966"],["/lyon/link/index.html","86b069e2af5498e8e40308bf39427dd5"],["/lyon/sw-register.js","a6a3fd02700986f2a2c9df1188184328"],["/lyon/tags/Hexo/index.html","6c4f44c40dfab379e38f5cccd6f91f51"],["/lyon/tags/index.html","56dcef16818ede35266d12f40885b0bd"],["/lyon/tags/生活杂谈/index.html","386fa9d27a5724702282fdc9321ba615"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
