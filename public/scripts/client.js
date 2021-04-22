/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  if (tweets.length === 1) {
    const $tweet = createTweetElement(tweets[0]);
    $('.tweet-container').prepend($tweet);
  } else {
    const tweetArrayReverse = tweets.reverse();
    
    for (let tweet of tweetArrayReverse) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  }
}


const createTweetElement = function (tweetData) {
  const $tweet = $(`<article class="posted-tweet"></article>`);
  const $header = $(`<header>
  <div class="avatar-name">
  <img src=${tweetData.user.avatars}>
  <span>${tweetData.user.name}</span>
  </div>
  <div>
  <p class="username">${tweetData.user.handle}</p>
  </div>
  </header>`);
  const $main = $(`<main class="posted-text">
  <div>
  <p>${tweetData.content.text}</p>
  </div>
  </main>
  `);
  const $footer = $(`<footer>
  <span class="time-ago-date" datetime="${tweetData.created_at}"></span>
  <div>
  <i class="fas fa-flag like-icon"></i>
  <i class="fas fa-retweet like-icon"></i>
  <i class="fas fa-heart like-icon"></i>
  </div>
  </footer>`);
  $tweet.append($header);
  $tweet.append($main);
  $tweet.append($footer);
  return $tweet;
}


$(function () {
  $(".new-tweet-form").submit(function (event) {
    event.preventDefault();
    let textContent = $("#tweet-text").val();
    if (textContent.length > 140) {
      alert("tweet over 140 words!")
      return;
    } else if (textContent.length === 0) {
      alert("empty! please say something")
      return;
    }
    const formData = $(this).serialize();
    $.ajax({
      url: '/tweets',
      data: formData,
      type: 'POST'
    })
    .done(function () {
      loadNewTweets(() => {
        timeago.render(document.querySelectorAll('.time-ago-date'));
        $( ".new-tweet-form" )[0].reset();
      })
    })
  })
})


const loadTweets = function (callback) {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
      callback();
    });
}
const loadNewTweets = function (callback) {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      const newTweetInfo = [];
      newTweetInfo.push(data[data.length-1])
      renderTweets(newTweetInfo);
      callback();
    });
}


// set the time ago for each tweet
loadTweets(() => {
  timeago.render(document.querySelectorAll('.time-ago-date'));
});
    









