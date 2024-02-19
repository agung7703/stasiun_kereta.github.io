class Train {
  constructor(x, y, speed, col) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = col;
    this.numCars = 3; // Jumlah gerbong
    this.carWidth = 150;
    this.carHeight = 70;
    this.windowSize = 40;
    this.doorWidth = 15;
    this.wheelRadius = 8; // Ukuran roda
  }

  update() {
    this.x += this.speed;

    // Menangani looping gerbong jika kereta keluar dari layar
    if (this.x > width) {
      this.x = -this.numCars * this.carWidth;
    } else if (this.x < -this.numCars * this.carWidth) {
      this.x = width;
    }
  }

  display() {
    for (let i = 0; i < this.numCars; i++) {
      let carX = this.x + i * this.carWidth;

      // Gambar roda di belakang gambar gerbong (sekarang setelah gambar gerbong)
      fill(0);
      ellipse(
        carX + 15,
        this.y + 70,
        this.wheelRadius * 2,
        this.wheelRadius * 2
      );
      ellipse(
        carX + this.carWidth - 15,
        this.y + 70,
        this.wheelRadius * 2,
        this.wheelRadius * 2
      );

      // Gambar bagian atas gerbong (setelah gambar roda)
      fill(this.color);
      rect(carX, this.y - 10, this.carWidth, this.carHeight);

      // Jendela
      fill(200, 230, 255);
      rect(carX + 10, this.y - 5, this.windowSize, this.windowSize);
      rect(carX + 103, this.y - 5, this.windowSize, this.windowSize);

      // Pintu
      fill(150, 75, 0);
      rect(
        carX + this.carWidth - 90,
        this.y - 5,
        this.doorWidth,
        this.carHeight - 10
      );
      rect(
        carX + this.carWidth - 75,
        this.y - 5,
        this.doorWidth,
        this.carHeight - 10
      );

      // Pijakan peron di bawah setiap gerbong
      fill(200);
      rect(carX, this.y + this.carHeight - 10, this.carWidth, 10);
    }
  }
}

let train1;
let train2;
let people = [];
let clouds = [];
let buildings = [];
let stationWidth = 400;
let stationHeight = 120;
let isTrain1Stopped = false;
let stopTimeTrain1;
let isTrain2Stopped = false;
let stopTimeTrain2;

function setup() {
  createCanvas(800, 500);

  // Membuat objek kereta
  train1 = new Train(width, height / 2 + 45, 2, color(255, 0, 0));
  train2 = new Train(width, height / 2 + 55, -1.5, color(0, 0, 255));

  // Membuat objek orang yang menunggu
  for (let i = 0; i < 5; i++) {
    people.push(
      new Person(
        width / 2 - stationWidth / 2 + 80 + i * 30,
        height / 2 + stationHeight - 60
      )
    );
  }

  // Membuat objek awan
  for (let i = 0; i < 3; i++) {
    clouds.push(new Cloud(random(width), random(50, 150)));
  }

  // Membuat objek gedung
  buildings.push(
    new Building(100, height / 2 + 100, 100, 200, color(150, 75, 0))
  );
  buildings.push(
    new Building(250, height / 2 + 100, 110, 250, color(0, 150, 0))
  );
  buildings.push(
    new Building(400, height / 2 + 100, 100, 180, color(0, 0, 150))
  );
  buildings.push(
    new Building(550, height / 2 + 100, 100, 240, color(150, 0, 0))
  );
}

function keyPressed() {
  if (key === "a" || key === "A") {
    isTrain1Stopped = true;
    stopTimeTrain1 = millis(); // Menyimpan waktu ketika kereta dihentikan
  } else if (key === "d" || key === "D") {
    isTrain2Stopped = true;
    stopTimeTrain2 = millis(); // Menyimpan waktu ketika kereta dihentikan
  }
}

// Fungsi untuk menggambar latar belakang kota
function drawCity() {
  fill(100);
  rect(0, height / 2 + 100, width, height / 2); // Jalan

  fill(50, 200, 50);
  rect(0, height / 2 + 100, width, 20); // Rumput
}

