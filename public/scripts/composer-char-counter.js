$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").keyup(function(){
    $(this).change();
    let text = $(this).val();
    let count = 140 - text.length;
    $('output[for='+  this.id  +']').html(count);
    if (count < 0) {
      $('output[for='+  this.id  +']').addClass('text-over-limit')
    }
    console.log(count)
    
  
  });
});