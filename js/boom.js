class TokenExplosion{
    constructor(){
    this.appendingParent = '';
    this.spawnParticle.bind(this);
    }
    spawnParticle(transform, delay, lifeTime){ 
        function birthMe(){
            var colorArray = ['red', 'orange', 'yellow', 'orangered']
            var randomColor = colorArray[Math.floor(Math.random()*colorArray.length)];
            var boom = $("<div>").addClass('particle').css({
                'background-color': randomColor,
                'transition-duration': lifeTime+'ms',
            })
            function killMe(){
                boom.remove();
            }
            $(this.appendingParent).append(boom);
            function GO(){
                boom.css({
                    left: transform.x+'%',
                    top: transform.y+'%'
                });
            }
            setTimeout(GO.bind(this), 50);
            setTimeout(killMe.bind(this), lifeTime);
        }
        setTimeout(birthMe.bind(this), delay)
    }
    explode(row, col, initialDelay){
        this.appendingParent = ".column"+col+".row"+row;
        if(row===5){
            return;
        }
        for(var i = 0; i<200; i++){
            var transform = {x: this.random(), y: this.random()}; //where I'm going to go
            var animationDelayTime = initialDelay; //how long I'll wait to be be born
            var lifeTime = this.random(200,1000); //how long I'll live when I'm born
            this.spawnParticle(transform, animationDelayTime, lifeTime);
        }
    }
    random(min=0, max=100){
        var num = Math.floor(Math.random() * (max-min)) - min;
        return num * (Math.round(Math.random())*2-1)
    }
}