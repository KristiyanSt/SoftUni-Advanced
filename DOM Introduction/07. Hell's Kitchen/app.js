function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick () {
      let input = document.querySelector('#inputs textarea').value;
      let restaurantsInfo = JSON.parse(input);
      let restaurants = {};
      for (const restaurant of restaurantsInfo) {
         let [restaurantName,workersInfo] = restaurant.split(' - ');
         let workers = workersInfo.split(', ').map(x=>{
            let [name,salary] = x.split(' ');
            return {name,salary:Number(salary)}
         });
         
         if(!restaurants[restaurantName]){
            restaurants[restaurantName] = {
               restaurantName,
               workers:[],
               getAverageSalary : function(){
                  let averageSalary = this.workers.reduce((acc,a)=> acc+a.salary,0);
                  return averageSalary / workers.length;
               },
            };
         }
         restaurants[restaurantName].workers = restaurants[restaurantName].workers.concat(workers);        
      }
      let sortedRestaurants = Object.values(restaurants).sort((a,b)=>b.getAverageSalary() - a.getAverageSalary());
      let bestRestaurantWorkersSorted = sortedRestaurants[0].workers.sort((a,b)=>b.salary - a.salary);
      let bestRestaurantPara = document.querySelector('#bestRestaurant p');
      let bestRestaurantWorkersPara = document.querySelector('#workers p');
      bestRestaurantPara.textContent = `Name: ${sortedRestaurants[0].restaurantName} Average Salary: ${(sortedRestaurants[0].getAverageSalary()).toFixed(2)} Best Salary: ${(bestRestaurantWorkersSorted[0].salary).toFixed(2)}`;
      bestRestaurantWorkersPara.textContent = bestRestaurantWorkersSorted.map(w=>{
         let name = w.name;
         let salary = w.salary;
         return `Name: ${name} With Salary: ${salary}`;
      })
      .join(' ');
   }
}