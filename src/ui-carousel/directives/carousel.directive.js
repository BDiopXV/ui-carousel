angular.module('ui.carousel.directives')
.directive('uiCarousel', ['$compile', '$templateCache', '$sce',
  function($compile, $templateCache, $sce) {

    return { restrict: 'AE',
      scope: true,
      bindToController: {
        name: '=?',
        slides: '=',
        show: '=?slidesToShow',
        scroll: '=?slidesToScroll',
        classes: '@',
        fade: '=?',
        onChange: '=?',
        disableArrow: '=?',
        autoplay: '=?',
        autoplaySpeed: '=?',
        cssEase: '=?',
        speed: '=?',
        infinite: '=?',
        arrows: '=?',
        dots: '=?',
        initialSlide: '=?',

        // Method
        onBeforeChange: '&',
        onAfterChange: '&',
        onInit: '&',
      },
      compile(el) {
        const template = angular.element(
          $templateCache.get('ui-carousel/carousel.template.html')
        );

        // dynamic injections to override the inner layers' components
        const injectComponentMap = {
          'carousel-item': '.carousel-item',
          'carousel-prev': '.carousel-prev',
          'carousel-next': '.carousel-next',
        };

        const templateInstance = template.clone();
        angular.forEach(injectComponentMap, (innerSelector, outerSelector) => {
          const outerElement = el[0].querySelector(outerSelector);
          if (outerElement) {
            angular
              .element(templateInstance[0].querySelector(innerSelector))
              .html(outerElement.innerHTML);
          }
        });

        return ($scope, el) => {
          // Compile
          const compiledElement = $compile(templateInstance)($scope);
          el.addClass('ui-carousel').html('').append(compiledElement);
        };
      },

      controller: 'CarouselController',
      controllerAs: 'ctrl'
    };
  }]);
