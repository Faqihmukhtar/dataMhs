const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
    
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Koneksi ke MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dataMhs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Skema Model Mahasiswa
const mahasiswaSchema = new mongoose.Schema({
    nim: String,
    nama: String,
    jenisKelamin: String,
    programStudi: String
});

const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema);

// Skema Model Pengguna (User)
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Route untuk mendapatkan semua data mahasiswa
app.get('/mahasiswas', (req, res) => {
    // return res.json({ok: req.params.users});
    Mahasiswa.find(req.params.users)
        .then(mahasiswas => {
            res.json(mahasiswas);
        })
        .catch(err => {
            console.error('Failed to fetch mahasiswas', err);
            res.status(500).json({ error: 'Failed to fetch mahasiswas' });
        });
});

// Route untuk mendapatkan data mahasiswa berdasarkan ID
app.get('/mahasiswas/:id', (req, res) => {
    console.log ()
    Mahasiswa.findById(req.params.id)
        .then(mahasiswa => {
            if (!mahasiswa) {
                return res.status(404).json({ error: 'Mahasiswa not found' });
            }
            res.json(mahasiswa);
        })
        .catch(error => {
            console.error('Failed to fetch mahasiswa', error);
            res.status(500).json({ error: 'Failed to fetch mahasiswa' });
        });
});

// Route untuk membuat data mahasiswa baru
app.post('/mahasiswas', (req, res) => {
    const mahasiswa = new Mahasiswa({
        nim: req.body.nim,
        nama: req.body.nama,
        jenisKelamin: req.body.jenisKelamin,
        programStudi: req.body.programStudi
    });

    mahasiswa.save()
        .then(() => {
            res.status(201).json({ message: 'Member added successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to add member' });
        });
});

// Menghapus mahasiswa berdasarkan ID
app.delete('/mahasiswas/:id', (req, res) => {
    const mahasiswaId = req.params.id;
    Mahasiswa.findByIdAndRemove(mahasiswaId)
        .then(mahasiswa => {
            if (!mahasiswa) {
                return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
            }
            res.status(200).json({ message: 'Mahasiswa berhasil dihapus' });
        })
        .catch(error => {
            console.log('Gagal menghapus data mahasiswa', error);
            res.status(500).json({ error: 'Gagal menghapus data mahasiswa' });
        });
});

// Mengupdate mahasiswa berdasarkan ID
app.put('/mahasiswas/:id', (req, res) => {
    const mahasiswaId = req.params.id;
    const updatedMahasiswa = {
        nim: req.body.nim,
        nama: req.body.nama,
        jenisKelamin: req.body.jenisKelamin,
        programStudi: req.body.programStudi
    };

    Mahasiswa.findByIdAndUpdate(mahasiswaId, updatedMahasiswa, { new: true })
        .then(mahasiswa => {
            if (!mahasiswa) {
                return res.status(404).json({ error: 'Mahasiswa not found' });
            }
            res.json(mahasiswa);
        })
        .catch(error => {
            console.log('Failed to update mahasiswa', error);
            res.status(500).json({ error: 'Failed to update mahasiswa' });
        });
});

// Endpoint untuk signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Periksa apakah pengguna dengan username yang diberikan sudah ada di database
    User.findOne({ username })
        .then((existingUser) => {
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Hash password menggunakan bcrypt
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Failed to hash password', err);
                    return res.status(500).json({ error: 'Failed to hash password' });
                }

                // Buat objek user baru dengan password terenkripsi
                const newUser = new User({ username, password: hashedPassword });

                // Simpan pengguna ke database
                newUser.save()
                    .then(() => {
                        res.status(201).json({ message: 'User registered successfully' });
                    })
                    .catch((error) => {
                        console.error('Failed to register user', error);
                        res.status(500).json({ error: 'Failed to register user' });
                    });
            });
        })
        .catch((error) => {
            console.error('Failed to check existing user', error);
            res.status(500).json({ error: 'Failed to check existing user' });
        });
});

// Endpoint untuk login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Cari pengguna dengan username yang diberikan di database
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Bandingkan password yang diberikan dengan password di database menggunakan bcrypt
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Failed to compare passwords', err);
                    return res.status(500).json({ error: 'Failed to compare passwords' });
                }

                if (!result) {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }

                // Buat token JWT
                const token = jwt.sign({ username: user.username }, 'secret-key', { expiresIn: '1h' });

                res.status(200).json({ token });
            });
        })
        .catch((error) => {
            console.error('Failed to login', error);
            res.status(500).json({ error: 'Failed to login' });
        });
});

// Middleware untuk memeriksa token dan mengamankan rute
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'secret-key', (err, user) => {
        if (err) {
            console.error('Failed to verify token', err);
            return res.status(403).json({ error: 'Failed to verify token' });
        }

        req.user = user;
        next();
    });
};

// Rute yang memerlukan otentikasi
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
