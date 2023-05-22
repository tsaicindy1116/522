var monster_colors = "50514f-f25f5c-ffe066-247ba0-70c1b3".split("-").map(a=>"#"+a)
class Monster{ //宣告一個類別，一個物件/圖案就是一個類別，針對所畫的圖，設定的基本條件
    constructor(args){
        this.r=args.r||(50,100)
        this.p = args.p|| createVector(random(width),random(height))
        this.v = args.v||createVector(random(-1,1),random(-1,1))
        this.color = args.color||random(monster_colors)
        this.mode=random(["happy","bad"])
        this.IsDead= false//代表還活著
        this.timenum=0
    }
    draw(){
        if (this.IsDead==false){
        push()
            translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
            
            if (this.mode=="happy"){
                fill(255)
                    ellipse(0,0,this.r/2)
                    fill(0)
                    ellipse(0,0,this.r/3)
            }
            else{
                fill(255)
                    arc(0,0,this.r/2,this.r/2,0,PI)
                fill(0)
                    arc(0,0,this.r/3,this.r/2,0,PI)
            }
                
            stroke(this.color)//產生腳
            strokeWeight(4)
            // line(this.r/2,0,this.r,0)
            noFill();
            for(var j=0;j<8;j++){
                rotate(PI/4)
                beginShape()
                for(var i=0;i<(this.r/2);i++){
                    vertex(this.r/2+i,sin(i/5+frameCount/20)*10)
                }
                endShape()
                }
        pop()
    }
    else{//爆炸畫面
        this.timenum=this.timenum+1
        push()
        translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
            stroke(255)
         line(-this.r/2,0,this.r/2,0)
         stroke(this.color)
            strokeWeight(4)
            //line(this.r/2, 0,this.r,0)
            noFill();
            for(var j=0;j<8;j++){
                rotate(PI/4)
                line(this.r/2, 0,this.r,0)
                }
        
        
        pop()

    }

    }
    update(){
this.p.add(this.v)
if (this.p.x<=0||this.p.x>=width)
{
  this.v.x=-this.v.x
}
if (this.p.y<=0||this.p.y>=height)
{
  this.v.y=-this.v.y
}
    }
    //碰撞函數
    isBallInRanger(mouseX,mouseY){
        let d =dist(mouseX,mouseY,this.p.x,this.p.y)
        if (d<this.r/2){//非辦與怪物間的距離如果小於半徑(this.r/2)
        return true//代表距離有再範圍
        }else{
        return false//代表去離沒有在範圍
        }
        }
}