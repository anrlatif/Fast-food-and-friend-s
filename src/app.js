document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
      items: [
        { id: 1, name: 'Spaghetti Bolognese', img: '1.jpg', price: 20000, description: 'Spaghetti dengan saus bolognese yang lezat.' },
        { id: 2, name: 'Spaghetti Carbonara', img: '2.jpg', price: 20000, description: 'Spaghetti dengan saus carbonara yang creamy.' },
      ],
      showDetail(item) {
        alert(`Detail Produk:\nNama: ${item.name}\nDeskripsi: ${item.description}\nHarga: ${rupiah(item.price)}`);
      },
    }));
    
    Alpine.store('cart', {
        items: [],
        quantity: 0,
        totjum: 0,
        add(newItem) {
            //Cek apakah ada barang yang sama di keranjang (cart)
            const cartItem = this.items.find((item) => item.id === newItem.id);

            //Jika keranjang kosong
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, totjum: newItem.price});
                this.quantity++;
                this.totjum += newItem.price;
            } else {
            //Jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di keranjang
            this.items = this.items.map((item) => {
                //Jika barang berbeda
                if(item.id !== newItem.id) {
                    return item;
                } else {
                    //Jika barang sudah ada, tambah quantity dan total jumlahnya
                    item.quantity++
                    item.totjum = item.price * item.quantity;
                    this.quantity++;
                    this.totjum += item.price;
                    return item;
                }
            })
            }
        },
        remove(item) {
            //Jika item di keranjang lebih dari 1
            if(item.quantity > 1) {
                item.quantity--;
                item.totjum = item.price * item.quantity;
                this.quantity--;
                this.totjum -= item.price;
                } else {
                    //Jika item di keranjang hanya 1
                    this.items = this.items.filter((i) => i.id !== item.id);
                    this.quantity--;
                    this.totjum -= item.price;
                }
            },
        })
    });

//Form Validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
    for(let i = 0; i < form.elements.length; i++) {
        if(form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// Format Pesan WhatsApp
const formatMessage = (obj) => {
    const items = JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} X ${rupiah(item.totjum)})`).join('\n');
    
    return `Data Customer
Nama: ${obj.name}
Email: ${obj.email}
No HP: ${obj.phone}

Data Pesanan
${items}

TOTAL: ${rupiah(obj.totjum)}

Terimakasih.`;
};

// Kirim data ke WhatsApp
checkoutButton.addEventListener('click', async function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // const message = formatMessage(objData);
    // const whatsappUrl = `https://wa.me/6285770032102?text=${encodeURIComponent(message)}`;
    // window.open(whatsappUrl);
    // console.log(objData);

    //minta transaction token menggunakan ajax / fetch
    try {
        const response = await fetch('php/placeOrder.php', {
            method: 'POST',
            body: data,
        });
        const token = await response.text();
        // console.log(token);
        window.snap.pay(token, {
            onSuccess: function(result){
              /* You may add your own implementation here */
              alert("Pembayaran Anda Berhasil"); console.log(result);
            },
            onPending: function(result){
              /* You may add your own implementation here */
              alert("Menunggu Pembayaran"); console.log(result);
            },
            onError: function(result){
              /* You may add your own implementation here */
              alert("Pembayaran Anda Gagal"); console.log(result);
            },
            onClose: function(){
              /* You may add your own implementation here */
              alert('you closed the popup without finishing the payment');
            }
          })
    } catch (err) {
        console.log(err.message);
    }
    

});


const rupiah = (Number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number);
};