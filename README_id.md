# rf_react_advanced_todo - Aplikasi Todo Advanced dengan Node JS and React

## Software Apakah Ini?

rf_react_advanced_todo adalah todo app yang dibuat dengan Node.js, React, Redux, Redux Toolkit, Context, Bootstrap, dan Axios.

Client menggunakan Redux, Redux Toolkit, dan Context, masing-masing terpisah.

Server menggunakan Mongoose dan Knex.

## Cara Kerja

Aplikasi ini bekerja seperti CRUD pada umumnya.

Bedanya, ini adalah Single Page App (SPA) yang menggunakan React juga.

Jadi tidak ada page refresh.

Aplikasi ini dibagi menjadi client dan server.

Client menggunakan React.

Server menggunakan Node.js.

## Cara Mencoba Kode Server

### Cara Mencoba Kode server-mongoose

Untuk mencoba kode server-mongoose, masuk ke dalam folder server-mongoose via command line.

Selanjutnya, buat file .env di dalam foldernya...

Selanjutnya, konfigurasi database setting dan lainnya di file .env sesuai dengan .env-example.

Kode server-mongoose membutuhkan MongoDB, jadi pastikan Anda telah menginstallnya dan membuat databasenya sesuai konfigurasi tadi.

Pastikan port 3001 tidak digunakan.

Untuk menjalankannya:

```
npm install
```

```
npm start
```

Atau:

```
npm install
```

```
npm run dev
```

### Cara Mencoba Kode server-knex

Untuk mencoba kode server-knex, buat file .env di dalam foldernya.

Selanjutnya, isi .env sesuai .env-example. Di sini Anda bisa mengubah port, environment, dan detail database.

Kode server-knex membutuhkan MySQL, jadi pastikan Anda telah menginstallnya dan membuat databasenya sesuai konfigurasi tadi.

Sekarang, pastikan Anda berada dalam folder server-knex.

Selanjutnya, jalankan:

```
npm install
```

Selanjutnya, jalankan:

```
npm run db:refresh
```

Selanjutnya, jalankan:

```
npm run dev
```

Atau:

```
npm start
```

## Cara Mencoba Kode Client

Pastikan port 3000 tidak digunakan.

Masuklah ke salah satu folder client-*.

Untuk menjalankannya:

```
npm install
```

```
npm start
```

## Freelance Worker Link

- https://projects.co.id/public/browse_users/view/99bc11/rakifsul