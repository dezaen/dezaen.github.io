//= require_self
//  Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PLLMNH2');

$(document).ready(function() {
    // ScrollAppear
    if (typeof $.fn.scrollAppear === 'function') {
      $('.scrollappear').scrollAppear();
    }
  
    // Zooming
    new Zooming(
      {customSize: '100%', scaleBase: 0.9, scaleExtra: 0}
    ).listen('.zooming');
  
    // Share buttons
    $('.article-share a').on('click', function() {
      window.open($(this).attr('href'), 'Share', 'width=200,height=200,noopener');
      return false;
    });
    // 
    ScrollReveal().reveal('.reveal', {
        distance: '120%',
        origin: 'bottom',
        duration: 1000,
        delay: 200,
        interval: 300
    });
    $('.carousel').carousel({
        touch: true
    })

    // Sphere animation
    function fitElementToParent(el, padding) {
        var timeout = null;
        function resize() {
          if (timeout) clearTimeout(timeout);
          anime.set(el, {scale: 1});
          var pad = padding || 0;
          var parentEl = el.parentNode;
          var elOffsetWidth = el.offsetWidth - pad;
          var parentOffsetWidth = parentEl.offsetWidth;
          var ratio = parentOffsetWidth / elOffsetWidth;
          timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
        }
        resize();
        window.addEventListener('resize', resize);
    }
    var sphereAnimation = (function() {  
        var sphereEl = document.querySelector('.sphere-animation');
        var spherePathEls = sphereEl.querySelectorAll('.sphere path');
        var pathLength = spherePathEls.length;
        var hasStarted = false;
        var aimations = [];
        fitElementToParent(sphereEl);
    
    var breathAnimation = anime({
        begin: function() {
            for (var i = 0; i < pathLength; i++) {
            aimations.push(anime({
                targets: spherePathEls[i],
                stroke: {value: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'], duration: 500},
                translateX: [2, -4],
                translateY: [2, -4],
                easing: 'easeOutQuad',
                autoplay: false
            }));
            }
        },
        update: function(ins) {
            aimations.forEach(function(animation, i) {
            var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
            animation.seek(animation.duration * percent);
            });
        },
        duration: Infinity,
        autoplay: false
        });
    
        var introAnimation = anime.timeline({
        autoplay: false
        })
        .add({
        targets: spherePathEls,
        strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 3900,
            easing: 'easeInOutCirc',
            delay: anime.stagger(190, {direction: 'reverse'})
        },
        duration: 2000,
        delay: anime.stagger(60, {direction: 'reverse'}),
        easing: 'linear'
        }, 0);
    
        var shadowAnimation = anime({
            targets: '#sphereGradient',
            x1: '25%',
            x2: '25%',
            y1: '0%',
            y2: '75%',
            duration: 30000,
            easing: 'easeOutQuint',
            autoplay: false
        }, 0);
    
        function init() {
        introAnimation.play();
        breathAnimation.play();
        shadowAnimation.play();
        }
        init();
    })();
    // Sphere animation end

  });
$(window).on( "load", function(){ });