$(function () {
  // jQuery AJAX request
  $.get('/dishes', appendToList);

  function appendToList(dishes) {
    var list = [];
    var content, dish, img;

    for (var i in dishes) {
      dish = dishes[i];

      content = '<a href="/dishes/'+dish+'">'+dish+'</a> '+
      '<a href="#" data-dish="'+dish+'">x</a><br />';
      img = '<img src="'+dish+'.jpg" id="imgId" alt="'+dish+'"></img>';

      content = content.concat(img);
      list.push($('<li>', { html: content }));
    }

    $('.dish-list').append(list);
  }

  $('form').on('submit', function (event) {
    event.preventDefault();
    var form = $(this);
    var dishData = form.serialize();

    $.ajax({
      type: 'POST', url: '/dishes', data: dishData
    }).done(function (dishName) {
      appendToList([dishName]);
      form.trigger('reset');
    });
  });

  $('.dish-list').on('click', 'a[data-dish]', function (event) {
    if (!confirm('Are you sure?')) {
      return false;
    }
    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE', url: '/dishes/' + target.data('dish')
    }).done(function () {
      target.parents('li').remove();
    });
  });
});
