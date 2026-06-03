let prices = {
    paneer: 180,
    lollipop: 220,
    butterChicken: 250,
    paneerMasala: 200,
    biryani: 220,
    paneerBiryani: 240,
    coffee: 100,
    lassi: 60,
    gulab: 80,
    icecream: 90
};

let itemNames = {
    paneer: "Paneer Tikka",
    lollipop: "Chicken Lollipop",
    butterChicken: "Butter Chicken",
    paneerMasala: "Paneer Butter Masala",
    biryani: "Chicken Biryani",
    paneerBiryani: "Paneer Biryani",
    coffee: "Cold Coffee",
    lassi: "Sweet Lassi",
    gulab: "Gulab Jamun",
    icecream: "Ice Cream"
};

let quantities = {
    paneer: 0,
    lollipop: 0,
    butterChicken: 0,
    paneerMasala: 0,
    biryani: 0,
    paneerBiryani: 0,
    coffee: 0,
    lassi: 0,
    gulab: 0,
    icecream: 0
};

function changeQty(item, value) {
    quantities[item] += value;

    if (quantities[item] < 0) {
        quantities[item] = 0;
    }

    document.getElementById(item + "Qty").innerText = quantities[item];

    updateBill();
}

function updateBill() {
    let total = 0;
    let bill = "";

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;

    // 🧾 Generate Bill Number (random)
   let billNo = localStorage.getItem("billNo") || 1000;
billNo++;
localStorage.setItem("billNo", billNo);

    // 📅 Get Date & Time
    let now = new Date();

    let date = now.toLocaleDateString();   // e.g. 08/04/2026
    let time = now.toLocaleTimeString();   // e.g. 07:45:30 PM

    // 🧾 Header
    bill += "<center><h3>Hyderabadi Restaurant</h3></center>";
    bill += "Bill No: " + billNo + "<br>";
    bill += "Date: " + date + "<br>";
    bill += "Time: " + time + "<br><hr>";

    // 👤 Customer details
    if (name) bill += "Customer: " + name + "<br>";
    if (phone) bill += "Phone: " + phone + "<br>";

    bill += "<hr>";

    let hasItems = false;

    for (let item in quantities) {
        if (quantities[item] > 0) {
            hasItems = true;

            let cost = quantities[item] * prices[item];
            total += cost;

            bill += `<pre>${itemNames[item]} x ${quantities[item]}   ₹${cost}</pre>`;
        }
    }

    if (!hasItems) {
        document.getElementById("bill").innerHTML = "No items selected";
        return;
    }

    let gst = total * 0.05;
    let finalTotal = total + gst;

    bill += "<hr>";
    bill += `<pre>Subtotal: ₹${total}</pre>`;
    bill += `<pre>GST: ₹${gst.toFixed(2)}</pre>`;
    bill += `<pre><b>Total: ₹${finalTotal.toFixed(2)}</b></pre>`;
    bill += "<hr><center>Thank You! Visit Again 😊</center>";

    document.getElementById("bill").innerHTML = bill;
}

function printBill() {
    window.print();
}