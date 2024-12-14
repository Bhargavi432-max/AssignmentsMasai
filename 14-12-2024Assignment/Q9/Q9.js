function Device(name,type,status="off"){
    this.name=name;
    this.type=type;
    this.status=status;
}
Device.prototype.trunOn=function(){
    this.status="on";
    console.log(`${this.name} is now on`)
}
Device.prototype.trunOff=function(){
    this.status="off";
    console.log(`${this.name} is now off`)
}
Device.prototype.getStatus = function() {
    console.log(`${this.name} is currently ${this.status}.`);
    return this.status;
};
function SmartHome(owner) {
    this.owner = owner;
    this.devices = [];
} 
SmartHome.prototype.addDevice = function(device) {
    this.devices.push(device);
    console.log(`${device.name} has been added to ${this.owner}'s smart home.`);
};
SmartHome.prototype.removeDevice = function(deviceName) {
    this.devices = this.devices.filter(device => device.name !== deviceName);
    console.log(`${deviceName} has been removed from ${this.owner}'s smart home.`);
};

SmartHome.prototype.listDevices = function() {
    console.log(`Devices in ${this.owner}'s smart home:`);
    this.devices.forEach(device => console.log(`- ${device.name} (${device.type})`));
};
function SmartDevice(name, type, brand, connectivity = "offline") {
    Device.call(this, name, type);
    this.brand = brand;
    this.connectivity = connectivity;
}
SmartDevice.prototype = Object.create(Device.prototype);
SmartDevice.prototype.updateFirmware=async function(){
    console.log(`Updating firmware for ${this.name}...`);
    try {
        const response = await fetch("https://api.mockserver.com/updateFirmware");
        if (response.ok) {
            console.log(`Firmware updated successfully for ${this.name}.`);
        } else {
            console.log(`Failed to update firmware for ${this.name}.`);
        }
    } catch (error) {
        console.log(`Error updating firmware for ${this.name}:`, error);
    }
}
SmartDevice.prototype.checkConnectivity = function() {
    console.log(`${this.name} is ${this.connectivity}.`);
};
function SmartLight(name, brand, brightness = 100, color = "white") {
    SmartDevice.call(this, name, "Smart Light", brand);
    this.brightness = brightness;
    this.color = color;
}
SmartLight.prototype = Object.create(SmartDevice.prototype);
SmartLight.prototype.adjustBrightness = function(level) {
    this.brightness = level;
    console.log(`${this.name} brightness set to ${this.brightness}.`);
};
SmartLight.prototype.changeColor = function(newColor) {
    this.color = newColor;
    console.log(`${this.name} color changed to ${this.color}.`);
};
function SmartThermostat(name, brand, temperature = 22, mode = "cool") {
    SmartDevice.call(this, name, "Smart Thermostat", brand);
    this.temperature = temperature;
    this.mode = mode;
}
SmartThermostat.prototype = Object.create(SmartDevice.prototype);
SmartThermostat.prototype.setTemperature = function(temp) {
    this.temperature = temp;
    console.log(`${this.name} temperature set to ${this.temperature}°C.`);
};
SmartThermostat.prototype.changeMode = function(newMode) {
    this.mode = newMode;
    console.log(`${this.name} mode changed to ${this.mode}.`);
};
function User(username,password){
    this.username=username;
    this.password=password;
}
User.prototype.authenticate=async function(){
    try {
        const response = await fetch("https://api.mockserver.com/authenticate", {
            method: "POST",
            body: JSON.stringify({ username: this.username, password: this.password }),
        });
        if (response.ok) {
            console.log(`${this.username} authenticated successfully.`);
        } else {
            console.log(`${this.username} failed to authenticate.`);
        }
    } catch (error) {
        console.log(`Authentication error for ${this.username}:`, error);
    }

}
User.prototype.addDeviceToHome = function(device) {
    this.smartHome.addDevice(device);
};

User.prototype.removeDeviceFromHome = function(deviceName) {
    this.smartHome.removeDevice(deviceName);
};
// Create devices
const light1 = new SmartLight("Living Room Light", "Philips");
const thermostat1 = new SmartThermostat("Bedroom Thermostat", "Nest");

// Create a user
const user1 = new User("Alice", "password123");

// Authenticate user
user1.authenticate();

// Add devices to user's smart home
user1.addDeviceToHome(light1);
user1.addDeviceToHome(thermostat1);

// List devices in the smart home
user1.smartHome.listDevices();

// Perform actions on devices
light1.adjustBrightness(70);
light1.changeColor("blue");

thermostat1.setTemperature(25);
thermostat1.changeMode("heat");

// Firmware update
light1.updateFirmware();
