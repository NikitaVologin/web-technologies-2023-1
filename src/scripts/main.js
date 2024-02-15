class PizzaDescription{
    constructor(name, price, energy, src){
        this.name = name;
        this.price = price;
        this.energy = energy;
        this.src = src;
    }
}

class Pizza{
    toppings = [];
    constructor(pizzaDescription, size, toppingsDescriptions){
        this.size = size;
        this.description = pizzaDescription; 
        this.toppings = toppingsDescriptions.forEach(td =>
                this.addTopping(td)
            );
    }

    addTopping(td) {
        let new_topping = new Topping(td);
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
        return this.description.name;      
    }   

    calculatePrice() {
        let toppings_price = 0;
        this.toppings.forEach(topping => {
            toppings_price += topping.totalPrice();
        });
        return this.description.price + this.size.price() + toppings_price;
    }   

    calculateCalories() {
        let toppings_energy = 0;
        this.toppings.forEach(topping => {
            toppings_energy += topping.totalEnergy();
        })
        return this.description.energy + this.size.energy() + toppings_energy;
    }     

    equals(another_pizza){
        return  this.description === another_pizza.description && 
                this.toppings.toString() === another_pizza.toppings.toString();
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

class PizzaSizeDescription{
    constructor(name, price, energy, price_coef, energy_coef){
        this.name = name;
        this.price = price;
        this.energy = energy;
        this.price_coef = price_coef;
        this.energy_coef = energy_coef;
    }
}

class PizzaSize{
    constructor(pizzaSizeDescription){
        this.description = pizzaSizeDescription;
    }
    toString(){
        return this.description.name;
    }

    get price(){
        return this.description.price;
    }

    get energy(){
        return this.description.energy;
    }

    get price_coef(){
        return this.description.price_coef;
    }

    get energy_coef(){
        return this.description.energy_coef;
    }
}

class TappingDescription{
    constructor(name, price, energy, src){
        this.name = name;
        this.price = price;
        this.energy = energy;
        this.src = src;
    }
}

class Topping{
    #size;
    constructor(tappingDescription){
        this.description = tappingDescription;
    }

    set size(value){
        this.#size = value;
    }

    totalPrice(){
        return this.description.price * this.#size.price_coef;
    }

    totalEnergy(){
        return this.description.energy * this.#size.energy_coef;
    }

    toString(){
        return this.description.name;
    }
}

class Basket{
    pizza= [];

    constructor(){}

    add(new_pizza){
        this.pizza.push(new_pizza);
    }

    remove(delete_pizza){
        for(let p of pizza){
            if(delete_pizza.equals(p)){
                let index = pizza.indexOf(p);
                this.pizza.splice(index, 1);
                break; 
            }
        }
    }
    
    get energy(){
        let energy = 0;
        for(let p of pizza){
            energy += p.energy();
        }
        return energy;
    }

    get price(){
        let price = 0;
        for(let p of pizza){
            price += p.energy();
        }
        return price;
    }
}

class PizzaCatalog{
    pizza_variants = [
        new PizzaDescription("Маргарита", 500, 300, "assets/img/pizza/margarita.png"),
        new PizzaDescription("Пепперони", 800, 400, "assets/img/pizza/pepporoni.png"),
        new PizzaDescription("Баварская", 700, 450, "assets/img/pizza/bavarskaya.png")
    ]; 
    constructor(){}
}

class ToppingCatalog{
    topping_variants = [
        new TappingDescription("Сливочная моцарелла", 50, 100, "assets/img/toppings/mocarella.png"),
        new TappingDescription("Сырный борт", 150, 50, "assets/img/toppings/bortik.png"), 
        new TappingDescription("Чедер и пармезан", 150, 50, "assets/img/toppings/chedder.png")
    ];
    constructor(){}
}

class SizeCatalog{
    size_variants = [
        new PizzaSizeDescription("Маленький", 100, 100, 1, 1),
        new PizzaSizeDescription("Большой", 200, 200, 2, 2)
    ];
    constructor(){}
}

class Store{    
    constructor(){
        this.pizzaCatalog = new PizzaCatalog();
        this.toppingCatalog = new ToppingCatalog();
        this.sizeCatalog = new SizeCatalog();
        this.littleSize = new PizzaSize(this.sizeCatalog.size_variants[0]);
        this.bigSize = new PizzaSize(this.sizeCatalog.size_variants[1]);
        this.basket = new Basket();
    }

    putPizza(pizza){
        this.basket.add(pizza);
    }

    removePizza(pizza){
        this.basket.remove(pizza);
    }

    basketEnergy(){
        return basket.energy();
    }

    basketPrice(){
        return basket.price();
    }

    handleOrder(order){
        let new_order = new Order();
        Object.assign(new_order, order);

        new_order.fillOrder();
        this.putPizza(new_order.ordered_pizza);
    }

    get pizzaVariants(){
        return this.pizzaCatalog.pizza_variants;
    }

    get toppingVariants(){
        return this.toppingCatalog.topping_variants;
    }
}

class Order{
    description;
    size;
    toppings = [];
    #pizza;
    constructor(){}

    set description(value){
        this.description = this.description;
    }

    get pizzaPrice(){
        if(this.description != undefined){
            return this.description.price;
        }
        else{
            return 0;
        }
    }

    get pizzaEnergy(){
        if(this.description != undefined){
            return this.description.energy;
        }
        else{
            return 0;
        }
    }

    get pizzaIsReady(){
        return this.description != undefined && this.size != undefined;
    }

    set size(value){
        this.size = value;
    }

    addTopping(topping){
        this.toppings.push(topping);
    }

    get ordered_pizza(){
        return this.#pizza;
    } 

    get currentPrice(){
        let topping_price = 0;
        for(let t of this.toppings){
            topping_price += t.price * this.size.price_coef;
        }
        return this.pizzaPrice + this.size.price + topping_price;
    }

    get currentEnergy(){
        let topping_energy = 0;
        for(let t of this.toppings){
            topping_energy += t.energy * this.size.energy_coef;
        }
        return this.pizzaEnergy + this.size.energy + topping_energy;
    }


    fillOrder(){
        if(this.pizzaIsReady){
            this.#pizza = new Pizza(this.description, this.size, this.toppings);
        }
        else{
            this.#pizza = null;
        }
    }
}

let store = new Store();
let order = new Order();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} 
else {
    init();
}

function init(){
    order.size = store.littleSize;
    for(let pizzaD of store.pizzaVariants){
        let referenceNode = document.getElementsByClassName("pizza-cell-list")[0];
        let button = getPizzaHTML(pizzaD);
        button.description = pizzaD;
        referenceNode.appendChild(button);
    }
    for(let toppingD of store.toppingVariants){
        let referenceNode = document.getElementsByClassName("form-toppings-list")[0];
        let button = getToppingHTML(toppingD);
        button.description = toppingD;
        referenceNode.appendChild(button);
    }
    updateAcceptButton();

    let size_pick_buttons = Array.from(document.getElementsByClassName("form-size-pick-button"));

    let active_button = size_pick_buttons.filter(b => !b.classList.contains("form-size-pick-notselected-button"))[0];
    let non_active_button = size_pick_buttons.filter(b => b.classList.contains("form-size-pick-notselected-button"))[0];

    active_button.size = store.littleSize;
    non_active_button.size = store.bigSize;

    size_pick_buttons.forEach(button => 
            button.onclick = (event) => {
                let another_button = null;
                if(button.classList.contains("form-size-pick-notselected-button")){
                    another_button = size_pick_buttons.filter(b => !b.classList.contains("form-size-pick-notselected-button"))[0];
                    button.classList.remove("form-size-pick-notselected-button");
                    another_button.classList.add("form-size-pick-notselected-button");
                    order.size = button.size;
                    updateAcceptButton();
                }
            }
        );

    let accept_button = document.getElementsByClassName("form-accept-button")[0];
    accept_button.onclick = (event) =>{
        if(order.pizzaIsReady){
            store.handleOrder(order);
            order = new Order();
            let size_pick_buttons = Array.from(document.getElementsByClassName("form-size-pick-button"));
            let active_button = size_pick_buttons.filter(b => !b.classList.contains("form-size-pick-notselected-button"))[0];
            order.size = active_button.size;
            updateAcceptButton();
        }
        else{
            alert("Закончите выбор пиццы!");
        }
    }
}

function updateAcceptButton(){
    let accept_button_text = document.getElementById("form-accept-button-change-text");
    accept_button_text.textContent = `${order.currentPrice}Р (${order.currentEnergy}Ккал)`;
}

function getPizzaHTML(pizzaD){
    let div = document.createElement('button');
    div.className = "pizza-cell";
    let html_code =     
        `<img class="pizza-image" src="${pizzaD.src}">
        <p class="pizza-name">${pizzaD.name}</p>`    
    div.innerHTML = html_code;

    div.onclick = (event) => {
        order.description = div.description;
        updateAcceptButton();
    };

    return div;
}

function getToppingHTML(toppingD){
    let div = document.createElement('button');
    div.className = "form-topping";
    let html_code =     
        `<img class ="form-topping-image" src="${toppingD.src}">
        <p class="form-topping-name">${toppingD.name}</p>
        <p class="form-topping-price">${toppingD.price}P</p>`    
    div.innerHTML = html_code;

    div.onclick = (event) => {
        order.addTopping(div.description);
        updateAcceptButton();
    };

    return div;
}