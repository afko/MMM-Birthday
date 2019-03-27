/* Magic Mirror
 * Module: Birthday
 *
 * By Sungje Kim 
 * 
 */

Module.register('MMM-Birthday', {
    defaults: {
        fadeSpeed: 4000,
        // updateInterval: 60 * 60 * 1000, // 60 secs
        updateInterval: 5 * 1000, // 60 secs
        newsNum: 0
    },

    start: function () {
        this.sendSocketNotification("START", this.config);
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "DATA") {
            this.dataFile = payload;
            this.updateDom();
        }
    },

    getScripts: function () {
        return [
            '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
        ];
    },
    getStyles: function () {
        return [
            "font-awesome.css",
            "MMM-Birthday.css"
        ];
    },

    getDom: function () {

        var wrapper = document.createElement("div");
        wrapper.id = "BIRTH";
        wrapperinnerHTML = "";
        // var h1 = document.createElement("h1");
        // h1Text = document.createTextNode(" 오늘의 생일 !! ");
        // h1.appendChild(h1Text);

        var div = document.createElement("div");
        div.id = "NAMEDIV";
        div.innerHTML = "";

        var todayDate = new Date();
        if (this.dataFile) {
            
            for (var i = 0; i <= Object.keys(this.dataFile).length; i++){
                if (new Date(this.dataFile[i].birth).getMonth == todayDate.getMonth && new Date(this.dataFile[i].birth).getDay == todayDate.getDay ) {
                    div.innerHTML += "오늘의 생일! <br>"; 
                    div.innerHTML += this.dataFile[i].name + "<br>";
                    div.innerHTML += "축하드립니다!!"; 
                }
            }

            wrapper.appendChild(div)
            
        } else {
            wrapper.innerHTML = "No data";
        }

        return wrapper;
    }
});