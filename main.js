var board = new Array();

//var isadd = new Array();

$(document).ready(function(){
    newgame();
});

function newgame(){
    //初始化
    init();
    //生成2个数字
    generatenum();
    generatenum();
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#cell-"+i+"-"+j).css("left",cellleft(i,j));
            $("#cell-"+i+"-"+j).css("top",celltop(i,j));
        }
    }
    for(var i=0;i<4;i++){
        board[i] = new Array();
        for(var j=0;j<4;j++){
            board[i][j] = 0;
        }
    }
    
    updateboardView();
}

function updateboardView(){
    $(".numbercell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $(".big").append('<div id="numbercell-'+i+"-"+j+'" class="numbercell"></div>');
            if(board[i][j]!=0) {
                $("#numbercell-"+i+"-"+j).css("left",cellleft(i,j));
                $("#numbercell-"+i+"-"+j).css("top",celltop(i,j));
                $("#numbercell-"+i+"-"+j).css("background-color",getbgcolor(board[i][j]));
                //数字颜色
                if(board[i][j]==2 || board[i][j]==4)
                    $("#numbercell-"+i+"-"+j).css("color","#776E65");
                else
                    $("#numbercell-"+i+"-"+j).css("color","white");
                //显示数字
                $("#numbercell-"+i+"-"+j).append(board[i][j]);
                $("#numbercell-"+i+"-"+j).css("font-size",getfontsize(board[i][j]));
            }
            else{
                $("#numbercell-"+i+"-"+j).css("left",cellleft(i,j)+50);
                $("#numbercell-"+i+"-"+j).css("top",celltop(i,j)+50);
                $("#numbercell-"+i+"-"+j).css("height",0);
                $("#numbercell-"+i+"-"+j).css("width",0);
            }
        }
    }
}

function generatenum(){
    //随机方格
    var x=Math.floor(Math.random()*4);
    var y=Math.floor(Math.random()*4);
    while(board[x][y]!=0){
        x=Math.floor(Math.random()*4);
        y=Math.floor(Math.random()*4);
    }
    //随机数字
    var n=Math.random();
    if(n>0.5) board[x][y]=2;
    else board[x][y]=4;
    //动画
    setTimeout(function(){
        generateanime(x,y,board[x][y]);
        setTimeout(updateboardView,100);
    },100);
        

}

//交互
$(document).keydown(function(event){
        switch(event.keyCode){
            case 37: //left
                if(moveleft()==true){
                    generatenum();
                    isgameover();
                }
                break;

            case 38: //up
                if(moveup()==true){
                    generatenum();
                    isgameover();
                }
                break;
            case 39: //right
                if(moveright()==true){
                    generatenum();
                    isgameover();
                }
                break;
            case 40: //down
                if(movedown()==true){
                    generatenum();
                    isgameover();
                }
                break;
            default:
                break;
        }

});

function isblock(a,b,c,d){
    if(a==c){
        //左右操作
        if(b>d){
            for(var i=d+1;i<b;i++){
                if(board[a][i]!=0) return true;
            }
        }
        else{
            for(var i=b+1;i<d;i++){
                if(board[a][i]!=0) return true;
            }
        }
        return false;
    }
    else if(b==d){
        //上下操作
        if(a>c){
            for(var i=c+1;i<a;i++){
                if(board[i][b]!=0) return true;
            }
        }
        else{
            for(var i=a+1;i<c;i++){
                if(board[i][b]!=0) return true;
            }
        }
        return false;
    }
}

//左移
function moveleft(){
    if(!canmoveleft(board)) return false;
        //遍历右三列
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            //有方块
            if(board[i][j]!=0){
                //遍历方块的左边
                for(var k=0;k<j;k++){
                    //有无阻挡
                    if(isblock(i,j,i,k)) continue;
                    //操作
                    if(board[i][k]==board[i][j]){
                        moveanime(i,j,i,k);
                        board[i][k]=board[i][j]+board[i][k];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==0){
                        moveanime(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else continue;
                }

            }
        }
    }
    //setTimeout(updateboardView,200);
    return true;
}

//右移
function moveright(){
    if(!canmoveright(board)) return false;
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                //操作
                for(var k=3;k>j;k--){
                    if(isblock(i,j,i,k)) continue;
                    if(board[i][k]==board[i][j]){
                        moveanime(i,j,i,k);
                        board[i][k]=board[i][j]+board[i][k];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==0){
                        moveanime(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else continue;
                }
            }
        }
    }
    //setTimeout(updateboardView,200);
    return true;
}

//上移
function moveup(){
    if(!canmoveup(board)) return false;
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(isblock(i,j,k,j)) continue;
                    if(board[i][j]==board[k][j]){
                        moveanime(i,j,k,j);
                        board[k][j]=board[i][j]+board[k][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==0){
                        moveanime(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else continue;
                }
            }
        }
    }
    //setTimeout(updateboardView,200);
    return true;
}

//下移
function movedown(){
    if(!canmovedown(board)) return false;
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(isblock(i,j,k,j)) continue;
                    if(board[i][j]==board[k][j]){
                        moveanime(i,j,k,j);
                        board[k][j]=board[i][j]+board[k][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==0){
                        moveanime(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else continue;
                }
            }
        }
    }
    //setTimeout(updateboardView,200);
    return true;
}

function isgameover(){
    if(canmoveleft(board) || canmoveright(board) || canmoveup(board) || canmovedown(board));
    else {
        console.log("gameover");
    }
}




