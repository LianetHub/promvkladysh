"use strict";


// import Swiper from 'swiper';
// import { Navigation } from 'swiper/modules';
import Inputmask from 'inputmask/bundle.js';
// import { Fancybox } from '@fancyapps/ui/dist/fancybox.esm.js';
import ymaps from 'ymaps';


import * as devFunctions from "./modules/functions.js";

document.addEventListener("DOMContentLoaded", () => {
    devFunctions.isWebp();
    devFunctions.OS();
    devFunctions.select();
    devFunctions.spollers();
    devFunctions.tooltip.geographyObserver();
    devFunctions.formSubmit();

    if (typeof Fancybox !== "undefined" && Fancybox !== null) {
        Fancybox.bind("[data-fancybox]", {
            dragToClose: false,
        });
    }

    /* menu vars */
    const iconMenu = document.querySelector(".icon-menu");
    const menuBody = document.querySelector(".menu");

    /* event handlers */
    document.addEventListener("click", (e) => {
        const target = e.target;

        if (target.hasAttribute("data-goto")) {
            onMenuLinkClick(target);
        }

        if (document.body.classList.contains('_touch')) {
            if (target.classList.contains('icon-down') && target.classList.contains('menu__link')) {
                e.preventDefault();
                let subMenu = target.nextElementSibling;
                subMenu.classList.toggle('open');
                target.classList.toggle('open-menu');
            }
        }

        if (
            target.closest(".icon-menu") ||
            target.classList.contains("menu__close") ||
            target.classList.contains("menu")
        ) {
            getMenu();
        }

        if (target.closest("[data-tooltip]")) {
            devFunctions.tooltip.showTooltip(target.closest("[data-tooltip]"));
        }

        if (target.closest("[data-modal]")) {
            const popupName = target
                .closest("[data-modal]")
                .getAttribute("href")
                .replace("#", "");
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        }

        if (
            target.classList.contains("popup__close") ||
            target.classList.contains("popup__content")
        ) {
            popupClose(target.closest(".popup"));
            e.preventDefault();
        }

        if (target.hasAttribute('data-ym-goal')) {
            ymGoalFunction(target.dataset.ymGoal);
        }
    });

    // close ESCAPE
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            const popupActive = document.querySelector(".popup.open");
            if (popupActive) {
                popupClose(popupActive);
            }
        }
    });

    document.addEventListener("mouseover", (e) => {
        const target = e.target;

        if (target.closest("[data-tooltip]") || target.closest('.district')) {
            document
                .querySelector(".geography__map")
                .removeAttribute("data-animate");
            devFunctions.tooltip.showTooltip(target.closest("[data-tooltip]"));
        }
    });

    /* event handlers */

    function getMenu() {
        devFunctions.bodyLocking();
        iconMenu.classList.toggle("active");
        menuBody.classList.toggle("active");
    }

    function onMenuLinkClick(target) {
        const idSection = target.getAttribute("href").replace("#", ".");
        const GotoSection = document.querySelector(idSection);

        if (GotoSection) {
            const gotoBlock = GotoSection;
            const gotoBlockValue =
                gotoBlock.getBoundingClientRect().top + scrollY;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth",
            });

            window.onscroll = (e) => {
                let currentScrollOffset =
                    window.pageYOffset || document.documentElement.scrollTop;
                if (
                    Math.trunc(currentScrollOffset) ===
                    Math.trunc(gotoBlockValue)
                ) {
                    gotoBlock.querySelector("input").focus();
                    window.onscroll = null;
                }
            };
        }
    }

    function popupOpen(curentPopup) {
        if (curentPopup) {
            const popupActive = document.querySelector(".popup.open");
            if (popupActive) {
                popupClose(popupActive);
            } else {
                devFunctions.bodyLocking();
            }
            curentPopup.classList.add("open");
        }
    }

    function popupClose(popupActive) {
        popupActive.classList.remove("open");
        devFunctions.bodyLocking();
    }

    // sliders

    if (document.querySelector(".geography-slider")) {
        var slider = new Swiper(".geography-slider", {
            speed: 800,
            loop: true,
            centeredSlides: true,
            updateOnWindowResize: true,
            slideToClickedSlide: true,
            centeredSlides: true,
            // modules: [Navigation],
            navigation: {
                prevEl: ".geography-slider__prev",
                nextEl: ".geography-slider__next",
            },
            breakpoints: {
                320: {
                    direction: "horizontal",
                },
                767.98: {
                    direction: "horizontal",
                    slidesPerView: 5,
                },
                991.98: {
                    direction: "horizontal",
                    slidesPerView: 7,
                },
                1199.98: {
                    slidesPerView: 5,
                    slidesPerGroup: 2,
                    direction: "vertical",
                },
            },
        });

    }

    if (document.querySelector(".desc-slider")) {
        new Swiper(".desc-slider", {
            speed: 800,
            slidesPerView: 3,
            // modules: [Navigation],
            navigation: {
                prevEl: ".desc-slider__prev",
                nextEl: ".desc-slider__next",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 16,
                },
                576.98: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                767.98: {
                    slidesPerView: 2.35,
                    spaceBetween: 24,
                },
                1199.98: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            },
        });
    }

    if (document.querySelectorAll('.desc__article-slider')) {

        document.querySelectorAll('.desc__article-slider').forEach(descArticle => {

            new Swiper(descArticle, {
                slidesPerView: 'auto',
            });

        })

    }

    if (document.querySelectorAll('.sealing__body')) {

        document.querySelectorAll('.sealing__body').forEach(sealingSection => {

            new Swiper(sealingSection, {
                slidesPerView: 'auto',
                spaceBetween: 16,
                breakpoints: {
                    991.98: {
                        slidesPerView: 4.2,
                        spaceBetween: 20
                    },
                    1199.98: {
                        spaceBetween: 20,
                        slidesPerView: 4.2,
                    },
                    1399.98: {
                        spaceBetween: 100,
                        slidesPerView: 4.2,
                    }
                }
            })
        })

    }

    // sliders

    // map
    const map = document.getElementById("map");


    map && ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
        .then(maps => {

            const mapBlock = new maps.Map(map, {
                center: [55.85179306886567, 49.10493149999997],
                zoom: 15,
                controls: [],
            });

            var mark = new maps.Placemark(
                [55.85179306886567, 49.10493149999997],
                {},
                {
                    iconLayout: "default#image",
                    iconImageHref: map.dataset.placemarkSrc,
                    iconImageSize: [60, 80],
                    iconImageOffset: [-34, -80],
                }
            );
            mapBlock.geoObjects.add(mark);
        })
        .catch(error => console.log('Failed to load Yandex Maps', error));;



    /* animante */
    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => {
        const callback = function (entries, observer) {
            if (entries[0].isIntersecting) {
                if (
                    section.dataset.animate == "number" &&
                    !section.classList.contains("visible")
                ) {
                    let valueTo = section.textContent.trim().replace(/ /g, "");

                    animateValue(section, 0, valueTo, 2000);
                }
                section.classList.add("visible");
            } else {
            }
        };

        const companyObserver = new IntersectionObserver(callback);
        companyObserver.observe(section);
    });
    /* animante */

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1
            );
            let result = Math.floor(progress * (end - start) + start);

            obj.innerHTML = numberWithCommas(result);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    document.querySelectorAll('input[type="tel"]').forEach((input) => {
        var im = new Inputmask("+7 (999) 999-99-99");
        im.mask(input);
    });



    document.onselectionchange = function () {

        let selection = document.getSelection();
        let selectedNode = selection.focusNode.parentNode;

        if (!selectedNode.hasAttribute('data-email')) return;

        let selectedData = selection.focusNode.data;

        if (selection.toString() == selectedData.trim()) {
            ym(92253201, 'reachGoal', 'email-copy')
        }
    };

    function ymGoalFunction(eventName) {
        if (!eventName) return;
        let idYM = document.body.dataset.ymId;
        if (!idYM) return;
        ym(idYM, 'reachGoal', eventName)
    }


});
