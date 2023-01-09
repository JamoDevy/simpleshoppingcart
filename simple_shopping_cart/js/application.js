



var updateTotal = function (ele) {
  
      var itemPrice = parseFloat($(ele).children('.price').text());
      var itemQuantity = parseFloat($(ele).find('.quantity input').val());

      var total = itemPrice * itemQuantity;
      $(ele).children('.total').html(total);
      return total;
};


var sum = function(acc, x) { return acc + x; };

var totalValuePrice = function() {

  var itemTotalValue = [];

    $('tbody tr').each(function (i, ele) {
      var total = updateTotal(ele);
      itemTotalValue.push(total);
    });

    var totalPrice = itemTotalValue.reduce(sum);
    //console.log(totalPrice);
    $('#totalPrice').html(totalPrice);
  }
    
  $(document).ready(function () {
        totalValuePrice();

        $(document).on('click', '.btn.remove', function (event) {
          $(this).closest('tr').remove();
          totalValuePrice();
        });
      
      var timeout;

      $(document).on('input', 'tr input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function (){
          totalValuePrice();
        }, 1000);
        
      });

      $('#addItem').on('submit', function(event) {
        event.preventDefault();
        var item = $(this).children('[name=item]').val();
        var price = $(this).children('[name=price]').val();
        var quantity = $(this).children('[name=quantity]').val();
        //console.log(item, price, quantity);
        
        $('tbody').append('<tr>' + 
        '<td class="item">' + item + '</td>' + 
        '<td class="price">' + price + '</td>' + 
        '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' + 
        '<td class="total"></td>' + 
        '<td><button class="btn btn-light btn-sm remove">remove</button></td>' + 
      '</tr>');

        totalValuePrice();
        $(this).children('[name=item]').val('');
        $(this).children('[name=price]').val('');
        $(this).children('[name=quantity]').val('');

      });

      

  });