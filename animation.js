function generateanime(x,y,board){
    //颜色
    if(board==2 || board==4)
                    $("#numbercell-"+x+"-"+y).css("color","#776E65");
                else
                    $("#numbercell-"+x+"-"+y).css("color","white");
    $("#numbercell-"+x+"-"+y).css("background-color",getbgcolor(board));
    //动画
    $("#numbercell-"+x+"-"+y).animate({
        height:"100px",
        width:"100px",
        top: "-=50px",
        left: "-=50px"},
        100);
}

function moveanime(a,b,c,d){
    var nc=$("#numbercell-"+a+"-"+b);
    nc.animate({
        top:celltop(c,d),
        left:cellleft(c,d)
    },200)

}