function draw() {
  background(200, 240, 255); // Warna langit cerah

  // Menggambar latar belakang kota dan stasiun
  drawCity();

  // Menggambar gedung-gedung perkotaan
  for (let building of buildings) {
    building.display();
  }

  // Menggambar awan yang bergerak (di belakang stasiun)
  for (let cloud of clouds) {
    cloud.move();
  }

  // Menggambar awan (di belakang stasiun)
  for (let cloud of clouds) {
    cloud.display();
  }

  // Menggambar stasiun
  drawStation();

  // penamaan stastiun
  fill(0); // Warna teks (hitam)
  textSize(25); // Ukuran teks
  textStyle(BOLD); // Mengatur gaya teks menjadi bold
  textAlign(CENTER, CENTER); // Teks akan diatur pada posisi tengah
  text("'STASIUN MARIANA'", 390, 250); // Menambahkan teks dengan posisi (x, y)

  // penamaan stastiun
  fill(255); // Warna teks (hitam)
  textSize(12); // Ukuran teks
  textStyle(BOLD); // Mengatur gaya teks menjadi bold
  textAlign(CENTER, CENTER); // Teks akan diatur pada posisi tengah
  text("Tekan tombol ( ' a ' ) untuk memberhrntikan kereta Merah", 175, 450); // Menambahkan teks dengan posisi (x, y)
  text("Tekan tombol ( ' d ' ) untuk memberhrntikan kereta Biru", 170, 465);
  text("* Mereka akan berhenti selama 2 detik dan jalan kembali", 175, 480);

  // Menggambar orang yang menunggu di stasiun
  for (let person of people) {
    person.display();
  }

  // Memperbarui dan menggambar kereta
  if (!isTrain1Stopped) {
    train1.update();
    train1.display();
  } else {
    // Menghentikan kereta merah dan menunggu 2 detik sebelum melanjutkan
    train1.display();

    let elapsedTime = millis() - stopTimeTrain1;
    if (elapsedTime > 2000) {
      isTrain1Stopped = false;
      stopTimeTrain1 = 0;
    }
  }

  if (!isTrain2Stopped) {
    train2.update();
    train2.display();
  } else {
    // Menghentikan kereta biru dan menunggu 2 detik sebelum melanjutkan
    train2.display();

    let elapsedTime = millis() - stopTimeTrain2;
    if (elapsedTime > 2000) {
      isTrain2Stopped = false;
      stopTimeTrain2 = 0;
    }
  }
}

// Fungsi untuk menggambar stasiun
function drawStation() {
  fill(150);
  rect(
    width / 2 - stationWidth / 2 - 5,
    height / 5 + stationHeight + 10,
    stationWidth,
    stationHeight
  );
  fill(200);
  rect(
    width / 2 - stationWidth / 2 + 20,
    height / 2 + stationHeight - 100,
    stationWidth - 40,
    stationHeight - 40
  );

  // Menambahkan pijakan peron
  fill(100, 100, 100); // Warna abu-abu untuk pijakan peron
  rect(
    width / 2 - stationWidth / 2 + 10,
    height / 2 + stationHeight - 100,
    10,
    stationHeight - 40
  );
  rect(
    width / 2 + stationWidth / 2 - 20,
    height / 2 + stationHeight - 100,
    -10,
    stationHeight - 40
  );

  fill(255);
  rect(
    width / 2 - stationWidth / 2 - 200,
    height / 2 + stationHeight,
    width,
    5
  );
  rect(
    width / 2 - stationWidth / 2 - 200,
    height / 2 + stationHeight + 12,
    width,
    5
  );
}

class Person {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.headSize = 20;
  }

  display() {
    fill(255, 0, 0);

    // Tubuh
    ellipse(this.x, this.y + this.headSize, 20, 40);

    // Kepala
    fill(255, 220, 180);
    ellipse(this.x, this.y, this.headSize, this.headSize);
  }
}

class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.1, 0.3);
  }

  move() {
    this.x += this.speed;
    if (this.x > width + 50) {
      this.x = -50;
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, 40, 20);
    ellipse(this.x + 20, this.y - 10, 40, 20);
    ellipse(this.x + 40, this.y, 40, 20);
  }
}

class Building {
  constructor(x, y, width, height, col) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = col;
  }

  display() {
    fill(this.color);
    rect(this.x, this.y - this.height, this.width, this.height); // Gedung

    // Jendela di gedung
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        fill(200, 230, 255);
        rect(this.x + i * 20 + 10, this.y - this.height + j * 40 + 10, 15, 30);
      }
    }
  }
}
