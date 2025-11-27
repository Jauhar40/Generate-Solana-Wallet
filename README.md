# Solana Wallet Generator

Script Node.js untuk generate multiple Solana wallet secara otomatis dengan mnemonic phrase dan private key.

## 🚀 Fitur

- Generate multiple wallet sekaligus dalam satu eksekusi
- Mendukung derivation path standar Phantom (`m/44'/501'/x'/0'`)
- Export dalam berbagai format (Base58, Array, Mnemonic)
- Auto-append: menambahkan wallet baru tanpa menimpa yang lama
- Auto-increment account index berdasarkan jumlah wallet existing

## 📦 Instalasi
```bash
npm install @solana/web3.js bip39 ed25519-hd-key bs58
```

## 💻 Cara Penggunaan
```bash
node generate.js
```

Script akan menanyakan jumlah wallet yang ingin digenerate:
```
Mau berapa wallet? 5
```

## 📄 Output Files

Script akan menghasilkan 4 file:

- `wallet.txt` - Daftar public addresses
- `pk.txt` - Private keys dalam format Base58
- `pk_array.txt` - Private keys dalam format Array
- `pharse.txt` - Mnemonic phrases (12 kata)

## 📝 Contoh Output
```
Wallet 1:
Address: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
Private Key (Base58): 5J7WTMRn1...
Mnemonic: witch collapse practice feed shame open despair creek road again...
Derivation Path: m/44'/501'/0'/0'
```

## ⚠️ Peringatan Keamanan

**SANGAT PENTING:** Jangan pernah upload atau share file berikut:
- `pk.txt`
- `pk_array.txt`
- `pharse.txt`
- `wallet.txt`

Tambahkan ke `.gitignore`:
```
pk.txt
pk_array.txt
pharse.txt
wallet.txt
```

**Private key dan mnemonic phrase memberikan akses penuh ke wallet Anda. Simpan dengan aman dan jangan bagikan kepada siapapun!**

## 📋 Requirements

- Node.js v14 atau lebih tinggi
- NPM atau Yarn

## 🔧 Teknologi

- [@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js) - Solana JavaScript API
- [bip39](https://www.npmjs.com/package/bip39) - Mnemonic code generation
- [ed25519-hd-key](https://www.npmjs.com/package/ed25519-hd-key) - HD key derivation
- [bs58](https://www.npmjs.com/package/bs58) - Base58 encoding

## 📜 License

MIT

## ⚠️ Disclaimer

Script ini dibuat untuk keperluan development dan testing. Pengguna bertanggung jawab penuh atas keamanan wallet yang digenerate. Selalu gunakan hardware wallet atau cold storage untuk menyimpan aset kripto dalam jumlah besar.
