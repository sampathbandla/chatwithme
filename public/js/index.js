function loadurl() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let UniqueId = this.responseText
        let url = window.location.href + `chat/${UniqueId}`
        document.getElementById("url").value = url;
        // document.getElementById("openbtn").style.display = "block";
        document.getElementById("generateUrl").innerHTML = "Loading..."
        document.getElementById("generateUrl").onclick = ""
        window.setTimeout(() => {
          window.location.href = url;
        }, 1500)
      }
    };
    xhttp.open("GET", "/getnewid", true);
    xhttp.send();
  }

  function gotourl()
  {

  }