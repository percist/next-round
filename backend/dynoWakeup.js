const fetch = require("node-fetch");

const wakeUpDyno = (url, interval = 25, callback) => {
  const NOW = new Date();
  const [hour, minute, second] = NOW.toLocaleTimeString("en-US").split(/:| /);
  const dayOfWeek = NOW.getDay();
  const milliseconds = interval * 60000;

  // only wakeup dynos between 10AM and 5PM EST M - F
  if ((hour > 10 && hour < 17) && (dayOfWeek > 0 && dayOfWeek < 6)){
    setTimeout(() => {
      try {
        console.log(`setTimeout called.`);
        // HTTP GET request to the dyno's url
        fetch(url).then(() => console.log(`Fetching ${url}.`));
      }
      catch (err) { // catch fetch errors
        console.log(`Error fetching ${url}: ${err.message} 
              Will try again in ${interval} minutes...`);
      }
      finally {
  
        try {
          callback(); // execute callback, if passed
        }
        catch (e) { // catch callback error
          callback ? console.log("Callback failed: ", e.message) : null;
        }
        finally {
          // do it all again
          return wakeUpDyno(url, interval, callback);
        };
      };
    }, milliseconds);
  };
};

module.exports = wakeUpDyno;