/*
 * Load the inital <topic> page data
 * GET /links/topics/
 */
$.ajax({
  type: 'GET',
  url: "mock_json/topic_list.json",
  dataType: 'JSON',
  success: function( data ){
    r = data.result
    for (var i = 0; i < r.length; i++) {
      $('.topic-selection').append("<option value='" + (i + 1) +"'>" + (i + 1) + "</option>")
    }
  }
});

/*
 * 'Controller' methods.
 */

//GET /links/topics/<id>
function viewTopic(topicNum) {
  $('.topic-common_words')[0].innerHTML = '';
  $('.topic-overview')[0].innerHTML = '';
  $.ajax({
    type: 'GET',
    url: "mock_json/topic_list.json",
    dataType: 'JSON',
    success: function( data ){
      //TODO: Replace with real data. This is mock data!
      let node_count = 65;
      let link_count = 98;
      if (topicNum < 10) {
        node_count = 21
        link_count = 16
      } else {
        node_count = 21
        link_count = 24
      }

      let response = {
        "id": topicNum,
        "word_list": data.result[topicNum-1].word_list, // top 20 words,
        "top_3_emails_pairs": ['alice@abc.co--bob@abc.co, alice@abc.co--eve@abc.co, claire@abc.co--eve@abc.co'],
        "node_count": node_count,
        "link_count": link_count,
        "degree": link_count / node_count,
        "density": link_count / ((link_count * link_count-1) / 2)
      }

      // Build the most common list of words
      let wl = response.word_list;
      for (var i = 0; i < wl.length; i++) {
        if (wl.length-1 == i) {
          $('.topic-common_words').append("<span>" + wl[i] + "</span>")
        } else {
          $('.topic-common_words').append("<span>" + wl[i] + ", </span>")
        }
      }
      // Build the topic overview
      let el = response.top_3_emails_pairs;
      emailRow = "<br>";
      for (var i = 0; i < el.length; i++) {
        emailRow += ("<span>" + el[i] + "</span>")
      }
      $('.topic-overview').append("<h5>ID: " + response['id'] + "</h5>")
      $('.topic-overview').append("<h5>Top 3 Email Pairs: " + emailRow + "</h5>")
      $('.topic-overview').append("<h5>Node Count: " + response['node_count'] + "</h5>")
      $('.topic-overview').append("<h5>Link Count: " + response['link_count'] + "</h5>")
      $('.topic-overview').append("<h5>Degree: " + response['degree'] + "</h5>")
      $('.topic-overview').append("<h5>Density: " + response['density'] + "</h5>")
    }
  });

}

/*
 * Business Logic
 */
$('.viewTopicBtn').click(function(){
  topicNum = $('#viewTopic').val()
  viewTopic(topicNum)
})
