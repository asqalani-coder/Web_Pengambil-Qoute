// Ambil elemen DOM berdasarkan ID
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const btnQuote = document.getElementById('btn-quote');
const btnCopy = document.getElementById('btn-clipboard');

// 1. Fungsi Menerjemahkan teks Inggris -> Indonesia (Koreksi nama variabel teks)
async function translateText(teks) {
  try {
    var response = await fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(teks) + '&langpair=en|id');
    var data = await response.json();
    
    // Mengembalikan hasil terjemahan dengan benar
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Gagal menerjemahkan:", error);
    return teks; // Jika gagal, kembalikan teks asli
  }
}

// 2. Fungsi Asynchronous untuk mengambil data dari Public API
async function fetchQuote() {
  quoteText.innerText = "Memuat quote & menerjemahkan...";
  quoteAuthor.innerText = "-";

  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    const data = await response.json();

    // Ubah nama variabel penampung hasil terjemahan agar tidak menimpa elemen HTML di atas
    const translatedQuote = await translateText(data.quote);

    // Tampilkan data ke layar HTML
    quoteText.innerText = `"${translatedQuote}"`;
    quoteAuthor.innerText = `- ${data.author}`;
  } catch (error) {
    quoteText.innerText = "Gagal mengambil quote. Periksa koneksi internetmu!";
    console.error("Error fetching data:", error);
  }
}

// 3. Fungsi Menyalin Quote ke clipboard (Koreksi variabel error 'err')
btnCopy.addEventListener('click', async () => {
  try {
    const textToCopy = `${quoteText.innerText} ${quoteAuthor.innerText}`;
    await navigator.clipboard.writeText(textToCopy);
    alert('Quote berhasil disalin!');
  } catch (err) {
    console.error('Gagal menyalin text:', err);
  }
});

// Jalankan fungsi saat tombol diklik
btnQuote.addEventListener('click', fetchQuote);