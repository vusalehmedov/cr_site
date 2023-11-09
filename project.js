const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");



const ui = new UI();

const storage = new Storage();

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addCar);
    document.addEventListener("DOMContentLoaded", function () {
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });
    cardbody.addEventListener("click", deleteCar);
    clear.addEventListener("click",clearAllCars);
}

function addCar(e) {
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;


    if (title === "" || price === "" || url === "") {
        ui.displayMessage("Tum Alanlari Doldurun...", "danger");
    }
    else {

        const newCar = new Car(title, price, url);

        ui.addCarToUI(newCar);

        storage.addCarToStorage(newCar);

        ui.displayMessage("Arac basariyla eklendi...", "success");
    }
    ui.clearInputs(titleElement, urlElement, priceElement);

    e.preventDefault();

}

function deleteCar(e) {
    if (e.target.id === "delete-car") {
        ui.deleteCarFromUI(e.target);

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessage("Silme islemi basariyle gerceklesidi...","success");
        
      
    }
}

function clearAllCars(){
    if(confirm("Tum aracalr silinecek! Eminmisinzi?")){
    ui.clearAllCarsFromUI();
    storage.clearAllCarsFromStorage();
}

}