var button = document.getElementById("#button");
var textarea = document.getElementById("#quotext");
var quote = '', author = '';

function inIframe () {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function openURL(url){
  window.open(url, "Share", "width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0");
}

$("button").click(function() {
    $("button > i").toggleClass('fa-quote-right');
    $("button > i").toggleClass('fa-quote-left');
});

function randomQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
    Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=",
    success: function(r) {
      if (typeof r === "string") {
       r = JSON.parse(r);
      }
      quote = r.quote;
      author = r.author;
      if(inIframe())
      {
        $("#tweetQuote").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent('"' + quote + '" ' + author));
        $("#tumblrQuote").attr("href", "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="+encodeURIComponent(author)+"&content=" + encodeURIComponent(quote)+"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button");
      }
      $("textarea").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $("#quotext").text(r.quote);
        });

      $("#author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: .8
          }, 500);
          $("#author").text(r.author);
        });
       }
      });
      }

$(document).ready(function() {
  // randomQuote();
  $("#button").on("click", randomQuote)
  $("#tweet").on("click", function() {
    if(!inIframe()) {
      openURL("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent('"' + quote + '" ' + author));
    }
  });
 }
);
