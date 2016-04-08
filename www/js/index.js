/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        function exitApp() {
            navigator.app.exitApp();
        }

        function switchOffFlashlight() {
            // pass exitApp as callbacks to the switchOff method
            window.plugins.flashlight.switchOff(exitApp, exitApp);
        }

        function clickFlashlight() {
            window.plugins.flashlight.available(function(isAvailable) {
                if (isAvailable) {
                    window.plugins.flashlight.toggle(); // success/error callbacks may be passed
                } else {
                    alert("Flashlight not available on this device");
                }
            });
        }

        function switchImage() {
            var image = document.querySelector('img');
            if (image.src.indexOf('on') > -1) {
                image.src = 'img/off.png';
            } else {
                image.src = 'img/on.png';
            }
        }
        
        document.addEventListener('deviceready', function() {
            document.addEventListener('backbutton', switchOffFlashlight, false);
            document.addEventListener('click', clickFlashlight, false);
            document.querySelector('img').addEventListener('click', switchImage, false);
        }, false);
    }
};

app.initialize();
