
function ibg(){

		let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}

ibg();
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
$(document).ready(function(){
  $('.menu__icon').click(function(event){
    $('.menu__icon,.menu__body').toggleClass('active');
    $('body').toggleClass('lock');
  });
});
//var isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
if (window.innerWidth <= 991) {
  let menuParents = document.querySelectorAll('.catalog-list__item_parent');
  for (let index = 0; index < menuParents.length; index++) {
    const menuParent = menuParents[index];
    menuParent.addEventListener("click", function (e) {
      menuParent.classList.toggle('_active');
      e.preventDefault();
    });
  }
} else {
  let menuParents = document.querySelectorAll('.catalog-list__item_parent');
  for (let index = 0; index < menuParents.length; index++) {
    const menuParent = menuParents[index];
    menuParent.addEventListener("mouseenter", function (e) {
      menuParent.classList.add('_active');
    });
    menuParent.addEventListener("mouseleave", function (e) {
      menuParent.classList.remove('_active');
    });
  }
}

let menuPageBurger = document.querySelector('.catalog-title__burger');
//let menuPageBody = document.querySelector('.catalog-list');
menuPageBurger.addEventListener("click", function (e) {
  menuPageBurger.classList.toggle('_active');
  //menuPageBody.classList.toggle('_active');
});

$( "#clickme" ).click(function() {
  $( "#book" ).slideToggle( "slow", function() {
    // Animation complete.
  });
});
$( "#search-title" ).click(function() {
  $( "#search-popap" ).slideToggle( "slow", function() {
    $('#search-title').toggleClass('active');
  });
});

let checkboxCategories = document.querySelectorAll('.search-popap__checkbox');
let searchSelect = document.querySelector('.search-title')
for (let index = 0; index < checkboxCategories.length; index++) {
  const checkboxCategory = checkboxCategories[index];
  checkboxCategory.addEventListener("change", function (e) {
    checkboxCategory.classList.toggle('_active');

    let checkboxActiveCategories = document.querySelectorAll('.search-popap__checkbox._active');

    if (checkboxActiveCategories.length > 0) {
      searchSelect.classList.add('_categories');
      let searchQuantity = searchSelect.querySelector('.search-title__last');
      searchQuantity.innerHTML = searchQuantity.getAttribute('data-text') + ' ' + checkboxActiveCategories.length;
    } else {
      searchSelect.classList.remove('_categories');
    }
  });
}
if (document.querySelector('.main-slider')) {
  let main_slider = new Swiper('.main-slider', {
    /*
    effect: 'fade',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    */
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    autoHeight: true,
    // spaceBetween: 0,
  
    speed: 800,
    //touchRatio: 0,
    // simulateTouch: false,
    // loop: true,
    // preloadImages: false,
    //lazy: true,
    //Dotts
    pagination: {
      el: '.swiper-dott',
      clickable: true,
    },
    //Arrows
    /*navigation: {
      nextEl: '.control-slider__arrow_next',
      prevEl: '.control-slider__arrow_prev',
    },*/
    /*breakpoints: {
      // when window width is >= 320px
      320: {
        autoHeight: true,
      },
      // when window width is >= 480px
      768: {
        autoHeight: false,
      },
    },*/
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });
  let mainsliderImages = document.querySelectorAll('.swiper-slide__img');
  let mainsliderDotts = document.querySelectorAll('.swiper-dott .swiper-pagination-bullet');

  for (let index = 0; index < mainsliderImages.length; index++) {
    const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
    mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
  }
}
if (document.querySelector('.product-slider')) {
  let product_slider = new Swiper('.product-slider', {
    /*
    effect: 'fade',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    */
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    autoHeight: true,
    // spaceBetween: 0,
  
    speed: 800,
    //touchRatio: 0,
    // simulateTouch: false,
    // loop: true,
    // preloadImages: false,
    //lazy: true,
    //Dotts
    pagination: {
      el: '.product-header__item',
      type: 'fraction',
    },
    //Arrows
    navigation: {
      nextEl: '.product-header__arrow_next',
      prevEl: '.product-header__arrow_prev',
    },
    /*breakpoints: {
      // when window width is >= 320px
      320: {
        autoHeight: true,
      },
      // when window width is >= 480px
      768: {
        autoHeight: false,
      },
    },*/
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });
}