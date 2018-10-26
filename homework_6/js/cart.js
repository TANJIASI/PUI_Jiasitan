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


});
