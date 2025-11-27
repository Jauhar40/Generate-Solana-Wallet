Solana Wallet Generator
Script Node.js untuk generate multiple Solana wallet secara otomatis dengan mnemonic phrase dan private key.
Fitur

Generate multiple wallet sekaligus
Mendukung derivation path standar Phantom (m/44'/501'/x'/0')
Export dalam berbagai format (Base58, Array, Mnemonic)
Menambahkan wallet baru tanpa menimpa yang lama
Auto-increment account index

Output Files

wallet.txt - Public addresses
pk.txt - Private keys (Base58)
pk_array.txt - Private keys (Array format)
pharse.txt - Mnemonic phrases (12 words)

Instalasi
bash
npm install @solana/web3.js bip39 ed25519-hd-key bs58
Cara Pakai
bash
node generate.js
```
Masukkan jumlah wallet yang ingin digenerate.

## ⚠️ Keamanan
**JANGAN** upload file `pk.txt`, `pk_array.txt`, atau `pharse.txt` ke repository. Tambahkan ke `.gitignore`:
```
pk.txt
pk_array.txt
pharse.txt
wallet.txt
