function cellleft(i,j){
    return 20+120*j;
}

function celltop(i,j){
    return 20+120*i;
}

function getbgcolor(x){
    if(x==2) return '#EEE4DA';
    else if(x==4) return '#EDE0C8';
    else if(x==8) return '#F2B179';
    else if(x==16) return '#F59563';
    else if(x==32) return '#F67D5F';
    else if(x==64) return '#F65F3C';
    else if(x==128) return '#EDCF72';
    else if(x==256) return '#EDCC61';
    else if(x==512) return '#EDC850';
    else if(x==1024) return '#EDC53F';
    else if(x==2048) return '#EDC53F';
}

function getfontsize(x){
    if(x==2 || x==4 || x==8) return 55;
    else if(x==16 || x==32 || x==64) return 50;
    else if(x==128 || x==256 || x==512) return 45;
    else if(x==1024 || x==2048) return 40;
}

function canmoveleft(board){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0) 
                if(board[i][j-1]==0 || board[i][j-1]==board[i][j]){
                    return true;
                }
        }
    }
   
    return false;
    
}

function canmoveright(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            if(board[i][j]!=0){
                if(board[i][j+1]==0 || board[i][j+1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canmoveup(board){
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0)
                if (board[i-1][j]==0 || board[i-1][j]==board[i][j]){
                    return true;
                }
        }
    }
    return false;
}

function canmovedown(board){
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0)
                if(board[i+1][j]==0 || board[i+1][j]==board[i][j]){
                    return true;
                }
        }
    }
    return false;
}

