export const tooltip = () => {
    const tooltipBtns = document.querySelectorAll("[data-tooltip]");

    if (tooltipBtns) {
        tooltipBtns.forEach((tooltipBtn) => {
            tooltipBtn.addEventListener("click", (e) => showTooltip(e.target));
        });

        // const tooltipCloseBtns = document.querySelectorAll(".tooltip__close");
        // tooltipCloseBtns.forEach((tooltipCloseBtn) => {
        //     tooltipCloseBtn.addEventListener("click", () => {
        //         hideTooltips();
        //     });
        // });

        function showTooltip(target) {
            hideTooltips();

            let btnElem = target.closest("[data-tooltip]");
            let tooltip = document.getElementById(btnElem.dataset.tooltip);

            tooltip.classList.add("tooltip_visible");

            getCoords(btnElem, tooltip);

            window.addEventListener("resize", () =>
                getCoords(btnElem, tooltip)
            );
        }

        function hideTooltips() {
            window.removeEventListener("resize", () =>
                getCoords(target, tooltip)
            );
            let tooltips = document.querySelectorAll(".tooltip");
            tooltips.forEach((tooltip) => {
                tooltip.classList.remove("tooltip_visible");
            });
        }

        function getCoords(target, coordItem) {
            let coords = target.getBoundingClientRect();

            let left = coords.left - 6;

            if (left + coordItem.offsetWidth > window.innerWidth) {
                left = coords.left + coords.width - coordItem.offsetWidth;
                coordItem.classList.add("tooltip_left");
            } else {
                coordItem.classList.remove("tooltip_left");
            }

            let top = coords.top + scrollY - 6;

            coordItem.style.left = left + "px";
            coordItem.style.top = top + "px";
        }
    }
};
