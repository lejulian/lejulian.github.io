const AUDIO_STATUS = {
    LOADING: "LOADING",
    PLAYING: "PLAYING",
    BROKEN: "BROKEN",
    PAUSED: "PAUSED",
    // music only
    CHANGING_SOURCE: "CHANGING_SOURCE",
  }
  
  function debounce(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  };
  
  function getRandomIndex(maxIndex) {
      return Math.floor(Math.random() * maxIndex);
  }
  
  function getMusicFileUrl(name) {
      return `/assets/music/${encodeURIComponent(name)}.mp3`;
  }
  
  export {
    AUDIO_STATUS,
    debounce,
      getRandomIndex,
      getMusicFileUrl,
  }