const transformFactor = 0.4;
const shadowFactor = 2.0;

// Functions
const scale = (n, min, max) => n * (max - min) + min;
const calculateAngle = (x, y, width, height) => Math.atan2(x - (width / 2), -(y - (height / 2))) * (180 / Math.PI);

// TODO: Use requestAnimationFrame?
// TODO: Make interface for matrix transformation
// TODO: Make interface for the component with options
//       for easy customization.

window.addEventListener('dom-change', function(){
    const $square = $('.square');

    let squareW = $square.width();
    let squareH = $square.height();

    $(document).on('mousemove', function (e) {
        const x = e.pageX - $square.offset().left;
        const y = e.pageY - $square.offset().top;

        const scaledX = scale(x / squareW, -1, 1);
        const scaledY = scale(y / squareH, -1, 1);

        const maxX = Math.atan2(15, squareH * .5 * 180 / Math.PI);
        const maxY = Math.atan2(15, squareW * .5 * 180 / Math.PI);
        const opacity = Math.max(Math.abs(scaledX / maxX), Math.abs(scaledY / maxY));

        const angle = calculateAngle(x, y, squareW, squareH);

        // FEATURE: Use radial gradient for better shadow.

        $square.css({
            transform: `
            matrix3d(
                1, 0, ${-scaledX * transformFactor}, 0,
                0, 1, ${-scaledY * transformFactor}, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            )`
        });
    });
});

//$square.on('mouseleave', function (e) {
//    $(this).css({
//        transform: `matrix3d(
//        1, 0, 0, 0,
//        0, 1, 0, 0,
//        0, 0, 1, 0,
//        0, 0, 0, 1
//    )`,
//    backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))`,
//    boxShadow: `0px 0px 0px rgba(0, 0, 0, 0)`
//});
//});