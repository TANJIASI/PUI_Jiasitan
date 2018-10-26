$(document).ready(function(){
    var name = null;
    var glazing = null;
    var price = null;
    var count = null;

    $("#dialog").hide();
    $("#clear-cart").click(function(){
        clearCart();
        displayCart();
    });
    $(".add-to-cart").click(function(event){
        event.preventDefault();
        var name = $(this).attr("data-name");
        var price = Number($(this).attr("data-price"));
        addItemToCart(name,price,1);
        displayCart();
    });

    $("#show-cart").on("click",".delete-item",function(event){
        var name = $(this).attr("data-name");
        removeItemFromCartAll(name);
        displayCart();
    });
    $("#show-cart").on("click",".subtract-item",function(event){
        var name = $(this).attr("data-name");
        removeItemFromCart(name);
        displayCart();
    });
    $("#show-cart").on("click",".add-item",function(event){
        var name = $(this).attr("data-name");
        addItemToCart(name,0,1);
        displayCart();
    });

    // get type
    $(".glazing").click(function(){
        glazing = $(this).attr("data-name");
        if(glazing == "None"){
            glazing = "no glazing";
        }
        console.log("glazing", glazing);
        $(".glazing").css({"border":"2px solid #d6d6d6", "color":"black", "background-color":"white"});
        $(this).css({"border":"2px solid #d6d6d6", "color":"white", "background-color":"gray"});
    });
    // get count
    $(".count").click(function(){
        count = $(this).attr("data-name");
        count = parseInt(count);
        console.log("count", count);
        $(".count").css({"border":"2px solid #d6d6d6", "color":"black", "background-color":"white"});
        $(this).css({"border":"2px solid #d6d6d6", "color":"white", "background-color":"gray"});
    });
    // get price
    $("#addtocart").click(function (event) {
        name = "Walnut Roll";
        price = 4.99;
        // store to local storage
        event.preventDefault();
        if(count==null){
            alert("Please select number of items needed!");
            $(".count").css({"border":"2px solid red", "color":"red", "background-color":"white"});
        }else{
            var getResponse = function(){
                addItemToCart(name, glazing, price, count);
                $( this ).dialog( "close" );
            };
            var cancel = function(){
            };
            var value="You selected " + count +" "+ name + "s. The items will be added to your cart.";
            $("#dialog").text(value);
            $("#dialog").dialog({buttons:{OK:getResponse, Cancel:cancel}});
        }
    });
    var shoppingCart = {};
    shoppingCart.cart = [];
    loadCart();
    displayCart();
});

var Item = function(name, glazing, price, count) {
    this.name = name;
    this.glazing = glazing;
    this.price = price;
    this.count = count;
};
function displayCart(){
    var cartArray = listCart();
    var output = "";
    for (var i in cartArray){
        output += "<div class='cart-item'>"
            +"<img src='./images/walnut.jpg' style='width:100px;'>"
            +"<p>"+cartArray[i].name+"</p><br>"
            +"<p>"+cartArray[i].glazing+"</p><br>"
            +"<button class='subtract-item' data-name='"
            +cartArray[i].name+"'>-</button>"
            +" "+cartArray[i].count
            +"<button class='add-item' data-name='"
            +cartArray[i].name+"'>+</button>"
            +" x "+cartArray[i].price
            +" = "+cartArray[i].total
            +"<button class='delete-item' data-name='"
            +cartArray[i].name+"'> Delete </button>"
            +"</div>";
    }
    $("#show-cart").html(output);
    $("#total-cart").html(totalItemCost());
}
function listCart(){
    var cartCopy = [];
    for (var i in cart){
        var item = cart[i];
        var itemCopy = {};
        for (var j in item){
            itemCopy[j] = item [j];
        }
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}
function saveCart(){
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
function loadCart(){
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
}
function removeItemFromCartAll(name){
    for (var i in cart){
        if (cart[i].name === name){
            cart.splice(i,1);
            break;
        }
    }
    saveCart();
}
