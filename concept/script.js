const circle = document.getElementById("circle");

const observer = new IntersectionObserver((items) => {
    const trakingInfo = items[0];

    if (trakingInfo.isIntersecting) {
        console.log('Circle is visible')
        observer.disconnect();
    } else {
        console.log('Circle is not visible');

    }
})

observer.observe(circle);