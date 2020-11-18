var options = Array.apply(0, new Array(localStorage.length)).map(function (o, i) {
  return localStorage.key(i);
});


function removeAllElements(array, elem) {
  var index = array.indexOf(elem);
  while (index > -1) {
    array.splice(index, 1);
    index = array.indexOf(elem);
  }
}
removeAllElements(options, 'goog_pem_mod');
removeAllElements(options, 'google_experiment_mod42');
removeAllElements(options, 'google_experiment_mod36');
removeAllElements(options, 'google_experiment_mod47');
removeAllElements(options, 'google_experiment_mod44');
removeAllElements(options, 'google_experiment_mod37');
removeAllElements(options, 'google_experiment_mod50');
removeAllElements(options, 'google_experiment_mod51');
removeAllElements(options, 'google_experiment_mod34');
removeAllElements(options, 'google_experiment_mod49');
removeAllElements(options, 'google_experiment_mod40');
removeAllElements(options, 'google_experiment_mod48');
removeAllElements(options, 'google_adsense_settings');

console.log(options);

function makeUL() {
  var LIs = '';
  var noFavs = 'Hmm, you must\'ve not favorited anything yet. Maybe you\'ll like <a href="#random-page" onclick="runme()" class="squigglyURL--main">this recipe</a>.';
  var len = options.length;
  if (len === 0) {
    document.getElementById('favorites').innerHTML = noFavs;
    $('#delete').addClass('hidden');
  } else {
    for (var i = 0; i < len; i += 1) {
      LIs += '<li>' + options[i] + '</li>';
    }
    document.getElementById('favorites').innerHTML = '<ul class="page--list">' + LIs + '</ul>';
    $('#delete').removeClass('hidden');
  }
}

makeUL();

var encodedData = btoa(JSON.stringify(localStorage));
var clipboard = new Clipboard('#export', {
  text: function () {
    return document.querySelector('input[type=hidden]').value;
  }
});
clipboard.on('success', function (e) {
  $('#export').html('Copied!');
  e.clearSelection();
});
$("#input-url").val(encodedData);
//safari
if (navigator.vendor.indexOf("Apple") == 0 && /\sSafari\//.test(navigator.userAgent)) {
  $('#export').on('click', function () {
    window.prompt("Copy this link", encodedData);

  });
}

$(document).ready(function () {
  $("#import").click(function () {
    var importString = $("#import-input").val();
    var unencodedData = atob(importString);
    var data = JSON.parse(unencodedData);
    Object.keys(data).forEach(function (k) {
      localStorage.setItem(k, data[k]);
    });
    location.reload();
  });
});

$(document).ready(function () {
  $("#delete").click(function () {
    localStorage.clear();
    location.reload();
  });
});