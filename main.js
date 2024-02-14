class Pizza{
    toppings = [];
    constructor(name, price, energy, size){
        this.name = name;
        this.price = price;
        this.energy = energy;
        this.size = size;
    }

    addTopping(topping) {
        let new_topping = new Topping("", 0, 0);
        for(let prop in topping){
            new_topping[prop] = topping[prop];
        }
        new_topping.size = this.size;
        this.toppings.push(new_topping);
    }   

    removeTopping(topping) {
        let index = -1;
        for(let t of this.toppings){
            if(t.name === topping.name){
                index = this.toppings.indexOf(t);
                break;
            }
        }      
        if(index != -1){
            this.toppings.splice(index, 1)
        }

    } 
    getToppings() {
        return this.toppings;
    }   
    getSize() {
        return this.size;
    }              
    getStuffing() {
        return this.name;      
    }    
    calculatePrice() {
        let toppings_price = 0;
        this.toppings.forEach(topping => {
            toppings_price += topping.totalPrice();
        });
        return this.price + this.size.price + toppings_price;
    }     
    calculateCalories() {
        let toppings_energy = 0;
        this.toppings.forEach(topping => {
            toppings_energy += topping.totalEnergy();
        })
        return this.energy + this.size.energy + toppings_energy;
    }        
    print(){
        let str = "\n";
        if(this.toppings.length != 0){
            for(let topping of this.toppings){
                str += topping.toString() + "\n";
            }
        }
        else{
            str = "нет " + "\n";
        }
        return "Добавки: " + str 
            + "Пицца: " + this.getStuffing() + "\n"
            + "Размер: " + this.getSize().toString() + "\n"
            + "Итоговая цена: " + this.calculatePrice() + "\n"
            + "Итоговая калорийность: " + this.calculateCalories();
    }
}

class PizzaSize{
    constructor(name, price, energy, price_coef, energy_coef){
        this.name = name;
        this.price = price;
        this.energy = energy;
        this.price_coef = price_coef;
        this.energy_coef = energy_coef;
    }
    toString(){
        return this.name;
    }
}

class Topping{
    #size;
    constructor(name, price, energy){
        this.name = name;
        this.price = price;
        this.energy = energy;
    }

    set size(value){
        this.#size = value;
    }

    totalPrice(){
        return this.price * this.#size.price_coef;
    }

    totalEnergy(){
        return this.energy * this.#size.energy_coef;
    }

    toString(){
        return this.name;
    }
}
let sir_bort = new Topping("Сырный борт", 150, 50);
let cheder_i_parmezan = new Topping("Чедер и пармезан", 150, 50);

let big_size = new PizzaSize("большой", 200, 200, 2, 2);
let big_margarina_pizza = new Pizza("Маргарита", 500, 300, big_size);
big_margarina_pizza.addTopping(sir_bort);
big_margarina_pizza.addTopping(cheder_i_parmezan);

let little_size = new PizzaSize("маленький", 100, 100, 1, 1);
let margarina_pizza = new Pizza("Маргарита", 500, 300, little_size);
margarina_pizza.addTopping(sir_bort);
margarina_pizza.addTopping(cheder_i_parmezan);

console.log(margarina_pizza.print());
console.log();
console.log(big_margarina_pizza.print());

margarina_pizza.removeTopping(cheder_i_parmezan);

console.log()

console.log(margarina_pizza.print());