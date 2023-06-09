(function extendString(){
    String.prototype.ensureStart = function(str){
        let strLength = str.length;
        if(this.slice(0,strLength) !== str){
            return `${str}${this}`;
        }
        return this.toString();
    };
    String.prototype.ensureEnd = function(str){
        let strLength = str.length;
        if(this.slice(this.length - strLength,) !== str){
            return `${this}${str}`;
        }
        return this.toString();
    };
    String.prototype.isEmpty = function(){
        if(this.toString() !== ""){
            return false;
        }
        return true;
    };
    String.prototype.truncate = function(n){
        if(n<4){
            return "".padStart(n, ".");
        }else if(this.length<=n){
            return this.toString();
        }else if(!this.includes(" ")){
            return this.slice(0,n-3) + '...';
        }else if(this.length>=n){
            let splitted = this.split(" ");
            splitted.pop();
            while((splitted.join(" ") + '...').length > n){
                if(splitted.length===1){
                    return this.slice(0,n-3) + '...';
                }
                splitted.pop();
            }
            return splitted.join(" ") + '...';
        }
    };
    String.format = function(string,...params){
        for (let i = 0; i < params.length; i++) {
            string = string.replace(`{${i}}`,params[i]);
        }
        return string;
    }
})();
let testString = 'capital';
let expect = testString.ensureEnd('e');
console.log(expect)

