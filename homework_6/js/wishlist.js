$(document).ready(function(){
    var name = null;
    var glazing = null;
    var price = null;
    var count = null;
    var pack = null;
    var shoppingCart = {};
    shoppingCart.cart = [];

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
        var cart_item = $(this).parent();
        console.log(cart_item.children(".name").text());
        var item_name = cart_item.children(".name").text();
        var item_glazing = cart_item.children(".glazing").text();
        var item_pack = cart_item.children(".pack").text();
        item_pack = parseInt(item_pack);
        removeItemFromCartAll(item_name, item_glazing, item_pack);
        displayCart();
    });
    $("#show-cart").on("click",".subtract-item",function(event){
        // var item_name = $(this).attr("data-name");
        var cart_item = $(this).parent();
        console.log(cart_item.children(".name").text());
        var item_name = cart_item.children(".name").text();
        var item_glazing = cart_item.children(".glazing").text();
        var item_pack = cart_item.children(".pack").text();
        item_pack = parseInt(item_pack);
        removeItemFromCart(item_name, item_glazing, item_pack);
        displayCart();
    });
    $("#show-cart").on("click",".add-item",function(event){
        // console.log($(this).parent());
        var cart_item = $(this).parent();
        console.log(cart_item.children(".name").text());
        var item_name = cart_item.children(".name").text();
        var item_glazing = cart_item.children(".glazing").text();
        var item_price = cart_item.children(".price").text();
        var item_pack = cart_item.children(".pack").text();

        item_price = parseFloat(item_price);
        // item_pack = parseInt(item_pack);
        console.log(item_pack);

        // var name = $(this).attr("data-name");
        addItemToCart(item_name, item_glazing, item_price, item_pack, 1);
        displayCart();
    });

    // get type
    $(".glazing").click(function(){
        glazing = $(this).attr("data-name");
        if(glazing == "None"){
            glazing = "None glazing";
        }
        console.log("glazing", glazing);
        $(".glazing").css({"border":"2px solid #d6d6d6", "color":"black", "background-color":"white"});
        $(this).css({"border":"2px solid #d6d6d6", "color":"white", "background-color":"gray"});
    });
    // get count
    $(".pack").click(function(){
        pack = $(this).attr("data-pack");
        pack = parseInt(pack);
        console.log("pack", pack);
        $(".pack").css({"border":"2px solid #d6d6d6", "color":"black", "background-color":"white"});
        $(this).css({"border":"2px solid #d6d6d6", "color":"white", "background-color":"gray"});
    });
    // get price
    $("#addtowishlist").click(function (event) {
        name = $(".pagehead h2").text();
        price = $(".pagehead h3").text();
        price = price.replace(/[^0-9.]/ig, "");
        console.log("price:", price);
        console.log(name);
        count = 1;
        // store to local storage
        event.preventDefault();
        if(pack==null){
            alert("Please select number of items needed!");
            $(".pack").css({"border":"2px solid red", "color":"red", "background-color":"white"});
        }else{
            var getResponse = function(){
                console.log("Get Response Done");
                console.log(name);
                console.log(glazing);
                console.log(price);
                console.log(pack);
                console.log(count);
                addItemToCart(name, glazing, price, pack, count);
                $( this ).dialog( "close" );
            };
            var cancel = function(){
                $( this ).dialog( "close" );
            };
            var value="You are adding " + pack +" "+glazing +" "+ name + "s to your cart!";
            $("#dialog").text(value);
            $("#dialog").dialog({buttons:{OK:getResponse, Cancel:cancel}});
        }
    });
    $(".method").click(function(){
        $(".method").css({"border":"2px solid #d6d6d6", "color":"black", "background-color":"white"});
        $(this).css({"border":"2px solid #d6d6d6", "color":"white", "background-color":"gray"});
    });

    loadCart();
    displayCart();
});

var Item = function(name, glazing, price, pack, count) {
    this.name = name;
    this.glazing = glazing;
    this.price = price;
    this.pack = pack;
    this.count = 1;
};
function displayCart(){
    var cartArray = listCart();
    var output = "";
    for (var i in cartArray){
        output += "<div class='cart-item'>"
            +"<img src='./images/"+ cartArray[i].name +".jpg' style='width:100px;'>"
            +"<p class='name'>"+cartArray[i].name+"</p><br>"
            +"<p class='glazing'>"+cartArray[i].glazing+"</p><br>"
            +"<p>(</p><p class='pack'>"+cartArray[i].pack+"</p><p>-pack)</p><br>"
            +"<button class='subtract-item' data-name='"
            +cartArray[i].name+"'>-</button>"
            +" "+cartArray[i].count
            +"<button class='add-item' data-name='"
            +cartArray[i].name+"'>+</button>"
            +" x <p class='price'>"+cartArray[i].price+"</p>"
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
        itemCopy.total = (item.price * item.count * item.pack).toFixed(2);
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
function removeItemFromCartAll(name, glazing, pack){
    for (var i in cart){
        if (cart[i].name === name && cart[i].glazing===glazing && cart[i].pack===pack){
            cart.splice(i,1);
            break;
        }
    }
    saveCart();
}
function clearCart(){
    cart = [];
    saveCart();
}
function countCart(){
    var totalCount = 0;
    for (var i in cart) {
        totalCount += cart[i].count;
    }
    return totalCount;
}
function totalItemCost(){
    var totalCost = 0;
    for (var i in cart){
        totalCost += cart[i].price * cart[i].count *cart[i].pack;
    }
    return totalCost.toFixed(2);
}
function addItemToCart (name, glazing, price, pack, count) {
    //if same item has been selected
    if (cart == undefined){
        cart = [];
    }

    for (var i in cart){
        if (cart[i].name === name && cart[i].glazing === glazing &&cart[i].pack == pack){
            cart[i].count += count;
            saveCart();
            return;
        }
    }
    //if not
    var item = new Item (name, glazing, price, pack, count);
    cart.push(item);
    saveCart();
}
function removeItemFromCart(name, glazing, pack){
    for (var i in cart){
        if (cart[i].name === name && cart[i].glazing === glazing && cart[i].pack==pack){
            console.log("matched");
            cart[i].count -- ;
            if (cart[i].count === 0) {
                cart.splice(i,1);
            }
            break;
        }
    }
    saveCart();
}
