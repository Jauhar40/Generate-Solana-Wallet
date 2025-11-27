const solanaWeb3 = require('@solana/web3.js');
const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');
const bs58 = require('bs58').default;
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fungsi generate wallet dengan multiple derivation paths
function generateWallet(accountIndex = 0) {
  const mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  
  // Gunakan derivation path yang sama dengan Phantom (account 0)
  const path = `m/44'/501'/${accountIndex}'/0'`;
  const derivedSeed = derivePath(path, seed.toString('hex')).key;
  const keypair = solanaWeb3.Keypair.fromSeed(derivedSeed);
  
  return {
    publicKey: keypair.publicKey.toBase58(),
    privateKeyBase58: bs58.encode(keypair.secretKey),
    privateKeyArray: JSON.stringify(Array.from(keypair.secretKey)),
    mnemonic: mnemonic,
    derivationPath: path
  };
}

// Fungsi untuk menghitung wallet yang sudah ada
function getExistingWalletCount() {
  try {
    if (fs.existsSync('wallet.txt')) {
      const content = fs.readFileSync('wallet.txt', 'utf8');
      const lines = content.trim().split('\n').filter(line => line.length > 0);
      return lines.length;
    }
  } catch (err) {
    console.log('Tidak ada file sebelumnya, mulai dari awal.');
  }
  return 0;
}

async function main() {
  // Cek jumlah wallet yang sudah ada
  const existingCount = getExistingWalletCount();
  
  if (existingCount > 0) {
    console.log(`\n📁 Ditemukan ${existingCount} wallet yang sudah ada.`);
    console.log('💾 Wallet baru akan ditambahkan ke baris berikutnya.\n');
  } else {
    console.log('\n📝 File kosong atau belum ada, membuat file baru.\n');
  }
  
  rl.question('Mau berapa wallet? ', async (answer) => {
    const numWallets = parseInt(answer);
    
    if (isNaN(numWallets) || numWallets <= 0) {
      console.log('Jumlah wallet tidak valid!');
      rl.close();
      return;
    }
    
    console.log(`\nGenerating ${numWallets} wallet(s)...\n`);
    
    // Generate wallets (dimulai dari index setelah wallet terakhir yang ada)
    for (let i = 0; i < numWallets; i++) {
      const wallet = generateWallet(existingCount + i);
      
      // Append ke file (tidak menimpa, langsung lanjut ke baris baru)
      fs.appendFileSync('wallet.txt', wallet.publicKey + '\n');
      fs.appendFileSync('pk.txt', wallet.privateKeyBase58 + '\n');
      fs.appendFileSync('pharse.txt', wallet.mnemonic + '\n');
      fs.appendFileSync('pk_array.txt', wallet.privateKeyArray + '\n');
      
      console.log(`Wallet ${existingCount + i + 1}:`);
      console.log(`Address: ${wallet.publicKey}`);
      console.log(`Private Key (Base58): ${wallet.privateKeyBase58}`);
      console.log(`Mnemonic: ${wallet.mnemonic}`);
      console.log(`Derivation Path: ${wallet.derivationPath}\n`);
    }
    
    const totalWallets = existingCount + numWallets;
    console.log(`✓ ${numWallets} wallet(s) berhasil digenerate!`);
    console.log(`✓ Total wallet sekarang: ${totalWallets}`);
    console.log('✓ Wallet addresses → wallet.txt');
    console.log('✓ Private keys (Base58) → pk.txt');
    console.log('✓ Private keys (Array) → pk_array.txt');
    console.log('✓ Mnemonic phrases → pharse.txt');
    
    rl.close();
  });
}

main();
