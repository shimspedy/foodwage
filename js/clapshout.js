function sendMessage() {
  var request = new XMLHttpRequest();
  var title = document.getElementsByTagName("title")[0].innerHTML;
  var page = title.split(" | ").slice(0, 1)
  console.log(page)
  document.getElementById("clapText").innerHTML = 'Thank you!'
  request.open("POST",
    "https://discord.com/api/webhooks/720658257986715769/sOYm4oBoAvEvs1FEJWiKMB-ebsAbTPJrGba99VktNZDWjB9UfxU-8LIzmHibymkPBn1k"
  );

  request.setRequestHeader('Content-type', 'application/json');

  var params = {
    username: "",
    avatar_url: "",
    content: "Someone clapped to your '" + page + "' recipe! 👏"
  }

  request.send(JSON.stringify(params));
}
