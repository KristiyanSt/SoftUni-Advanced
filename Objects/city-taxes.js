function cityTaxes(name,population,treasury){
    let cityObj = {
        name:name,
        population:population,
        treasury:treasury,
        taxRate:10,
        collectTaxes: function(){
            this.treasury += this.population*this.taxRate;
            Math.floor(this.treasury);
        },
        applyGrowth: function(percentage){
            this.population+= this.population*percentage/100;       
            Math.floor(this.population);   
        },
        applyRecession:function(percentage) {
            this.treasury-= this.treasury*percentage/100;
            Math.floor(this.treasury);
        }
    }
    return cityObj;
}
const city =
  cityTaxes('Tortuga',
  7000,
  15000);
city.collectTaxes();
console.log(city.treasury);
city.applyGrowth(5);
console.log(city.population);

