/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
//function to make the input from user safe for the server
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function (tweets) {
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
    

//create a template to post each tweet 
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
  <p>${escape(tweetData.content.text)}</p>
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

//actions after DOM is ready
$(function () {
  //to load all the exist tweet in database
  loadTweets();
  //post a tweet after user click submit button
  $(".new-tweet-form").submit(function (event) {
    event.preventDefault();
    let textContent = $("#tweet-text").val();
    if (textContent.length > 140) {
      $('#error-message-over').slideDown();
      return;
    } else if (textContent.length === 0) {
      $('#error-message-empty').slideDown();
      return;
    }
    //send data to server with ajax  and send a get request after 
    const formData = $(this).serialize();
    $.ajax({
      url: '/tweets',
      data: formData,
      type: 'POST'
    })
    .then(loadTweets)
    .then(() => {
      $("#tweet-text").val('');
      $('.counter').html(140);
    })
  })
})

//function to request the data in database
const loadTweets = function () {
  $('.tweet-container').empty();
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
      timeago.render(document.querySelectorAll('.time-ago-date'));
    });
}

    









