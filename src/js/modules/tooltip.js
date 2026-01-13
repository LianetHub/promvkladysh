export function geographyObserver() {
    const geography = document.querySelector(".geography__slider");
    const districts = document.querySelectorAll(".district");

    if (geography && districts) {
        geography.addEventListener("mouseenter", () => {
            document.querySelector(".map").classList.add("hidden-tooltips");
            hiddenAllAreas();
        });

        geography.addEventListener("mouseleave", () => {
            document.querySelector(".map").classList.remove("hidden-tooltips");
            hiddenAllAreas();
        });

        districts.forEach((district) => {
            district.addEventListener("mouseenter", () => {
                document.querySelector(".map").classList.add("hidden-tooltips");
                hiddenAllAreas();
                showTooltip(district);
            });

            district.addEventListener("mouseleave", () => {
                document
                    .querySelector(".map")
                    .classList.remove("hidden-tooltips");
                hiddenAllAreas();
            });
        });
    }
}

let resizeHandler;

export function showTooltip(target) {
    hiddenAllAreas();

    if (target === null) return;

    const area = target.closest("[data-tooltip]")
        ? document.getElementById(
            target.closest("[data-tooltip]").dataset.tooltip
        )
        : target;
    const tooltipTitle = area.getAttribute("title");

    let tooltip = document.createElement("div");
    tooltip.classList.add("disctict-tooltip");
    tooltip.innerHTML = tooltipTitle;
    document.querySelector(".geography__map").appendChild(tooltip);

    area.classList.add("district-active");

    getCoords(area, tooltip);

    window.addEventListener(
        "resize",
        (resizeHandler = () => getCoords(area, tooltip))
    );
}

function getCoords(area, tooltip) {
    let coords = area.getBoundingClientRect();

    let left = coords.left + coords.width / 2;
    let top = coords.top + scrollY + coords.height / 2;

    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
}

function hiddenAllAreas() {
    window.removeEventListener("resize", resizeHandler);

    if (document.querySelector(".disctict-tooltip")) {
        document.querySelector(".disctict-tooltip").remove();
    }

    const arms = document.querySelectorAll(".geography-slider__slide");
    arms.forEach((arm) => arm.classList.remove("active-arm"));

    const districts = document.querySelectorAll(".district");
    districts.forEach((district) =>
        district.classList.remove("district-active")
    );
}
