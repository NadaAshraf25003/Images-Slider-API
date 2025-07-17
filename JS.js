//  Images Slider
      var img_slide = document.querySelector("#img");
      var img_title = document.querySelector(".img_title");
      var back_arrow = document.querySelector(".back");
      var next_arrow = document.querySelector(".next");
      var play_slider = document.querySelector(".play");
      var stop_slider = document.querySelector(".stop");
      var speed_1 = document.querySelector(".speed_1");
      var speed_2 = document.querySelector(".speed_2");
      var speed_3 = document.querySelector(".speed_3");

      var images = [];
      var index = 0;
      var interval = null;
      var speed = 2000; // Default 4s

      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://fakestoreapi.com/products");
      xhr.send();

      xhr.addEventListener("load", function () {
        images = JSON.parse(xhr.responseText);
        display_img();
      });

      function display_img() {
        if (images.length > 0) {
          img_slide.src = images[index].image;
          img_title.textContent = images[index].title;
        }
      }
      function next_arrow_fun() {
        index = (index + 1) % images.length;
        display_img();
      }

      function back_arrow_fun() {
        index = (index - 1 + images.length) % images.length;
        display_img();
      }

      function play_slider_fun() {
        if (!interval) {
          interval = setInterval(next_arrow_fun, speed);
        }
      }

      function stop_slider_fun() {
        clearInterval(interval);
        interval = null;
      }

      function setSpeed(newSpeed) {
        speed = newSpeed;
        stop_slider_fun();
        play_slider_fun(); // Restart with new speed
      }

      next_arrow.addEventListener("click", next_arrow_fun);

      back_arrow.addEventListener("click", back_arrow_fun);

      play_slider.addEventListener("click", play_slider_fun);

      stop_slider.addEventListener("click", stop_slider_fun);

      speed_1.addEventListener("click", function () {
        setSpeed(6000);
      });
      speed_2.addEventListener("click", function () {
        setSpeed(4000);
      });
      speed_3.addEventListener("click", function () {
        setSpeed(2000);
      });

      // ------------------------------------------------------------------------------------------------------------------------

      // Ex2: create a js library
      const CookieLib = {
        // [1] A function to set a cookie value
        setCookie: function (name, value, days) {
          var expires = "";
          if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
          }
          document.cookie =
            name + "=" + encodeURIComponent(value) + expires + "; path=/";
        },

        // [2] A function to get a cookie value as array
        getCookies: function () {
          return document.cookie
            .split("; ")
            .filter((cookie) => cookie.includes("="));
        },

        // [3] A function to check a cookie value
        hasCookie: function (cookieName) {
          return document.cookie
            .split("; ")
            .some((cookie) => cookie.startsWith(cookieName + "="));
        },
      };
