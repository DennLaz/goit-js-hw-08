'use strict';

import throttle from 'lodash.throttle';

const VIDEOPLAYER_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');

const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(e) {
  const currentTime = e.seconds;

  localStorage.setItem(VIDEOPLAYER_TIME_KEY, currentTime);
}

player
  .setCurrentTime(localStorage.getItem(VIDEOPLAYER_TIME_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
