export const displayPointerCoordinates = () => {
  // PROPERTIES
  let xAxis;
  let yAxis;
  let pointerType;
  let activeStatus = false;
  // FUNCTIONS
  const activateDPC = () => {
    if (window.PointerEvent) {
      window.addEventListener('pointerdown', handleStartDPC, true);
      window.addEventListener('pointerup', handleEndDPC, true);
      window.addEventListener('pointercancel', handleEndDPC, true);
    } else {
      window.addEventListener('touchstart', handleStartDPC, true);
      window.addEventListener('touchend', handleEndDPC, true);
      window.addEventListener('touchcancel', handleEndDPC, true);
      window.addEventListener('mousedown', handleStartDPC, true);
      window.addEventListener('mouseup', handleEndDPC, true);
    }
  };
  const displayCoordinates = () => {
    const pointCoordinate = document.createElement('p');
    pointCoordinate.classList.add('pointCoordinate')
    pointCoordinate.style.background = 'rgba(255,255,255,0.65)';
    pointCoordinate.style.display = 'inline-block';
    pointCoordinate.style.fontSize = '8px';
    pointCoordinate.style.left = '0';
    pointCoordinate.style.letterSpacing = '0.025em';
    pointCoordinate.style.padding = '8px';
    pointCoordinate.style.pointerEvents = 'none';
    pointCoordinate.style.position = 'absolute';
    pointCoordinate.style.top = '0';
    pointCoordinate.style.userSelect = 'none';
    pointCoordinate.innerHTML = `X: ${xAxis} / Y: ${yAxis} / ${pointerType}`;
    document.body.insertAdjacentElement('afterbegin', pointCoordinate);
    setTimeout(() => {
      pointCoordinate.remove();
      activeStatus = !activeStatus;
    }, 1500);
  };
  const handleEndDPC = () => {
    document.body.style = '';
  };
  const handleStartDPC = (e) => {
    document.body.style.overflow = 'hidden';
    if (activeStatus === false) {
      activeStatus = !activeStatus;
      pointerType = e.pointerType;
      if (e.touches && e.touches.length > 1) {
        return;
      } else if (window.PointerEvent && e.targetTouches) {
        xAxis = Math.round(e.changedTouches[0].clientX);
        yAxis = Math.round(e.changedTouches[0].clientY);
      } else {
        xAxis = Math.round(e.clientX);
        yAxis = Math.round(e.clientY);
      }
      displayCoordinates();
    }
  };
  // METHOD
  activateDPC();
};











