const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
let timeout;

function circleFlatMouse() {
  clearTimeout(timeout);
  let xScale = 1;
  let yScale = 1;
  let xPrev = 0;
  let yPrev = 0;
  window.addEventListener("mousemove", (detail) => {
    xScale = gsap.utils.clamp(0.8, 1.2, detail.clientX - xPrev);
    yScale = gsap.utils.clamp(0.8, 1.2, detail.clientY - yPrev);
    xPrev = detail.clientX;
    yPrev = detail.clientY;

    followMousePointer(xScale, yScale);
    timeout = setTimeout(() => {
      document.querySelector("#miniCircle").style.transform = `translate(${
        detail.clientX
      }px,${detail.clientY}px)  scale(${1},${1})`;
    });
  });
}

function firstPageAnim() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      duration: 2,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: 0.2,
    })
    .from("#heroFooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}
circleFlatMouse();

function followMousePointer(xScale, yScale) {
  window.addEventListener("mousemove", (details) => {
    document.querySelector(
      "#miniCircle"
    ).style.transform = `translate(${details.clientX}px,${details.clientY}px)  scale(${xScale},${yScale})`;
  });
}
firstPageAnim();
followMousePointer();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });
});

document.querySelectorAll(".elem").forEach((elem) => {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mousemove", (detail) => {
    var diff = detail.clientY - elem.getBoundingClientRect().top;
    diffrot = detail.clientX - rotate;
    rotate = detail.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power1,
      top: diff,
      left: detail.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
});