export const displaySwipeDirection = () => {
  // PROPERTIES
  const swipeCoordinate = document.createElement('p');
  const compassContainer = document.createElement('div');
  let arrowSVG;
  let pointerIsDown = false;
  let swipeAngle;
  let swipeDirection;
  let xEnd;
  let xStart;
  let yEnd;
  let yStart;
  // FUNCTIONS
  const activateDSD = () => {
    if (window.PointerEvent) {
      window.addEventListener('pointerdown', handleStartDSD, true);
      window.addEventListener('pointerup', handleEndDSD, true);
    } else {
      window.addEventListener('touchstart', handleStartDSD, true);
      window.addEventListener('touchend', handleEndDSD, true);
      window.addEventListener('touchcancel', handleEndDSD, true);
      window.addEventListener('mousedown', handleStartDSD, true);
      window.addEventListener('mouseup', handleEndDSD, true);
    }
  };
  const displayCoordinates = () => {
    swipeCoordinate.style.background = 'rgba(255,255,255,0.65)';
    swipeCoordinate.style.display = 'inline-block';
    swipeCoordinate.style.fontSize = '8px';
    swipeCoordinate.style.left = '0';
    swipeCoordinate.style.letterSpacing = '0.025em';
    swipeCoordinate.style.maxHeight = window.innerHeight;
    swipeCoordinate.style.maxWidth = '100vw';
    swipeCoordinate.style.padding = '8px';
    swipeCoordinate.style.pointerEvents = 'none';
    swipeCoordinate.style.position = 'absolute';
    swipeCoordinate.style.top = '0';
    swipeCoordinate.style.userSelect = 'none';
    swipeCoordinate.style.zIndex = '9999';
    swipeCoordinate.innerHTML = `X: ${xEnd} / Y: ${yEnd} / DIRECTION: ${swipeDirection} (${swipeAngle}&deg;)`;
    document.body.insertAdjacentElement('afterbegin', swipeCoordinate);
  };
  const displaySwipeCompass = () => {
    compassContainer.style.alignItems = 'center';
    compassContainer.style.background = 'rgba(255,255,255,0.65)';
    compassContainer.style.borderRadius = '999px';
    compassContainer.style.bottom = '0';
    compassContainer.style.boxShadow = '0 0 8px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.08)';
    compassContainer.style.display = 'flex';
    compassContainer.style.height = '140px';
    compassContainer.style.justifyContent = 'center';
    compassContainer.style.left = `${xStart}px`;
    compassContainer.style.maxHeight = window.innerHeight;
    compassContainer.style.maxWidth = '100vw';
    compassContainer.style.pointerEvents = 'none';
    compassContainer.style.position = 'absolute';
    compassContainer.style.right = '0';
    compassContainer.style.top = `${yStart}px`;
    compassContainer.style.transform = 'translate(-50%, -50%)';
    compassContainer.style.userSelect = 'none';
    compassContainer.style.width = '140px';
    compassContainer.style.zIndex = '9999';
    compassContainer.innerHTML = arrowSVG;
    document.body.insertAdjacentElement('afterbegin', compassContainer);
  };
  const handleEndDSD = (e) => {
    pointerIsDown = !pointerIsDown;
    swipeCoordinate.remove();
    compassContainer.remove();
    document.body.style = '';
    window.removeEventListener('pointermove', handleMoveDSD, true);
    window.removeEventListener('touchmove', handleMoveDSD, true);
    window.removeEventListener('mousemove', handleMoveDSD, true);
  };
  const handleMoveDSD = (e) => {
    if (pointerIsDown) {
      if (e.touches && e.touches.length > 1) {
        return;
      } else if (window.PointerEvent && e.targetTouches) {
        xEnd = Math.round(e.changedTouches[0].clientX);
        yEnd = Math.round(e.changedTouches[0].clientY);
      } else {
        xEnd = Math.round(e.clientX);
        yEnd = Math.round(e.clientY);
      }
      swipeAngle = Math.round(Math.atan2(yStart - yEnd, xStart - xEnd) * 180 / Math.PI);
      hidePointCoordinate();
      textualizeAngle();
      displayCoordinates();
      displaySwipeCompass();
    }
  };
  const handleStartDSD = (e) => {
    window.addEventListener('pointermove', handleMoveDSD, true);
    window.addEventListener('touchmove', handleMoveDSD, true);
    window.addEventListener('mousemove', handleMoveDSD, true);
    document.body.style.overflow = 'hidden';
    pointerIsDown = !pointerIsDown;
    if (e.touches && e.touches.length > 1) {
      return;
    } else if (window.PointerEvent && e.targetTouches) {
      xStart = Math.round(e.changedTouches[0].clientX);
      yStart = Math.round(e.changedTouches[0].clientY);
    } else {
      xStart = Math.round(e.clientX);
      yStart = Math.round(e.clientY);
    }
  };
  const hidePointCoordinate = () => {
    const pointCoordinateDOM = document.querySelector('.pointCoordinate');
    if (pointCoordinateDOM) pointCoordinateDOM.remove();
  };
  const textualizeAngle = () => {
    const up = swipeAngle >= 67.5 && swipeAngle <= 112.5;
    const upperRight = swipeAngle > 112.5 && swipeAngle < 157.5;
    const right = (swipeAngle >= 157.5 && swipeAngle <= 180) || (swipeAngle >= -180 && swipeAngle <= -157.5);
    const bottomRight = swipeAngle > -157.5 && swipeAngle < -112.5;
    const down = swipeAngle >= -112.5 && swipeAngle <= -67.5;
    const bottomLeft = swipeAngle > -67.5 && swipeAngle < -22.5;
    const left = (swipeAngle >= -22.5 && swipeAngle <= 22.5);
    const upperLeft = swipeAngle > 22.5 && swipeAngle < 67.5;
    const angleArray = [up, upperRight, right, bottomRight, down, bottomLeft, left, upperLeft];
    const angleIndex = angleArray.indexOf(true);
    switch (angleIndex) {
      case 0:
        swipeDirection = 'UP';
        arrowSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="100" viewBox="0 0 56 100">
            <g fill="none" fill-rule="evenodd" transform="translate(-23)">
              <polygon fill="#FF00A6" points="36.889 44.444 23 44.444 50.778 0 78.556 44.444 64.667 44.444 64.667 100 36.889 100"/>
              <rect width="100" height="100"/>
            </g>
          </svg>
        `;
        break;
      case 1:
        swipeDirection = 'UPPER-RIGHT';
        arrowSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81">
            <g fill="none" fill-rule="evenodd" transform="translate(-10 -9)">
              <polygon fill="#FF00A6" points="49.284 30.606 39.463 20.785 90.532 9 78.747 60.069 68.926 50.248 29.642 89.532 10 69.89"/>
              <rect width="100" height="100"/>
            </g>
          </svg>
        `;
        break;
      case 2:
        swipeDirection = 'RIGHT';
        arrowSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56">
            <g fill="none" fill-rule="evenodd" transform="translate(0 -22)">
              <polygon fill="#FF00A6" points="55.556 35.889 55.556 22 100 49.778 55.556 77.556 55.556 63.667 0 63.667 0 35.889"/>
              <rect width="100" height="100"/>
            </g>
          </svg>
        `;
        break;
      case 3:
        swipeDirection = 'BOTTOM-RIGHT';
        arrowSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81">
            <g fill="none" fill-rule="evenodd" transform="translate(-10 -9)">
              <polygon fill="#FF00A6" points="68.926 48.284 78.747 38.463 90.532 89.532 39.463 77.747 49.284 67.926 10 28.642 29.642 9"/>
              <rect width="100" height="100"/>
            </g>
          </svg>
        `;
        break;
      case 4:
        swipeDirection = 'DOWN';
        arrowSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="100" viewBox="0 0 56 100">
            <g fill="none" fill-rule="evenodd" transform="translate(-22)">
              <polygon fill="#FF00A6" points="63.667 55.556 77.556 55.556 49.778 100 22 55.556 35.889 55.556 35.889 0 63.667 0"/>
              <rect width="100" height="100"/>
            </g>
          </svg>
        `;
        break;
      case 5:
        swipeDirection = 'BOTTOM-LEFT';
        arrowSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81">
            <g fill="none" fill-rule="evenodd" transform="translate(-10 -9)">
              <polygon fill="#FF00A6" points="51.248 67.926 61.069 77.747 10 89.532 21.785 38.463 31.606 48.284 70.89 9 90.531 28.642"/>
              <rect width="100" height="100"/>
            </g>
          </svg>
        `;
        break;
      case 6:
        swipeDirection = 'LEFT';
        arrowSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56">
            <g fill="none" fill-rule="evenodd" transform="translate(0 -22)">
              <polygon fill="#FF00A6" points="44.444 63.667 44.444 77.556 0 49.778 44.444 22 44.444 35.889 100 35.889 100 63.667"/>
              <rect width="100" height="100"/>
            </g>
          </svg>
        `;
        break;
      case 7:
        swipeDirection = 'UPPER-LEFT';
        arrowSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81">
            <g fill="none" fill-rule="evenodd" transform="translate(-10 -9)">
              <polygon fill="#FF00A6" points="31.606 50.248 21.785 60.069 10 9 61.069 20.785 51.248 30.606 90.532 69.89 70.89 89.532"/>
              <rect width="100" height="100"/>
            </g>
          </svg>
        `;
        break;
      default: console.error('Switch case error!');;
    };
  };
  // METHOD
  activateDSD();
};











export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = setTimeout(() => { inThrottle = false }, limit);
    }
  }
};
